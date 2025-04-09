import type { Ref, ComputedRef } from 'vue'

declare module '#app' {
    interface NuxtApp {
        $loader: {
            show: () => void
            hide: () => void
            isLoading: ComputedRef<boolean>
        }
    }
}

export { }