<script setup>
/**
 * @description 姓名脱敏表格组件
 * 管理员（sessionTable=users）展示完整姓名；其余角色（医生/用户等）右侧列展示脱敏。
 * 通过 column.isMask 控制是否启用脱敏；未配置 isMask 时保持原样。
 */
import { computed } from 'vue'
import { maskName, isAdminSession } from '@/utils/mask'

defineOptions({
  inheritAttrs: false,
})

const { value, column } = defineProps({
  value: [String, Number],
  column: Object,
  row: Object,
  tableName: String,
})

const text = computed(() => {
  if (!column || !column.isMask) return value
  // 管理员查看全名，其余角色脱敏
  return isAdminSession() ? value : maskName(value)
})
</script>

<template>
  <span>{{ text }}</span>
</template>
