<template>
    <div class="rounded-fifteen bg-white p-25px">
        <div>
            <h2 class="text-lg font-medium text-space mb-1">{{ vacancy.title }}</h2>
            <p class="text-sm font-normal text-slate-custom">{{ vacancy.city }}</p>
        </div>
        <div class="w-full border border-athens p-4 rounded-fifteen">
            <div class="columns flex">
                <span v-for="(column, index) in visibleColumns" :key="index"
                  class="[&:not(:last-child)]:border-r [&:not(:last-child)]:border-athens">
                    <div class="p-4 text-center">
                        <div class="text-sm text-space font-normal">{{ column.value }}</div>
                        <div class="text-13px text-slate-custom font-normal">{{ column.label }}</div>
                    </div>
                </span>
            </div>
        </div>
        <div class="footer">
            <p v-if="vacancy.footerData.sites">Сайтов: {{ vacancy.footerData.sites }}</p>
            <p v-if="vacancy.footerData.responsible">Ответственный: {{ vacancy.footerData.responsible }}</p>
            <p v-if="vacancy.footerData.applicationId">Заявка: {{ vacancy.footerData.applicationId }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

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