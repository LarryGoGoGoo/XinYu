<script setup>
/**
 * @description 富文本
 */
import { computed } from 'vue'
import { convertRichText } from '@/utils'

defineOptions({
  inheritAttrs: false,
})
const { value } = defineProps(['value'])

let content = computed(() => {
  return convertRichText(value)
})
</script>

<template>
  <span>{{ content }}</span>
</template>
