#coding:utf-8
from django.db import models

from .model import BaseModel

from datetime import datetime



class yonghu(BaseModel):
    __doc__ = u'''yonghu'''
    __tablename__ = 'yonghu'

    __loginUser__='shouji'


    __authTables__={}
    __authPeople__='是'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __loginUserColumn__='shouji'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段（手机号登录）
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    yonghuzhanghao=models.CharField ( max_length=255,null=False,unique=True, verbose_name='用户账号' )
    mima=models.CharField ( max_length=255,null=False, unique=False, verbose_name='密码' )
    yonghuxingming=models.CharField ( max_length=255,null=False, unique=False, verbose_name='用户姓名' )
    xingbie=models.CharField ( max_length=255, null=True, unique=False, verbose_name='性别' )
    touxiang=models.TextField   (  null=True, unique=False, verbose_name='头像' )
    shouji=models.CharField ( max_length=255, null=True, unique=True, verbose_name='手机' )
    '''
    yonghuzhanghao=VARCHAR
    mima=VARCHAR
    yonghuxingming=VARCHAR
    xingbie=VARCHAR
    touxiang=Text
    shouji=VARCHAR
    '''
    class Meta:
        db_table = 'yonghu'
        verbose_name = verbose_name_plural = '用户'
class xinliyisheng(BaseModel):
    __doc__ = u'''xinliyisheng'''
    __tablename__ = 'xinliyisheng'

    __loginUser__='yishenggonghao'


    __authTables__={}
    __authPeople__='是'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __loginUserColumn__='yishenggonghao'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='是'#开启医生注册审核：注册/新增默认待审核，管理员审核通过(sfsh=是)后才能登录
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='是'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    yishenggonghao=models.CharField ( max_length=255,null=False,unique=True, verbose_name='医生工号' )
    mima=models.CharField ( max_length=255,null=False, unique=False, verbose_name='密码' )
    yishengxingming=models.CharField ( max_length=255,null=False, unique=False, verbose_name='医生姓名' )
    xingbie=models.CharField ( max_length=255, null=True, unique=False, verbose_name='性别' )
    touxiang=models.TextField   (  null=True, unique=False, verbose_name='头像' )
    dianhuahaoma=models.CharField ( max_length=255, null=True, unique=False, verbose_name='电话号码' )
    yishengjianjie=models.TextField   (  null=True, unique=False, verbose_name='医生简介' )
    storeupnum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='收藏数' )
    sfsh=models.CharField ( max_length=255, null=True, unique=False,default='待审核', verbose_name='是否审核' )
    shhf=models.TextField   (  null=True, unique=False, verbose_name='审核回复' )
    '''
    yishenggonghao=VARCHAR
    mima=VARCHAR
    yishengxingming=VARCHAR
    xingbie=VARCHAR
    touxiang=Text
    dianhuahaoma=VARCHAR
    yishengjianjie=Text
    storeupnum=Integer
    sfsh=VARCHAR
    shhf=Text
    '''
    class Meta:
        db_table = 'xinliyisheng'
        verbose_name = verbose_name_plural = '心理医生'
class xinqingriji(BaseModel):
    __doc__ = u'''xinqingriji'''
    __tablename__ = 'xinqingriji'



    __authTables__={'yonghuzhanghao':'yonghu',}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='是'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='是'#前台列表权限foreEndListAuth[是/否]；心情日记包含隐私，普通用户仅能查看自己的记录
    __foreEndList__='前要登'#心情日记包含隐私，前台访问必须登录
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    rijibiaoti=models.CharField ( max_length=255, null=True, unique=False, verbose_name='日记标题' )
    rijineirong=models.TextField   (  null=True, unique=False, verbose_name='日记内容' )
    rijitupian=models.TextField   (  null=True, unique=False, verbose_name='日记图片' )
    fabushijian=models.DateTimeField  (  null=True, unique=False, verbose_name='发布时间' )
    yonghuzhanghao=models.CharField ( max_length=255, null=True, unique=False, verbose_name='用户账号' )
    yonghuxingming=models.CharField ( max_length=255, null=True, unique=False, verbose_name='用户姓名' )
    thumbsupnum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='赞' )
    crazilynum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='踩' )
    discussnum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='评论数' )
    storeupnum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='收藏数' )
    '''
    rijibiaoti=VARCHAR
    rijineirong=Text
    rijitupian=Text
    fabushijian=DateTime
    yonghuzhanghao=VARCHAR
    yonghuxingming=VARCHAR
    thumbsupnum=Integer
    crazilynum=Integer
    discussnum=Integer
    storeupnum=Integer
    '''
    class Meta:
        db_table = 'xinqingriji'
        verbose_name = verbose_name_plural = '心情日记'
class yuyuezixun(BaseModel):
    __doc__ = u'''yuyuezixun'''
    __tablename__ = 'yuyuezixun'



    __authTables__={'yishenggonghao':'xinliyisheng','yonghuzhanghao':'yonghu',}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='是'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='是'#前台列表权限foreEndListAuth[是/否]；当前台访问预约咨询时只能查看自己的记录
    __foreEndList__='前要登'#预约咨询包含用户隐私，前台访问必须登录
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    yishenggonghao=models.CharField ( max_length=255, null=True, unique=False, verbose_name='医生工号' )
    yishengxingming=models.CharField ( max_length=255, null=True, unique=False, verbose_name='医生姓名' )
    zixunmingcheng=models.CharField ( max_length=255, null=True, unique=False, verbose_name='咨询名称' )
    zixunleixing=models.CharField ( max_length=255, null=True, unique=False, verbose_name='咨询类型' )
    zixunfengmian=models.TextField   (  null=True, unique=False, verbose_name='咨询封面' )
    zixundizhi=models.CharField ( max_length=255, null=True, unique=False, verbose_name='咨询地址' )
    yuyueshiduan=models.CharField ( max_length=255, null=True, unique=False, verbose_name='预约时段' )
    yonghuzhanghao=models.CharField ( max_length=255, null=True, unique=False, verbose_name='用户账号' )
    yonghuxingming=models.CharField ( max_length=255, null=True, unique=False, verbose_name='用户姓名' )
    yuyueshijian=models.DateField   (  null=True, unique=False, verbose_name='预约时间' )
    sfsh=models.CharField ( max_length=255, null=True, unique=False,default='待审核', verbose_name='是否审核' )
    shhf=models.TextField   (  null=True, unique=False, verbose_name='审核回复' )
    '''
    yishenggonghao=VARCHAR
    yishengxingming=VARCHAR
    zixunmingcheng=VARCHAR
    zixunleixing=VARCHAR
    zixunfengmian=Text
    zixundizhi=VARCHAR
    yuyueshiduan=VARCHAR
    yonghuzhanghao=VARCHAR
    yonghuxingming=VARCHAR
    yuyueshijian=Date
    sfsh=VARCHAR
    shhf=Text
    '''
    class Meta:
        db_table = 'yuyuezixun'
        verbose_name = verbose_name_plural = '预约咨询'
class yuyueshiduan(BaseModel):
    __doc__ = u'''yuyueshiduan'''
    __tablename__ = 'yuyueshiduan'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    yuyueshiduan=models.CharField ( max_length=255,null=False,unique=True, verbose_name='预约时段' )
    '''
    yuyueshiduan=VARCHAR
    '''
    class Meta:
        db_table = 'yuyueshiduan'
        verbose_name = verbose_name_plural = '预约时段'
class jiankangyujing(BaseModel):
    __doc__ = u'''jiankangyujing'''
    __tablename__ = 'jiankangyujing'



    __authTables__={'yonghuzhanghao':'yonghu',}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='是'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    yonghuzhanghao=models.CharField ( max_length=255, null=True, unique=False, verbose_name='用户账号' )
    yonghuxingming=models.CharField ( max_length=255, null=True, unique=False, verbose_name='用户姓名' )
    yujingtixing=models.CharField ( max_length=255, null=True, unique=False, verbose_name='预警提醒' )
    xinlijianyi=models.CharField ( max_length=255, null=True, unique=False, verbose_name='心理建议' )
    yujingshijian=models.DateTimeField  (  null=True, unique=False, verbose_name='预警时间' )
    chulizhuangtai=models.CharField ( max_length=32, null=True, unique=False,default='未处理', verbose_name='处理状态' )
    chuliyijian=models.TextField   (  null=True, unique=False, verbose_name='处理意见' )
    fuzeyishenggonghao=models.CharField ( max_length=255, null=True, unique=False, verbose_name='负责医生工号' )
    fuzeyishengxingming=models.CharField ( max_length=255, null=True, unique=False, verbose_name='负责医生姓名' )
    '''
    yonghuzhanghao=VARCHAR
    yonghuxingming=VARCHAR
    yujingtixing=VARCHAR
    xinlijianyi=VARCHAR
    yujingshijian=DateTime
    chulizhuangtai=VARCHAR
    chuliyijian=Text
    fuzeyishenggonghao=VARCHAR
    fuzeyishengxingming=VARCHAR
    '''
    class Meta:
        db_table = 'jiankangyujing'
        verbose_name = verbose_name_plural = '健康预警'
class xinlizhishi(BaseModel):
    __doc__ = u'''xinlizhishi'''
    __tablename__ = 'xinlizhishi'



    __authTables__={'yishenggonghao':'xinliyisheng',}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='是'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='是'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='是'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='是'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    wenzhangbiaoti=models.CharField ( max_length=255, null=True, unique=False, verbose_name='文章标题' )
    fengmiantupian=models.TextField   (  null=True, unique=False, verbose_name='封面图片' )
    zhishifenlei=models.CharField ( max_length=255, null=True, unique=False, verbose_name='知识分类' )
    xinliwenzhang=models.CharField ( max_length=255, null=True, unique=False, verbose_name='心理文章' )
    zhishishipin=models.TextField   (  null=True, unique=False, verbose_name='知识视频' )
    zhishixiangqing=models.TextField   (  null=True, unique=False, verbose_name='知识详情' )
    yishenggonghao=models.CharField ( max_length=255, null=True, unique=False, verbose_name='医生工号' )
    yishengxingming=models.CharField ( max_length=255, null=True, unique=False, verbose_name='医生姓名' )
    fabushijian=models.DateTimeField  (  null=True, unique=False, verbose_name='发布时间' )
    thumbsupnum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='赞' )
    crazilynum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='踩' )
    clicktime=models.DateTimeField  (auto_now=True,  null=True, unique=False, verbose_name='最近点击时间' )
    clicknum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='点击次数' )
    discussnum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='评论数' )
    storeupnum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='收藏数' )
    '''
    wenzhangbiaoti=VARCHAR
    fengmiantupian=Text
    zhishifenlei=VARCHAR
    xinliwenzhang=VARCHAR
    zhishishipin=Text
    zhishixiangqing=Text
    yishenggonghao=VARCHAR
    yishengxingming=VARCHAR
    fabushijian=DateTime
    thumbsupnum=Integer
    crazilynum=Integer
    clicktime=DateTime
    clicknum=Integer
    discussnum=Integer
    storeupnum=Integer
    '''
    class Meta:
        db_table = 'xinlizhishi'
        verbose_name = verbose_name_plural = '心理知识'
class zhishifenlei(BaseModel):
    __doc__ = u'''zhishifenlei'''
    __tablename__ = 'zhishifenlei'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    zhishifenlei=models.CharField ( max_length=255,null=False,unique=True, verbose_name='知识分类' )
    '''
    zhishifenlei=VARCHAR
    '''
    class Meta:
        db_table = 'zhishifenlei'
        verbose_name = verbose_name_plural = '知识分类'
class news(BaseModel):
    __doc__ = u'''news'''
    __tablename__ = 'news'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='是'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    title=models.CharField ( max_length=255,null=False, unique=False, verbose_name='标题' )
    introduction=models.TextField   (  null=True, unique=False, verbose_name='简介' )
    picture=models.TextField   ( null=False, unique=False, verbose_name='图片' )
    content=models.TextField   ( null=False, unique=False, verbose_name='内容' )
    name=models.CharField ( max_length=255, null=True, unique=False, verbose_name='发布人' )
    headportrait=models.TextField   (  null=True, unique=False, verbose_name='头像' )
    '''
    title=VARCHAR
    introduction=Text
    picture=Text
    content=Text
    name=VARCHAR
    headportrait=Text
    '''
    class Meta:
        db_table = 'news'
        verbose_name = verbose_name_plural = '心灵资讯'
class exampaper(BaseModel):
    __doc__ = u'''exampaper'''
    __tablename__ = 'exampaper'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    name=models.CharField ( max_length=255,null=False, unique=False, verbose_name='试卷名称' )
    time=models.IntegerField  ( null=False, unique=False, verbose_name='考试时长(分钟)' )
    status=models.CharField ( max_length=255, null=True, unique=False,default='启用', verbose_name='试卷状态' )
    examnum=models.IntegerField  (  null=True, unique=False,default='1', verbose_name='限考次数' )
    '''
    name=VARCHAR
    time=Integer
    status=VARCHAR
    examnum=Integer
    '''
    class Meta:
        db_table = 'exampaper'
        verbose_name = verbose_name_plural = '心理测试'
class examquestion(BaseModel):
    __doc__ = u'''examquestion'''
    __tablename__ = 'examquestion'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    paperid=models.BigIntegerField  ( null=False, unique=False, verbose_name='试卷id' )
    papername=models.CharField ( max_length=255,null=False, unique=False, verbose_name='试卷名称' )
    questionname=models.CharField ( max_length=255,null=False, unique=False, verbose_name='试题名称' )
    options=models.TextField   (  null=True, unique=False, verbose_name='选项，json字符串' )
    score=models.BigIntegerField  (  null=True, unique=False,default='0', verbose_name='分值' )
    answer=models.CharField ( max_length=255, null=True, unique=False, verbose_name='正确答案' )
    analysis=models.TextField   (  null=True, unique=False, verbose_name='答案解析' )
    type=models.BigIntegerField  (  null=True, unique=False, verbose_name='试题类型，0：单选题 1：多选题 2：判断题 3：填空题（暂不考虑多项填空）4:主观题' )
    sequence=models.BigIntegerField  (  null=True, unique=False, verbose_name='试题排序，值越大排越前面' )
    '''
    paperid=BigInteger
    papername=VARCHAR
    questionname=VARCHAR
    options=Text
    score=BigInteger
    answer=VARCHAR
    analysis=Text
    type=BigInteger
    sequence=BigInteger
    '''
    class Meta:
        db_table = 'examquestion'
        verbose_name = verbose_name_plural = '心理测试试题'
class examrecord(BaseModel):
    __doc__ = u'''examrecord'''
    __tablename__ = 'examrecord'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='是'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='是'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否'#表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    username=models.CharField ( max_length=255,null=False, unique=False, verbose_name='用户名' )
    paperid=models.BigIntegerField  ( null=False, unique=False, verbose_name='试卷id' )
    papername=models.CharField ( max_length=255,null=False, unique=False, verbose_name='试卷名称' )
    questionid=models.BigIntegerField  ( null=False, unique=False, verbose_name='试题id' )
    questionname=models.CharField ( max_length=255,null=False, unique=False, verbose_name='试题名称' )
    type=models.BigIntegerField  (  null=True, unique=False, verbose_name='试题类型' )
    ismark=models.BigIntegerField  (  null=True, unique=False, verbose_name='是否批卷' )
    options=models.TextField   (  null=True, unique=False, verbose_name='选项，json字符串' )
    score=models.BigIntegerField  (  null=True, unique=False,default='0', verbose_name='分值' )
    answer=models.CharField ( max_length=255, null=True, unique=False, verbose_name='正确答案' )
    analysis=models.TextField   (  null=True, unique=False, verbose_name='答案解析' )
    myscore=models.BigIntegerField  (  null=True, unique=False,default='0', verbose_name='试题得分' )
    myanswer=models.CharField ( max_length=255, null=True, unique=False, verbose_name='考生答案' )
    examno=models.CharField ( max_length=255, null=True, unique=False, verbose_name='考试编号' )
    userid=models.BigIntegerField  (  null=True, unique=False, verbose_name='用户id' )
    '''
    username=VARCHAR
    paperid=BigInteger
    papername=VARCHAR
    questionid=BigInteger
    questionname=VARCHAR
    type=BigInteger
    ismark=BigInteger
    options=Text
    score=BigInteger
    answer=VARCHAR
    analysis=Text
    myscore=BigInteger
    myanswer=VARCHAR
    examno=VARCHAR
    userid=BigInteger
    '''
    class Meta:
        db_table = 'examrecord'
        verbose_name = verbose_name_plural = '心理记录'
class popupremind(BaseModel):
    __doc__ = u'''popupremind'''
    __tablename__ = 'popupremind'



    __authTables__={}
    __authSeparate__='是'#后台列表权限
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    userid=models.BigIntegerField  ( null=False, unique=False, verbose_name='发布人id' )
    role=models.CharField ( max_length=255,null=False, unique=False, verbose_name='账号' )
    title=models.CharField ( max_length=255,null=False, unique=False, verbose_name='标题' )
    type=models.CharField ( max_length=255, null=True, unique=False,default='个人', verbose_name='未读/已读' )
    brief=models.TextField   (  null=True, unique=False, verbose_name='简介' )
    content=models.TextField   ( null=False, unique=False, verbose_name='内容' )
    remindtime=models.DateTimeField  (  null=True, unique=False, verbose_name='提醒时间' )
    '''
    userid=BigInteger
    role=VARCHAR
    title=VARCHAR
    type=VARCHAR
    brief=Text
    content=Text
    remindtime=DateTime
    '''
    class Meta:
        db_table = 'popupremind'
        verbose_name = verbose_name_plural = '弹窗提醒'
class storeup(BaseModel):
    __doc__ = u'''storeup'''
    __tablename__ = 'storeup'



    __authTables__={}
    __authSeparate__='是'#后台列表权限
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    userid=models.BigIntegerField  ( null=False, unique=False, verbose_name='用户id' )
    refid=models.BigIntegerField  (  null=True, unique=False, verbose_name='商品id' )
    tablename=models.CharField ( max_length=255, null=True, unique=False, verbose_name='表名' )
    name=models.CharField ( max_length=255,null=False, unique=False, verbose_name='名称' )
    picture=models.TextField   (  null=True, unique=False, verbose_name='图片' )
    type=models.CharField ( max_length=255, null=True, unique=False,default='1', verbose_name='类型' )
    inteltype=models.CharField ( max_length=255, null=True, unique=False, verbose_name='推荐类型' )
    remark=models.CharField ( max_length=255, null=True, unique=False, verbose_name='备注' )
    '''
    userid=BigInteger
    refid=BigInteger
    tablename=VARCHAR
    name=VARCHAR
    picture=Text
    type=VARCHAR
    inteltype=VARCHAR
    remark=VARCHAR
    '''
    class Meta:
        db_table = 'storeup'
        verbose_name = verbose_name_plural = '收藏表'
class users(BaseModel):
    __doc__ = u'''users'''
    __tablename__ = 'users'



    __authTables__={}
    __authPeople__ = '是'
    __isAdmin__ = '是'
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    username=models.CharField ( max_length=255,null=False, unique=False, verbose_name='用户名' )
    password=models.CharField ( max_length=255,null=False, unique=False, verbose_name='密码' )
    role=models.CharField ( max_length=255, null=True, unique=False,default='管理员', verbose_name='角色' )
    image=models.TextField   (  null=True, unique=False, verbose_name='头像' )
    '''
    username=VARCHAR
    password=VARCHAR
    role=VARCHAR
    image=Text
    '''
    class Meta:
        db_table = 'users'
        verbose_name = verbose_name_plural = '管理员'
class discussxinqingriji(BaseModel):
    __doc__ = u'''discussxinqingriji'''
    __tablename__ = 'discussxinqingriji'



    __authTables__={}
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    refid=models.BigIntegerField  ( null=False, unique=False, verbose_name='关联表id' )
    userid=models.BigIntegerField  ( null=False, unique=False, verbose_name='用户id' )
    avatarurl=models.TextField   (  null=True, unique=False, verbose_name='头像' )
    nickname=models.CharField ( max_length=255, null=True, unique=False, verbose_name='用户名' )
    content=models.TextField   ( null=False, unique=False, verbose_name='评论内容' )
    reply=models.TextField   (  null=True, unique=False, verbose_name='回复内容' )
    thumbsupnum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='赞' )
    crazilynum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='踩' )
    istop=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='置顶' )
    tuserids=models.TextField   (  null=True, unique=False, verbose_name='赞用户ids' )
    cuserids=models.TextField   (  null=True, unique=False, verbose_name='踩用户ids' )
    '''
    refid=BigInteger
    userid=BigInteger
    avatarurl=Text
    nickname=VARCHAR
    content=Text
    reply=Text
    thumbsupnum=Integer
    crazilynum=Integer
    istop=Integer
    tuserids=Text
    cuserids=Text
    '''
    class Meta:
        db_table = 'discussxinqingriji'
        verbose_name = verbose_name_plural = '心情日记评论'
class talksession(BaseModel):
    __doc__ = u'''talksession'''
    __tablename__ = 'talksession'



    __authTables__={}
    __authSeparate__='是'#后台列表权限
    __foreEndListAuth__='是'#前台列表权限：倾诉会话仅本人可见
    __foreEndList__='前要登'#倾诉会话包含隐私，前台访问必须登录
    __isAdmin__='否'
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    userid=models.BigIntegerField  ( null=False, unique=False, verbose_name='用户id' )
    title=models.CharField ( max_length=255, null=True, unique=False, verbose_name='会话标题' )
    risklevel=models.CharField ( max_length=32, null=True, unique=False,default='无', verbose_name='风险等级' )
    '''
    userid=BigInteger
    title=VARCHAR
    risklevel=VARCHAR
    '''
    class Meta:
        db_table = 'talksession'
        verbose_name = verbose_name_plural = '倾诉会话'

class talkmessage(BaseModel):
    __doc__ = u'''talkmessage'''
    __tablename__ = 'talkmessage'



    __authTables__={}
    __authSeparate__='是'#后台列表权限
    __foreEndListAuth__='是'#前台列表权限：倾诉消息仅本人可见
    __foreEndList__='前要登'#倾诉消息包含隐私，前台访问必须登录
    __isAdmin__='否'
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    sessionid=models.BigIntegerField  ( null=False, unique=False, verbose_name='会话id' )
    userid=models.BigIntegerField  ( null=False, unique=False, verbose_name='用户id' )
    role=models.CharField ( max_length=16, null=True, unique=False,default='user', verbose_name='角色' )
    content=models.TextField   ( null=False, unique=False, verbose_name='内容' )
    riskflag=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='风险标记' )
    '''
    sessionid=BigInteger
    userid=BigInteger
    role=VARCHAR
    content=Text
    riskflag=Integer
    '''
    class Meta:
        db_table = 'talkmessage'
        verbose_name = verbose_name_plural = '倾诉消息'

class doctoradvice(BaseModel):
    __doc__ = u'''doctoradvice'''
    __tablename__ = 'doctoradvice'



    __authTables__={}
    __authSeparate__='是'#后台列表权限
    __foreEndListAuth__='是'#前台列表权限：医生助手记录仅本人可见
    __foreEndList__='前要登'#医生助手记录包含隐私，前台访问必须登录
    __isAdmin__='否'
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    userid=models.BigIntegerField  ( null=False, unique=False, verbose_name='用户id' )
    symptoms=models.TextField   ( null=False, unique=False, verbose_name='症状描述' )
    tendency=models.CharField ( max_length=255, null=True, unique=False, verbose_name='可能倾向' )
    department=models.CharField ( max_length=255, null=True, unique=False, verbose_name='建议科室' )
    action=models.TextField   (  null=True, unique=False, verbose_name='建议行动' )
    source=models.CharField ( max_length=16, null=True, unique=False,default='llm', verbose_name='来源' )
    '''
    userid=BigInteger
    symptoms=Text
    tendency=VARCHAR
    department=VARCHAR
    action=Text
    source=VARCHAR
    '''
    class Meta:
        db_table = 'doctoradvice'
        verbose_name = verbose_name_plural = '医生助手建议'

class TokenBlacklist(models.Model):
    """Token 黑名单，用于记录已注销/失效的 token"""
    __tablename__ = 'token_blacklist'
    token_hash = models.CharField(max_length=64, unique=True, db_index=True, verbose_name='Token哈希')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='加入时间')
    expires_at = models.DateTimeField(verbose_name='原始过期时间')

    class Meta:
        db_table = 'token_blacklist'
        verbose_name = verbose_name_plural = 'Token黑名单'

class xinyuai_chat(BaseModel):
    """心语AI 聊天记录表"""
    __doc__ = u'''xinyuai_chat'''
    __tablename__ = 'xinyuai_chat'


    __authTables__={}
    __authSeparate__='是'#后台列表权限
    __foreEndListAuth__='是'#前台列表权限：聊天记录仅本人可见
    __foreEndList__='前要登'#聊天记录包含隐私，前台访问必须登录
    __isAdmin__='否'
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    yonghuzhanghao=models.CharField ( max_length=50, null=True, unique=False, verbose_name='用户账号' )
    role=models.CharField ( max_length=20, null=True, unique=False,default='user', verbose_name='角色' )
    content=models.TextField   ( null=True, unique=False, verbose_name='内容' )
    risk_level=models.CharField ( max_length=20, null=True, unique=False,default='normal', verbose_name='风险等级' )
    '''
    yonghuzhanghao=VARCHAR
    role=VARCHAR
    content=Text
    risk_level=VARCHAR
    '''
    class Meta:
        db_table = 'xinyuai_chat'
        verbose_name = verbose_name_plural = '心语AI聊天记录'


class discussxinlizhishi(BaseModel):
    __doc__ = u'''discussxinlizhishi'''
    __tablename__ = 'discussxinlizhishi'



    __authTables__={}
    addtime = models.DateTimeField(auto_now_add=True, verbose_name=u'创建时间')
    refid=models.BigIntegerField  ( null=False, unique=False, verbose_name='关联表id' )
    userid=models.BigIntegerField  ( null=False, unique=False, verbose_name='用户id' )
    avatarurl=models.TextField   (  null=True, unique=False, verbose_name='头像' )
    nickname=models.CharField ( max_length=255, null=True, unique=False, verbose_name='用户名' )
    content=models.TextField   ( null=False, unique=False, verbose_name='评论内容' )
    reply=models.TextField   (  null=True, unique=False, verbose_name='回复内容' )
    thumbsupnum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='赞' )
    crazilynum=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='踩' )
    istop=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='置顶' )
    tuserids=models.TextField   (  null=True, unique=False, verbose_name='赞用户ids' )
    cuserids=models.TextField   (  null=True, unique=False, verbose_name='踩用户ids' )
    '''
    refid=BigInteger
    userid=BigInteger
    avatarurl=Text
    nickname=VARCHAR
    content=Text
    reply=Text
    thumbsupnum=Integer
    crazilynum=Integer
    istop=Integer
    tuserids=Text
    cuserids=Text
    '''
    class Meta:
        db_table = 'discussxinlizhishi'
        verbose_name = verbose_name_plural = '心理知识评论'
