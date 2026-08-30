<script setup>
/**
 * @description 首页风险等级分布（环形图）
 * 数据来源：jiankangyujing page 接口，解析 yujingtixing 字段中的【等级】
 * 从原 HomeChart 拆出，作为独立面板与「功能导航」同一行展示
 */
import { ref, computed, onMounted } from 'vue'
import { getPageAPI } from '@/api/list'

const LEVELS = [
  { key: '低风险', label: '低风险', color: '#2E9E6B' },
  { key: '中风险', label: '中风险', color: '#D98A00' },
  { key: '高风险', label: '高风险', color: '#E2574C' },
  { key: '危机', label: '危机', color: '#C9302C' },
]

// 解析【等级】标签
function parseLevel(text) {
  if (!text) return null
  const m = String(text).match(/【(低风险|中风险|高风险|危机)】/)
  return m ? m[1] : null
}

const warningList = ref([])
const distribution = ref({ 低风险: 0, 中风险: 0, 高风险: 0, 危机: 0 })
const total = computed(() => warningList.value.length)

// 环形图数据
const radius = 66
const stroke = 18
const circumference = 2 * Math.PI * radius
const segments = computed(() => {
  const sum = total.value
  if (!sum) return []
  let offset = 0
  return LEVELS.map(lv => {
    const count = distribution.value[lv.key] || 0
    const frac = count / sum
    const len = frac * circumference
    const seg = {
      ...lv,
      count,
      frac,
      dasharray: `${len} ${circumference - len}`,
      dashoffset: -offset,
    }
    offset += len
    return seg
  }).filter(s => s.count > 0)
})

onMounted(async () => {
  try {
    // 只统计未处理预警，与首页「最新未处理预警」列表口径一致
    const res = await getPageAPI('jiankangyujing', {
      page: 1,
      limit: 500,
      sort: 'yujingshijian',
      order: 'desc',
      chulizhuangtai: '未处理',
    })
    const list = res.data?.list || []
    warningList.value = list
    const dist = { 低风险: 0, 中风险: 0, 高风险: 0, 危机: 0 }
    list.forEach(item => {
      const lv = parseLevel(item.yujingtixing)
      if (lv && dist[lv] !== undefined) dist[lv]++
    })
    distribution.value = dist
  } catch (e) {
    warningList.value = []
  }
})
</script>

<template>
  <div class="home-risk">
    <div class="panel">
      <div class="panel__title">未处理预警分布</div>

      <div v-if="total > 0" class="risk-panel__body">
        <div class="donut">
          <svg width="170" height="170" viewBox="0 0 170 170">
            <circle
              cx="85" cy="85"
              :r="radius"
              fill="none"
              stroke="#F0F5F3"
              :stroke-width="stroke"
            />
            <g :transform="`rotate(-90 85 85)`">
              <circle
                v-for="seg in segments"
                :key="seg.key"
                cx="85" cy="85"
                :r="radius"
                fill="none"
                :stroke="seg.color"
                :stroke-width="stroke"
                :stroke-dasharray="seg.dasharray"
                :stroke-dashoffset="seg.dashoffset"
                stroke-linecap="butt"
              />
            </g>
          </svg>
          <div class="donut__center">
            <div class="donut__num">{{ total }}</div>
            <div class="donut__label">预警总数</div>
          </div>
        </div>

        <div class="legend">
          <div v-for="seg in segments" :key="seg.key" class="legend__item">
            <span class="legend__dot" :style="{ background: seg.color }"></span>
            <span class="legend__label">{{ seg.label }}</span>
            <span class="legend__count">{{ seg.count }}</span>
            <span class="legend__pct">{{ Math.round(seg.frac * 100) }}%</span>
          </div>
        </div>
      </div>

      <div v-else class="risk-panel__empty">
        <div class="empty-icon">🌿</div>
        <div>暂无未处理预警</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-risk {
  width: 100%;
}

.panel {
  background: var(--color-bg-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: 22px 24px;
  min-height: 300px;
}

.panel__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 18px;
  padding-left: 12px;
  position: relative;
}

.panel__title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 3px;
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: var(--color-primary);
}

/* 环形图 */
.risk-panel__body {
  display: flex;
  align-items: center;
  gap: 28px;
}

.donut {
  position: relative;
  flex: 0 0 auto;
  width: 170px;
  height: 170px;
}

.donut__center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut__num {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
}

.donut__label {
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-top: 2px;
}

.legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.legend__item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
}

.legend__dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  flex: 0 0 auto;
}

.legend__label {
  color: var(--color-text-secondary);
}

.legend__count {
  margin-left: auto;
  font-weight: 600;
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
}

.legend__pct {
  width: 42px;
  text-align: right;
  color: var(--color-text-tertiary);
  font-size: 12px;
}

/* 空状态 */
.risk-panel__empty {
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--color-text-tertiary);
  font-size: 14px;
}

.empty-icon {
  font-size: 34px;
}

@media screen and (max-width: 1100px) {
  .risk-panel__body {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
