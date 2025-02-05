<template>
    <div>
        <div class="rounded-t-fifteen bg-white p-25px mb-px pb-15px">
            <div class="flex justify-between mb-[27px]">
                <div>
                    <h2 class="text-lg font-medium text-space mb-2 leading-normal">{{ vacancy.title }}</h2>
                    <p class="text-sm font-normal text-slate-custom">{{ vacancy.city }}</p>
                </div>
                <DotsDropdown :items="VacancyCardDropdown" />
            </div>
            <div class="w-full border border-athens py-4 px-1 leading-normal rounded-fifteen mb-15px">
                <div class="columns grid grid-flow-col auto-cols-fr">
                    <span v-for="(column, index) in vacancy.columns" :key="index"
                      class="[&:not(:last-child)]:border-r [&:not(:last-child)]:border-athens">
                        <div class="p-1 text-center">
                            <div class="text-sm text-space font-normal mb-1">{{ column.value }}</div>
                            <div class="text-13px text-slate-custom font-normal truncate" :title="column.label">{{
                                column.label }}</div>
                        </div>
                    </span>
                </div>
            </div>
            <div v-if="vacancy.message" class="flex mt-[26px]">
                <svg-icon name="card-message" width="20" height="20" />
                <p class="text-13px text-space ml-5px">{{ vacancy.message }}</p>
            </div>
        </div>
        <div class="footer flex justify-between bg-catskill rounded-b-fifteen py-15px px-25px">
            <div class="flex gap-x-25px">
                <p class="text-sm font-medium text-slate-custom leading-normal" v-if="vacancy.footerData.sites">Сайтов:
                    {{
                        vacancy.footerData.sites }}</p>
                <p class="text-sm font-medium text-slate-custom leading-normal"
                  v-if="vacancy.footerData.candidatesInWork">Кандидатов в
                    работе: {{
                        vacancy.footerData.candidatesInWork }}</p>
                <p class="text-sm font-medium text-slate-custom leading-normal" v-if="vacancy.footerData.responsible">
                    Ответственный: {{
                        vacancy.footerData.responsible }}</p>
                <p class="text-sm font-medium text-slate-custom leading-normal" v-if="vacancy.footerData.applicationId">
                    Заявка: {{
                        vacancy.footerData.applicationId }}</p>
            </div>
            <p class="text-sm font-medium text-slate-custom leading-normal">{{ vacancy.footerData.itemId }}</p>
        </div>
    </div>
</template>

<script setup>
import DotsDropdown from '~/components/custom/DotsDropdown.vue';

import VacancyCardDropdown from '@/src/data/vacancy-card-dropdown.json';

const props = defineProps({
    vacancy: {
        type: Object,
        required: true,
    },
});
</script>