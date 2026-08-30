<script setup>
/**
 * @description 中译英,英译中
 */

import { getAudioRecogizeAPI } from '@/api/common'

defineOptions({
  inheritAttrs: false,
})
const { column, ruleForm, disabled } = defineProps({
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
})
let { faceMatch, columnName } = column

let initText = '' // 翻译前的文本
const translateEvent = async () => {
  let loading = ElMessage({
    type: 'info',
    duration: 0,
    message: '翻译中...',
  })

  try {
    initText = ruleForm[columnName] // 缓存
    let params = {
      from: 'auto',
      to: faceMatch === '中译英' ? 'en' : 'zh',
      t: initText,
    }
    let res = await getAudioRecogizeAPI(params)
    ruleForm[columnName] = res.data

    ElMessage.success('翻译成功')
  } catch (error) {
    ElMessage.success('翻译失败')
  }

  loading.close()
}
const resetEvent = async () => {
  ruleForm[columnName] = initText
}
</script>

<template>
  <div class="textarea-header">
    <el-button type="primary" size="small" plain @click="translateEvent">翻译</el-button>
    <el-button size="small" plain @click="resetEvent">还原</el-button>
  </div>

  <el-input
    v-model="ruleForm[columnName]"
    type="textarea"
    :disabled="disabled"
    :rows="4"
  ></el-input>
</template>
