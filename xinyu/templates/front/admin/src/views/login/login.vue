<script setup>
import { reactive, ref, onMounted, watch, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import UserName from './UserName.vue'
import Password from './Password.vue'
import Captcha from './Captcha.vue'
import Roles from './Roles.vue'
import LoginButton from './LoginButton.vue'
import ForgetButton from './ForgetButton.vue'
import RegisterButtons from './RegisterButtons.vue'
import FaceButton from './FaceButton.vue'
import Custom from './Custom.vue'
import LoginTitle from './LoginTitle.vue'
import EmailButton from './EmailButton.vue'
import EmailDailog from './EmailDailog.vue'

import { roleList } from '@/utils/role'
import { getAvatar } from '@/utils/index'
import { clearFilePath } from '@/utils/getFilePath'
import { loginAPI, faceLoginAPI, getSessionAPI } from '@/api/login'
import { initMenus } from '@/utils/menu'

const router = useRouter()
const route = useRoute()
let { tableName: initTableName, username: initUsername } = route.query

// 登录角色列表
let roleOptions = roleList
  .filter(item => item.hasBackLogin == '是')
  .map(item => ({
    value: item.tableName,
    label: item.roleName,
  }))


// 注册角色列表
let registerOptions = roleList
  .filter(item => item.hasBackRegister == '是')
  .map(item => ({
    tableName: item.tableName,
    roleName: item.roleName,
  }))


const ruleFormRef = ref()
// 表单数据
const ruleForm = reactive({
  username: initUsername ? initUsername : '',
  password: '',
  tableName: initTableName ? initTableName : roleOptions[0].value,
})
// 表单验证规则
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
})



// 登录
async function handleLogin() {
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


  // 登录逻辑
  const loading = ElLoading.service({
    lock: true,
    text: '登录中... ..',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  try {

    // 登录
    let res = await loginAPI(ruleForm)

    // 获取用户信息
    await loginSucessEvent(res.token, ruleForm.tableName)

  } catch (error) {
    let msg = error.message || error.msg || ''
    msg = '登录失败: ' + msg
    ElMessage.error(msg)
  }

  loading.close()

}


// ----------------------------------
// -------- 邮箱/手机登录 ------------
// ----------------------------------
const emailVisible = ref(false)
const emailType = ref('邮箱登录')
const hasEmail = ref(true)
function emailEvent() {
  emailVisible.value = true
}
watch(
  () => ruleForm.tableName,
  newTableName => {
    let role = roleList.find(item => item.tableName === newTableName)
    hasEmail.value = role.emailRegister == '是' || role.emailRegister == '短信'
    emailType.value = role.emailRegister == '短信' ? '手机登录' : '邮箱登录'
  },
  {
    immediate: true,
  }
)


// 登录成功后，做一些缓存等事件
async function loginSucessEvent(token, tableName) {
  // 缓存一些用户信息到localstorage
  // 第一步必须缓存token，因为后续api需要从localStorage.getItem('Token')取
  localStorage.setItem('Token', token)

  // 请求后端 获取登录信息
  let userInfoRes = await getSessionAPI(tableName)
  // 设置 账户名和图像
  let [avatar, account] = getAvatar(userInfoRes.data, tableName)

  // 用户表名（数据库
  localStorage.setItem('sessionTable', tableName)
  // 账户
  localStorage.setItem('username', account)
  // 缓存用户全部信息
  localStorage.setItem('userForm', JSON.stringify(userInfoRes.data))
  // 缓存用户id
  localStorage.setItem('userid', userInfoRes.data.id)
  // 用户头像
  localStorage.setItem('useravatar', clearFilePath(avatar))
  // 角色名
  localStorage.setItem('role', roleOptions.find(item => item.value == tableName).label)  

  // 登录的角色对应的菜单roleMenu
  // 尝试修复menus不存在的异常
  if (!localStorage.getItem('menus')) {
    await initMenus()
  }
  // 角色菜单
  let menuItem = JSON.parse(localStorage.getItem('menus')).find(
    item => item.tableName === tableName
  )
  localStorage.setItem('roleMenu', JSON.stringify(menuItem.backMenu))

  // 登录成功，跳转到首页
  router.push('/home')
}

onMounted(() => {
  requestIdleCallback(() => {
    // 提前加载 首页
    import ('@/views/home/home.vue')

  })
})


function registerEvent(item) {
  router.push({
    path: '/register',
    query: { tableName: item.tableName },
  })
}
function forgetEvent() {
  router.push('/forgetPassword')
}
provide('login', {
  ruleForm,
  roleOptions,
  registerOptions,

  registerEvent,
  forgetEvent,

  hasEmail,
  emailType,
  emailEvent,
})
</script>
<template>
  <div
    class="login"
    :style="
      $projectImages.bLoginBackgroundImg
        ? `background-image: url(${$projectImages.bLoginBackgroundImg})`
        : ''
    "
  >
    <div class="login-brand">
      <div class="login-brand__logo" v-if="$projectImages.logo">
        <img :src="$projectImages.logo" draggable="false" />
      </div>
      <h1 class="login-brand__title">{{ projectName }}</h1>
      <p class="login-brand__slogan">让每一份情绪，都被温柔看见</p>
      <ul class="login-brand__points">
        <li>专业量表 · SCL-90 / PHQ-9 / GAD-7 科学筛查</li>
        <li>心情日记 · 语义级风险识别与即时预警</li>
        <li>隐私守护 · 数据加密隔离，安心倾诉</li>
      </ul>
    </div>

    <el-form
      class="loginform"
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormRef"
      @submit.prevent="handleLogin"
    >
      <div class="title-box">{{ projectName }}</div>
      <div class="loginform-wrapper">
        <div class="login-tip">欢迎回来</div>
        <div class="login-sub">请登录你的管理账号</div>

        <div class="inner-wrapper">
          <UserName />
          <Password />
          <Captcha />
          <Roles />
          <RegisterButtons />
          <div class="face-forget-wrapper">
            <FaceButton />
            <EmailButton />
            <ForgetButton />
          </div>
          <LoginButton />
        </div>
        <Custom />
      </div>
    </el-form>
    <EmailDailog
      v-if="emailVisible"
      v-model="emailVisible"
      :emailType="emailType"
      :tableName="ruleForm.tableName"
      @loginSucessEvent="loginSucessEvent"
    />
  </div>
</template>
