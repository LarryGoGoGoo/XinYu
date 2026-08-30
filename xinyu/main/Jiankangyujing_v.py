#coding:utf-8
import xlrd
import base64, copy, time, json, datetime
from django.http import JsonResponse
from django.apps import apps
import numbers
from django.db.models.aggregates import Count,Sum
from django.db.models import Case, When, IntegerField, F
from django.forms import model_to_dict
import requests
from util.CustomJSONEncoder import CustomJsonEncoder
from .models import jiankangyujing, yuyuezixun, xinliyisheng, yonghu, users, popupremind


def _token_info(request):
    info = Auth().getTokenInfo(request) or {}
    return info.get('tablename'), info.get('params') or {}


def _is_doctor_patient(doctor_number, yonghuzhanghao):
    """判断某用户是否预约过该医生。"""
    if not doctor_number or not yonghuzhanghao:
        return False
    return yuyuezixun.objects.filter(
        yishenggonghao=doctor_number,
        yonghuzhanghao=yonghuzhanghao,
    ).exists()


def _can_write_warning(request, data):
    """健康预警写权限：管理员全部；医生仅限「分配给自己」的预警；普通用户无写权限。"""
    if not data:
        return False
    tablename, params = _token_info(request)
    if tablename == rbac.ADMIN_TABLE:
        return True
    if tablename == rbac.DOCTOR_TABLE:
        doctor_number = params.get('yishenggonghao')
        # 优先看负责医生归属；兼容旧数据（无归属）回退到「预约过该用户」
        if data.get('fuzeyishenggonghao'):
            return data.get('fuzeyishenggonghao') == doctor_number
        return _is_doctor_patient(doctor_number, data.get('yonghuzhanghao'))
    return False
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
from .config_model import config
from util import rbac


def jiankangyujing_default(request):

    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code,"msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        req_dict.update({"isdefault":"是"})
        data=jiankangyujing.getbyparams(jiankangyujing, jiankangyujing, req_dict)
        if len(data)>0:
            msg['data']  = data[0]
        else:
            msg['data']  = {}
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def jiankangyujing_page(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        global jiankangyujing
        #当前登录用户信息
        tablename = Auth().getTokenInfo(request).get('tablename')
        from .models import yonghu
        if tablename == rbac.USER_TABLE:
            req_dict['yonghuzhanghao'] = Auth().getTokenInfo(request).get('params').get(yonghu.__loginUserColumn__)
        elif tablename == rbac.DOCTOR_TABLE:
            # 医生账号：优先看「分配给自己的预警」；兼容旧数据（无负责医生）回退到「预约过该医生」
            doctor_number = Auth().getTokenInfo(request).get('params').get('yishenggonghao')
            from django.db.models import Q
            patient_list = list(
                yuyuezixun.objects
                .filter(yishenggonghao=doctor_number)
                .values_list('yonghuzhanghao', flat=True)
            )
            # 医生查询条件：负责医生是自己 或（负责医生为空 且 预约过自己的用户）
            q = jiankangyujing.objects.filter(
                fuzeyishenggonghao=doctor_number
            ) | jiankangyujing.objects.filter(
                fuzeyishenggonghao__isnull=True,
                yonghuzhanghao__in=patient_list if patient_list else ['__none__'],
            )
            ids = list(q.values_list('id', flat=True))
            if ids:
                req_dict['id__in'] = ids
            else:
                req_dict['id__in'] = ['__none__']

        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  =jiankangyujing.page(jiankangyujing, jiankangyujing,req_dict, request)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def auto_assign_doctor(yonghuzhanghao):
    """为某用户的预警自动分配负责医生：
    取该用户「最近一条已审核通过（sfsh='是'）」的预约对应的医生；
    若没有已审核预约，返回 (None, None) 表示待人工指派。
    返回 (工号, 姓名)。"""
    if not yonghuzhanghao:
        return None, None
    yuyue = (
        yuyuezixun.objects
        .filter(yonghuzhanghao=yonghuzhanghao, sfsh='是')
        .exclude(yishenggonghao__isnull=True)
        .exclude(yishenggonghao='')
        .order_by('-yuyueshijian', '-id')
        .first()
    )
    if not yuyue:
        return None, None
    doctor = xinliyisheng.objects.filter(yishenggonghao=yuyue.yishenggonghao).first()
    if not doctor:
        return yuyue.yishenggonghao, yuyue.yishengxingming or None
    return doctor.yishenggonghao, doctor.yishengxingming


def jiankangyujing_assign(request):
    """管理员指派/改派健康预警的负责医生，并给该医生发一条站内提醒。"""
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            return JsonResponse({"code": 403, "msg": "仅管理员可指派预警负责医生", "data": {}}, encoder=CustomJsonEncoder)

        req_dict = request.session.get("req_dict")
        warning_id = req_dict.get("id")
        doctor_number = req_dict.get("fuzeyishenggonghao")
        if not warning_id or not doctor_number:
            return JsonResponse({"code": 400, "msg": "缺少预警id或医生工号", "data": {}}, encoder=CustomJsonEncoder)

        warning = jiankangyujing.objects.filter(id=warning_id).first()
        if not warning:
            return JsonResponse({"code": 404, "msg": "预警记录不存在", "data": {}}, encoder=CustomJsonEncoder)

        doctor = xinliyisheng.objects.filter(yishenggonghao=doctor_number).first()
        if not doctor:
            return JsonResponse({"code": 400, "msg": "医生不存在", "data": {}}, encoder=CustomJsonEncoder)

        warning.fuzeyishenggonghao = doctor.yishenggonghao
        warning.fuzeyishengxingming = doctor.yishengxingming
        warning.save()

        # 给负责医生发一条站内提醒
        now = datetime.datetime.now()
        content = (
            "您好，管理员给您安排了一条需要处理的健康预警：\n"
            "用户账号：{}\n"
            "用户姓名：{}\n"
            "预警内容：{}\n"
            "请及时跟进处理。"
        ).format(
            warning.yonghuzhanghao or '',
            warning.yonghuxingming or '',
            warning.yujingtixing or '',
        )
        popupremind.objects.create(
            userid=doctor.id,
            role=doctor.yishenggonghao,
            title="健康预警处理安排",
            type="个人",
            brief="管理员安排您处理 {} 的健康预警".format(warning.yonghuxingming or warning.yonghuzhanghao),
            content=content,
            remindtime=now,
        )

        msg['data'] = {
            "id": warning.id,
            "fuzeyishenggonghao": doctor.yishenggonghao,
            "fuzeyishengxingming": doctor.yishengxingming,
        }
        msg['msg'] = "已指派给 {} 并发送提醒".format(doctor.yishengxingming or doctor.yishenggonghao)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def jiankangyujing_doctors(request):
    """返回全部医生（工号+姓名），供管理员指派弹窗下拉使用。仅管理员可调用。"""
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": []}
        if not rbac.is_admin(request):
            return JsonResponse({"code": 403, "msg": "仅管理员可获取医生列表", "data": []}, encoder=CustomJsonEncoder)
        msg['data'] = list(
            xinliyisheng.objects.filter()
            .exclude(yishenggonghao__isnull=True)
            .exclude(yishenggonghao='')
            .values("yishenggonghao", "yishengxingming")
            .order_by("id")
        )
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def jiankangyujing_autoSort(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        if "clicknum"  in jiankangyujing.getallcolumn(jiankangyujing,jiankangyujing):
            req_dict['sort']='clicknum'
        elif "browseduration"  in jiankangyujing.getallcolumn(jiankangyujing,jiankangyujing):
            req_dict['sort']='browseduration'
        else:
            req_dict['sort']='clicktime'
        req_dict['order']='desc'
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = jiankangyujing.page(jiankangyujing,jiankangyujing, req_dict)

        return JsonResponse(msg, encoder=CustomJsonEncoder)

#分类列表
def jiankangyujing_lists(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":[]}
        msg['data'],_,_,_,_  = jiankangyujing.page(jiankangyujing, jiankangyujing, {})
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def jiankangyujing_query(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        try:
            query_result = jiankangyujing.objects.filter(**request.session.get("req_dict")).values()
            msg['data'] = query_result[0]
        except Exception as e:

            msg['code'] = crud_error_code
            msg['msg'] = f"发生错误：{e}"
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def jiankangyujing_list(request):
    '''
    前台分页
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        #获取全部列名
        columns=  jiankangyujing.getallcolumn( jiankangyujing, jiankangyujing)
        if "vipread" in req_dict and "vipread" not in columns:
          del req_dict["vipread"]
        #表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
        __foreEndList__ = getattr(jiankangyujing, "__foreEndList__", None)
        __foreEndListAuth__ = getattr(jiankangyujing, "__foreEndListAuth__", None)

        #authSeparate
        __authSeparate__ = getattr(jiankangyujing, "__authSeparate__", None)

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
        __authTables__ = getattr(jiankangyujing, "__authTables__", None)

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
        
        if jiankangyujing.__tablename__[:7]=="discuss":
            try:
                del req_dict['userid']
            except Exception:
                pass

        q = Q()
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = jiankangyujing.page(jiankangyujing, jiankangyujing, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def jiankangyujing_save(request):
    '''
    后台新增（仅管理员）
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        # 预警记录只能由管理员在后台创建，普通用户/医生无权
        if not rbac.is_admin(request):
            return JsonResponse({"code": 403, "msg": "仅管理员可后台新增健康预警", "data": {}}, encoder=CustomJsonEncoder)
        req_dict = request.session.get("req_dict")
        if 'clicktime' in req_dict.keys():
            del req_dict['clicktime']
        #获取全部列名
        columns=  jiankangyujing.getallcolumn( jiankangyujing, jiankangyujing)
        if tablename!='users' and req_dict.get("userid")==None and 'userid' in columns:
            params=Auth().getTokenInfo(request).get('params')
            req_dict['userid']=params.get('id')


        if 'addtime' in req_dict.keys():
            del req_dict['addtime']

        idOrErr= jiankangyujing.createbyreq(jiankangyujing,jiankangyujing, req_dict)
        if isinstance(idOrErr, str):
            msg['code'] = crud_error_code
            msg['msg'] = idOrErr
        else:
            msg['data'] = idOrErr

        return JsonResponse(msg, encoder=CustomJsonEncoder)

def jiankangyujing_add(request):
    '''
    前台新增（仅医生/管理员；医生生成的预警归属自己）
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        tablename, params = _token_info(request)
        if tablename not in ('users', 'xinliyisheng'):
            return JsonResponse({"code": 403, "msg": "无权新增健康预警", "data": {}}, encoder=CustomJsonEncoder)
        req_dict = request.session.get("req_dict")

        # 医生新增时，默认归属自己（保证预警有负责医生）
        if tablename == rbac.DOCTOR_TABLE:
            doctor_number = params.get('yishenggonghao')
            if doctor_number:
                if not req_dict.get('fuzeyishenggonghao'):
                    req_dict['fuzeyishenggonghao'] = doctor_number
                    doctor = xinliyisheng.objects.filter(yishenggonghao=doctor_number).first()
                    if doctor:
                        req_dict['fuzeyishengxingming'] = doctor.yishengxingming

        #获取全部列名
        columns=  jiankangyujing.getallcolumn( jiankangyujing, jiankangyujing)
        __authSeparate__ = getattr(jiankangyujing, "__authSeparate__", None)

        if __authSeparate__=="是":
            if tablename!="users" and 'userid' in columns:
                try:
                    req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")
                except Exception:
                    pass

        __foreEndListAuth__ = getattr(jiankangyujing, "__foreEndListAuth__", None)

        if __foreEndListAuth__ and __foreEndListAuth__!="否":
            if tablename!="users":
                req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")


        if 'addtime' in req_dict.keys():
            del req_dict['addtime']
        error= jiankangyujing.createbyreq(jiankangyujing,jiankangyujing, req_dict)
        if isinstance(error, str):
            msg['code'] = crud_error_code
            msg['msg'] = error
        else:
            msg['data'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def jiankangyujing_thumbsup(request,id_):
    '''
     点赞：表属性thumbsUp[是/否]，刷表新增thumbsupnum赞和crazilynum踩字段，
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        id_=int(id_)
        type_=int(req_dict.get("type",0))
        rets=jiankangyujing.getbyid(jiankangyujing,jiankangyujing,id_)

        update_dict={
        "id":id_,
        }
        if type_==1:#赞
            update_dict["thumbsupnum"]=int(rets[0].get('thumbsupnum'))+1
        elif type_==2:#踩
            update_dict["crazilynum"]=int(rets[0].get('crazilynum'))+1
        error = jiankangyujing.updatebyparams(jiankangyujing,jiankangyujing, update_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def jiankangyujing_info(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data = jiankangyujing.getbyid(jiankangyujing,jiankangyujing, int(id_))
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
        __browseClick__ = getattr(jiankangyujing, "__browseClick__", None)

        if __browseClick__=="是"  and  "clicknum"  in jiankangyujing.getallcolumn(jiankangyujing,jiankangyujing):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}
            ret=jiankangyujing.updatebyparams(jiankangyujing,jiankangyujing,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def jiankangyujing_detail(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data =jiankangyujing.getbyid(jiankangyujing,jiankangyujing, int(id_))
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
        __browseClick__ = getattr(jiankangyujing, "__browseClick__", None)

        if __browseClick__=="是"   and  "clicknum"  in jiankangyujing.getallcolumn(jiankangyujing,jiankangyujing):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}

            ret=jiankangyujing.updatebyparams(jiankangyujing,jiankangyujing,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def jiankangyujing_update(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        current = jiankangyujing.getbyid(jiankangyujing, jiankangyujing, int(req_dict.get("id", 0)))
        if len(current) == 0:
            return JsonResponse({"code": 403, "msg": "预警记录不存在", "data": {}})
        if not _can_write_warning(request, current[0]):
            return JsonResponse({"code": 403, "msg": "无权修改该预警记录", "data": {}})
        if 'clicktime' in req_dict.keys() and req_dict['clicktime']=="None":
            del req_dict['clicktime']
        if req_dict.get("mima") and "mima" not in jiankangyujing.getallcolumn(jiankangyujing,jiankangyujing) :
            del req_dict["mima"]
        if req_dict.get("password") and "password" not in jiankangyujing.getallcolumn(jiankangyujing,jiankangyujing) :
            del req_dict["password"]
        try:
            del req_dict["clicknum"]
        except Exception:
            pass


        error = jiankangyujing.updatebyparams(jiankangyujing, jiankangyujing, req_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error

        return JsonResponse(msg)


def jiankangyujing_delete(request):
    '''
    批量删除
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        ids = req_dict.get("ids") or []
        data = jiankangyujing.objects.filter(id__in=ids).values()
        for row in data:
            if not _can_write_warning(request, row):
                return JsonResponse({"code": 403, "msg": "无权删除该预警记录", "data": {}})

        error=jiankangyujing.deletes(jiankangyujing,
            jiankangyujing,
             ids
        )
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg)


def jiankangyujing_vote(request,id_):
    '''
    浏览点击次数（表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1）
统计商品或新闻的点击次数；提供新闻的投票功能
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code}


        data= jiankangyujing.getbyid(jiankangyujing, jiankangyujing, int(id_))
        for i in data:
            votenum=i.get('votenum')
            if votenum!=None:
                params={"id":int(id_),"votenum":votenum+1}
                error=jiankangyujing.updatebyparams(jiankangyujing,jiankangyujing,params)
                if error!=None:
                    msg['code'] = crud_error_code
                    msg['msg'] = error
        return JsonResponse(msg)

def jiankangyujing_importExcel(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": "成功", "data": {}}

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
                    jiankangyujing.createbyreq(jiankangyujing, jiankangyujing, req_dict)
                    
            except Exception:
                pass
                
        else:
            msg = {
                "msg": "文件类型错误",
                "code": 500
            }
                
        return JsonResponse(msg)

def jiankangyujing_autoSort2(request):
    return JsonResponse({"code": 0, "msg": '',  "data":{}})












