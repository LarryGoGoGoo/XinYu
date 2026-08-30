
<script setup>
/**
 * @description 垂直菜单 说明
 * 必填:
 * @param { Array } menus 菜单列表
 * @param { Function } clickEvent 点击跳转页面方法
 * 
 * 选填:
 * @param { Boolean } isCollapse 是否折叠
 * @param { Function } switchCollapse 折叠/展开
 */
import { ref, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
const { menus, isCollapse, switchCollapse, clickEvent } = inject('header')

// 激活的菜单项,默认首页
const route = useRoute()
const defaultActive = ref('/home')
watch(
  () => route.path,
  newPath => {
    defaultActive.value = newPath
  },
  { immediate: true }
)
</script>

<template>
  <!-- 菜单 -->
  <aside>
    <el-scrollbar>
      <el-menu
        popper-class="menu-poper"
        :default-active="defaultActive"
        :collapse="isCollapse"
        unique-opened
      >
        <!-- 首页 -->
        <el-menu-item index="/home" @click="clickEvent('/home')">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <span>首页</span>
        </el-menu-item>

        <!-- 其它菜单 -->
        <template v-for="(item, index) in menus">
          <!-- child大于2个以上的话，二级菜单,像个人中心那样 -->
          <el-sub-menu v-if="item.child.length > 1" :index="item.menu">
            <template #title>
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.menu }}</span>
            </template>

            <el-menu-item
              v-for="i in item.child"
              :index="'/' + i.tableName"
              @click="clickEvent('/' + i.tableName)"
            >
              <span>{{ i.menu }}</span>
            </el-menu-item>
          </el-sub-menu>

          <!-- child只有1个,一级菜单，像首页那样 -->
          <el-menu-item
            v-if="item.child.length == 1"
            :index="'/' + item.child[0].tableName"
            @click="clickEvent('/' + item.child[0].tableName)"
          >
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.child[0].menu }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>

    <!-- 折叠按钮 -->
    <el-button
      :icon="isCollapse ? 'Expand' : 'Fold'"
      class="collapse-btn"
      @click="switchCollapse"
    />
  </aside>
</template>

<style>
.menu-wrapper {
  --el-menu-active-color: #FFFFFF;
  --el-menu-text-color: var(--color-sidebar-text);
  --el-menu-hover-text-color: #FFFFFF;
  --el-menu-bg-color: transparent;
  --el-menu-hover-bg-color: var(--color-sidebar-active);
  --el-menu-item-height: 56px;
  --el-menu-sub-item-height: calc(var(--el-menu-item-height) - 6px);
  --el-menu-horizontal-height: 60px;
  --el-menu-horizontal-sub-item-height: 36px;
  --el-menu-item-font-size: var(--el-font-size-base);
  --el-menu-item-hover-fill: var(--color-sidebar-active);
  --el-menu-border-color: transparent;
  --el-menu-base-level-padding: 20px;
  --el-menu-level-padding: 20px;
  --el-menu-icon-width: 24px;

  /* 菜单 */
  .el-menu {
    border-right: none;
    overflow: hidden;
    background: none;
  }

  .el-menu--vertical {
    padding-bottom: 42px;
  }
  /* 折叠按钮 */
  .collapse-btn {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display:none;
  }
}

/* 折叠时弹出的子菜单（teleport 到 body，独立作用域） */
.menu-poper {
  --el-menu-active-color: #FFFFFF;
  --el-menu-text-color: var(--color-text-primary);
  --el-menu-hover-text-color: var(--color-primary);
  --el-menu-bg-color: var(--color-bg-surface);
  --el-menu-hover-bg-color: var(--color-primary-soft);
  --el-menu-border-color: var(--color-border);
  border-radius: var(--radius-control);
}
</style>
  