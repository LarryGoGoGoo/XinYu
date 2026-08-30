<script setup>
import { commonTableAPI } from '@/api/common'
import { downloadFile } from '@/utils'
import { computed } from 'vue'
/**
 * @description 文件
 */
defineOptions({
  inheritAttrs: false,
})

const { column, row, tableName, value } = defineProps(['row', 'tableName', 'column', 'value'])
function downloadEvent() {
  if (hasEncrytion && /_encrypt/.test(value)) {
    ElMessage.error('请先解密')
    return
  }
  downloadFile(value)
}

// ----------------------------------
// ---------- 文件加密 ---------------
// ----------------------------------
let { encryption, type } = column
let hasEncrytion = encryption != '' && encryption != '无' && type == '文'

async function decryptionEvent() {
  try {
    let fileName = value

    let { file: unlockedFileName } = await commonTableAPI({
      url: 'file/decrypt',
      method: 'post',
      params: {
        fileName: fileName.replace('upload/', ''),
        type: encryption,
      },
    })

    row[column.columnName] = unlockedFileName
    ElMessage.success('解密成功')
  } catch (error) {
    ElMessage.error(error.message || error.msg || '出错了')
  }
}

// 是否已解密
const isDecrypted = computed(() => {
  return hasEncrytion && value && !/_encrypt/.test(value)
})
</script>

<template>
  <div class="table-file">
    <template v-if="value">
      <el-link type="primary" @click="downloadEvent">下载</el-link>
      <el-button
        v-if="hasEncrytion"
        style="margin-left: 20px"
        size="small"
        icon="Unlock"
        plain
        :disabled="isDecrypted"
        @click="decryptionEvent"
      >
        {{ isDecrypted ? '未加密' : '解密' }}
      </el-button>
    </template>

    <el-text v-else type="info">没有文件</el-text>
  </div>
</template>

<style></style>
