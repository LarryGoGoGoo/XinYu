<script setup>
/**
 * @description 忘记密码
 */
import '@/style/register.scss'

import { reactive, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { roleList } from '@/utils/role'
import { getQuessionAPI, sendEmailPasswordAPI } from '@/api/login'
import { recoverPasswordAPI } from '@/api/list'

const router = useRouter()
const route = useRoute()
let { pageFlag, email: initEmail, username: initUsername, tablename: initTableName } = route.query
// 角色列表
let roleOptions = roleList.filter(
  item => item.passwordProtected && item.passwordProtected != '否' && item.hasBackLogin == '是'
)
if (!roleOptions.length) {
  roleOptions = roleList.filter(item => item.hasBackLogin == '是')
}

// 表单实例
const ruleFormRef = ref()
// 表单数据
let ruleForm = reactive({
  username: initUsername ? initUsername : '',
  tableName: initTableName ? initTableName : roleOptions[0].tableName,
  pquestion: '',
  panswer: '',
  mima: '',
  email: initEmail ? initEmail : '',
})
// 表单验证规则
let rules = reactive({
  username: [
    {
      required: true,
      message: '请输入账号',
    },
  ],
  pquestion: [
    {
      required: true,
      message: '请输入账号，获取密保问题',
    },
  ],
  panswer: [
    {
      required: true,
      message: '请输入密保答案',
    },
  ],
  mima: [
    {
      required: true,
      message: '请输入新密码',
    },
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
    },
  ],
})

const protectType = ref('是') // 是: 密保 ; qq邮箱: 邮箱
// 角色变化，更新找回方式
watchEffect(() => {
  let tableName = ruleForm.tableName
  let roleData = roleOptions.find(roleData => roleData.tableName === tableName)
  protectType.value = roleData && roleData.passwordProtected != '否' ? roleData.passwordProtected : '是'
})

// 账号变化，更新用户信息
let userInfo = {}
const usernameChange = async () => {
  try {
    let { tableName, username } = ruleForm
    let res = await getQuessionAPI(tableName, username)
    userInfo = res.data

    if (protectType.value == '是') {
      if (res.data.recoverySupported === false || !res.data.pquestion) {
        ElMessage.error(res.data.recoveryMessage || '当前账号未配置密保找回')
        return
      }
      ruleForm.pquestion = res.data.pquestion
      ElMessage.success('更新密保问题成功')
    }
  } catch (error) {
    if (protectType.value == '是') {
      ElMessage.error('更新密保问题失败')
      console.log(error)
    }

    ElMessage.error('请检查用户名是否正确')
  }
}

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

  switch (protectType.value) {
    case '是':
      questionEvent()
      break
    case 'qq邮箱':
      if (pageFlag) {
        emailResetPasswordEvent()
      } else {
        emailEvent()
      }

      break
  }
}

// 密保找回
async function questionEvent() {
  try {
    await recoverPasswordAPI(ruleForm.tableName, {
      username: ruleForm.username,
      panswer: ruleForm.panswer,
      newPassword: ruleForm.mima,
    })

    ElMessage.success('修改密码成功')

    // 跳转登录页面
    setTimeout(() => {
      router.push({
        path: '/login',
        query: {
          tableName: ruleForm.tableName,
          username: ruleForm.username,
        },
      })
    }, 1000)
  } catch (error) {
    ElMessage.error('修改密码失败')
    ElMessage.error(error.message || error.msg || '')
  }
}

// 邮箱找回
async function emailEvent() {
  if (userInfo.email != ruleForm.email) {
    ElMessage.error('邮箱错误')
    return
  }

  await sendEmailPasswordAPI(ruleForm.tableName, {
    email: ruleForm.email,
    username: ruleForm.username,
    type: 1,
  })

  ElMessageBox.confirm('发送邮件成功！请继续前往邮箱、进行下一步操作', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'success',
  })
    .then(() => {
      window.open('https://mail.qq.com', '_blank')
    })
    .catch(() => {})
}
// 邮箱重置密码
async function emailResetPasswordEvent() {
  try {
    await recoverPasswordAPI(ruleForm.tableName, {
      username: ruleForm.username,
      email: ruleForm.email,
      newPassword: ruleForm.mima,
    })
    ElMessage.success('修改密码成功')

    // 跳转登录页面
    setTimeout(() => {
      router.push({
        path: '/login',
        query: {
          tableName: ruleForm.tableName,
          username: ruleForm.username,
        },
      })
    }, 1000)
  } catch (error) {
    ElMessage.error('修改密码失败')
    ElMessage.error(error.message || error.msg || '')
  }
}
</script>

<template>
  <div class="register">
    <el-form
      class="registerform forgetform"
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormRef"
      @submit.prevent="submitEvent"
    >
      <div class="registerform-wrapper">
        <!-- 标题 -->
        <div class="title-box forget-title-box">
          <span class="title">密码找回</span>
        </div>

        <el-form-item prop="tableName" label="角色">
          <el-select v-model="ruleForm.tableName" placeholder="请选择角色" :disabled="!!pageFlag">
            <el-option
              v-for="item in roleOptions"
              :key="item.tableName"
              :label="item.roleName"
              :value="item.tableName"
            />
          </el-select>
        </el-form-item>

        <el-form-item prop="username" label="账号">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入账号"
            clearable
            :disabled="!!pageFlag"
            @change="usernameChange"
          />
        </el-form-item>

        <!-- 找回方式：密保 -->
        <template v-if="protectType == '是'">
          <el-form-item prop="pquestion" label="密保问题">
            <el-input
              v-model="ruleForm.pquestion"
              placeholder="请输入账号后获取密保问题"
              disabled
            />
          </el-form-item>

          <el-form-item prop="panswer" label="密保答案">
            <el-input v-model="ruleForm.panswer" placeholder="请输入密保答案" />
          </el-form-item>

          <el-form-item prop="mima" label="新密码">
            <el-input
              v-model="ruleForm.mima"
              type="password"
              show-password
              placeholder="请输入新密码"
            />
          </el-form-item>
        </template>

        <!-- 找回方式：邮箱 -->
        <template v-else-if="protectType == 'qq邮箱'">
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱" :disabled="!!pageFlag" />
          </el-form-item>

          <el-form-item v-if="pageFlag" prop="mima" label="新密码">
            <el-input
              v-model="ruleForm.mima"
              type="password"
              show-password
              placeholder="请输入新密码"
            />
          </el-form-item>
        </template>

        <!-- 按钮 -->
        <div class="btn-wrapper">
          <!-- 注册 -->
          <div class="register-box">
            <el-button class="register-btn" native-type="submit">确认</el-button>
          </div>

          <!-- 登录 -->
          <div class="login-box">
            <el-button class="login-btn" type="primary" @click="router.push('/login')">
              返回登录
            </el-button>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
