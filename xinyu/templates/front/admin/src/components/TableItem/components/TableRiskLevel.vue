<script setup>
/**
 * @description 预警风险等级标签
 * 从预警提醒文案中解析【低风险/中风险/高风险/危机】并渲染彩色标签
 */
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const { value } = defineProps(['value'])

const LEVEL_MAP = [
  { key: '危机', color: '#FFFFFF', bg: '#C9302C', border: '#C9302C', solid: true },
  { key: '高风险', color: '#E2574C', bg: 'rgba(226,87,76,0.12)', border: 'rgba(226,87,76,0.28)' },
  { key: '中风险', color: '#D98A00', bg: 'rgba(217,138,0,0.12)', border: 'rgba(217,138,0,0.28)' },
  { key: '低风险', color: '#2E9E6B', bg: 'rgba(46,158,107,0.12)', border: 'rgba(46,158,107,0.28)' },
]

const risk = computed(() => {
  const text = String(value ?? '')
  const match = text.match(/【(低风险|中风险|高风险|危机)】/)
  return match ? match[1] : ''
})

const styleMap = computed(() => {
  const found = LEVEL_MAP.find(item => item.key === risk.value)
  return found || { key: '', color: '#5A6B65', bg: '#F0F5F3', border: '#E3EAE7' }
})

const text = computed(() => {
  const raw = String(value ?? '')
  return raw.replace(/【[^】]*】/g, '').replace(/DIARYWARN:[a-f0-9]{12}/gi, '').trim()
})
</script>

<template>
  <div class="risk-cell">
    <span
      class="risk-pill"
      :style="{
        color: styleMap.color,
        background: styleMap.bg,
        borderColor: styleMap.border,
      }"
    >
      {{ risk || '未分级' }}
    </span>
    <span class="risk-text" :title="text">{{ text }}</span>
  </div>
</template>

<style scoped lang="scss">
.risk-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.risk-pill {
  flex-shrink: 0;
  display: inline-block;
  padding: 2px 10px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 12px;
  line-height: 1.6;
  white-space: nowrap;
}

.risk-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #5f6b7a;
  font-size: 13px;
}
</style>
