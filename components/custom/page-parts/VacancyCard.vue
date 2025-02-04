<template>
    <div>
        <div class="rounded-t-fifteen bg-white p-25px mb-px">
            <div class="flex justify-between">
                <div>
                    <h2 class="text-lg font-medium text-space mb-1">{{ vacancy.title }}</h2>
                    <p class="text-sm font-normal text-slate-custom">{{ vacancy.city }}</p>
                </div>
                <DotsDropdown :items="VacancyCardDropdown" />
            </div>
            <div class="w-full border border-athens p-4 rounded-fifteen">
                <div class="columns grid grid-flow-col auto-cols-fr">
                    <span v-for="(column, index) in vacancy.columns" :key="index"
                      class="[&:not(:last-child)]:border-r [&:not(:last-child)]:border-athens">
                        <div class="p-4 text-center">
                            <div class="text-sm text-space font-normal">{{ column.value }}</div>
                            <div class="text-13px text-slate-custom font-normal truncate">{{ column.label }}</div>
                        </div>
                    </span>
                </div>
            </div>
            <div v-if="vacancy.message" class="flex">
                <svg-icon name="card-message" width="20" height="20" />
                <p class="text-13px text-space">{{ vacancy.message }}</p>
            </div>
        </div>
        <div class="footer flex justify-between bg-catskill rounded-b-fifteen py-15px px-25px">
            <div class="flex gap-x-25px">
                <p class="text-sm font-medium text-slate-custom" v-if="vacancy.footerData.sites">Сайтов: {{
                    vacancy.footerData.sites }}</p>
                <p class="text-sm font-medium text-slate-custom" v-if="vacancy.footerData.candidatesInWork">Кандидатов в
                    работе: {{
                        vacancy.footerData.candidatesInWork }}</p>
                <p class="text-sm font-medium text-slate-custom" v-if="vacancy.footerData.responsible">Ответственный: {{
                    vacancy.footerData.responsible }}</p>
                <p class="text-sm font-medium text-slate-custom" v-if="vacancy.footerData.applicationId">Заявка: {{
                    vacancy.footerData.applicationId }}</p>
            </div>
            <p class="text-sm font-medium text-slate-custom">{{ vacancy.footerData.itemId }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

import DotsDropdown from '~/components/custom/DotsDropdown.vue';

import VacancyCardDropdown from '@/src/data/vacancy-card-dropdown.json';

const props = defineProps({
    vacancy: {
        type: Object,
        required: true,
    },
});

// Фильтруем колонки, чтобы отображать только те, у которых isVisible === true
const visibleColumns = computed(() => {
    return props.vacancy.columns.filter((column) => column.isVisible);
});
</script>