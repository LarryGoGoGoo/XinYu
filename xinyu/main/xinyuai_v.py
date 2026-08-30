#coding:utf-8
"""心语AI —— 共情型 AI 倾诉对话 + 语义级危机风险预警。

接口（注册于 main/urls.py 的特殊路由，路径与心语AI H5 页完全一致）：
    POST xinyuai/chat     发送一条消息 → 返回 AI 回复 + 风险等级 + 命中关键词
    GET  xinyuai/history  当前用户的聊天历史
    POST xinyuai/clear    清空当前用户的聊天记录

设计要点：
1. 完全复用项目已有的 util/llm_client（OpenAI 兼容，默认智谱 GLM-4-Flash），
   API Key 走 config 表（键名 llm），不再硬编码；
2. 风险预警复用 util/ai_risk 的四级体系（low/medium/high/crisis），与心情日记
   预警统一；crisis 级触发前端红色预警条/危机卡片；
3. 预警闭环与日记一致：命中 → 写 jiankangyujing（健康预警）表 + 给管理员/心理医生
   发 popupremind（弹窗提醒），24 小时内同用户同来源去重；
4. 聊天记录独立落库 xinyuai_chat 表（id 显式安全生成，避免 JS 大整数精度丢失）。
"""
import datetime
import json

from django.http import JsonResponse
from django.utils import timezone

from util.CustomJSONEncoder import CustomJsonEncoder
from util.auth import Auth
from util.codes import *
from util.llm_client import chat_text
import util.message as mes
from util.ai_risk import analyze_diary_risk, CRISIS_KEYWORDS, LEVEL_LABELS
from util import rbac

from .models import (
    jiankangyujing, popupremind, users, xinliyisheng, yonghu,
)
from .models import xinyuai_chat as XinyuaiChatModel

# 与心语AI H5 页保持一致的风险来源标识
XINYU_SOURCE = "心语AI对话"
XINYU_WARNING_TITLE = "心语AI风险预警"

# 聊天内容最大长度
CONTENT_MAX_LENGTH = 500
# 携带的历史上下文条数（最近 N 轮）
HISTORY_PAIRS = 5
# 预警字段长度约束（与日记预警对齐）
JIANKANGYUJING_ACCOUNT_MAX_LENGTH = 16
JIANKANGYUJING_NAME_MAX_LENGTH = 16
JIANKANGYUJING_TEXT_MAX_LENGTH = 200

# 全国统一心理援助热线（与项目其他模块保持一致）
HOTLINE = "12356"

# 心语AI 系统提示词（温暖共情 + 非医疗边界 + 危机引导）
XINYU_SYSTEM_PROMPT = (
    "你是「心语AI」，一个温暖、共情的心理健康陪伴助手。你的职责：\n"
    "1. 倾听用户的烦恼和情绪，给予真诚的情感支持；\n"
    "2. 用温和、非评判性的语言回应，让用户感到被理解和接纳；\n"
    "3. 在用户情绪低落时给予积极引导，帮助用户看到希望；\n"
    "4. 根据用户的昵称、性别等信息给出个性化的回应；\n"
    "5. 可以建议简单的情绪调节方法（如深呼吸、正念、运动、与人倾诉等）。\n\n"
    "重要边界：\n"
    "- 你不是医生，不能提供医疗诊断、处方或治疗方案；\n"
    "- 如果用户提到自杀、自伤等危机情况，要立即表达关心和重视，"
    "强烈建议联系心理医生或心理援助热线（全国心理援助热线：12356）；\n"
    "- 如果用户有严重心理问题，建议寻求专业心理咨询师的帮助；\n"
    "- 回复要简洁自然，像朋友聊天一样，不要太长篇大论；\n"
    "- 用中文回复。"
)

# AI 服务故障时的兜底回复
FALLBACK_REPLY = (
    "抱歉，我现在有点累了，稍后再聊好吗？如果你有紧急的心理困扰，"
    "请拨打心理援助热线 {}。".format(HOTLINE)
)

# 危机转介话术（命中危机词时确定性输出，不依赖 LLM，与「小暖倾诉」对齐）
CRISIS_REPLY = (
    "你愿意告诉我这些，真的很不容易，谢谢你信任我。"
    "我可能没法真正替代专业的帮助。如果你现在感到非常痛苦、甚至有伤害自己的念头，"
    "请一定先联系能立即帮到你的人：全国 24 小时心理援助热线 {}，或直接拨打 120。"
    "你的安全是最重要的，好吗？".format(HOTLINE)
)


def _truncate(value, max_length):
    return str(value or "")[:max_length]


def _token_info(request):
    info = Auth().getTokenInfo(request) or {}
    return info.get('tablename'), info.get('params') or {}


def _current_user(request):
    """返回 (account_key, user_params)。account_key 为用户唯一标识（普通用户取账号，管理员取 id）。"""
    tablename, params = _token_info(request)
    if tablename == rbac.USER_TABLE:
        account = params.get('yonghuzhanghao')
        if account:
            return account, params
    elif tablename == rbac.ADMIN_TABLE:
        user_id = params.get('id')
        if user_id is not None:
            return 'admin_{}'.format(user_id), params
    return None, params


def _user_display_info(params):
    """从 token 参数提取昵称/姓名/性别，供 AI 个性化回应。"""
    nickname = (
        params.get('yonghuxingming')
        or params.get('username')
        or params.get('yishengxingming')
        or ""
    )
    gender = params.get('xingbie') or params.get('gender') or ""
    return nickname, gender


def _create_warning(account, params, content, risk, source=XINYU_SOURCE):
    """命中风险时写健康预警表 + 给管理员/心理医生发弹窗提醒（含 24 小时去重）。"""
    try:
        level = (risk or {}).get('level') or 'medium'
        reason = (risk or {}).get('reason') or ""
        suggestion = (risk or {}).get('suggestion') or ""
        categories = (risk or {}).get('categories') or []

        nickname = params.get('yonghuxingming') or params.get('username') or account or ""
        level_label = LEVEL_LABELS.get(level, '中风险')
        category_text = "、".join(categories) if categories else "情绪风险"

        crisis_hint = ""
        if level == 'crisis':
            crisis_hint = "【紧急】建议立即联系全国心理援助热线 {} 或就近医院心理科，必要时陪同就医。".format(HOTLINE)

        title_text = "{}【{}】{}".format(XINYU_WARNING_TITLE, level_label, category_text)
        suggestion_text = (
            "风险等级：{}；涉及方面：{}。{}".format(level_label, category_text, suggestion)
            + (" " + crisis_hint if crisis_hint else "")
        )
        preview = _truncate(content, 180)

        now = timezone.now()
        # 去重：24 小时内同一用户同一来源（标题前缀）的预警不重复创建
        exists = jiankangyujing.objects.filter(
            yonghuzhanghao=_truncate(account, JIANKANGYUJING_ACCOUNT_MAX_LENGTH),
            yujingtixing__startswith=XINYU_WARNING_TITLE,
            addtime__gte=now - datetime.timedelta(hours=24),
        ).exists()
        if exists:
            return False

        # 自动分配负责医生：优先最近一次已审核预约的主治医生
        from .Jiankangyujing_v import auto_assign_doctor
        doc_number, doc_name = auto_assign_doctor(account)

        jiankangyujing.objects.create(
            yonghuzhanghao=_truncate(account, JIANKANGYUJING_ACCOUNT_MAX_LENGTH),
            yonghuxingming=_truncate(nickname, JIANKANGYUJING_NAME_MAX_LENGTH),
            yujingtixing=_truncate(title_text, JIANKANGYUJING_TEXT_MAX_LENGTH),
            xinlijianyi=_truncate(suggestion_text, JIANKANGYUJING_TEXT_MAX_LENGTH),
            yujingshijian=now,
            fuzeyishenggonghao=doc_number,
            fuzeyishengxingming=doc_name,
        )

        # 弹窗提醒：管理员 + 心理医生
        recipients = []
        for admin in users.objects.all():
            recipients.append((admin.id, admin.username or '管理员'))
        for doctor in xinliyisheng.objects.all():
            recipients.append((doctor.id, doctor.yishenggonghao or '心理医生'))

        popup_content = (
            "用户账号：{}\n"
            "用户姓名：{}\n"
            "风险等级：{}\n"
            "来源：{}\n"
            "分析依据：{}\n"
            "内容摘要：{}\n"
            "建议：{}"
        ).format(
            account, nickname, level_label, source,
            reason or "命中风险关键词",
            preview, suggestion_text,
        )
        for userid, role in recipients:
            popupremind.objects.create(
                userid=userid,
                role=_truncate(role, 200),
                title=_truncate(title_text, 200),
                type="个人",
                brief=_truncate("用户{}{}预警".format(account, source), 200),
                content=popup_content,
                remindtime=now,
            )
        return True
    except Exception as exc:
        import logging
        logging.getLogger('django').warning("心语AI预警记录创建失败: %s", exc)
        return False


def _save_message(account, role, content, risk_level="normal"):
    try:
        XinyuaiChatModel.objects.create(
            yonghuzhanghao=account,
            role=role,
            content=content,
            risk_level=risk_level,
        )
    except Exception as exc:
        import logging
        logging.getLogger('django').warning("心语AI消息保存失败: %s", exc)


def _history_messages(account):
    """取最近 N 轮历史作为 LLM 上下文（升序返回）。"""
    rows = list(
        XinyuaiChatModel.objects.filter(yonghuzhanghao=account)
        .order_by('-addtime', '-id')[:HISTORY_PAIRS * 2]
    )
    rows.reverse()
    return [{"role": r.role, "content": r.content} for r in rows]


def _analyze_chat_risk(text):
    """对话内容风险分析：四级体系（low/medium/high/crisis），无风险返回 None。"""
    return analyze_diary_risk("", text)


def xinyuai_chat(request):
    """心语AI 发送消息接口。"""
    if request.method != 'POST':
        return JsonResponse({"code": 405, "msg": "Method not allowed", "data": {}})

    account, params = _current_user(request)
    if not account:
        return JsonResponse({"code": 401, "msg": "请先登录", "data": {}})

    try:
        body = json.loads(request.body or '{}')
    except Exception:
        body = {}
    message = str(body.get('message') or '').strip()
    if not message:
        return JsonResponse({"code": 1, "msg": "消息不能为空", "data": {}})
    if len(message) > CONTENT_MAX_LENGTH:
        return JsonResponse({"code": 1, "msg": "消息过长（最多500字）", "data": {}})

    # 风险检测（四级体系，复用 util/ai_risk：LLM 语义 + 关键词兜底 + 交叉校验）
    risk = _analyze_chat_risk(message)
    risk_level = (risk or {}).get('level') if risk else 'normal'
    matched = [kw for kw in CRISIS_KEYWORDS if kw in message]
    # 安全优先：命中危机硬关键词时，无条件按危机级处理（与「小暖倾诉」一致），
    # 避免 LLM 漏报导致前端危机卡片不触发。
    is_crisis = bool(matched) or risk_level == 'crisis'
    if is_crisis:
        risk_level = 'crisis'

    # 命中危机 → 确定性输出转介话术，不调用 LLM
    if is_crisis:
        reply = CRISIS_REPLY
        _save_message(account, 'user', message, risk_level)
        _save_message(account, 'assistant', reply)
        _create_warning(account, params, message, risk, source=XINYU_SOURCE)
        return JsonResponse({
            "code": 0,
            "msg": "正常",
            "data": {
                "reply": reply,
                "risk_level": risk_level,
                "matched_keywords": matched,
            },
        }, encoder=CustomJsonEncoder)

    # 构建系统提示词 + 历史上下文，调用 LLM 生成回复
    # （必须先于用户消息落库：_history_messages 会从库取最近历史，
    #   若先落库则当前消息会被取到、又在末尾 append 一次，导致 LLM 收到重复上下文）
    nickname, gender = _user_display_info(params)
    gender_text = "性别：{}".format(gender) if gender else ""
    system_msg = XINYU_SYSTEM_PROMPT + "\n\n当前用户信息：\n昵称：{}\n账号：{}\n{}".format(
        nickname or "朋友", account, gender_text
    )
    messages = _history_messages(account)
    messages.append({"role": "user", "content": message})

    try:
        reply = chat_text(system_msg, messages, temperature=0.7)
    except Exception:
        reply = FALLBACK_REPLY

    # 落库用户消息
    _save_message(account, 'user', message, risk_level)

    # 命中风险 → 写预警
    if risk_level != 'normal':
        _create_warning(account, params, message, risk, source=XINYU_SOURCE)

    # 落库 AI 回复
    _save_message(account, 'assistant', reply)

    return JsonResponse({
        "code": 0,
        "msg": "正常",
        "data": {
            "reply": reply,
            "risk_level": risk_level,
            "matched_keywords": matched,
        },
    }, encoder=CustomJsonEncoder)


def xinyuai_history(request):
    """获取当前用户聊天历史。"""
    account, _ = _current_user(request)
    if not account:
        return JsonResponse({"code": 401, "msg": "请先登录", "data": {}})

    rows = XinyuaiChatModel.objects.filter(yonghuzhanghao=account).order_by('addtime', 'id')[:100]
    messages = []
    for r in rows:
        messages.append({
            "id": r.id,
            "role": r.role,
            "content": r.content,
            "risk_level": r.risk_level,
            "time": r.addtime.strftime('%Y-%m-%d %H:%M:%S') if r.addtime else "",
        })
    return JsonResponse({"code": 0, "msg": "正常", "data": {"list": messages}}, encoder=CustomJsonEncoder)


def xinyuai_clear(request):
    """清空当前用户聊天记录。"""
    if request.method != 'POST':
        return JsonResponse({"code": 405, "msg": "Method not allowed", "data": {}})
    account, _ = _current_user(request)
    if not account:
        return JsonResponse({"code": 401, "msg": "请先登录", "data": {}})

    XinyuaiChatModel.objects.filter(yonghuzhanghao=account).delete()
    return JsonResponse({"code": 0, "msg": "已清空", "data": {}}, encoder=CustomJsonEncoder)
