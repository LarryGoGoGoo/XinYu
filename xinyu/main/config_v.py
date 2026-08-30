# coding:utf-8

import logging

from django.http import JsonResponse

from .config_model import config
from util.codes import *
from util import message as mes
from util.auth import Auth
from util import rbac


def config_page(request):
    '''
    获取参数信息
    :return:
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,
               "data": {"currPage": 1, "totalPage": 1, "total": 1, "pageSize": 10, "list": []}}
        req_dict = request.session.get('req_dict')
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize'] = config.page(config, config, req_dict)
        return JsonResponse(msg)


def config_list(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,
               "data": {"currPage": 1, "totalPage": 1, "total": 1, "pageSize": 10, "list": []}}
        req_dict = request.session.get("req_dict")

        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize'] = config.page(config, config, req_dict)

        return JsonResponse(msg)


def config_info(request, id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        data = config.getbyid(config, config, int(id_))
        if len(data) > 0:
            msg['data'] = data[0]
        return JsonResponse(msg)

def config_info_request(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        data, _, _, _, _ = config.page(config, config, req_dict)
        if len(data) > 0:
            msg['data'] = data[0]
        return JsonResponse(msg)

def config_detail(request, id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data = config.getbyid(config, config, int(id_))
        if len(data) > 0:
            msg['data'] = data[0]
        return JsonResponse(msg)


def config_save(request):
    '''
    创建参数信息（仅管理员）
    :return:
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            return rbac.forbidden("仅管理员可操作全局配置")

        req_dict = request.session.get('req_dict')
        param1 = config.getbyparams(config, config, req_dict)
        if param1:
            msg['code'] = id_exist_code
            msg['msg'] = mes.id_exist_code
            return JsonResponse(msg)

        idOrErr = config.createbyreq(config, config, req_dict)
        if isinstance(idOrErr, str):
            msg['code'] = crud_error_code
            msg['msg'] = idOrErr
        else:
            msg['data'] = idOrErr
        return JsonResponse(msg)


def config_add(request):
    '''
    （仅管理员）
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            return rbac.forbidden("仅管理员可操作全局配置")
        req_dict = request.session.get("req_dict")

        error = config.createbyreq(config, config, req_dict)
        if isinstance(error, str):
            msg['code'] = crud_error_code
            msg['msg'] = error
        else:
            msg['data'] = error
        return JsonResponse(msg)


def config_update(request):
    '''
    更新参数信息（仅管理员）
    :return:
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            return rbac.forbidden("仅管理员可操作全局配置")

        req_dict = request.session.get('req_dict')

        config.updatebyparams(config, config, req_dict)

        return JsonResponse(msg)


def config_delete(request):
    '''
    删除参数信息（仅管理员）
    :return:
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        if not rbac.is_admin(request):
            return rbac.forbidden("仅管理员可操作全局配置")

        req_dict = request.session.get('req_dict')
        config.deletes(config,
            config,
            req_dict.get("ids")
        )

        return JsonResponse(msg)
