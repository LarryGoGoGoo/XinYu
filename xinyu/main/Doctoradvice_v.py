#coding:utf-8
"""医生助手（辅助诊断建议）接口。

接口（注册于 main/urls.py 的 doctoradvice 特殊路由）：
    POST doctoradvice/advice  症状输入 → 返回建议（并落库）
    GET  doctoradvice/history 我的历史建议

安全设计：
1. 按 token 中的 userid 隔离，只能查自己的；
2. LLM 失败时走症状关键词兜底；
3. 高危/急症不输出倾向，直接转介；
4. 强免责声明。
"""
import json

from django.http import JsonResponse

from util.CustomJSONEncoder import CustomJsonEncoder
from .models import doctoradvice
from util.codes import *
from util.auth import Auth
import util.message as mes
from util import rbac
from util.doctor_content import SYSTEM_PROMPT, DISCLAIMER, is_crisis, fallback_advice
from util.llm_client import chat_json, LlmError

CONTENT_MAX_LENGTH = 2000


def _current_user(request):
    token_info = Auth().getTokenInfo(request) or {}
    params = token_info.get('params') or {}
    user_id = params.get('id')
    return user_id


def _forbidden(msg='无权访问'):
    return rbac.forbidden(msg)


def _is_admin(request):
    return rbac.is_admin(request)


def _llm_advice(symptoms):
    try:
        raw = chat_json(SYSTEM_PROMPT, "症状描述：{}".format(symptoms), temperature=0.2)
        return {
            "tendency": str(raw.get("tendency") or "")[:200],
            "department": str(raw.get("department") or "")[:200],
            "action": str(raw.get("action") or "")[:400],
            "advice": str(raw.get("advice") or "")[:200],
            "source": "llm",
        }
    except LlmError:
        return None
    except Exception:
        return None


def doctoradvice_advice(request):
    """症状输入 → 辅助建议。"""
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict") or {}
        user_id = _current_user(request)
        if not user_id:
            return _forbidden('请先登录')

        symptoms = str(req_dict.get("symptoms") or req_dict.get("content") or "").strip()
        if not symptoms:
            msg["code"] = validate_param_code
            msg["msg"] = "请描述你的症状"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        if len(symptoms) > CONTENT_MAX_LENGTH:
            msg["code"] = validate_param_code
            msg["msg"] = "描述过长"
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        # 高危/急症：不调用 LLM，直接转介
        if is_crisis(symptoms):
            advice = fallback_advice(symptoms)
        else:
            advice = _llm_advice(symptoms)
            if advice is None or not advice.get("tendency"):
                advice = fallback_advice(symptoms)

        advice["disclaimer"] = DISCLAIMER

        doctoradvice.objects.create(
            userid=user_id,
            symptoms=symptoms,
            tendency=advice.get("tendency") or "",
            department=advice.get("department") or "",
            action=advice.get("action") or "",
            source=advice.get("source") or "keyword",
        )

        msg["data"] = advice
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def doctoradvice_page(request):
    """管理端分页查看医生助手建议（仅管理员）。"""
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {"currPage": 1, "totalPage": 1, "total": 1, "pageSize": 10, "list": []}}
        req_dict = request.session.get("req_dict") or {}
        if not _is_admin(request):
            return _forbidden('只有管理员可查看')

        # 不区分用户，管理员可看全部
        req_dict.pop("userid", None)
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
            msg['data']['pageSize'] = doctoradvice.page(doctoradvice, doctoradvice, req_dict, request)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def doctoradvice_history(request):
    """我的历史建议。"""
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": []}
        user_id = _current_user(request)
        if not user_id:
            return _forbidden('请先登录')

        rows = list(doctoradvice.objects.filter(userid=user_id).order_by('-addtime', '-id'))
        msg["data"] = [
            {
                "id": r.id,
                "symptoms": r.symptoms,
                "tendency": r.tendency,
                "department": r.department,
                "action": r.action,
                "source": r.source,
                "addtime": r.addtime.strftime('%Y-%m-%d %H:%M:%S') if r.addtime else "",
            }
            for r in rows
        ]
        return JsonResponse(msg, encoder=CustomJsonEncoder)
