<template>
    <div>
        <div class="min-h-52 bg-white shadow-shadow-cards">
            <div class="container pt-25px pb-4">
                <div class="flex mb-25px">
                    <h1 class="text-25px text-space font-bold">Новая вакансия</h1>
                    <div class="flex ml-auto">
                        <UiButton class="mr-15px" variant="semiaction" size="semiaction">В черновик</UiButton>
                        <UiButton variant="action" size="semiaction">Сохранить и продолжить</UiButton>
                    </div>
                </div>
                <div class="flex">
                    <ul class="flex p-3px w-full">
                        <li class="border-r border-athens w-full pr-1 max-w-[230.8px]" @click="changeTab('info')">
                            <div
                              class="cursor-pointer opacity-30 hover:opacity-100 transition-all hover:bg-athens-gray px-25px pt-10px pb-3 rounded-ten">
                                <p class="text-sm font-medium text-space mb-5px">Описание вакансии</p>
                                <p class="text-slate-custom text-13px">Описание раздела</p>
                                <p class="text-slate-custom text-13px">в 2 строчки</p>
                                <p class="text-slate-custom text-13px">в 3 строчки</p>
                            </div>
                        </li>
                        <li class="border-r border-athens w-full px-4.5px max-w-card-width"
                          @click="changeTab('search')">
                            <div
                              class="cursor-pointer opacity-30 hover:opacity-100 transition-all hover:bg-athens-gray px-25px pt-10px pb-3 rounded-ten">
                                <p class="text-sm font-medium text-space mb-5px">Поиск кандидатов</p>
                                <p class="text-slate-custom text-13px">Описание раздела</p>
                                <p class="text-slate-custom text-13px">в 2 строчки</p>
                                <p class="text-slate-custom text-13px">в 3 строчки</p>
                            </div>
                        </li>
                        <li class="border-r border-athens w-full px-4.5px max-w-card-width"
                          @click="changeTab('publish')">
                            <div
                              class="cursor-pointer opacity-30 hover:opacity-100 transition-all hover:bg-athens-gray px-25px pt-10px pb-3 rounded-ten">
                                <p class="text-sm font-medium text-space mb-5px">Публикации (19)</p>
                                <p class="text-slate-custom text-13px">Описание раздела</p>
                                <p class="text-slate-custom text-13px">в 2 строчки</p>
                                <p class="text-slate-custom text-13px">в 3 строчки</p>
                            </div>
                        </li>
                        <li class="border-r border-athens w-full px-4.5px max-w-card-width" @click="changeTab('team')">
                            <div
                              class="cursor-pointer opacity-30 hover:opacity-100 transition-all hover:bg-athens-gray px-25px pt-10px pb-3 rounded-ten">
                                <p class="text-sm font-medium text-space mb-5px">Команда вакансии</p>
                                <p class="text-slate-custom text-13px">Описание раздела</p>
                                <p class="text-slate-custom text-13px">в 2 строчки</p>
                                <p class="text-slate-custom text-13px">в 3 строчки</p>
                            </div>
                        </li>
                        <li class="max-w-[230.8px] w-full pl-5px" @click="changeTab('funnel')">
                            <div
                              class="cursor-pointer opacity-30 hover:opacity-100 transition-all hover:bg-athens-gray px-25px pt-10px pb-3 rounded-ten">
                                <p class="text-sm font-medium text-space mb-5px">Воронка найма</p>
                                <p class="text-slate-custom text-13px">Описание раздела</p>
                                <p class="text-slate-custom text-13px">в 2 строчки</p>
                                <p class="text-slate-custom text-13px">в 3 строчки</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

// Объявляем emit для передачи события наверх
const emit = defineEmits<{
    (event: 'update:currentTab', tabName: string): void
}>()

// Функция смены табов
function changeTab(tabName: string) {
    emit('update:currentTab', tabName)
}
</script>