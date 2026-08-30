<script setup>
/**
 * @description 修改密码
 * 密码字段可能是 mima || password
 */
// 注册表单组件
import '@/components/FormItem/index.js'

import { ref } from 'vue'

import { getRule } from '@/utils/form'
import tableConfigs from '@/utils/tableConfigs'
import { updatePasswordAPI } from '@/api/list'

// 当前表名
let tableName = localStorage.getItem('sessionTable')

const isLoading = ref(false)
// 表单实例
const ruleFormRef = ref()
// 列字段
const columns = [
  {
    columnName: 'password',
    comments: '原密码',
    form_type: 'YyPassword',
  },
  {
    columnName: 'newpassword',
    comments: '新密码',
    form_type: 'YyPassword',
  },
  {
    columnName: 'repassword',
    comments: '确认密码',
    form_type: 'YyPassword',
  },
]
// 表单数据
let ruleForm = ref({
  password: '',
  newpassword: '',
  repassword: '',
})

// 密码字段配置
const names = ['mima', 'password']
let column = tableConfigs[tableName].columns.find(column => names.includes(column.columnName))
// 表单验证规则
let rule = getRule(column)
const rules = {
  password: [
    {
      required: true,
      message: '请输入原密码',
    },
  ],
  newpassword: rule,
  repassword: rule,
}

const okEvent = async () => {
  // 1. 表单校检(非空等)
  let valid = await ruleFormRef.value.validate((valid, fields) => {
    if (!valid) {
      // 验证不通过，提示第一个错误
      let firstErrorField = Object.entries(fields)
      let firstErrorMessage = firstErrorField[0][1][0].message || '表单校验失败，请检查输入'
      ElMessage.error(firstErrorMessage)
    }
  })
  if (!valid) return

  // 2. 继续校检
  let { password, newpassword, repassword } = ruleForm.value
  if (newpassword !== repassword) {
    ElMessage.error('两次密码输入不一致')
    return
  }

  if (password === newpassword) {
    ElMessage.error('新旧密码一致')
    return
  }

  isLoading.value = true
  try {
    await updatePasswordAPI(tableName, {
      oldPassword: password,
      newPassword: newpassword,
    })

    ElMessage.success('修改密码成功')

    ruleForm.value = {
      password: '',
      newpassword: '',
      repassword: '',
    }
  } catch (error) {
    ElMessage.error(`修改密码失败： ${error.msg || error.message}`)
    console.log(error)
  }

  isLoading.value = false
}
</script>

<template>
  <div class="updatepassword-wrapper">
    <el-form class="editform" :model="ruleForm" :rules="rules" ref="ruleFormRef" @submit.prevent>
      <el-form-item
        v-for="column in columns"
        :key="column.columnName"
        :prop="column.columnName"
        :label="column.comments"
      >
        <component :is="column.form_type" :column="column" :ruleForm="ruleForm" />
      </el-form-item>

      <div class="btn-wrapper">
        <!-- 确认 -->
        <div class="submit-box">
          <el-button :loading="isLoading" class="submit-btn" @click="okEvent">提交</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
