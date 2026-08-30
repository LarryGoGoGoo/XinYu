/**
 * @description 一些 功能 的封装函数
 */
import { getListAPI, updateAPI } from '@/api/list'
import { deleteColumnAPI, updateColumnAPI } from '@/api/common'
import tableConfigs from './tableConfigs'
import { getColums } from './form'

/**
 * @description 获取下条件的参数
 * @param { object } column 列配置项
 * @param { object } ruleForm 表单值
 * @returns { object } apiParams
 */
export function getRefConditonParams(column, ruleForm) {
  let userForm = JSON.parse(localStorage.getItem('userForm')) || {}
  let apiParams = {}
  /**
   * 下条件
   * refConditionColumn 条件字段
   * refConditionQueryMethod 查询方式: 自动、单值、多值、模糊
   * refConditionValue 条件值
   */
  let { refConditionColumn, refConditionQueryMethod, refConditionValue } = column
  if (!refConditionColumn) {
    return null
  }
  const str_method_map = {
    自动: '=',
    单值: '=',
    多值: 'in',
    模糊: 'like',
    同步: '=',
  }
  const value_metho_map = {
    自动: userForm[refConditionColumn],
    单值: refConditionValue,
    多值: refConditionValue,
    模糊: refConditionValue,
    同步: ruleForm[refConditionColumn],
  }
  apiParams.refConditionColumn = refConditionColumn
  apiParams.refConditionQueryMethod = str_method_map[refConditionQueryMethod] || '='
  apiParams.refConditionValue =
    value_metho_map[refConditionQueryMethod] || userForm[refConditionColumn]
  return apiParams
}

/**
 * @description 跨表计算(角加、角减、加、减)
 * @param { string } data.type add || cross
 * @param { Array } data.columns
 * @param { string } data.tableName 新表名
 * @param { object } data.newRow 新表单数据
 * @param { String } data.oldTableName 旧表名
 * @param { object } data.oldRow 旧表单数据
 * @param { [] } csuColumnNameList_number 配置了跨表修改、且是数值类型的列表字段集合
 * @returns
 */
export function crossCalFn(data, csuColumnNameList_number) {
  let { type } = data

  roleCal(data)

  type == 'cross' && cal(data, csuColumnNameList_number)
}

// 加、减
function cal(data, csuColumnNameList_number) {
  let { columns, newRow, oldTableName, oldRow } = data
  let oldFormHasChanged = false

  oldRow = Object.assign({}, oldRow)

  for (let index = 0; index < columns.length; index++) {
    let { crossCal, columnName, comments } = columns[index]

    // 配置了 跨表修改，忽略 加、减
    if (csuColumnNameList_number.includes(columnName)) {
      continue
    }

    // 减
    if (crossCal == '减') {
      oldFormHasChanged = true
      oldRow[columnName] = Number((oldRow[columnName] - newRow[columnName]).toFixed(2))

      // 判断数量是否充足
      if (oldRow[columnName] < 0) {
        throw new Error(comments + '不足')
      }
      continue
    }

    // 加
    if (crossCal == '加') {
      oldFormHasChanged = true
      oldRow[columnName] = Number((oldRow[columnName] + newRow[columnName]).toFixed(2))
    }
  }

  if (oldFormHasChanged) {
    updateAPI(oldTableName, oldRow)
  }
}

// 角加、角减
function roleCal(data) {
  let { columns, newRow } = data
  let userFormHasChanged = false
  let userForm = JSON.parse(localStorage.getItem('userForm'))

  // [1] 遍历列 判断数量是否充足
  for (let index = 0; index < columns.length; index++) {
    let { crossCal, columnName, comments } = columns[index]

    // 角减
    if (crossCal == '角减') {
      userFormHasChanged = true
      userForm[columnName] = Number((userForm[columnName] - newRow[columnName]).toFixed(2))
      if (userForm[columnName] < 0) {
        throw new Error('您的' + comments + '不足')
      }
      continue
    }

    // 角加 配置
    if (crossCal == '角加') {
      userFormHasChanged = true
      userForm[columnName] = Number((userForm[columnName] + newRow[columnName]).toFixed(2))
    }  
  }

  // [2] 修改远程userForm
  if (userFormHasChanged) {
    let sessionTable = localStorage.getItem('sessionTable')
    updateAPI(sessionTable, userForm)
    localStorage.setItem('userForm', JSON.stringify(userForm))
  }
}

/**
 * @description 跨表修改
 * @param { '跨表' | '支付' | '审核是' | '审核否' } type 类型
 * @param { string } tableName 表名
 * @param { object } data 数据
 * @returns { object } resData
 * - csuOperate 操作方式 修改、删除[、新增]
 * - csuType 类型: 跨表、支付、审核是、审核否[、计算]
 * - csuUpdateTable 目标表
 * - csuUpdateColumn 修改字段
 * - csuUpdateColumnType 修改字段类型: 1:字符串 2: 数值
 * - csuUpdateColumnValue 修改值: 字符串 | 加、减、平均
 * - csuConditionColumn 条件字段(目标表)
 * - csuConditionColumn_2 条件字段(当前表)
 * - csuMessage 提示语
 */
export async function csuEvent(type, tableName, data) {
  let resData = {
    hasRemove: false, // 是否有删除操作
    isError: false, // 是否出错
    errorMsg: '', // 错误提示
  }
  let { table } = tableConfigs[tableName]
  if (!table) {
    return resData
  }

  // 是否有配置
  let {
    csuOperateList,
    csuTypeList,
    csuUpdateTableList,
    csuUpdateColumnList,
    csuUpdateColumnTypeList,
    csuUpdateColumnValueList,
    csuConditionColumnList_1,
    csuConditionColumnList_2,
    csuMessageList,
  } = table

  if (!csuOperateList || !csuOperateList.length) {
    return resData
  }

  for (let index = 0; index < csuTypeList.length; index++) {
    const csuType = csuTypeList[index]
    if (csuType != type) {
      continue
    }

    let csuOperate = csuOperateList[index]
    let csuUpdateTable = csuUpdateTableList[index]
    let csuUpdateColumn = csuUpdateColumnList[index]
    let csuUpdateColumnType = csuUpdateColumnTypeList[index]
    let csuUpdateColumnValue = csuUpdateColumnValueList[index]
    let csuMessage = csuMessageList[index]
    let csuConditionColumn = csuConditionColumnList_1[index]
    let csuConditionColumn_2 = csuConditionColumnList_2[index]
 
    // 修改操作 csuOperate == '修改'
    if (csuOperate == '修改') {
      let value
      if (csuUpdateColumnType == 1) {
        // #开头的，取数据的字段值
        if (csuUpdateColumnValue && csuUpdateColumnValue.startsWith('#')) {
          let columnName_data = csuUpdateColumnValue.replace('#', '')
          value = data[columnName_data]
        } else {
          value = csuUpdateColumnValue
        }
      } else if (csuUpdateColumnType == 2) {
        switch (csuUpdateColumnValue) {
          case '加':
            value = '+' + data[csuUpdateColumn]
            break

          case '减':
            value = '-' + data[csuUpdateColumn]
            break

          case '自加':
            value = '+1'
            break

          case '自减':
            value = '-1'
            break

          default:
            break
        }
      }
      let apiData = {
        csuUpdateColumn,
        csuUpdateColumnValue: value,
        csuConditionColumn,
        csuConditionColumnValue: data[csuConditionColumn_2],
      }

      try {
        await updateColumnAPI(csuUpdateTable, csuUpdateColumnType, apiData)
      } catch (error) {
        resData.isError = true
        resData.errorMsg = csuMessage
        break
      }
    }

    // 删除操作 csuOperate == '删除'
    if (csuOperate == '删除') {
      resData.hasRemove = true
      let apiData = {
        csuConditionColumn,
        csuConditionColumnValue: data[csuConditionColumn_2],
      }

      try {
        await deleteColumnAPI(csuUpdateTable, apiData)
      } catch (error) {
        resData.isError = true
        resData.errorMsg = csuMessage
        break
      }
    }
  }

  return resData
}

/**
 * @description 获取跨表修改功能下 操作方式为[修改]的字段，在跨表中开放修改
 * @param { string } tableName 表名
 * @returns { [[],[]] }  [csuColumnNameList_str 字符串字段名列表, csuColumnNameList_number 数值字段名列表]
 */
export function getCsuUpdateColumnList(tableName) {
  let csuColumnNameList_str = [],
    csuColumnNameList_number = []

  let { csuOperateList, csuUpdateColumnList, csuUpdateColumnTypeList } =
    tableConfigs[tableName].table

  if (!csuOperateList || !csuOperateList.length) {
    return [csuColumnNameList_str, csuColumnNameList_number]
  }

  csuOperateList.forEach((csuOperate, index) => {
    let csuUpdateColumn = csuUpdateColumnList[index]
    let csuUpdateColumnType = csuUpdateColumnTypeList[index]
    if (csuOperate == '修改') {
      // 字符串类型
      if (csuUpdateColumnType == 1) {
        csuColumnNameList_str.push(csuUpdateColumn)
        return
      }
      // 数值类型
      if (csuUpdateColumnType == 2) {
        csuColumnNameList_number.push(csuUpdateColumn)
      }
    }
  })

  return [csuColumnNameList_str, csuColumnNameList_number]
}


