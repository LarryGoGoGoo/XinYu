# coding:utf-8
"""统一 RBAC 权限工具与装饰器。

三种角色由 token 中的 tablename 标识：
    users        → 管理员
    xinliyisheng → 心理医生
    yonghu       → 普通用户

装饰器用法（替换散落在各视图里的 `tablename=='users'` 判断）：

    from util import rbac

    @rbac.admin_only("仅管理员可操作")
    def xxx_save(request):
        ...

    @rbac.doctor_or_admin("仅管理员或医生可操作")
    def xxx_add(request):
        ...

函数式用法（需要保留特殊 403 响应体时）：

    if not rbac.is_admin(request):
        return rbac.forbidden("仅管理员可操作", data=[])
"""
import functools

from django.http import JsonResponse

from util.CustomJSONEncoder import CustomJsonEncoder
from util.auth import Auth

ADMIN_TABLE = "users"
DOCTOR_TABLE = "xinliyisheng"
USER_TABLE = "yonghu"


def token_info(request):
    """读取当前请求角色：返回 (tablename, params)。"""
    info = Auth().getTokenInfo(request) or {}
    return info.get("tablename"), info.get("params") or {}


def is_admin(request):
    """当前请求是否来自管理员（users 表登录态）。"""
    return token_info(request)[0] == ADMIN_TABLE


def is_doctor(request):
    """当前请求是否来自心理医生（xinliyisheng 表登录态）。"""
    return token_info(request)[0] == DOCTOR_TABLE


def is_user(request):
    """当前请求是否来自普通用户（yonghu 表登录态）。"""
    return token_info(request)[0] == USER_TABLE


def forbidden(msg="无权限执行该操作", data=None, encoder=CustomJsonEncoder):
    """统一 403 响应。data 默认 {}，可传 [] 等以兼容个别接口旧行为。"""
    return JsonResponse(
        {"code": 403, "msg": msg, "data": data if data is not None else {}},
        encoder=encoder,
    )


def admin_only(msg="仅管理员可操作", data=None):
    """仅管理员可调用，否则返回 403。"""
    def decorator(view_func):
        @functools.wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not is_admin(request):
                return forbidden(msg, data=data)
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator


def doctor_or_admin(msg="仅管理员或医生可操作", data=None):
    """管理员或心理医生可调用，否则返回 403。"""
    def decorator(view_func):
        @functools.wraps(view_func)
        def wrapper(request, *args, **kwargs):
            tablename, _ = token_info(request)
            if tablename not in (ADMIN_TABLE, DOCTOR_TABLE):
                return forbidden(msg, data=data)
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator
