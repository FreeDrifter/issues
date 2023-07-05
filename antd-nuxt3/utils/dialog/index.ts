import { ConfigProvider } from 'ant-design-vue'
import { createApp, h, VNode, VNodeProps } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import type { ModalProps } from 'ant-design-vue'

type RawProps = VNodeProps & {
  __v_isVNode?: never
  [Symbol.iterator]?: never
} & Record<string, unknown>

interface Constructor<P = any> {
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
  new (...args: any[]): {
      $props: P;
  };
}

/**
 * 开启弹框. 如: loadDialog(PreviewDialog, { ...props, ...events })
 * @param component Vue 组件
 * 注:
 * 1. 组件编写时, 必须使用 DialogWrap 包裹. 如: <DialogWrap>xxxx</DialogWrap>
 * 2. 组件内可调用 emit('close') 关闭弹框
 */
export function loadDialog<P>(component: Constructor<P>, props?: RawProps & ModalProps & P) {
    const container = document.createElement('div')
    container.className = ''

    let vNode: VNode

    const renderComponent = h(component as any, {
        ...props,
        onClose: removeApp,
    })

    const app = createApp({
        unmounted() {
            removeApp()
        },
        render() {
            vNode = h(
                ConfigProvider,
                {
                    locale: zhCN,
                },
                () => [renderComponent]
            )
            return vNode
        },
    })

    document.body.appendChild(container)
    app.mount(container)

    function removeApp() {
        try {
            app.unmount()
            document.body.removeChild(container)
        } catch (e) {
            // do nothing
        }
    }

    return app
}
