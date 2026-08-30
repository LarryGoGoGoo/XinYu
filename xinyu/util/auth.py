# coding:utf-8
import copy
from django.http import JsonResponse
from django.apps import apps

from util.codes import *
from util import message as mes
from util.security import sanitize_auth_params, sign_token, parse_token, is_token_revoked, json_response


class Auth(object):
    def authenticate(self, model, req_dict):
        """
        用户登录，登录成功返回token；登录失败返回失败原因
        :param username:账号
        :param password:密码
        :return: json
        """
        msg = {'code': normal_code, 'msg': mes.normal_code, 'data': {}}
        tablename = model.__tablename__
        token_params = sanitize_auth_params(req_dict)
        encode_dict = {"tablename": tablename, "params": token_params}
        msg['data']["id"] = req_dict.get("id")
        msg["id"] = req_dict.get("id")
        msg["username"] = req_dict.get("username")
        msg['token'] = sign_token(encode_dict)
        return json_response(msg)

    def get_token(self, model, req_dict):
        tablename=model.__tablename__
        encode_dict = {"tablename":tablename, "params": sanitize_auth_params(req_dict)}
        return sign_token(encode_dict)

    def identify(self, request):
        """
        用户鉴权
        :param request:本次请求对象
        :return: list
        """

        msg = {'code': normal_code, 'msg': mes.normal_code, 'data': {}}
        # django的header被处理过了
        token = request.META.get('HTTP_TOKEN')
        # 兼容小程序：从请求参数中获取token（旧版小程序没有在header里传token）
        if not token or token == 'null':
            token = request.GET.get('token') or request.POST.get('token')

        if token  and token !="null":

            auth_token = copy.deepcopy(token)
            decode_dict = parse_token(auth_token)
            if not decode_dict:
                msg['code'] = 401
                msg['msg'] = '认证信息无效或已过期'
                return msg

            # 检查 token 是否已被注销（黑名单）
            if is_token_revoked(auth_token):
                msg['code'] = 401
                msg['msg'] = '认证信息已被注销，请重新登录'
                return msg

            tablename2 = decode_dict.get("tablename")

            params2 = decode_dict.get("params",{})

            datas=None
            allModels = apps.get_app_config('main').get_models()
            for model in allModels:
                if model.__tablename__ == tablename2:
                    datas = model.getbyparams(model, model, params2)

            if not datas:
                msg['code'] = 401
                msg['msg'] = '找不到该用户信息'
                result = msg
            else:
                request.session['tablename'] = tablename2
                request.session['params'] = params2
                msg['msg'] = '身份验证通过。'
                result = msg
        else:
            msg['code'] = 401
            msg['msg'] = 'headers未包含认证信息。'
            result = msg
        return result

    def getTokenInfo(self, request):
        try:
            token = request.META.get('HTTP_TOKEN')
            return parse_token(token)
        except Exception:
            return {}
