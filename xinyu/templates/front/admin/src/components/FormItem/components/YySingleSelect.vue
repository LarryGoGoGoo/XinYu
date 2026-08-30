<script setup>
/**
 * @description 下拉单选
 *
 */
import { ref } from 'vue'
import { getOptionAPI } from '@/api/common'
import { getRefConditonParams } from '@/utils/feature'
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
let { refTable, refColumn, columnName } = column

getOptions()
async function getOptions() {
  let list = []
  if (refTable && refColumn) {
    let apiParams = getRefConditonParams(column, ruleForm)
    let res = await getOptionAPI(refTable, refColumn, apiParams)
    list = res.data.map(item => ({ value: item, label: item }))
    column.options = list
  }
}
</script>

<template>
  <el-select
    v-model="ruleForm[columnName]"
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
