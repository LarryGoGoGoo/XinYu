<script setup>
/**
 * @description 文件/图片
 */

const props = defineProps(['row', 'tableName', 'column', 'value'])
let tableTypeName = props.row.type == 1 ? 'TableImage' : 'TableFile'
</script>

<template>
  <component :is="tableTypeName" v-bind="props" />
</template>
