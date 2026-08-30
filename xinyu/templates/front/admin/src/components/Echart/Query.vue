<script setup>
/**
 * @description 图表的查询框，分 日期 或者 下拉单选
 *
 */
import tableConfigs from '@/utils/tableConfigs'
import { getOptionAPI } from '@/api/common'
import { getRefConditonParams } from '@/utils/feature'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

let route = useRoute()
let isBoardPage = route.path.endsWith('/board') // 是否是看板页面，特殊显示

let visible = defineModel()
let emits = defineEmits(['search'])
let { configData } = defineProps(['configData'])

let { tableName, queryName } = configData
let column = tableConfigs[tableName].columns.find(column => column.columnName == queryName)

// 判断是日期，还是下拉单选
const dateTypeList = ['日', '日当', '日长', '日长当']
const dateTypeList_long = ['日长', '日长当']
let isDate = dateTypeList.includes(column.type)
let format = dateTypeList_long.includes(column.type) ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
let dateType = dateTypeList_long.includes(column.type) ? 'datetimerange' : 'daterange'

// poper弹框
const poperWidth = dateTypeList_long.includes(column.type) ? 400 : 300

let inputValue = ref('')
let options = ref([])
getOptions()
async function getOptions() {
  let apiParams = getRefConditonParams(column, {})
  let res = await getOptionAPI(tableName, queryName, apiParams)

  options.value = res.data.map(item => ({ value: item, label: item }))
}

function changeEvent(newVal) {
  let conditionColumn, conditionValue
  if (!newVal) {
    emits('search')

    return
  }
  if (isDate) {
    conditionColumn = queryName + ',' + queryName
    conditionValue = newVal.join(',')
  } else {
    conditionColumn = queryName
    conditionValue = newVal
  }

  emits('search', { conditionColumn, conditionValue })
}
</script>
<template>
  <!-- 按钮显示，然后再弹框，适合看板 -->
  <template v-if="isBoardPage">
    <el-popover
      :visible="visible"
      :width="poperWidth"
      trigger="click"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <el-button class="query-icon" icon="Search" circle plain @click="visible = !visible" />
      </template>
      <template #default>
        <div class="echart-board">
          <!-- 日期 -->
          <el-date-picker
            v-if="isDate"
            v-model="inputValue"
            :value-format="format"
            :format="format"
            :type="dateType"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeEvent"
          />

          <!-- 下拉单选 -->
          <el-select v-else v-model="inputValue" placeholder="筛选" clearable @change="changeEvent">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </template>
    </el-popover>
  </template>
  <!-- 直接表单显示 -->
  <template v-else>
    <div class="echart-query">
      <!-- 日期 -->
      <el-date-picker
        v-if="isDate"
        v-model="inputValue"
        :value-format="format"
        :format="format"
        :type="dateType"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changeEvent"
      />

      <!-- 下拉单选 -->
      <el-select v-else v-model="inputValue" placeholder="筛选" clearable @change="changeEvent">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </template>
</template>
