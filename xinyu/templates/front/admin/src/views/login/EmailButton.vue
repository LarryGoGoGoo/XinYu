
<script setup>
import { inject } from 'vue'
const { hasEmail, emailEvent, emailType } = inject('login')
</script>
<template>
  <el-button v-show="hasEmail" class="email-btn" @click="emailEvent" text>{{ emailType }}</el-button>
</template>
<style>
.el-button.is-text.email-btn {
  color: var(--btn-bg-color-);
  font-weight: 600;
  font-size: 16px;
}
</style>

