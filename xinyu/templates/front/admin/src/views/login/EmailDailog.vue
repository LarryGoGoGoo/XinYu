<script setup>
import { reactive, ref } from 'vue'
import YyEmail from '@/components/FormItem/components/YyEmail.vue'
import { commonTableAPI } from '@/api/common'
const emailVisible = defineModel()
const emits = defineEmits(['loginSucessEvent'])
let { emailType, tableName } = defineProps(['emailType', 'tableName'])
const emailFormRef = ref()
const ruleForm = reactive({
  email: '',
  mobile: '',
  code: '',
})
const rules = reactive({
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'change',
    },
  ],
  mobile: [
    {
      required: true,
      message: '请输入手机',
      trigger: 'change',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'change',
    },
  ],
})
const emailColumn = {
  columnName: emailType == '邮箱登录' ? 'email' : 'mobile',
  comments: emailType == '邮箱登录' ? '邮箱' : '手机',
}

const isLoading = ref(false)
// 发送api
const sendCodeAPI = (tableName, text) => {
  return emailType == '邮箱登录'
    ? commonTableAPI({
        url: tableName + '/sendemail/login',
        method: 'get',
        params: {
          email: text,
        },
      })
    : commonTableAPI({
        url: tableName + '/sendsms/login',
        method: 'get',
        params: {
          mobile: text,
        },
      })
}
// 登录逻辑
async function emailLogin() {
  // 表单校检逻辑
  let valid = await emailFormRef.value.validate((valid, fields) => {
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
    let apiConfig =
      emailType == '邮箱登录'
        ? {
            url: tableName + '/email/login',
            method: 'post',
            params: {
              email: ruleForm.email,
              emailcode: ruleForm.code,
            },
          }
        : {
            url: tableName + '/sms/login',
            method: 'post',
            params: {
              mobile: ruleForm.mobile,
              smscode: ruleForm.code,
            },
          }
    let res = await commonTableAPI(apiConfig)
    emits('loginSucessEvent', res.token, tableName)
  } catch (error) {
    ElMessage.error(error.msg || error.message || '发送失败')
  }

  isLoading.value = false
}
</script>
<template>
  <el-dialog
    class="yy-dialog"
    v-model="emailVisible"
    :title="emailType"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      class="emailform"
      :rules="rules"
      :model="ruleForm"
      ref="emailFormRef"
      @submit.prevent="emailLogin"
    >
      <el-form-item :prop="emailColumn.columnName" class="email">
        <YyEmail
          :tableName="tableName"
          :column="emailColumn"
          :ruleForm="ruleForm"
          :customAPI="sendCodeAPI"
        />
      </el-form-item>

      <el-form-item prop="code" class="code">
        <el-input v-model="ruleForm.code" placeholder="请输入验证码" clearable></el-input>
      </el-form-item>
      <el-button :loading="isLoading" native-type="submit" type="primary">登录</el-button>
    </el-form>
  </el-dialog>
</template>
<style lang="scss">
.emailform {
  max-width: 450px;
  margin: 0 auto;

  .code {
    .el-form-item__content {
      flex-wrap: nowrap;
      gap: 10px;
    }
  }
}
</style>
