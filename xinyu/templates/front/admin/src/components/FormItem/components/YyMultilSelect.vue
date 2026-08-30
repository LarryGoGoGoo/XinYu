<script setup>
/**
 * @description 下拉多选
 */
import { ref, watch } from 'vue'
import { getOptionAPI } from '@/api/common'
import { getRefConditonParams } from '@/utils/feature'
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
  selectAllowClear: {
    type: Boolean,
    default: false,
  },
})

const value = ref([])
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

const changeEvent = val => {
  ruleForm[columnName] = val.join(',')
}

watch(
  () => ruleForm[columnName],
  val => {
    // 做一层转换，字符串转数组
    value.value = val ? val.split(',') : []
  },
  { immediate: true }
)
</script>

<template>
  <el-select
    v-model="value"
    :placeholder="`请输入${column.comments}`"
    :disabled="disabled"
    :clearable="selectAllowClear"
    multiple
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
