# coding:utf-8
"""统一的 LLM 客户端封装（OpenAI 兼容接口，默认智谱 GLM-4-Flash 免费模型）。

设计目标：
1. 单一入口，供 ai_risk / ai_report 复用，避免各处散落 requests 调用；
2. 配置读取优先级：config 表(键名 llm) > 环境变量 > 内置默认；
3. 固定短超时，失败一律抛 LlmError，由上层做关键词/模板降级；
4. 默认使用智谱 GLM-4-Flash（永久免费，OpenAI 兼容），切换 DeepSeek/通义
   只需改 config 表里的 base_url / api_key / model 三个值。

注意：本模块不依赖任何第三方 SDK，仅用标准库 urllib，避免污染依赖。
"""
import json
import os
import re
import urllib.request
import urllib.error

# 默认配置：智谱 GLM-4-Flash（永久免费模型，OpenAI 兼容接口）
DEFAULT_BASE_URL = "https://open.bigmodel.cn/api/paas/v4"
DEFAULT_MODEL = "glm-4-flash"
DEFAULT_API_KEY = ""  # 留空；未配置时上层会直接降级

# LLM 调用硬超时（秒）。心理场景对延迟敏感，宁可降级也不卡住用户提交。
REQUEST_TIMEOUT = 10


class LlmError(Exception):
    """LLM 调用失败的统一异常，上层据此降级。"""


def _read_db_config():
    """从 config 表读取名为 llm 的 JSON 配置。仅在 Django 已初始化时可用。"""
    try:
        from main.config_model import config
        row = config.objects.filter(name="llm").first()
        if row and row.value:
            data = json.loads(row.value)
            if isinstance(data, dict):
                return data
    except Exception:
        pass
    return {}


def load_config():
    """合并配置：config 表优先于环境变量。"""
    cfg = _read_db_config()
    merged = {
        "base_url": cfg.get("base_url") or os.environ.get("LLM_BASE_URL") or DEFAULT_BASE_URL,
        "api_key": cfg.get("api_key") or os.environ.get("LLM_API_KEY") or DEFAULT_API_KEY,
        "model": cfg.get("model") or os.environ.get("LLM_MODEL") or DEFAULT_MODEL,
    }
    return merged


def _post_json(url, headers, payload):
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as resp:
            body = resp.read().decode("utf-8")
            return json.loads(body)
    except urllib.error.HTTPError as exc:
        detail = ""
        try:
            detail = exc.read().decode("utf-8")[:300]
        except Exception:
            pass
        raise LlmError("HTTP {} {}".format(exc.code, detail))
    except Exception as exc:
        raise LlmError(str(exc))


def _extract_json(text):
    """宽容地从模型输出中提取 JSON 对象。

    免费模型不一定严格只输出 JSON，这里做多层容错：
    1. 直接解析；2. 剥离 ```json 围栏；3. 截取首尾大括号之间的内容。
    """
    text = (text or "").strip()
    if not text:
        return None

    candidates = [text]
    # 剥离代码围栏
    if text.startswith("```"):
        stripped = text.strip("`")
        if stripped.lower().startswith("json"):
            stripped = stripped[4:].strip()
        candidates.append(stripped)
    # 截取第一个 { 到最后一个 }
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        candidates.append(text[start:end + 1])

    for candidate in candidates:
        try:
            parsed = json.loads(candidate)
            if isinstance(parsed, dict):
                return parsed
        except Exception:
            continue
    return None


def chat_json(system_prompt, user_prompt, temperature=0.2):
    """调用 LLM，要求返回 JSON 对象；失败抛 LlmError。

    返回：解析后的 dict。若模型未返回可解析的 JSON，抛 LlmError。
    """
    cfg = load_config()
    if not cfg.get("api_key"):
        raise LlmError("LLM_API_KEY 未配置")

    url = cfg["base_url"].rstrip("/") + "/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(cfg["api_key"]),
    }
    payload = {
        "model": cfg["model"],
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": temperature,
        "stream": False,
    }

    result = _post_json(url, headers, payload)
    try:
        content = result["choices"][0]["message"]["content"]
    except Exception:
        raise LlmError("LLM 返回结构异常")

    parsed = _extract_json(content)
    if parsed is None:
        raise LlmError("LLM 未返回合法 JSON")
    return parsed


def chat_text(system_prompt, messages, temperature=0.7):
    """多轮对话，返回纯文本；失败抛 LlmError。

    messages: [{"role": "user"|"assistant", "content": "..."}, ...]
    用于 AI 倾诉/情绪对话等需要自由文本回复的场景（无需 JSON）。
    """
    cfg = load_config()
    if not cfg.get("api_key"):
        raise LlmError("LLM_API_KEY 未配置")

    url = cfg["base_url"].rstrip("/") + "/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(cfg["api_key"]),
    }
    history = [{"role": m.get("role"), "content": m.get("content") or ""} for m in (messages or [])]
    payload = {
        "model": cfg["model"],
        "messages": [{"role": "system", "content": system_prompt}] + history,
        "temperature": temperature,
        "stream": False,
    }

    result = _post_json(url, headers, payload)
    try:
        content = result["choices"][0]["message"]["content"]
    except Exception:
        raise LlmError("LLM 返回结构异常")

    text = (content or "").strip()
    if not text:
        raise LlmError("LLM 返回为空")
    return text
