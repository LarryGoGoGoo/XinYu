<script setup>
/**
 * @description 下拉多选2 + 多随功能
 */
import { ref, watch } from 'vue'
import { getOptionAPI, getFollowAPI } from '@/api/common'
import { getRefConditonParams } from '@/utils/feature'
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

const changeEvent = async newList => {
  // 修改原值
  ruleForm[columnName] = newList.join(',')

  let datas = []
  let promiseAll = newList.map((changeValue, index) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await getFollowAPI(refTable, refColumn, changeValue)
        datas[index] = data
        resolve()
      } catch (error) {
        resolve()
      }
    })
  })
  await Promise.all(promiseAll)

  // 修改 type == '多随' 的值
  // 该字段后面的 多随、且是连续的
  let flag = false
  let columns_sui = columns.filter(column => {
    let { type, columnName: columnName_sui } = column
    if (flag) {
      if (type == '多随') {
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

  columns_sui.forEach(column => {
    let { type, columnName, formatValidation } = column

    //  alljiage --> jiage
    let name = columnName.replace(/^all/, '')

    let newValues
    if (formatValidation == '数' || formatValidation == '浮') {
      // 数值叠加
      newValues = 0
      datas.forEach(data => {
        let newValue = data[name]
        newValue !== undefined && (newValues += Number(newValue))
      })
    } else {
      // 字符串叠加
      newValues = []
      datas.forEach(data => {
        let newValue = data[name]
        newValue !== undefined && newValues.push(newValue)
      })

      newValues = newValues.join(',')
    }

    ruleForm[columnName] = newValues
  })
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
