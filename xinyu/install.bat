@echo off
chcp 936 >nul
echo ============================================
echo  心理健康项目 - 一键安装
echo ============================================
echo.

:: 激活虚拟环境（需要 Python 3.8，如果不存在则创建）
if not exist "venv38\Scripts\activate.bat" (
    echo [0/5] 正在创建虚拟环境 ^(Python 3.8^)...
    py -3.8 -m venv venv38
)
call venv38\Scripts\activate.bat

echo [1/5] 安装 Python 依赖...
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com

echo [2/5] 初始化数据库...
python ./init.py initdb

echo [3/5] 执行数据库迁移...
python ./manage.py makemigrations
python ./manage.py migrate --fake-initial

echo [4/5] 导入初始数据...
python ./init.py initsql

echo [5/5] 创建管理员账号（业务 users 表）...
python ./manage.py shell -c "from main.models import users;from util.security import hash_password;_=users.objects.filter(username='admin').exists() or users.objects.create(username='admin',password=hash_password('admin'),role='管理员')"

echo.
echo ============================================
echo  安装完成！
echo  管理后台: http://localhost:8080/admin/dist/index.html
echo  用户端H5: http://localhost:8080/xinyu/front/h5/index.html
echo  账号: admin  密码: admin
echo ============================================
pause
