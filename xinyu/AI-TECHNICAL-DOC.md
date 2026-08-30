# 心语AI功能技术文档

> 心语 - AI功能实现说明与微信小程序端对接指南
> 更新日期：2026-08-24

---

## 一、功能概述

### 1.1 已实现的AI功能

| 功能 | 说明 | 触发方式 |
|------|------|----------|
| 心语AI聊天 | 用户与AI一对一心理倾诉对话 | 用户主动进入聊天页面 |
| AI语义风险预警 | 分析用户聊天内容中的心理危机信号 | 发送消息时自动触发 |
| 日记AI风险分析 | 分析用户发布的心情日记 | 日记新增/修改时自动触发 |
| 预警上报管理后台 | 风险信号写入预警表，通知管理员/心理医生 | 检测到风险时自动触发 |

### 1.2 技术架构

```
用户输入（聊天消息 / 日记内容）
        │
        ▼
  ┌──────────────┐
  │  关键词匹配   │  22个危机词（自杀/跳楼/不想活/割腕...）
  └──────┬───────┘
         │ 未命中
         ▼
  ┌──────────────┐
  │  智谱AI语义   │  GLM-4-Flash 大模型
  │  风险分析     │  判断 danger / warning / normal
  └──────┬───────┘
         │ 检测到风险
         ▼
  ┌──────────────┐
  │  写入预警表   │  jiankangyujing 表（管理后台"健康预警"模块可见）
  │  + 弹窗提醒   │  popupremind 表（管理员/心理医生登录后铃铛提醒）
  └──────────────┘
```

### 1.3 大模型配置

- **当前接入**：智谱AI GLM-4-Flash（免费模型）
- **API地址**：`https://open.bigmodel.cn/api/paas/v4/chat/completions`
- **API Key**：已配置在后端 `run.py` 中
- **切换其他模型**：修改 `run.py` 中 `_ZHIPU_API_URL`、`_ZHIPU_API_KEY`、`_ZHIPU_MODEL` 三个变量即可，支持接入 DeepSeek、豆包等兼容 OpenAI 接口格式的大模型

---

## 二、后端API接口文档

### 2.1 心语AI - 发送消息

发送一条消息给AI，AI返回回复内容，同时自动进行风险检测。

**请求**

```
POST /xinyu/xinyuai/chat
Header:
  Token: <用户登录后获取的Token>
  Content-Type: application/json

Body:
{
  "message": "最近学习压力很大，有点焦虑"
}
```

**请求参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| message | string | 是 | 用户发送的消息内容，最长500字 |

**成功响应**

```json
{
  "code": 0,
  "msg": "正常",
  "data": {
    "reply": "听到你这样说，我能感受到你的压力。学习上的压力有时候确实会让人喘不过气...",
    "risk_level": "normal",
    "matched_keywords": []
  }
}
```

**响应字段说明**

| 字段 | 类型 | 说明 |
|------|------|------|
| code | int | 0=成功，401=未登录，1=参数错误 |
| data.reply | string | AI回复内容，直接显示在聊天气泡中 |
| data.risk_level | string | 风险等级：`normal`（正常）/ `warning`（中风险）/ `danger`（高风险） |
| data.matched_keywords | array | 命中的危机关键词列表，如 `["跳楼","不想活"]`；AI语义分析命中时为空数组 |

**高风险示例响应**

```json
{
  "code": 0,
  "msg": "正常",
  "data": {
    "reply": "听到你这样说，我非常担心。你的生命非常宝贵，请立即拨打心理援助热线 400-161-9995...",
    "risk_level": "danger",
    "matched_keywords": ["跳楼", "不想活"]
  }
}
```

**前端处理建议**

- `risk_level === "danger"`：在聊天界面顶部显示红色警告条，提示用户拨打心理援助热线 **400-161-9995**
- `risk_level === "warning"`：可显示温和的橙色提示
- AI接口响应时间约3-10秒，需显示"AI正在输入..."加载动画
- 建议设置15-30秒超时，超时后提示"网络繁忙，请稍后再试"

---

### 2.2 心语AI - 获取聊天历史

获取当前用户的历史聊天记录。

**请求**

```
GET /xinyu/xinyuai/history
Header:
  Token: <用户登录后获取的Token>
```

**成功响应**

```json
{
  "code": 0,
  "msg": "正常",
  "data": {
    "list": [
      {
        "id": 123,
        "role": "user",
        "content": "你好",
        "risk_level": "normal",
        "time": "2026-08-24 10:30:00"
      },
      {
        "id": 124,
        "role": "assistant",
        "content": "你好，有什么想聊的吗？",
        "risk_level": "normal",
        "time": "2026-08-24 10:30:02"
      }
    ]
  }
}
```

**字段说明**

| 字段 | 类型 | 说明 |
|------|------|------|
| role | string | `user`=用户消息，`assistant`=AI回复 |
| content | string | 消息内容 |
| risk_level | string | 该条消息的风险等级 |
| time | string | 发送时间 |

---

### 2.3 心语AI - 清空对话

清空当前用户的所有聊天记录。

**请求**

```
POST /xinyu/xinyuai/clear
Header:
  Token: <用户登录后获取的Token>
```

**成功响应**

```json
{
  "code": 0,
  "msg": "已清空",
  "data": {}
}
```

---

## 三、风险预警机制

### 3.1 双重检测

| 检测方式 | 说明 | 速度 |
|----------|------|------|
| 关键词匹配 | 22个预设危机词，命中即预警 | 即时 |
| AI语义分析 | 关键词未命中时，调用大模型理解语义 | 3-10秒 |

**危机关键词列表**（22个）：

```
自杀、跳楼、割腕、安眠药、不想活、死了算了、结束生命、
活不下去、没意思、解脱、一了百了、上吊、烧炭、跳河、
自残、自伤、割手、伤害自己、去死、杀了自己
```

**风险等级**：

| 等级 | 含义 | 触发条件 |
|------|------|----------|
| danger | 高风险 | 明确提及自杀/自伤行为（跳楼、割腕、上吊等） |
| warning | 中风险 | 表达绝望、无助、自残念头但无明确行动意图 |
| normal | 正常 | 无明显风险 |

### 3.2 预警触发场景

| 场景 | 来源标识 | 是否需要前端额外操作 |
|------|----------|---------------------|
| 心语AI对话 | 心语AI对话 | 不需要，调聊天接口时自动检测 |
| 心情日记新增 | 心情日记 | 不需要，调日记新增接口时自动检测 |
| 心情日记修改 | 心情日记 | 不需要，调日记修改接口时自动检测 |

### 3.3 预警数据存储

预警记录写入 `jiankangyujing`（健康预警）表，管理后台"健康预警"模块直接可见：

| 字段 | 说明 | 示例 |
|------|------|------|
| yonghuzhanghao | 用户账号 | 003 |
| yonghuxingming | 用户姓名 | 胡宇 |
| yujingtixing | 预警标题 | 【心语AI对话】高风险（AI语义分析）预警 |
| xinlijianyi | 心理建议 | AI分析原因 + 内容摘要 + 干预建议 + 热线号码 |
| yujingshijian | 预警时间 | 2026-08-24 10:30:00 |

同时向所有管理员和心理医生发送弹窗提醒（`popupremind` 表），登录后台后右上角铃铛可见。

**去重机制**：同一用户同一来源24小时内只创建一条预警，避免刷屏。

---

## 四、微信小程序端对接指南

### 4.1 对接前准备

1. **确认baseUrl**：与现有业务接口使用同一个服务器地址
   - 本地开发：`http://localhost:8080/xinyu/`
   - 上线部署：`http://<服务器IP>:8080/xinyu/`

2. **Token认证**：心语AI接口与现有业务接口共用同一套Token认证机制，用户登录后获取的Token直接放在请求Header中即可，无需额外登录。

### 4.2 需要开发的页面

小程序端需要自行开发聊天UI页面，后端只提供API。页面包含：

- 消息列表（用户消息右侧、AI消息左侧，气泡样式）
- 风险警告条（danger时显示，红色背景+热线号码）
- 输入框 + 发送按钮
- "AI正在输入..."加载动画
- 清空对话按钮（可选）
- 聊天历史加载（进入页面时调history接口）

### 4.3 调用示例（微信小程序）

```javascript
// 发送消息
function sendToAI(message) {
  const token = wx.getStorageSync('appToken')
  wx.showLoading({ title: 'AI正在思考...' })

  wx.request({
    url: baseUrl + 'xinyuai/chat',
    method: 'POST',
    header: {
      'Token': token,
      'Content-Type': 'application/json'
    },
    data: {
      message: message
    },
    timeout: 30000,
    success(res) {
      wx.hideLoading()
      if (res.data.code === 0) {
        const { reply, risk_level } = res.data.data

        // 添加AI回复到消息列表
        that.messages.push({
          role: 'assistant',
          content: reply
        })

        // 高风险时显示警告
        if (risk_level === 'danger') {
          that.showRiskWarning = true
        }
      } else if (res.data.code === 401) {
        // 登录过期，跳转登录页
        wx.navigateTo({ url: '/pages/login/login' })
      }
    },
    fail() {
      wx.hideLoading()
      wx.showToast({ title: '网络繁忙，请稍后再试', icon: 'none' })
    }
  })
}

// 进入页面时加载历史记录
function loadHistory() {
  const token = wx.getStorageSync('appToken')
  wx.request({
    url: baseUrl + 'xinyuai/history',
    method: 'GET',
    header: { 'Token': token },
    success(res) {
      if (res.data.code === 0) {
        that.messages = res.data.data.list
        // 如果历史中有高风险消息，显示警告条
        that.showRiskWarning = res.data.data.list.some(
          m => m.risk_level === 'danger'
        )
      }
    }
  })
}

// 清空对话
function clearChat() {
  const token = wx.getStorageSync('appToken')
  wx.showModal({
    title: '提示',
    content: '确定清空所有对话记录吗？',
    success(res) {
      if (res.confirm) {
        wx.request({
          url: baseUrl + 'xinyuai/clear',
          method: 'POST',
          header: { 'Token': token },
          success() {
            that.messages = []
            that.showRiskWarning = false
          }
        })
      }
    }
  })
}
```

### 4.4 注意事项

1. **日记接口无需改动**：用户发布/修改心情日记时，后端自动进行AI风险分析并上报预警，小程序端只需正常调用现有的日记新增/修改接口。

2. **上下文记忆**：后端自动携带该用户最近10条聊天记录作为上下文，前端每次只需要传当前消息，不需要传历史记录。

3. **AI人设**：系统提示词已在后端配置（温暖共情、非医疗建议边界、危机引导热线），前端不需要传任何角色设定。

4. **用户信息**：后端自动从Token中获取用户昵称、账号、性别，AI会据此给出个性化回应，前端不需要额外传参。

5. **错误处理**：
   - AI服务超时或故障时，后端返回固定兜底回复（"抱歉，我现在有点累了..."），不会报错
   - AI风险分析失败时静默跳过，不影响聊天功能正常使用

6. **心理援助热线**：全国心理援助热线 **400-161-9995**，高风险时在前端显著展示。

---

## 五、数据库表结构

### 5.1 xinyuai_chat（心语AI聊天记录表，新增）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | bigint | 主键 |
| yonghuzhanghao | varchar(50) | 用户账号 |
| role | varchar(20) | `user`/`assistant` |
| content | text | 消息内容 |
| risk_level | varchar(20) | normal/warning/danger |
| addtime | datetime | 发送时间 |

### 5.2 jiankangyujing（健康预警表，已有）

AI预警复用此表，字段说明见 3.3 节。

### 5.3 popupremind（弹窗提醒表，已有）

AI预警自动给管理员/心理医生创建提醒，无需手动操作。

---

## 六、管理后台查看预警

1. 登录管理后台：`http://localhost:8080/xinyu/admin/dist/index.html`
2. 左侧菜单点击"健康预警"，可查看所有预警记录
3. 右上角铃铛图标可查看弹窗提醒
4. 预警标题中会标注来源（"心语AI对话"或"心情日记"）和检测方式（"AI语义分析"或"关键词匹配"）
