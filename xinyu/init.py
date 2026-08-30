# coding:utf-8
import click,py_compile,os,sys
from configparser import ConfigParser
from util.configread import config_read
from util.sqlinit import Create
@click.group()
def sub():
    pass


@click.command()
def initdb(ini="config.ini"):
    dbtype, host, port, user, passwd, dbName, charset = config_read(ini)
    if dbtype == 'mysql':
        cm = Create(dbtype, host, port, user, passwd, dbName, charset)
        cm.create_db("CREATE DATABASE IF NOT EXISTS  `{}`  /*!40100 DEFAULT CHARACTER SET utf8 */ ;".format(dbName))

        cm.conn_close()
    elif dbtype == 'mssql':
        cm = Create(dbtype, host, port, user, passwd, dbName, charset)
        cm.create_db("CREATE DATABASE IF NOT EXISTS  `{}` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;".format(dbName))

        cm.conn_close()
    else:
        print('请修改当前面目录下的config.ini文件')

@click.command()
def initsql(ini="config.ini"):
    dbtype, host, port, user, passwd, dbName, charset = config_read(ini)
    if dbtype == 'mysql':
        cm = Create(dbtype, host, port, user, passwd, dbName, charset)
        cm.create_db("CREATE DATABASE IF NOT EXISTS  `{}`  /*!40100 DEFAULT CHARACTER SET utf8 */ ;".format(dbName))
        # 直接执行完整 dump 文件（内含 DROP TABLE IF EXISTS + SET FOREIGN_KEY_CHECKS=0 + CREATE + INSERT）
        ok = cm.exec_file("./db/xinyu.sql")
        cm.conn_close()
        if not ok:
            print("!!! 数据导入有失败语句，请检查上方错误信息")
            sys.exit(1)
    elif dbtype == 'mssql':
        cm = Create(dbtype, host, port, user, passwd, dbName, charset)
        cm.create_db("CREATE DATABASE IF NOT EXISTS  `{}` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;".format(dbName))
        ok = cm.exec_file("./db/mssql.sql")
        cm.conn_close()
        if not ok:
            print("!!! 数据导入有失败语句，请检查上方错误信息")
            sys.exit(1)
    else:
        print('请修改当前面目录下的config.ini文件')

sub.add_command(initdb,"initdb")
sub.add_command(initsql,"initsql")
if __name__ == "__main__":
    sub()
