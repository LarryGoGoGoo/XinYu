<script setup>
import { computed } from 'vue'
defineOptions({
  inheritAttrs: false,
})
const { value } = defineProps(['value'])

let content = computed(() => {
  let list = []

  try {
    list = JSON.parse(value) || []
  } catch (error) {}
  return list.map((item, index) => index + 1 + '. ' + item.content).join(';')
})
</script>

<template>
  <span>{{ content }}</span>
</template>
