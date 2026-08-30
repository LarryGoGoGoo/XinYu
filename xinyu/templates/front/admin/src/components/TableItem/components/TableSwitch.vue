<script setup>
import { updateAPI } from '@/api/list'

/**
 * @description 开关切换
 */
defineOptions({
  inheritAttrs: false,
})
const { column, row, tableName } = defineProps(['row', 'tableName', 'column'])
const changeEvent = () => {
  updateAPI(tableName, row)
}
</script>

<template>
  <el-switch
    v-model="row[column.columnName]"
    inline-prompt
    :active-value="column.options[1].value"
    :inactive-value="column.options[0].value"
    :active-text="column.options[1].label"
    :inactive-text="column.options[0].label"
    @change="changeEvent"
  />
</template>
