<script setup>
/**
 * @description 下拉单选2 + 随功能
 *
 */
import { ref } from 'vue'
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

async function changeEvent(newValue) {
  let { refTable, refColumn } = column
  let { data } = await getFollowAPI(refTable, refColumn, newValue)

  // 该字段后面的随、且是连续的
  let flag = false
  let columns_sui = columns.filter(column => {
    let { type, columnName: columnName_sui } = column
    if (flag) {
      if (type == '随') {
        return true
      } else {
        flag = false
      }
    }
    if (columnName_sui == columnName) {
      flag = true
    }
    return false
  })

  // 修改 type == '随' 的值
  columns_sui.forEach(column => {
    let { columnName } = column
    ruleForm[columnName] = data[columnName]
  })
}
</script>

<template>
  <el-select
    v-model="ruleForm[columnName]"
    :placeholder="`请输入${column.comments}`"
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
