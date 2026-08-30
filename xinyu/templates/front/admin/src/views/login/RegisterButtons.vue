<script setup>
/**
 * @description 注册按钮列表
 *
 * registerOptions 按钮列表数据
 * item.tableName 表名
 * item.roleName 按钮名称
 *
 * registerEvent 注册点击事件
 */
import { inject } from 'vue'

const { registerOptions, registerEvent } = inject('login')
</script>
<template>
  <div class="registerbox-login">
    <span
      type="primary"
      v-for="item in registerOptions"
      :key="item.tableName"
      class="item"
      @click="registerEvent(item)"
    >
      {{ item.roleName }} 注册
    </span>
  </div>
</template>
<style>
.registerbox-login {
  display: flex;
  gap: 30px;
  .item {
    cursor: pointer;
    color: var(--btn-bg-color-);
    transition: 0.3 linear all;
    &:hover {
      color: var(--btn-bg-hover-color-);
      text-decoration: underline;
    }
  }
}
</style>

