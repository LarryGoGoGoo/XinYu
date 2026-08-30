<script setup>
/**
 * @description 邮箱
 */
import { sendEmailAPI, sendSmsAPI } from '@/api/login'
import { ref } from 'vue'
defineOptions({
  inheritAttrs: false,
})
const { column, ruleForm, disabled, tableName, customAPI } = defineProps({
  column: {
    type: Object,
    required: true,
  },
  ruleForm: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tableName: {
    type: String,
  },
  customAPI: {},
})

let columnName = column.columnName
const isCounting = ref(true)
const deadline = ref(0)
// 发送验证码
const sendemailcode = async () => {
  // [1] 校检邮箱是否正确

  let text = ruleForm[columnName]
  if (columnName == 'email') {
    if (!text) {
      ElMessage.error('请输入邮箱')
      return
    }
    if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(text)) {
      ElMessage.error('请输入正确的邮箱')
      return
    }
  } else {
    if (!text) {
      ElMessage.error('请输入手机号')
      return
    }
    if (!/^1[3456789]\d{9}$/.test(text)) {
      ElMessage.error('请输入正确的手机号')
      return
    }
  }

  try {
    // [2] 后端请求发送验证码
    let api
    if (customAPI) {
      api = customAPI
    } else {
      api = columnName == 'email' ? sendEmailAPI : sendSmsAPI
    }

    await api(tableName, text)

    // [3] 按钮变化 + 倒计时60秒
    isCounting.value = true
    deadline.value = Date.now() + 1000 * 60

    ElMessage.success('发送成功')
  } catch (error) {
    ElMessage.error(error.msg || error.message || '发送失败')
    console.error(error)
  }
}
</script>

<template>
  <el-input
    v-model="ruleForm[columnName]"
    :placeholder="`请输入${column.comments}`"
    :disabled="disabled"
    clearable
    class="emial-input"
  >
    <template #append>
      <el-countdown
        v-if="isCounting"
        format="ss秒"
        :value="deadline"
        @finish="isCounting = false"
      />
      <el-button v-else @click="sendemailcode">发送验证码</el-button>
    </template>
  </el-input>
</template>
