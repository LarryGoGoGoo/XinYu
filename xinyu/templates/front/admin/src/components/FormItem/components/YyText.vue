<script setup>
/**
 * @description 普通文本框
 */

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
</script>

<template>
  <el-input
    v-model="ruleForm[column.columnName]"
    :placeholder="`请输入${column.comments}`"
    :disabled="disabled"
    clearable
  />
</template>
