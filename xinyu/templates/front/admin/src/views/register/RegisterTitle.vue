
<script setup>
/**
 * @description 标题logo
 *
 * projectName 项目名
 * $projectImages.logo logo图片
 */
</script>
<template>
  <div class="register-title">
    <div class="logo" v-if="$projectImages.logo">
      <img :src="$projectImages.logo" draggable="false" />
    </div>

    <div class="title">{{ projectName }}</div>
  </div>
</template>
<style>
.register-title {
  padding: 0;
  margin: 0 0 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo {
    width: 90px;
    height: 90px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .title {
    color: #fff;
    font-weight: bold;
    font-size: 28px;
  }
}
</style>

  
