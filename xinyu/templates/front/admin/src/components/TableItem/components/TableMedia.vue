<script setup>
import { getFirstFilePath } from '@/utils/getFilePath'

/**
 * @description 文件
 */
defineOptions({
  inheritAttrs: false,
})
const { value } = defineProps(['value'])

const clickEvent = () => {
  window.open(getFirstFilePath(value))
}
</script>

<template>
  <div class="table-file">
    <el-link v-if="value" type="primary" @click="clickEvent">预览</el-link>
    <el-text v-else type="info">没有媒体</el-text>
  </div>
</template>

<style></style>
