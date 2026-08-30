#coding:utf-8
"""AI 倾诉/情绪对话接口。

接口（注册于 main/urls.py 的 talksession/talkmessage 特殊路由）：
    POST talksession/send    发消息 → 返回 AI 回复 + 风险标记（无会话时自动建会话）
    GET  talksession/history 我的会话列表（含首句预览 + 风险等级）
    GET  talksession/messages?sessionid= 某会话的全部消息
    GET  talkmessage/page    管理端分页查看倾诉消息

安全设计：
1. 会话/消息均按 token 中的 userid 隔离，只能查自己的；
2. LLM 失败时走本地共情兜底，保证功能可用；
3. 命中危机关键词时：回复追加转介、消息 riskflag=1、会话 risklevel 提升。
"""
import copy
import datetime
import json

from django.http import JsonResponse

from util.CustomJSONEncoder import CustomJsonEncoder
from .models import talksession, talkmessage
from util.codes import *
from util.auth import Auth
import util.message as mes
from util import rbac
from util.ai_risk import CRISIS_KEYWORDS
from util.talk_content import (
    SYSTEM_PROMPT, OPENING, EMOTIONS, CRISIS_REPLY, DISCLAIMER, FALLBACK_REPLY,
)
from util.llm_client import chat_text, LlmError

# 每次参与 LLM 上下文的历史消息条数上限（成对，即最近 N 轮）
HISTORY_PAIRS = 6
# 消息内容最大长度
CONTENT_MAX_LENGTH = 2000


def _current_user(request):
    token_info = Auth().getTokenInfo(request) or {}
    params = token_info.get('params') or {}
    user_id = params.get('id')
    username = (
        params.get('username')
        or params.get('yonghuxingming')
        or params.get('yonghuzhanghao')
        or params.get('yishengxingming')
        or params.get('yishenggonghao')
        or ""
    )
    return user_id, username


def _is_admin(request):
    return rbac.is_admin(request)


def _forbidden(msg='无权访问'):
    return rbac.forbidden(msg)


def _check_crisis(text):
    return any(kw in str(text or "") for kw in CRISIS_KEYWORDS)


def _title_from(text):
    text = str(text or "").replace("\n", " ").strip()
    return text[:18] or "新的倾诉"


def _history_messages(session_id, current_user_message):
    """构建 LLM 多轮上下文：最近的 (user, assistant) 对 + 当前消息。"""
    rows = list(
        talkmessage.objects.filter(sessionid=session_id, role__in=("user", "assistant"))
        .order_by("-addtime", "-id")[:HISTORY_PAIRS * 2]
    )
    rows.reverse()
    messages = []
    for row in rows:
        messages.append({"role": "user" if row.role == "user" else "assistant", "content": row.content})
    messages.append({"role": "user", "content": current_user_message})
    return messages


def _llm_reply(session_id, user_message):
    messages = _history_messages(session_id, user_message)
    try:
        reply = chat_text(SYSTEM_PROMPT, messages, temperature=0.7)
    except LlmError:
        reply = None
    except Exception:
        reply = None

    if not reply:
        # 本地兜底：按情绪关键词给共情回应
        reply = _keyword_reply(user_message)
    return reply


def _keyword_reply(user_message):
    """按情绪关键词匹配兜底共情回应。"""
    text = str(user_message or "")
    # 情绪名 → 关键词（扩展同义表达）
    keywords = {
        "焦虑": ("焦虑", "担心", "紧张", "心慌", "坐立不安"),
        "低落": ("难过", "低落", "抑郁", "开心不起来", "没劲", "提不起劲"),
        "压力": ("压力", "压垮", "喘不过气", "事情太多"),
        "愤怒": ("生气", "愤怒", "火大", "憋屈"),
        "孤独": ("孤独", "寂寞", "没人理解", "一个人"),
        "失眠": ("失眠", "睡不着", "早醒", "多梦"),
        "学业": ("考试", "学业", "学习", "挂科", "绩点"),
        "恋爱": ("恋爱", "分手", "男朋友", "女朋友", "对象"),
        "家庭": ("爸妈", "父母", "家庭", "家人"),
        "自我怀疑": ("没用", "自我怀疑", "我不行", "做不到", "自卑"),
    }
    for label, kws in keywords.items():
        if any(kw in text for kw in kws):
            item = EMOTIONS[label]
            return "{} {} {}".format(item["empathy"], item["question"], item["advice"])
    return FALLBACK_REPLY


def talksession_open(request):
    """新建一个倾诉会话，返回会话 id 与开场白。"""
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        user_id, username = _current_user(request)
        if not user_id:
            return _forbidden('请先登录')

        session = talksession.objects.create(
            userid=user_id,
            title='新的倾诉',
            risklevel='无',
        )
        talkmessage.objects.create(sessionid=session.id, userid=user_id, role='assistant', content=OPENING, riskflag=0)

        msg["data"] = {
            "sessionid": session.id,
            "opening": OPENING,
            "disclaimer": DISCLAIMER,
        }
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def talksession_send(request):
    """发一条消息，返回 AI 回复。"""
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict") or {}
        user_id, username = _current_user(request)
        if not user_id:
            return _forbidden('请先登录')

        content = str(req_dict.get("content") or req_dict.get("message") or "").strip()
        if not content:
            msg["code"] = validate_param_code
            msg["msg"] = "消息不能为空"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        if len(content) > CONTENT_MAX_LENGTH:
            msg["code"] = validate_param_code
            msg["msg"] = "消息过长"
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        session_id = req_dict.get("sessionid")
        if session_id:
            session = talksession.objects.filter(id=session_id, userid=user_id).first()
            if not session:
                return _forbidden('会话不存在')
        else:
            session = talksession.objects.create(
                userid=user_id,
                title=_title_from(content),
                risklevel='无',
            )
            # 新会话：插入开场白
            talkmessage.objects.create(sessionid=session.id, userid=user_id, role='assistant', content=OPENING, riskflag=0)

        # 生成回复（必须先于用户消息落库：_llm_reply 会从库里取历史上下文，
        # 若先落库则当前消息会被 _history_messages 取到、又在末尾 append 一次，导致重复）
        crisis = _check_crisis(content)
        if crisis:
            reply = CRISIS_REPLY
        else:
            reply = _llm_reply(session.id, content)

        # 保存用户消息
        talkmessage.objects.create(
            sessionid=session.id, userid=user_id, role='user', content=content, riskflag=1 if crisis else 0,
        )

        # 保存 AI 回复（若回复也命中危机词，同样标记）
        reply_crisis = _check_crisis(reply)
        talkmessage.objects.create(
            sessionid=session.id, userid=user_id, role='assistant', content=reply, riskflag=1 if reply_crisis else 0,
        )

        # 更新会话风险等级与标题
        session_risk = '危机' if (crisis or reply_crisis) else session.risklevel
        session.title = session.title or _title_from(content)
        if crisis or reply_crisis:
            session.risklevel = '危机'
        session.save(update_fields=['title', 'risklevel'])

        msg["data"] = {
            "sessionid": session.id,
            "reply": reply,
            "risk": session_risk,
            "crisis": bool(crisis or reply_crisis),
        }
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def talksession_page(request):
    """管理端分页查看倾诉会话（仅管理员）。"""
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {"currPage": 1, "totalPage": 1, "total": 1, "pageSize": 10, "list": []}}
        req_dict = request.session.get("req_dict") or {}
        if not _is_admin(request):
            return _forbidden('只有管理员可查看')

        # 不区分用户，管理员可看全部
        req_dict.pop("userid", None)
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
            msg['data']['pageSize'] = talksession.page(talksession, talksession, req_dict, request)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def talksession_history(request):
    """我的会话列表。"""
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": []}
        user_id, _ = _current_user(request)
        if not user_id:
            return _forbidden('请先登录')

        sessions = list(talksession.objects.filter(userid=user_id).order_by('-addtime', '-id'))
        data = []
        for s in sessions:
            first = talkmessage.objects.filter(sessionid=s.id, role='user').order_by('addtime', 'id').first()
            # 跳过空会话（仅进入页面即创建、但从未发过消息的会话），避免历史列表被污染
            if not first:
                continue
            data.append({
                "id": s.id,
                "title": s.title,
                "risklevel": s.risklevel,
                "addtime": s.addtime.strftime('%Y-%m-%d %H:%M:%S') if s.addtime else "",
                "preview": first.content,
            })
        msg["data"] = data
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def talksession_messages(request):
    """某会话的全部消息。"""
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {"sessionid": None, "risklevel": "无", "list": []}}
        req_dict = request.session.get("req_dict") or {}
        user_id, _ = _current_user(request)
        if not user_id:
            return _forbidden('请先登录')

        session_id = req_dict.get("sessionid")
        session = talksession.objects.filter(id=session_id, userid=user_id).first()
        if not session:
            return _forbidden('会话不存在')

        rows = list(talkmessage.objects.filter(sessionid=session.id).order_by('addtime', 'id'))
        msg["data"] = {
            "sessionid": session.id,
            "risklevel": session.risklevel,
            "disclaimer": DISCLAIMER,
            "list": [
                {
                    "role": r.role,
                    "content": r.content,
                    "riskflag": r.riskflag,
                    "addtime": r.addtime.strftime('%Y-%m-%d %H:%M:%S') if r.addtime else "",
                }
                for r in rows
            ],
        }
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def talkmessage_page(request):
    """管理端分页查看倾诉消息。"""
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {"currPage": 1, "totalPage": 1, "total": 1, "pageSize": 10, "list": []}}
        req_dict = request.session.get("req_dict") or {}
        if not _is_admin(request):
            return _forbidden('只有管理员可查看')

        # 不区分用户，管理员可看全部
        req_dict.pop("userid", None)
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
            msg['data']['pageSize'] = talkmessage.page(talkmessage, talkmessage, req_dict, request)
        return JsonResponse(msg, encoder=CustomJsonEncoder)
