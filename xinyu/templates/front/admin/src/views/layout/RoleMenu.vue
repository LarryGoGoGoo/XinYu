<script setup>
/**
 * @description 角色菜单
 * 头像旁：个人中心快捷入口（用户/医生/管理员三角色通用）
 * 头像下拉：首页 / 登出
 */
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const { roleMenus, userName, userAvatar, roleMenuEvent, notreadnum } = inject('header')
const router = useRouter()

function goCenter() {
  router.push('/center')
}
</script>

<template>
  <div class="rolemenus">
    <!-- 个人中心：固定在头像旁边 -->
    <button class="center-entry" type="button" @click="goCenter">
      <el-icon><UserFilled /></el-icon>
      <span>个人中心</span>
    </button>

    <el-dropdown class="rolemenus__dropdown" trigger="click" @command="roleMenuEvent">
      <div class="avatar">
        <span v-if="notreadnum" class="notreadnum">{{ notreadnum }}</span>
        <img class="img" :src="userAvatar" />
        <span class="name">{{ userName }}</span>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in roleMenus.filter(i => i.key !== 'user_center')"
            :key="item.key"
            :command="item.key"
          >
            <div class="menu-item" :list-key="item.key">
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.label }}</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style>
.rolemenus {
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.rolemenus__dropdown {
  color: inherit;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-entry {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
  color: var(--color-text-primary);
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.center-entry:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: var(--color-primary-soft, rgba(14, 148, 136, 0.08));
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.notreadnum {
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
  background-color: #f56c6c;
  color: #fff;
  padding: 3px 6px;
  border-radius: 10px;
  font-size: 12px;
}

.img {
  width: 50px;
  height: 50px;
  border: 1px solid transparent;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  font-size: 14px;
  color: inherit;
}
</style>
