<script setup>
/**
 * @description 修改、新增、跨表组件
 */

import { nextTick, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getColums, getDisable, getInitRuleForm, getInitRules } from '@/utils/form'
// 注册表单组件
import '@/components/FormItem/index.js'
import { getDetailAPI, getInfoAPI, saveAPI, updateAPI } from '@/api/list'
import {
  crossCalFn,
  csuEvent,
  getCsuUpdateColumnList,  
} from '@/utils/feature'

defineOptions({
  inheritAttrs: false,
})
const route = useRoute()
const visible = defineModel()
const emits = defineEmits(['fetchData'])
const { data } = defineProps(['data'])
let {
  id,
  type,
  tableName,
  crossData,
  row,
  okText = '提交',
  cancleText = '取消',
  defaultData = {},
  isMessageReply,
} = data

const isLoading = ref(false)
// 表单实例
const ruleFormRef = ref()
// 列字段
let columns = reactive(getColums(tableName, 'edit', { configType: route.params.type }))

// 表单数据
let ruleForm = ref(getInitRuleForm(tableName))
// 表单验证规则
let rules = reactive(getInitRules(columns))

// 禁止操作列
let disabledColumnNames = getDisable(tableName, columns, 'edit')
if (isMessageReply) {
  let columnNames = columns.map(column => column.columnName).filter(columnName => columnName != 'reply')
  disabledColumnNames.push(...columnNames)
}
// 编辑模式下禁止修改 role 用户名字段
if (tableName === 'popupremind' && type == 'update') {
  disabledColumnNames.push('role')
}

/**
 * @description 初始化事件
 * 1. 获取默认数据
 * 2. ss读取
 * 3. id自增
 * 4. 跨表数据
 * 5. 获取详情数据
 */
initEvent()
async function initEvent() {
  switch (type) {
    case 'add':
      // 填充一些默认值
      ruleForm.value = {
        ...ruleForm.value,
        ...defaultData,
      }    
      break

    case 'cross':
      let { oldRow, crossType, isLimit } = crossData

      // 相同字段的话，把前表的值赋给当前表
      columns.forEach(column => {
        let { columnName, crossCal, defaultValue } = column
        // 跨表计算 || 跨表修改的字段
        if (
          crossCal == '加' ||
          crossCal == '减'
        )
          return
        
        if (oldRow[columnName] !== undefined) {

          // 默认值比同字段权重高
          if (!defaultValue) {
            ruleForm.value[columnName] = oldRow[columnName]
          }

          disabledColumnNames.push(columnName)
        }
      })
      // 次数限制,更新两个特殊字段
      if (isLimit) {
        ruleForm.value.crossrefid = oldRow.id
        ruleForm.value.crossuserid = Number(localStorage.getItem('userid'))
      }

      // 立即提交表单(比如: 抽奖)
      if (crossType === 2) {
        await nextTick()
        okEvent()
      }

      break

    case 'update':
      getInfo()
      break
  }
}

/**
 * @description 提交事件
 */
async function okEvent() {
  isLoading.value = true

  // 表单校检逻辑
  let valid = await ruleFormRef.value.validate((valid, fields) => {
    if (!valid) {
      // 验证不通过，提示第一个错误
      let firstErrorField = Object.entries(fields)
      let firstErrorMessage = firstErrorField[0][1][0].message || '表单校验失败，请检查输入'
      ElMessage.error(firstErrorMessage)
    }
  })
  if (!valid) {
    isLoading.value = false
    return
  }



  let loadingMessage = ElMessage.info({
    message: '操作中... ...',
    duration: 0,
  })

  try {
    // 请求后端
    let httpApi
    switch (type) {
      case 'add':
        httpApi = saveAPI

        // 跨表计算(角加、角减)
        crossCalFn({
          type,
          columns,
          tableName,
          newRow: ruleForm.value,
        })

        break

      case 'update':
        httpApi = updateAPI
        break

      case 'cross':
        httpApi = saveAPI

        let { statusColumnName, statusColumnValue, oldRow, oldTableName, isLimit } = crossData
        
        // 跨表修改
        let csuRes = await csuEvent('跨表', tableName, ruleForm.value)
        if (csuRes.isError) {
          throw new Error(csuRes.errorMsg)
        } 

        // 跨表修改的字段
        let [csuColumnNameList_str, csuColumnNameList_number] = getCsuUpdateColumnList(tableName)

        // 跨表计算(角加、角减、加、减)
        crossCalFn(
          {
            type,
            columns,
            tableName,
            newRow: ruleForm.value,
            oldTableName,
            oldRow,
          },
          csuColumnNameList_number
        )

        // 更新旧表的状态
        // 存在修改字段名 && 不是次数限制 && 没有配置跨表修改功能
        if (statusColumnName && !isLimit && !csuColumnNameList_str.includes(statusColumnName)) {
          updateAPI(oldTableName, {
            ...oldRow,
            [statusColumnName]: statusColumnValue,
          })
        }
        
          
        break
    }

    switch (true) {
      // 弹框提醒表
      case tableName == 'popupremind' && type == 'add':
        await okEvent_popupremind()
        break


      // 通用表
      default:
        await httpApi(tableName, ruleForm.value)
        break
    }


    ElMessage.success('操作成功')
    visible.value = false
    emits('fetchData')
  } catch (error) {
    let msg = error.msg || error.message || ''
    ElMessage.error('操作失败：' + msg)
    console.log(error)
  }

  loadingMessage.close()
  loadingMessage = null
  isLoading.value = false
}

// 拉取详情数据
async function getInfo() {
  // let res = await getInfoAPI(tableName, id)
  // ruleForm.value = res.data
  ruleForm.value = { ...row }
}

// 特殊：提醒功能 保存多条数据
async function okEvent_popupremind() {
  let roleList = ruleForm.value.role.split(',')
  let useridList = ruleForm.value.userid.split(',')

  let pList = roleList.map(async (role, index) => {
    try {
      let userid = parseInt(useridList[index])
      let data = {
        ...ruleForm.value,
        role,
        userid,
      }
      await saveAPI(tableName, data)

      return true
    } catch (error) {
      return false
    }
  })

  await Promise.all(pList)
}

</script>

<template>
  <el-form class="editform" :model="ruleForm" :rules="rules" ref="ruleFormRef" @submit.prevent>
    <el-form-item
      v-for="column in columns"
      :key="column.columnName"
      :prop="column.columnName"
      :label="column.comments"
      v-show="!column.form_hidden"
    >
      <component
        :is="column.form_type"
        :columns="columns"
        :column="column"
        :ruleForm="ruleForm"
        :tableName="tableName"
        :disabled="disabledColumnNames.includes(column.columnName)"
      />
    </el-form-item>

    <div class="btn-wrapper">
      <!-- 确认 -->
      <div class="submit-box">
        <el-button :loading="isLoading" class="submit-btn" @click="okEvent">{{ okText }}</el-button>
      </div>

      <!-- 取消 -->
      <div class="cancel-box">
        <el-button class="cancel-btn" @click="visible = false">{{ cancleText }}</el-button>
      </div>
    </div>
  </el-form>
</template>
