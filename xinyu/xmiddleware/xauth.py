#coding:utf-8

import logging

from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from django.apps import apps

from util.auth import Auth
from util.codes import *
from util.security import json_response
from dj2.settings import dbName as schemaName

logger = logging.getLogger('django.middleware')


class Xauth(MiddlewareMixin):
    def process_request(self,request):
        fullPath = request.get_full_path()
        logger.debug("fullPath===============>%s", fullPath)
        if request.META.get('HTTP_UPGRADE')=='websocket':
            return
        if request.method == 'GET':
            # 已登录用户标记为 CSRF 豁免（API 使用自定义 Token 认证）
            request.csrf_processing_done = True

            filterList = [
                "/index",
                "/follow",
                "/favicon.ico",
                "/login",
                "/register",
                "/notify",
                "/file",
                "/admin",
                "/xadmin",
                "/yolo",
                "/baike",
                "/{}/remind/".format(schemaName),
                "/{}/option/".format(schemaName),
                # 配置接口（登录页需要获取背景图、Logo 等公共配置）
                "/xinli/config",
                "/xinyu/config",
                # 兼容前端硬编码的 /xinyu/ 前缀
                "/xinyu/defaultuser/login",
                "/xinyu/defaultuser/register",
                "/xinyu/users/login",
            ]

            # 静态文件后缀白名单（精确后缀匹配）
            static_exts = (
                '.js', '.css', '.jpg', '.jpeg', '.png', '.gif',
                '.mp4', '.mp3', '.ttf', '.wotf', '.woff', '.woff2',
                '.otf', '.eot', '.svg', '.csv', '.webp',
                '.xls', '.xlsx', '.doc', '.docx', '.ppt', '.pptx',
                '.html', '.htm',
            )

            allModels = apps.get_app_config('main').get_models()
            for m in allModels:
                foreEndList = getattr(m, '__foreEndList__', None)
                tbl = getattr(m, '__tablename__', None)
                if tbl is None:
                    continue
                # /xinli/ 前缀（通过 schemaName 注入）
                prefix1 = "/{}/{}".format(schemaName, tbl)
                # 兼容前端硬编码的 /xinyu/ 前缀
                prefix2 = "/xinyu/{}".format(tbl)
                for p in (prefix1, prefix2):
                    # list 接口一律放行到接口层：由接口层根据登录态自行返回
                    # 401（未登录）/ 403（无权限）/ 数据（已登录），保持 HTTP 200 + 业务码约定
                    filterList.append("{}/list".format(p))
                    if foreEndList is None or foreEndList != "前要登":
                        filterList.append("{}/sendemail".format(p))
                        filterList.append("{}/sendsms".format(p))
                        filterList.append("{}/detail".format(p))
                        # 公开查询接口：首页/列表页未登录也要访问
                        filterList.append("{}/autoSort".format(p))
                        filterList.append("{}/autoSort2".format(p))
                        filterList.append("{}/page".format(p))
                        filterList.append("{}/query".format(p))
                        # 登录/注册/会话等认证接口（前端用 GET 请求）
                        filterList.append("{}/login".format(p))
                        filterList.append("{}/register".format(p))
                        filterList.append("{}/session".format(p))
                        filterList.append("{}/resetPass".format(p))
                        filterList.append("{}/updatePassword".format(p))
                        filterList.append("{}/recovery".format(p))

            auth = True
            if fullPath == '/':
                auth = False
            else:
                if fullPath.endswith(static_exts):
                    auth = False
                else:
                    for i in filterList:
                        if fullPath == i or fullPath.startswith(i + '?') or fullPath.startswith(i + '/'):
                            auth = False
                            break

            if auth:
                logger.warning("[AUTH-GET] need auth: %s %s token=%s", request.method, fullPath, request.META.get('HTTP_TOKEN', 'NONE')[:50] if request.META.get('HTTP_TOKEN') else 'NONE')
                result = Auth.identify(Auth, request)
                if result.get('code') != normal_code:
                    logger.warning("[AUTH-GET] FAIL: %s %s code=%s msg=%s", request.method, fullPath, result.get('code'), result.get('msg'))
                    return json_response(result)

        elif request.method == 'POST':
            # 已登录用户标记为 CSRF 豁免
            request.csrf_processing_done = True

            post_whitelist = [
                '/{}/defaultuser/register'.format(schemaName),
                '/{}/defaultuser/login'.format(schemaName),
                # 用户（yonghu）注册/登录：注册无需登录态，登录自会校验密码
                '/{}/yonghu/register'.format(schemaName),
                '/{}/yonghu/login'.format(schemaName),
                # 管理员注册不再白名单：仅已登录管理员可在接口层校验后创建（防任意人注册管理员提权）
                '/{}/users/login'.format(schemaName),
                '/{}/xinliyisheng/register'.format(schemaName),
                '/{}/xinliyisheng/login'.format(schemaName),
                '/{}/examusers/login'.format(schemaName),
                '/{}/examusers/register'.format(schemaName),
                '/{}/file/upload'.format(schemaName),
                # 兼容前端硬编码的 /xinyu/ 前缀
                '/xinyu/defaultuser/register',
                '/xinyu/defaultuser/login',
                # 用户（yonghu）注册/登录：注册无需登录态，登录自会校验密码
                '/xinyu/yonghu/register',
                '/xinyu/yonghu/login',
                # 管理员注册不再白名单（同上）
                '/xinyu/users/login',
                '/xinyu/xinliyisheng/register',
                '/xinyu/xinliyisheng/login',
                '/xinyu/examusers/login',
                '/xinyu/examusers/register',
                '/xinyu/file/upload',
            ]
            # 去掉查询参数，只比较路径部分
            path_only = fullPath.split('?')[0]
            if path_only not in post_whitelist:
                logger.warning("[AUTH-POST] need auth: %s %s token=%s", request.method, fullPath, request.META.get('HTTP_TOKEN', 'NONE')[:50] if request.META.get('HTTP_TOKEN') else 'NONE')
                result = Auth.identify(Auth, request)
                if result.get('code') != normal_code:
                    logger.warning("[AUTH-POST] FAIL: %s %s code=%s msg=%s", request.method, fullPath, result.get('code'), result.get('msg'))
                    return json_response(result)
