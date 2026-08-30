<script setup>
/**
 * @description Switch开关
 * 1: active激活
 * 0: inactive未激活
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
  <el-switch
    v-model="ruleForm[column.columnName]"
    inline-prompt
    :active-value="column.options[1].value"
    :inactive-value="column.options[0].value"
    :active-text="column.options[1].label"
    :inactive-text="column.options[0].label"
    :disabled="disabled"
  />
</template>
