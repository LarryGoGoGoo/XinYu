<script setup>
/**
 * @description 类型下拉单选
 */
import { watch } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const { columns, column, ruleForm, disabled } = defineProps({
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
  disabled: {
    type: Boolean,
    default: false,
  },
})
let { columnName } = column

// 根据option_hidden字段过滤隐藏
let options = column.options.filter(item => !item.option_hidden)

let updateEvent = (newType, oldType) => {
  // 选项
  let optionsColumn = columns.find(column => column.columnName === 'options')
  switch (newType) {
    // 单选
    case 0:
      optionsColumn.form_hidden = false
      break

    // 多选
    case 1:
      optionsColumn.form_hidden = false
      break

    // 判断
    case 2:
      optionsColumn.form_hidden = false
      ruleForm.options = JSON.stringify([
        { code: 'A', text: 'A.对' },
        { code: 'B', text: 'B.错' },
      ])
      break

    // 填空
    case 3:
      optionsColumn.form_hidden = true
      break

    // 主观
    case 4:
      optionsColumn.form_hidden = true
      ruleForm.options = JSON.stringify([]) // 占位，通过校检
      break
  }
  

  // 分数
  let scoreColumn = columns.find(column => column.columnName === 'score')
  switch (newType) {
    case 0:
      scoreColumn.form_hidden = true
      break

    case 1:
    case 2:
    case 3:
    case 4:
      scoreColumn.form_hidden = false
      break
  }
}

watch(
  () => ruleForm[columnName],
  (newType, oldType) => {
    updateEvent(newType, oldType)
  },
  { immediate: true }
)
</script>

<template>
  <el-select v-model="ruleForm[columnName]" placeholder="请输入类型">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
