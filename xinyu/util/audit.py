# coding:utf-8
"""轻量审计日志：把敏感管理操作写入 logs/audit.log 以便追溯。

不引入新的数据表与视图，避免增加攻击面；仅用 logging 追加写文件。
"""
import logging
import os

from django.conf import settings

_LOGGER_NAME = "xinli_audit"


def _get_logger():
    logger = logging.getLogger(_LOGGER_NAME)
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        log_dir = os.path.join(settings.BASE_DIR, "logs")
        try:
            if not os.path.isdir(log_dir):
                os.makedirs(log_dir)
        except Exception:
            log_dir = settings.BASE_DIR
        handler = logging.FileHandler(
            os.path.join(log_dir, "audit.log"), encoding="utf-8")
        handler.setFormatter(logging.Formatter("[%(asctime)s] %(message)s"))
        logger.addHandler(handler)
        logger.propagate = False
    return logger


def audit_log(actor, action, target="", ip="", result="成功"):
    """记录一条审计日志。

    :param actor: 操作者账号（管理员）
    :param action: 动作描述（如"重置管理员密码"）
    :param target: 被操作对象（如被重置的账号）
    :param ip: 操作来源 IP
    :param result: 结果（成功/失败）
    """
    try:
        _get_logger().info(
            "actor=%s | action=%s | target=%s | ip=%s | result=%s",
            actor, action, target, ip, result)
    except Exception:
        # 审计失败不应阻断业务
        pass
