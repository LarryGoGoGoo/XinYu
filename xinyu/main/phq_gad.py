# coding:utf-8
"""PHQ-9 与 GAD-7 免费量表：题目、选项与计分。

版权说明：
PHQ-9（患者健康问卷-9）与 GAD-7（广泛性焦虑障碍量表-7）由 Pfizer Inc.
开发并授权**免费使用**（无需版权费），是国际通用的抑郁/焦虑自评工具。
题目措辞与 0-3 四级计分、临床分级标准均为公开的医学常识，可自由用于
教学、科研与产品实现。

本模块作为 SCL-90（受限量表）的免费替代方案，用于正式发布场景。
"""

# 0-3 四级计分选项（PHQ-9 / GAD-7 通用）
PHQ_GAD_OPTIONS = [
    {"text": "完全没有", "code": "A", "score": 0},
    {"text": "有几天", "code": "B", "score": 1},
    {"text": "一半以上天数", "code": "C", "score": 2},
    {"text": "几乎每天", "code": "D", "score": 3},
]

# PHQ-9 题目（9 题，评估过去两周的抑郁状态）
PHQ9_PAPER_NAME = "PHQ-9抑郁自评量表"
PHQ9_ITEMS = [
    "做事时提不起劲或没有兴趣",
    "感到心情低落、沮丧或绝望",
    "入睡困难、睡不安稳或睡眠过多",
    "感觉疲倦或没有活力",
    "食欲不振或吃太多",
    "觉得自己很糟，或觉得自己很失败，或让自己或家人失望",
    "对事物专注有困难，例如阅读报纸或看电视时",
    "动作或说话速度缓慢到别人已察觉，或正好相反——烦躁、坐立不安、动来动去的情况更胜于平常",
    "有不如死掉或用某种方式伤害自己的念头",
]

# GAD-7 题目（7 题，评估过去两周的焦虑状态）
GAD7_PAPER_NAME = "GAD-7焦虑自评量表"
GAD7_ITEMS = [
    "感觉紧张、焦虑或急切",
    "不能够停止或控制担忧",
    "对各种各样的事情担忧过多",
    "很难放松下来",
    "由于不安而无法静坐",
    "变得容易烦恼或急躁",
    "感到似乎将有可怕的事情发生而害怕",
]

# PHQ-9 临床分级（公开标准）
PHQ9_LEVELS = [
    (4, "无抑郁", "得分在正常范围，继续保持良好的生活方式。"),
    (9, "轻度抑郁", "存在轻度情绪困扰，建议自我调节并留意变化。"),
    (14, "中度抑郁", "情绪困扰较明显，建议考虑专业咨询。"),
    (19, "中重度抑郁", "建议尽快寻求专业精神心理帮助。"),
    (27, "重度抑郁", "请尽快联系专业医生；若有自伤念头请立即求助（热线 12356）。"),
]

# GAD-7 临床分级（公开标准）
GAD7_LEVELS = [
    (4, "无焦虑", "得分在正常范围，焦虑水平较低。"),
    (9, "轻度焦虑", "存在轻度焦虑，建议练习放松技巧。"),
    (14, "中度焦虑", "焦虑较明显，建议考虑专业咨询。"),
    (21, "重度焦虑", "建议尽快寻求专业精神心理帮助。"),
]


def _score_answers(scores):
    """scores 为 0-3 分列表，返回总分（未答项计 0）。"""
    return sum(int(s or 0) for s in scores if s is not None)


def _grade(total, levels):
    for threshold, label, guidance in levels:
        if total <= threshold:
            return label, guidance
    return levels[-1][1], levels[-1][2]


def score_phq9(scores):
    """scores: 9 个 0-3 分。返回 {total, level, guidance}。"""
    total = _score_answers(scores)
    label, guidance = _grade(total, PHQ9_LEVELS)
    return {
        "scale": "PHQ-9",
        "totalScore": total,
        "maxScore": 27,
        "level": label,
        "guidance": guidance,
        "isPositive": total >= 10,
    }


def score_gad7(scores):
    """scores: 7 个 0-3 分。返回 {total, level, guidance}。"""
    total = _score_answers(scores)
    label, guidance = _grade(total, GAD7_LEVELS)
    return {
        "scale": "GAD-7",
        "totalScore": total,
        "maxScore": 21,
        "level": label,
        "guidance": guidance,
        "isPositive": total >= 10,
    }
