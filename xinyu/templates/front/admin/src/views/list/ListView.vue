<script setup>
import { getColums } from '@/utils/form'
import { useRoute } from 'vue-router'
const route = useRoute()
/**
 * @description 查看组件
 */

defineOptions({
  inheritAttrs: false,
})
const { tableName, data } = defineProps(['tableName', 'data'])
let { row } = data
const columns = getColums(tableName, 'view', { configType: route.params.type })

/**
 * @description 计算spanList
 * 1.富文本默认占据两列
 * 2.如果富文本在偶数位置，则上一个也为两列
 */
const spanList = []
for (let index = 0; index < columns.length; index++) {
  if (columns[index].form_type == 'YyQuill') {
    spanList[index - 1] && (spanList[index - 1] = 2)
    spanList.push(2)
  } else {
    spanList.push(1)
  }
}
</script>

<template>
  <el-descriptions border label-width="160" :column="2">
    <el-descriptions-item
      v-for="(column, index) in columns"
      :label="column.comments"
      :key="column.columnName"
      :span="spanList[index]"
    >
      <!-- 富文本 -->
      <template v-if="column.form_type == 'YyQuill'">
        <div class="ql-snow ql-editor" v-html="row[column.columnName]"></div>
      </template>
      <!-- 根据table_type渲染 -->
      <component
        v-else-if="column.table_type"
        :is="column.table_type"
        :tableName="tableName"
        :row="row"
        :column="column"
        :value="row[column.columnName]"
        :isView="true"
      />
      <template v-else>{{ row[column.columnName] }}</template>
    </el-descriptions-item>
  </el-descriptions>
</template>
<style>
.el-descriptions__table {
  table-layout: fixed;
}
</style>
