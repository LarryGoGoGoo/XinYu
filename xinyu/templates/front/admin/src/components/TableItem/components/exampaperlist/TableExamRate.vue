<script setup>
/**
 * @description 准确率 和 错误率
 * ismark是字符串或数值 '0' 或者 '1'
 * 0: 需要批卷 1：已经批卷或者不需要批卷
 */
import { computed } from 'vue'
defineOptions({
  inheritAttrs: false,
})

const { value, column, row } = defineProps(['value', 'column', 'row'])
let { columnName } = column
let type = columnName === 'accuracy' ? 'success' : 'danger'

let text = computed(() => {
  let { ismark, accuracy } = row
  return ismark != 0
    ? '/'
    : columnName === 'accuracy'
    ? (accuracy * 100).toFixed(0) + '%'
    : ((1 - accuracy) * 100).toFixed(0) + '%'
})
</script>

<template>
  <el-tag :type="type" size="small">{{ text }}</el-tag>
</template>
