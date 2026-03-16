<script setup lang="ts">
import type { startOptions } from 'wujie-x'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { bus, destroyApp, startApp } from 'wujie-x'

declare global {
  interface Window {
    __WUJIE_QUEUE: Record<string, Promise<void>>
  }
}
export interface Props extends Omit<startOptions, 'el' | 'name' | 'url'> {
  name?: string
  url?: string
}

defineOptions({
  name: 'WujieXVue',
})
const props = defineProps<Props>()
const emit = defineEmits<{
  (event: string, ...args: any[]): void
}>()
defineExpose({
  destroy: () => destroyApp(props.name),
})
const el = ref()
const startAppHandler = async () => {
  try {
    await startApp({
      ...props,
      el: el.value,
    })
  } catch (error) {
    console.error(error)
  }
}
watch(() => props, () => {
  if (props.name) {
    window.__WUJIE_QUEUE ??= {}
    window.__WUJIE_QUEUE[props.name] ??= Promise.resolve()
    window.__WUJIE_QUEUE[props.name] = window.__WUJIE_QUEUE[props.name].then(startAppHandler)
  }
}, { immediate: true, deep: true })
const eventBusHandler = (event: string, ...args: any[]) => emit(event, ...args)
onMounted(() => bus.$onAll(eventBusHandler))
onUnmounted(() => bus.$offAll(eventBusHandler))
</script>

<template>
  <div ref="el" />
</template>
