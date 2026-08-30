<script setup>
/**
 * @description 试题的选项
 */
import { computed } from 'vue'
defineOptions({
  inheritAttrs: false,
})

const { value, column } = defineProps(['value', 'column'])
let optionText = computed(() => {
  if (!value) {
    return ''
  }
  try {
    return JSON.parse(value)
      .map(item => {
        if (item.score !== undefined) {
          return item.text + '(' + item.score + '分)'
        }

        return item.text
      })
      .join(',')
  } catch (error) {
    return ''
  }
})
</script>

<template>
  <span>{{ optionText }}</span>
</template>
