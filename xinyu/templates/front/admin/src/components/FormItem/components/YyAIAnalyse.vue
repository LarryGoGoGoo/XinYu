<script setup>
/**
 * @description I数据分析
 */

import { commonTableAPI } from '@/api/common'
import { ref } from 'vue'

defineOptions({
  inheritAttrs: false,
})
const { columns, column, ruleForm, disabled, tableName } = defineProps({
  columns: {
    type: Array,
    required: true,
  },
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
})
let { columnName, comments, colLength } = column
const isLoading = ref(false)

const analyseEvent = async () => {
  let loading = ElMessage({
    type: 'info',
    duration: 0,
    message: 'AI分析中...',
  })
  isLoading.value = true

  try {
    let ask = ''

    let columns_DS = columns.filter(column => column.faceMatch == 'DS' && column.type != 'AI多')
    columns_DS.forEach(column => {
      let { columnName, comments } = column
      ask += comments + ' ' + ruleForm[columnName] + '，'
    })

    ask += '的' + comments + '，' + '控制在' + colLength + '字内'

    let { data } = await commonTableAPI({
      url: 'deepseek/askai',
      method: 'post',
      data: {
        ask,
      },
    })

    ruleForm[columnName] = data

    ElMessage.success('分析成功')
  } catch (error) {
    ElMessage.error('分析失败')
  }

  loading.close()
  isLoading.value = false
}
</script>

<template>
  <div class="textarea-header">
    <el-button
      :loading="isLoading"
      type="primary"
      size="small"
      plain
      :disabled="disabled"
      @click="analyseEvent"
    >
      AI分析
    </el-button>
  </div>

  <el-input
    v-model="ruleForm[columnName]"
    type="textarea"
    :disabled="disabled"
    :rows="4"
  ></el-input>
</template>
