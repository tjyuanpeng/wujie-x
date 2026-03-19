import { onActivated, onDeactivated, onMounted, onScopeDispose, onUnmounted } from 'vue'
import { bus } from 'wujie-x'

export const onWujieXActivated = (callback: () => void, options: { immediate?: boolean | 'onMounted' | 'onActivated' } = {}): void => {
  const sandbox = window.__WUJIE as any
  if (!sandbox) {
    return
  }
  const eventName = `@wujie-x/app-activated:${sandbox.id}`
  let binded = false
  const bind = (): void => {
    if (binded) {
      return
    }
    bus.$on(eventName, callback)
    binded = true
  }
  const unbind = (): void => {
    if (!binded) {
      return
    }
    bus.$off(eventName, callback)
    binded = false
  }
  onMounted(() => {
    bind()
    if (options.immediate === 'onMounted') {
      callback()
    }
  })
  onActivated(() => {
    bind()
    if (options.immediate === 'onActivated') {
      callback()
    }
  })
  onUnmounted(unbind)
  onDeactivated(unbind)
  onScopeDispose(unbind)
  if (options.immediate === true) {
    callback()
  }
}
