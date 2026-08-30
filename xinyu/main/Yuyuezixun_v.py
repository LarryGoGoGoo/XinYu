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
from .models import yuyuezixun
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


_APPOINTMENT_ACCESS_TABLES = ('users', 'yonghu', 'xinliyisheng')


def _token_info(request):
    info = Auth().getTokenInfo(request) or {}
    return info.get('tablename'), info.get('params') or {}


def _apply_owner_scope(request, req_dict):
    tablename, params = _token_info(request)
    if tablename == rbac.USER_TABLE:
        req_dict['yonghuzhanghao'] = params.get('yonghuzhanghao')
    elif tablename == rbac.DOCTOR_TABLE:
        req_dict['yishenggonghao'] = params.get('yishenggonghao')
    return tablename, params


def _has_appointment_access(request):
    tablename, params = _token_info(request)
    return tablename in _APPOINTMENT_ACCESS_TABLES, tablename, params


def _current_yonghu_profile(params):
    from .models import yonghu
    query = {}
    if params.get('id') is not None:
        query['id'] = params.get('id')
    elif params.get('yonghuzhanghao'):
        query['yonghuzhanghao'] = params.get('yonghuzhanghao')
    if not query:
        return params
    return yonghu.objects.filter(**query).values('yonghuzhanghao', 'yonghuxingming').first() or params


def _lock_yonghu_fields(req_dict, params):
    profile = _current_yonghu_profile(params)
    if profile.get('yonghuzhanghao'):
        req_dict['yonghuzhanghao'] = profile.get('yonghuzhanghao')
    if profile.get('yonghuxingming'):
        req_dict['yonghuxingming'] = profile.get('yonghuxingming')


def _prepare_for_create(req_dict, params=None):
    req_dict.pop('addtime', None)
    req_dict.pop('clicktime', None)
    if params:
        _lock_yonghu_fields(req_dict, params)


def _validate_required_create_fields(req_dict):
    required_fields = ('yishenggonghao', 'zixunmingcheng', 'zixunleixing', 'yuyueshiduan', 'yuyueshijian', 'yonghuzhanghao')
    if any(not req_dict.get(field) for field in required_fields):
        return JsonResponse({"code": validate_param_code, "msg": "预约信息不完整", "data": {}})
    return None


def _can_access_record(request, data):
    if not data:
        return False
    tablename, params = _token_info(request)
    if tablename == rbac.ADMIN_TABLE:
        return True
    if tablename == rbac.USER_TABLE:
        return data.get('yonghuzhanghao') == params.get('yonghuzhanghao')
    if tablename == rbac.DOCTOR_TABLE:
        return data.get('yishenggonghao') == params.get('yishenggonghao')
    return False


def _forbidden_response(msg='无权访问该预约记录'):
    return rbac.forbidden(msg)


def _not_found_response(msg='预约记录不存在'):
    return JsonResponse({"code": crud_error_code, "msg": msg, "data": {}})


def _appointment_conflict(req_dict, exclude_id=None, current=None):
    required_fields = ('yishenggonghao', 'yuyueshijian', 'yuyueshiduan')
    target = {}
    if current:
        target.update({field: current.get(field) for field in required_fields})
    for field in required_fields:
        if req_dict.get(field):
            target[field] = req_dict.get(field)
    if any(not target.get(field) for field in required_fields):
        return None
    queryset = yuyuezixun.objects.filter(
        yishenggonghao=target.get('yishenggonghao'),
        yuyueshijian=target.get('yuyueshijian'),
        yuyueshiduan=target.get('yuyueshiduan'),
    ).exclude(sfsh='否')
    if exclude_id:
        queryset = queryset.exclude(id=exclude_id)
    return queryset.first()


def _conflict_response():
    return JsonResponse({"code": validate_param_code, "msg": "该医生当前日期和时段已被预约，请选择其他时间", "data": {}})


def yuyuezixun_default(request):

    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code,"msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        tablename, params = _apply_owner_scope(request, req_dict)
        if tablename not in _APPOINTMENT_ACCESS_TABLES:
            return _forbidden_response('请先登录后查看预约记录')
        if "isdefault" not in yuyuezixun.getallcolumn(yuyuezixun,yuyuezixun):
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        req_dict.update({"isdefault":"是"})
        data=yuyuezixun.getbyparams(yuyuezixun, yuyuezixun, req_dict)
        if len(data)>0:
            msg['data']  = data[0]
        else:
            msg['data']  = {}
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyuezixun_page(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        global yuyuezixun
        #当前登录用户信息
        tablename, params = _apply_owner_scope(request, req_dict)
        if tablename not in _APPOINTMENT_ACCESS_TABLES:
            return _forbidden_response('请先登录后查看预约记录')

        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  =yuyuezixun.page(yuyuezixun, yuyuezixun,req_dict, request)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyuezixun_autoSort(request):
    '''
    ．智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
主要信息列表（如商品列表，新闻列表）中使用，显示最近点击的或最新添加的5条记录就行
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        tablename, params = _apply_owner_scope(request, req_dict)
        if tablename not in _APPOINTMENT_ACCESS_TABLES:
            return _forbidden_response('请先登录后查看预约记录')
        if "clicknum"  in yuyuezixun.getallcolumn(yuyuezixun,yuyuezixun):
            req_dict['sort']='clicknum'
        elif "browseduration"  in yuyuezixun.getallcolumn(yuyuezixun,yuyuezixun):
            req_dict['sort']='browseduration'
        else:
            req_dict['sort']='id'
        req_dict['order']='desc'
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = yuyuezixun.page(yuyuezixun,yuyuezixun, req_dict, request)

        return JsonResponse(msg, encoder=CustomJsonEncoder)

#分类列表
def yuyuezixun_lists(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":[]}
        req_dict = request.session.get("req_dict")
        tablename, params = _apply_owner_scope(request, req_dict)
        if tablename not in _APPOINTMENT_ACCESS_TABLES:
            return _forbidden_response('请先登录后查看预约记录')
        msg['data'],_,_,_,_  = yuyuezixun.page(yuyuezixun, yuyuezixun, req_dict, request)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyuezixun_query(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        try:
            req_dict = request.session.get("req_dict")
            tablename, params = _apply_owner_scope(request, req_dict)
            if tablename not in _APPOINTMENT_ACCESS_TABLES:
                return _forbidden_response('请先登录后查看预约记录')
            query_result = yuyuezixun.objects.filter(**req_dict).values()
            msg['data'] = query_result[0] if query_result else {}
        except Exception as e:

            msg['code'] = crud_error_code
            msg['msg'] = f"发生错误：{e}"
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyuezixun_list(request):
    '''
    前台分页
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        tablename, params = _apply_owner_scope(request, req_dict)
        if tablename not in _APPOINTMENT_ACCESS_TABLES:
            # 未登录访问：返回 401（HTTP 200 + 业务码 401），与前端约定一致
            return JsonResponse({"code": 401, "msg": "请先登录后查看预约记录", "data": {}})
        #获取全部列名
        columns=  yuyuezixun.getallcolumn( yuyuezixun, yuyuezixun)
        if "vipread" in req_dict and "vipread" not in columns:
          del req_dict["vipread"]
        #表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
        __foreEndList__ = getattr(yuyuezixun, "__foreEndList__", None)
        __foreEndListAuth__ = getattr(yuyuezixun, "__foreEndListAuth__", None)

        #authSeparate
        __authSeparate__ = getattr(yuyuezixun, "__authSeparate__", None)

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
        __authTables__ = getattr(yuyuezixun, "__authTables__", None)

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
        
        if yuyuezixun.__tablename__[:7]=="discuss":
            try:
                del req_dict['userid']
            except Exception:
                pass

        q = Q()
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = yuyuezixun.page(yuyuezixun, yuyuezixun, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyuezixun_save(request):
    '''
    后台新增
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        if not rbac.is_admin(request):
            return _forbidden_response('只有管理员可以后台新增预约记录')
        _prepare_for_create(req_dict)
        invalid = _validate_required_create_fields(req_dict)
        if invalid:
            return invalid
        if _appointment_conflict(req_dict):
            return _conflict_response()
        __isAdmin__ = None
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__==tablename:

                __isAdmin__ = getattr(m, "__isAdmin__", None)
                break

        #获取全部列名
        columns=  yuyuezixun.getallcolumn( yuyuezixun, yuyuezixun)
        if tablename!='users' and req_dict.get("userid")==None and 'userid' in columns  and __isAdmin__!='是':
            params=Auth().getTokenInfo(request).get('params')
            req_dict['userid']=params.get('id')
        idOrErr= yuyuezixun.createbyreq(yuyuezixun,yuyuezixun, req_dict)
        if isinstance(idOrErr, str):
            msg['code'] = crud_error_code
            msg['msg'] = idOrErr
        else:
            msg['data'] = idOrErr

        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyuezixun_add(request):
    '''
    前台新增
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        tablename, params = _token_info(request)
        if tablename != 'yonghu':
            return _forbidden_response('只有普通用户可以提交预约咨询')
        _prepare_for_create(req_dict, params)
        invalid = _validate_required_create_fields(req_dict)
        if invalid:
            return invalid

        #获取全部列名
        columns=  yuyuezixun.getallcolumn( yuyuezixun, yuyuezixun)
        __authSeparate__ = getattr(yuyuezixun, "__authSeparate__", None)

        if __authSeparate__=="是":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users" and 'userid' in columns:
                try:
                    req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")
                except Exception:
                    pass

        __foreEndListAuth__ = getattr(yuyuezixun, "__foreEndListAuth__", None)

        if __foreEndListAuth__ and __foreEndListAuth__!="否":
            tablename=Auth().getTokenInfo(request).get('tablename')
            if tablename!="users":
                req_dict['userid']=Auth().getTokenInfo(request).get('params').get("id")

        if _appointment_conflict(req_dict):
            return _conflict_response()
        error= yuyuezixun.createbyreq(yuyuezixun,yuyuezixun, req_dict)
        if isinstance(error, str):
            msg['code'] = crud_error_code
            msg['msg'] = error
        else:
            msg['data'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyuezixun_thumbsup(request,id_):
    '''
     点赞：表属性thumbsUp[是/否]，刷表新增thumbsupnum赞和crazilynum踩字段，
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        id_=int(id_)
        type_=int(req_dict.get("type",0))
        rets=yuyuezixun.getbyid(yuyuezixun,yuyuezixun,id_)
        if len(rets)>0 and not _can_access_record(request, rets[0]):
            return _forbidden_response()

        update_dict={
        "id":id_,
        }
        if type_==1:#赞
            update_dict["thumbsupnum"]=int(rets[0].get('thumbsupnum'))+1
        elif type_==2:#踩
            update_dict["crazilynum"]=int(rets[0].get('crazilynum'))+1
        error = yuyuezixun.updatebyparams(yuyuezixun,yuyuezixun, update_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def yuyuezixun_info(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data = yuyuezixun.getbyid(yuyuezixun,yuyuezixun, int(id_))
        if len(data)>0 and not _can_access_record(request, data[0]):
            return _forbidden_response()
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
        __browseClick__ = getattr(yuyuezixun, "__browseClick__", None)

        if __browseClick__=="是"  and  "clicknum"  in yuyuezixun.getallcolumn(yuyuezixun,yuyuezixun):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}
            ret=yuyuezixun.updatebyparams(yuyuezixun,yuyuezixun,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyuezixun_detail(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data =yuyuezixun.getbyid(yuyuezixun,yuyuezixun, int(id_))
        if len(data)>0 and not _can_access_record(request, data[0]):
            return _forbidden_response()
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
        __browseClick__ = getattr(yuyuezixun, "__browseClick__", None)

        if __browseClick__=="是"   and  "clicknum"  in yuyuezixun.getallcolumn(yuyuezixun,yuyuezixun):
            try:
                clicknum=int(data[0].get("clicknum",0))+1
            except Exception:
                clicknum=0+1
            click_dict={"id":int(id_),"clicknum":clicknum,"clicktime":datetime.datetime.now()}

            ret=yuyuezixun.updatebyparams(yuyuezixun,yuyuezixun,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def yuyuezixun_update(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        current = yuyuezixun.getbyid(yuyuezixun, yuyuezixun, int(req_dict.get("id", 0)))
        if len(current) == 0:
            return _forbidden_response('预约记录不存在')
        if len(current)>0 and not _can_access_record(request, current[0]):
            return _forbidden_response('无权修改该预约记录')
        tablename, params = _token_info(request)
        if tablename == 'yonghu':
            if current and current[0].get('sfsh') in ('是', '否'):
                return _forbidden_response('已审核的预约不能修改')
            _lock_yonghu_fields(req_dict, params)
            req_dict.pop('sfsh', None)
            req_dict.pop('shhf', None)
            if _appointment_conflict(req_dict, exclude_id=current[0].get('id'), current=current[0]):
                return _conflict_response()
        elif tablename == 'xinliyisheng':
            allowed_fields = {'id', 'sfsh', 'shhf'}
            for key in list(req_dict.keys()):
                if key not in allowed_fields:
                    req_dict.pop(key, None)
        elif tablename != rbac.ADMIN_TABLE:
            return _forbidden_response('无权修改该预约记录')
        if tablename == rbac.ADMIN_TABLE and _appointment_conflict(req_dict, exclude_id=current[0].get('id'), current=current[0]):
            return _conflict_response()
        if 'clicktime' in req_dict.keys() and req_dict['clicktime']=="None":
            del req_dict['clicktime']
        if req_dict.get("mima") and "mima" not in yuyuezixun.getallcolumn(yuyuezixun,yuyuezixun) :
            del req_dict["mima"]
        if req_dict.get("password") and "password" not in yuyuezixun.getallcolumn(yuyuezixun,yuyuezixun) :
            del req_dict["password"]
        try:
            del req_dict["clicknum"]
        except Exception:
            pass


        error = yuyuezixun.updatebyparams(yuyuezixun, yuyuezixun, req_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error

        return JsonResponse(msg)


def yuyuezixun_delete(request):
    '''
    批量删除
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        ids = req_dict.get("ids") or []
        data = yuyuezixun.objects.filter(id__in=ids).values()
        for row in data:
            if not _can_access_record(request, row):
                return _forbidden_response('无权删除该预约记录')

        error=yuyuezixun.deletes(yuyuezixun,
            yuyuezixun,
             ids
        )
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg)


def yuyuezixun_vote(request,id_):
    '''
    浏览点击次数（表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1）
统计商品或新闻的点击次数；提供新闻的投票功能
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code}


        data= yuyuezixun.getbyid(yuyuezixun, yuyuezixun, int(id_))
        if len(data)>0 and not _can_access_record(request, data[0]):
            return _forbidden_response()
        for i in data:
            votenum=i.get('votenum')
            if votenum!=None:
                params={"id":int(id_),"votenum":votenum+1}
                error=yuyuezixun.updatebyparams(yuyuezixun,yuyuezixun,params)
                if error!=None:
                    msg['code'] = crud_error_code
                    msg['msg'] = error
        return JsonResponse(msg)

def yuyuezixun_importExcel(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": "成功", "data": {}}
        tablename, params = _token_info(request)
        if not rbac.is_admin(request):
            return _forbidden_response('只有管理员可以导入预约记录')

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
                    yuyuezixun.createbyreq(yuyuezixun, yuyuezixun, req_dict)
                    
            except Exception:
                pass
                
        else:
            msg = {
                "msg": "文件类型错误",
                "code": 500
            }
                
        return JsonResponse(msg)

def yuyuezixun_autoSort2(request):
    return JsonResponse({"code": 0, "msg": '',  "data":{}})








def yuyuezixun_shBatch(request):
    '''
    批量审核
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        allowed, tablename, params = _has_appointment_access(request)
        if not allowed:
            return _forbidden_response('请先登录后审核预约记录')
        if tablename == rbac.USER_TABLE:
            return _forbidden_response('普通用户无权审核预约记录')

        for id in req_dict.get("ids"):
            data =yuyuezixun.getbyid(yuyuezixun,yuyuezixun, int(id))
            if len(data)>0:
                data=data[0]
                if not _can_access_record(request, data):
                    return _forbidden_response('无权审核该预约记录')
                data['sfsh'] = req_dict.get("sfsh")
                data['shhf'] = req_dict.get("shhf")
                yuyuezixun.updatebyparams(yuyuezixun, yuyuezixun, data)

        return JsonResponse(msg)





