
<script setup>
/**
 * @description 菜单按钮
 * 只在示例1-垂直菜单中生效
 *
 * isCollapse 是否折叠状态
 * switchCollapse 切换 折叠/展开 事件
 * switchShowMenu 隐藏/显示菜单的事件
 */
import { inject } from 'vue'
const { isCollapse, switchCollapse, switchShowMenu } = inject('header')
</script>
<template>
  <div class="menu-btn-wrapper">
    <el-button class="show" icon="Menu" circle @click="switchShowMenu" />
    <el-button
      :icon="isCollapse ? 'Expand' : 'Fold'"
      class="collapse"
      @click="switchCollapse"
    />
  </div>
</template>

<style>
.menu-btn-wrapper{
  display:none;
  background:none;
  padding: 0px;
  border-radius: 0px;
}
</style>  
  