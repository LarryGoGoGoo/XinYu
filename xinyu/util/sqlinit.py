# coding:utf-8
from configparser import ConfigParser
import logging, sys, os
import pymysql

from util.configread import config_read


class Create(object):
    def __init__(self, dbtype, host, port, user, passwd, dbName, charset):
        self.dbtype, self.host, self.port, self.user, self.passwd, self.dbName, self.charset = dbtype, host, port, user, passwd, dbName, charset
        self.conn = pymysql.connect(host=self.host, user=self.user, passwd=self.passwd, port=self.port,
                                    charset=self.charset)
        self.cur = self.conn.cursor()

    def create_db(self, sql):
        self.cur.execute(sql)
        self.conn.commit()

    def create_tables(self, sqls):
        """逐条执行 SQL 语句（用于手工拆分后的语句列表）。
        保留错误并全部执行完后统一报告，避免静默失败。"""
        use_sql = '''use `{}`;'''.format(self.dbName)
        self.cur.execute(use_sql)

        errors = []
        for i, sql in enumerate(sqls):
            if not sql or not sql.strip():
                continue
            try:
                self.cur.execute(sql)
                self.conn.commit()
            except Exception as e:
                errors.append((i, str(e)))
        if errors:
            print("!!! 导入完成，但 {} 条语句失败：".format(len(errors)))
            for i, e in errors[:20]:
                print("  语句#{} -> {}".format(i, e))
            return False
        return True

    def exec_file(self, file_path):
        """执行完整 SQL 文件（mysqldump 产物，已含 DROP/CREATE/INSERT 与 SET 语句）。
        逐条按 ';\\n' 拆分执行，保留文件开头的 SET FOREIGN_KEY_CHECKS=0 等语句。"""
        use_sql = '''use `{}`;'''.format(self.dbName)
        self.cur.execute(use_sql)

        with open(file_path, encoding="utf8") as f:
            content = f.read()
        # 统一换行符，兼容 Windows 导出的 CRLF
        content = content.replace('\r\n', '\n').replace('\r', '\n')

        sqls = content.split(';\n')
        errors = []
        executed = 0
        for i, sql in enumerate(sqls):
            sql = sql.strip()
            if not sql:
                continue
            try:
                self.cur.execute(sql)
                self.conn.commit()
                executed += 1
            except Exception as e:
                errors.append((i, str(e)))
        print("共执行 {} 条语句".format(executed))
        if errors:
            print("!!! 导入完成，但 {} 条语句失败：".format(len(errors)))
            for i, e in errors[:20]:
                print("  语句#{} -> {}".format(i, e))
            return False
        return True

    def conn_close(self):
        self.cur.close()
        self.conn.close()
