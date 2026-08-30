<script setup>
/**
 * @description 首页
 */
import '@/style/home.scss';
import { onMounted } from 'vue'

import HomeChart from './HomeChart.vue'
import HomeCount from './HomeCount.vue'
import HomeTitle from './HomeTitle.vue'
import HomeMenu from './HomeMenu.vue'
import HomeRisk from './HomeRisk.vue'
import HomeSchedule from './HomeSchedule.vue'
import Custom from './Custom.vue'

// 医生端：额外展示预约排班时间表
const isDoctor = localStorage.getItem('sessionTable') === 'xinliyisheng'

onMounted(() => {
  setTimeout(() => {
    requestIdleCallback(() => {
      // 提前加载 列表页
      import("@/views/list/list.vue");
    });
  }, 1000);
});
</script>

<template>
  <div
    class="home-wrapper"
    :style="
      $projectImages.bIndexBackgroundImg
        ? `background-image: url(${$projectImages.bIndexBackgroundImg})`
        : ''
    "
  >
    <HomeCount />
    <!-- 最新未处理预警：单独一行，全宽 -->
    <HomeChart />
    <HomeSchedule v-if="isDoctor" />
    <!-- 未处理预警分布 + 功能导航：同一行 -->
    <div class="home-row">
      <HomeRisk />
      <HomeMenu />
    </div>
    <Custom />

  </div>
</template>

<style scoped>
/* 风险分布与功能导航并排一行 */
.home-row {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: stretch;
}

@media screen and (max-width: 1100px) {
  .home-row {
    grid-template-columns: 1fr;
  }
}
</style>
