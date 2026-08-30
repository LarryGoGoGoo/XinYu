<script setup>
/**
 * @description 注册页面
 */
import '@/style/register.scss'
import { reactive, ref, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import FormItems from './FormItems.vue'
import LoginButton from './LoginButton.vue'
import RegisterButton from './RegisterButton.vue'
import Custom from './Custom.vue'
import RegisterTitle from './RegisterTitle.vue'

// 注册表单组件
import '@/components/FormItem/index.js'
import { getInitRuleForm, getInitRules, getColums, getDisable } from '@/utils/form'
import { roleList } from '@/utils/role'
import { registerAPI } from '@/api/login'

const router = useRouter()
const route = useRoute()

let tableName = route.query.tableName

// 表单实例
const ruleFormRef = ref()
// 列字段
let columns = reactive(getColums(tableName, 'register'))
// 表单数据
let ruleForm = reactive(getInitRuleForm(tableName))
// 表单验证规则
let rules = reactive(getInitRules(columns))
// 禁止操作字段
let disabledColumnNames = getDisable(tableName, columns, 'register')



// 注册事件
async function registerEvent() {

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

  // 确认密码
  let password = ruleForm.password || ruleForm.mima
  let passwordColumn = columns.find(
    column => column.columnName == 'password' || column.columnName == 'mima'
  )
  if (ruleForm.repeatPassword != password) {
    ElMessage.error(passwordColumn.comments + ' 与 确认' + passwordColumn.comments + ' 不一致')
    return
  }

  try {
    // 请求后端
    let params = {}
    let data = {
      ...ruleForm
    }
    delete data.repeatPassword
    


    await registerAPI(tableName, data, params)

    ElMessage.success('注册成功')

    // 跳转首页
    setTimeout(() => {
      let accountName = roleList.find(role => role.tableName === tableName).accountName
      router.push({
        path: '/login',
        query: {
          tableName: tableName,
          username: data[accountName],
        },
      })
    }, 1000)
  } catch (error) {
    let msg = error.message || error.msg || "";
    msg = "注册失败：: " + msg;
    ElMessage.error(msg)
  }
}

// ----------------------------------
// ------------ 注入-----------------
// ----------------------------------
function loginEvent() {
  router.push('/login')
}
provide('register', {
  ruleForm,
  columns,
  disabledColumnNames,
  loginEvent,
  tableName,
})
</script>

<template>
  <div
    class="register"
    :style="
      $projectImages.bRegisterBackgroundImg
        ? `background-image: url(${$projectImages.bRegisterBackgroundImg})`
        : ''
    "
  >
    <el-form
      class="registerform"        
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormRef"
      @submit.prevent="registerEvent"
    >
      
<div class="title-box">{{ projectName }}</div>
<div class="registerform-wrapper">
  <div class="login-tip">欢迎注册</div>
  <FormItems />
  <div class="btn-wrapper">
    <RegisterButton />
    <LoginButton />
  </div>
  <Custom />
</div>
  
    </el-form>
  </div>
</template>
