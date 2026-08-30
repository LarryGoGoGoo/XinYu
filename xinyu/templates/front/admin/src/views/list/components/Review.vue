<script setup>
import { addAPI, getListAPI, updateAPI, updateShAPI } from '@/api/list'
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'
import { csuEvent } from '@/utils/feature'

/**
 * @description 审核
 * isSHMode true: 审核模式
 * datas: 审核数据
 *
 * isSHMode false: 回复模式
 *  row: 回复数据
 */

defineOptions({
  inheritAttrs: false,
})
const visible = defineModel()
const { data, tableName } = defineProps(['data', 'tableName'])
const { isSHMode, datas, row, columns, comments } = data
const emits = defineEmits(['fetchData'])

// 表单实例
const ruleFormRef = ref()
// 表单验证规则
let rules = reactive({
  sfsh: [
    {
      required: true,
      message: '请输入审核结果',
    },
  ],
  shhf: [
    {
      required: true,
      message: '请输入回复内容',
    },
  ],
})
// 表单数据
let ruleForm = reactive({
  sfsh: '待审核',
  shhf: '',
})
const isLoading = ref(false)
const options = [
  {
    value: '是',
    label: '通过',
  },
  {
    value: '否',
    label: '不通过',
  },
  {
    value: '待审核',
    label: '待审核',
  },
]

// 确认事件
const submitEvent = async () => {
  // 表单校检逻辑
  let valid = await ruleFormRef.value.validate((valid, fields) => {
    if (!valid) {
      // 验证不通过，提示第一个错误
      let firstErrorField = Object.entries(fields)
      let firstErrorMessage = firstErrorField[0][1][0].message || '表单校验失败，请检查输入'
      ElMessage.error(firstErrorMessage)
    }
  })
  if (!valid) return

  isLoading.value = true
  try {
    if (isSHMode) {
      // 审核模式

      if (ruleForm.sfsh != '待审核') {
        let csuType = ruleForm.sfsh == '是' ? '审核是' : '审核否'
        for (let index = 0; index < datas.length; index++) {
          const row = datas[index]
          // 跨表修改
          let csuRes = await csuEvent(csuType, tableName, row)
          if (csuRes.isError) {
            throw new Error(csuRes.errorMsg)
          }
        }
      }

      let ids = datas.map(item => item.id)
      await updateShAPI(tableName, ruleForm, ids)

      ElMessage.success('审核成功')

      popUpRemindEvent()
      
    } else {
      // 回复模式
      await updateAPI(tableName, {
        ...row,
        shhf: ruleForm.shhf,
      })
      ElMessage.success('回复成功')
    }

    emits('fetchData')
    visible.value = false
  } catch (error) {
    ElMessage.error(error.msg || error.message || '审核失败')
  }

  isLoading.value = false
}

// 增加弹框提醒
function popUpRemindEvent() {
  let sfsh = ruleForm.sfsh
  if (sfsh == '待审核') {
    return
  }

  // 判断是否有 角色。有的话给角色发送弹框提醒
  let roleColumns = columns.filter(column => column.authTable)
  if (!roleColumns.length) {
    return
  }

  let sessionTable = localStorage.getItem('sessionTable')
  let username = localStorage.getItem('username')
  // 名称字段名
  let goodColumnName = columns.find(
    column => (column.tplist == '是' || column.tplist == '带头') && column.type != '图'
  )?.columnName

  // 多个角色字段
  roleColumns.forEach(column => {
    let { columnName, authTable, sessionRead, sessionColumn } = column

    // 通过表名authTable 和 用户名字段name 找到userid账户id
    let name = sessionRead == '是' && sessionColumn ? sessionColumn : columnName

    // 多条审核数据
    datas.forEach(async row => {

      // 审核人员自己不提示
      if ( authTable === sessionTable && row[columnName] === username) {
        return
      }

      let res = await getListAPI(authTable, {
        page: 1,
        limit: 1,
        [name]: row[columnName],
      })

      if (!res.data.total) {
        return
      }

      let userid = res.data.list[0].id
      let goodName = goodColumnName ? row[goodColumnName] : ''
      let brief = sfsh == '是' ? `【${goodName}】 审核成功` : `【${goodName}】 审核失败`

      let data = {
        userid,
        role: row[columnName],
        title: `${comments} 审核结果`,
        brief,
        content: ruleForm.shhf,
        type: '待替换',
        remindtime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }
      let { data: id } =  await addAPI('popupremind', data)
      await updateAPI('popupremind', {
        ...data,
        id,
        type: '未读'
      })
    })
  })
}
</script>

<template>
  <el-form
    class="editform"
    :model="ruleForm"
    :rules="rules"
    ref="ruleFormRef"
    @submit.prevent="submitEvent"
  >
    <el-form-item prop="sfsh" label="审核状态" v-if="isSHMode">
      <el-select v-model="ruleForm.sfsh" placeholder="请选择审核状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item prop="shhf" label="回复内容">
      <el-input v-model="ruleForm.shhf" placeholder="请输入回复内容" type="textarea" :rows="4" />
    </el-form-item>

    <!-- 按钮 -->
    <div class="btn-wrapper">
      <!-- 注册 -->
      <div class="submit-box">
        <el-button class="submit-btn" :loading="isLoading" native-type="submit">提交</el-button>
      </div>

      <!-- 登录 -->
      <div class="cancel-box">
        <el-button class="cancel-btn" @click="visible = false">取消</el-button>
      </div>
    </div>
  </el-form>
</template>
