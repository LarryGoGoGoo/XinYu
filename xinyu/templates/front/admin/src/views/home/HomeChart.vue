<script setup>
/**
 * @description 首页最新未处理预警列表（全宽独占一行）
 * 数据来源：jiankangyujing page 接口，只拉未处理预警，按预警时间倒序
 * 点击单条 → 精确跳转到预警列表页对应记录（定位 + 高亮）
 * 风险等级分布已拆分为 HomeRisk.vue，与「功能导航」同一行展示
 */
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { getPageAPI } from '@/api/list'

const router = useRouter()

function goWarnings() {
  router.push('/jiankangyujing')
}

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

// 最新未处理预警（按预警时间倒序，最多展示 6 条）
const latestList = computed(() => warningList.value.slice(0, 6))

function levelInfo(text) {
  const level = parseLevel(text)
  return LEVELS.find(l => l.key === level) || { key: '未知', label: '未知', color: '#8A9893' }
}

// 点击单条：精确跳转到预警列表页对应记录（未处理口径 + 焦点定位）
function goItem(item) {
  router.push({
    path: '/jiankangyujing',
    query: { focusId: item.id, chulizhuangtai: '未处理' },
  })
}

onMounted(async () => {
  try {
    // 只拉未处理预警（处理后的预警从首页消失），按预警时间倒序
    const res = await getPageAPI('jiankangyujing', {
      page: 1,
      limit: 500,
      sort: 'yujingshijian',
      order: 'desc',
      chulizhuangtai: '未处理',
    })
    warningList.value = res.data?.list || []
  } catch (e) {
    warningList.value = []
  }
})
</script>

<template>
  <div class="home-warnings">
    <div class="panel">
      <div class="panel__title panel__title--link" @click="goWarnings">
        最新未处理预警
        <span class="panel__more">查看全部 →</span>
      </div>

      <div v-if="latestList.length" class="warn-list">
        <div
          v-for="item in latestList"
          :key="item.id"
          class="warn-item"
          role="button"
          :title="`查看预警：${item.yonghuxingming || item.yonghuzhanghao || '匿名用户'}`"
          @click="goItem(item)"
        >
          <span
            class="warn-item__tag"
            :style="{ color: levelInfo(item.yujingtixing).color, background: levelInfo(item.yujingtixing).color + '1A' }"
          >
            {{ levelInfo(item.yujingtixing).label }}
          </span>
          <div class="warn-item__main">
            <div class="warn-item__user">
              {{ item.yonghuxingming || item.yonghuzhanghao || '匿名用户' }}
            </div>
            <div class="warn-item__tip">{{ item.yujingtixing }}</div>
          </div>
          <div class="warn-item__time">{{ dayjs(item.yujingshijian || item.addtime).format('MM-DD HH:mm') }}</div>
        </div>
      </div>

      <div v-else class="panel__empty">
        <div class="empty-icon">📭</div>
        <div>暂无未处理预警信息</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-warnings {
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

/* 可点击的标题：查看全部 */
.panel__title--link {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel__title--link:hover {
  color: var(--color-primary);
}

.panel__more {
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text-tertiary);
  transition: color 0.2s ease;
}

.panel__title--link:hover .panel__more {
  color: var(--color-primary);
}

/* 预警列表 */
.warn-list {
  display: flex;
  flex-direction: column;
  max-height: 320px;
  overflow-y: auto;
}

.warn-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 4px;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.15s ease;
}

.warn-item:hover {
  background: var(--color-bg-subtle);
}

.warn-item:last-child {
  border-bottom: none;
}

.warn-item__tag {
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
}

.warn-item__main {
  flex: 1;
  min-width: 0;
}

.warn-item__user {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.warn-item__tip {
  font-size: 12px;
  color: var(--color-text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.warn-item__time {
  flex: 0 0 auto;
  font-size: 12px;
  color: var(--color-text-tertiary);
  font-variant-numeric: tabular-nums;
}

/* 空状态 */
.panel__empty {
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
</style>
