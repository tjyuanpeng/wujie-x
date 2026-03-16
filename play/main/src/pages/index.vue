<script setup lang="ts">
import WujieXVue from 'wujie-x-vue'

const regex = /\/web\/(\w+)/
const router = useRouter()
const map = ref<Record<string, string>>({
  rcgs: 'https://pre.yingmai.net:9012/web/rcgs',
  crew: 'https://pre.yingmai.net:9013/web/crew',
})

const name = ref()
const url = computed(() => map.value[name.value])
const route = useRoute()
onMounted(() => {
  const id = route.fullPath.match(regex)?.[1] ?? 'rcgs'
  name.value = id
})
</script>

<template>
  <div>
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
    || <span>{{ name }}, {{ url }}</span>
  </div>
  <WujieXVue :name="name" :url="url" alive style="height: 100%" />
</template>
