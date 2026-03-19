<script setup lang="ts">
import WujieXVue from 'wujie-x-vue'

const value = ref()
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
    disabled: true,
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const test = (p: any) => {
  console.log('# test', p)
}
const router = useRouter()
</script>

<template>
  <div>
    <el-button @click="router.push('/test')">
      page test
    </el-button>
    <el-button @click="test">
      test
    </el-button>
  </div>
  <div class="comp">
    <WujieXVue name="comp1" :props="{ value }" style="color: red" @update-props="(p: any) => value = p.value" @aaa="test" />
    <WujieXVue name="comp2" :props="{ value }" style="color: blue" @update-props="(p: any) => value = p.value" />
  </div>
  <div class="comp">
    <el-select
      v-model="value"
      :options="options"
      placeholder="Select"
      style="width: 240px"
    />
  </div>
</template>

<style scoped>
.comp {
  padding-left: 100px;
  display: flex;
  flex-direction: row;
}
</style>
