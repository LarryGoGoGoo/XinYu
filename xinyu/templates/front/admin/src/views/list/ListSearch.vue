<script setup>
/**
 * @description 列表的搜索
 */

import { nextTick, reactive, ref, computed } from 'vue'
import tableConfigs from '@/utils/tableConfigs'
// 注册表单组件
import '@/components/FormItem/index.js'
const { tableName, buttonName } = defineProps(['tableName', 'buttonName'])

const emits = defineEmits(['search'])


// 列字段
let columns = reactive(getRoleSearchColumns())
function getRoleSearchColumns() {
  let searchColumns = tableConfigs[tableName]?.searchColumns || []
  let role = localStorage.getItem('role')
  return searchColumns.filter(column => {
    let { queryFlagInput = ['是'] } = column
    return queryFlagInput.includes('是') || queryFlagInput.includes(role)
  })
}

// 表单数据
let initRuleForm = {}
columns.forEach(column => {
  let { columnName } = column
  initRuleForm[columnName] = ''
})
let ruleForm = reactive(initRuleForm)
// 特殊表的特殊字段，给初始值
if (tableName == 'chat') {
  ruleForm.isreply = 1
  ruleForm.isread = 0
}
function toSearch() {
  let data = {}
  columns.forEach(column => {
    let { columnName, form_type } = column

    // 无值直接返回
    if (ruleForm[columnName] === '' || ruleForm[columnName] === undefined) {
      return
    }

    // 区间的--> 精准搜索，不带%
    if (column.isRangeSearch) {
      data[columnName] = ruleForm[columnName]
      return
    }

    // 根据form_type的值做一次转换
    switch (form_type) {
      // 文本框 --> 模糊搜索
      case 'YyText':
        data[columnName] = '%' + ruleForm[columnName] + '%'
        break

      // 多选
      case 'YyMultilSelect':
        data[columnName] = ruleForm[columnName]
          .split(',')
          .map(value => '%' + value + '%')
          .join(',')
        break

      default:
        data[columnName] = ruleForm[columnName]
        break
    }
  })
  emits('search', data)
}
function resetEvent() {
  columns.forEach(column => {
    let { columnName } = column
    ruleForm[columnName] = ''
  })
  if (tableName == 'chat') {
    ruleForm.isreply = 1
    ruleForm.isread = 0
  }
  toSearch()
}
let hasSearch = computed(() => !!columns.length)
</script>

<template>
  <div class="search-wrapper" >
    <el-form class="searchform" :inline="true" :model="ruleForm" @submit.prevent="toSearch">
      <el-form-item
        v-for="column in columns"
        :key="column.columnName"
        :prop="column.columnName"
        :label="column.comments"
      >
        <component
          :is="column.form_type"
          :column="column"
          :columns="columns"
          :ruleForm="ruleForm"
          :selectAllowClear="true"
        />
      </el-form-item>

      <div class="el-form-item searchbtn">
        <el-button native-type="submit" v-if="hasSearch">{{ buttonName }}</el-button>
        <el-button native-type="submit" v-else icon="Refresh">刷新</el-button>
        <el-button class="reset-button" v-if="hasSearch" @click="resetEvent">重置</el-button>

      </div>
    </el-form>
  </div>
</template>
<style>
.search-wrapper {
  .searchbtn {
    .el-radio-group {
      margin-left: 20px;
    }
  }
  .reset-button{
    display: none; 
  }
}
</style>
