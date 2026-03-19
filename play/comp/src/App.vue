<script setup lang="ts">
import { useWujieXEvent, useWujieXProps } from 'wujie-x-vue'

// const value = ref()
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
const props = useWujieXProps()
const emit = useWujieXEvent()
const test = () => {
  emit('aaa', { a: 123 })
}
</script>

<template>
  <el-select
    v-model="props.value"
    :options="options"
    placeholder="Select"
    style="width: 240px"
  />
  <span>
    {{ JSON.stringify(props) }}
  </span>
  <el-button @click="test">
    test
  </el-button>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  position: relative;
}

#app::before,
#app::after {
  content: '';
  display: table;
  height: 0;
}
</style>
