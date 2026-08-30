/**
 * @description 表单相关工具函数
 */

import { faceVerificationAPI } from '@/api/common'
import tableConfigs from './tableConfigs'
import dayjs from 'dayjs'

/**
 * @description 过滤的字段，获取columns
 * all: 所有
 * register: 注册页面
 * list: 列表页面
 * edit: 编辑页面
 * view: 查看页面
 * center: 个人中心
 *
 * column.hiden：
 * 1: 注 注册页
 * 2: 后列 后台列表
 * 3: 后详 后台详情
 * 4: 前详
 * 5: 看板
 * 6: 后编
 * 7: 前编
 * 8: 前列
 */
const filter_type_Map = {
  register: [
    'email',
    'mobile',
    'jf',
    'money',
    'vip',
    'status',
    'passwordwrongnum',
    'sfsh',
    'shhf',
    'storeupnum',
    'clicknum',
    'crazilynum',
    'thumbsupnum',
    'discussnum',
    'crossuserid',
    'crossrefid',
    'logoff',
    'clicktime',
    'totalscore',
  ],
  list: [
    'longitude',
    'latitude',
    'passwordwrongnum',
    'userid',
    'openid',
    'pquestion',
    'panswer',
    'mima',
    'delflag',
    'isanon',
    'tuserids',
    'cuserids',
    'refid',
    'passwordwrongnum',
    'crossuserid',
    'crossrefid',
    'discountprice',
    'discounttotal',
    'orderno',
    'parentid',
    'money',
    'vip',
    'exampaperid',
    'paperid',
  ],
  edit: [
    'avatarurl',
    'ispay',
    'sfsh',
    'shhf',
    'clicktime',
    'browseduration',
    'thumbsupnum',
    'crazilynum',
    'clicknum',
    'storeupnum',
    'userid',
    'openid',
    'discussnum',
    'latitude',
    'longitude',
    'userids',
    'tuserids',
    'cuserids',
    'refid',
    'totalscore',
    'passwordwrongnum',
    'crossuserid',
    'crossrefid',
    'discountprice',
    'discounttotal',
    'orderno',
    'logoff',
    'parentid',
    'vip',
  ],
  view: [
    'passwordwrongnum',
    'crossuserid',
    'crossrefid',
    'userid',
    'openid',
    'discountprice',
    'discounttotal',
    'orderno',
    'tuserids',
    'cuserids',
    'refid',
    'exampaperid',
    'paperid',
  ],
  center: [
    'mima',
    'password',
    'passwordwrongnum',
    'status',
    'logoff',
    'sfsh',
    'shhf',
    'clicktime',
    'browseduration',
    'thumbsupnum',
    'crazilynum',
    'clicknum',
    'storeupnum',
    'discussnum',
    'totalscore',
  ],
}
const hiden_type_Map = {
  register: '1',
  list: '2',
  view: '3',
  edit: '6',
  center: '6',
}
/**
 * @description 获取columns 不同地方(list表格,view查看...)，显示不同的columns
 * @param { string } tableName
 * @param { 'all' | 'register' | 'list' | 'view' | 'edit' | 'center' } type
 * @param { object } config 其它配置
 * @param { string } config.configType 配置表的类型
 * @returns { Array } columns
 */
function getColums(tableName, type = 'all', config = {}) {
  let columns = tableConfigs[tableName]?.columns.slice(0) || []
  columns = JSON.parse(JSON.stringify(columns))

  if (type == 'all') {
    return columns
  }

  // 系统过滤的字段
  let filterColumnNames = filter_type_Map[type] || []
  columns = columns.filter(column => !filterColumnNames.includes(column.columnName))

  // 配置的过滤
  let hidenStr = hiden_type_Map[type]
  // edit过滤改为隐藏 form_hidden 功能字段上
  if (type == 'list' || type == 'view') {
    // 过滤
    columns = columns.filter(column => !column.hiden || column.hiden.indexOf(hidenStr) == -1)
  } else {
    // 隐藏
    columns.forEach(column => {
      if (column.hiden && column.hiden.indexOf(hidenStr) != -1) {
        column.form_hidden = true
      }
      // 个人中心不隐藏 money , jf
      if (type != 'center') {
        columns.forEach(column => {
          if (column.columnName == 'money') {
            column.form_hidden = true
          }
        })
      }
    })
  }

  // 背景图的url字段 隐藏
  if (tableName == 'config' && config.configType == '3') {
    columns = columns.filter(column => column.columnName != 'url')
  }

  // 注册增加 确认密码字段
  if (type == 'register') {
    let index = columns.findIndex(
      column => column.columnName == 'mima' || column.columnName == 'password'
    )
    if (index != -1) {
      let repeatPasswordColumn = {
        ...columns[index],
        columnName: 'repeatPassword',
        comments: '确认' + columns[index].comments,
      }
      columns.splice(index + 1, 0, repeatPasswordColumn)
    }
  }

  return columns
}

/**
 * @description 获取表单的初始值
 * @param { string } tableName
 * @returns
 */
function getInitRuleForm(tableName) {
  let columns = getColums(tableName, 'all')
  let initRuleForm = {}

  columns.forEach(column => {
    let {
      columnDefault,
      columnName,
      type,
      dateCurFlag,
      form_showTime,
      unique,
      defaultValue,
      formatValidation,
      sessionRead,
      sessionColumn,
    } = column

    if (columnName === 'onshelves') {
      initRuleForm[columnName] = 1
      return
    }

    // 内置字段，数据库会有默认值
    if (columnDefault !== '') {
      return
    }

    let numberTypes = ['数', '浮', '长']

    // 默认值
    if (defaultValue) {
      initRuleForm[columnName] = numberTypes.includes(formatValidation)
        ? Number(defaultValue)
        : defaultValue
      return
    }

    // 读取用户信息
    if (sessionRead == '是') {
      let userForm = JSON.parse(localStorage.getItem('userForm'))
      if (userForm) {
        initRuleForm[columnName] = sessionColumn ? userForm[sessionColumn] : userForm[columnName]
        return
      }
    }

    // 唯一id
    if (unique == '自') {
      let timestamp = new Date().getTime()
      initRuleForm[columnName] = numberTypes.includes(formatValidation) ? timestamp : timestamp.toString()
      return
    }

    // 当前时间
    if (dateCurFlag == '是') {
      let formatStr = form_showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
      initRuleForm[columnName] = dayjs().format(formatStr)
      return
    }

    // 其它默认为空字符串
    initRuleForm[columnName] = ''
  })

  return initRuleForm
}

const disable_type_map = {
  edit: [],
  center: ['money', 'jf', 'vip'],
  register: [],
}
/**
 * @description 禁止操作的字段
 * @param { string } type edit | center | register
 */
function getDisable(tableName, columns, type) {
  let disableColumnNames = new Set()

  let sessionTable = localStorage.getItem('sessionTable')
  let role = localStorage.getItem('role')
  // 默认禁止的列字段
  let names = disable_type_map[type]
  names.forEach(name => disableColumnNames.add(name))

  // 公共
  const suiList = ['随', '多随']
  columns.forEach(column => {
    let { unique, type, isReadonlyInput = [], sessionRead } = column
    let flag =
      unique == '自' ||
      (sessionRead == '是' && sessionTable !== 'users') ||
      suiList.includes(type) ||
      (isReadonlyInput.includes('是') && sessionTable !== 'users') ||
      isReadonlyInput.includes(role)

    flag && disableColumnNames.add(column.columnName)
  })

  // 个人中心
  // if (type === "center") {
  //   // 不可修改用户名
  //   columns.some(
  //     (column) => column.loginUser && disableColumnNames.add(column.columnName)
  //   );
  // }

  return Array.from(disableColumnNames)
}

/**
 * @description 字段值格式校验规则
 * 无：字段值无校验。
  数：字段值做整数校验。
  手：字段值做手机号码校验。
  电：字段值做电话号码校验。
  邮：字段值做邮箱格式校验。
  身：字段值做身份证格式校验。
  网：字段值做网址格式校验。
  浮：字段值做小数校验。
  中：中文
  英：英文
  英数：英文和数字
 */
let pattern_map = {
  数: /(^-?\d+$)|(^$)/,
  手: /^1[3456789]\d{9}$/,
  电: /^([0-9]{3,4}-)?[0-9]{7,8}$/,
  邮: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
  身: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  网: /^http[s]?:\/\/.*/,
  浮: /(^-?[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$)|(^$)/,
  中: /^[\u4e00-\u9fa5]+$/,
  英: /^[A-Za-z]+$/,
  英数: /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]+$/,
}

let message_map = {
  数: '请输入整数',
  手: '请输入正确的手机号码',
  电: '请输入正确的电话',
  邮: '请输入正确的邮箱',
  身: '请输入正确的身份证号码',
  网: '请输入正确的网址',
  浮: '请输入数字',
  中: '请输入中文',
  英: '请输入英文',
  英数: '请输入英文和数字',
}

// 特殊字段：
let pColumnNames = ['pquestion', 'panswer']

// 跨表计算
const crossCalValues = ['角加', '角减', '加', '减']

// 表单验证规则
function getInitRules(columns) {
  let initRules = {}
  columns.forEach(column => {
    let { columnName } = column
    initRules[columnName] = getRule(column)
  })
  return initRules
}

function getRule(column) {
  let {
    isNullable,
    comments,
    minLength,
    maxLength,
    formatValidation,
    unique,
    faceMatch,
    columnName,
    faceVerification,
  } = column
  let rules = []

  // 判断是否需要：非空校检 || 字段名是唯一且由用户生成 || 人脸识别功能（一般图像） || 密保问题 || 密保答案 || 跨表计算
  if (
    isNullable === '否' ||
    unique === '去' ||
    faceMatch === '是' ||
    pColumnNames.includes(columnName) ||
    crossCalValues.includes(column.crossCal)
  ) {
    let ruleItem = {
      required: true,
      message: `请输入${comments}`,
    }
    rules.push(ruleItem)
  }

  if (minLength || maxLength) {
    // 数值大小校检
    if (formatValidation == '数' || formatValidation == '浮') {
      rules.push({
        type: 'number',
        min: parseFloat(minLength),
        max: parseFloat(maxLength),
        message: `${comments}在${minLength}-${maxLength}之间`,
      })
    } else {
      // 字符串长度校检
      rules.push({
        type: 'string',
        min: parseInt(minLength),
        max: parseInt(maxLength),
        message: `${comments}长度在${minLength}-${maxLength}之间`,
      })
    }
  }

  // formatValidation校检
  if (formatValidation && pattern_map[formatValidation]) {
    rules.push({
      pattern: pattern_map[formatValidation],
      message: message_map[formatValidation],
    })
  }

  // 人脸校检
  if (faceVerification) {
    rules.push({
      asyncValidator: (rule, value) => {
        return new Promise(async (resolve, reject) => {
          let sessionTable = localStorage.getItem('sessionTable')
          if (sessionTable == 'users') {
            resolve()
          }

          let userAvatar = localStorage.getItem('useravatar')
          // 文件路径 提取 文件名
          userAvatar = userAvatar.replace(/.*\//, '')
          let uploadAvatar = value.replace(/.*\//, '')
          try {
            let res = await faceVerificationAPI(uploadAvatar, userAvatar)
            res.score >= 60 ? resolve() : reject('人脸校检失败')
          } catch (error) {
            reject('人脸校检失败')
          }
        })
      },
      message: '人脸校检失败',
    })
  }

  return rules
}

export { getInitRuleForm, getInitRules, getColums, getDisable, getRule, pattern_map }
