<script setup>
/**
 * @description 下拉联动
 */
import { ref, watch } from 'vue'
import { getOptionAPI, getFollowAPI } from '@/api/common'
import { getRefConditonParams } from '@/utils/feature'
defineOptions({
  inheritAttrs: false,
})
const { columns, column, ruleForm, disabled, selectAllowClear } = defineProps({
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
  selectAllowClear: {
    type: Boolean,
    default: false,
  },
})
let { columnName } = column

initOptions()
/**
 * @description 初始化 联动选项
 * 1. 只需要更新 level=1 的选项
 */
async function initOptions() {
  let { level, refTable, refColumn } = column

  if (level !== 1) return

  let res = await getOptionAPI(refTable, refColumn)
  let newOptions = res.data.map(item => ({ value: item, label: item }))

  column.options = newOptions
}

/**
 * @description 更新 联动选项
 * 1. 只需要更新 下一级(当前level + 1) 的选项
 */
async function updateOptions() {
  // 是否有下一级联动
  let nextLevel = column.level + 1
  let nextColumn = columns.find(column => column.level === nextLevel)
  if (!nextColumn) return

  // 当前的字段名和字段值
  let conditionColumn = column.refColumn
  let conditionValue = ruleForm[columnName]

  let { refTable, refColumn } = nextColumn
  let apiParams = getRefConditonParams(nextColumn, ruleForm)
  let res = await getOptionAPI(refTable, refColumn, {
    conditionColumn,
    conditionValue,
    ...apiParams,
  })
  let newOptions = res.data.map(item => ({ value: item, label: item }))
  nextColumn.options = newOptions
}
watch(
  () => ruleForm[columnName],
  () => {
    updateOptions()
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <el-select
    v-model="ruleForm[column.columnName]"
    :placeholder="`请输入${column.comments}`"
    :disabled="disabled"
    :clearable="selectAllowClear"
  >
    <el-option
      v-for="item in column.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
