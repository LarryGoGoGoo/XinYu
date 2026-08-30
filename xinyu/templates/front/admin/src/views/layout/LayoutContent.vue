<template>
  <div class="content-wrapper">
    <RouterView v-slot="{ Component }">
      <transition
        enter-active-class="animate__animated animate__faster animate__fadeSlideIn"
        leave-active-class="animate__animated animate__faster animate__fadeSlidOut"
        mode="out-in"
      >
        <component :is="Component" :key="$route.fullPath" />
      </transition>
    </RouterView>
  </div>
</template>
