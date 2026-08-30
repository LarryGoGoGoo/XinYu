# coding:utf-8

import os
import time
import json
import logging

logger = logging.getLogger(__name__)
from django.http import JsonResponse
from django.apps import apps
from wsgiref.util import FileWrapper
from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import redirect
from django.conf import settings
import requests
from util.auth import Auth
from util.CustomJSONEncoder import CustomJsonEncoder
from util.FileEncryptor import FileEncryptor
from .config_model import config
from util.codes import *
from util import message as mes
from util.baidubce_api import BaiDuBce
from util.locate import geocoding
from dj2.settings import dbName as schemaName
from django.db import connection
from dj2.views import check_suffix
import sys
from util.security import safe_join, safe_upload_name, validate_upload


def _forbid_private_schema_access(tableName):
    private_tables = {
        'yuyuezixun': '预约咨询数据请通过受权限保护的预约接口访问',
        'xinqingriji': '心情日记数据请通过受权限保护的日记接口访问',
    }
    if tableName in private_tables:
        return JsonResponse({"code": 403, "msg": private_tables[tableName], "data": {}})
    return None


def schemaName_cal(request, tableName, columnName):
    '''
    计算规则接口
    '''
    if request.method in ["POST", "GET"]:
        denied = _forbid_private_schema_access(tableName)
        if denied:
            return denied
        msg = {"code": normal_code, 'data': []}
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__ == tableName:

                data = m.getcomputedbycolumn(
                    m,
                    m,
                    columnName
                )
                if data:
                    try:
                        sum='%.05f' % float(data.get("sum"))
                    except Exception:
                        sum=0.00
                    try:
                        max='%.05f' % float(data.get("max"))
                    except Exception:
                        max=0.00
                    try:
                        min='%.05f' % float(data.get("min"))
                    except Exception:
                        min=0.00
                    try:
                        avg='%.05f' % float(data.get("avg"))
                    except Exception:
                        avg=0.00
                    msg['data'] = {
                        "sum": sum,
                        "max": max,
                        "min": min,
                        "avg": avg,
                    }
                break

        return JsonResponse(msg)


def schemaName_file_upload(request):
    '''
    上传
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": "成功", "data": {}}

        req_dict = request.session.get("req_dict")
        type = req_dict.get("type")

        file = request.FILES.get("file")
        valid, error_msg = validate_upload(file)
        if not valid:
            msg['code'] = file_notexist_code
            msg['msg'] = error_msg
            return JsonResponse(msg)

        if file:
            filename = file.name
            file_name = safe_upload_name(filename, type if type != None and '_template' in type else None)
            upload_dir = os.path.join(os.getcwd(), "templates/upload")
            filePath = safe_join(upload_dir, file_name)

            with open(filePath, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            msg["file"] = file_name
            # 判断是否需要保存为人脸识别基础照片
            req_dict = request.session.get("req_dict")
            type1 = req_dict.get("type", 0)
            type1 = str(type1)
            if type1 == '1':
                params = {"name":"faceFile","value": file_name}
                config.createbyreq(config, config, params)

        return JsonResponse(msg)

def schemaName_file_encrypt(request):
    '''
    文件加密
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, 'data': []}
        req_dict = request.session.get("req_dict")
        filename = req_dict.get("fileName")
        type = req_dict.get("type")
        encrypt_filename = filename.split(".")[0] + "_encrypt" + "." + filename.split(".")[1]
        input_path = os.path.join(os.getcwd(), "templates/upload", filename)
        output_path = os.path.join(os.getcwd(), "templates/upload")
        if not os.path.exists(input_path):
            os.makedirs(output_path)
        aes_encryptor = FileEncryptor(os.environ.get("APP_FILE_ENCRYPTION_KEY", settings.SECRET_KEY), algorithm=type)
        aes_encryptor.encrypt_file(input_path, os.path.join(output_path,encrypt_filename))
        msg["file"]= encrypt_filename
        return JsonResponse(msg)


def schemaName_file_decrypt(request):
    '''
    文件解密
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, 'data': []}
        req_dict = request.session.get("req_dict")
        filename = req_dict.get("fileName")
        type = req_dict.get("type")
        decrypt_filename = filename.split("_encrypt.")[0]+ "." + filename.split(".")[1]
        input_path = os.path.join(os.getcwd(), "templates/upload", filename)
        output_path = os.path.join(os.getcwd(), "templates/upload")
        if not os.path.exists(input_path):
            os.makedirs(output_path)
        aes_encryptor = FileEncryptor(os.environ.get("APP_FILE_ENCRYPTION_KEY", settings.SECRET_KEY), algorithm=type)
        aes_encryptor.decrypt_file(input_path, os.path.join(output_path,decrypt_filename))
        msg["file"]= decrypt_filename
        return JsonResponse(msg)

def schemaName_file_download(request):
    '''
    下载
    '''
    if request.method in ["POST", "GET"]:
        req_dict = request.session.get("req_dict")
        filename = req_dict.get("fileName")

        filePath = safe_join(os.path.join(os.getcwd(), "templates/upload"), filename)
        file = open(filePath, 'rb')
        response = HttpResponse(file)

        response['Content-Type'] = 'text/plain'
        response['Content-Disposition'] = 'attachment; filename=%s' % os.path.basename(filePath)
        response['Content-Length'] = os.path.getsize(filePath)
        return response


def schemaName_follow_level(request, tableName, columnName, level, parent):
    '''

    '''
    if request.method in ["POST", "GET"]:
        denied = _forbid_private_schema_access(tableName)
        if denied:
            return denied
        msg = {"code": normal_code, 'data': []}
        # 组合查询参数
        params = {
            "level": level,
            "parent": parent
        }

        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__ == tableName:
                data = m.getbyparams(
                    m,
                    m,
                    params
                )
                # 只需要此列的数据
                for i in data:
                    msg['data'].append(i.get(columnName))
                break
        return JsonResponse(msg)


def schemaName_follow(request, tableName, columnName):
    '''
    根据option字段值获取某表的单行记录接口
    组合columnName和columnValue成dict，传入查询方法
    '''
    if request.method in ["POST", "GET"]:
        denied = _forbid_private_schema_access(tableName)
        if denied:
            return denied
        msg = {"code": normal_code, 'data': []}
        # 组合查询参数
        params = request.session.get('req_dict')
        columnValue = params.get("columnValue")
        params = {columnName: columnValue}

        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__ == tableName:
                data = m.getbyparams(
                    m,
                    m,
                    params
                )
                if len(data)>0:
                    msg['data'] = data[0]
                break

        return JsonResponse(msg)


def schemaName_location(request):
    '''
    定位
    :return:
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "address": ''}
        req_dict = request.session.get('req_dict')

        datas = config.getbyparams(config, config, {"name": "baidu_ditu_ak"})
        if os.environ.get("BAIDU_MAP_AK"):
            baidu_ditu_ak = os.environ.get("BAIDU_MAP_AK")
        elif len(datas) > 0:
            baidu_ditu_ak = datas[0].get("baidu_ditu_ak")
        else:
            msg['msg'] = '未配置地图服务密钥'
            return JsonResponse(msg)
        lat = req_dict.get("lat", 24.2943350100)
        lon = req_dict.get("lng", 116.1287866600)
        msg['address'] = geocoding(baidu_ditu_ak, lat, lon)

        return JsonResponse(msg)


def schemaName_matchface(request):
    '''
    baidubce百度人脸识别
    '''
    if request.method in ["POST", "GET"]:
        try:
            msg = {"code": normal_code}
            req_dict = request.session.get("req_dict")

            face1 = req_dict.get("face1")
            file_path1 = os.path.join(os.getcwd(),"templates/upload",face1)

            face2 = req_dict.get("face2")
            file_path2 = os.path.join(os.getcwd(), "templates/upload", face2)

            data = config.getbyparams(config, config, {"name": "APIKey"})
            client_id = data[0].get("value")
            data = config.getbyparams(config, config, {"name": "SecretKey"})
            client_secret = data[0].get("value")

            bdb = BaiDuBce()
            score = bdb.bd_check2pic(file_path1, file_path2)
            msg['score'] = score

            return JsonResponse(msg)
        except Exception:
            return JsonResponse({"code": 500, "msg": "匹配失败", "score": 0})


def schemaName_option(request, tableName, columnName):
    '''
    获取某表的某个字段列表接口
    :param request:
    :param tableName:
    :param columnName:
    :return:
    '''
    if request.method in ["POST", "GET"]:
        denied = _forbid_private_schema_access(tableName)
        if denied:
            return denied
        msg = {"code": normal_code, 'data': []}

        new_params = {}
        params = request.session.get("req_dict")
        if params.get('conditionColumn') != None and params.get('conditionValue') != None:
            new_params[params['conditionColumn']] = params['conditionValue']

        if params.get('refConditionQueryMethod') == 'in':
            new_params[params['refConditionColumn']] = [int(x.strip()) for x in params['refConditionValue'].split(',')]
        elif params.get('refConditionQueryMethod') == '=':
            new_params[params['refConditionColumn']] = params['refConditionValue']
        elif params.get('refConditionQueryMethod') == 'like':
            new_params[params['refConditionColumn']+"_contains"] = params['refConditionValue']

        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__ == tableName:
                data = m.getbyColumn(
                    m,
                    m,
                    columnName,
                    new_params
                )

                msg['data'] = data
                break
        return JsonResponse(msg)

def schemaName_sh(request, tableName):
    '''
    根据主键id修改table表的sfsh状态接口
    '''
    if request.method in ["POST", "GET"]:
        denied = _forbid_private_schema_access(tableName)
        if denied:
            return denied
        msg = {"code": normal_code, "msg": "成功", "data": {}}
        req_dict = request.session.get("req_dict")
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__ == tableName:

                # 查询结果
                data1 = m.getbyid(
                    m,
                    m,
                    req_dict.get('id')
                )
                if data1[0].get("sfsh") == '是':
                    req_dict['sfsh'] = '否'
                else:
                    req_dict['sfsh'] = '是'

                # 更新
                res = m.updatebyparams(
                    m,
                    m,
                    req_dict
                )
                # logging.warning("schemaName_sh.res=====>{}".format(res))
                if res!=None:
                    msg["code"]=crud_error_code
                    msg["code"]=mes.crud_error_code
                break
        return JsonResponse(msg)


def schemaName_upload(request, fileName):
    '''
    '''
    if request.method in ["POST", "GET"]:
        fullPath = request.get_full_path()
        path1 = safe_join(os.path.join(os.getcwd(), "templates/upload"), fileName)
        return check_suffix(fileName, path1)

def schemaName_upload_forecast(request,tableName,fileName):
    '''
    '''
    if request.method in ["POST", "GET"]:
        fullPath = request.get_full_path()
        path1 = safe_join(os.path.join(os.getcwd(), "templates/upload", tableName), fileName)

        return check_suffix(fileName, path1)


def schemaName_group_quyu(request, tableName, columnName):
    '''
    {
    "code": 0,
    "data": [
        {
            "total": 2,
            "shangpinleibie": "水果"
        },
        {
            "total": 1,
            "shangpinleibie": "蔬菜"
        }
    ]
    }
    '''
    if request.method in ["POST", "GET"]:
        denied = _forbid_private_schema_access(tableName)
        if denied:
            return denied
        msg = {"code": normal_code, "msg": "成功", "data": {}}
        allModels = apps.get_app_config('main').get_models()
        where = {}
        for m in allModels:
            if m.__tablename__ == tableName:
                for item in m.__authTables__.items():
                    if request.session.get("tablename") == item[1]:
                        where[item[0]] = request.session.get("params").get(item[0])
                msg['data'] = m.groupbycolumnname(
                    m,
                    m,
                    columnName,
                    where
                )
                break

        return JsonResponse(msg)


def schemaName_value_quyu(request, tableName, xColumnName, yColumnName):
    '''
    按值统计接口,
    {
    "code": 0,
    "data": [
        {
            "total": 10.0,
            "shangpinleibie": "aa"
        },
        {
            "total": 20.0,
            "shangpinleibie": "bb"
        },
        {
            "total": 15.0,
            "shangpinleibie": "cc"
        }
    ]
}
    '''
    if request.method in ["POST", "GET"]:
        denied = _forbid_private_schema_access(tableName)
        if denied:
            return denied
        msg = {"code": normal_code, "msg": "成功", "data": {}}
        allModels = apps.get_app_config('main').get_models()
        where = {}
        for m in allModels:
            if m.__tablename__ == tableName:
                for item in m.__authTables__.items():
                    if request.session.get("tablename") == item[1]:
                        where[item[0]] = request.session.get("params").get(item[0])
                msg['data'] = m.getvaluebyxycolumnname(
                    m,
                    m,
                    xColumnName,
                    yColumnName,
                    where
                )
                break

        return JsonResponse(msg)

def schemaName_value_riqitj(request, tableName, xColumnName, yColumnName, timeStatType):
    if request.method in ["POST", "GET"]:
        denied = _forbid_private_schema_access(tableName)
        if denied:
            return denied
        msg = {"code": normal_code, "msg": "成功", "data": {}}
        allowed_time_types = {'日': '%Y-%m-%d', '月': '%Y-%m', '年': '%Y'}
        if timeStatType not in allowed_time_types:
            msg['code'] = validate_param_code
            msg['msg'] = '统计类型不合法'
            return JsonResponse(msg)

        allModels = apps.get_app_config('main').get_models()
        model = None
        where = {}
        for m in allModels:
            if m.__tablename__ == tableName:
                model = m
                for item in m.__authTables__.items():
                    if request.session.get("tablename") == item[1]:
                        where[item[0]] = request.session.get("params").get(item[0])
                break

        if model is None:
            msg['code'] = validate_param_code
            msg['msg'] = '数据表不存在'
            return JsonResponse(msg)

        columns = model.getallcolumn(model, model)
        # 校验列名只含合法字符，防止 SQL 注入
        _allowed_col_re = __import__('re').compile(r'^[a-zA-Z_][a-zA-Z0-9_]*$')
        if not _allowed_col_re.match(xColumnName) or not _allowed_col_re.match(yColumnName):
            msg['code'] = validate_param_code
            msg['msg'] = '统计字段名不合法'
            return JsonResponse(msg)
        if xColumnName not in columns or yColumnName not in columns:
            msg['code'] = validate_param_code
            msg['msg'] = '统计字段不合法'
            return JsonResponse(msg)

        where_sql = ''
        values = []
        for column, value in where.items():
            if column in columns and _allowed_col_re.match(column):
                where_sql += " and `{}` = %s ".format(column)
                values.append(value)

        date_format = allowed_time_types[timeStatType]
        # 列名和表名均已通过白名单校验，安全拼接
        sql = "SELECT DATE_FORMAT(`{0}`, %s) `{0}`, sum(`{1}`) total FROM `{2}` where 1 = 1 {3} GROUP BY DATE_FORMAT(`{0}`, %s)".format(
            xColumnName,
            yColumnName,
            tableName,
            where_sql,
        )
        values = [date_format] + values + [date_format]

        L = []
        cursor = connection.cursor()
        cursor.execute(sql, values)
        desc = cursor.description
        data_dict = [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()] 
        for online_dict in data_dict:
            for key in online_dict:
                if 'datetime.datetime' in str(type(online_dict[key])):
                    online_dict[key] = online_dict[key].strftime(
                        "%Y-%m-%d %H:%M:%S")
                else:
                    pass
            L.append(online_dict)
        msg['data'] = L

        return JsonResponse(msg)
import logging
logger = logging.getLogger(__name__)
def schemaName_spider(request, tableName):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": "成功", "data": []}
        allowed_tables = {
            m.__tablename__
            for m in apps.get_app_config('main').get_models()
        }
        if tableName not in allowed_tables:
            return JsonResponse({"code": validate_param_code, "msg": "数据表不存在", "data": []})

        spider_root = os.environ.get("APP_SPIDER_ROOT", "/yykj/python/9999/spider${spiderSchemaName}")
        if not os.path.isdir(spider_root):
            return JsonResponse({"code": crud_error_code, "msg": "爬虫目录不存在", "data": []})

        subprocess.run(
            ["scrapy", "crawl", "{}Spider".format(tableName), "-a", "databaseName=xinyu"],
            cwd=spider_root,
            check=False,
        )

        return JsonResponse(msg)




def comment_list(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        #当前登录用户信息
        tablename = request.session.get("tablename")
        # 判断当前表的表属性isAdmin,为真则是管理员
        __isAdmin__ = None
        pagList=[]
        userid=request.session.get("params").get("id")
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__.startswith('discuss'):
                record = m.objects.filter(userid=userid).all().values()
                for item in record:
                    item['tablename'] = m.__tablename__.replace('discuss', '')
                pagList.extend(record)
        msg['data'] = pagList
        return JsonResponse(msg,encoder=CustomJsonEncoder)
from lxml import html
from lxml.cssselect import CSSSelector

def extract_lemma_summary_lxml(html_string):
    """
    使用lxml解析HTML，性能更好
    """
    tree = html.fromstring(html_string)
    # 使用CSS选择器
    selector = CSSSelector('div.lemmaSummary_O3o_W.J-summary')
    elements = selector(tree)
    if elements:
        # 获取所有文本
        texts = []
        for element in elements:
            # 获取元素及其所有子元素的文本
            text = element.text_content()
            texts.append(text.strip())
        return remove_reference_brackets(' '.join(texts))
    return ""

import re
def remove_reference_brackets(text):
    """
    去除字符串中类似[7]这样的引用标记
    """
    # 匹配[数字]模式
    pattern = r'\[\d+\]'
    result = re.sub(pattern, '', text)
    return result

# 查询百度百科信息
def baike(request, name):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": "成功", "data": {}}
        try:
            result = requests.get("https://baike.baidu.com/item/" + name)
            content = extract_lemma_summary_lxml(result.text.encode())
            msg['data'] = content
        except Exception as e:
            import traceback
            traceback.print_exc()
            msg['code'], msg['msg'] = other_code, str(e)
        return JsonResponse(msg)
