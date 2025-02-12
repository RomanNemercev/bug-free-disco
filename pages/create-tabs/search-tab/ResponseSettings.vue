<script setup>
import MinDropdown from '~/components/custom/MinDropdown.vue'
import ConfigResponse from '~/components/custom/config-response/ConfigResponse.vue'
import MoreQuestions from '~/components/custom/MoreQuestions.vue'
import Popup from '~/components/custom/Popup.vue';
import MyDropdown from "~/components/custom/MyDropdown.vue";
import MyInput from "~/components/custom/MyInput.vue";
import GenerateDraggable from "~/components/custom/GenerateDraggable.vue";
import MyCheckbox from "~/components/custom/MyCheckbox.vue";

import { ref } from 'vue';

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
const InputExampleHeader = ref('Есть ли у вас гарнитура?');
const makeRequired = ref(false);
const NewArrayValue = ref('');
const InputNewField = ref('');
const makeRequiredNewField = ref(false);

// config for control scroll
function disableBodyScroll() {
    document.body.style.overflow = 'hidden'; // Отключаем прокрутку
}

function enableBodyScroll() {
    document.body.style.overflow = ''; // Включаем прокрутку
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
            <div class="max-w-[875px]">
                <div class="mb-25px p-25px bg-white rounded-fifteen">
                    <ConfigResponse />
                </div>
                <div class="p-25px bg-white rounded-fifteen mb-25px">
                    <MoreQuestions @open-settings="handleOpenSettings" @open-delete="handleOpenDelete"
                      @open-add-question="handleOpenAddQuestion" />
                </div>
                <div class="gap-15px flex max-w-fit">
                    <UiButton variant="action" size="semiaction">Сохранить и продолжить</UiButton>
                    <UiButton variant="black" size="black" class="font-semibold">Сохранить и назвать шаблон</UiButton>
                </div>
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
                <p class="text-xl font-semibold text-space mb-6">Редактор поля</p>
                <p class="text-sm font-medium text-space mb-15px">Тип вопроса</p>
                <my-dropdown :defaultValue="'Выберите тип поля'" :options="SettingsArray"
                  v-model="SettingsArrayValue" />
                <div v-if="SettingsArrayValue === 'Поле для ввода в одну строку'">
                    <p class="text-sm font-medium text-space my-15px">Заголовок</p>
                    <MyInput :placeholder="'Введите заголовок'" v-model="InputExampleHeader" class="mb-5" />
                    <GenerateDraggable class="mb-[23px]" />
                    <MyCheckbox id="make-required" label="Сделать поле обязательным" v-model="makeRequired"
                      class="mb-25px" />
                    <div class="flex gap-15px justify-between max-w-fit">
                        <UiButton variant="action" size="semiaction">Сохранить</UiButton>
                        <UiButton variant="back" size="second-back" @click="handleCloseSettingsPopup">Отмена
                        </UiButton>
                    </div>
                </div>
            </Popup>
        </transition>
        <transition name="fade" @after-leave="enableBodyScroll">
            <Popup :isOpen="openDeletePopup" @close="handleCloseDeletePopup" :width="'490px'" :showCloseButton="false">
                <p class="leading-normal text-xl font-semibold text-space mb-2">Удаление поля</p>
                <p class="text-sm font-normal text-slate-custom mb-25px">Вы действительно хотите удалить поле
                    “Телефон”
                    ?
                </p>
                <div class="flex gap-15px justify-between">
                    <UiButton variant="back" size="second-back" @click="handleCloseDeletePopup">Отмена</UiButton>
                    <UiButton variant="delete" size="delete">Удалить поле</UiButton>
                </div>
            </Popup>
        </transition>
        <transition name="fade" @after-leave="enableBodyScroll">
            <Popup :isOpen="openAddQuestionPopup" @close="handleCloseAddQuestionPopup" :width="'490px'"
              :showCloseButton="false" :disableOverflowHidden="true" :topActive="true">
                <p class="text-xl font-semibold text-space mb-6">Новое поле</p>
                <p class="text-sm font-medium text-space mb-15px">Тип поля</p>
                <my-dropdown :defaultValue="'Выберите тип поля'" :options="SettingsArray" v-model="NewArrayValue" />
                <div v-if="NewArrayValue === 'Поле для ввода в одну строку'">
                    <p class="text-sm font-medium text-space my-15px">Заголовок</p>
                    <MyInput :placeholder="'Введите текст'" v-model="InputNewField" class="mb-5" />
                    <MyCheckbox id="make-required" label="Сделать поле обязательным" v-model="makeRequiredNewField"
                      class="mb-25px" />
                    <div class="flex gap-15px justify-between max-w-fit">
                        <UiButton variant="action" size="semiaction">Сохранить</UiButton>
                        <UiButton variant="back" size="second-back" @click="handleCloseAddQuestionPopup">Отмена
                        </UiButton>
                    </div>
                </div>
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