<script setup>
/**
 * @description 下拉单选 + 试卷名
 * paperid papername
 * exampaperid exampapername
 */
import { getPageAPI } from '@/api/list'

defineOptions({
  inheritAttrs: false,
})

const { column, ruleForm, disabled, selectAllowClear } = defineProps({
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

getOptions()
async function getOptions() {
  let res = await getPageAPI('exampaper', {
    page: 1,
    limit: 9999,
  })
  column.options = res.data.list.map(item => {
    return {
      value: item.id,
      label: item.name,
    }
  })
}
// 同步修改 试卷名 papername
const changeEvent = newValue => {
  let item = column.options.find(item => item.value === newValue)
  if (columnName == 'paperid') {
    ruleForm.papername = item.label
  } else {
    ruleForm.exampapername = item.label
  }
}
</script>

<template>
  <el-select
    v-model="ruleForm[columnName]"
    placeholder="请选择试卷"
    :disabled="disabled"
    :clearable="selectAllowClear"
    @change="changeEvent"
  >
    <el-option
      v-for="item in column.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
