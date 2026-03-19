<script setup lang="ts">
import WujieXVue, { setupApp } from 'wujie-x-vue'

const regex = /\/webx?\/(\w+)/
const props = {
  name: 'from main',
  a: 1,
  c: 'c',
}

const syncHistory = {
  toMain(_name: string, fullPath: string) {
    return fullPath.replace('/web', '/web')
  },
  toSub(name: string, fullPath: string) {
    return fullPath.match(regex)?.[1] === name ? fullPath.replace('/web', '/web') : false
  },
}
const setup = () => {
  setupApp({ name: 'rcgs', url: 'https://pre.yingmai.net:9012/web/rcgs', alive: true, syncHistory, props: { ...props, getToken: () => localStorage.getItem('token') } })
  setupApp({ name: 'crew', url: 'https://pre.yingmai.net:9013/web/crew', alive: true, syncHistory, props })
  setupApp({ name: 'sub1', url: 'http://localhost:8001/', alive: true, syncHistory, props })
  setupApp({ name: 'comp1', url: 'http://localhost:8011/', props })
  setupApp({ name: 'comp2', url: 'http://localhost:8011/', props })
}
onMounted(() => setup())

const name = ref()
const route = useRoute()
const router = useRouter()
watch(() => route.fullPath, () => {
  const id = route.fullPath.match(regex)?.[1] ?? 'sub1'
  name.value = id
}, { immediate: true })
</script>

<template>
  <div class="main-test">
    <div>
      <el-button @click="name = 'sub1'">
        switch to sub1
      </el-button>
      <el-button @click="name = 'rcgs'">
        switch to rcgs
      </el-button>
      <el-button @click="name = 'crew'">
        switch to crew
      </el-button>
      <el-button @click="router.push('/web/rcgs/assessmentManagementList')">
        /web/rcgs/assessmentManagementList
      </el-button>
      <el-button @click="router.push('/web/crew/pending/tabs/processRecord')">
        /web/crew/pending/tabs/processRecord
      </el-button>
      <el-button @click="router.push('/test')">
        /test
      </el-button>
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
