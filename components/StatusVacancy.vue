<template>
  <div class="absolute w-full z-10">
    <div class="min-h-[153px] max-h-auto bg-white shadow-shadow-cards">
      <div class="container pt-25px pb-[16px]">
        <div class="flex mb-25px">
          <h1 class="text-xl text-space font-semibold leading-[38px]">{{ nameVacancy }}</h1>
          <div class="flex ml-auto">
            <UiButton class="mr-15px" variant="semiaction" size="semiaction">В черновик</UiButton>
            <UiButton class="font-bold" variant="action" size="action">Сохранить и продолжить</UiButton>
          </div>
        </div>
        <div class="flex" @mouseover="handleHover" @mouseleave="handleLeave">
          <ul class="flex p-3px w-full">
            <li :class="{ 'active-tab': currentTab === 'info' }"
              class="border-r border-athens w-full pr-1 max-w-[230.8px]" @click="changeTab('info')">
              <div
                class="cursor-pointer opacity-30 hover:opacity-100 transition-all hover:bg-athens-gray px-25px pt-10px pb-10px rounded-ten h-full">
                <p class="leading-normal text-sm font-medium text-space mb-1">Описание вакансии</p>
                <div class="max-h-0 overflow-hidden opacity-0 transition-all"
                  :class="{ 'max-h-24 opacity-100': isHovered }">
                  <p class="leading-normal text-slate-custom text-13px">Описание раздела</p>
                  <p class="text-slate-custom text-13px">в 2 строчки</p>
                  <p class="text-slate-custom text-13px">в 3 строчки</p>
                </div>
              </div>
            </li>
            <li :class="{ 'active-tab': currentTab === 'search' }"
              class="border-r border-athens w-full px-4.5px max-w-card-width" @click="changeTab('search')">
              <div
                class="cursor-pointer opacity-30 hover:opacity-100 transition-all hover:bg-athens-gray px-25px pt-10px pb-10px rounded-ten h-full"
                :class="isHovered ? 'opacity-30' : 'opacity-100'">
                <p class="leading-normal text-sm font-medium text-space mb-1">Поиск кандидатов</p>
                <div class="max-h-0 overflow-hidden opacity-0 transition-all"
                  :class="{ 'max-h-24 opacity-100': isHovered }">
                  <p class="leading-normal text-slate-custom text-13px">Описание раздела</p>
                  <p class="text-slate-custom text-13px">в 2 строчки</p>
                  <p class="text-slate-custom text-13px">в 3 строчки</p>
                </div>
              </div>
            </li>
            <li :class="{ 'active-tab': currentTab === 'publish' }"
              class="border-r border-athens w-full px-4.5px max-w-card-width" @click="changeTab('publish')">
              <div
                class="cursor-pointer opacity-30 hover:opacity-100 transition-all hover:bg-athens-gray px-25px pt-10px pb-10px rounded-ten h-full"
                :class="isHovered ? 'opacity-30' : 'opacity-100'">
                <p class="leading-normal text-sm font-medium text-space mb-1">Публикации (19)</p>
                <div class="max-h-0 overflow-hidden opacity-0 transition-all"
                  :class="{ 'max-h-24 opacity-100': isHovered }">
                  <p class="leading-normal text-slate-custom text-13px">Описание раздела</p>
                  <p class="text-slate-custom text-13px">в 2 строчки</p>
                  <p class="text-slate-custom text-13px">в 3 строчки</p>
                </div>
              </div>
            </li>
            <li :class="{ 'active-tab': currentTab === 'team' }"
              class="border-r border-athens w-full px-4.5px max-w-card-width" @click="changeTab('team')">
              <div
                class="cursor-pointer opacity-30 hover:opacity-100 transition-all hover:bg-athens-gray px-25px pt-10px pb-10px rounded-ten h-full"
                :class="isHovered ? 'opacity-30' : 'opacity-100'">
                <p class="leading-normal text-sm font-medium text-space mb-1">Команда вакансии</p>
                <div class="max-h-0 overflow-hidden opacity-0 transition-all"
                  :class="{ 'max-h-24 opacity-100': isHovered }">
                  <p class="leading-normal text-slate-custom text-13px">Описание раздела</p>
                  <p class="text-slate-custom text-13px">в 2 строчки</p>
                  <p class="text-slate-custom text-13px">в 3 строчки</p>
                </div>
              </div>
            </li>
            <li :class="{ 'active-tab': currentTab === 'funnel' }" class="max-w-[230.8px] w-full pl-5px"
              @click="changeTab('funnel')">
              <div
                class="cursor-pointer opacity-30 hover:opacity-100 transition-all hover:bg-athens-gray px-25px pt-10px pb-10px rounded-ten h-full"
                :class="isHovered ? 'opacity-30' : 'opacity-100'">
                <p class="leading-normal text-sm font-medium text-space mb-1">Воронка найма</p>
                <div class="max-h-0 overflow-hidden opacity-0 transition-all"
                  :class="{ 'max-h-24 opacity-100': isHovered }">
                  <p class="leading-normal text-slate-custom text-13px">Описание раздела</p>
                  <p class="text-slate-custom text-13px">в 2 строчки</p>
                  <p class="text-slate-custom text-13px">в 3 строчки</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { useVacancyStore } from '@/stores/vacancy';

// const vacancyStore = useVacancyStore();
// const nameVacancy = computed(() => vacancyStore.nameVacancy);
const nameVacancy = ref('Новая вакансия');

// Объявляем переменную для состояния табов
const isHovered = ref(false)

// Объявляем активный так с первым табом по умолчанию
const currentTab = ref('info')

// Объявляем emit для передачи события наверх
const emit = defineEmits<{
  (event: 'update:currentTab', tabName: string): void
}>()

// Функция смены табов
function changeTab(tabName: string) {
  emit('update:currentTab', tabName)
  currentTab.value = tabName
}

function handleHover() {
  isHovered.value = true
}

function handleLeave() {
  isHovered.value = false
}
</script>

<style scoped>
/* Стили для активного таба */
.active-tab div {
  opacity: 1;
  background-color: #f0f4f8;
  border-radius: 10px;
  transition: all .3s ease-in-out;
}
</style>