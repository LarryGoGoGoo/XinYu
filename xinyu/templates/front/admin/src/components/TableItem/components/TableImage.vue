<script setup>
import { getFilePaths } from '@/utils/getFilePath'
import base from '@/utils/base'
import { computed } from 'vue'

/**
 * @description 图片
 */
defineOptions({
  inheritAttrs: false,
})
const { value, tableName } = defineProps(['value', 'tableName'])

let srcList = computed(() => {
  if (tableName == 'qrcode') {
    return [base.get().url + 'qrcode?content=' + value]
  }
  return getFilePaths(value)
})
</script>

<template>
  <el-image
    class="table-image"
    preview-teleported
    :src="srcList[0]"
    :preview-src-list="srcList"
    show-progress
    fit="cover"
  />
</template>

<style></style>
