<script setup lang="ts">
import { onWujieXActivated } from 'wujie-x-vue'

onWujieXActivated(() => {
  console.log('# onWujieXActivated test')
})
</script>

<template>
  <div>
    test
    <el-button @click="$router.go(-1)">
      back
    </el-button>
  </div>
</template>
