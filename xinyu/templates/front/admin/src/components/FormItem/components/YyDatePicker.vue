<script setup>
/**
 * @description 日期
 */

import dayjs from 'dayjs'

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

let { form_showTime, formatValidation } = column
let type = form_showTime ? 'datetime' : 'date'
let valueFormat = form_showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'

// 禁止选择的日期
let disabledDate = null
switch (formatValidation) {
  case 'gt':
    // 只能选择今天之后日期
    disabledDate = current => {
      return current && current < dayjs().endOf('day')
    }
    break

  case 'ge':
    // 只能选择今天和今天之后日期
    disabledDate = current => {
      return current && current < dayjs().startOf('day')
    }
    break

  case 'lt':
    // 只能选择今天以前日期
    disabledDate = current => {
      return current && current > dayjs().startOf('day').subtract(1)
    }
    break

  case 'le':
    // 只能选择今天和以前日期
    disabledDate = current => {
      return current && current > dayjs().endOf('day')
    }
    break
}
</script>

<template>
  <el-date-picker
    v-model="ruleForm[column.columnName]"
    :type="type"
    :value-format="valueFormat"
    :placeholder="`请输入${column.comments}`"
    :disabled-date="disabledDate"
    :disabled="disabled"
  />
</template>
