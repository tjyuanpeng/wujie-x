import type { App } from 'vue'
import type { Props } from './components/index.vue'
import { bus, destroyApp, preloadApp, setupApp } from 'wujie-x'
import WujieXVue from './components/index.vue'

WujieXVue.install = (app: App) => app.component(WujieXVue.name ?? 'WujieXVue', WujieXVue)

WujieXVue.bus = bus
WujieXVue.setupApp = setupApp
WujieXVue.preloadApp = preloadApp
WujieXVue.destroyApp = destroyApp

export default WujieXVue

export {
  WujieXVue,
}

export type { Props }
