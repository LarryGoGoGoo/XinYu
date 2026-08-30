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
from .models import yuyueshiduan
from util.codes import *
from urllib.parse import unquote
from util.auth import Auth
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
from util import rbac


def yuyueshiduan_default(request):

    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code,"msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        req_dict.update({"isdefault":"是"})
        data=yuyueshiduan.getbyparams(yuyueshiduan, yuyueshiduan, req_dict)
        if len(data)>0:
            msg['data']  = data[0]
        else:
            msg['data']  = {}
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyueshiduan_page(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        global yuyueshiduan
        #当前登录用户信息
        tablename = Auth().getTokenInfo(request).get('tablename')

        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  =yuyueshiduan.page(yuyueshiduan, yuyueshiduan,req_dict, request)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyueshiduan_autoSort(request):
    '''
    ．智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
主要信息列表（如商品列表，新闻列表）中使用，显示最近点击的或最新添加的5条记录就行
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        if "clicknum"  in yuyueshiduan.getallcolumn(yuyueshiduan,yuyueshiduan):
            req_dict['sort']='clicknum'
        elif "browseduration"  in yuyueshiduan.getallcolumn(yuyueshiduan,yuyueshiduan):
            req_dict['sort']='browseduration'
        else:
            req_dict['sort']='clicktime'
        req_dict['order']='desc'
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = yuyueshiduan.page(yuyueshiduan,yuyueshiduan, req_dict)

        return JsonResponse(msg, encoder=CustomJsonEncoder)

#分类列表
def yuyueshiduan_lists(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":[]}
        msg['data'],_,_,_,_  = yuyueshiduan.page(yuyueshiduan, yuyueshiduan, {})
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyueshiduan_query(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        try:
            query_result = yuyueshiduan.objects.filter(**request.session.get("req_dict")).values()
            msg['data'] = query_result[0]
        except Exception as e:

            msg['code'] = crud_error_code
            msg['msg'] = f"发生错误：{e}"
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyueshiduan_list(request):
    '''
    前台分页
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        #获取全部列名
        columns=  yuyueshiduan.getallcolumn( yuyueshiduan, yuyueshiduan)
        if "vipread" in req_dict and "vipread" not in columns:
          del req_dict["vipread"]
        #表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
        __foreEndList__ = getattr(yuyueshiduan, "__foreEndList__", None)
        __foreEndListAuth__ = getattr(yuyueshiduan, "__foreEndListAuth__", None)

        #authSeparate
        __authSeparate__ = getattr(yuyueshiduan, "__authSeparate__", None)

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
        __authTables__ = getattr(yuyueshiduan, "__authTables__", None)

        if __authTables__!=None and  __authTables__!={} and __foreEndListAuth__=="是":
            for authColumn,authTable in __authTables__.items():
                if authTable==tablename:
                    try:
                        del req_dict['userid']
                    except Exception:
                        pass
                    params = Auth().getTokenInfo(request).get('params')
                    req_dict[authColumn]=params.get(authColumn)
                    username=params.get(authColumn)
                    break
        
        if yuyueshiduan.__tablename__[:7]=="discuss":
            try:
                del req_dict['userid']
            except Exception:
                pass

        q = Q()
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = yuyueshiduan.page(yuyueshiduan, yuyueshiduan, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyueshiduan_save(request):
    '''
    后台新增（仅管理员）
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            msg['code'] = 403
            msg['msg'] = "只有管理员才能维护预约时段"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict = request.session.get("req_dict")
        if 'clicktime' in req_dict.keys():
            del req_dict['clicktime']
        if yuyueshiduan.objects.filter(yuyueshiduan = req_dict['yuyueshiduan']).count()>0:
            msg['code'] = crud_error_code
            msg['msg'] = "预约时段已存在"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        tablename=Auth().getTokenInfo(request).get('tablename')
        __isAdmin__ = None
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__==tablename:

                __isAdmin__ = getattr(m, "__isAdmin__", None)
                break

        #获取全部列名
        columns=  yuyueshiduan.getallcolumn( yuyueshiduan, yuyueshiduan)
        if tablename!='users' and req_dict.get("userid")==None and 'userid' in columns  and __isAdmin__!='是':
            params=Auth().getTokenInfo(request).get('params')
            req_dict['userid']=params.get('id')


        if 'addtime' in req_dict.keys():
            del req_dict['addtime']

        idOrErr= yuyueshiduan.createbyreq(yuyueshiduan,yuyueshiduan, req_dict)
        if isinstance(idOrErr, str):
            msg['code'] = crud_error_code
            msg['msg'] = idOrErr
        else:
            msg['data'] = idOrErr

        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyueshiduan_add(request):
    '''
    前台新增（仅管理员）
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            msg['code'] = 403
            msg['msg'] = "只有管理员才能维护预约时段"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict = request.session.get("req_dict")
        tablename=Auth().getTokenInfo(request).get('tablename')
        if yuyueshiduan.objects.filter(yuyueshiduan = req_dict['yuyueshiduan']).count()>0:
            msg['code'] = crud_error_code
            msg['msg'] = "预约时段已存在"
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        #获取全部列名
        columns=  yuyueshiduan.getallcolumn( yuyueshiduan, yuyueshiduan)
        __authSeparate__ = getattr(yuyueshiduan, "__authSeparate__", None)

        if __authSeparate__=="是":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users" and 'userid' in columns:
                try:
                    req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")
                except Exception:
                    pass

        __foreEndListAuth__ = getattr(yuyueshiduan, "__foreEndListAuth__", None)

        if __foreEndListAuth__ and __foreEndListAuth__!="否":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users":
                req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")


        if 'addtime' in req_dict.keys():
            del req_dict['addtime']
        error= yuyueshiduan.createbyreq(yuyueshiduan,yuyueshiduan, req_dict)
        if isinstance(error, str):
            msg['code'] = crud_error_code
            msg['msg'] = error
        else:
            msg['data'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyueshiduan_thumbsup(request,id_):
    '''
     点赞：表属性thumbsUp[是/否]，刷表新增thumbsupnum赞和crazilynum踩字段，
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        id_=int(id_)
        type_=int(req_dict.get("type",0))
        rets=yuyueshiduan.getbyid(yuyueshiduan,yuyueshiduan,id_)

        update_dict={
        "id":id_,
        }
        if type_==1:#赞
            update_dict["thumbsupnum"]=int(rets[0].get('thumbsupnum'))+1
        elif type_==2:#踩
            update_dict["crazilynum"]=int(rets[0].get('crazilynum'))+1
        error = yuyueshiduan.updatebyparams(yuyueshiduan,yuyueshiduan, update_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def yuyueshiduan_info(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data = yuyueshiduan.getbyid(yuyueshiduan,yuyueshiduan, int(id_))
        if len(data)>0:
            msg['data']=data[0]
            if msg['data'].__contains__("reversetime"):
                if isinstance(msg['data']['reversetime'], datetime.datetime):
                    msg['data']['reversetime'] = msg['data']['reversetime'].strftime("%Y-%m-%d %H:%M:%S")
                else:
                    if msg['data']['reversetime'] != None:
                        reversetime = datetime.datetime.strptime(msg['data']['reversetime'], '%Y-%m-%d %H:%M:%S')
                        msg['data']['reversetime'] = reversetime.strftime("%Y-%m-%d %H:%M:%S")

        #浏览点击次数
        __browseClick__ = getattr(yuyueshiduan, "__browseClick__", None)

        if __browseClick__=="是"  and  "clicknum"  in yuyueshiduan.getallcolumn(yuyueshiduan,yuyueshiduan):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}
            ret=yuyueshiduan.updatebyparams(yuyueshiduan,yuyueshiduan,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyueshiduan_detail(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data =yuyueshiduan.getbyid(yuyueshiduan,yuyueshiduan, int(id_))
        if len(data)>0:
            msg['data']=data[0]
            if msg['data'].__contains__("reversetime"):
                if isinstance(msg['data']['reversetime'], datetime.datetime):
                    msg['data']['reversetime'] = msg['data']['reversetime'].strftime("%Y-%m-%d %H:%M:%S")
                else:
                    if msg['data']['reversetime'] != None:
                        reversetime = datetime.datetime.strptime(msg['data']['reversetime'], '%Y-%m-%d %H:%M:%S')
                        msg['data']['reversetime'] = reversetime.strftime("%Y-%m-%d %H:%M:%S")

        #浏览点击次数
        __browseClick__ = getattr(yuyueshiduan, "__browseClick__", None)

        if __browseClick__=="是"   and  "clicknum"  in yuyueshiduan.getallcolumn(yuyueshiduan,yuyueshiduan):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}

            ret=yuyueshiduan.updatebyparams(yuyueshiduan,yuyueshiduan,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyueshiduan_update(request):
    '''
    修改（仅管理员）
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            msg['code'] = 403
            msg['msg'] = "只有管理员才能维护预约时段"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict = request.session.get("req_dict")
        if req_dict.get('yuyueshiduan')!=None and yuyueshiduan.objects.exclude(id=req_dict['id']).filter(yuyueshiduan = req_dict['yuyueshiduan']).count()>0:
            msg['code'] = crud_error_code
            msg['msg'] = "预约时段已存在"
            return JsonResponse(msg)
        if 'clicktime' in req_dict.keys() and req_dict['clicktime']=="None":
            del req_dict['clicktime']
        if req_dict.get("mima") and "mima" not in yuyueshiduan.getallcolumn(yuyueshiduan,yuyueshiduan) :
            del req_dict["mima"]
        if req_dict.get("password") and "password" not in yuyueshiduan.getallcolumn(yuyueshiduan,yuyueshiduan) :
            del req_dict["password"]
        try:
            del req_dict["clicknum"]
        except Exception:
            pass


        error = yuyueshiduan.updatebyparams(yuyueshiduan, yuyueshiduan, req_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error

        return JsonResponse(msg)


def yuyueshiduan_delete(request):
    '''
    批量删除（仅管理员）
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            msg['code'] = 403
            msg['msg'] = "只有管理员才能维护预约时段"
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict = request.session.get("req_dict")

        error=yuyueshiduan.deletes(yuyueshiduan,
            yuyueshiduan,
             req_dict.get("ids")
        )
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg)


def yuyueshiduan_vote(request,id_):
    '''
    浏览点击次数（表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1）
统计商品或新闻的点击次数；提供新闻的投票功能
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code}


        data= yuyueshiduan.getbyid(yuyueshiduan, yuyueshiduan, int(id_))
        for i in data:
            votenum=i.get('votenum')
            if votenum!=None:
                params={"id":int(id_),"votenum":votenum+1}
                error=yuyueshiduan.updatebyparams(yuyueshiduan,yuyueshiduan,params)
                if error!=None:
                    msg['code'] = crud_error_code
                    msg['msg'] = error
        return JsonResponse(msg)

def yuyueshiduan_importExcel(request):
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
                    yuyueshiduan.createbyreq(yuyueshiduan, yuyueshiduan, req_dict)
                    
            except Exception:
                pass
                
        else:
            msg = {
                "msg": "文件类型错误",
                "code": 500
            }
                
        return JsonResponse(msg)

def yuyueshiduan_autoSort2(request):
    return JsonResponse({"code": 0, "msg": '',  "data":{}})












