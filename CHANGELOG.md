# 心语·心理管理小程序 —— 待修复问题清单

> 精简版：只保留「尚未修复、需要提醒」的事项。已完成的修复一律不再记录，随修随删。

---

## 待修复

（暂无待修复项）

---

## 修复约定

1. 每次本对话窗口改完代码，同步更新本清单（修完即从「待修复」删除）。
2. 改完后自动弹出本清单供审阅。

---

## 本次改动记录（非待修复项）

- 2026-08-27「心理测试试题融合进心理测试」：`exampaper` 列表新增「试题管理」按钮，点击跳转 `/examquestion?paperid=X`，试题列表自动按该试卷过滤。属功能增强，不影响权限清单。
- 2026-08-28「首页预警区块改版」：①「最新健康预警」改「最新未处理预警」，点击单条精确跳转到预警列表对应记录（带 focusId 定位 + 高亮闪烁），不再只是打开窗口；②预警列表全宽独占一行；③原左侧「风险等级分布」拆为独立面板「未处理预警分布」，与「功能导航」同一行展示。属 UI 功能增强，不影响权限清单。
- 2026-08-28「统一 RBAC 装饰器」：新增 `util/rbac.py`（`is_admin/is_doctor/is_user/token_info/forbidden` 与 `@admin_only`、`@doctor_or_admin` 装饰器，角色由 token 的 `tablename` 判定），把 `config_v.py`、`Popupremind_v.py`、`Users_v.py`、`Yuyueshiduan_v.py`、`Jiankangyujing_v.py`、`Doctoradvice_v.py`、`Talksession_v.py`、`Xinqingriji_v.py`、`Examrecord_v.py`、`Xinliyisheng_v.py`、`Yonghu_v.py`、`Yuyuezixun_v.py`、`xinyuai_v.py` 共 13 个视图文件里散落的 `tablename=='users'` 守卫与各自 `_forbidden/_is_admin` helper 统一收口。已端到端回归（管理员/医生/用户三类角色越权 403、正常放行），`manage.py check` 通过。
