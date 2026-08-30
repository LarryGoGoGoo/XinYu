# 心语 · 管理端 UI 设计规范

> 版本：v1.0（2026-08-23）
> 适用：`xinyu/templates/front/admin/`（Vue 3 + Element Plus 2.x + Sass）
> 设计基调：**治愈青绿 · 专业可信 · 柔和留白**（评委导向）

---

## 1. 设计原则

1. **温暖治愈，不冰冷**：心理健康服务是"被关心"的场景，视觉要传递安抚与安全感，而非科技硬朗感。
2. **专业可信**：管理端面向心理老师/管理员，需医疗级克制——清晰的信息层级、克制的动效、准确的数据呈现。
3. **可访问性优先**：正文对比度 ≥ 4.5:1，焦点可见，尊重 `prefers-reduced-motion`。

---

## 2. 色彩系统

### 2.1 品牌色（青绿）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-primary` | `#0E9488` | 主按钮、链接、选中态、品牌强调 |
| `--color-primary-hover` | `#0A756B` | 主按钮悬浮 |
| `--color-primary-active` | `#085A52` | 主按钮按下 |
| `--color-primary-light` | `#E5F4F1` | 浅青绿底（选中背景、标签底） |
| `--color-primary-soft` | `#F4FAF8` | 更浅的青绿底（悬浮底） |

### 2.2 中性色

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-text-primary` | `#22312C` | 标题、正文 |
| `--color-text-secondary` | `#5A6B65` | 次要说明 |
| `--color-text-tertiary` | `#8A9893` | 占位、弱提示 |
| `--color-bg-page` | `#F4F8F6` | 页面背景 |
| `--color-bg-surface` | `#FFFFFF` | 卡片、表格、弹窗 |
| `--color-bg-subtle` | `#F0F5F3` | 次级表面（表头、hover） |
| `--color-border` | `#E3EAE7` | 分割线、边框 |

### 2.3 侧边栏（深青绿，替代原深蓝灰）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-sidebar-bg` | 线性渐变 `#0F5C4E → #0A3E36` | 侧边菜单背景 |
| `--color-sidebar-text` | `#DCEBE7` | 菜单文字 |
| `--color-sidebar-active` | `rgba(255,255,255,0.14)` | 菜单激活底 |

### 2.4 语义色（风险等级 · 项目特色）

这是本项目**区别于通用后台的关键加分项**，用于心情日记风险预警、SCL-90 筛查结果分级：

| 等级 | Token | 值 | 用途 |
|------|-------|-----|------|
| 正常/低风险 | `--color-level-low` | `#2E9E6B` | 绿色，正常 |
| 关注/中风险 | `--color-level-mid` | `#D98A00` | 琥珀，需关注 |
| 高风险 | `--color-level-high` | `#E2574C` | 橙红，需干预 |
| 危机 | `--color-level-crisis` | `#C9302C` | 深红，立即处理 |
| 信息提示 | `--color-info` | `#0E9488` | 中性提示 |

> 规则：风险等级色**只用于状态/等级标签和预警横幅**，不用于装饰；危机级必须高对比（白字深红底）。

### 2.5 Element Plus 变量覆盖

```scss
:root {
  --el-color-primary: #0E9488;
  --el-color-primary-light-3: #4EB3A6;
  --el-color-primary-light-5: #7FC7BE;
  --el-color-primary-light-7: #B1DDD6;
  --el-color-primary-light-8: #CBE8E3;
  --el-color-primary-light-9: #E5F4F1;
  --el-color-primary-dark-2: #0A756B;

  --el-text-color-primary: #22312C;
  --el-text-color-regular: #5A6B65;
  --el-text-color-secondary: #8A9893;
  --el-border-color: #E3EAE7;
  --el-border-color-light: #E3EAE7;
  --el-border-color-lighter: #EDF2F0;
  --el-fill-color-blank: #FFFFFF;
  --el-fill-color-light: #F0F5F3;
  --el-bg-color-page: #F4F8F6;
}
```

---

## 3. 字体与排印

| 层级 | 字号 | 字重 | 用途 |
|------|------|------|------|
| 页面大标题 | 24px | 600 | 首页标题 |
| 卡片/区块标题 | 16px | 600 | 图表标题、弹窗标题 |
| 正文 | 14px | 400 | 表格、表单 |
| 辅助 | 12px | 400 | 说明、时间戳 |

- 字体栈：`-apple-system, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`
- 数字用 `font-variant-numeric: tabular-nums`（表格数据对齐）。
- 行高：正文 `1.6`，标题 `1.4`。

---

## 4. 间距与圆角

- 间距基数 4px：`4 / 8 / 12 / 16 / 20 / 24 / 32`
- 卡片内边距：`16px 20px`
- 页面内容区 padding：`20px`
- 表单/列表项间距：`16px`

| 元素 | 圆角 |
|------|------|
| 卡片 | `12px` |
| 按钮 / 输入框 | `8px` |
| 弹窗 | `16px` |
| 标签（Tag） | `6px` |

---

## 5. 阴影与层级（Soft UI）

```scss
--shadow-card: 0 1px 2px rgba(16,24,20,0.04), 0 4px 12px rgba(16,24,20,0.06);
--shadow-card-hover: 0 4px 16px rgba(16,24,20,0.10);
```

- 层级（z-index）：侧边栏 `201`、头部 `202`、弹窗 `2000+`（沿用现状）。
- 阴影只用于卡片和弹窗，**不用于按钮**（按钮用颜色/边框区分）。

---

## 6. 动效

- 交互过渡：`200-300ms ease`
- 页面切换：沿用现有 `fadeSlideIn`，缩短为 `0.2s`。
- 可选"呼吸感"元素：首页标语或风险提示可加 3s 缓动呼吸动画（`transform: scale(1)→1.02`），仅装饰性，`prefers-reduced-motion` 下关闭。

---

## 7. 组件规范

### 7.1 侧边栏
- 深青绿渐变背景，文字 `#DCEBE7`。
- 激活项：白 14% 透明底 + 左侧 3px 青绿亮条。
- 去掉现有 `border: 1px dashed #656d78`（这是旧深色系遗留，视觉噪点）。

### 7.2 头部
- 白色背景 + 底部 1px 边框 `#E3EAE7`（替代深蓝灰渐变）。
- 标题文字 `#22312C`。
- 头像 40px 圆形，未读气泡 `#E2574C`。

### 7.3 卡片
- 白底、圆角 12px、`--shadow-card`。
- 首页统计卡片：数字 28px/600，标签 13px 次要色。

### 7.4 表格
- 表头：`#F0F5F3` 底、`#5A6B65` 文字、无边框强调。
- 行 hover：`#F4FAF8`。
- 风险行高亮：用等级色低透明度底（如危机 `rgba(201,48,44,0.06)`）。

### 7.5 按钮
- 主按钮：青绿底白字，hover 深青绿。
- 次按钮：白底 + `#E3EAE7` 边框 + 深色文字。
- 危险操作（删除）：`#E2574C`。
- 文字按钮（表格操作列）：查看/编辑/删除分别用青绿/琥珀/红，保持文字标签完整（不隐藏）。

### 7.6 表单
- 输入框统一高度 36px，圆角 8px，聚焦青绿边框 + 2px 浅青绿光环。
- 弹窗表单两列布局（沿用现状 `.editform` 50% 宽）。

### 7.7 登录页
- 背景：柔和青绿渐变 `linear-gradient(160deg, #EAF6F2 0%, #F4FAF8 100%)`。
- 卡片：白底、圆角 16px、`--shadow-card-hover`。
- 主按钮：青绿，48px 高。
- 去掉现有深色表单（`#1d283a`）与深色输入框。

### 7.8 图表（ECharts）
- 主色系沿用青绿 `#0E9488`，辅助色 `#7FC7BE`。
- 数据对比需要时用语义色（风险红/琥珀）。
- 图表标题 16px，轴文字 12px 次要色。

---

## 8. 可访问性清单

- [ ] 正文对比度 ≥ 4.5:1（青绿主色在白底已达标）
- [ ] 键盘焦点环 2-3px，`:focus-visible` 可见
- [ ] `prefers-reduced-motion` 下关闭呼吸/过渡动画
- [ ] 图标按钮带 `aria-label`
- [ ] 风险等级不只靠颜色区分，同时显示文字标签（如"危机/高/中/低"）

---

## 9. 落地文件清单（下一步执行）

| 文件 | 改动 |
|------|------|
| `src/style/login.scss` | 重写 `:root` 变量 + Element Plus 覆盖 + 登录页浅色化 |
| `src/style/header.scss` | 侧边栏深青绿、头部白色、菜单样式 |
| `src/style/add.scss` | 弹窗标题栏青绿、按钮 |
| `src/style/list.scss` | 搜索区、表格、按钮、分页、风险行 |
| `src/style/home.scss` | 首页卡片阴影、图表容器 |
| `src/style/reset.scss` | 全局字体、滚动条、焦点环 |
| `src/views/layout/LayoutMenu.vue` | 菜单 CSS 变量（激活色/背景） |
| `src/views/layout/HomeTitle.vue` | 标题颜色（`#fff`→`#22312C`） |
| 各 `.vue` 内联 `<style>` | 检查并替换残留蓝色 `#3498db` 等 |

> 落地方式：优先通过 CSS 变量覆盖实现全站换肤，改动集中在 scss，风险低、可回滚；仅个别硬编码色需进 vue 文件。
