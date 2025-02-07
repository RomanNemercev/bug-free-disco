<template>
    <div>
        <div class="bg-white p-25px mb-px pb-15px"
          :class="!vacancy.footerData ? 'rounded-fifteen' : 'rounded-t-fifteen'">
            <div class="flex justify-between mb-[27px]">
                <div>
                    <h2 class="text-lg font-medium text-space mb-2 leading-normal">{{ vacancy.title }}</h2>
                    <p class="text-sm font-normal text-slate-custom">{{ vacancy.city }}</p>
                </div>
                <div :class="vacancy.editButton ? 'flex gap-x-15px' : ''">
                    <UiButton v-if="vacancy.editButton" variant="orange" size="action">Продолжить редактирование
                    </UiButton>
                    <DotsDropdown :items="props.dropdownItems" />
                </div>
            </div>
            <div class="w-full border border-athens py-4 px-1 leading-normal rounded-fifteen mb-15px">
                <div class="columns grid grid-flow-col auto-cols-fr">
                    <span v-for="(column, index) in vacancy.columns" :key="index"
                      class="title-parent [&:not(:last-child)]:border-r [&:not(:last-child)]:border-athens">
                        <div class="title-wrapper">
                            <!-- Делаем ховер-эффект для каждого элемента с использованием отдельной переменной для каждого индекса -->
                            <div class="p-1 text-center transition-colors rounded-ten"
                              @mouseover="setHovered(index, true)" @mouseleave="setHovered(index, false)"
                              :class="hovered[index] ? 'bg-zumthor' : ''">
                                <div class="text-sm font-normal mb-1 transition-colors"
                                  :class="hovered[index] ? 'text-dodger' : 'text-space'">{{ column.value }}</div>
                                <div class="text-13px text-slate-custom font-normal truncate" :title="column.label">{{
                                    column.label }}</div>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
            <div v-if="vacancy.message" class="flex mt-[26px]">
                <svg-icon name="card-message" width="20" height="20" />
                <p class="text-13px text-space ml-5px">{{ vacancy.message }}</p>
            </div>
            <div v-if="vacancy.messageArchive" class="flex mt-[26px]">
                <svg-icon name="card-message-archive" width="20" height="20" />
                <p class="text-13px text-space ml-5px">Была отправлена в архив {{ vacancy.messageArchive.date }} {{
                    vacancy.messageArchive.position }} {{ vacancy.messageArchive.fullName }}</p>
            </div>
        </div>
        <div v-if="vacancy.footerData"
          class="footer flex justify-between bg-catskill rounded-b-fifteen py-15px px-25px">
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

import { ref } from 'vue';

const props = defineProps({
    vacancy: {
        type: Object,
        required: true,
    },
    dropdownItems: {
        type: Array,
        required: true,
    },
});

const hovered = ref({});  // Массив для отслеживания ховера по индексам

const setHovered = (index, isHovered) => {
    hovered.value[index] = isHovered;  // Устанавливаем состояние ховера для конкретного элемента
};
</script>

<style scoped>
/* .title-parent {
    transition-property: background-color;
    transition-duration: .3s;
    transition-timing-function: ease-in-out;
} */

.title-parent:first-of-type .title-wrapper {
    padding-right: 10px;
}

.title-parent:not(:first-of-type) .title-wrapper {
    padding: 0 10px;
}

.title-parent:last-of-type .title-wrapper {
    padding-left: 10px;
    padding-right: 0;
}
</style>