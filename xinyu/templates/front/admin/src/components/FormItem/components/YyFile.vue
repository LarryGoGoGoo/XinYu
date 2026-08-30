<script setup>
/**
 * @description 图片(+识别功能)、文件、音频、视频等上传组件
 */

import { ref, watch, computed } from 'vue'

import base from '@/utils/base'
import { getFilePaths, getFilePath, clearFilePath } from '@/utils/getFilePath'
import { downloadFile } from '@/utils'
import { commonTableAPI, getImageRecogizeAPI } from '@/api/common'

defineOptions({
  inheritAttrs: false,
})
const baseUrl = base.get().url
const action = baseUrl + 'file/upload'
const headers = {
  Token: localStorage.getItem('Token'),
}

const { columns, column, ruleForm, disabled, tableName } = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  column: {
    type: Object,
    required: true,
  },
  ruleForm: {
    type: Object,
    required: true,
  },
  tableName: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
let { type, columnName, imageRecognize, faceMatch, encryption, comments } = column

const yyFileList = ref([])
const previewSrc = ref([])
const showPreview = ref(false)
const initialIndex = ref(0)

// 根据类型设置不同的展示方式
let listType = column.type == '图' ? 'picture-card' : 'text'

/**
 * @description 预览事件
 * 1. 图片：全屏预览
 * 2. 文件：下载
 * 3. 音频、视频：弹出播放器
 * @param file
 */
function handlePictureCardPreview(file) {
  if (disabled) {
    return
  }
  if (type === '图') {
    // 图片预览
    previewSrc.value = yyFileList.value.map(item => item.url)

    initialIndex.value = yyFileList.value.findIndex(item => item.url === file.url)
    showPreview.value = true
    return
  }

  // 音频、视频，新开窗口打开
  if (type == '视' || type == '音') {
    window.open(file.url, '_blank')
    return
  }

  // 文件下载
  if (type == '文') {
    let url = clearFilePath(file.url)
    downloadFile(url)
    return
  }
}

// 移除
function handleRemove(file, fileList) {
  // 修改表单ruleForm (会通过watch再次触发修改本地的fileList )
  ruleForm[columnName] = fileList.map(file => clearFilePath(file.url)).join(',')
}

// 上传失败
function handleError(err, file, fileList) {
  ElMessage.error('上传失败')
  console.error('上传失败', err)
}

// 上传成功
function handleSuccess(response, file, fileList) {
  fileList[fileList.length - 1]['url'] = 'upload/' + response.file

  // 修改本地的fileList
  let newFileList = fileList.map(item => {
    let url = getFilePath(item.url)
    return {
      name: url.split('/').pop(), // 获取文件名
      url, // 设置文件的URL
    }
  })
  yyFileList.value = newFileList

  // 修改表单ruleForm (会通过watch再次触发修改本地的fileList )
  ruleForm[columnName] = newFileList.map(file => clearFilePath(file.url)).join(',')

  // 识图
  imageRecognize && recognizeEvent(response.file)
}

// 超过限制数量
function handleExceed(files, fileList) {
  ElMessage.warning(`当前限制选择 ${column.formMaxCount} 个文件`)
}

watch(
  () => ruleForm[columnName],
  val => {
    if (!val) {
      yyFileList.value = []
      return
    }

    let newFileList = getFilePaths(val).map(item => {
      return {
        name: item.split('/').pop(),
        url: item,
      }
    })

    yyFileList.value = newFileList
  },
  { immediate: true }
)

// ----------------------------------
// ---------- 文件加密 ---------------
// ----------------------------------
let hasEncrytion = encryption != '' && encryption != '无' && type == '文'
let isLoading_encrytion = ref(false)
// 是否已加密
const isEncrypted = computed(() => {
  let fileName = ruleForm[columnName]
  return hasEncrytion && fileName && /_encrypt/.test(fileName)
})
// 禁止
const disabled_encrytion = computed(() => {
  return disabled || isEncrypted.value || !ruleForm[columnName]
})
async function encryptionEvent() {
  isLoading_encrytion.value = true
  try {
    let fileName = ruleForm[columnName]
    if (!fileName) {
      throw new Error('文件不存在，请先上传')
    }

    let { file: lockedFileName } = await commonTableAPI({
      url: 'file/encrypt',
      method: 'post',
      params: {
        fileName: fileName.replace('upload/', ''),
        type: encryption,
      },
    })

    ruleForm[columnName] = lockedFileName
    ElMessage.success('加密成功')
  } catch (error) {
    ElMessage.error(error.message || error.msg || '出错了')
  }
  isLoading_encrytion.value = false
}

// ----------------------------------
// ---------- 图片识别 ---------------
// ----------------------------------
const typeMap = {
  文字: 'ocr',
  动物: 'animal',
  植物: 'plant',
  菜品: 'dish',
  汽车: 'car',
  通识: 'advancedGeneral',
  人数: 'bodyNum',
  短音识: 'asr',
  垃圾: 'rubbish',
  英图中: 'pictrans',
  中图英: 'pictrans',
  CNN: 'cnn',
}
const funcMap = {
  文字: ocr,
  短音识: ocr,
  动物: common,
  植物: common,
  菜品: common,
  汽车: car,
  通识: advancedGeneral,
  人数: bodyNum,
  垃圾: rubbish,
  英图中: pictrans,
  中图英: pictrans,
  CNN: cnn,
}
async function recognizeEvent(fileName) {
  let loading = ElMessage({
    type: 'info',
    duration: 0,
    message: '识别图片中...',
  })
  try {
    let type = typeMap[faceMatch]
    let params = {}

    switch (faceMatch) {
      case '英图中':
        params = {
          from: 'auto',
          to: 'zh',
        }
        break

      case '中图英':
        params = {
          from: 'auto',
          to: 'en',
        }
        break
    }
    let { data } = await getImageRecogizeAPI(tableName, fileName, type, params)

    // 同faceMatch值
    let faceColumns = columns.filter(column => column.faceMatch == faceMatch)

    funcMap[faceMatch](faceColumns, data)

    ElMessage.success('识别成功')
  } catch (error) {
    ElMessage.error(`识别失败,原因: ${error.msg || error.message}`)
  }

  loading.close()
}
// 赋值方法
function ocr(faceColumns, data) {
  faceColumns.forEach(column => {
    let { type, columnName } = column
    switch (true) {
      case type == '普':
        ruleForm[columnName] = data
        break
    }
  })
}

function common(faceColumns, data) {
  let url = data.baike_info?.baike_url || ''
  let keyword = data.name || ''
  let description = data.baike_info?.description || ''

  faceColumns.forEach(column => {
    let { type, formatValidation, columnName } = column
    switch (true) {
      case type == '普' && formatValidation == '网':
        ruleForm[columnName] = url
        break

      case type == '编':
        ruleForm[columnName] = description
        break

      case type == '普':
        ruleForm[columnName] = keyword
        break
    }
  })
}

function car(faceColumns, data) {
  let url = data.baike_info.baike_url || ''
  let keyword = data.name || ''
  let description = data.baike_info.description || ''
  let year = data.year

  faceColumns.forEach(column => {
    let { type, formatValidation, columnName } = column
    switch (true) {
      case type == '普' && formatValidation == '网':
        ruleForm[columnName] = url
        break

      case type == '普' && columnName == 'year':
        ruleForm[columnName] = year
        break

      case type == '编':
        ruleForm[columnName] = description
        break

      case type == '普':
        ruleForm[columnName] = keyword
        break
    }
  })
}

function advancedGeneral(faceColumns, data) {
  let url = data.baike_info.baike_url || ''
  let keyword = data.keyword || ''
  let description = data.baike_info.description || ''
  let [level1, level2] = data.root.split('-')
  let levelNum = 1
  faceColumns.forEach(column => {
    let { type, formatValidation, level, columnName } = column
    switch (true) {
      case type == '普' && formatValidation == '网':
        ruleForm[columnName] = url
        break

      // 兼容没有level模式，第一个下
      case type == '下' && levelNum == 1:
        ruleForm[columnName] = level1
        levelNum += 1
        break

      case type == '下' && level == 1:
        ruleForm[columnName] = level1
        break

      // 兼容没有level模式，第二个下
      case type == '下' && levelNum == 2:
        levelNum += 1
        ruleForm[columnName] = level2
        break

      case type == '下' && level == 2:
        ruleForm[columnName] = level2
        break

      case type == '编':
        ruleForm[columnName] = description
        break

      case type == '普':
        ruleForm[columnName] = keyword
        break
    }
  })
}
function bodyNum(faceColumns, data) {
  faceColumns.forEach(column => {
    let { type, formatValidation, columnName } = column
    switch (true) {
      case type == '普' && formatValidation == '数':
        ruleForm[columnName] = data
        break
    }
  })
}

function rubbish(faceColumns, data) {
  let rubbish = data.rubbish || ''
  let category = data.category || ''

  faceColumns.forEach(column => {
    let { type, columnName } = column
    switch (true) {
      case type == '下':
        ruleForm[columnName] = category
        break

      case type == '普':
        ruleForm[columnName] = rubbish
        break
    }
  })
}

function pictrans(faceColumns, data) {
  faceColumns.forEach(column => {
    let { type, columnName } = column
    switch (true) {
      case type == '多':
        ruleForm[columnName] = data
        break
    }
  })
}
function cnn(faceColumns, data) {
  faceColumns.forEach(column => {
    let { type, columnName } = column
    switch (true) {
      case type == '普':
        ruleForm[columnName] = data.keyword || ''
        break
    }
  })  
}
</script>

<template>
  <div class="lock-box" style="width: 100%">
    <el-button
      v-if="hasEncrytion"
      :loading="isLoading_encrytion"
      type="primary"
      size="small"
      icon="Lock"
      plain
      :disabled="disabled_encrytion"
      @click="encryptionEvent"
    >
      {{ isEncrypted ? '已加密' : '加密' }}
    </el-button>
  </div>

  <el-upload
    class="yyfile"
    v-model:file-list="yyFileList"
    :disabled="disabled"
    :action="action"
    :headers="headers"
    :accept="column.form_accept"
    :limit="column.formMaxCount"
    :list-type="listType"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceed"
  >
    <el-icon>
      <Plus />
    </el-icon>
    <template #tip>
      <div v-if="!ruleForm[columnName]" class="el-upload__tip">请点击上传{{ comments }}</div>
    </template>
  </el-upload>

  <!-- 图片预览 -->
  <el-image-viewer
    v-if="showPreview"
    :url-list="previewSrc"
    show-progress
    :initial-index="initialIndex"
    @close="showPreview = false"
    :teleported="true"
  />
</template>
<style lang="scss">
.yyfile:has(.el-upload-list--text) {
  width: 100%;
}
</style>
