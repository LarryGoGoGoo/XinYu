<script setup>
/**
 * @description 数字输入框
 */
import { onBeforeMount } from 'vue'

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

let { columnName, formatValidation } = column
onBeforeMount(() => {
  // 初始值需要数值类型
  // 如果ruleForm[column.columnName]没有值，设置为0
  if (!ruleForm[columnName]) {
    ruleForm[columnName] = 0
  }
})
</script>

<template>
  <el-input-number
    v-if="formatValidation == '数'"
    :precision="0"
    v-model="ruleForm[columnName]"
    :disabled="disabled"
  />
  <el-input-number v-else v-model="ruleForm[columnName]" :disabled="disabled">
    <template #prefix v-if="columnName == 'money'">
      <span>￥</span>
    </template>
  </el-input-number>
</template>
