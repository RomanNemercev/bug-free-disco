<template>
    <div>
        <status-vacancy @update:currentTab="switchTab" />
        <Suspense>
            <template #default>
                <component :is="currentTabComponent" />
            </template>
            <template #fallback>
                <p>Загрузка...</p>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, computed } from 'vue'

useSeoMeta({
    title: 'Создание вакансии — Jobly',
    ogTitle: 'Создание вакансии в Jobly',
    description: 'Создайте новую вакансию в вашей CRM-системе Jobly.  Удобный интерфейс для быстрого и эффективного размещения вакансий.',
    ogDescription: 'Создайте и управляйте вакансиями с помощью удобной CRM-системы Jobly.',
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

// Динамическая загрузка компонента
const currentTabComponent = computed(() =>
    defineAsyncComponent(tabs[currentTab.value])
)

function switchTab(tabName: keyof typeof tabs) {
    currentTab.value = tabName
}
</script>
