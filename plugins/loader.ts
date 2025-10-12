import { ref, computed } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
    const loading = ref(false)
    let activeRequests = 0

    // Создаем объект с методами
    const loader = {
        show: () => {
            activeRequests++
            console.log('Show loader, active requests:', activeRequests)
            loading.value = true
        },
        hide: () => {
            activeRequests = Math.max(0, activeRequests - 1)
            console.log('Hide loader, active requests:', activeRequests)
            if (activeRequests === 0) {
                loading.value = false
            }
        },
        isLoading: computed(() => loading.value)
    }

    // Перехват useFetch
    const originalUseFetch = nuxtApp.vueApp.config.globalProperties.$fetch
    nuxtApp.vueApp.config.globalProperties.$fetch = async (...args: any[]) => {
        const options = args[1] || {}
        const skipLoader = options.skipLoader || false

        if (!skipLoader) {
            loader.show()
        }

        try {
            const result = await originalUseFetch(...args)
            return result
        } finally {
            if (!skipLoader) {
                loader.hide()
            }
        }
    }

    return {
        provide: {
            loader,
        },
    }
})

export const loadScript = (url: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${url}"]`)) {
          resolve(); // Скрипт уже загружен, не дублируем
          return;
        }
        const script = document.createElement('script');
        script.src = url;
        // script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
     
};
