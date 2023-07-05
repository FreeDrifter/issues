import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import type { ViteConfig } from 'nuxt/schema'
// import postcss from 'rollup-plugin-postcss'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    dirs: ['./utils']
  },
  vite: getViteConfigs()
})

export function getViteConfigs(): ViteConfig {
  return {
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
          }),
        ],
        dts: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
  }
}
