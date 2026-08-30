<script setup>
/**
 * @description 富文本编辑
 */

import { nextTick, onMounted, onUnmounted, useTemplateRef, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.core.css'
import Quill from 'quill'

import base from '@/utils/base'
const baseUrl = base.get().url
const action = baseUrl + 'file/upload'
const headers = {
  Token: localStorage.getItem('Token'),
}

defineOptions({
  inheritAttrs: false,
})
const { column, ruleForm, disabled } = defineProps({
  column: {
    type: Object,
    required: true,
  },
  ruleForm: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
let { columnName, comments } = column

const options = {
  readOnly: disabled,
  modules: {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
        ['blockquote', 'code-block'], // 引用  代码块
        [{ header: 1 }, { header: 2 }], // 1、2 级标题
        [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
        [{ script: 'sub' }, { script: 'super' }], // 上标/下标
        [{ indent: '-1' }, { indent: '+1' }], // 缩进
        // [{'direction': 'rtl'}],                         // 文本方向
        [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
        [{ font: [] }], // 字体种类
        [{ align: [] }], // 对齐方式
        ['clean'], // 清除文本格式
        ['link', 'image', 'video'], // 链接、图片、视频
      ],
      handlers: {
        image: imageHandler,
      },
    },
  },
  theme: 'snow',
  placeholder: '请输入' + comments,
}

const qlRef = useTemplateRef('qlRef')
let quill = null

// ----------------------------------
// ---------- 自定义图片 -------------
// ----------------------------------
const uploadRef = useTemplateRef('uploadRef') //文件上传ref
// 自定图片上传
function imageHandler(value) {
  value ? uploadRef.value.click() : quill.format('image', false)
}
// 图片上传成功事件
function handleSuccess(res, file, fileList) {
  let fileUrl = baseUrl + 'upload/' + res.file
  let length = quill.getSelection().index
  quill.insertEmbed(length, 'image', fileUrl, 'user')
  quill.setSelection(length + 1)
}

// 同步表单值
const textChangeHander = (delta, oldDelta, source) => {
  source == 'user' && setFormValue()
}
const setFormValue = useDebounceFn(() => {
  let newText = quill.root.innerHTML
  // 为空时转为空字符串
  newText = newText == '<p><br></p>' ? '' : newText
  ruleForm[columnName] = newText
}, 200)

// 同步编辑器的内容
const setQuillContent = htmlContent => {
  if (!quill) return

  // 保存当前光标位置
  const selection = quill.getSelection()

  // 清空编辑器
  quill.setText('')

  // 设置 HTML 内容
  quill.clipboard.dangerouslyPasteHTML(0, htmlContent)

  // 恢复光标位置
  if (selection) {
    nextTick(() => {
      quill.setSelection(selection.index, selection.length)
    })
  }
}

watch(
  () => ruleForm[columnName],
  () => {
    if (ruleForm[columnName] == quill.root.innerHTML) {
      return
    }
    setQuillContent(ruleForm[columnName])
  }
)
onMounted(() => {
  quill = new Quill(qlRef.value, options)
  setQuillContent(ruleForm[columnName])
  quill.on('text-change', textChangeHander)
})

onUnmounted(() => {
  quill.off('text-change', textChangeHander)
  quill = null
})
</script>

<template>
  <div class="ql">
    <div ref="qlRef"></div>
  </div>
  <el-upload
    style="display: none"
    :action="action"
    :headers="headers"
    :on-success="handleSuccess"
    :show-file-list="false"
  >
    <span ref="uploadRef"></span>
  </el-upload>
</template>

<style>
.ql {
  background-color: #fff;
  width: 100%;
}
</style>
