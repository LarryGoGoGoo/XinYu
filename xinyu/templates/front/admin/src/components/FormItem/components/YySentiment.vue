<script setup>
/**
 * @description 情感分析
 */

import { getImageRecogizeAPI } from '@/api/common'
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
let { columnName } = column
const isLoading = ref(false)

const sentimentEvent = async () => {
  let loading = ElMessage({
    type: 'info',
    duration: 0,
    message: '分析中...',
  })
  isLoading.value = true

  try {
    let params = {
      text: ruleForm[columnName],
    }
    let { data } = await getImageRecogizeAPI(tableName, null, 'sa', params)

    let resultColumn = columns.find(column => column.faceMatch === '情分' && column.type === '普')
    if (resultColumn) {
      let iconMap = {
        正向: '😀',
        中性: '😐',
        负向: '☹️',
      }
      ruleForm[resultColumn.columnName] = '您的情感偏' + data.sentiment + iconMap[data.sentiment]
    }

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
      type="primary"
      size="small"
      plain
      :loading="isLoading"
      @click="sentimentEvent"
    >
      分析
    </el-button>
  </div>

  <el-input
    v-model="ruleForm[columnName]"
    type="textarea"
    :disabled="disabled"
    @change="sentimentEvent"
    :rows="4"
  ></el-input>
</template>
