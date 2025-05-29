import type { NuxtConfig } from '@nuxt/types'

declare module '@nuxt/types' {
  interface NuxtConfig {
    styleResources?: {
      scss?: string[]
    }
  }
}

declare module '@nuxt/svg-sprite' {
  const svgSprite: any;
  export default svgSprite;
}

// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}