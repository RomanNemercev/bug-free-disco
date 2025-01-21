<template>
    <div class="container pb-72 pt-48">
        <div class="flex justify-between bg-white rounded-fifteen p-25px items-center mb-15px">
            <div>
                <p class="text-xl font-semibold text-space mb-2.5">Ваша команда</p>
                <p class="text-sm font-normal text-slate-custom">
                    Назначьте рекрутер или заказчиков, которые будут взаимодействовать с&nbsp;этой вакансией
                </p>
            </div>
            <UiButton variant="black" size="black" class="font-bold" @click="openPopup">Добавить участников</UiButton>
        </div>
        <div class="table-container">
            <div class="table-header">
                <div>
                    <MyCheckbox id="select-all" :label="''" v-model="allSelected" @update:modelValue="toggleAll"
                      :emptyLabel="true" />
                </div>
                <div class="px-2.5">Профиль</div>
                <div class="px-2.5">Email</div>
                <div class="px-2.5">Роль</div>
                <div></div>
            </div>
            <div class="table-body">
                <div v-for="item in users" :key="item.id" class="table-row">
                    <MyCheckbox :id="item.id" :label="''" v-model="selected[item.id]" :emptyLabel="true" />
                    <div class="text-sm font-medium text-dodger px-2.5 flex items-center gap-x-2.5">
                        <div class="rounded-full user-outline">
                            <CardIcon :icon="item.icon" :isPng="item.isPng" :imagePath="item.imagePath" :width="45"
                              :height="45" />
                        </div>
                        <div @mouseenter="hoveredIndex = item.id" @mouseleave="hoveredIndex = null"
                          :class="{ 'user-hovered': hoveredIndex === item.id }" class="cursor-pointer select-none">{{
                            item.profile
                            }}</div>
                    </div>
                    <div class="text-sm font-medium text-space px-2.5">{{ item.email }}</div>
                    <div class="text-sm font-medium text-space px-2.5">{{ item.role }}</div>
                    <div>
                        <DotsDropdonw :items="dropdownOptions" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <transition name="fade" @after-leave="enableBodyScroll">
        <Popup :isOpen="isPopupOpen" @close="closePopup" :showCloseButton="false" :width="'490px'"
          :height="'fit-content'" :disableOverflowHidden="true">
            <!-- Первое окно -->
            <div v-if="activePopup === 'invite'">
                <p class="text-xl font-semibold text-space mb-2.5">Новый участник</p>
                <p class="text-sm font-normal text-slate-custom mb-25px">
                    Приглашенному участнику придет письмо с&nbsp;доступом, которое нужно подтвердить.
                </p>
                <div class="flex gap-x-1 mb-15px items-center">
                    <span class="text-red">*</span>
                    <p class="text-sm font-medium text-space leading-normal">Email</p>
                </div>
                <EmailInput v-model="emailInvoice" class="mb-15px" />
                <div class="flex gap-x-1 mb-15px items-center">
                    <span class="text-red">*</span>
                    <p class="text-sm font-medium text-space leading-normal">Доступ</p>
                </div>
                <MultiDropdown :options="optionsData" class="mb-25px" />
                <div class="flex gap-x-15px">
                    <UiButton variant="action" size="action" @click="switchToConfirmation">Пригласить</UiButton>
                    <UiButton variant="back" size="back" @click="closePopup">Отмена</UiButton>
                </div>
            </div>

            <!-- Второе окно -->
            <div v-if="activePopup === 'confirmation'">
                <p class="text-xl font-semibold text-space mb-2.5">Приглашение отправлено</p>
                <p class="text-sm font-normal text-slate-custom mb-25px">
                    Пользователю {{ emailInvoice }} направлено письмо с регистрацией в системе.
                    Вы получите уведомление, как только он примет ваше приглашение.
                </p>
                <div class="flex gap-x-15px">
                    <UiButton variant="action" size="semiaction" @click="closePopup">Хорошо</UiButton>
                    <UiButton variant="delete" size="delete" @click="cancelInvitation">Отменить приглашение</UiButton>
                </div>
            </div>
        </Popup>
    </transition>

</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";

import MyCheckbox from "~/components/custom/MyCheckbox.vue";
import DotsDropdonw from '~/components/custom/DotsDropdown.vue';
import CardIcon from '~/components/custom/CardIcon.vue';
import Popup from '~/components/custom/Popup.vue';
import EmailInput from '~/components/custom/EmailInput.vue';
import MultiDropdown from '~/components/custom/MultiDropdown.vue';

const selected = ref({}); // Выбранные чекбоксы
const allSelected = ref(false);
const hoveredIndex = ref(null);
const isPopupOpen = ref(false); // control visibility popup
const emailInvoice = ref('');
const activePopup = ref('invite'); // Текущее активное окно ('invite' or 'confirmation')

// Функции для управления прокруткой
function disableBodyScroll() {
    document.body.style.overflow = 'hidden'; // Отключаем прокрутку
}

function enableBodyScroll() {
    document.body.style.overflow = ''; // Восстанавливаем прокрутку
}

function openPopup() {
    isPopupOpen.value = true;
    activePopup.value = 'invite'; // Открываем начальное окно
    disableBodyScroll();
}

function closePopup() {
    console.log('Закрываем попап');
    isPopupOpen.value = false;
    activePopup.value = 'invite'; // Сбрасываем на начальное окно
    enableBodyScroll();
}

function switchToConfirmation() {
    console.log('Переключаемся на окно confirmation');
    activePopup.value = 'confirmation'; // Переключаемся на окно подтверждения
}

function cancelInvitation() {
    alert('Приглашение отменено');
}

// Убедимся, что при размонтировании компонента скролл включится
onBeforeUnmount(() => {
    enableBodyScroll();
});

const users = ref([
    { id: 1, isPng: true, imagePath: "/img/user.png", profile: "Туманов Анатолий Семенович", email: "tumanovanatolya@gmail.com", role: "Рекрутер" },
    { id: 2, isPng: true, imagePath: "/img/user.png", profile: "Антонов Александр", email: "anton10203gmail.com", role: "Рекрутер" },
    { id: 3, isPng: true, imagePath: "/img/user.png", profile: "Лидия Семенова", email: "lidiasemenova@gmail.com", role: "Рекрутер" },
    { id: 4, isPng: true, imagePath: "/img/user.png", profile: "Алексей Самсонов", email: "samsonov1204871824@gmail.com", role: "Рекрутер" },
])

const optionsData = [
    {
        "id": 1,
        "title": "Администратор",
        "description": "Может добавлять, редактировать, активировать вакансии. Имеет доступ к отчетам и многому другому."
    },
    {
        "id": 2,
        "title": "Рекрутер",
        "description": "Имеет доступ к кандидатам, комментариям и электронной почте. Может создать вакансию добавить и команду."
    },
    {
        "id": 3,
        "title": "Заказчик",
        "description": "Имеет доступ к статистики, может оставлять комментарии и оценивать кандидатов."
    }
]

const dropdownOptions = ["Редактировать текст", "Посмотреть публикацию", "Снять с публикации", "Дублировать публикацию", "Показать отчет по публикации"];

const toggleAll = (isChecked) => {
    users.value.forEach((item) => {
        selected.value[item.id] = isChecked;
    });
};

// Следить за изменениями состояния частных чекбоксов
watch(selected, (newSelected) => {
    // Проверяем, выбраны ли все элементы
    const allChecked = users.value.every(item => newSelected[item.id]);
    const noneChecked = users.value.every(item => !newSelected[item.id]);

    allSelected.value = allChecked; // Обновляем общий чекбокс

    // Логика для состояния "частично выбрано" (например, при необходимости в будущем)
    if (!allChecked && !noneChecked) {
        console.log("Частично выбрано"); // Для добавления UI-реакции
    }
}, { deep: true }); // Обязательно deep, так как мы следим за вложенными объектами
</script>

<style scoped>
.table-container {
    display: grid;
    grid-template-rows: auto;
    /* Автоматическая высота строк */
    gap: 1px;
    /* Отступы между строками */
}

.table-body {
    display: grid;
    gap: 1px;
    /* Отступы между строками */
}

.table-header,
.table-row {
    display: grid;
    grid-template-columns: 1.778% 26.667% 44.89% 17.778% 3.556%;
    gap: 15px;
    /* Горизонтальный отступ */
    padding: 20px 25px;
    align-items: center;
    /* Центрирование содержимого */
}

.table-header {
    background-color: #f5f7fa;
    border-radius: 15px 15px 0 0;
    font-weight: 500;
    font-size: 14px;
    color: #79869a;
    text-align: left;
}

.table-row {
    background-color: #ffffff;
}

.user-outline {
    outline: 2px solid rgba(0, 82, 208, 0.2);
    outline-offset: -2px;
}

.table-row:last-child {
    border-radius: 0 0 15px 15px;
}

.user-hovered {
    text-decoration: underline;
}

/* Анимация появления и скрытия */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    /* transform: scale(0.95); */
    /* Небольшое уменьшение */
}

.fade-leave-from {
    opacity: 1;
    /* transform: scale(1); */
}
</style>