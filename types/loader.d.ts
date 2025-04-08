declare module '#app' {
    interface NuxtApp {
        $loader: {
            show: () => void
            hide: () => void
            isLoading: Ref<boolean>
        }
    }
}