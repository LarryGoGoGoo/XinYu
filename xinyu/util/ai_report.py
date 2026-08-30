# coding:utf-8
"""个性化测评报告模块。

基于量表计算出的结构化结果（如 SCL-90 因子分），调用 LLM 生成针对性的
解读与建议。核心原则：

1. 医学严谨：硬编码免责声明，明确"非诊断"；禁用诊断性表述；
2. 可控降级：LLM 失败或未配置时，用规则模板兜底，保证功能可用；
3. 数据闭环：输入只喂「分数 + 因子名」，不泄露原始答题记录。
"""
from .llm_client import chat_json, LlmError

# 医疗免责声明（所有报告固定携带，不允许省略）
DISCLAIMER = (
    "本报告由量表结果与人工智能辅助生成，仅用于自我了解与健康参考，"
    "不构成医学诊断或治疗建议。如持续感到困扰，请咨询专业精神科医生或心理治疗师。"
    "如有自伤或伤害他人的念头，请立即拨打全国心理援助热线 12356 或就近就医。"
)

SYSTEM_PROMPT = (
    "你是一名严谨的心理健康科普助手。根据用户量表得分，生成一段 200 字以内的"
    "个性化解读与建议。只输出 JSON，字段固定为："
    "{\"summary\": \"总体解读\", \"strengths\": \"相对稳定或优势的方面\", "
    "\"concerns\": \"需要关注的方面\", \"advice\": \"具体可执行的建议\"}。"
    "要求：不使用诊断性结论（如'抑郁症''焦虑症'）；不夸大；"
    "涉及危机信号时必须优先建议寻求专业帮助。语气温和、克制。"
)


def _factor_lines(result):
    """将因子分整理为文本列表，供 LLM 与模板使用。"""
    if not isinstance(result, dict):
        return []
    factors = result.get("factors")
    if not isinstance(factors, list):
        return []
    lines = []
    for f in factors:
        name = f.get("name") or f.get("key") or ""
        score = f.get("score")
        warning = f.get("warning")
        if name:
            mark = "偏高" if warning else "正常"
            lines.append("{}：{}（{}）".format(name, score, mark))
    return lines


def _describe_result(result):
    """把任意量表结果转成一段供 LLM 参考的文本。"""
    if not isinstance(result, dict):
        return "（无测评数据）"
    parts = []
    if result.get("scale"):
        parts.append("量表：{}".format(result.get("scale")))
    if result.get("totalScore") is not None:
        parts.append("总分：{}".format(result.get("totalScore")))
    if result.get("averageScore") is not None:
        parts.append("均分：{}".format(result.get("averageScore")))
    if result.get("level"):
        parts.append("分级：{}".format(result.get("level")))
    if result.get("guidance"):
        parts.append("参考说明：{}".format(result.get("guidance")))
    factor_lines = _factor_lines(result)
    if factor_lines:
        parts.append("因子分：\n" + "\n".join(factor_lines))
    return "\n".join(parts)


def _template_report(result):
    """规则模板兜底：不依赖 LLM，也能生成可读报告。"""
    if not isinstance(result, dict):
        result = {}
    lines = _factor_lines(result)
    total = result.get("totalScore")
    level = result.get("level")
    is_positive = result.get("isPositive")

    if level:
        summary = "本次测评分级为「{}」，总分 {}。{}".format(
            level, total if total is not None else "未知",
            result.get("guidance") or "",
        )
    else:
        summary = "本次测评总分 {}{}。".format(
            total if total is not None else "未知",
            "，整体风险指标偏高，建议进一步关注" if is_positive else "，整体处于可观察范围",
        )

    if lines:
        concerns = "需要关注的方面：" + "、".join(
            [line.split("：")[0] for line in lines if "偏高" in line]
        ) or "暂无显著偏高因子"
    else:
        concerns = "需要关注的方面：" + (str(result.get("guidance") or "暂无显著偏高项"))

    advice = "保持规律作息与适度运动，多与信任的人沟通；如有持续困扰，建议预约专业心理咨询。"
    return {
        "summary": summary,
        "strengths": "未偏高的因子显示相关方面相对稳定，可作为心理资源的支撑点。",
        "concerns": concerns,
        "advice": advice,
        "source": "template",
    }


def generate_report(result):
    """生成个性化测评报告。返回 dict（含 summary/strengths/concerns/advice）。"""
    if not isinstance(result, dict):
        return _template_report({})

    report = None
    try:
        user_prompt = _describe_result(result)
        raw = chat_json(SYSTEM_PROMPT, user_prompt, temperature=0.3)
        report = {
            "summary": str(raw.get("summary") or "")[:300],
            "strengths": str(raw.get("strengths") or "")[:200],
            "concerns": str(raw.get("concerns") or "")[:200],
            "advice": str(raw.get("advice") or "")[:200],
            "source": "llm",
        }
    except LlmError:
        report = None
    except Exception:
        report = None

    if report is None or not report.get("summary"):
        report = _template_report(result)

    report["disclaimer"] = DISCLAIMER
    return report
