<script setup>
/**
 * @description 统计图
 */
import { onMounted, onUnmounted, ref, watch } from 'vue'

import { useElementSize, useDebounceFn } from '@vueuse/core'
import getInitOptions from './initOptions'
import { getChartAPI } from '@/api/list'
import Query from './Query.vue'

const { configData, themeConfig, limitNum } = defineProps(['configData', 'themeConfig', 'limitNum'])

let { api, func, queryName, queryRoles } = configData

const boxRef = ref()
let chartInstance = null
let isFirstTimeResize = true

// ----------------------------------
// ------------  重绘  --------------
// ----------------------------------
const debouncedFn = useDebounceFn(() => {
  if (isFirstTimeResize) {
    isFirstTimeResize = false
    return
  }
  chartInstance?.resize({
    animation: {
      duration: 300,
      easing: 'quadraticIn',
    },
  })
}, 200)
const { width, height } = useElementSize(boxRef)
watch([width, height], () => {
  debouncedFn()
})

// ----------------------------------
// ----------  查询功能  -------------
// ----------------------------------
const queryVisible = ref(false)
let hasQuery = ref(getHasQuery())
function getHasQuery() {
  if (!queryName) {
    return false
  }

  let sessionTable = localStorage.getItem('sessionTable')
  if (!queryRoles || !queryRoles.length) {
    return sessionTable == 'users'
  }

  let role = localStorage.getItem('role')
  return queryRoles.includes(role)
}

/**
 * @description  初始化/更新 图表
 * @param { Object } queryData 查询参数
 */
async function initOrUpdateChart(queryData) {
  if (!chartInstance) {
    chartInstance = window.echarts.init(boxRef.value)
  }

  // 没有seriesData字数据段,从api服务器拉取
  let data
  if (!configData.seriesData) {
    let apiParams = {
      ...queryData,
    }
    if (func) {
      apiParams.func = func
    }
    let res = await getChartAPI(api, apiParams)
    data = res.data
  }

  // 获取图表选项
  let options = await getInitOptions(data, themeConfig, limitNum, configData)
  // 绘制图表
  chartInstance.setOption(options)

  // 隐藏查询
  queryVisible.value = false
}

onMounted(() => {
  initOrUpdateChart()
})

onUnmounted(() => {
  //  销毁实例
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<template>
  <Query
    v-if="hasQuery"
    :configData="configData"
    @search="initOrUpdateChart"
    v-model="queryVisible"
  />
  <div class="chart-box" ref="boxRef"></div>
</template>
