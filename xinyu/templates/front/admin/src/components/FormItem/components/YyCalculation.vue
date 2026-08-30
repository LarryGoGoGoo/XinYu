<script setup>
/**
 * @description 计算规则
 * c:  数值运算
 * d1: 时间差天数 YYYY-MM-DD:HH:mm:ss
 * d2: 时间差天数 YYYY-MM-DD 相同日期为一天
 * h:  时间差小时
 * m:  时间差分钟
 */
import { ref, watchEffect } from 'vue'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjs from 'dayjs'
dayjs.extend(isSameOrAfter)

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
const { calcutationStr, calcutationType, columnName } = column
const isNumberType = ref(true)
watchEffect(() => {
  let result, list, date1, date2, key1, key2

  switch (calcutationType) {
    case 'c':
      result = new Function('c', `return ${calcutationStr}`)(ruleForm)
      if (typeof result === 'number') {
        isNumberType.value = true
        ruleForm[columnName] = Number.isNaN(result) ? 0 : Number(result.toFixed(2))
      } else {
        isNumberType.value = false
        ruleForm[columnName] = result
      }

      break

    case 'd1':
    case 'd2':
    case 'h':
    case 'm':
      isNumberType.value = true
      list = calcutationStr.split('-')
      key1 = list[0].split(calcutationType + '.')[1]
      key2 = list[1].split(calcutationType + '.')[1]
      date1 = dayjs(ruleForm[key1])
      date2 = dayjs(ruleForm[key2])

      if (date1.isAfter(date2)) {
        ruleForm[columnName] = 0
        return
      }
      let mode = {
        d1: 'day',
        d2: 'day',
        h: 'hour',
        m: 'minute',
      }

      // 浮点数
      result = date2.diff(date1, mode[calcutationType], true)

      // d2特殊: 2025-12-08 ~ 2025-12-08 计算为1天 2025-12-08 ~ 2025-12-09 计算为2天
      if (calcutationType == 'd2') {
        result += 1
      }

      // 向上取整
      result = Math.ceil(result)

      ruleForm[columnName] = result || 0
      break
  }
})
</script>

<template>
  <el-input-number v-if="isNumberType" v-model="ruleForm[column.columnName]" :disabled="true" />
  <el-input v-else v-model="ruleForm[column.columnName]" :disabled="true" />
</template>
