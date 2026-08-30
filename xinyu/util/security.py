# coding:utf-8
import base64
import datetime
import hashlib
import hmac
import json
import os
import time
from pathlib import Path

from django.conf import settings
from django.contrib.auth.hashers import check_password, identify_hasher, make_password
from django.forms.models import model_to_dict


PASSWORD_FIELDS = ("password", "mima")
RECOVERY_ANSWER_FIELDS = ("panswer", "security_answer")
RECOVERY_QUESTION_FIELDS = ("pquestion", "security_question")
RECOVERY_EMAIL_FIELDS = ("email", "youxiang")
TOKEN_TTL_SECONDS = int(os.environ.get("APP_TOKEN_TTL_SECONDS", 60 * 60 * 24 * 7))
UPLOAD_MAX_SIZE = int(os.environ.get("APP_UPLOAD_MAX_SIZE", 20 * 1024 * 1024))
UPLOAD_ALLOWED_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".gif", ".webp",
    ".mp4", ".mp3", ".wav",
    ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
    ".txt", ".csv",
}


def _b64encode(data):
    return base64.urlsafe_b64encode(data).decode("utf-8").rstrip("=")


def _b64decode(data):
    padding = "=" * (-len(data) % 4)
    return base64.urlsafe_b64decode((data + padding).encode("utf-8"))


def is_encoded_password(value):
    if not value:
        return False
    try:
        identify_hasher(value)
        return True
    except Exception:
        return False


def hash_password(value):
    if value in (None, ""):
        return value
    if is_encoded_password(value):
        return value
    return make_password(str(value))


def normalize_password_fields(params):
    for field in PASSWORD_FIELDS:
        if field in params:
            params[field] = hash_password(params.get(field))
    return params


def validate_password_strength(password):
    """校验密码强度，返回 (is_valid, error_message)
    要求: 至少8位，含大小写字母和数字
    """
    if not password:
        return False, "密码不能为空"
    if len(str(password)) < 8:
        return False, "密码长度不能少于8位"
    import re
    if not re.search(r'[a-z]', str(password)):
        return False, "密码必须包含小写字母"
    if not re.search(r'[A-Z]', str(password)):
        return False, "密码必须包含大写字母"
    if not re.search(r'\d', str(password)):
        return False, "密码必须包含数字"
    return True, ""


def get_model_columns(model):
    return [field.name for field in model._meta.fields]


def get_login_field(model):
    columns = get_model_columns(model)
    login_field = getattr(model, "__loginUserColumn__", None) or getattr(model, "__loginUser__", None)
    if login_field in columns:
        return login_field
    return "username" if "username" in columns else None


def get_password_field(model):
    columns = get_model_columns(model)
    for field in PASSWORD_FIELDS:
        if field in columns:
            return field
    return None


def sanitize_auth_params(params):
    clean = dict(params or {})
    for field in PASSWORD_FIELDS:
        clean.pop(field, None)
    return clean


def authenticate_model_user(model, req_dict):
    login_field = get_login_field(model)
    password_field = get_password_field(model)
    if not login_field or not password_field:
        return None

    username = req_dict.get("username") or req_dict.get(login_field)
    raw_password = req_dict.get("password") or req_dict.get(password_field) or req_dict.get("mima")
    if username in (None, "") or raw_password in (None, ""):
        return None

    record = model.objects.filter(**{login_field: username}).first()
    if not record:
        return None

    stored_password = getattr(record, password_field, "")
    if is_encoded_password(stored_password):
        password_ok = check_password(str(raw_password), stored_password)
    else:
        # 明文密码不再支持，请通过 migrate_plaintext_passwords() 迁移
        password_ok = False

    if not password_ok:
        return None

    data = model_to_dict(record)
    data["id"] = record.id
    data["username"] = username
    data[login_field] = username
    return data


def reset_model_password(model, username, new_password=None):
    login_field = get_login_field(model)
    password_field = get_password_field(model)
    if not login_field or not password_field or username in (None, ""):
        return 0
    if not new_password:
        # 未显式传入时生成随机强密码，避免弱默认值
        import random, string
        new_password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
    # 密码强度校验（重置密码也需符合强度要求）
    valid, err_msg = validate_password_strength(new_password)
    if not valid:
        return err_msg
    return model.objects.filter(**{login_field: username}).update(
        **{password_field: hash_password(new_password)}
    )


def change_model_password(model, user_id, old_password, new_password):
    password_field = get_password_field(model)
    if not password_field or user_id in (None, "") or not old_password or not new_password:
        return False

    record = model.objects.filter(id=user_id).first()
    if not record:
        return False

    stored_password = getattr(record, password_field, "")
    if is_encoded_password(stored_password):
        password_ok = check_password(str(old_password), stored_password)
    else:
        password_ok = False

    if not password_ok:
        return False

    setattr(record, password_field, hash_password(new_password))
    record.save(update_fields=[password_field])
    return True


def public_record(record):
    if record is None:
        return None
    data = dict(record) if isinstance(record, dict) else model_to_dict(record)
    for field in PASSWORD_FIELDS:
        data.pop(field, None)
    for field in RECOVERY_ANSWER_FIELDS:
        data.pop(field, None)
    return data


def public_records(records):
    return [public_record(record) for record in records]


def get_recovery_public_record(model, username):
    login_field = get_login_field(model)
    if not login_field or username in (None, ""):
        return None

    record = model.objects.filter(**{login_field: username}).first()
    if not record:
        return None

    data = public_record(record)
    if not any(field in data for field in RECOVERY_QUESTION_FIELDS + RECOVERY_EMAIL_FIELDS):
        data["recoverySupported"] = False
        data["recoveryMessage"] = "当前账号未配置找回密码方式"
    else:
        data["recoverySupported"] = True
    return data


def recover_model_password(model, username, new_password, panswer=None, email=None):
    login_field = get_login_field(model)
    password_field = get_password_field(model)
    if not login_field or not password_field or username in (None, "") or not new_password:
        return False, "账号或新密码不能为空"

    record = model.objects.filter(**{login_field: username}).first()
    if not record:
        return False, "用户不存在"

    columns = get_model_columns(model)
    if panswer:
        answer_field = next((field for field in RECOVERY_ANSWER_FIELDS if field in columns), None)
        if not answer_field:
            return False, "当前账号未配置密保答案"
        stored_answer = getattr(record, answer_field, "")
        if not hmac.compare_digest(str(stored_answer or ""), str(panswer)):
            return False, "密保答案不正确"
    elif email:
        email_field = next((field for field in RECOVERY_EMAIL_FIELDS if field in columns), None)
        if not email_field:
            return False, "当前账号未配置邮箱找回"
        stored_email = getattr(record, email_field, "")
        if not hmac.compare_digest(str(stored_email or "").lower(), str(email).lower()):
            return False, "邮箱不正确"
    else:
        return False, "请提供密保答案或邮箱"

    setattr(record, password_field, hash_password(new_password))
    record.save(update_fields=[password_field])
    return True, ""


def sign_token(payload):
    body = dict(payload or {})
    now = int(time.time())
    body.setdefault("iat", now)
    body.setdefault("exp", now + TOKEN_TTL_SECONDS)
    body_text = json.dumps(body, ensure_ascii=False, separators=(",", ":"), sort_keys=True)
    encoded_body = _b64encode(body_text.encode("utf-8"))
    secret = settings.SECRET_KEY.encode("utf-8")
    signature = hmac.new(secret, encoded_body.encode("utf-8"), hashlib.sha256).hexdigest()
    return "{}.{}".format(encoded_body, signature)


def parse_token(token):
    if not token or token == "null":
        return {}

    if "." in token:
        encoded_body, signature = token.rsplit(".", 1)
        secret = settings.SECRET_KEY.encode("utf-8")
        expected = hmac.new(secret, encoded_body.encode("utf-8"), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected):
            return {}
        payload = json.loads(_b64decode(encoded_body).decode("utf-8"))
        if int(payload.get("exp", 0)) < int(time.time()):
            return {}
        return payload


def validate_upload(file_obj):
    if not file_obj:
        return False, "上传文件不存在"
    if file_obj.size > UPLOAD_MAX_SIZE:
        return False, "文件大小不能超过{}MB".format(UPLOAD_MAX_SIZE // 1024 // 1024)
    suffix = Path(file_obj.name).suffix.lower()
    if suffix not in UPLOAD_ALLOWED_EXTENSIONS:
        return False, "不支持的文件类型"
    return True, ""


def safe_upload_name(original_name, prefix=None):
    suffix = Path(original_name).suffix.lower()
    raw_prefix = "".join(ch for ch in str(prefix or "") if ch.isalnum() or ch in ("_", "-"))
    if raw_prefix:
        return "{}{}".format(raw_prefix, suffix)
    return "{}{}".format(int(time.time() * 1000), suffix)


def safe_join(base_dir, filename):
    base = Path(base_dir).resolve()
    target = (base / Path(filename).name).resolve()
    if base not in target.parents and target != base:
        raise ValueError("非法文件路径")
    return str(target)


def migrate_plaintext_passwords(model_class, password_field="mima"):
    """一次性迁移：将数据库中明文密码全部哈希化。
    调用方式：
        from util.security import migrate_plaintext_passwords
        from main.models import Yonghu
        migrate_plaintext_passwords(Yonghu, 'mima')
    """
    from util.security import is_encoded_password, hash_password
    count = 0
    for record in model_class.objects.all():
        pwd = getattr(record, password_field, "")
        if pwd and not is_encoded_password(pwd):
            setattr(record, password_field, hash_password(pwd))
            record.save(update_fields=[password_field])
            count += 1
    return count


def revoke_token(token):
    """将 token 加入黑名单（用于注销）"""
    if not token or token == "null":
        return
    token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
    try:
        payload = parse_token(token)
        exp = int(payload.get("exp", time.time() + TOKEN_TTL_SECONDS))
        expires_at = datetime.datetime.fromtimestamp(exp)
    except Exception:
        expires_at = datetime.datetime.now() + datetime.timedelta(seconds=TOKEN_TTL_SECONDS)
    from main.models import TokenBlacklist
    TokenBlacklist.objects.get_or_create(
        token_hash=token_hash,
        defaults={"expires_at": expires_at},
    )


def is_token_revoked(token):
    """检查 token 是否已被撤销（在黑名单中）"""
    if not token or token == "null":
        return False
    token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
    from main.models import TokenBlacklist
    return TokenBlacklist.objects.filter(token_hash=token_hash).exists()


def cleanup_expired_tokens():
    """清理已过期的黑名单记录"""
    from main.models import TokenBlacklist
    count, _ = TokenBlacklist.objects.filter(
        expires_at__lt=datetime.datetime.now()
    ).delete()
    return count


def get_http_status(business_code):
    """将业务码映射为 HTTP 状态码"""
    if business_code == 0:
        return 200
    if business_code in (400, 10001, 10002, 10003, 10020, 10021, 10023, 10024,
                         10025, 10026, 10027, 10028, 10029):
        return 400
    if business_code in (401, 20001, 20002):
        return 401
    if business_code == 403:
        return 403
    if business_code in (500, 40001, 40002, 40003):
        return 500
    return 200


def json_response(data):
    """返回携带正确 HTTP 状态码的 JsonResponse"""
    from django.http import JsonResponse
    code = data.get("code", 0) if isinstance(data, dict) else 0
    return JsonResponse(data, status=get_http_status(code))
