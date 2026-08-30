@echo off
chcp 936 >nul
title 心理健康项目 - Django 服务

echo ============================================
echo  心理健康项目（心语）- 启动 Django 服务
echo ============================================
echo.

:: =============================================
:: 第1步：检查虚拟环境是否存在
:: =============================================
if not exist "venv38\Scripts\activate.bat" (
    echo [错误] 虚拟环境不存在！
    echo 请先运行"install.bat"初始化项目，或手动创建虚拟环境：
    echo   py -3.8 -m venv venv38
    echo   venv38\Scripts\activate
    echo   pip install -r requirements.txt
    pause
    exit /b 1
)

:: =============================================
:: 第2步：激活虚拟环境
:: =============================================
echo [1/4] 正在激活虚拟环境...
call venv38\Scripts\activate.bat
if %errorlevel% neq 0 (
    echo [错误] 虚拟环境激活失败！
    pause
    exit /b 1
)
echo       虚拟环境激活成功 ^(venv38^)

:: =============================================
:: 第3步：检查 8080 端口是否已被占用
:: =============================================
echo [2/4] 正在检查端口...
netstat -ano 2>nul | findstr ":8080" | findstr "LISTENING" >nul
if %errorlevel% equ 0 (
    echo [警告] 8080 端口已被占用，可能已有 Django 实例在运行
    echo       如果确认没有，请手动关闭占用该端口的程序后重试
)
echo       端口检查完成

:: =============================================
:: 第4步：启动 Django 开发服务器
:: =============================================
echo [3/4] 正在启动 Django 服务...
echo.
echo ============================================
echo  管理后台: http://localhost:8080/admin/dist/index.html
echo           账号: admin  /  密码: admin
echo.
echo  用户端H5: http://localhost:8080/xinyu/front/h5/index.html
echo.
echo  按 Ctrl+C 停止服务
echo ============================================
echo.

python manage.py runserver --insecure 0.0.0.0:8080 --noreload

:: =============================================
:: 如果服务异常退出，显示错误信息
:: =============================================
if %errorlevel% neq 0 (
    echo.
    echo ============================================
    echo [错误] Django 服务启动失败！
    echo 常见原因：
    echo   1. MySQL 未启动或密码不正确 ^(config.ini 中配置^)
    echo   2. Redis 未启动
    echo   3. 数据库 'xinli' 不存在
    echo   4. Python 依赖未安装 ^(请先运行"install.bat"^)
    echo ============================================
)

pause