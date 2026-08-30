<script setup>
/**
 * @description 表名下拉
 *
 */
import { ref } from 'vue'
import tableConfigs from '@/utils/tableConfigs'
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

const options = ref([])
getOptions()
async function getOptions() {
  let newOptions = []
  for (const tableName in tableConfigs) {
    const { comments, virtualPay, couponType } = tableConfigs[tableName].table
    if (virtualPay == '是' || couponType == '1') {
      newOptions.push({
        label: comments,
        value: tableName,
      })
    }
  }
  options.value = newOptions
}
</script>

<template>
  <el-select
    v-model="ruleForm[columnName]"
    :placeholder="`请输入${column.comments}`"
    :disabled="disabled"
    :clearable="selectAllowClear"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
