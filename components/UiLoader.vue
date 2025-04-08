<template>
  <div v-if="isLoading" class="loader-wrapper">
    <div class="loader">
      <div class="spinner"></div>
      <span>Загрузка...</span>
      <div v-if="showDebug" class="timer">Активен: {{ elapsedTime }}с</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $loader } = useNuxtApp()
  const isLoading = computed(() => $loader.isLoading.value)
  const elapsedTime = ref(0)
  const showDebug = ref(process.dev)

  watch(isLoading, newValue => {
    if (newValue) {
      const startTime = Date.now()
      const timer = setInterval(() => {
        elapsedTime.value = ((Date.now() - startTime) / 1000).toFixed(1)
      }, 100)

      watch(
        isLoading,
        isLoading => {
          if (!isLoading) {
            clearInterval(timer)
          }
        },
        { once: true }
      )
    }
  })
</script>

<style scoped>
  .loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .loader {
    text-align: center;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
