<script setup>
/**
 * @description 首页功能导航：数据驱动读取当前角色 roleMenu，一键跳转各板块
 * 与左侧菜单同一数据源（localStorage roleMenu）。
 * 每个功能 = 一张图标卡片，全部直接平铺展示（无折叠）。
 * 已被统计卡片（HomeCount）覆盖的 6 个核心表不再重复出现。
 */
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 每个功能入口的语义图标（表名 -> Element Plus 图标名）
const TABLE_ICONS = {
  yuyueshiduan: 'Clock',
  xinlizhishi: 'Reading',
  news: 'Postcard',
  examquestion: 'Document',
  examrecord: 'DataLine',
  storeup: 'Star',
  popupremind: 'AlarmClock',
  'config/1': 'Picture',
  talksession: 'ChatDotRound',
  doctoradvice: 'FirstAidKit',
  exampaperlist: 'DataBoard',
}

// 柔和配色（与 HomeCount 卡片同色系），按顺序循环赋予每张卡片
const PALETTE = [
  { c: '#0E9488', bg: '#E5F4F1' },
  { c: '#2E9E6B', bg: '#E8F6EF' },
  { c: '#D98A00', bg: '#FBF1DE' },
  { c: '#7A6AB8', bg: '#F0EDF9' },
  { c: '#E2574C', bg: '#FDEEEC' },
  { c: '#B05A2A', bg: '#F9EFE8' },
]

// 这些表已由首页统计卡片（HomeCount）覆盖，导航面板不再重复展示
const COVERED_BY_COUNT = ['yonghu', 'xinliyisheng', 'xinqingriji', 'yuyuezixun', 'jiankangyujing', 'exampaper']

function entryPath(tableName) {
  // /config/1 这类带子路径的直接用 /表名；其余一律 /表名
  return tableName ? `/${tableName}` : ''
}

const entries = ref([])

function buildMenu() {
  const raw = JSON.parse(localStorage.getItem('roleMenu')) || []
  const list = []
  raw.forEach(group => {
    if (group.menu === '看板管理') return
    ;(group.child || []).forEach(child => {
      const tn = child.tableName
      if (!tn || String(tn).startsWith('chapter')) return
      if (COVERED_BY_COUNT.includes(tn)) return
      list.push({
        label: child.menu,
        path: entryPath(tn),
        tableName: tn,
      })
    })
  })
  // 配色：保持顺序稳定，按卡片顺序循环取色
  entries.value = list.map((item, index) => ({
    ...item,
    icon: TABLE_ICONS[item.tableName] || 'Menu',
    color: PALETTE[index % PALETTE.length].c,
    bg: PALETTE[index % PALETTE.length].bg,
  }))
}

function go(item) {
  if (item.path) router.push(item.path)
}

onMounted(buildMenu)
</script>

<template>
  <div class="home-menu">
    <div class="home-menu__head">
      <span class="home-menu__title">功能导航</span>
      <span class="home-menu__sub">点击直达各管理板块</span>
    </div>

    <div v-if="entries.length" class="home-menu__grid">
      <div
        v-for="item in entries"
        :key="item.path"
        class="entry"
        role="button"
        :title="`进入${item.label}`"
        @click="go(item)"
      >
        <span class="entry__icon" :style="{ color: item.color, background: item.bg }">
          <el-icon><component :is="item.icon" /></el-icon>
        </span>
        <span class="entry__name">{{ item.label }}</span>
      </div>
    </div>

    <div v-else class="home-menu__empty">当前角色暂无更多功能入口</div>
  </div>
</template>

<style scoped>
.home-menu {
  width: 100%;
  background: var(--color-bg-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: 22px 24px;
}

.home-menu__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 18px;
}

.home-menu__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  padding-left: 12px;
  position: relative;
}

.home-menu__title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 3px;
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: var(--color-primary);
}

.home-menu__sub {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.home-menu__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.entry {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 12px;
  border-radius: 14px;
  background: var(--color-bg-subtle);
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.entry:hover {
  transform: translateY(-3px);
  background: var(--color-bg-surface);
  border-color: var(--color-border);
  box-shadow: var(--shadow-card-hover);
}

.entry__icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.entry__name {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.home-menu__empty {
  padding: 18px 0;
  text-align: center;
  font-size: 13px;
  color: var(--color-text-tertiary);
}

@media screen and (max-width: 1200px) {
  .home-menu__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 760px) {
  .home-menu__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 520px) {
  .home-menu__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
