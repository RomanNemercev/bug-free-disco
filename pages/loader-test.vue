<template>
  <div class="p-4">
    <h1 class="text-2xl mb-4">Тестирование лоадера</h1>
    <div class="space-y-2">
      <button
        @click="testLoader"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Тест на 2 секунды
      </button>
      <button
        @click="testLoaderWithError"
        class="px-4 py-2 bg-red-500 text-white rounded"
      >
        Тест с ошибкой
      </button>
      <button
        @click="testMultipleRequests"
        class="px-4 py-2 bg-green-500 text-white rounded"
      >
        Тест параллельных запросов
      </button>
    </div>
  </div>
</template>

<script setup>
  const { $loader } = useNuxtApp()

  const testLoader = async () => {
    try {
      $loader.show()
      await new Promise(resolve => setTimeout(resolve, 2000))
    } finally {
      $loader.hide()
    }
  }

  const testLoaderWithError = async () => {
    try {
      $loader.show()
      await new Promise(resolve => setTimeout(resolve, 1000))
      throw new Error('Тестовая ошибка')
    } catch (e) {
      console.error(e)
    } finally {
      $loader.hide()
    }
  }

  const testMultipleRequests = async () => {
    $loader.show()
    try {
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, 1000)),
        new Promise(resolve => setTimeout(resolve, 2000)),
        new Promise(resolve => setTimeout(resolve, 3000)),
      ])
    } finally {
      $loader.hide()
    }
  }
</script>
