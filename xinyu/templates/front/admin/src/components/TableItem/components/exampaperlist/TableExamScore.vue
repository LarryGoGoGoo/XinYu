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

let text = computed(() => {
  let { ismark, myscore } = row
  return ismark != 0 ? '批卷中' : myscore
})
let type = computed(() => {
  let { ismark, myscore } = row
  return ismark != 0 ? 'warning' : myscore == 0 ? 'danger' : 'success'
})
</script>

<template>
  <el-tag :type="type" size="small">{{ text }}</el-tag>
</template>
