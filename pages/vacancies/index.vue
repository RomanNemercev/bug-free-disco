<script setup>
import DotsDropdown from '~/components/custom/DotsDropdown.vue';
import VacancyCard from '~/components/custom/page-parts/VacancyCard.vue';
import Pagination from "@/components/custom/Pagination.vue";

import { ref, computed } from 'vue';

import vacanciesData from "@/src/data/vacancies.json";

const vacancyItems = ['Пункт меню 1', 'Пункт меню 2', 'Пункт меню 3', 'Пункт меню 4', 'Пункт меню 5', 'Пункт меню 6', 'Пункт меню 7'];

const isHoveredFunnel = ref(false);
const isHoveredSort = ref(false);
const vacancies = ref(vacanciesData);
const currentPage = ref(1);
const itemsPerPage = 2;

const totalPages = computed(() => Math.max(1, Math.ceil(vacancies.value.length / itemsPerPage)));

const paginatedVacancies = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return vacancies.value.slice(startIndex, startIndex + itemsPerPage);
});

function handlePageChange(page) {
    currentPage.value = page;
}
</script>

<template>
    <div class="container pt-35px">
        <!-- header block -->
        <div class="w-full p-25px rounded-t-fifteen bg-white flex justify-between mb-px">
            <div>
                <p class="text-xl font-semibold text-space">Вакансии</p>
                <p class="text-sm font-normal text-slate-custom">Управляйте вакансиями с этого раздела</p>
            </div>
            <NuxtLink to="/vacancies/newvacancy">
                <UiButton variant="action" size="action">Добавить вакансию</UiButton>
            </NuxtLink>
        </div>
        <!-- cards block -->
        <div class="bg-catskill rounded-b-fifteen py-15px px-25px mb-15px">
            <div class="flex justify-between">
                <div class="flex">
                    <div class="flex justify-between gap-x-2.5 mr-2.5">
                        <div
                          class="flex bg-space rounded-ten py-11px px-15px text-white text-sm font-medium gap-x-2.5 cursor-pointer">
                            <p>Активные вакансии</p><span class="text-slate-custom text-sm font-medium">2</span>
                        </div>
                        <div
                          class="flex rounded-ten py-11px px-15px text-space text-sm font-medium gap-x-2.5 cursor-pointer">
                            <p>Черновики</p><span>2</span>
                        </div>
                        <div
                          class="flex rounded-ten py-11px px-15px text-space text-sm font-medium gap-x-2.5 cursor-pointer">
                            <p>Архив</p><span>2</span>
                        </div>
                    </div>
                    <DotsDropdown :items="vacancyItems" />
                </div>
                <div class="flex gap-x-15px">
                    <button class="p-2.5 rounded-ten border transition-colors" @mouseover="isHoveredSort = true"
                      @mouseleave="isHoveredSort = false"
                      :class="isHoveredSort ? 'border-zumthor text-dodger bg-zumthor' : 'text-slate-custom border-athens bg-white'"><svg-icon
                          name="sort-list" width="20" height="20" /></button>
                    <button class="p-2.5 rounded-ten border transition-colors" @mouseover="isHoveredFunnel = true"
                      @mouseleave="isHoveredFunnel = false"
                      :class="isHoveredFunnel ? 'border-zumthor text-dodger bg-zumthor' : 'text-slate-custom border-athens bg-white'"><svg-icon
                          name="funnel" width="20" height="20" /></button>
                </div>
            </div>
        </div>
        <VacancyCard v-for="(vacancy, index) in paginatedVacancies" :key="vacancy.id" :vacancy="vacancy"
          :class="{ 'mb-4': index !== paginatedVacancies.length - 1 }" />
        <Pagination v-if="totalPages > 1" :currentPage="currentPage" :totalPages="totalPages"
          @page-changed="handlePageChange" />
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-top: 10px;
}

button {
    padding: 5px 10px;
    cursor: pointer;
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.active {
    font-weight: bold;
}
</style>