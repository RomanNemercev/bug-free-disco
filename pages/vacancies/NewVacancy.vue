<template>
  <div>
    <status-vacancy @update:currentTab="switchTab" />
    <Suspense @pending="onPending" @resolve="onResolve" @fallback="onFallback">
      <template #default>
        <component :is="currentTabComponent" :id="vacancyId":type="typeSave" />
      </template>
      <template #fallback>
        <UiLoader v-if="showLoader" />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, computed } from 'vue'
import { useNuxtApp } from '#app'
import UiLoader from '~/components/UiLoader.vue'
import { useRoute } from 'vue-router'
const { $loader } = useNuxtApp()

const route = useRoute()
const vacancyId = ref(route.query.id)
const typeSave = ref(route.query.type ? route.query.type : 'create')

useSeoMeta({
  title: 'Создание вакансии — Jobly',
  ogTitle: 'Создание вакансии в Jobly',
  description:
    'Создайте новую вакансию в вашей CRM-системе Jobly.  Удобный интерфейс для быстрого и эффективного размещения вакансий.',
  ogDescription:
    'Создайте и управляйте вакансиями с помощью удобной CRM-системы Jobly.',
  // ogImage: '/images/jobly-logo.png',
  twitterCard: 'summary',
})

// Табы с lazy-loading
const tabs: Record<string, () => Promise<any>> = {
  info: () => import('@/pages/create-tabs/InfoTab.vue'),
  search: () => import('@/pages/create-tabs/SearchTab.vue'),
  publish: () => import('@/pages/create-tabs/PublishTab.vue'),
  team: () => import('@/pages/create-tabs/TeamTab.vue'),
  funnel: () => import('@/pages/create-tabs/FunnelTab.vue'),
}

const currentTab = ref<keyof typeof tabs>('info')
const showLoader = ref(false)
let loaderTimeout: NodeJS.Timeout | null = null

// Динамическая загрузка компонента
const currentTabComponent = computed(() =>
  defineAsyncComponent(tabs[currentTab.value])
)

function switchTab(tabName: keyof typeof tabs) {
  currentTab.value = tabName
}

// Обработчики событий Suspense
const onPending = () => {
  console.log('Suspense: Loading started')
  // Добавляем минимальную задержку, чтобы избежать мигания
  loaderTimeout = setTimeout(() => {
    showLoader.value = true
    $loader.show()
  }, 300) // Показываем лоадер только если загрузка длится дольше 300 мс
}

const onResolve = () => {
  console.log('Suspense: Loading finished')
  if (loaderTimeout) {
    clearTimeout(loaderTimeout)
    loaderTimeout = null
  }
  showLoader.value = false
  $loader.hide()
}

const onFallback = () => {
  console.log('Suspense: Showing fallback')
}
</script>
