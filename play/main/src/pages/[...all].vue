<script setup lang="ts">
import WujieXVue, { setupApp } from 'wujie-x-vue'

const regex = /\/webx?\/(\w+)/
const props = {
  name: 'from main',
  a: 1,
  c: 'c',
}
const name = ref()
const syncHistory = {
  toMain(_name: string, fullPath: string) {
    return fullPath
  },
  toSub(name: string, fullPath: string) {
    return fullPath.match(regex)?.[1] === name ? fullPath : false
  },
}
const setup = () => {
  setupApp({ name: 'sub1', url: 'http://localhost:8001/', alive: true, syncHistory, props })
  setupApp({ name: 'sub2', url: 'http://localhost:8002/', alive: true, syncHistory, props })
  setupApp({ name: 'comp1', url: 'http://localhost:8011/' })
  setupApp({ name: 'comp2', url: 'http://localhost:8011/' })
  nextTick(() => {
    name.value = 'sub1'
  })
}
onMounted(() => setup())
</script>

<template>
  <div class="main-test">
    <div>
      <el-button @click="name = 'sub1'">
        switch to sub1
      </el-button>
      <el-button @click="name = 'sub2'">
        switch to sub2
      </el-button>
      name: {{ name }}
    </div>
    <WujieXVue :name="name" style="height: 100%" />
  </div>
</template>

<style scoped>
.main-test {
  --test-var: red;
  height: 100%;
}
</style>
