<script setup lang="ts">
</script>

<template>
  <!-- <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view> -->
  <router-view />
</template>

<style lang="scss">
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app::before,
#app::after {
  content: '';
  display: table;
  height: 0;
}
</style>
