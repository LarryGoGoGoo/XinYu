<script setup>
/**
 * @description 首页统计卡片
 * 数据来源：各业务表 page 接口的 total 字段
 */
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPageAPI } from '@/api/list'

const router = useRouter()

// 全部统计卡片
const ALL_CARDS = [
  { key: 'yonghu', label: '用户', icon: 'user', total: 0, display: 0, color: '#0E9488', bg: '#E5F4F1', path: '/yonghu' },
  { key: 'xinliyisheng', label: '心理医生', icon: 'doctor', total: 0, display: 0, color: '#2E9E6B', bg: '#E8F6EF', path: '/xinliyisheng' },
  { key: 'xinqingriji', label: '心情日记', icon: 'diary', total: 0, display: 0, color: '#2E9E6B', bg: '#E8F6EF', path: '/xinqingriji' },
  { key: 'yuyuezixun', label: '预约咨询', icon: 'calendar', total: 0, display: 0, color: '#0E9488', bg: '#E5F4F1', path: '/yuyuezixun' },
  { key: 'jiankangyujing', label: '健康预警', icon: 'bell', total: 0, display: 0, color: '#D98A00', bg: '#FBF1DE', path: '/jiankangyujing' },
  { key: 'exampaper', label: '心理测试', icon: 'doc', total: 0, display: 0, color: '#7A6AB8', bg: '#F0EDF9', path: '/exampaper' },
]

// 医生登录时：只展示与己相关的统计（医生菜单不含用户/医生/测试，且后端已按医生过滤数据）
const sessionTable = localStorage.getItem('sessionTable')
const DOCTOR_CARD_KEYS = ['xinqingriji', 'yuyuezixun', 'jiankangyujing']
const cards = ref(
  sessionTable === 'xinliyisheng'
    ? ALL_CARDS.filter(c => DOCTOR_CARD_KEYS.includes(c.key))
    : ALL_CARDS
)

function goTo(item) {
  if (item.path) router.push(item.path)
}

// 数字滚动动画（easeOutCubic）
function animateTo(item) {
  const target = item.total || 0
  const duration = 900
  const start = performance.now()
  function tick(now) {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    item.display = Math.round(target * eased)
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(async () => {
  await Promise.allSettled(
    cards.value.map(async item => {
      try {
        // 健康预警卡片只统计"未处理"预警，与首页"最新健康预警"列表口径一致
        const params = { page: 1, limit: 1 }
        if (item.key === 'jiankangyujing') {
          params.chulizhuangtai = '未处理'
        }
        const res = await getPageAPI(item.key, params)
        item.total = Number(res.data?.total) || 0
      } catch (e) {
        item.total = 0
      }
      animateTo(item)
    })
  )
})
</script>

<template>
  <div class="home-count" :class="{ 'home-count--doctor': sessionTable === 'xinliyisheng' }">
    <div
      v-for="item in cards"
      :key="item.key"
      class="count-card"
      role="button"
      :title="`查看${item.label}列表`"
      @click="goTo(item)"
    >
      <div class="count-card__icon" :style="{ color: item.color, background: item.bg }">
        <svg v-if="item.icon === 'user'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
        </svg>
        <svg v-else-if="item.icon === 'diary'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1-2-2V5z" />
          <path d="M4 17h16" />
        </svg>
        <svg v-else-if="item.icon === 'bell'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
        <svg v-else-if="item.icon === 'doc'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4" />
          <path d="M9 12h6M9 16h6" />
        </svg>
        <svg v-else-if="item.icon === 'calendar'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <path d="M4 9h16M8 3v4M16 3v4" />
        </svg>
        <svg v-else-if="item.icon === 'doctor'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3.5h8l-1.5 7H9.5L8 3.5z" />
          <path d="M12 10.5v8" />
          <path d="M7 6.5h10" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <div class="count-card__body">
        <div class="count-card__num">{{ item.display }}</div>
        <div class="count-card__label">{{ item.label }}</div>
      </div>
      <div class="count-card__bar" :style="{ background: item.color }"></div>
    </div>
  </div>
</template>

<style scoped>
.home-count {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}

/* 医生端只有 3 张卡片，等分三列 */
.home-count--doctor {
  grid-template-columns: repeat(3, 1fr);
}

.count-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px 20px;
  background: var(--color-bg-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.count-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover);
}

.count-card__icon {
  flex: 0 0 auto;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.count-card__icon svg {
  width: 26px;
  height: 26px;
}

.count-card__body {
  min-width: 0;
}

.count-card__num {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
}

.count-card__label {
  margin-top: 4px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

/* 底部装饰条 */
.count-card__bar {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  opacity: 0.55;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s ease;
}

.count-card:hover .count-card__bar {
  transform: scaleX(1);
}

@media screen and (max-width: 1200px) {
  .home-count {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 640px) {
  .home-count {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
