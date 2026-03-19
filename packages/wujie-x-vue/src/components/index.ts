import type { App, ObjectPlugin, PropType } from 'vue'
import type { startOptions } from 'wujie-x'
import { defineComponent, h, ref, watch } from 'vue'
import { bus, getWujieById, startApp } from 'wujie-x'

type Win = Window & {
  __WUJIE_QUEUE?: Record<string, Promise<void>>
}

const WujieXVue = defineComponent({
  name: 'WujieXVue',
  props: {
    name: {
      type: String,
    },
    config: {
      type: Object as PropType<Partial<Omit<startOptions, 'el' | 'name' | 'props'>>>,
    },
    props: {
      type: Object as PropType<Record<string, any>>,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    updateProps: (props: Record<string, any>) => true,
  },
  setup(props, { emit }) {
    const el = ref()

    watch([() => props.name, () => props.config], () => {
      const { name, config = {}, props: ps } = props
      if (!name) {
        return
      }
      const win = window as Win
      win.__WUJIE_QUEUE ??= {}
      win.__WUJIE_QUEUE[name] ??= Promise.resolve()
      win.__WUJIE_QUEUE[name] = win.__WUJIE_QUEUE[name].then(async () => {
        try {
          await startApp({
            ...config,
            name,
            props: ps,
            el: el.value,
          } as startOptions)
        } catch (error) {
          console.error(error)
        }
      })
    }, { deep: true, immediate: true })
    watch(() => props.props, () => {
      const { name } = props
      if (!name) {
        return
      }
      const sandbox = getWujieById(name)
      if (!sandbox) {
        return
      }
      sandbox.updateProps(props.props)
    }, { deep: true, immediate: true })

    const writeback = (p: any): void => {
      emit('updateProps', p)
    }
    const customEvent = (eventName: string, ...args: any[]): void => {
      (emit as any)(eventName, ...args)
    }
    let oldName: string | undefined
    const off = (): void => {
      if (oldName) {
        bus.$off(`@wujie-x-vue/update-props:${oldName}`, writeback)
        bus.$off(`@wujie-x-vue/custom-event:${oldName}`, customEvent)
        oldName = undefined
      }
    }
    watch(() => props.name, (_new, _old, onCleanup) => {
      off()
      if (props.name) {
        bus.$on(`@wujie-x-vue/update-props:${props.name}`, writeback)
        bus.$on(`@wujie-x-vue/custom-event:${props.name}`, customEvent)
        oldName = props.name
      }
      onCleanup(off)
    }, { deep: true, immediate: true })

    return () => h('div', { ref: el })
  },
})

WujieXVue.install = (app: App) => {
  app.component(WujieXVue.name!, WujieXVue)
}

export default WujieXVue as typeof WujieXVue & ObjectPlugin
