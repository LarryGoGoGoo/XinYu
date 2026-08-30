# 心理健康小程序（心语）— 启动说明

## 项目结构

```
心语_参赛包/
├── xinyu/                 ← Django 后端（核心）
│   ├── venv38/            ← 虚拟环境（Python 3.8.10，安装后自动生成）
│   ├── templates/front/   ← H5 前端页面（uni-app 编译产物）
│   ├── main/models.py     ← 数据模型定义
│   ├── xmiddleware/       ← 自定义中间件（认证、限流等）
│   ├── run.bat            ← 一键启动后端
│   └── install.bat        ← 一键初始化
├── mp-weixin/             ← 微信小程序源码
└── README.md
```

## 前置依赖

| 依赖 | 说明 |
|------|------|
| MySQL | 127.0.0.1:3306，用户 root，密码 123456，数据库 xinli |
| Redis | 127.0.0.1:6379，密码 123456 |
| Python 3.8 | 已内置在 venv38 虚拟环境中 |

## 命令逐行讲解

假设你已经解压参赛包，当前位于 `心语_参赛包/xinyu` 目录下。

### 第1步：进入项目目录

```bash
cd xinyu
```

> `cd` = change directory，把命令行的工作目录切换到 Django 项目根目录。所有后续命令都基于这个目录执行。

### 第2步：激活虚拟环境

```bash
venv38\Scripts\activate
```

> **为什么要激活虚拟环境？** Python 项目通常依赖很多第三方包（比如 Django、MySQL 驱动等）。虚拟环境把这些包隔离在项目自己的目录里，不污染系统 Python。`activate` 执行后，命令行前面会出现 `(venv38)` 标记，表示当前所有 `python` 命令都会使用虚拟环境里的 Python 3.8。
>
> **注意**：这里用的是 `venv38`。虚拟环境由 `install.bat` 首次运行时自动创建；`run.bat` 和 `install.bat` 都固定使用 `venv38`。

### 第3步：启动 Django 开发服务器

```bash
python manage.py runserver --insecure 0.0.0.0:8080 --noreload
```

> 这条命令拆开来看：
>
> - **`python manage.py`** — `manage.py` 是 Django 项目的总控脚本，所有 Django 操作（启动服务器、数据库迁移、创建管理员等）都通过它执行。
>
> - **`runserver`** — Django 内置的开发服务器命令。它会在本地启动一个 HTTP 服务器来运行你的项目。**注意：这是开发服务器，仅供开发调试使用，不能用于生产环境。**
>
> - **`--insecure`** — 正常情况下 Django 开发服务器不会处理静态文件（CSS/JS/图片），需要额外配置。`--insecure` 强制 Django 也处理静态文件，这样 H5 页面里的 CSS 和 JS 才能正常加载，否则页面会白屏。
>
> - **`0.0.0.0:8080`** — 监听地址和端口。
>   - `0.0.0.0` 表示监听本机所有网络接口，这样局域网内其他设备（比如手机）也能访问。
>   - `8080` 是端口号，浏览器访问 `http://localhost:8080` 就是连到这里。
>
> - **`--noreload`** — 禁止自动重载。Django 默认会监视代码文件变化并自动重启，这在某些场景下会导致问题（比如内部有多个启动子进程的逻辑）。加 `--noreload` 后，每次修改代码需要手动重启。

### 第4步：打开各端页面

| 端 | 地址 | 使用者 |
|----|------|--------|
| 管理后台 | http://localhost:8080/admin/dist/index.html | 管理员（账号 admin / 密码 admin） |
| 用户端 H5 | http://localhost:8080/xinyu/front/h5/index.html | 心理医生 / 普通用户 |
| 微信小程序 | 微信开发者工具导入 `mp-weixin` 目录 | 普通用户 + 心理医生 |

> 三端共享同一个 Django 后端（localhost:8080），通过 URL 前缀路由分发 —— 前端页面是静态 HTML，通过 AJAX 请求后端 API 获取数据。

## 快速启动（推荐）

直接**双击 `xinyu/run.bat`**，即可自动完成以上 1-3 步。

新版 `run.bat` 会依次做：
1. 检查虚拟环境是否存在
2. 激活虚拟环境
3. 检查 8080 端口是否被占用
4. 启动 Django 服务
5. 如果启动失败，显示常见错误原因

## 微信小程序注意事项

- 微信开发者工具 → 导入参赛包内的 `mp-weixin` 目录
- 选测试号，勾选「不校验合法域名」
- 小程序调用后端 API 时，确保后端地址在小程序可访问的范围内

## 常见问题

**Q: 启动报 MySQL 连接失败？**
A: 确保 MySQL 已启动，数据库 `xinli` 已创建，root 密码是 123456（配置在 `config.ini` 中）。

**Q: 启动报 Redis 连接失败？**
A: 确保 Redis 服务已启动，密码是 123456（配置在 `config.ini` 中）。

**Q: 端口 8080 被占用？**
A: 运行 `netstat -ano | findstr :8080` 查看占用进程，在任务管理器中结束它，或修改 `run.bat` 中的端口号。

**Q: 首次安装？**
A: 双击 `xinyu/install.bat`，会自动创建虚拟环境、安装依赖、初始化数据库、导入数据、创建管理员账号。

**Q: 页面报 500 错误？**
A: 可能是 `TokenBlacklist` 模型缺少 `__tablename__` 属性（已修复），或 MySQL 连接失败。查看 Django 控制台输出的具体错误信息。