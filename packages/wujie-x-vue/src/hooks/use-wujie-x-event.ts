import { bus } from 'wujie-x'

export const useWujieXEvent = (): (eventName: string, ...args: any[]) => void => {
  const sandbox = window.__WUJIE as any
  const emit = (eventName: string, ...args: any[]): void => {
    if (sandbox) {
      bus.$emit(`@wujie-x-vue/custom-event:${sandbox.id}`, eventName, ...args)
    }
  }
  return emit
}
