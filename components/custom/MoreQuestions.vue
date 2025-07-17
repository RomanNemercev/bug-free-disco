<script setup>
import { ref, computed } from 'vue';
import draggable from "vuedraggable";
import Popup from '~/components/custom/Popup.vue';
import MyDropdown from '~/components/custom/MyDropdown.vue';
import MyInput from '~/components/custom/MyInput.vue';
import GenerateDraggable from '~/components/custom/GenerateDraggable.vue';
import MyCheckbox from '~/components/custom/MyCheckbox.vue'

import SettingsArray from '~/src/data/change-settings.json'

const props = defineProps({
    modelValue: { type: Array, default: () => [] },
})

const itemsForCheckbox = ref([
    { id: 1, title: '' }
]);
const emit = defineEmits(['update:modelValue']);
const openSettingsPopup = ref(false)
const openDeletePopup = ref(false)
const openAddQuestionPopup = ref(false)
const itemToDelete = ref(null)
const itemToEdit = ref({
    type: '',
    title: '',
    required: false,
    options: [],
})

const newField = ref({
    type: '',
    title: '',
    required: false
})

const newCheckboxField = ref({
    title: '',
    required: false,
    options: []
})

const items = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val)
})

// const items = ref([
//     { id: 1, title: 'Доводилось ли вам принимать участие в международных конференциях?', icon: 'conference', },
//     { id: 2, star: '*', title: 'Какими из перечисленных программ вы вледеете?', icon: 'software', },
//     { id: 3, title: 'Готов приступить к работе ближайшее время?', icon: 'ready', },
//     { id: 4, title: 'Как вы относитесь к животным?', icon: 'text', },
//     { id: 5, star: '*', title: 'Пожалуйста, опишите одним предложением ваш предыдущий опыт на работе?', icon: 'paragraph', },
//     { id: 6, title: 'Пожалуйста, укажите удобное для вас время начала рабочего дня', icon: 'time', },
//     { id: 7, star: '*', title: 'Пожалуйста, укажите дату удобного для вас дня стажировки', icon: 'meet-time', },
//     { id: 8, star: '*', title: 'Пожалуйста, укажите дату от вашего трудоустройства до последнего увольнения на предыдущем месте работы', icon: 'more-calendar' },
//     { id: 9, star: '*', title: 'Пожалуйста, укажите ссылку на ваше портфолио', icon: 'link' },
//     { id: 10, title: 'Пожалуйста, укажите н.п. проживания', icon: 'geo-label' },
//     { id: 11, title: 'Пожалуйста, загрузите файл вашей предыдущей работы ', icon: 'download' },
// ])

const onDragStart = () => {
    isDragging.value = true;
};

const onDragEnd = () => {
    isDragging.value = false;
}

const isDragging = ref(false);

// Обработчики событий
function handleOpenSettings(item) {
    let options = item.options
    if (Array.isArray(options) && options.length > 0 && typeof options[0] === 'string') {
        options = options.map((opt, idx) => ({
            id: idx + 1,
            title: opt
        }));
    }
    itemToEdit.value = {
        ...item,
        options
    }
    openSettingsPopup.value = true
    console.log('data of element is: ', item)
}

function handleOpenDelete(item) {
    itemToDelete.value = item
    openDeletePopup.value = true
    console.log('data of element is: ', item)
}

function confirmDelete() {
    if (itemToDelete.value) {
        items.value = items.value.filter(item => item.id !== itemToDelete.value.id)
        itemToDelete.value = null
        openDeletePopup.value = false
    }
}

function handleOpenAddQuestion() {
    openAddQuestionPopup.value = true
    disableBodyScroll()
}

// Обработчики событий закрытия попапов
function handleCloseSettingsPopup() {
    openSettingsPopup.value = false
    itemToEdit.value = {
        type: '',
        title: '',
        required: false,
        options: []
    }
}

function handleCloseDeletePopup() {
    openDeletePopup.value = false
    enableBodyScroll()
}

function handleCloseAddQuestionPopup() {
    openAddQuestionPopup.value = false
    enableBodyScroll()
}

// config for control scroll
function disableBodyScroll() {
    document.body.style.overflow = 'hidden' // Отключаем прокрутку
}

function enableBodyScroll() {
    document.body.style.overflow = '' // Включаем прокрутку
}

function getIconByType(type) {
    switch (type) {
        case 'Время (выбор времени)': return 'time';
        case 'Дата (выбор даты)': return 'meet-time';
        case 'Дата (срок)': return 'more-calendar';
        case 'Ссылка': return 'link';
        case 'Адрес': return 'geo-label';
        case 'Файл': return 'download';
        case 'Поле для ввода в несколько строк': return 'paragraph';
        case 'Поле для ввода в одну строку': return 'text';
        case 'Выпадающий список (один выбор)': return 'conference';
        case 'Мультисписок (вопрос с вариантами ответа)': return 'software';
        case 'Чекбокс': return 'ready';
        default: return 'text';
    }
}

function addQuestion() {
    if (!newField.value.title.trim()) return
    const newOptions = {
        id: Date.now(),
        type: newField.value.type,
        title: newField.value.title,
        required: newField.value.required,
        icon: getIconByType(newField.value.type),
        star: newField.value.required ? '*' : '',
    }
    items.value.push(newOptions);
    emit('update:modelValue', items.value);
    newField.value = { type: '', title: '', required: false, options: [] };
    openAddQuestionPopup.value = false;
}

function handleCloseNewFieldPopup() {
    openAddQuestionPopup.value = false;
    newField.value = { type: '', title: '', required: false }
    newCheckboxField.value = { title: '', required: false, options: [] }
}

function addCheckboxQuestion() {
    if (!newCheckboxField.value.title.trim()) return
    items.value.push({
        id: Date.now(),
        type: newField.value.type,
        title: newCheckboxField.value.title,
        required: newCheckboxField.value.required,
        icon: getIconByType(newField.value.type),
        star: newCheckboxField.value.required ? '*' : '',
        options: itemsForCheckbox.value
            .filter(opt => opt.title.trim())
            .map(opt => opt.title),
    })

    emit('update:modelValue', items.value)
    newCheckboxField.value = { title: '', required: false, options: [] }
    newField.value = { type: '', title: '', required: false, options: [] }
    itemsForCheckbox.value = [{ id: 1, title: '' }]
    openAddQuestionPopup.value = false
}

function updateQuestion(item) {
    const index = items.value.findIndex(i => i.id === item.id)
    let updatedOptions = item.options
    // Условие для типов с вариантами ответа
    if (['Выпадающий список (один выбор)', 'Мультисписок (вопрос с вариантами ответа)', 'Чекбокс'].includes(itemToEdit.value.type)) {
        updatedOptions = itemToEdit.value.options
            .filter(opt => opt.title.trim())
            .map(opt => opt.title)
    }
    items.value[index] = {
        ...item,
        star: item.required ? '*' : '',
        options: updatedOptions,
    }
    emit('update:modelValue', items.value)
    openSettingsPopup.value = false
    itemToEdit.value = {
        type: '',
        title: '',
        required: false,
        options: []
    }
}
</script>

<template>
    <div>
        <div class="card-list">
            <draggable v-model="items" item-key="id" handle=".drag-handle" animation="200" ghost-class="ghost"
              chosen-class="chosen" @start="onDragStart" @end="onDragEnd" v-if="items.length > 0">
                <template #item="{ element }">
                    <div class="card last-of-child:mb-0" :class="{ 'dragging-card': isDragging }">
                        <div class="drag-handle w-10 h-10 p-2.5 mr-15px cursor-grab">
                            <svg-icon name="drag-burger" width="20" height="20" />
                        </div>
                        <div
                          class="card-content flex items-center py-[9px] px-15px pl-13px border border-athens rounded-ten bg-athens-gray w-full overflow-hidden">
                            <svg-icon v-if="element.icon" :name="element.icon" width="18" height="18"
                              class="text-slate-custom shrink-0"
                              :class="{ 'mr-5px': element.star, 'mr-[9px]': !element.star }" />
                            <span v-if="element.star" class="star text-red-custom mr-1">{{ element.star }}</span>
                            <p class="card-title text-sm font-normal text-space truncate">{{ element.title }}</p>
                        </div>
                        <button class="settings-button" @click="handleOpenSettings(element)">
                            <svg-icon name="more-settings" width="18" height="18" />
                        </button>
                        <button class="delete-button" @click="handleOpenDelete(element)">
                            <svg-icon name="more-delete" width="18" height="18" />
                        </button>
                    </div>
                </template>
            </draggable>
            <button class="add-question-button" :class="{ 'mt-0': items.length === 0, 'mt-25px': items.length > 0 }"
              @click="handleOpenAddQuestion">
                <svg-icon name="accordion-plus" width="20" height="20" class="mr-5px" /><span
                  class="text-sm font-normal">Добавить
                    вопрос</span>
            </button>
        </div>
        <transition name="fade" @after-leave="enableBodyScroll">
            <Popup :isOpen="openSettingsPopup" @close="handleCloseSettingsPopup" :showCloseButton="false"
              :width="'490px'" :disableOverflowHidden="true" :lgSize="true" :parentRounded="true"
              :overflowVisible="true">
                <p class="text-xl font-semibold text-space mb-6">Редактор поля</p>
                <p class="text-sm font-medium text-space mb-15px">Тип вопроса</p>
                <my-dropdown :defaultValue="'Выберите тип поля'" :options="SettingsArray" v-model="itemToEdit.type" />
                <div
                  v-if="['Поле для ввода в одну строку', 'Поле для ввода в несколько строк', 'Время (выбор времени)', 'Дата (выбор даты)', 'Дата (срок)', 'Ссылка', 'Адрес', 'Файл'].includes(itemToEdit.type)">
                    <p class="text-sm font-medium text-space my-15px">Заголовок</p>
                    <MyInput :placeholder="'Введите заголовок'" v-model="itemToEdit.title" class="mb-5" />
                    <MyCheckbox id="make-required" label="Сделать поле обязательным" v-model="itemToEdit.required"
                      class="mb-25px" />
                    <div class="flex gap-15px justify-between max-w-fit">
                        <UiButton variant="action" size="semiaction" @click="updateQuestion(itemToEdit)">Сохранить
                        </UiButton>
                        <UiButton variant="back" size="second-back" @click="handleCloseSettingsPopup">
                            Отмена
                        </UiButton>
                    </div>
                </div>
                <div
                  v-if="['Выпадающий список (один выбор)', 'Мультисписок (вопрос с вариантами ответа)', 'Чекбокс'].includes(itemToEdit.type)">
                    <p class="text-sm font-medium text-space my-15px">Заголовок</p>
                    <MyInput :placeholder="'Введите заголовок'" v-model="itemToEdit.title" class="mb-1" />
                    <GenerateDraggable class="mb-[23px]" v-model:items="itemToEdit.options" />
                    <MyCheckbox id="make-required" label="Сделать поле обязательным" v-model="itemToEdit.required"
                      class="mb-25px" />
                    <div class="flex gap-15px justify-between max-w-fit">
                        <UiButton variant="action" size="semiaction" @click="updateQuestion(itemToEdit)">Сохранить
                        </UiButton>
                        <UiButton variant="back" size="second-back" @click="handleCloseSettingsPopup">
                            Отмена
                        </UiButton>
                    </div>
                </div>
            </Popup>
        </transition>
        <transition name="fade" @after-leave="enableBodyScroll">
            <Popup :isOpen="openDeletePopup" @close="handleCloseDeletePopup" :width="'490px'" :showCloseButton="false"
              :parentRounded="true">
                <p class="leading-normal text-xl font-semibold text-space mb-2">
                    Удаление поля
                </p>
                <p class="text-sm font-normal text-slate-custom mb-25px">
                    Вы действительно хотите удалить поле “{{ itemToDelete?.title }}” ?
                </p>
                <div class="flex gap-15px justify-between">
                    <UiButton variant="back" size="second-back" @click="handleCloseDeletePopup">
                        Отмена
                    </UiButton>
                    <UiButton variant="delete" size="delete" @click="confirmDelete">Удалить поле</UiButton>
                </div>
            </Popup>
        </transition>
        <transition name="fade" @after-leave="enableBodyScroll">
            <Popup :isOpen="openAddQuestionPopup" @close="handleCloseAddQuestionPopup" :width="'490px'"
              :showCloseButton="false" :disableOverflowHidden="true" :lgSize="true" :overflowVisible="true"
              :parentRounded="true">
                <p class="text-xl font-semibold text-space mb-6">Новое поле</p>
                <p class="text-sm font-medium text-space mb-15px">Тип поля</p>
                <my-dropdown :defaultValue="'Выберите тип поля'" :options="SettingsArray" v-model="newField.type" />
                <div
                  v-if="['Поле для ввода в одну строку', 'Поле для ввода в несколько строк', 'Время (выбор времени)', 'Дата (выбор даты)', 'Дата (срок)', 'Ссылка', 'Адрес', 'Файл'].includes(newField.type)">
                    <p class="text-sm font-medium text-space my-15px">Заголовок</p>
                    <MyInput :placeholder="'Введите текст'" v-model="newField.title" class="mb-5" />
                    <MyCheckbox id="make-required" label="Сделать поле обязательным" v-model="newField.required"
                      class="mb-25px" />
                    <div class="flex gap-15px justify-between max-w-fit">
                        <UiButton variant="action" size="semiaction" @click="addQuestion">Сохранить</UiButton>
                        <UiButton variant="back" size="second-back" @click="handleCloseNewFieldPopup">
                            Отмена
                        </UiButton>
                    </div>
                </div>
                <div
                  v-if="['Выпадающий список (один выбор)', 'Мультисписок (вопрос с вариантами ответа)', 'Чекбокс'].includes(newField.type)">
                    <p class="text-sm font-medium text-space my-15px">Заголовок</p>
                    <MyInput :placeholder="'Введите текст'" v-model="newCheckboxField.title" />
                    <GenerateDraggable v-model:items="itemsForCheckbox"
                      :placeholder="['Мультисписок (вопрос с вариантами ответа)', 'Выпадающий список (один выбор)'].includes(newField.type) ? 'Вариант ответа' : 'Введите утверждение'" />
                    <MyCheckbox id="make-required" label="Сделать поле обязательным" v-model="newCheckboxField.required"
                      class="mb-25px" />
                    <div class="flex gap-15px justify-between max-w-fit">
                        <UiButton variant="action" size="semiaction" @click="addCheckboxQuestion">Сохранить</UiButton>
                        <UiButton variant="back" size="second-back" @click="handleCloseNewFieldPopup">
                            Отмена
                        </UiButton>
                    </div>
                </div>
            </Popup>
        </transition>
    </div>
</template>

<style scoped>
.card-list {
    display: flex;
    flex-direction: column;
}

.card {
    display: flex;
    align-items: center;
    background-color: transparent;
}

.card:not(:last-child) {
    margin-bottom: 10px;
}

.card-title {
    flex-grow: 1;
}

.settings-button,
.delete-button {
    border: 1px solid #edeff5;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
    background-color: #f4f6f8;
}

.add-question-button {
    color: #5898ff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    width: fit-content;
    display: flex;
    align-items: center;
}

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

.star {
    position: relative;
    top: -8px;
    height: 5px;
    right: -4px;
    margin-right: 7px;
}
</style>