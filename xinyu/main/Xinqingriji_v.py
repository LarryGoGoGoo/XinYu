#coding:utf-8
import xlrd
import base64, copy, hashlib, time, json, datetime
from django.http import JsonResponse
from django.apps import apps
import numbers
from django.db.models.aggregates import Count,Sum
from django.db.models import Case, When, IntegerField, F
from .models import storeup
from django.forms import model_to_dict
import requests
from util.CustomJSONEncoder import CustomJsonEncoder
from .models import jiankangyujing, popupremind, users, xinliyisheng, xinqingriji, yuyuezixun
from util.codes import *
from urllib.parse import unquote
from util.auth import Auth
from util.common import Common
import util.message as mes
from django.db import connection
import random
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import redirect
from django.db.models import Q
from util.baidubce_api import BaiDuBce
from util.ai_risk import analyze_diary_risk
from .config_model import config
from util import rbac


_DIARY_READ_TABLES = ('users', 'yonghu', 'xinliyisheng')
DIARY_WARNING_TITLE = "心情日记风险预警"
# 保留关键词常量：仅作为 LLM 失败时的兜底与安全交叉校验，见 util/ai_risk.py
DIARY_WARNING_KEYWORDS = ("自杀", "轻生", "自残", "焦虑", "抑郁", "绝望", "崩溃", "活不下去", "不想活")
JIANKANGYUJING_ACCOUNT_MAX_LENGTH = 16
JIANKANGYUJING_NAME_MAX_LENGTH = 16
JIANKANGYUJING_TEXT_MAX_LENGTH = 200


def _truncate_text(value, max_length=255):
    return str(value or "")[:max_length]


def _token_info(request):
    info = Auth().getTokenInfo(request) or {}
    return info.get('tablename'), info.get('params') or {}


def _apply_diary_scope(request, req_dict):
    tablename, params = _token_info(request)
    if tablename == rbac.USER_TABLE:
        req_dict['yonghuzhanghao'] = params.get('yonghuzhanghao')
    elif tablename == rbac.DOCTOR_TABLE:
        # 医生账号：仅可看到「预约过该医生」的用户的日记（跨表关联），避免看到其他用户隐私
        req_dict['yonghuzhanghao__in'] = list(
            yuyuezixun.objects
            .filter(yishenggonghao=params.get('yishenggonghao'))
            .values_list('yonghuzhanghao', flat=True)
        )
        if not req_dict['yonghuzhanghao__in']:
            req_dict['yonghuzhanghao__in'] = ['__none__']
    return tablename, params


def _current_yonghu_profile(params):
    from .models import yonghu
    query = {}
    if params.get('id') is not None:
        query['id'] = params.get('id')
    elif params.get('yonghuzhanghao'):
        query['yonghuzhanghao'] = params.get('yonghuzhanghao')
    if not query:
        return params
    return yonghu.objects.filter(**query).values('yonghuzhanghao', 'yonghuxingming').first() or params


def _lock_yonghu_fields(req_dict, params):
    profile = _current_yonghu_profile(params)
    if profile.get('yonghuzhanghao'):
        req_dict['yonghuzhanghao'] = profile.get('yonghuzhanghao')
    if profile.get('yonghuxingming'):
        req_dict['yonghuxingming'] = profile.get('yonghuxingming')


def _sanitize_yonghu_update_fields(req_dict):
    allowed_fields = {'id', 'rijibiaoti', 'rijineirong', 'rijitupian', 'fabushijian', 'yonghuzhanghao', 'yonghuxingming'}
    for key in list(req_dict.keys()):
        if key not in allowed_fields:
            req_dict.pop(key, None)


def _can_read_diary(request, data):
    if not data:
        return False
    tablename, params = _token_info(request)
    if tablename == rbac.ADMIN_TABLE:
        return True
    if tablename == rbac.DOCTOR_TABLE:
        # 医生仅可读取「预约过该医生」的用户的日记，避免看到他人隐私
        account = data.get('yonghuzhanghao')
        return yuyuezixun.objects.filter(
            yishenggonghao=params.get('yishenggonghao'),
            yonghuzhanghao=account,
        ).exists()
    if tablename == rbac.USER_TABLE:
        return data.get('yonghuzhanghao') == params.get('yonghuzhanghao')
    return False


def _can_write_diary(request, data):
    if not data:
        return False
    tablename, params = _token_info(request)
    if tablename == rbac.ADMIN_TABLE:
        return True
    if tablename == rbac.USER_TABLE:
        return data.get('yonghuzhanghao') == params.get('yonghuzhanghao')
    return False


def _forbidden_response(msg='无权访问该日记'):
    return rbac.forbidden(msg)


def _diary_warning_marker(diary_id):
    digest = hashlib.sha1(str(diary_id or "").encode("utf-8")).hexdigest()[:12]
    return "DIARYWARN:{}".format(digest)


def _matched_diary_keywords(diary):
    """保留的关键词匹配（兼容旧逻辑），兜底/交叉校验在 util.ai_risk 中完成。"""
    text = "{} {}".format(diary.rijibiaoti or "", diary.rijineirong or "")
    return [keyword for keyword in DIARY_WARNING_KEYWORDS if keyword in text]


_LEVEL_LABELS = {"low": "低风险", "medium": "中风险", "high": "高风险", "crisis": "危机"}


def _analyze_diary_risk(diary):
    """调用语义风险分析；返回 None 表示无需预警。"""
    return analyze_diary_risk(diary.rijibiaoti, diary.rijineirong)


def _diary_warning_recipients(diary=None):
    """预警接收人：管理员全部接收；医生仅接收「预约过自己」的用户的预警，避免隐私广播。"""
    recipients = []
    for admin in users.objects.all():
        recipients.append({
            "userid": admin.id,
            "role": admin.username,
        })
    patient_number = diary.yonghuzhanghao if diary else None
    if patient_number:
        doctor_numbers = (
            yuyuezixun.objects
            .filter(yonghuzhanghao=patient_number)
            .exclude(yishenggonghao__isnull=True)
            .exclude(yishenggonghao='')
            .values_list('yishenggonghao', flat=True)
            .distinct()
        )
        for doctor in xinliyisheng.objects.filter(yishenggonghao__in=list(doctor_numbers)):
            recipients.append({
                "userid": doctor.id,
                "role": doctor.yishenggonghao,
            })
    return recipients


def _create_diary_keyword_warning(diary):
    if not diary:
        return {"created": False, "recipientCount": 0, "keywords": [], "risk": None}

    risk = _analyze_diary_risk(diary)
    if not risk:
        return {"created": False, "recipientCount": 0, "keywords": [], "risk": None}

    level = risk.get("level") or "medium"
    categories = risk.get("categories") or []
    keywords = _matched_diary_keywords(diary)
    marker = _diary_warning_marker(diary.id)
    if jiankangyujing.objects.filter(yujingtixing__contains=marker).exists() or popupremind.objects.filter(
        title=DIARY_WARNING_TITLE,
        content__contains=marker,
    ).exists():
        return {"created": False, "recipientCount": 0, "keywords": keywords, "risk": risk}

    now = datetime.datetime.now()
    level_label = _LEVEL_LABELS.get(level, "中风险")
    reason = risk.get("reason") or ""
    ai_suggestion = risk.get("suggestion") or ""
    category_text = "、".join(categories) if categories else "情绪风险"
    # 自动分配负责医生：优先最近一次已审核预约的主治医生
    from .Jiankangyujing_v import auto_assign_doctor
    doc_number, doc_name = auto_assign_doctor(diary.yonghuzhanghao)
    # 危机级：附加全国心理援助热线提示
    crisis_hint = ""
    if level == "crisis":
        crisis_hint = "【紧急】建议立即联系全国心理援助热线 12356 或就近医院心理科，必要时陪同就医。"

    title_text = "{}【{}】{} {}".format(DIARY_WARNING_TITLE, level_label, category_text, marker)
    suggestion = (
        "风险等级：{}；涉及方面：{}。{}".format(level_label, category_text, ai_suggestion)
        + (" " + crisis_hint if crisis_hint else "")
    )
    preview = _truncate_text(diary.rijineirong, 180)
    brief = "{}【{}】{}".format(DIARY_WARNING_TITLE, level_label, marker)
    content = (
        "{}\n"
        "用户账号：{}\n"
        "用户姓名：{}\n"
        "日记标题：{}\n"
        "风险等级：{}\n"
        "涉及方面：{}\n"
        "分析依据：{}\n"
        "日记摘要：{}\n"
        "{}"
    ).format(
        marker,
        diary.yonghuzhanghao or "",
        diary.yonghuxingming or "",
        diary.rijibiaoti or "",
        level_label,
        category_text,
        reason or "命中风险关键词：{}".format("、".join(keywords) if keywords else "无"),
        preview,
        suggestion,
    )

    jiankangyujing.objects.create(
        yonghuzhanghao=_truncate_text(diary.yonghuzhanghao, JIANKANGYUJING_ACCOUNT_MAX_LENGTH),
        yonghuxingming=_truncate_text(diary.yonghuxingming, JIANKANGYUJING_NAME_MAX_LENGTH),
        yujingtixing=_truncate_text(title_text, JIANKANGYUJING_TEXT_MAX_LENGTH),
        xinlijianyi=_truncate_text(suggestion, JIANKANGYUJING_TEXT_MAX_LENGTH),
        yujingshijian=now,
        fuzeyishenggonghao=doc_number,
        fuzeyishengxingming=doc_name,
    )

    recipients = _diary_warning_recipients(diary)
    for recipient in recipients:
        popupremind.objects.create(
            userid=recipient["userid"],
            role=_truncate_text(recipient["role"], 200),
            title=DIARY_WARNING_TITLE,
            type="个人",
            brief=brief,
            content=content,
            remindtime=now,
        )
    return {"created": True, "recipientCount": len(recipients), "keywords": keywords, "risk": risk}


def _create_diary_keyword_warning_by_id(diary_id):
    diary = xinqingriji.objects.filter(id=diary_id).first()
    return _create_diary_keyword_warning(diary)


def xinqingriji_default(request):

    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code,"msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        tablename, params = _apply_diary_scope(request, req_dict)
        if tablename not in _DIARY_READ_TABLES:
            return _forbidden_response('请先登录后查看日记')
        if "isdefault" not in xinqingriji.getallcolumn(xinqingriji,xinqingriji):
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict.update({"isdefault":"是"})
        data=xinqingriji.getbyparams(xinqingriji, xinqingriji, req_dict)
        if len(data)>0:
            msg['data']  = data[0]
        else:
            msg['data']  = {}
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def xinqingriji_page(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        global xinqingriji
        #当前登录用户信息
        tablename, params = _apply_diary_scope(request, req_dict)
        if tablename not in _DIARY_READ_TABLES:
            return _forbidden_response('请先登录后查看日记')

        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  =xinqingriji.page(xinqingriji, xinqingriji,req_dict, request)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def xinqingriji_autoSort(request):
    '''
    ．智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
主要信息列表（如商品列表，新闻列表）中使用，显示最近点击的或最新添加的5条记录就行
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        tablename, params = _apply_diary_scope(request, req_dict)
        if tablename not in _DIARY_READ_TABLES:
            return _forbidden_response('请先登录后查看日记')
        if "clicknum"  in xinqingriji.getallcolumn(xinqingriji,xinqingriji):
            req_dict['sort']='clicknum'
        elif "browseduration"  in xinqingriji.getallcolumn(xinqingriji,xinqingriji):
            req_dict['sort']='browseduration'
        else:
            req_dict['sort']='id'
        req_dict['order']='desc'
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = xinqingriji.page(xinqingriji,xinqingriji, req_dict, request)

        return JsonResponse(msg, encoder=CustomJsonEncoder)

#分类列表
def xinqingriji_lists(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":[]}
        req_dict = request.session.get("req_dict")
        tablename, params = _apply_diary_scope(request, req_dict)
        if tablename not in _DIARY_READ_TABLES:
            return _forbidden_response('请先登录后查看日记')
        msg['data'],_,_,_,_  = xinqingriji.page(xinqingriji, xinqingriji, req_dict, request)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def xinqingriji_query(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        try:
            req_dict = request.session.get("req_dict")
            tablename, params = _apply_diary_scope(request, req_dict)
            if tablename not in _DIARY_READ_TABLES:
                return _forbidden_response('请先登录后查看日记')
            query_result = xinqingriji.objects.filter(**req_dict).values()
            msg['data'] = query_result[0] if query_result else {}
        except Exception as e:

            msg['code'] = crud_error_code
            msg['msg'] = f"发生错误：{e}"
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def xinqingriji_list(request):
    '''
    前台分页
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        tablename, params = _apply_diary_scope(request, req_dict)
        if tablename not in _DIARY_READ_TABLES:
            # 未登录访问：返回 401（HTTP 200 + 业务码 401），与前端约定一致
            return JsonResponse({"code": 401, "msg": "请先登录后查看日记", "data": {}})
        #获取全部列名
        columns=  xinqingriji.getallcolumn( xinqingriji, xinqingriji)
        if "vipread" in req_dict and "vipread" not in columns:
          del req_dict["vipread"]
        #表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
        __foreEndList__ = getattr(xinqingriji, "__foreEndList__", None)
        __foreEndListAuth__ = getattr(xinqingriji, "__foreEndListAuth__", None)

        #authSeparate
        __authSeparate__ = getattr(xinqingriji, "__authSeparate__", None)

        if __foreEndListAuth__ =="是" and __authSeparate__=="是":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users" and Auth().getTokenInfo(request).get('params') is not None:
                req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")

        tablename = Auth().getTokenInfo(request).get('tablename')
        if tablename == "users" and req_dict.get("userid") != None:#判断是否存在userid列名
            del req_dict["userid"]
        else:
            __isAdmin__ = None

            allModels = apps.get_app_config('main').get_models()
            for m in allModels:
                if m.__tablename__==tablename:

                    __isAdmin__ = getattr(m, "__isAdmin__", None)
                    break

            if __isAdmin__ == "是":
                if req_dict.get("userid"):
        # del req_dict["userid"]
                    pass
            else:
    #非管理员权限的表,判断当前表字段名是否有userid
                if "userid" in columns:
                    try:
                        pass
                    except Exception:
                        pass
        #当列属性authTable有值(某个用户表)[该列的列名必须和该用户表的登陆字段名一致]，则对应的表有个隐藏属性authTable为”是”，那么该用户查看该表信息时，只能查看自己的
        __authTables__ = getattr(xinqingriji, "__authTables__", None)

        if __authTables__!=None and  __authTables__!={} and __foreEndListAuth__=="是":
            for authColumn,authTable in __authTables__.items():
                if authTable==tablename:
                    try:
                        del req_dict['userid']
                    except Exception:
                        pass
                    params = Auth().getTokenInfo(request).get('params')
                    req_dict[authColumn]=params.get(authColumn)
                    username=params.get(authColumn)
                    break
        
        if xinqingriji.__tablename__[:7]=="discuss":
            try:
                del req_dict['userid']
            except Exception:
                pass

        q = Q()
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = xinqingriji.page(xinqingriji, xinqingriji, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def xinqingriji_save(request):
    '''
    后台新增
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        if 'clicktime' in req_dict.keys():
            del req_dict['clicktime']
        if not rbac.is_admin(request):
            return _forbidden_response('只有管理员可以后台新增日记')
        tablename=Auth().getTokenInfo(request).get('tablename')
        __isAdmin__ = None
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__==tablename:

                __isAdmin__ = getattr(m, "__isAdmin__", None)
                break

        #获取全部列名
        columns=  xinqingriji.getallcolumn( xinqingriji, xinqingriji)
        if tablename!='users' and req_dict.get("userid")==None and 'userid' in columns  and __isAdmin__!='是':
            params=Auth().getTokenInfo(request).get('params')
            req_dict['userid']=params.get('id')


        if 'addtime' in req_dict.keys():
            del req_dict['addtime']

        idOrErr= xinqingriji.createbyreq(xinqingriji,xinqingriji, req_dict)
        if isinstance(idOrErr, str):
            msg['code'] = crud_error_code
            msg['msg'] = idOrErr
        else:
            msg['data'] = idOrErr

        return JsonResponse(msg, encoder=CustomJsonEncoder)

def xinqingriji_add(request):
    '''
    前台新增
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        tablename, params = _token_info(request)
        if tablename != 'yonghu':
            return _forbidden_response('只有普通用户可以发布日记')
        _lock_yonghu_fields(req_dict, params)

        #获取全部列名
        columns=  xinqingriji.getallcolumn( xinqingriji, xinqingriji)
        __authSeparate__ = getattr(xinqingriji, "__authSeparate__", None)

        if __authSeparate__=="是":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users" and 'userid' in columns:
                try:
                    req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")
                except Exception:
                    pass

        __foreEndListAuth__ = getattr(xinqingriji, "__foreEndListAuth__", None)

        if __foreEndListAuth__ and __foreEndListAuth__!="否":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users":
                req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")


        if 'addtime' in req_dict.keys():
            del req_dict['addtime']
        error= xinqingriji.createbyreq(xinqingriji,xinqingriji, req_dict)
        if isinstance(error, str):
            msg['code'] = crud_error_code
            msg['msg'] = error
        else:
            msg['data'] = error
            msg['warning'] = _create_diary_keyword_warning_by_id(error)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def xinqingriji_thumbsup(request,id_):
    '''
     点赞：表属性thumbsUp[是/否]，刷表新增thumbsupnum赞和crazilynum踩字段，
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        id_=int(id_)
        type_=int(req_dict.get("type",0))
        rets=xinqingriji.getbyid(xinqingriji,xinqingriji,id_)
        if len(rets)>0 and not _can_read_diary(request, rets[0]):
            return _forbidden_response()

        update_dict={
        "id":id_,
        }
        if type_==1:#赞
            update_dict["thumbsupnum"]=int(rets[0].get('thumbsupnum'))+1
        elif type_==2:#踩
            update_dict["crazilynum"]=int(rets[0].get('crazilynum'))+1
        error = xinqingriji.updatebyparams(xinqingriji,xinqingriji, update_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def xinqingriji_info(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data = xinqingriji.getbyid(xinqingriji,xinqingriji, int(id_))
        if len(data)>0 and not _can_read_diary(request, data[0]):
            return _forbidden_response()
        if len(data)>0:
            msg['data']=data[0]
            if msg['data'].__contains__("reversetime"):
                if isinstance(msg['data']['reversetime'], datetime.datetime):
                    msg['data']['reversetime'] = msg['data']['reversetime'].strftime("%Y-%m-%d %H:%M:%S")
                else:
                    if msg['data']['reversetime'] != None:
                        reversetime = datetime.datetime.strptime(msg['data']['reversetime'], '%Y-%m-%d %H:%M:%S')
                        msg['data']['reversetime'] = reversetime.strftime("%Y-%m-%d %H:%M:%S")

        #浏览点击次数
        __browseClick__ = getattr(xinqingriji, "__browseClick__", None)

        if __browseClick__=="是"  and  "clicknum"  in xinqingriji.getallcolumn(xinqingriji,xinqingriji):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}
            ret=xinqingriji.updatebyparams(xinqingriji,xinqingriji,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def xinqingriji_detail(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data =xinqingriji.getbyid(xinqingriji,xinqingriji, int(id_))
        if len(data)>0 and not _can_read_diary(request, data[0]):
            return _forbidden_response()
        if len(data)>0:
            msg['data']=data[0]
            if msg['data'].__contains__("reversetime"):
                if isinstance(msg['data']['reversetime'], datetime.datetime):
                    msg['data']['reversetime'] = msg['data']['reversetime'].strftime("%Y-%m-%d %H:%M:%S")
                else:
                    if msg['data']['reversetime'] != None:
                        reversetime = datetime.datetime.strptime(msg['data']['reversetime'], '%Y-%m-%d %H:%M:%S')
                        msg['data']['reversetime'] = reversetime.strftime("%Y-%m-%d %H:%M:%S")

        #浏览点击次数
        __browseClick__ = getattr(xinqingriji, "__browseClick__", None)

        if __browseClick__=="是"   and  "clicknum"  in xinqingriji.getallcolumn(xinqingriji,xinqingriji):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}

            ret=xinqingriji.updatebyparams(xinqingriji,xinqingriji,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def xinqingriji_update(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        diary_id = req_dict.get("id")
        current = xinqingriji.getbyid(xinqingriji, xinqingriji, int(diary_id or 0))
        if len(current) == 0:
            return _forbidden_response('日记不存在')
        if not _can_write_diary(request, current[0]):
            return _forbidden_response('无权修改该日记')
        tablename, params = _token_info(request)
        if tablename == rbac.USER_TABLE:
            _lock_yonghu_fields(req_dict, params)
            _sanitize_yonghu_update_fields(req_dict)
        elif tablename != rbac.ADMIN_TABLE:
            return _forbidden_response('无权修改该日记')
        if 'clicktime' in req_dict.keys() and req_dict['clicktime']=="None":
            del req_dict['clicktime']
        if req_dict.get("mima") and "mima" not in xinqingriji.getallcolumn(xinqingriji,xinqingriji) :
            del req_dict["mima"]
        if req_dict.get("password") and "password" not in xinqingriji.getallcolumn(xinqingriji,xinqingriji) :
            del req_dict["password"]
        try:
            del req_dict["clicknum"]
        except Exception:
            pass


        error = xinqingriji.updatebyparams(xinqingriji, xinqingriji, req_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        else:
            msg['warning'] = _create_diary_keyword_warning_by_id(diary_id)

        return JsonResponse(msg)


def xinqingriji_delete(request):
    '''
    批量删除
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        ids = req_dict.get("ids") or []
        data = xinqingriji.objects.filter(id__in=ids).values()
        for row in data:
            if not _can_write_diary(request, row):
                return _forbidden_response('无权删除该日记')

        error=xinqingriji.deletes(xinqingriji,
            xinqingriji,
             ids
        )
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg)


def xinqingriji_vote(request,id_):
    '''
    浏览点击次数（表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1）
统计商品或新闻的点击次数；提供新闻的投票功能
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code}


        data= xinqingriji.getbyid(xinqingriji, xinqingriji, int(id_))
        if len(data)>0 and not _can_read_diary(request, data[0]):
            return _forbidden_response()
        for i in data:
            votenum=i.get('votenum')
            if votenum!=None:
                params={"id":int(id_),"votenum":votenum+1}
                error=xinqingriji.updatebyparams(xinqingriji,xinqingriji,params)
                if error!=None:
                    msg['code'] = crud_error_code
                    msg['msg'] = error
        return JsonResponse(msg)

def xinqingriji_importExcel(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": "成功", "data": {}}
        tablename, params = _token_info(request)
        if not rbac.is_admin(request):
            return _forbidden_response('只有管理员可以导入日记')

        excel_file = request.FILES.get("file", "")
        if excel_file.size > 100 * 1024 * 1024:  # 限制为 100MB
            msg['code'] = 400
            msg["msg"] = '文件大小不能超过100MB'
            return JsonResponse(msg)

        file_type = excel_file.name.split('.')[1]
        
        if file_type in ['xlsx', 'xls']:
            data = xlrd.open_workbook(filename=None, file_contents=excel_file.read())
            table = data.sheets()[0]
            rows = table.nrows
            
            try:
                headers = [str(h).strip() for h in table.row_values(0)]
                for row in range(1, rows):
                    row_values = table.row_values(row)
                    req_dict = {
                        str(header): row_values[idx]
                        for idx, header in enumerate(headers)
                        if str(header).strip()
                    }
                    xinqingriji.createbyreq(xinqingriji, xinqingriji, req_dict)
                    
            except Exception:
                pass
                
        else:
            msg = {
                "msg": "文件类型错误",
                "code": 500
            }
                
        return JsonResponse(msg)

def xinqingriji_autoSort2(request):
    return JsonResponse({"code": 0, "msg": '',  "data":{}})












