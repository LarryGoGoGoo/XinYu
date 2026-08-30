<script setup>
/**
 * @description 统计图入口组件
 */
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

import ChartItem from './ChartItem.vue'
import chartConfig from './chartConfig'

let themeConfigMap = {
  横: chartConfig.bar,
  竖: chartConfig.bar,
  圆: chartConfig.bar,
  饼: chartConfig.pie,
  饼2: chartConfig.pie,
  饼3: chartConfig.pie,
  漏: chartConfig.funnel,
  漏多1: chartConfig.funnel,
  漏多2: chartConfig.funnel,
  漏多3: chartConfig.funnel,
  漏多4: chartConfig.funnel,
  折: chartConfig.line,
  折滑: chartConfig.line,
  折面: chartConfig.line,
  折滑面: chartConfig.line,
  折多: chartConfig.line,
  仪: chartConfig.gauge,
  词云: chartConfig.wordCloud,
  地: chartConfig.map,
  雷: chartConfig.radar,
}

let limitNumMap = {
  横: chartConfig.base.bar,
  竖: chartConfig.base.bar,
  圆: chartConfig.base.bar,
  饼: chartConfig.base.pie,
  饼2: chartConfig.base.pie,
  饼3: chartConfig.base.pie,
  漏: chartConfig.base.funnel,
  漏多1: chartConfig.base.funnel,
  漏多2: chartConfig.base.funnel,
  漏多3: chartConfig.base.funnel,
  漏多4: chartConfig.base.funnel,
  折: chartConfig.base.line,
  折滑: chartConfig.base.line,
  折面: chartConfig.base.line,
  折滑面: chartConfig.base.line,
  折多: chartConfig.base.line,
  仪: chartConfig.base.gauge,
  词云: 99999,
  地: 99999,
  雷: chartConfig.base.radar,
}

const { data } = defineProps(['data'])
// [1] 确定图表类型
let { graphType } = data
let themeConfig, limitNum
if (graphType.startsWith('地')) {
  themeConfig = themeConfigMap['地']
  limitNum = limitNumMap['地']
} else {
  themeConfig = themeConfigMap[graphType]
  limitNum = limitNumMap[graphType]
}

const isVisible = ref(false)
const boxRef = ref()

// 进入窗口才渲染图表
useIntersectionObserver(
  boxRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true
    }
  },
  { threshold: 0.1 }
)
</script>

<template>
  <div ref="boxRef">
    <ChartItem
      v-if="isVisible"
      :configData="data"
      :themeConfig="themeConfig"
      :limitNum="limitNum"
    />
  </div>
</template>

<style lang="scss">
/* 弹框里的统计图 */
.list-chart-wrapper {
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  .echart-query {
    .el-select {
      width: auto;
      max-width: 100%;
      min-width: 160px;
    }
  }
  .chart-box {
    flex: auto;
    width: 100%;
    height: 100%;
  }
}
</style>
