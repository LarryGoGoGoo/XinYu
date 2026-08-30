<script setup>
/**
 * @description 处理状态内联切换
 * 点击标签直接在「未处理 / 已处理」之间切换，并立即调用 update 接口回写。
 * 用于健康预警（jiankangyujing）的 chulizhuangtai 字段。
 */
import { ref } from 'vue'
import { updateAPI } from '@/api/list'

defineOptions({
  inheritAttrs: false,
})

const { row, column, tableName } = defineProps({
  row: Object,
  column: Object,
  tableName: String,
})

const loading = ref(false)

function toggle() {
  if (loading.value) return
  const opts = column.options || []
  const current = row[column.columnName]
  // 在两个选项之间取反：默认 未处理 <-> 已处理
  const target = current === opts[1]?.value ? opts[0]?.value : opts[1]?.value
  const targetLabel = (opts.find(o => o.value === target) || {}).label || target

  loading.value = true
  updateAPI(tableName, { id: row.id, [column.columnName]: target })
    .then(() => {
      row[column.columnName] = target
      ElMessage.success(`已标记为「${targetLabel}」`)
    })
    .catch(error => {
      ElMessage.error(error.msg || error.message || '操作失败')
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <el-tag
    class="status-toggle"
    :type="row[column.columnName] === '已处理' ? 'success' : 'warning'"
    size="small"
    effect="light"
    @click.stop="toggle"
  >
    {{ row[column.columnName] === '已处理' ? '已处理' : '未处理' }}
    <span v-if="loading" class="status-toggle__loading">…</span>
  </el-tag>
</template>

<style scoped>
.status-toggle {
  cursor: pointer;
  user-select: none;
  transition: opacity 0.15s ease;
}

.status-toggle:hover {
  opacity: 0.78;
}

.status-toggle__loading {
  margin-left: 4px;
}
</style>
