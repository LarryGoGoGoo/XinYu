import http from '@/utils/http.js'

/**
 * @description 分页接口（后台）
 * @param { string } tableName 表名
 */
export function getPageAPI(tableName, params = {}) {
  return http({
    url: tableName + '/page',
    method: 'get',
    params: {
      page: 1,
      limit: 10,
      sort: 'id',
      order: 'desc',
      ...params,
    },
  })
}

/**
 * @description 分页接口（前台）
 * @param { string } tableName 表名
 */
export function getListAPI(tableName, params = {}) {
  return http({
    url: tableName + '/list',
    method: 'get',
    params: {
      page: 1,
      limit: 10,
      sort: 'id',
      // order: 'desc',
      ...params,
    },
  })
}

/**
 * @description 保存(新增)
 * @param { string } tableName 表名
 * @param { object } data
 */
export function saveAPI(tableName, data) {
  try {
    // 兼容net服务器: 参数不能有id字段(id由数据库自行生成)
    delete data.id
  } catch (error) {}

  return http({
    url: tableName + '/save',
    method: 'post',
    data,
  })
}

/**
 * @description 保存(新增)（前台
 * @param { string } tableName 表名
 * @param { object } data
 */
export function addAPI(tableName, data) {
  try {
    // 兼容net服务器: 参数不能有id字段(id由数据库自行生成)
    delete data.id
  } catch (error) {}

  return http({
    url: tableName + '/add',
    method: 'post',
    data,
  })
}

/**
 * @description 更新
 * @param { string } tableName 表名
 * @param { object } data
 */
export function updateAPI(tableName, data) {
  return http({
    url: tableName + '/update',
    method: 'post',
    data: data,
  })
}

/**
 * @description 更新密码字段，单独拿出来
 * @param { string } tableName 表名
 * @param { object } data
 */
export function updatePasswordAPI(tableName, data) {
  return http({
    url: tableName + '/updatePassword',
    method: 'post',
    data,
  })
}

/**
 * @description 忘记密码恢复
 * @param { string } tableName 表名
 * @param { object } data
 */
export function recoverPasswordAPI(tableName, data) {
  return http({
    url: tableName + '/recovery',
    method: 'post',
    data,
  })
}

/**
 * @description 删除
 * @param { string } tableName 表名
 * @param { [Number] } ids 数组
 */
export function deleteAPI(tableName, ids) {
  return http({
    url: tableName + '/delete',
    method: 'post',
    data: ids,
  })
}

/**
 * @description 详情（后台
 * @param { string } tableName 表名
 * @param { string } id 数据的id
 */
export function getInfoAPI(tableName, id) {
  return http({
    url: tableName + '/info/' + id,
    method: 'get',
  })
}

/**
 * @description 详情（前台
 * @param { string } tableName 表名
 * @param { string } id 数据的id
 */
export function getDetailAPI(tableName, id) {
  return http({
    url: tableName + '/detail/' + id,
    method: 'get',
  })
}

/**
 * @description 总数接口： zhiceshi/zhixceshi
 * @param { string } tableName 表名
 */
export function getCountAPI(tableName) {
  return http({
    url: tableName + '/count',
    method: 'get',
  })
}

/**
 * @description 图表的api
 * @param { string } url
 * @param { object } params
 */
export function getChartAPI(url, params) {
  return http({
    url,
    method: 'get',
    params,
  })
}

/**
 * @description 审核
 * @param { string } tableName 表名
 * @param { object } params query数据 {sfsh:'',shhf:''}
 * @param { object } data body数据
 */
export function updateShAPI(tableName, params, data) {
  return http({
    url: tableName + '/shBatch',
    method: 'post',
    params,
    data,
  })
}

/**
 * @description 爬虫
 * @param { string } tableName 表名
 */
export function spiderAPI(tableName) {
  return http({
    url: 'spider/' + tableName,
    method: 'get',
  })
}

/**
 * @description 生成随机数据
 * @param { string } tableName 表名
 * @param { number } recordNum 数量
 */
export function genDataAPI(tableName, recordNum) {
  return http({
    url: `${tableName}/batch/gen`,
    method: 'post',
    params: {
      recordNum,
    },
  })
}

/**
 * @description 预测api
 */
export function predictAPI(tableName, data) {
  return http({
    url: `${tableName}/forecast`,
    method: 'post',
    data,
  })
}
/**
 * @description 预测完后的图表
 */
export function predictImgAPI(tableName) {
  return http({
    url: `${tableName}/forecastimgs`,
    method: 'get',
  })
}
/**
 * @description 数据清洗
 */
export function cleanseAPI(tableName) {
  return http({
    url: `${tableName}/cleanse`,
    method: 'get',
  })
}
