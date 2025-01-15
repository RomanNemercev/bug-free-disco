<script setup>
import MinDropdown from '~/components/custom/MinDropdown.vue'
import ConfigResponse from '~/components/custom/config-response/ConfigResponse.vue'
import MoreQuestions from '~/components/custom/MoreQuestions.vue'
import Popup from '~/components/custom/Popup.vue';
import MyDropdown from "~/components/custom/MyDropdown.vue";

import { ref, watch } from 'vue';

import SettingsArray from '~/src/data/change-settings.json';

const templates = [
    {
        "id": "template1",
        "name": "Менеджер по продажам"
    },
    {
        "id": "template2",
        "name": "Повар"
    },
]

const activeTemplate = ref(null);
const openSettingsPopup = ref(false);
const openDeletePopup = ref(false);
const openAddQuestionPopup = ref(false);
const SettingsArrayValue = ref('');

const handleSelectOption = (value) => {
    if (value === 'Поле для ввода в одну строку') {
        console.log('Поле для ввода в одну строку');
    }
};

watch(SettingsArrayValue, (newValue) => {
    handleSelectOption(newValue);
});

// config for control scroll
function disableBodyScroll() {
    document.body.style.overflow = 'hidden'; // Отключаем прокрутку
}

function enableBodyScroll() {
    document.body.style.overflow = ''; // Включаем прокрутку
}

// main fn for close popup
function closePopup(popup) {
    popup.value = false;
    enableBodyScroll();
}

// Обработчики событий
function handleOpenSettings() {
    openSettingsPopup.value = true;
    disableBodyScroll();
}

function handleOpenDelete() {
    openDeletePopup.value = true;
    disableBodyScroll();
}

function handleOpenAddQuestion() {
    openAddQuestionPopup.value = true;
    disableBodyScroll();
}

// Обработчики событий закрытия попапов
function handleCloseSettingsPopup() {
    openSettingsPopup.value = false;
    enableBodyScroll();
}

function handleCloseDeletePopup() {
    openDeletePopup.value = false;
    enableBodyScroll();
}

function handleCloseAddQuestionPopup() {
    openAddQuestionPopup.value = false;
    enableBodyScroll();
}
</script>

<template>
    <div>
        <slot name="back" />
        <MinDropdown :options="templates" v-model="activeTemplate" />
        <div class="flex gap-x-[24px] pt-4">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <ConfigResponse />
                <MoreQuestions @open-settings="handleOpenSettings" @open-delete="handleOpenDelete"
                  @open-add-question="handleOpenAddQuestion" />
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-space leading-[17px] text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <transition name="fade" @after-leave="enableBodyScroll">
            <Popup :isOpen="openSettingsPopup" @close="handleCloseSettingsPopup" :showCloseButton="false"
              :width="'490px'" :disableOverflowHidden="true" :topActive="true">
                <p class="text-xl font-semibold text-space mb-25px">Редактор поля</p>
                <p class="text-sm font-medium text-space">Тип вопроса</p>
                <my-dropdown :defaultValue="'Выберите тип поля'" :options="SettingsArray"
                  v-model="SettingsArrayValue" />
            </Popup>
        </transition>
        <transition name="fade" @after-leave="enableBodyScroll">
            <Popup :isOpen="openDeletePopup" @close="handleCloseDeletePopup">
                <p>Удалить</p>
            </Popup>
        </transition>
        <transition name="fade" @after-leave="enableBodyScroll">
            <Popup :isOpen="openAddQuestionPopup" @close="handleCloseAddQuestionPopup">
                <p>Добавить вопрос</p>
            </Popup>
        </transition>
    </div>
</template>

<style scoped>
/* Анимация появления и скрытия */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-leave-from {
    opacity: 1;
}
</style>