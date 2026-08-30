# coding:utf-8
"""SCL-90 scoring helpers.

The questionnaire text itself is not embedded here. Import the authorized item
wording with scripts/import_scl90.py; this module owns options, factor mapping,
and result interpretation.
"""

SCL90_PAPER_KEYWORDS = ("scl-90", "scl90", "症状自评量表")
SCL90_OPTION_TEMPLATE = [
    {"text": "没有", "code": "A", "score": 1},
    {"text": "很轻", "code": "B", "score": 2},
    {"text": "中等", "code": "C", "score": 3},
    {"text": "偏重", "code": "D", "score": 4},
    {"text": "严重", "code": "E", "score": 5},
]

SCL90_FACTOR_DEFINITIONS = [
    {
        "key": "somatization",
        "name": "躯体化",
        "items": [1, 4, 12, 27, 40, 42, 48, 49, 52, 53, 56, 58],
        "guidance": "近期身体不适感较突出。建议规律作息、适度运动，并结合体检排除躯体疾病；若不适持续，应及时咨询医生或心理专业人员。",
    },
    {
        "key": "obsessive_compulsive",
        "name": "强迫症状",
        "items": [3, 9, 10, 28, 38, 45, 46, 51, 55, 65],
        "guidance": "可能存在反复思考、检查或难以摆脱的念头。可尝试记录触发场景、降低回避行为，必要时寻求认知行为治疗支持。",
    },
    {
        "key": "interpersonal_sensitivity",
        "name": "人际关系敏感",
        "items": [6, 21, 34, 36, 37, 41, 61, 69, 73],
        "guidance": "在人际互动中可能更容易感到紧张、自卑或被评价。建议从低压力社交开始练习表达，并减少过度揣测他人看法。",
    },
    {
        "key": "depression",
        "name": "抑郁",
        "items": [5, 14, 15, 20, 22, 26, 29, 30, 31, 32, 54, 71, 79],
        "guidance": "情绪低落、兴趣下降或无力感可能较明显。建议保持稳定作息和支持性沟通；若持续两周以上或出现自伤想法，请立即求助。",
    },
    {
        "key": "anxiety",
        "name": "焦虑",
        "items": [2, 17, 23, 33, 39, 57, 72, 78, 80, 86],
        "guidance": "紧张、担忧或躯体化焦虑体验可能偏高。可使用腹式呼吸、渐进式肌肉放松，并把担忧拆成可行动的小步骤。",
    },
    {
        "key": "hostility",
        "name": "敌对",
        "items": [11, 24, 63, 67, 74, 81],
        "guidance": "愤怒、烦躁或冲动表达可能较多。建议先暂停再回应，记录高风险情境，并练习非攻击性的需求表达。",
    },
    {
        "key": "phobic_anxiety",
        "name": "恐怖",
        "items": [13, 25, 47, 50, 70, 75, 82],
        "guidance": "对特定场景可能有明显恐惧或回避。建议逐步暴露而非突然挑战，若影响学习生活，可寻求专业干预。",
    },
    {
        "key": "paranoid_ideation",
        "name": "偏执",
        "items": [8, 18, 43, 68, 76, 83],
        "guidance": "猜疑、被针对感或过度警觉可能偏高。建议区分事实与推测，并在可信任的人际关系中核验想法。",
    },
    {
        "key": "psychoticism",
        "name": "精神病性",
        "items": [7, 16, 35, 62, 77, 84, 85, 87, 88, 90],
        "guidance": "该维度偏高时需要认真看待。若出现明显异常知觉、思维混乱或现实感下降，请尽快联系精神心理专业人员。",
    },
    {
        "key": "additional",
        "name": "附加因子",
        "items": [19, 44, 59, 60, 64, 66, 89],
        "guidance": "睡眠、饮食或其他状态可能受到影响。建议先稳定生活节律，观察与压力事件、作息变化之间的关系。",
    },
]


def option_score_map():
    return {item["code"]: int(item["score"]) for item in SCL90_OPTION_TEMPLATE}


def normalize_score(answer):
    if answer in (None, ""):
        return 0
    if isinstance(answer, (int, float)):
        value = int(answer)
        return value if 1 <= value <= 5 else 0
    text = str(answer).strip()
    if text in option_score_map():
        return option_score_map()[text]
    try:
        value = int(float(text))
        return value if 1 <= value <= 5 else 0
    except Exception:
        return 0


def is_scl90_paper(paper_name, question_count):
    normalized = str(paper_name or "").lower()
    return question_count == 90 and any(keyword in normalized for keyword in SCL90_PAPER_KEYWORDS)


def calculate_scl90(scores_by_position):
    scores = [normalize_score(scores_by_position.get(i)) for i in range(1, 91)]
    answered_scores = [score for score in scores if score > 0]
    total_score = sum(scores)
    average_score = round(total_score / 90, 2)
    positive_scores = [score for score in scores if score >= 2]

    factors = []
    for factor in SCL90_FACTOR_DEFINITIONS:
        values = [scores[item - 1] for item in factor["items"]]
        total = sum(values)
        average = round(total / len(values), 2)
        factors.append({
            "key": factor["key"],
            "name": factor["name"],
            "items": factor["items"],
            "itemCount": len(values),
            "total": total,
            "score": average,
            "warning": average >= 2,
            "guidance": factor["guidance"],
        })

    return {
        "scale": "SCL-90",
        "totalScore": total_score,
        "averageScore": average_score,
        "answeredCount": len(answered_scores),
        "positiveItemCount": len(positive_scores),
        "positiveAverageScore": round(sum(positive_scores) / len(positive_scores), 2) if positive_scores else 0,
        "isPositive": total_score >= 160 or len(positive_scores) > 43 or any(item["warning"] for item in factors),
        "warningThreshold": 2,
        "factors": factors,
    }
