
<script setup>
/**
 * @description 面包屑
 *
 * separator 分隔符号
 * homePath 首页路径
 *
 * second 二级(可能没有)
 * second.path 路径
 * second.title 名称
 *
 * lastTitle 最后一级名称
 */
import { inject } from 'vue'
const { homePath, second, lastTitle } = inject('header')
</script>
<template>
  <el-breadcrumb separator="/">
    <!-- 一级 -->
    <el-breadcrumb-item :to="{ path: homePath }">
      <el-icon>
        <HomeFilled />
      </el-icon>
      <span>首页</span>
    </el-breadcrumb-item>

    <!-- 二级,可能有 -->
    <el-breadcrumb-item v-if="second.path" :to="{ path: second.path }">
      {{ second.title }}
    </el-breadcrumb-item>

    <!-- 最后一级 -->
    <el-breadcrumb-item v-if="lastTitle">{{ lastTitle }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style>
/* 面包屑 */
.el-breadcrumb {
  background-color: #fff;
  border-radius: 4px;
  padding: 0 10px;
  color: var(--btn2-font-color-);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 34px;

  /* 普通 */
  .el-breadcrumb__item .el-breadcrumb__inner {
    color: inherit;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
      color: inherit;
    }
  }

  /* 普通+可点击跳转,比如第一个(会覆盖普通) */
  .el-breadcrumb__inner.is-link {
    color: inherit;

    &:hover {
      color: var(--btn-bg-color-);
    }
  }
}
</style>
  