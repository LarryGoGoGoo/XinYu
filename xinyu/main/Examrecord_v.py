#coding:utf-8
import xlrd
import base64, copy, hashlib, time, json, datetime
from django.http import JsonResponse
from django.apps import apps
import numbers
from django.db.models.aggregates import Count,Sum
from django.db.models import Case, When, IntegerField, F
from django.forms import model_to_dict
import requests
from util.CustomJSONEncoder import CustomJsonEncoder
from .models import examrecord
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
from util.ai_report import generate_report
from .config_model import config
from .models import exampaper, examquestion, jiankangyujing, popupremind, users, xinliyisheng, yonghu, yuyuezixun
from .scl90 import calculate_scl90, is_scl90_paper, normalize_score
from .phq_gad import PHQ_GAD_OPTIONS, score_phq9, score_gad7
from util import rbac


PROGRESS_TYPE = -1
PROGRESS_QUESTION_NAME = "__PROGRESS__"
SCL90_WARNING_TITLE = "SCL-90测评预警"
# 与 util.ai_risk 四级体系、前端 TableRiskLevel/HomeChart 正则解析保持一致
SCL90_LEVEL_LABELS = {"low": "低风险", "medium": "中风险", "high": "高风险", "crisis": "危机"}
JIANKANGYUJING_ACCOUNT_MAX_LENGTH = 16
JIANKANGYUJING_NAME_MAX_LENGTH = 16
JIANKANGYUJING_TEXT_MAX_LENGTH = 200


def _active_records_q():
    return ~Q(questionname=PROGRESS_QUESTION_NAME)


def _current_user(request):
    token_info = Auth().getTokenInfo(request)
    params = token_info.get('params') or {}
    return params.get("id"), params.get("username") or params.get("yonghuzhanghao") or params.get("yishenggonghao") or ""


def uni_username_fallback(request):
    token_info = Auth().getTokenInfo(request)
    params = token_info.get('params') or {}
    for key in ("username", "yonghuxingming", "yonghuzhanghao", "xingming", "name", "yishengxingming", "yishenggonghao"):
        if params.get(key):
            return params.get(key)
    return ""


def _parse_json(value, default):
    if value in (None, ""):
        return default
    if isinstance(value, (dict, list)):
        return value
    try:
        return json.loads(value)
    except Exception:
        return default


def _safe_int(value, default=0):
    try:
        return int(float(value))
    except Exception:
        return default


def _answer_to_text(value):
    if value in (None, ""):
        return ""
    if isinstance(value, list):
        return ",".join(str(item) for item in value)
    return str(value)


def _score_answer(question_type, answer_value, options):
    if int(question_type or 0) == 4:
        return 0
    if isinstance(answer_value, list):
        selected = set(str(item) for item in answer_value)
        return sum(_safe_int(option.get("score")) for option in options if str(option.get("code")) in selected)
    for option in options:
        if str(answer_value) == str(option.get("code")):
            return _safe_int(option.get("score"))
    return 0


def _serialize_answer_payload(answers):
    if isinstance(answers, str):
        return answers
    return json.dumps(answers or {}, ensure_ascii=False)


def _serialize_progress_payload(answers, updated_at=None):
    return json.dumps({
        "answers": answers or {},
        "updatedAt": _safe_int(updated_at, int(time.time() * 1000)),
    }, ensure_ascii=False)


def _parse_progress_payload(value):
    payload = _parse_json(value, {})
    if not isinstance(payload, dict):
        return {}, 0
    if isinstance(payload.get("answers"), dict):
        return payload.get("answers") or {}, _safe_int(payload.get("updatedAt"), 0)
    return payload, 0


def _get_progress_record(user_id, paper_id):
    return examrecord.objects.filter(
        userid=user_id,
        paperid=paper_id,
        questionname=PROGRESS_QUESTION_NAME,
        type=PROGRESS_TYPE,
        ismark=0,
    ).order_by("-addtime", "-id").first()


def _progress_question(paper_id):
    return examquestion.objects.filter(paperid=paper_id).order_by("-sequence", "id").first()


def _question_position_map(questions):
    ordered = sorted(list(questions), key=lambda item: item.sequence or 0, reverse=True)
    return {item.id: index + 1 for index, item in enumerate(ordered)}, ordered


def _build_scl90_result(paper, records):
    questions = examquestion.objects.filter(paperid=paper.id).all()
    position_map, ordered_questions = _question_position_map(questions)
    if not is_scl90_paper(paper.name, len(ordered_questions)):
        return {}
    scores_by_position = {}
    for record in records:
        position = position_map.get(record.questionid)
        if position:
            scores_by_position[position] = normalize_score(record.myanswer)
    return calculate_scl90(scores_by_position)


def _is_phq9_paper(paper):
    return bool(paper) and str(paper.name or "").lower().startswith("phq-9")


def _is_gad7_paper(paper):
    return bool(paper) and str(paper.name or "").lower().startswith("gad-7")


def _phq_gad_scores(records):
    """从逐题记录中提取 0-3 计分的答案（按题目 sequence 倒序即题目顺序）。"""
    questions = examquestion.objects.filter(
        paperid__in=[r.paperid for r in records[:1]]
    ).order_by("-sequence", "id")
    ordered_ids = [q.id for q in questions]
    by_question = {r.questionid: r for r in records}
    option_scores = {str(o["code"]): int(o["score"]) for o in PHQ_GAD_OPTIONS}
    scores = []
    for qid in ordered_ids:
        record = by_question.get(qid)
        if not record:
            scores.append(0)
            continue
        scores.append(option_scores.get(str(record.myanswer), 0))
    return scores


def _build_phq_gad_result(paper, records):
    if _is_phq9_paper(paper):
        return score_phq9(_phq_gad_scores(records))
    if _is_gad7_paper(paper):
        return score_gad7(_phq_gad_scores(records))
    return {}


def _truncate_text(value, max_length=255):
    text = str(value or "")
    return text[:max_length]


def _format_scl90_score(value):
    try:
        return "{:.2f}".format(float(value))
    except Exception:
        return str(value or 0)


def _scl90_warning_marker(examno):
    digest = hashlib.sha1(str(examno or "").encode("utf-8")).hexdigest()[:12]
    return "SCL90WARN:{}".format(digest)


def _scl90_warning_factors(result):
    factors = result.get("factors") if isinstance(result, dict) else []
    if not isinstance(factors, list):
        return []
    return [factor for factor in factors if isinstance(factor, dict) and factor.get("warning")]


def _scl90_risk_level(result):
    """把 SCL-90 结果映射到四级风险标签（低/中/高/危机）。

    与心情日记/心语AI 的预警文案格式对齐，保证前端环形图能解析出等级分布。
    采用「总分 + 最高因子均分」双阈值（国际通用解读口径）：
      危机：总分>=250 或 任一因子均分>=4.0；
      高风险：总分>=200 或 任一因子均分>=3.0；
      中风险：其余阳性情况（总分>=160 已由入口 isPositive 保证）。
    """
    if not isinstance(result, dict):
        return "中风险"
    total_score = _safe_int(result.get("totalScore"), 0)
    factors = result.get("factors") if isinstance(result.get("factors"), list) else []
    max_factor = 0.0
    for factor in factors:
        if isinstance(factor, dict):
            try:
                max_factor = max(max_factor, float(factor.get("score") or 0))
            except Exception:
                pass
    if total_score >= 250 or max_factor >= 4.0:
        return "危机"
    if total_score >= 200 or max_factor >= 3.0:
        return "高风险"
    return "中风险"


def _build_scl90_warning_payload(user_id, username, paper, examno, result):
    warning_factors = _scl90_warning_factors(result)
    factor_text = "、".join(
        "{}({})".format(item.get("name") or item.get("key"), _format_scl90_score(item.get("score")))
        for item in warning_factors
    ) or "总分或阳性项目达到预警标准"
    guidance_items = []
    for factor in warning_factors:
        guidance = factor.get("guidance")
        if guidance:
            guidance_items.append("{}：{}".format(factor.get("name") or factor.get("key"), guidance))
    if not guidance_items:
        guidance_items.append("建议管理员或心理医生尽快查看该用户测评报告，并结合访谈进行进一步评估。")

    user = yonghu.objects.filter(id=user_id).first()
    user_account = (user.yonghuzhanghao if user else "") or username or str(user_id)
    user_name = (user.yonghuxingming if user else "") or username or user_account
    total_score = _format_scl90_score(result.get("totalScore"))
    average_score = _format_scl90_score(result.get("averageScore"))
    positive_count = result.get("positiveItemCount", 0)
    marker = _scl90_warning_marker(examno)
    brief = "用户{}的{}结果触发预警：总分{}，总均分{}，阳性项目{}项，异常因子：{}。".format(
        user_name,
        paper.name,
        total_score,
        average_score,
        positive_count,
        factor_text,
    )
    content = "\n".join([
        "{} {}".format(SCL90_WARNING_TITLE, marker),
        "用户账号：{}".format(user_account),
        "用户姓名：{}".format(user_name),
        "测评试卷：{}".format(paper.name),
        "考试编号：{}".format(examno),
        "总分：{}".format(total_score),
        "总均分：{}".format(average_score),
        "阳性项目数：{}".format(positive_count),
        "异常因子：{}".format(factor_text),
        "建议：{}".format("；".join(guidance_items)),
    ])
    return {
        "marker": marker,
        "userAccount": user_account,
        "userName": user_name,
        "brief": brief,
        "content": content,
        "factorText": factor_text,
        "guidance": "；".join(guidance_items),
    }


def _scl90_warning_recipients(patient_number=None):
    """预警接收人：管理员全部接收；医生仅接收「预约过该患者」的医生，避免隐私广播。

    与心情日记预警（Xinqingriji_v._diary_warning_recipients）保持同一口径，
    保证「收到预警的医生」与「有权读该报告的医生」一致。
    """
    recipients = []
    for admin in users.objects.all():
        recipients.append({
            "userid": admin.id,
            "role": admin.username,
        })
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


def _create_scl90_warning(user_id, username, paper, examno, result):
    if not isinstance(result, dict) or not result.get("isPositive"):
        return {"created": False, "recipientCount": 0}

    payload = _build_scl90_warning_payload(user_id, username, paper, examno, result)
    marker = payload["marker"]
    if jiankangyujing.objects.filter(yujingtixing__contains=marker).exists() or popupremind.objects.filter(
        title=SCL90_WARNING_TITLE,
        content__contains=marker,
    ).exists():
        return {"created": False, "recipientCount": 0}

    now = datetime.datetime.now()
    # 与四级体系对齐：写入【等级】标签，供列表等级标签与首页环形图解析
    level_label = SCL90_LEVEL_LABELS.get(_scl90_risk_level(result), "中风险")
    # 自动分配负责医生：优先最近一次已审核预约的主治医生
    from .Jiankangyujing_v import auto_assign_doctor
    doc_number, doc_name = auto_assign_doctor(payload["userAccount"])
    jiankangyujing.objects.create(
        yonghuzhanghao=_truncate_text(payload["userAccount"], JIANKANGYUJING_ACCOUNT_MAX_LENGTH),
        yonghuxingming=_truncate_text(payload["userName"], JIANKANGYUJING_NAME_MAX_LENGTH),
        yujingtixing=_truncate_text(
            "{}【{}】{} {}".format(SCL90_WARNING_TITLE, level_label, payload["factorText"], marker),
            JIANKANGYUJING_TEXT_MAX_LENGTH,
        ),
        xinlijianyi=_truncate_text(payload["guidance"], JIANKANGYUJING_TEXT_MAX_LENGTH),
        yujingshijian=now,
        chulizhuangtai="未处理",
        fuzeyishenggonghao=doc_number,
        fuzeyishengxingming=doc_name,
    )

    recipients = _scl90_warning_recipients(payload["userAccount"])
    for recipient in recipients:
        popupremind.objects.create(
            userid=recipient["userid"],
            role=_truncate_text(recipient["role"]),
            title=SCL90_WARNING_TITLE,
            type="个人",
            brief=payload["brief"],
            content=payload["content"],
            remindtime=now,
        )
    return {"created": True, "recipientCount": len(recipients)}


def _is_admin_request(request):
    return rbac.is_admin(request)


def _forbidden_response(msg='无权查看该测评报告'):
    return rbac.forbidden(msg)


def _patient_userids_for_doctor(params):
    """返回「预约过当前医生」的患者 userid 集合；医生读报告与明细均以此授权。"""
    doctor_number = params.get('yishenggonghao')
    if not doctor_number:
        return set()
    patient_numbers = yuyuezixun.objects.filter(
        yishenggonghao=doctor_number,
    ).exclude(yonghuzhanghao__isnull=True).exclude(yonghuzhanghao='').values_list('yonghuzhanghao', flat=True)
    if not patient_numbers:
        return set()
    return set(
        yonghu.objects.filter(yonghuzhanghao__in=list(patient_numbers)).values_list('id', flat=True)
    )


def _doctor_can_read_userid(request, userid):
    """医生是否可读该 userid 的测评记录：须「预约过自己」。"""
    if userid is None:
        return False
    tablename = Auth().getTokenInfo(request).get('tablename')
    if tablename != rbac.DOCTOR_TABLE:
        return False
    params = Auth().getTokenInfo(request).get('params') or {}
    return int(userid) in _patient_userids_for_doctor(params)


def _can_read_examrecord(request, data):
    """单条测评记录读权限：管理员全量；医生仅「预约过自己」的患者；用户本人仅自己。"""
    if not data:
        return False
    tablename = Auth().getTokenInfo(request).get('tablename')
    if tablename == rbac.ADMIN_TABLE:
        return True
    userid = data.get('userid')
    if tablename == rbac.DOCTOR_TABLE:
        return _doctor_can_read_userid(request, userid)
    if tablename == rbac.USER_TABLE:
        params = Auth().getTokenInfo(request).get('params') or {}
        return userid is not None and int(userid) == int(params.get('id') or 0)
    return False


def _can_write_examrecord(request, data):
    """测评记录写权限：仅管理员（医生/用户不允许改他人答题记录）。"""
    if not data:
        return False
    return rbac.is_admin(request)


def examrecord_default(request):

    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code,"msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        req_dict.update({"isdefault":"是"})
        data=examrecord.getbyparams(examrecord, examrecord, req_dict)
        if len(data)>0:
            msg['data']  = data[0]
        else:
            msg['data']  = {}
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def examrecord_page(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        global examrecord
        #当前登录用户信息
        tablename = Auth().getTokenInfo(request).get('tablename')
        # 判断当前表的表属性isAdmin,为真则是管理员
        __isAdmin__ = None
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__==tablename:
                __isAdmin__ = getattr(m, "__isAdmin__", None)
                break
        if __isAdmin__!="是":
            req_dict["userid"]=Auth().getTokenInfo(request).get('params').get("id")

        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  =examrecord.page(examrecord, examrecord, req_dict, request, _active_records_q())
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def examrecord_autoSort(request):
    '''
    ．智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
主要信息列表（如商品列表，新闻列表）中使用，显示最近点击的或最新添加的5条记录就行
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        if "clicknum"  in examrecord.getallcolumn(examrecord,examrecord):
            req_dict['sort']='clicknum'
        elif "browseduration"  in examrecord.getallcolumn(examrecord,examrecord):
            req_dict['sort']='browseduration'
        else:
            req_dict['sort']='clicktime'
        req_dict['order']='desc'
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = examrecord.page(examrecord, examrecord, req_dict, {}, _active_records_q())

        return JsonResponse(msg, encoder=CustomJsonEncoder)

#分类列表
def examrecord_lists(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":[]}
        msg['data'],_,_,_,_  = examrecord.page(examrecord, examrecord, {}, {}, _active_records_q())
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def examrecord_query(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        tablename = Auth().getTokenInfo(request).get('tablename')
        params = Auth().getTokenInfo(request).get('params') or {}
        # 守卫：管理员全量；医生按预约；本人仅自己
        if tablename != rbac.ADMIN_TABLE:
            base = examrecord.objects.filter(**req_dict).exclude(questionname=PROGRESS_QUESTION_NAME)
            if tablename == rbac.DOCTOR_TABLE:
                allowed = _patient_userids_for_doctor(params)
                query_result = base.filter(userid__in=allowed).values() if allowed else base.none()
            elif tablename == rbac.USER_TABLE and params.get('id') is not None:
                query_result = base.filter(userid=params.get('id')).values()
            else:
                return _forbidden_response('无权查询该测评记录')
            msg['data'] = query_result[0] if query_result else {}
        else:
            query_result = examrecord.objects.filter(**req_dict).exclude(questionname=PROGRESS_QUESTION_NAME).values()
            msg['data'] = query_result[0] if query_result else {}
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def examrecord_list(request):
    '''
    前台分页
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        #获取全部列名
        columns=  examrecord.getallcolumn( examrecord, examrecord)
        if "vipread" in req_dict and "vipread" not in columns:
          del req_dict["vipread"]
        #表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
        __foreEndList__ = getattr(examrecord, "__foreEndList__", None)
        __foreEndListAuth__ = getattr(examrecord, "__foreEndListAuth__", None)

        #authSeparate
        __authSeparate__ = getattr(examrecord, "__authSeparate__", None)

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
        __authTables__ = getattr(examrecord, "__authTables__", None)

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
        
        if examrecord.__tablename__[:7]=="discuss":
            try:
                del req_dict['userid']
            except Exception:
                pass

        q = _active_records_q()
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = examrecord.page(examrecord, examrecord, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def examrecord_save(request):
    '''
    后台新增
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        if 'clicktime' in req_dict.keys():
            del req_dict['clicktime']
        tablename=Auth().getTokenInfo(request).get('tablename')
        __isAdmin__ = None
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__==tablename:

                __isAdmin__ = getattr(m, "__isAdmin__", None)
                break

        #获取全部列名
        columns=  examrecord.getallcolumn( examrecord, examrecord)
        if tablename!='users' and req_dict.get("userid")==None and 'userid' in columns  and __isAdmin__!='是':
            params=Auth().getTokenInfo(request).get('params')
            req_dict['userid']=params.get('id')


        if 'addtime' in req_dict.keys():
            del req_dict['addtime']

        idOrErr= examrecord.createbyreq(examrecord,examrecord, req_dict)
        if isinstance(idOrErr, str):
            msg['code'] = crud_error_code
            msg['msg'] = idOrErr
        else:
            msg['data'] = idOrErr

        return JsonResponse(msg, encoder=CustomJsonEncoder)

def examrecord_add(request):
    '''
    前台新增
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        tablename=Auth().getTokenInfo(request).get('tablename')

        #获取全部列名
        columns=  examrecord.getallcolumn( examrecord, examrecord)
        __authSeparate__ = getattr(examrecord, "__authSeparate__", None)

        if __authSeparate__=="是":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users" and 'userid' in columns:
                try:
                    req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")
                except Exception:
                    pass

        __foreEndListAuth__ = getattr(examrecord, "__foreEndListAuth__", None)

        if __foreEndListAuth__ and __foreEndListAuth__!="否":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users":
                req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")


        if 'addtime' in req_dict.keys():
            del req_dict['addtime']
        error= examrecord.createbyreq(examrecord,examrecord, req_dict)
        if isinstance(error, str):
            msg['code'] = crud_error_code
            msg['msg'] = error
        else:
            msg['data'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def examrecord_progress(request):
    '''
    保存或读取测评中断进度。
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        user_id, username = _current_user(request)
        paper_id = req_dict.get("paperid")
        if not user_id or not paper_id:
            msg["code"] = validate_param_code
            msg["msg"] = "缺少用户或测评ID"
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        try:
            paper_id = int(paper_id)
        except Exception:
            msg["code"] = validate_param_code
            msg["msg"] = "测评ID格式错误"
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        if request.method == "GET":
            record = _get_progress_record(user_id, paper_id)
            if record:
                answers, updated_at = _parse_progress_payload(record.options)
                msg["data"] = {
                    "examno": record.examno,
                    "paperid": record.paperid,
                    "papername": record.papername,
                    "currentIndex": _safe_int(record.score, 0),
                    "answers": answers,
                    "updatedAt": updated_at,
                    "savedAt": record.addtime,
                }
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        current_index = _safe_int(req_dict.get("currentIndex"), 0)
        answers = req_dict.get("answers") or {}
        updated_at = req_dict.get("updatedAt") or int(time.time() * 1000)
        updated_at = _safe_int(updated_at, int(time.time() * 1000))
        paper_name = req_dict.get("papername") or ""
        examno = req_dict.get("examno") or "{}-{}".format(user_id, int(time.time() * 1000))
        payload = _serialize_progress_payload(answers, updated_at)

        record = _get_progress_record(user_id, paper_id)
        progress_question = _progress_question(paper_id)
        if not progress_question:
            msg["code"] = validate_param_code
            msg["msg"] = "当前测评没有题目，无法保存进度"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        params = {
            "userid": user_id,
            "username": username,
            "paperid": paper_id,
            "papername": paper_name,
            "questionid": progress_question.id,
            "questionname": PROGRESS_QUESTION_NAME,
            "type": PROGRESS_TYPE,
            "ismark": 0,
            "options": payload,
            "score": current_index,
            "answer": "",
            "analysis": "未完成测评进度",
            "myscore": 0,
            "myanswer": PROGRESS_QUESTION_NAME,
            "examno": examno,
        }
        if record:
            params["id"] = record.id
            error = examrecord.updatebyparams(examrecord, examrecord, params)
            if error:
                msg["code"] = crud_error_code
                msg["msg"] = error
        else:
            record_id = examrecord.createbyreq(examrecord, examrecord, params)
            if isinstance(record_id, str):
                msg["code"] = crud_error_code
                msg["msg"] = record_id
        msg["data"] = {
            "examno": examno,
            "paperid": paper_id,
            "currentIndex": current_index,
            "answers": answers,
            "updatedAt": updated_at,
        }
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def examrecord_submit(request):
    '''
    一次性提交整份测评，后端统一保存逐题记录并生成SCL-90结果。
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        user_id, username = _current_user(request)
        paper_id = req_dict.get("paperid")
        if not user_id or not paper_id:
            msg["code"] = validate_param_code
            msg["msg"] = "缺少用户或测评ID"
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        paper = exampaper.objects.filter(id=paper_id).first()
        if not paper:
            msg["code"] = validate_param_code
            msg["msg"] = "测评不存在"
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        answers = _parse_json(req_dict.get("answers"), req_dict.get("answers") or {})
        if not isinstance(answers, dict):
            msg["code"] = validate_param_code
            msg["msg"] = "答案格式错误"
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        examno = req_dict.get("examno") or "{}-{}".format(user_id, int(time.time() * 1000))
        question_list = list(examquestion.objects.filter(paperid=paper.id).all())
        question_list.sort(key=lambda item: item.sequence or 0, reverse=True)
        has_subject = any(int(item.type or 0) == 4 for item in question_list)

        # Replace only the same unfinished/submitted attempt; other history remains intact.
        examrecord.objects.filter(userid=user_id, paperid=paper.id, examno=examno).delete()

        total_score = 0
        saved_records = []
        for question in question_list:
            answer_value = answers.get(str(question.id), answers.get(question.id, ""))
            options = _parse_json(question.options, [])
            myscore = _score_answer(question.type, answer_value, options)
            total_score += myscore
            params = {
                "userid": user_id,
                "username": username or uni_username_fallback(request),
                "paperid": paper.id,
                "papername": paper.name,
                "questionid": question.id,
                "questionname": question.questionname,
                "type": question.type,
                "ismark": 0 if has_subject else 1,
                "options": json.dumps(options, ensure_ascii=False),
                "score": question.score,
                "answer": question.answer,
                "analysis": question.analysis,
                "myscore": myscore,
                "myanswer": _answer_to_text(answer_value),
                "examno": examno,
            }
            record = examrecord.objects.create(**params)
            params["id"] = record.id
            saved_records.append(params)

        progress = _get_progress_record(user_id, paper.id)
        if progress:
            progress.delete()

        result = {}
        if is_scl90_paper(paper.name, len(question_list)):
            scores_by_position = {}
            for index, question in enumerate(question_list, start=1):
                answer_value = answers.get(str(question.id), answers.get(question.id, ""))
                scores_by_position[index] = normalize_score(answer_value)
            result = calculate_scl90(scores_by_position)
            warning_info = _create_scl90_warning(user_id, username or uni_username_fallback(request), paper, examno, result)
        elif _is_phq9_paper(paper) or _is_gad7_paper(paper):
            option_scores = {str(o["code"]): int(o["score"]) for o in PHQ_GAD_OPTIONS}
            ordered_ids = [q.id for q in question_list]
            scores = []
            for qid in ordered_ids:
                answer_value = answers.get(str(qid), answers.get(qid, ""))
                scores.append(option_scores.get(str(answer_value), 0))
            if _is_phq9_paper(paper):
                result = score_phq9(scores)
            else:
                result = score_gad7(scores)
            warning_info = {"created": False, "recipientCount": 0}
        else:
            warning_info = {"created": False, "recipientCount": 0}

        msg["data"] = {
            "examno": examno,
            "paperid": paper.id,
            "papername": paper.name,
            "score": total_score,
            "recordCount": len(saved_records),
            "result": result,
            "aiReport": generate_report(result) if result else {},
            "warning": warning_info,
        }
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def examrecord_result(request):
    '''
    获取某次测评聚合结果；SCL-90返回因子分析。
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        user_id, _ = _current_user(request)
        paper_id = req_dict.get("paperid")
        examno = req_dict.get("examno")
        if not paper_id:
            msg["code"] = validate_param_code
            msg["msg"] = "缺少用户或测评ID"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        paper = exampaper.objects.filter(id=paper_id).first()
        if not paper:
            msg["code"] = validate_param_code
            msg["msg"] = "测评不存在"
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        queryset = examrecord.objects.filter(paperid=paper.id).exclude(questionname=PROGRESS_QUESTION_NAME)
        if _is_admin_request(request):
            requested_user_id = req_dict.get("userid")
            if requested_user_id:
                queryset = queryset.filter(userid=requested_user_id)
        else:
            tablename = Auth().getTokenInfo(request).get('tablename')
            params = Auth().getTokenInfo(request).get('params') or {}
            requested_user_id = req_dict.get("userid")
            if tablename == rbac.DOCTOR_TABLE:
                # 医生：按预约关系读报告，仅限「预约过自己」的患者
                if requested_user_id:
                    if not _doctor_can_read_userid(request, requested_user_id):
                        return _forbidden_response("无权查看该用户的测评报告")
                    queryset = queryset.filter(userid=requested_user_id)
                else:
                    allowed = _patient_userids_for_doctor(params)
                    if not allowed:
                        return _forbidden_response("暂无权限查看测评报告")
                    queryset = queryset.filter(userid__in=allowed)
            elif tablename == rbac.USER_TABLE:
                if not user_id:
                    return _forbidden_response("请先登录后查看测评报告")
                if requested_user_id and str(requested_user_id) != str(user_id):
                    return _forbidden_response("无权查看他人的测评报告")
                queryset = queryset.filter(userid=user_id)
            else:
                return _forbidden_response("请先登录后查看测评报告")
        if examno:
            queryset = queryset.filter(examno=examno)
        else:
            latest = queryset.order_by("-addtime", "-id").first()
            if latest:
                queryset = queryset.filter(examno=latest.examno)
                examno = latest.examno
        records = list(queryset.all())
        total_score = sum(int(item.myscore or 0) for item in records)
        result = _build_scl90_result(paper, records) or _build_phq_gad_result(paper, records)
        answered_count = len([item for item in records if item.myanswer not in (None, "", PROGRESS_QUESTION_NAME)])
        question_count = examquestion.objects.filter(paperid=paper.id).count()
        completed_at = max([item.addtime for item in records], default=None)
        msg["data"] = {
            "examno": examno,
            "userid": records[0].userid if records else (req_dict.get("userid") or user_id),
            "username": records[0].username if records else "",
            "paperid": paper.id,
            "papername": paper.name,
            "score": total_score,
            "recordCount": len(records),
            "answeredCount": answered_count,
            "questionCount": question_count or len(records),
            "completedAt": completed_at,
            "result": result,
            "aiReport": generate_report(result) if result else {},
        }
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def examrecord_thumbsup(request,id_):
    '''
     点赞：表属性thumbsUp[是/否]，刷表新增thumbsupnum赞和crazilynum踩字段，
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        id_=int(id_)
        type_=int(req_dict.get("type",0))
        rets=examrecord.getbyid(examrecord,examrecord,id_)

        update_dict={
        "id":id_,
        }
        if type_==1:#赞
            update_dict["thumbsupnum"]=int(rets[0].get('thumbsupnum'))+1
        elif type_==2:#踩
            update_dict["crazilynum"]=int(rets[0].get('crazilynum'))+1
        error = examrecord.updatebyparams(examrecord,examrecord, update_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def examrecord_info(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data = examrecord.getbyid(examrecord,examrecord, int(id_))
        # 守卫：管理员全量；医生按预约；本人仅自己
        if len(data) > 0 and not _can_read_examrecord(request, data[0]):
            return _forbidden_response('无权查看该测评记录')
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
        __browseClick__ = getattr(examrecord, "__browseClick__", None)

        if __browseClick__=="是"  and  "clicknum"  in examrecord.getallcolumn(examrecord,examrecord):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}
            ret=examrecord.updatebyparams(examrecord,examrecord,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def examrecord_detail(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data =examrecord.getbyid(examrecord,examrecord, int(id_))
        # 守卫：管理员全量；医生按预约；本人仅自己
        if len(data)>0 and not _can_read_examrecord(request, data[0]):
            return _forbidden_response('无权查看该测评记录')
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
        __browseClick__ = getattr(examrecord, "__browseClick__", None)

        if __browseClick__=="是"   and  "clicknum"  in examrecord.getallcolumn(examrecord,examrecord):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}

            ret=examrecord.updatebyparams(examrecord,examrecord,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def examrecord_update(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        # 守卫：答题记录只能由管理员修改（批卷/更正）
        if not rbac.is_admin(request):
            return _forbidden_response('无权修改该测评记录')

        if 'clicktime' in req_dict.keys() and req_dict['clicktime']=="None":
            del req_dict['clicktime']
        if req_dict.get("mima") and "mima" not in examrecord.getallcolumn(examrecord,examrecord) :
            del req_dict["mima"]
        if req_dict.get("password") and "password" not in examrecord.getallcolumn(examrecord,examrecord) :
            del req_dict["password"]
        try:
            del req_dict["clicknum"]
        except Exception:
            pass


        error = examrecord.updatebyparams(examrecord, examrecord, req_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error

        return JsonResponse(msg)


def examrecord_delete(request):
    '''
    批量删除
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        # 守卫：答题记录只能由管理员批量删除
        if not rbac.is_admin(request):
            return _forbidden_response('无权删除该测评记录')

        error=examrecord.deletes(examrecord,
            examrecord,
             req_dict.get("ids")
        )
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg)


def examrecord_vote(request,id_):
    '''
    浏览点击次数（表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1）
统计商品或新闻的点击次数；提供新闻的投票功能
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code}


        data= examrecord.getbyid(examrecord, examrecord, int(id_))
        for i in data:
            votenum=i.get('votenum')
            if votenum!=None:
                params={"id":int(id_),"votenum":votenum+1}
                error=examrecord.updatebyparams(examrecord,examrecord,params)
                if error!=None:
                    msg['code'] = crud_error_code
                    msg['msg'] = error
        return JsonResponse(msg)

def examrecord_importExcel(request):
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
                    examrecord.createbyreq(examrecord, examrecord, req_dict)
                    
            except Exception:
                pass
                
        else:
            msg = {
                "msg": "文件类型错误",
                "code": 500
            }
                
        return JsonResponse(msg)

def examrecord_autoSort2(request):
    return JsonResponse({"code": 0, "msg": '',  "data":{}})


#选项统计接口
def examrecord_options_num(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        # 处理参数
        try:
            page1 = int(req_dict.get("page"))
        except Exception:
            page1 = 1
        try:
            limit1 = int(req_dict.get("limit"))
        except Exception:
            limit1 = 10
        start = limit1 * (page1 - 1)
        end = limit1 * (page1 - 1) + limit1 + 1
        try:
            del req_dict["page"]
            del req_dict["limit"]
        except Exception:
            pass
        datas = examrecord.objects.filter(**req_dict).exclude(questionname=PROGRESS_QUESTION_NAME).annotate(paperids=Count('paperid')).all()
        try:
            data = [model_to_dict(i) for i in datas]
            for item in data:
                anum = datas.filter(questionid=item['questionid']).aggregate(
                    anum=Sum(Case(When(myanswer__contains='A', then=1), default=0, output_field=IntegerField())))[
                    'anum']
                bnum = datas.filter(questionid=item['questionid']).aggregate(
                    bnum=Sum(Case(When(myanswer__contains='B', then=1), default=0, output_field=IntegerField())))[
                    'bnum']
                cnum = datas.filter(questionid=item['questionid']).aggregate(
                    cnum=Sum(Case(When(myanswer__contains='C', then=1), default=0, output_field=IntegerField())))[
                    'cnum']
                dnum = datas.filter(questionid=item['questionid']).aggregate(
                    dnum=Sum(Case(When(myanswer__contains='D', then=1), default=0, output_field=IntegerField())))[
                    'dnum']
                item['anum']=anum
                item['bnum']=bnum
                item['cnum']=cnum
                item['dnum']=dnum
        except Exception:
            data = datas
        result_list = []
        for item in data:
            has_questionname_one = any(i['questionname'] == item['questionname'] for i in result_list)
            if not has_questionname_one:
                result_list.append(item)
        data = result_list
        # 赋值分页查询所得数据
        try:
            div = divmod(len(data), limit1)
            if div[1] > 0:
                totalPage = div[0] + 1
            else:
                totalPage = div[0]
        except Exception:
            totalPage = 1
        # 赋值分页参数
        msg["data"] = {"pageSize": limit1,
                       "total": len(data),
                       "totalPage": totalPage,
                       "currPage": page1,
                       "list": data[start:end]
                       }
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def examrecord_groupby(request):
    '''
    按每次测评提交聚合报告入口，前台用于查看柱状图和心理分析。
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        try:
            try:
                page1 = int(req_dict.get("page"))
            except Exception:
                page1 = 1
            try:
                limit1 = int(req_dict.get("limit"))
            except Exception:
                limit1 = 10

            papername = str(req_dict.get("papername") or "").replace("%", "")
            paperid = req_dict.get("paperid")
            requested_userid = req_dict.get("userid")
            queryset = examrecord.objects.exclude(questionname=PROGRESS_QUESTION_NAME)
            if paperid:
                queryset = queryset.filter(paperid=paperid)
            if papername:
                queryset = queryset.filter(papername__icontains=papername)
            if _is_admin_request(request):
                if requested_userid:
                    queryset = queryset.filter(userid=requested_userid)
            else:
                tablename = Auth().getTokenInfo(request).get('tablename')
                params = Auth().getTokenInfo(request).get('params') or {}
                if tablename == rbac.DOCTOR_TABLE:
                    # 医生：按预约关系读报告
                    if requested_userid:
                        if not _doctor_can_read_userid(request, requested_userid):
                            return _forbidden_response("无权查看该用户的测评报告")
                        queryset = queryset.filter(userid=requested_userid)
                    else:
                        allowed = _patient_userids_for_doctor(params)
                        if not allowed:
                            return _forbidden_response("暂无权限查看测评报告")
                        queryset = queryset.filter(userid__in=allowed)
                elif tablename == rbac.USER_TABLE:
                    current_userid, _ = _current_user(request)
                    if not current_userid:
                        return _forbidden_response("请先登录后查看测评报告")
                    if requested_userid and str(requested_userid) != str(current_userid):
                        return _forbidden_response("无权查看他人的测评报告")
                    queryset = queryset.filter(userid=current_userid)
                else:
                    return _forbidden_response("请先登录后查看测评报告")

            question_counts = {}
            paper_ids = set(queryset.values_list("paperid", flat=True))
            if paper_ids:
                question_counts = dict(
                    examquestion.objects.filter(paperid__in=paper_ids)
                    .values("paperid")
                    .annotate(count=Count("id"))
                    .values_list("paperid", "count")
                )

            attempts = {}
            for item in queryset.order_by("-addtime", "-id").all():
                key = "{}#{}#{}".format(item.userid, item.paperid, item.examno or "")
                if key not in attempts:
                    attempts[key] = {
                        "userid": item.userid,
                        "username": item.username,
                        "paperid": item.paperid,
                        "papername": item.papername,
                        "myscore": 0,
                        "examno": item.examno,
                        "ismark": 0,
                        "recordCount": 0,
                        "answeredCount": 0,
                        "questionCount": question_counts.get(item.paperid, 0),
                        "createdAt": item.addtime,
                    }
                attempt = attempts[key]
                attempt["myscore"] += int(item.myscore or 0)
                attempt["recordCount"] += 1
                if item.myanswer not in (None, "", PROGRESS_QUESTION_NAME):
                    attempt["answeredCount"] += 1
                if int(item.type or 0) == 4 and int(item.ismark or 0) == 0:
                    attempt["ismark"] = 1
                if item.addtime and item.addtime > attempt["createdAt"]:
                    attempt["createdAt"] = item.addtime
            dataList = sorted(attempts.values(), key=lambda item: item.get("createdAt") or datetime.datetime.min, reverse=True)

            total = len(dataList)
            try:
                div = divmod(total, limit1)
                if div[1] > 0:
                    totalPage = div[0] + 1
                else:
                    totalPage = div[0]
            except Exception:
                totalPage = 1
            start = limit1 * (page1 - 1)
            end = limit1 * (page1 - 1) + limit1

            msg["data"] = {"pageSize": limit1,
                           "total": total,
                           "totalPage": totalPage,
                           "currPage": page1,
                           "list":dataList[start:end]
                           }
        except Exception as e:
            msg['code'] = crud_error_code
            msg['msg'] = f"发生错误：{e}"
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def examrecord_deleterecords(request):
    '''
    按键值对参数添加删除记录
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code}
        req_dict = request.session.get("req_dict")
        # 守卫：仅管理员可按键值对批量删除（清除考试记录）
        if not rbac.is_admin(request):
            return _forbidden_response('无权删除该测评记录')
        error=examrecord.deletebyparams(examrecord,examrecord,req_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg)










