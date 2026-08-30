<script setup>
/**
 * @description 个人中心
 * 含两个页签：个人信息 / 修改密码（修改密码不再单独一个菜单项）
 */
// 注册表单组件
import '@/components/FormItem/index.js'
import { reactive, ref } from 'vue'

import { getColums, getInitRules, getDisable } from '@/utils/form'
import { updateAPI } from '@/api/list'
import { getSessionAPI } from '@/api/login'
import { useUserInfo } from '@/store'
import { getAvatar } from '@/utils'
import { clearFilePath } from '@/utils/getFilePath'

import UpdatePassword from './updatePassword.vue'

// 当前表名
let tableName = localStorage.getItem('sessionTable')

const userInfoStore = useUserInfo()

const isLoading = ref(false)
// 表单实例
const ruleFormRef = ref()
// 列字段
let columns = reactive(getColums(tableName, 'center'))
// 表单数据
let ruleForm = ref({})
// 表单验证规则
let rules = reactive(getInitRules(columns))
// 禁止操作字段
let disabledColumnNames = getDisable(tableName, columns, 'center')

// 页签
const activeTab = ref('profile')

/**
 * @description 提交事件
 */
const okEvent = async () => {
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
    await updateAPI(tableName, ruleForm.value)

    // 获取图像路径
    let [avatar, username] = getAvatar(ruleForm.value, tableName)
    userInfoStore.setUserInfo({
      avatar,
      username,
    })

    // 缓存用户全部信息
    localStorage.setItem('userForm', JSON.stringify(ruleForm.value))
    // 用户头像
    localStorage.setItem('useravatar', clearFilePath(avatar))
    // 用户名
    localStorage.setItem('username', username)

    ElMessage.success('操作成功')
  } catch (error) {
    ElMessage.error(`操作失败： ${error.msg || error.message}`)
    console.log(error)
  }

  isLoading.value = false
}

// 拉取详情数据
getInfo()
async function getInfo() {
  let res = await getSessionAPI(tableName)
  ruleForm.value = res.data
}
</script>

<template>
  <div class="center-wrapper">
    <el-tabs v-model="activeTab" class="center-tabs">
      <el-tab-pane label="个人信息" name="profile">
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
              :columns=columns
              :column="column"
              :ruleForm="ruleForm"
              :tableName="tableName"
              :disabled="disabledColumnNames.includes(column.columnName)"
            />
          </el-form-item>

          <div class="btn-wrapper">
            <!-- 确认 -->
            <div class="submit-box">
              <el-button :loading="isLoading" class="submit-btn" @click="okEvent">提交</el-button>
            </div>
          </div>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="修改密码" name="password">
        <UpdatePassword />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
