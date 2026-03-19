import type { Ref } from 'vue'
import { onMounted, onScopeDispose, ref, watch } from 'vue'
import { bus } from 'wujie-x'

export const useWujieXProps = (defaultValue: $WujieProps = {}): Ref<$WujieProps> => {
  const props = ref(window?.$wujie?.props ?? defaultValue)
  const sandbox = window.__WUJIE as any
  if (!sandbox) {
    return props
  }
  const eventName = `@wujie-x/props-change:${sandbox.id}`
  const callback = (): void => {
    props.value = window?.$wujie?.props
  }
  onMounted(() => {
    bus.$on(eventName, callback)
  })
  onScopeDispose(() => {
    bus.$off(eventName, callback)
  })
  watch(props, () => {
    bus.$emit(`@wujie-x-vue/update-props:${sandbox.id}`, props.value)
  }, { deep: true })
  return props
}
