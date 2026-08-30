# 心语 · 参赛包说明（PACKAGE-GUIDE）

**心语**——青年心理健康「测评·陪伴·预警」一站式服务平台。
以 PHQ-9 / GAD-7 / SCL-90 专业心理量表为核心，以心情日记与心语 AI 倾诉为日常陪伴，
以「关键词规则 + 大模型语义分析」双引擎风险预警为安全能力，构建「测评—记录—预警—干预」闭环。

## 目录结构

```
心语_参赛包/
├── xinyu/                   # Django 后端（核心业务 + 管理后台 + 用户端 H5）
│   ├── db/xinyu.sql             # 33 张表全量数据（SCL-90 题库 + 演示数据，已脱敏）
│   ├── config.ini.example       # 数据库/Redis 配置模板（复制为 config.ini 后填写）
│   ├── install.bat              # 一键初始化（建虚拟环境、装依赖、建库导数据、建管理员）
│   └── run.bat                  # 一键启动后端
├── mp-weixin/              # 微信小程序源码（微信开发者工具导入此目录）
├── GETTING-STARTED.md      # 详细启动指南（含常见问题）
├── BUSINESS-PLAN.md        # 中国国际大学生创新大赛（2026）商业计划书
├── DOCTOR-MANUAL.md        # 心理医生操作手册与权限评审
├── CHANGELOG.md            # 改动记录与待修复清单
├── CODE-REVIEW.md  COPYRIGHT.md  README.md
└── PACKAGE-GUIDE.md        # 本文件
```

## 快速启动（三步）

1. 进入 `xinyu` 目录，把 `config.ini.example` 复制为 `config.ini`，
   把 `passwd` 改成你本机的 MySQL / Redis 密码；
2. 双击 `install.bat`（自动创建 Python 3.8 虚拟环境、安装依赖、建库导数据、创建管理员账号）；
3. 双击 `run.bat`，浏览器访问：
   - 管理后台：`http://localhost:8080/admin/dist/index.html`
   - 用户端 H5：`http://localhost:8080/xinyu/front/h5/index.html`

> 完整细节见「GETTING-STARTED.md」。

## 演示账号（数据已内置）

| 角色 | 登录方式 | 账号 | 密码 |
|------|----------|------|------|
| 管理员 | 管理后台登录（用户名） | `admin` | `admin` |
| 心理医生 | 医生端登录（工号） | `D000101` ~ `D000109` | `123456` |
| 普通用户 | 小程序/H5 登录（手机号） | `13290123456` | `Xinli123` |

> 医生姓名：D000101 王静、D000102 李娜与、D000103 孙俪、D000104 刘芳、
> D000105 王磊、D000106 王明、D000107 赵刚、D000108 李娜、D000109 王洪；医生密码均为 `123456`。
> 其余普通用户（U00000002 起）登录手机号见 yonghu 表，密码均为 `123456`。

## AI 功能启用指南（3 分钟）

本包的 AI 密钥已按要求**全部脱敏**（config 表中的密钥值已置空）。
未填写密钥时，**测评、心情日记、预警、医生预约、知识库等核心功能全部可正常使用**；
仅「心语 AI 对话」与「日记/聊天的 AI 语义风险分析」这两项依赖大模型，需先填入密钥。
（备注：日记/聊天的**关键词风险预警**不依赖大模型，脱敏后依然生效。）

启用步骤：
1. 申请免费密钥：
   - 智谱 AI（GLM-4-Flash，免费）：`https://open.bigmodel.cn` → 注册 → API Keys 创建；
   - 百度文心（可选，用于内容审核类能力）：`https://cloud.baidu.com` → 千帆大模型平台。
2. 登录管理后台，进入「系统参数配置」页面；
3. 编辑 `llm` 项：填入智谱 `api_key`（`base_url`/`model` 保持默认即可）；
4. 编辑 `baidu` 项：填入百度 `appId` / `apiKey` / `secretKey`（如不使用可留空）。

> 配置读取优先级：config 表 > 环境变量（`LLM_API_KEY` 等）> 内置默认。
> 后端代码已内置降级逻辑：大模型不可用时自动回退到关键词规则，绝不阻断用户提交。

## 已从参赛包剔除的内容

- 虚拟环境（venv / venv38 / .venv）、node_modules、旧 uni-app 编译产物 unpackage/
- 真实密钥：百度文心 appId/apiKey/secretKey、智谱 GLM api_key（SQL 中密钥值已置空）
- 支付宝密钥目录 util/alipay_key/（settings.py 已改为环境变量优先 + 文件缺失不报错）
- 大数据残留代码（Hive / Spark / MapReduce / HDFS 等，已在项目内彻底清除）
- 调试与临时文件（*.log、get-pip.py、一次性迁移脚本、config.ini 明文密码文件等）

## 已随包提供

- 完整数据库 dump（db/xinyu.sql，33 张表：含 SCL-90 106 题、PHQ-9/GAD-7 题库与演示数据）
- 上传图片资源（templates/upload/，116 张图片、头像、知识配图，13MB）
- 完整依赖清单（requirements.txt，含 lxml / cssselect）

## 支付功能预留

支付暂未启用。需要启用时在环境变量中设置 `ALIPAY_APP_ID`、`ALIPAY_APP_PRIVATE_KEY`、
`ALIPAY_PUBLIC_KEY`（签名方式 RSA2）即可，无需改动代码。
