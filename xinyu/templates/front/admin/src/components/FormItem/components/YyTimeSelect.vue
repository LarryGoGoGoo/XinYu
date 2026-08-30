<script setup>
/**
 * @description 时间下拉
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
  <el-time-select
    v-model="ruleForm[column.columnName]"
    start="00:00"
    step="00:10"
    end="23:50"
  />
</template>
