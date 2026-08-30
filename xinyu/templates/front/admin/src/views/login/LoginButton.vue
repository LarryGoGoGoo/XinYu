<script setup></script>
<template>
  <el-button class="login-btn" native-type="submit" type="primary">登录</el-button>
</template>
<style>
.login-btn {
  border: 0px solid transparent;
  border-radius: 45px;
  padding: 4px 15px;
  margin-bottom: 20px;
  width: 100%;
  font-size: 24px;
  height: 45px;

  background: linear-gradient(
    135deg,
    var(--btn-bg-color-) 0%,
    var(--btn2-bg-color-) 50%,
    var(--btn-bg-color-) 100%
  );
  background-size: 200% 200%;
  box-shadow: 0 4px 15px rgb(from var(--btn-bg-color-) r g b / 0.3);
  overflow: hidden;
  position: relative;

  &:hover {
    background-position: 100% 0;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgb(from var(--btn-bg-color-) r g b / 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgb(from var(--btn-bg-color-) r g b / 0.3),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
}
</style>

