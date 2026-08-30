#!/usr/bin/env python
import os
import sys
import threading
import webbrowser


ADMIN_URL = "http://localhost:8080/admin/dist/index.html"


def is_runserver_command():
    return len(sys.argv) > 1 and sys.argv[1] == "runserver"


def should_open_browser():
    if os.environ.get("OPEN_ADMIN_BROWSER", "").lower() not in ("1", "true", "yes"):
        return False

    if not is_runserver_command():
        return False

    # With Django's autoreloader, manage.py runs twice: the watcher process and
    # the actual server process. Open the browser only in the server process.
    if "--noreload" in sys.argv:
        return True
    return os.environ.get("RUN_MAIN") == "true"


def open_browser():
    threading.Timer(1, webbrowser.open, args=[ADMIN_URL]).start()


if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dj2.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    if should_open_browser():
        open_browser()

    execute_from_command_line(sys.argv)
