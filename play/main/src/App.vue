<script setup lang="ts">
</script>

<template>
  <router-view />
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app::before,
#app::after {
  content: '';
  display: table;
  height: 0;
}
</style>
