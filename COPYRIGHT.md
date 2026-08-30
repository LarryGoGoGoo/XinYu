# 版权与量表使用说明（COPYRIGHT）

本项目 心语 使用多种心理量表，不同量表的版权状态不同。下表汇总现状与使用边界，
供开发与答辩时说明。

## 量表版权汇总

| 量表 | 版权状态 | 用途建议 | 说明 |
|------|----------|----------|------|
| SCL-90 症状自评量表 | **受限**（Derogatis L.R. / Pearson） | 仅教学 / 比赛演示 | 题目原文与量表名称商用需授权；因子结构、计分规则（总分≥160、阳性项目>43、因子分≥2）为公开学术知识，可自由实现 |
| PHQ-9 抑郁自评量表 | **免费**（Pfizer 授权免费使用） | 可正式发布 | 国际通用，9 题，0-3 计分，临床分级标准公开 |
| GAD-7 焦虑自评量表 | **免费**（Pfizer 授权免费使用） | 可正式发布 | 国际通用，7 题，0-3 计分，临床分级标准公开 |

## 处理策略（双轨并行）

1. **SCL-90 保留但降级**：
   - 仅作为教学与比赛演示数据（`scripts/seed_scl90.py` 已注明版权）；
   - 不在对外发布中宣称拥有商用授权；
   - 若未来正式上线，替换为已授权题目，或切换到免费量表。

2. **PHQ-9 / GAD-7 作为主力免费量表**：
   - 新增 `main/phq_gad.py`（题目、选项、计分、临床分级）；
   - 新增 `scripts/seed_phq9_gad7.py` 一键导入试卷；
   - 题量小、分级清晰，更适合 AI 报告与风险预警联动。

## 医疗严谨性约定

- 所有 AI 报告与预警文案**不输出诊断性结论**（不用"抑郁症""焦虑症"等表述），
  只描述风险程度与建议；
- 危机级预警统一附带**全国心理援助热线 12356** 提示；
- 报告固定携带免责声明（见 `util/ai_report.py` 的 `DISCLAIMER`）。

## 相关文件

- `main/scl90.py` — SCL-90 因子映射与计分（公开学术规则）
- `main/phq_gad.py` — PHQ-9 / GAD-7 免费量表实现
- `scripts/seed_scl90.py` — SCL-90 演示数据导入（含版权声明）
- `scripts/seed_phq9_gad7.py` — PHQ-9 / GAD-7 导入
- `util/ai_report.py` — 个性化报告（含免责声明）
- `util/ai_risk.py` — 语义风险预警

## LLM 配置说明

默认使用**智谱 GLM-4-Flash**（永久免费模型，OpenAI 兼容接口），
注册地址 https://open.bigmodel.cn 注册后创建 API Key 即可。

在 `config` 表插入一条 `name="llm"` 的记录，`value` 为 JSON：

```json
{"base_url": "https://open.bigmodel.cn/api/paas/v4", "api_key": "你的智谱Key", "model": "glm-4-flash"}
```

未配置 key 时系统自动降级（预警走关键词兜底、报告走模板），功能不中断。

切换其他模型（如 DeepSeek，注意已弃用 `deepseek-chat`，新名 `deepseek-v4-flash`）：

```json
{"base_url": "https://api.deepseek.com", "api_key": "你的DeepSeekKey", "model": "deepseek-v4-flash"}
```

也可用环境变量 `LLM_BASE_URL` / `LLM_API_KEY` / `LLM_MODEL` 覆盖。

