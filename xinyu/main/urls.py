# coding:utf-8

import os
from importlib import import_module
from django.urls import path
from main import config_v, schema_v
# from dj2.settings import dbName as schemaName
# url规则列表
urlpatterns = [
    path(r'config/page', config_v.config_page),
    path(r'config/list', config_v.config_list),
    path(r'config/save', config_v.config_save),
    path(r'config/add', config_v.config_add),
    path(r'config/info/<id_>', config_v.config_info),
    path(r'config/info', config_v.config_info_request),
    path(r'config/detail/<id_>', config_v.config_detail),
    path(r'config/update', config_v.config_update),
    path(r'config/delete', config_v.config_delete),
]
# main app的路径
mainDir = os.path.dirname(__file__)

# 过滤文件的列表
excludeList = [
    "schema_v.py",
    "config_v.py",
]

def _view(module, table_name, action):
    return getattr(module, "{}_{}".format(table_name.lower(), action), None)


def _add_route(module, table_name, route, action):
    view_func = _view(module, table_name, action)
    if view_func is not None:
        urlpatterns.append(path(route.format(table_name.lower()), view_func))


view_files = sorted(
    i for i in os.listdir(mainDir)
    if i not in excludeList and i[-5:] == "_v.py"
)

for i in view_files:
    if i not in excludeList and i[-5:] == "_v.py":
        tableName = i[:-5]
        tableName = tableName.replace(" ", "").strip()
        module = import_module("main.{}".format(i[:-3]))

        for route, action in [
            (r'{}/default', 'default'),
            (r'{}/page', 'page'),
            (r'{}/autoSort', 'autoSort'),
            (r'{}/save', 'save'),
            (r'{}/add', 'add'),
            (r'{}/thumbsup/<id_>', 'thumbsup'),
            (r'{}/info/<id_>', 'info'),
            (r'{}/detail/<id_>', 'detail'),
            (r'{}/update', 'update'),
            (r'{}/delete', 'delete'),
            (r'{}/vote/<id_>', 'vote'),
            (r'{}/importExcel', 'importExcel'),
            (r'{}/autoSort2', 'autoSort2'),
        ]:
            _add_route(module, tableName, route, action)

        #沙箱接口
        if tableName.lower()=="yonghu":
            for route, action in [
                (r'{}/register', 'register'),
                (r'{}/accountList', 'accountList'),
                (r'{}/login', 'login'),
                (r'{}/logout', 'logout'),
                (r'{}/resetPass', 'resetPass'),
                (r'{}/updatePassword', 'updatePassword'),
                (r'{}/recovery', 'recovery'),
                (r'{}/security', 'security'),
                (r'{}/session', 'session'),
            ]:
                _add_route(module, tableName, route, action)
        if tableName.lower()=="xinliyisheng":
            for route, action in [
                (r'{}/register', 'register'),
                (r'{}/accountList', 'accountList'),
                (r'{}/login', 'login'),
                (r'{}/logout', 'logout'),
                (r'{}/resetPass', 'resetPass'),
                (r'{}/updatePassword', 'updatePassword'),
                (r'{}/recovery', 'recovery'),
                (r'{}/security', 'security'),
                (r'{}/session', 'session'),
            ]:
                _add_route(module, tableName, route, action)
        if tableName.lower() == "yuyuezixun":
            _add_route(module, tableName, r'{}/shBatch', 'shBatch')
        if tableName.lower() == "xinliyisheng":
            _add_route(module, tableName, r'{}/shBatch', 'shBatch')
        if tableName.lower() == "popupremind":
            _add_route(module, tableName, r'{}/message/list', 'message_list')
        if tableName.lower() == "jiankangyujing":
            _add_route(module, tableName, r'{}/assign', 'assign')
            _add_route(module, tableName, r'{}/doctors', 'doctors')
        if tableName.lower() == "popupremind":
            _add_route(module, tableName, r'{}/security', 'security')
        if tableName.lower() == "storeup":
            _add_route(module, tableName, r'{}/security', 'security')
        if tableName.lower()=="users":
            for route, action in [
                (r'{}/register', 'register'),
                (r'{}/accountList', 'accountList'),
                (r'{}/login', 'login'),
                (r'{}/logout', 'logout'),
                (r'{}/resetPass', 'resetPass'),
                (r'{}/updatePassword', 'updatePassword'),
                (r'{}/recovery', 'recovery'),
                (r'{}/security', 'security'),
                (r'{}/session', 'session'),
            ]:
                _add_route(module, tableName, route, action)
        if tableName.lower() == "discussxinqingriji":
            _add_route(module, tableName, r'{}/security', 'security')
        if tableName.lower() == "discussxinlizhishi":
            _add_route(module, tableName, r'{}/security', 'security')
        # AI 倾诉/情绪对话特定接口
        if tableName.lower() == "talksession":
            for route, action in [
                (r'{}/open', 'open'),
                (r'{}/send', 'send'),
                (r'{}/history', 'history'),
                (r'{}/messages', 'messages'),
            ]:
                _add_route(module, tableName, route, action)
            # 倾诉消息管理端分页（函数定义在 Talksession_v.py 内）
            _add_route(module, 'talkmessage', r'{}/page', 'page')
        # 医生助手（辅助诊断建议）特定接口
        if tableName.lower() == "doctoradvice":
            for route, action in [
                (r'{}/advice', 'advice'),
                (r'{}/history', 'history'),
            ]:
                _add_route(module, tableName, route, action)
        # 心语AI（共情倾诉 + 风险预警）特定接口
        if tableName.lower() == "xinyuai":
            for route, action in [
                (r'{}/chat', 'chat'),
                (r'{}/history', 'history'),
                (r'{}/clear', 'clear'),
            ]:
                _add_route(module, tableName, route, action)
        # examrecord特定接口
        if tableName.lower() == "examrecord":
            for route, action in [
                (r'{}/groupby', 'groupby'),
                (r'{}/deleteRecords', 'deleterecords'),
                (r'{}/options/num', 'options_num'),
                (r'{}/progress', 'progress'),
                (r'{}/submit', 'submit'),
                (r'{}/result', 'result'),
            ]:
                _add_route(module, tableName, route, action)

# examrecord特定接口
        if tableName.lower() == "orders":
            _add_route(module, tableName, r'{}/mch/list', 'mch_list')

        # forum特定接口
        if tableName.lower() == "forum":
            for route, action in [
                (r'{}/flist', 'flist'),
                (r'{}/list/<id_>', 'list_id'),
                (r'{}/query', 'query'),
                (r'{}/list', 'list'),
                (r'{}/lists', 'lists'),
            ]:
                _add_route(module, tableName, route, action)
        else:
            for route, action in [
                (r'{}/list', 'list'),
                (r'{}/query', 'query'),
                (r'{}/lists', 'lists'),
            ]:
                _add_route(module, tableName, route, action)
urlpatterns.extend(
    [
        path(r'cal/<str:tableName>/<str:columnName>', schema_v.schemaName_cal),
        path(r'file/download', schema_v.schemaName_file_download),
        path(r'file/encrypt', schema_v.schemaName_file_encrypt),
        path(r'file/decrypt', schema_v.schemaName_file_decrypt),
        path(r'file/upload', schema_v.schemaName_file_upload),
        path(r'follow/<tableName>/<columnName>/<level>/<parent>', schema_v.schemaName_follow_level),
        path(r'follow/<tableName>/<columnName>', schema_v.schemaName_follow),
        path(r'location', schema_v.schemaName_location),
        path(r'matchFace', schema_v.schemaName_matchface),
        path(r'option/<tableName>/<columnName>', schema_v.schemaName_option),
        path(r'sh/<tableName>', schema_v.schemaName_sh),
        path(r'upload/<fileName>', schema_v.schemaName_upload),
        path(r'upload/<tableName>/<fileName>', schema_v.schemaName_upload_forecast),
        path(r'group/<tableName>/<columnName>', schema_v.schemaName_group_quyu),
        path(r'value/<tableName>/<xColumnName>/<yColumnName>', schema_v.schemaName_value_quyu),
        path(r'value/<tableName>/<xColumnName>/<yColumnName>/<timeStatType>', schema_v.schemaName_value_riqitj),
        path(r'spider/<tableName>', schema_v.schemaName_spider),
        path(r'comment/list', schema_v.comment_list),
        path(r'baike/<name>', schema_v.baike),
    ]
)

# print(urlpatterns)
