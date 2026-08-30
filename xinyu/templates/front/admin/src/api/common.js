import http from '@/utils/http.js'

/**
 * @description 获取加密后的文字
 * @param { string } text 加密前的文字
 * @param { string } encryption 加密方式
 * @returns
 */
export function getEncryptAPI(text, encryption) {
  return http({
    url: `/encrypt/${encryption}?text=${text}`,
    method: 'get',
  })
}

export function downloadFileAPI(file) {
  // file/download?fileName=1719367751322.webp
  return http({
    url: '/file/download?fileName=' + file,
    method: 'get',
    responseType: 'blob',
  })
}

// 上传文件
export function uploadFileAPI(data) {
  return http({
    url: '/file/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
}

// 试卷管理的组卷
export function composeEaxmAPI(params) {
  return http({
    url: '/exampaper/compose',
    method: 'post',
    params,
  })
}

/**
 * 考试记录，清除
 * @param { string } params.userid 用户id
 * @param { string } params.paperid 试卷id
 * @returns
 */
export function deleteExamrecordAPI(params) {
  return http({
    url: '/examrecord/deleteRecords',
    method: 'post',
    params,
  })
}

/**
 * 考试记录，
 * @param { string } params.userid 用户id
 * @param { string } params.paperid 试卷id
 * @returns
 */
export function getGroupAPI(tableName, params = {}) {
  delete params.sort
  delete params.order
  return http({
    url: '/examrecord/groupby',
    method: 'get',
    params: {
      page: 1,
      limit: 10,
      ...params,
    },
  })
}

/**
 * 获取某次心理测评的报告结果
 * @param { object } params
 * @param { string | number } params.paperid 试卷id
 * @param { string | number } params.userid 用户id
 * @param { string } params.examno 考试编号
 * @returns
 */
export function getExamrecordResultAPI(params = {}) {
  return http({
    url: '/examrecord/result',
    method: 'get',
    params,
  })
}

/**
 * 下2，单选，根据表和列，获取选项
 * @param { string } refTable 表名
 * @param { string } refColumn 列字段
 * @param { string | undefined} params.conditionColumn 联动字段
 * @param { string | undefined} params.conditionValue 联动值
 * @param { string | undefined} params.refConditionColumn 条件字段
 * @param { string | undefined} params.refConditionQueryMethod 查询方式
 * @param { string | undefined} params.refConditionValue 条件值
 * @returns
 */
export function getOptionAPI(refTable, refColumn, params) {
  return http({
    url: `option/${refTable}/${refColumn}`,
    method: 'get',
    params,
  })
}

/**
 * 下2和下多2，随api 根据表和列，获取选项
 * @param { string } refTable 表名
 * @param { string } refColumn 列字段
 * @returns
 */
export function getFollowAPI(refTable, refColumn, columnValue) {
  return http({
    url: `follow/${refTable}/${refColumn}`,
    method: 'get',
    params: {
      columnValue,
    },
  })
}

/**
 * 人脸比对（跨表的 人脸识别功能（地址要去除 upload，只剩文件名：picture.png)
 * @param { string } face1 头像1文件名
 * @param { string } face2 头像2问价名
 * @returns
 */
export function faceVerificationAPI(face1FileName, face2FileName) {
  return http({
    url: `matchFace`,
    method: 'get',
    params: {
      face1: face1FileName,
      face2: face2FileName,
    },
  })
}

/**
 * @description 沙箱支付
 * @param { object } params
 * @param { string } data.tradeno 交易单号
 * @param { string } data.totalamount 价格
 * @param { string } data.subject  标题
 * @returns
 */
export function alipayAPI(tableName, params) {
  return http({
    url: `${tableName}/alipay`,
    method: 'get',
    params,
  })
}

/**
 * @description 提醒功能
 *
 */
export function getRemindAPI(tableName, columnName, type, params) {
  return http({
    url: `${tableName}/remind/${columnName}/${type}`,
    method: 'get',
    params,
  })
}

/**
 * @description 备份数据库
 * @returns
 */
export function getMysqldumpAPI() {
  return http({
    url: 'mysqldump',
    method: 'get',
    responseType: 'blob',
  })
}

/**
 * @description 通用
 * @param { string } url api地址
 */
export function getUrlAPI(url) {
  return http({
    url,
    method: 'get',
  })
}

/**
 * @description 识别图片接口
 * @param { string } tableName 表名
 * @param { string } fileName 文件名
 * @param { string } type 识别类型
 * @param { params } params 其它参数
 */
export function getImageRecogizeAPI(tableName, fileName, type, params) {
  // 英图中、中图英
  if (type == 'pictrans') {
    return http({
      url: `baidu/${type}`,
      method: 'get',
      params: {
        fileName,
        ...params,
      },
    })
  }
  if (type == 'cnn') {
     return http({
      url: `${tableName}/cnn/recognition`,
      method: 'get',
      params: {
        fileName,
        ...params,
      },
    })   
  }

  let thirdPart = type === 'rubbish' ? 'aliyun' : 'baidu'
  return http({
    url: `${tableName}/${thirdPart}/${type}`,
    method: 'get',
    params: {
      fileName,
      ...params,
    },
  })
}

/**
 * @description 识别语音
 * @param { params } params 其它参数
 */
export function getAudioRecogizeAPI(params) {
  return http({
    url: `baidu/texttrans`,
    method: 'get',
    params,
  })
}

/**
 * @description 问卷调查统计
 * @param { string } paperid 试卷id
 */
export function getExamOptionsNumAPI(paperid) {
  return http({
    url: 'examrecord/options/num',
    method: 'get',
    params: {
      page: 1,
      limit: 99999,
      paperid,
    },
  })
}

/**
 * @description 获取聊天信息
 * @param { number } uid  
 * @param { number } fid  

 * @returns 
 */
export function getChatMessageListAPI(uid, fid) {
  return http({
    url: `chatmessage/mlist`,
    method: 'get',
    params: {
      page: 1,
      limit: 1000,
      uid,
      fid,
    },
  })
}

/**
 * @description 获取聊天记录
 * @param { number } uid
 * @returns
 */
export function getChatHistoryAPI(uid) {
  return http({
    url: `friend/page2`,
    method: 'get',
    params: {
      type: 2,
      uid,
    },
  })
}

/**
 * @description 跨表修改
 * @param { string } tableName 表名
 * @param { '1' | '2' } type 类型 1: 字符串 2：数值
 * @param { object } data 参数
 * @returns
 */
export function updateColumnAPI(tableName, type, data) {
  return http({
    url: `updateColumn/${tableName}/${type}`,
    method: 'post',
    data,
  })
}
/**
 * @description 跨表修改-删除
 * @param { string } tableName 表名
 * @param { object } data 参数
 * @returns
 */
export function deleteColumnAPI(tableName, data) {
  return http({
    url: `deleteColumn/${tableName}`,
    method: 'post',
    data,
  })
}

/**
 * @description 通用请求
 * @param { object } config 请求配置项
 * @param { string } config.url 地址
 * @param { 'post' | 'get' } config.method 请求方式
 * @param { object | undefined } config.data 请求体数据
 * @param { object | undefined } config.params 请求参数
 */
export function commonTableAPI(config) {
  return http({
    ...config,
  })
}
