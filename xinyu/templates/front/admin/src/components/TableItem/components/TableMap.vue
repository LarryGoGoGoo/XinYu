<script setup>
/**
 * @description 地图位置
 * 格式1: lng;lat;address
 * 格式2: address
 */
import { ref, watchEffect } from 'vue'

defineOptions({
  inheritAttrs: false,
})
const { value, column } = defineProps(['value', 'column'])
let columnName = column.columnName
let text = ref('')
watchEffect(() => {
  if (!value) {
    text.value = ''
    return
  }

  if (columnName == 'fulladdress') {
    text.value = value
  } else {
    text.value = value.split(';')[2]
  }
})
</script>

<template>
  <span>{{ text }}</span>
</template>
