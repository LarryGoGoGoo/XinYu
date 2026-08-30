<script setup>
/**
 * @description 统计页面
 */
import '@/style/home.scss'
import { provide } from 'vue'
import { useRoute } from 'vue-router'

import HomeChart from '@/views/home/HomeChart.vue'
import chartData from '@/components/Echart/chartData'
import { isAuth } from '@/utils/auth'

const route = useRoute()
const tableName = route.params.tableName

// 当前角色的首页统计 (鉴权)

const roleChartList = chartData
  .filter(item => item.tableName == tableName)
  .filter(item => isAuth(item.tableName, item.title))

provide('home', {
  roleChartList,
})
</script>
<template>
  <div class="home-wrapper">
    <HomeChart />
  </div>
</template>
