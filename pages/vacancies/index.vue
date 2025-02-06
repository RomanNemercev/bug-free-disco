<script setup>
import DotsDropdown from '~/components/custom/DotsDropdown.vue';
import VacancyCard from '~/components/custom/page-parts/VacancyCard.vue';
import Pagination from "@/components/custom/Pagination.vue";
import GeoInput from '~/components/custom/GeoInput.vue';
import ResponseInput from '~/components/custom/ResponseInput.vue';
import CheckboxGroup from "~/components/custom/CheckboxGroup.vue";


import { ref, computed } from 'vue';

import vacanciesData from "@/src/data/vacancies.json";
import responses from "~/src/data/response-roles.json";
import singleResponses from "~/src/data/responses.json";
import checkboxOptions from "~/src/data/checkbox-more.json";

const vacancyItems = ['Пункт меню 1', 'Пункт меню 2', 'Пункт меню 3', 'Пункт меню 4', 'Пункт меню 5', 'Пункт меню 6', 'Пункт меню 7'];

const isHoveredFunnel = ref(false);
const isActiveFunnel = ref(false);
const isHoveredSort = ref(false);
const isActiveSort = ref(false);
const vacancies = ref(vacanciesData);
const currentPage = ref(1);
const itemsPerPage = 10;
const cardsBlock = ref(null);
const selectedMore = ref([]);

const totalPages = computed(() => Math.max(1, Math.ceil(vacancies.value.length / itemsPerPage)));

const paginatedVacancies = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return vacancies.value.slice(startIndex, startIndex + itemsPerPage);
});

function handlePageChange(page) {
    currentPage.value = page;
}

function funnelToggleActive() {
    isActiveFunnel.value = !isActiveFunnel.value;
    cardsBlock.value.style.borderBottomLeftRadius = isActiveFunnel.value ? "0px" : "15px";
    cardsBlock.value.style.borderBottomRightRadius = isActiveFunnel.value ? "0px" : "15px";
}

function sortToggleActive() {
    isActiveSort.value = !isActiveSort.value;
    cardsBlock.value.style.borderBottomLeftRadius = isActiveSort.value ? "0px" : "15px";
    cardsBlock.value.style.borderBottomRightRadius = isActiveSort.value ? "0px" : "15px";
}
</script>

<template>
    <div class="container pt-35px pb-28">
        <!-- header block -->
        <div class="w-full p-25px rounded-t-fifteen bg-white flex justify-between mb-px items-center">
            <div>
                <p class="text-xl font-semibold text-space leading-normal mb-2.5">Вакансии</p>
                <p class="text-sm font-normal text-slate-custom">Управляйте вакансиями с этого раздела</p>
            </div>
            <NuxtLink to="/vacancies/newvacancy">
                <span class="bg-dodger text-white text-sm font-semibold rounded-ten py-11.5px px-[19px]">Добавить
                    вакансию</span>
            </NuxtLink>
        </div>
        <!-- cards block -->
        <div class="bg-catskill rounded-b-fifteen py-13px px-25px mb-15px pb-15px transition-all relative"
          ref="cardsBlock">
            <div class="flex justify-between">
                <div class="flex">
                    <div class="flex justify-between gap-x-2.5 mr-2.5">
                        <button
                          class="flex bg-space rounded-ten py-2.5 px-15px text-white text-sm font-medium gap-x-2.5 cursor-pointer">
                            <p>Активные вакансии</p><span class="text-slate-custom text-sm font-medium">2</span>
                        </button>
                        <button
                          class="flex rounded-ten py-2.5 px-15px text-space text-sm font-medium gap-x-2.5 cursor-pointer">
                            <p>Черновики</p><span class="text-slate-custom text-sm font-medium">2</span>
                        </button>
                        <button
                          class="flex rounded-ten py-2.5 px-15px text-space text-sm font-medium gap-x-2.5 cursor-pointer">
                            <p>Архив</p><span class="text-slate-custom text-sm font-medium">2</span>
                        </button>
                    </div>
                    <DotsDropdown :items="vacancyItems" />
                </div>
                <div class="flex gap-x-15px">
                    <button class="p-2.5 rounded-ten border transition-colors" @mouseover="isHoveredSort = true"
                      @mouseleave="isHoveredSort = false" @click="sortToggleActive()"
                      :class="isHoveredSort ? 'border-zumthor text-dodger bg-zumthor' : 'text-slate-custom border-athens bg-white'"><svg-icon
                          name="sort-list" width="20" height="20" /></button>
                    <button class="p-2.5 rounded-ten border transition-colors" @mouseover="isHoveredFunnel = true"
                      @mouseleave="isHoveredFunnel = false" @click="funnelToggleActive()"
                      :class="isHoveredFunnel ? 'border-zumthor text-dodger bg-zumthor' : 'text-slate-custom border-athens bg-white'"><svg-icon
                          name="funnel" width="20" height="20" /></button>
                </div>
                <transition name="fade">
                    <div v-if="isActiveFunnel"
                      class="absolute bg-white w-full top-[71px] left-0 p-25px pt-15px rounded-b-ten z-10">
                        <p class="text-18px font-medium text-space leading-normal mb-35px">Фильтры</p>
                        <div class="grid grid-cols-4 gap-15px mb-6">
                            <div>
                                <p class="text-sm font-medium text-space mb-3.5">Регион поиска</p>
                                <geo-input placeholder="Введите город" />
                            </div>
                            <div>
                                <p class="text-sm font-medium text-space mb-3.5">Ответственный вакансии</p>
                                <response-input :responses="singleResponses" />
                            </div>
                            <div>
                                <p class="text-sm font-medium text-space mb-3.5">Заказчик</p>
                                <response-input placeholder="Участники" :showRoles="true" :responses="responses" />
                            </div>
                            <div>
                                <p class="text-sm font-medium text-space mb-3.5">Искать по ID</p>
                                <response-input placeholder="Введите ID вакансии" :showRoles="false"
                                  :responses="responses" />
                            </div>
                        </div>
                        <div class="mb-35px">
                            <p class="text-sm font-medium text-space mb-3">Дополнительно</p>
                            <div class="flex flex-col gap-y-2.5">
                                <CheckboxGroup :options="checkboxOptions" v-model="selectedMore" />
                            </div>
                        </div>
                        <UiButton variant="action" size="semiaction">Применить</UiButton>
                    </div>
                </transition>
                <transition name="fade">
                    <div v-if="isActiveSort"
                      class="absolute bg-white w-full top-[71px] left-0 p-25px pt-15px rounded-b-ten z-10">
                        <p class="text-18px font-medium text-space leading-normal mb-25px">Фильтры</p>
                        <div class="flex gap-x-2.5">
                            <button
                              class="rounded-ten px-2.5 py-5px bg-athens-gray text-sm font-normal text-slate-custom">Новые</button>
                            <button
                              class="rounded-ten px-2.5 py-5px bg-athens-gray text-sm font-normal text-slate-custom">Старые</button>
                            <button
                              class="rounded-ten px-2.5 py-5px bg-athens-gray text-sm font-normal text-slate-custom">По
                                региону</button>
                            <button
                              class="rounded-ten px-2.5 py-5px bg-athens-gray text-sm font-normal text-slate-custom">По
                                заказчику</button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div>
            <div v-if="vacancies.length === 0"
              class="bg-catskill w-full rounded-fifteen min-h-56 flex items-center justify-center">
                <p class="text-15px font-medium text-slate-custom">Вы еще не добавляли вакансий которыми можно управлять
                </p>
            </div>
            <div v-if="vacancies.length > 0">
                <VacancyCard v-for="(vacancy, index) in paginatedVacancies" :key="vacancy.id" :vacancy="vacancy"
                  :class="{ 'mb-4': index !== paginatedVacancies.length - 1 }" />
                <Pagination v-if="totalPages > 1" :currentPage="currentPage" :totalPages="totalPages"
                  @page-changed="handlePageChange" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-top: 10px;
}

.active {
    font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>