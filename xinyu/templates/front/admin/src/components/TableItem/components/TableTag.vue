<script setup>
import { ref, watchEffect } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const { value, column } = defineProps(['value', 'column'])
const actItem = ref()
watchEffect(() => {
  actItem.value = column.options.find(item => item.value == value)
})
</script>

<template>
  <el-tag v-if="actItem" :type="actItem.type" size="small">{{ actItem.label }}</el-tag>
  <template v-else>{{ value }}</template>
</template>
