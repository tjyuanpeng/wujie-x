# wujie-x

wujie的fork版本

[https://github.com/Tencent/wujie](https://github.com/Tencent/wujie)

wujie的作者更新的太慢了，所以我fork出来，修改一些实现，并且重写了wujie-x-vue，方便在项目里使用

主要的改动如下：

- wujie-x
  - 修复 vite 开发模式下，子应用 css 加载的问题 [https://github.com/Tencent/wujie/issues/1059](https://github.com/Tencent/wujie/issues/1059)

  - 增加 sync-history 属性，用于同步主子应用的 hisotry

    ```ts
    export interface SyncHistoryOptions {
      toMain?: (name: string, fullPath: string) => string | false
      toSub?: (name: string, fullPath: string) => string | false
    }

    export type SyncHistory = SyncHistoryOptions | true
    ```

  - 增加额外的函数导出：getWujieById, getOptionsById

  - props 属性会 merge 之前 setupApp 的 props，而不是忽略

  - 删除 eventbus 的警告

  - deleteWujieById 删除子应用实例时，保留 options

- wujie-x-vue
  - 整体代码重构

  - 属性变化，仅保留三个属性：name、config、props

  - 增加 use-wujie-x-props，用于获取子应用的 props

  - 增加 use-wujie-x-event，用于发送子应用的自定义事件

  - eventbus 事件收敛，只保留子应用通过 use-wujie-x-event 发送的事件

  - 增加 on-wujie-x-activated，用于监听子应用重新激活事件

  - 增加 wujie-x 全局变量的 typescript 类型定义

  - 增加 $WujieProps 类型，用于定义 window.$wujie.props 的类型

  - name为空不再报错

  - 导出 wujie-x 的全部变量
