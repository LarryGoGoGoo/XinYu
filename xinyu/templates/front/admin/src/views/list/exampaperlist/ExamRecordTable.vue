<script setup>
/**
 * @description 考试记录展开列表
 */

import { ref } from 'vue'

import { getPageAPI } from '@/api/list'
import { getColums } from '@/utils/form'

defineOptions({
  inheritAttrs: false,
})

let { data } = defineProps(['data'])
let { row } = data
const tableName = 'examrecord'

const datas = ref([])
const isLoading = ref(false)

let columns = getColums('examfailrecord', 'list')

fetchData()
async function fetchData() {
  isLoading.value = true
  try {
    let params = {
      limit: 9999,
      page: 1,
      paperid: row.paperid,
      userid: row.userid,
    }
    if (row.examno) {
      params.examno = row.examno
    }

    let res = await getPageAPI(tableName, params)
    datas.value = res.data.list

  } catch (error) {
    ElMessage.error(error.msg || error.message || '未知原因')
  }
  isLoading.value = false
}
</script>

<template>
  <el-table v-loading="isLoading" :data="datas" row-key="id" :border="false" show-overflow-tooltip>
    <!-- 首列配置了fixed -->
    <el-table-column
      v-for="(column, index) in columns"
      :prop="column.columnName"
      :label="column.comments"
      :key="column.columnName"
    >
      <template #default="scope">
        <component
          :is="column.table_type"
          :tableName="tableName"
          :row="scope.row"
          :column="column"
          :value="scope.row[column.columnName]"
        />
      </template>
    </el-table-column>
  </el-table>
</template>
