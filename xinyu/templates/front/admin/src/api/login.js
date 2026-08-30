import http from '@/utils/http.js'

/**
 * 登录
 * @param { string } params.username 账号
 * @param { string } params.password 密码
 * @returns
 */
export function loginAPI({ tableName, username, password }) {
  return http({
    url: tableName + '/login',
    method: 'post',
    params: {
      username,
      password,
      tableName,
    },
  })
}

/**
 * 人脸登录
 * @param { string } tableName 表名
 * @param { string } fileName 文件名 2344.png
 * @returns
 */
export function faceLoginAPI(tableName, fileName) {
  return http({
    url: tableName + '/faceLogin?face=' + fileName,
    method: 'post',
  })
}

/**
 * 注册
 * @param { string } params.tableName 表名：yonghu,shanghu
 * @param { object } data 注册数据
 * @param {object} params 邮箱验证需要 emailcode
 * @returns
 */
export function registerAPI(tableName = 'yonghu', data, params) {
  return http({
    url: tableName + '/register',
    method: 'post',
    data,
    params,
  })
}

/**
 * 退出
 * @param {*} tableName
 * @returns
 */
export function logoutAPI(tableName) {
  return http({
    url: tableName + '/logout',
    method: 'post',
  })
}

/**
 * @description 获取当前已登录的用户信息
 * @param { string } tableName 账户的表名
 */
export function getSessionAPI(tableName) {
  return http({
    url: tableName + '/session',
    method: 'get',
  })
}

/**
 * @description 获取用户密保问题
 * @param { string } tableName 账户的表名
 */
export function getQuessionAPI(tableName, username) {
  return http({
    url: tableName + '/security',
    method: 'get',
    params: {
      username,
    },
  })
}

/**
 * @description 发送邮箱验证码
 * @param { string } tableName 账户的表名
 * @param { string } email 邮箱
 */
export function sendEmailAPI(tableName, email) {
  return http({
    url: tableName + '/sendemail',
    method: 'get',
    params: {
      email,
    },
  })
}

/**
 * @description 发送邮箱验证码
 * @param { string } tableName 账户的表名
 *
 * @param { object } params 参数
 * @param { string } params.email 邮箱
 * @param { string } params.username 用户名
 * @param { string } params.type 来自前台还是后台的忘记密码 1：后台 其它：前台
 */
export function sendEmailPasswordAPI(tableName, params) {
  return http({
    // PS:这里最后面多一个/，是为了匹配后端接口，不然需要token验证
    url: tableName + '/sendemail/password',
    method: 'get',
    params,
  })
}
/**
 * @description 发送手机验证码
 * @param { string } tableName 账户的表名
 * @param { string } mobile 手机号码
 */
export function sendSmsAPI(tableName, mobile) {
  return http({
    url: tableName + '/sendsms',
    method: 'get',
    params: {
      mobile,
    },
  })
}
