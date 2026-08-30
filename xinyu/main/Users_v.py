#coding:utf-8
import xlrd
import base64, copy, time, json, datetime
from django.http import JsonResponse
from django.apps import apps
import numbers
from django.db.models.aggregates import Count,Sum
from django.db.models import Case, When, IntegerField, F
from django.forms import model_to_dict
import requests
from util.CustomJSONEncoder import CustomJsonEncoder
from .models import users
from util.codes import *
from urllib.parse import unquote
from util.auth import Auth
from util.security import revoke_token, json_response
from util.common import Common
import util.message as mes
from django.db import connection
import random
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import redirect
from django.db.models import Q
from util.baidubce_api import BaiDuBce
from .config_model import config
from util.security import (
    authenticate_model_user,
    change_model_password,
    get_recovery_public_record,
    public_record,
    recover_model_password,
    reset_model_password,
)
from util import rbac


def users_register(request):
    """管理员注册：仅已登录管理员可创建新管理员账号。

    安全约束：管理员账号的创建只能由管理员完成，禁止未登录/普通用户/医生
    自行注册管理员（历史上此处无校验，导致任何人都可注册管理员拿下系统权限）。
    """
    if request.method in ["POST", "GET"]:
        msg = {'code': normal_code, "msg": mes.normal_code}
        if not rbac.is_admin(request):
            msg['code'] = 403
            msg['msg'] = "只有管理员才能创建管理员账号"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict = request.session.get("req_dict")

        error = users.createbyreq(users, users, req_dict)
        if isinstance(error, str):
            msg['code'] = crud_error_code
            msg['msg'] = "用户已存在,请勿重复注册!"
        else:
            msg['data'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_login(request):
    if request.method in ["POST", "GET"]:
        msg = {'code': normal_code, "msg": mes.normal_code}
        req_dict = request.session.get("req_dict")
        user_data = authenticate_model_user(users, req_dict)
        if not user_data:
            msg['code'] = password_error_code
            msg['msg'] = mes.password_error_code
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        __sfsh__ = getattr(users, "__sfsh__", None)

        if  __sfsh__=='是':
            if user_data.get('sfsh')!='是':
                msg['code']=other_code
                msg['msg'] = "账号已锁定，请联系管理员审核!"
                return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict['id'] = user_data.get('id')
        req_dict['username'] = user_data.get('username')

        return Auth.authenticate(Auth, users, req_dict)


def users_logout(request):
    if request.method in ["POST", "GET"]:
        # 撤销当前 token，使其立即失效
        token = request.META.get('HTTP_TOKEN')
        if not token or token == 'null':
            token = request.GET.get('token') or request.POST.get('token')
        revoke_token(token)
        msg = {
            "msg": "登出成功",
            "code": 0
        }
        return json_response(msg)

def users_resetPass(request):
    '''
    管理员重置用户/医生/管理员密码。

    安全约束：
    1. 仅管理员可调用；
    2. 明文密码不再返回给调用方（仅写入审计日志，任何人无法回看）；
    3. 每次重置记录审计日志（操作者 / 被重置账号 / 来源 IP / 结果）。
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code}

        req_dict = request.session.get("req_dict")
        username = req_dict.get("username")
        if not rbac.is_admin(request):
            msg['code'] = 403
            msg['msg'] = '无权限重置密码'
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        if not username or not users.objects.filter(username=username).exists():
            msg['code'] = 400
            msg['msg'] = '用户不存在'
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        # 生成随机强密码（12位：大小写+数字）
        import random, string
        from util.audit import audit_log
        init_pwd = ''.join(random.choices(string.ascii_letters + string.digits, k=12))

        # 操作者（当前登录管理员账号）
        actor = (Auth().getTokenInfo(request).get('params') or {}).get('username')
        # 来源 IP
        xff = request.META.get('HTTP_X_FORWARDED_FOR')
        ip = ''
        if xff:
            ip = xff.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR', '')

        result = reset_model_password(users, username, init_pwd)
        if isinstance(result, str):
            msg['code'] = crud_error_code
            msg['msg'] = result
            audit_log(actor, "重置管理员密码", username, ip, result="失败:{}".format(result))
        else:
            # 关键：不再返回明文密码，避免泄露面
            msg['data'] = {"username": username, "reset": True}
            audit_log(
                actor, "重置管理员密码", username, ip,
                result="成功(新密码12位已写入,不返回明文)")
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_recovery(request):
    '''
    通过密保或邮箱找回密码
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        ok, error = recover_model_password(
            users,
            req_dict.get("username"),
            req_dict.get("newPassword") or req_dict.get("password") or req_dict.get("mima"),
            panswer=req_dict.get("panswer"),
            email=req_dict.get("email"),
        )
        if not ok:
            msg['code'] = validate_param_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_session(request):
    '''
    获取用户信息
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code,"msg": mes.normal_code, "data": {}}

        token_info = Auth().getTokenInfo(request) or {}
        user_id = (token_info.get('params') or {}).get("id")
        if not user_id:
            msg['code'] = 401
            msg['msg'] = '未登录或登录已过期'
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        try:
            msg['data'] = public_record(users.getbyparams(users, users, {"id": user_id})[0])
        except Exception:
            msg['code'] = 401
            msg['msg'] = '用户不存在或登录已过期'
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_updatePassword(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        user_id = Auth().getTokenInfo(request).get('params', {}).get("id")
        if not change_model_password(users, user_id, req_dict.get("oldPassword"), req_dict.get("newPassword")):
            msg['code'] = password_error_code
            msg['msg'] = '原密码不正确'
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_accountList(request):
    '''
    获取账号列表
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code,"msg": mes.normal_code, "data": {}}
        records = users.objects.all()
        try:
            result = [{"id": record.id, "account": record.username} for record in records]
            msg["data"] = result
        except Exception:
            pass
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_default(request):

    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code,"msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        req_dict.update({"isdefault":"是"})
        data=users.getbyparams(users, users, req_dict)
        if len(data)>0:
            msg['data']  = data[0]
        else:
            msg['data']  = {}
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_page(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        global users
        #当前登录用户信息
        tablename = Auth().getTokenInfo(request).get('tablename')

        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  =users.page(users, users,req_dict, request)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_autoSort(request):
    '''
    ．智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
主要信息列表（如商品列表，新闻列表）中使用，显示最近点击的或最新添加的5条记录就行
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        if "clicknum"  in users.getallcolumn(users,users):
            req_dict['sort']='clicknum'
        elif "browseduration"  in users.getallcolumn(users,users):
            req_dict['sort']='browseduration'
        else:
            req_dict['sort']='clicktime'
        req_dict['order']='desc'
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = users.page(users,users, req_dict)

        return JsonResponse(msg, encoder=CustomJsonEncoder)

#分类列表
def users_lists(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":[]}
        msg['data'],_,_,_,_  = users.page(users, users, {})
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_query(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        try:
            query_result = users.objects.filter(**request.session.get("req_dict")).first()
            msg['data'] = public_record(query_result)
        except Exception as e:

            msg['code'] = crud_error_code
            msg['msg'] = f"发生错误：{e}"
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_list(request):
    '''
    前台分页
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        #获取全部列名
        columns=  users.getallcolumn( users, users)
        if "vipread" in req_dict and "vipread" not in columns:
          del req_dict["vipread"]
        #表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
        __foreEndList__ = getattr(users, "__foreEndList__", None)
        __foreEndListAuth__ = getattr(users, "__foreEndListAuth__", None)

        #authSeparate
        __authSeparate__ = getattr(users, "__authSeparate__", None)

        if __foreEndListAuth__ =="是" and __authSeparate__=="是":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users" and Auth().getTokenInfo(request).get('params') is not None:
                req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")

        tablename = Auth().getTokenInfo(request).get('tablename')
        if tablename == "users" and req_dict.get("userid") != None:#判断是否存在userid列名
            del req_dict["userid"]
        else:
            __isAdmin__ = None

            allModels = apps.get_app_config('main').get_models()
            for m in allModels:
                if m.__tablename__==tablename:

                    __isAdmin__ = getattr(m, "__isAdmin__", None)
                    break

            if __isAdmin__ == "是":
                if req_dict.get("userid"):
        # del req_dict["userid"]
                    pass
            else:
    #非管理员权限的表,判断当前表字段名是否有userid
                if "userid" in columns:
                    try:
                        pass
                    except Exception:
                        pass
        #当列属性authTable有值(某个用户表)[该列的列名必须和该用户表的登陆字段名一致]，则对应的表有个隐藏属性authTable为”是”，那么该用户查看该表信息时，只能查看自己的
        __authTables__ = getattr(users, "__authTables__", None)

        if __authTables__!=None and  __authTables__!={} and __foreEndListAuth__=="是":
            for authColumn,authTable in __authTables__.items():
                if authTable==tablename:
                    try:
                        del req_dict['userid']
                    except Exception:
                        pass
                    params = Auth().getTokenInfo(request).get('params') or {}
                    req_dict[authColumn]=params.get(authColumn)
                    username=params.get(authColumn)
                    break
        
        if users.__tablename__[:7]=="discuss":
            try:
                del req_dict['userid']
            except Exception:
                pass

        q = Q()
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = users.page(users, users, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_save(request):
    '''
    后台新增
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            msg['code'] = 403
            msg['msg'] = "只有管理员才能新增管理员账号"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict = request.session.get("req_dict")
        if 'clicktime' in req_dict.keys():
            del req_dict['clicktime']
        tablename=Auth().getTokenInfo(request).get('tablename')
        __isAdmin__ = None
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__==tablename:

                __isAdmin__ = getattr(m, "__isAdmin__", None)
                break

        #获取全部列名
        columns=  users.getallcolumn( users, users)
        if tablename!='users' and req_dict.get("userid")==None and 'userid' in columns  and __isAdmin__!='是':
            params=Auth().getTokenInfo(request).get('params') or {}
            req_dict['userid']=params.get('id')


        if 'addtime' in req_dict.keys():
            del req_dict['addtime']

        idOrErr= users.createbyreq(users,users, req_dict)
        if isinstance(idOrErr, str):
            msg['code'] = crud_error_code
            msg['msg'] = idOrErr
        else:
            msg['data'] = idOrErr

        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_add(request):
    '''
    前台新增
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            msg['code'] = 403
            msg['msg'] = "只有管理员才能创建管理员账号"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict = request.session.get("req_dict")
        tablename=Auth().getTokenInfo(request).get('tablename')

        #获取全部列名
        columns=  users.getallcolumn( users, users)
        __authSeparate__ = getattr(users, "__authSeparate__", None)

        if __authSeparate__=="是":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users" and 'userid' in columns:
                try:
                    req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")
                except Exception:
                    pass

        __foreEndListAuth__ = getattr(users, "__foreEndListAuth__", None)

        if __foreEndListAuth__ and __foreEndListAuth__!="否":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users":
                req_dict['userid']=(Auth().getTokenInfo(request).get('params') or {}).get("id")


        if 'addtime' in req_dict.keys():
            del req_dict['addtime']
        error= users.createbyreq(users,users, req_dict)
        if isinstance(error, str):
            msg['code'] = crud_error_code
            msg['msg'] = error
        else:
            msg['data'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_thumbsup(request,id_):
    '''
     点赞：表属性thumbsUp[是/否]，刷表新增thumbsupnum赞和crazilynum踩字段，
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        id_=int(id_)
        type_=int(req_dict.get("type",0))
        rets=users.getbyid(users,users,id_)

        update_dict={
        "id":id_,
        }
        if type_==1:#赞
            update_dict["thumbsupnum"]=int(rets[0].get('thumbsupnum'))+1
        elif type_==2:#踩
            update_dict["crazilynum"]=int(rets[0].get('crazilynum'))+1
        error = users.updatebyparams(users,users, update_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def users_info(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data = users.getbyid(users,users, int(id_))
        if len(data)>0:
            msg['data']=public_record(data[0])
            if msg['data'].__contains__("reversetime"):
                if isinstance(msg['data']['reversetime'], datetime.datetime):
                    msg['data']['reversetime'] = msg['data']['reversetime'].strftime("%Y-%m-%d %H:%M:%S")
                else:
                    if msg['data']['reversetime'] != None:
                        reversetime = datetime.datetime.strptime(msg['data']['reversetime'], '%Y-%m-%d %H:%M:%S')
                        msg['data']['reversetime'] = reversetime.strftime("%Y-%m-%d %H:%M:%S")

        #浏览点击次数
        __browseClick__ = getattr(users, "__browseClick__", None)

        if __browseClick__=="是"  and  "clicknum"  in users.getallcolumn(users,users):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}
            ret=users.updatebyparams(users,users,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_detail(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data =users.getbyid(users,users, int(id_))
        if len(data)>0:
            msg['data']=public_record(data[0])
            if msg['data'].__contains__("reversetime"):
                if isinstance(msg['data']['reversetime'], datetime.datetime):
                    msg['data']['reversetime'] = msg['data']['reversetime'].strftime("%Y-%m-%d %H:%M:%S")
                else:
                    if msg['data']['reversetime'] != None:
                        reversetime = datetime.datetime.strptime(msg['data']['reversetime'], '%Y-%m-%d %H:%M:%S')
                        msg['data']['reversetime'] = reversetime.strftime("%Y-%m-%d %H:%M:%S")

        #浏览点击次数
        __browseClick__ = getattr(users, "__browseClick__", None)

        if __browseClick__=="是"   and  "clicknum"  in users.getallcolumn(users,users):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}

            ret=users.updatebyparams(users,users,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def users_update(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            msg['code'] = 403
            msg['msg'] = "只有管理员才能修改管理员账号"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict = request.session.get("req_dict")
        if 'clicktime' in req_dict.keys() and req_dict['clicktime']=="None":
            del req_dict['clicktime']
        if req_dict.get("password") and "password" not in users.getallcolumn(users,users) :
            del req_dict["password"]
        if req_dict.get("password") and "password" not in users.getallcolumn(users,users) :
            del req_dict["password"]
        try:
            del req_dict["clicknum"]
        except Exception:
            pass


        error = users.updatebyparams(users, users, req_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error

        return JsonResponse(msg)


def users_delete(request):
    '''
    批量删除
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            msg['code'] = 403
            msg['msg'] = "只有管理员才能删除管理员账号"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict = request.session.get("req_dict")

        error=users.deletes(users,
            users,
             req_dict.get("ids")
        )
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg)


def users_vote(request,id_):
    '''
    浏览点击次数（表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1）
统计商品或新闻的点击次数；提供新闻的投票功能
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code}


        data= users.getbyid(users, users, int(id_))
        for i in data:
            votenum=i.get('votenum')
            if votenum!=None:
                params={"id":int(id_),"votenum":votenum+1}
                error=users.updatebyparams(users,users,params)
                if error!=None:
                    msg['code'] = crud_error_code
                    msg['msg'] = error
        return JsonResponse(msg)

def users_importExcel(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": "成功", "data": {}}

        excel_file = request.FILES.get("file", "")
        if excel_file.size > 100 * 1024 * 1024:  # 限制为 100MB
            msg['code'] = 400
            msg["msg"] = '文件大小不能超过100MB'
            return JsonResponse(msg)

        file_type = excel_file.name.split('.')[1]
        
        if file_type in ['xlsx', 'xls']:
            data = xlrd.open_workbook(filename=None, file_contents=excel_file.read())
            table = data.sheets()[0]
            rows = table.nrows
            
            try:
                headers = [str(h).strip() for h in table.row_values(0)]
                for row in range(1, rows):
                    row_values = table.row_values(row)
                    req_dict = {
                        str(header): row_values[idx]
                        for idx, header in enumerate(headers)
                        if str(header).strip()
                    }
                    users.createbyreq(users, users, req_dict)
                    
            except Exception:
                pass
                
        else:
            msg = {
                "msg": "文件类型错误",
                "code": 500
            }
                
        return JsonResponse(msg)

def users_autoSort2(request):
    return JsonResponse({"code": 0, "msg": '',  "data":{}})



def users_security(request):
    '''
    获取密保接口
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": "成功", "data": {}}
        req_dict = request.session.get("req_dict")
        record = get_recovery_public_record(users, req_dict.get('username'))
        if not record:
            msg['code'] = 400
            msg['msg'] = '用户不存在'
        else:
            msg['data'] = record

        return JsonResponse(msg, encoder=CustomJsonEncoder)









