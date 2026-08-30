# coding:utf-8
import logging
import time
from collections import defaultdict
from threading import Lock

from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger('django.middleware')

# 登录相关路径标识
LOGIN_PATH_MARKERS = ("login", "logout", "register")

# 配置：每 IP 每分钟最多请求次数
# 小程序首页加载会并发大量请求，因此提高限制
MAX_REQUESTS_PER_MINUTE = 5000
# 登录接口每 IP 每分钟最多尝试次数
MAX_LOGIN_PER_MINUTE = 500


class RateLimitMiddleware(MiddlewareMixin):
    """基于 IP 的简单频控中间件"""

    def __init__(self, get_response=None):
        super().__init__(get_response)
        self._lock = Lock()
        self._window = defaultdict(list)  # {ip: [timestamp, ...]}
        self._window_login = defaultdict(list)

    def _cleanup(self, window):
        """清理过期记录"""
        now = time.time()
        return [t for t in window if now - t < 60]

    def _is_rate_limited(self, ip, full_path):
        """检查是否触发频控，返回 (is_limited, error_msg)"""
        now = time.time()

        # 判断是否为登录注册接口
        is_login = any(m in full_path.lower() for m in LOGIN_PATH_MARKERS)
        max_req = MAX_LOGIN_PER_MINUTE if is_login else MAX_REQUESTS_PER_MINUTE
        window_dict = self._window_login if is_login else self._window

        with self._lock:
            window = window_dict.get(ip, [])
            window = self._cleanup(window)
            window.append(now)
            window_dict[ip] = window

            if len(window) > max_req:
                logger.warning("RateLimit hit: ip=%s path=%s count=%d", ip, full_path, len(window))
                return True, "请求过于频繁，请稍后再试"

        return False, ""

    def process_request(self, request):
        if request.method == 'OPTIONS':
            return None

        # 获取真实 IP
        x_forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded:
            ip = x_forwarded.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR', '127.0.0.1')

        full_path = request.get_full_path()
        is_limited, err_msg = self._is_rate_limited(ip, full_path)

        if is_limited:
            return JsonResponse(
                {"code": 429, "msg": err_msg},
                status=429
            )

        return None