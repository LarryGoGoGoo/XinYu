
<script setup>
import { inject } from 'vue'
const { loginEvent } = inject('register')
</script>
<template>
  <el-button class="login-btn" @click="loginEvent">已有账号?直接登录</el-button>
</template>

