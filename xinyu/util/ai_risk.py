# coding:utf-8
"""语义级风险预警模块。

将原有「关键词硬匹配」升级为「LLM 语义理解 + 关键词兜底」的混合策略：

1. 优先调用 LLM 对日记文本做结构化风险分析（等级/类别/理由/建议）；
2. LLM 失败或未配置时，回退到关键词匹配（安全、可用、零外部依赖）；
3. 安全优先交叉校验：LLM 判为低风险但命中了高危关键词时，强制升为高风险，
   避免模型漏报危机。

等级定义（与前端/预警文案对齐）：
    low / medium / high / crisis
"""
from .llm_client import chat_json, LlmError

# 危机级硬关键词：一旦命中，无条件视为至少 high 级别，用于交叉校验。
CRISIS_KEYWORDS = ("自杀", "轻生", "自残", "不想活", "活不下去", "结束生命", "死掉算了")

# 通用风险关键词：兜底匹配用（保留原有语义，扩充少量近义表达）。
RISK_KEYWORDS = CRISIS_KEYWORDS + (
    "绝望", "崩溃", "抑郁", "焦虑", "想死", "伤害自己", "了结自己",
)

LEVEL_LABELS = {
    "low": "低风险",
    "medium": "中风险",
    "high": "高风险",
    "crisis": "危机",
}

SYSTEM_PROMPT = (
    "你是一名严格、保守的心理健康风险初筛助手。你的任务不是诊断，而是"
    "根据用户的心情日记文本判断其风险等级，并给出克制的建议。"
    "只输出 JSON，不要输出任何其他内容，字段固定为："
    "{\"level\": \"low|medium|high|crisis\", "
    "\"categories\": [\"自杀意念\", \"自伤\", \"一般情绪低落\", ...], "
    "\"reason\": \"一句话理由\", \"suggestion\": \"一句克制的建议\"}。"
    "判断标准：明确提到自杀/自伤计划或手段= crisis；"
    "表达绝望、无价值感、明显情绪崩溃= high；"
    "一般性焦虑、低落、压力= medium；"
    "日常倾诉、无明显风险= low。"
    "宁高勿低。严禁使用诊断性结论（如'抑郁症''焦虑症'），只描述风险。"
)


def _keyword_fallback(title, content):
    """关键词兜底：返回与 LLM 一致的结构。"""
    text = "{} {}".format(title or "", content or "")
    hit = [kw for kw in RISK_KEYWORDS if kw in text]
    if not hit:
        return None
    crisis_hit = [kw for kw in CRISIS_KEYWORDS if kw in text]
    if crisis_hit:
        level = "crisis"
        categories = ["自杀/自伤风险"]
        suggestion = "检测到高风险表达，请尽快联系专业心理援助（全国心理援助热线 12356）。"
    else:
        level = "high"
        categories = ["情绪风险"]
        suggestion = "情绪波动明显，建议主动倾诉并考虑预约心理咨询。"
    return {
        "level": level,
        "categories": categories,
        "reason": "命中风险关键词：{}".format("、".join(hit)),
        "suggestion": suggestion,
        "source": "keyword",
    }


def _clamp_level(level):
    level = str(level or "").strip().lower()
    if level not in LEVEL_LABELS:
        return "medium"
    return level


def _cross_check(result, title, content):
    """安全优先交叉校验：命中危机硬关键词时，不降低风险等级。"""
    if not result:
        return result
    text = "{} {}".format(title or "", content or "")
    if any(kw in text for kw in CRISIS_KEYWORDS):
        rank = {"low": 0, "medium": 1, "high": 2, "crisis": 3}
        if rank.get(result.get("level"), 1) < 2:
            result["level"] = "high"
            result.setdefault("categories", []).insert(0, "自杀/自伤风险")
            result["reason"] = "命中危机关键词，风险上调：" + (result.get("reason") or "")
    return result


def analyze_diary_risk(title, content):
    """分析日记风险，返回结构化 dict（不含 None）。

    返回 None 表示判定为无风险（不需要预警）。
    """
    title = title or ""
    content = content or ""
    if not title.strip() and not content.strip():
        return None

    result = None
    try:
        user_prompt = "日记标题：{}\n日记内容：{}".format(title, content)
        raw = chat_json(SYSTEM_PROMPT, user_prompt, temperature=0.1)
        result = {
            "level": _clamp_level(raw.get("level")),
            "categories": raw.get("categories") or [],
            "reason": str(raw.get("reason") or "")[:200],
            "suggestion": str(raw.get("suggestion") or "")[:200],
            "source": "llm",
        }
    except LlmError:
        result = None
    except Exception:
        result = None

    # LLM 未给出结论时走关键词兜底
    if result is None:
        result = _keyword_fallback(title, content)
        if result is None:
            return None

    result = _cross_check(result, title, content)

    # 低风险无需预警
    if result.get("level") == "low":
        return None

    return result
