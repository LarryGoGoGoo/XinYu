<script setup>
/**
 * @description 富文本组件
 */
let { data } = defineProps(['data'])
</script>
<template>
  <h3>{{ data.brief }}</h3>
  <div ql-snow ql-editor v-html="data.content"></div>
</template>
