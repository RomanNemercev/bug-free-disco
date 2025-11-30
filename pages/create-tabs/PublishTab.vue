<template>
    <div class="container pb-72 pt-48">
        <!-- Заголовок -->
        <div class="flex justify-between bg-white rounded-fifteen p-25px items-center mb-15px">
            <div>
                <p class="text-xl font-semibold text-space mb-2.5">Активные публикации</p>
                <p class="text-sm font-normal text-slate-custom">
                    Сюда перемещаются активные объявления опубликованные на&nbsp;сайтах или импортированные
                    из&nbsp;подключенных профилей
                </p>
            </div>
            <UiButton variant="action" size="action" class="font-bold" @click="openPopupNewPublication">
                Добавить публикацию
            </UiButton>
            <Popup
                  :isOpen="isOpenPopup"
                  @close="() => (isOpenPopup = false)"
                  :width="'740px'"
                  :showCloseButton="false"
                  :disableOverflowHidden="true"
                  :overflowContainer="true"
                  maxHeight
                  :lgSize="true"
            >
            <AddPublication/>
            </Popup>
        </div>

        <!-- Таблица на Grid -->
        <div class="table-container">
            <!-- Хедер -->
            <div class="table-header">
                <div>
                    <MyCheckbox id="select-all" :label="''" v-model="allSelected" @update:modelValue="toggleAll"
                      :emptyLabel="true" />
                </div>
                <div class="px-2.5">Вакансия</div>
                <div class="px-2.5">Регион</div>
                <div class="px-2.5">Тариф</div>
                <div @click="sortBy('site')" class="flex items-center gap-x-2.5 px-2.5 cursor-pointer select-none">
                    Сайт
                    <div class="sort-arrow" :style="sortArrowStyle('site')">
                        <svg-icon name="sort-arrow" width="16px" height="15px" />
                    </div>
                </div>

                <div @click="sortBy('views')" class="flex items-center gap-x-2.5 px-2.5 cursor-pointer select-none">
                    Просмотры
                    <div class="sort-arrow" :style="sortArrowStyle('views')">
                        <svg-icon name="sort-arrow" width="16px" height="15px" />
                    </div>
                </div>
                <div @click="sortBy('responses')" class="flex items-center gap-x-2.5 px-2.5 cursor-pointer select-none">
                    Отклики<div class="sort-arrow" :style="sortArrowStyle('responses')">
                        <svg-icon name="sort-arrow" width="16px" height="15px" />
                    </div>
                </div>
                <div @click="sortBy('expires')" class="flex items-center gap-x-2.5 px-2.5 cursor-pointer select-none">
                    Истекает<div class="sort-arrow" :style="sortArrowStyle('expires')">
                        <svg-icon name="sort-arrow" width="16px" height="15px" />
                    </div>
                </div>
                <div></div>
            </div>

            <!-- Тело -->
            <div class="table-body">
                <div v-for="item in sortedData" :key="item.id" class="table-row">
                    <div>
                        <MyCheckbox :id="item.id" :label="''" v-model="selected[item.id]" :emptyLabel="true" />
                    </div>
                    <div class="text-sm font-medium text-space px-2.5">{{ item.name }}</div>
                    <div class="text-sm font-medium text-space px-2.5">{{ item.area.name }}</div>
                    <div class="text-sm font-medium text-space px-2.5">{{ item.billing_type?.name ?? 'Стандарт' }}</div>
                    <div>
                        <CardIcon icon="hh" :isPng="false" imagePath="" :width="21"
                          :height="21" class="px-2.5" />
                    </div>
                    <div class="text-sm font-medium text-space px-2.5">{{ item.views }}</div>
                    <div class="text-sm font-medium text-space px-2.5">{{ item.responses }}</div>
                    <div class="text-sm font-medium text-space px-2.5">{{ dateStringToDots(item.published_at) }}</div>
                    <div>
                        <DotsDropdown :items="dropdownOptions" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from "vue";
import MyCheckbox from "~/components/custom/MyCheckbox.vue";
import DotsDropdown from '~/components/custom/DotsDropdown.vue';
import CardIcon from '~/components/custom/CardIcon.vue';
import Popup from '~/components/custom/Popup.vue';
import AddPublication from "~/components/platforms/AddPublication.vue";
import { getPublications } from "~/utils/hhAccount";
import { dateStringToDots } from "@/helpers/date";

const data = ref([
    { id: 1, vacancy: "Менеджер по продажам не детских игрушек", region: "Санкт-Петербург", tariff: "Стандарт", site: "SJ", icon: "sj20", isPng: false, imagePath: "", views: 3250, responses: 492, expires: "18.12" },
    { id: 2, vacancy: "Администратор", region: "Самара городок", tariff: "С автоподнятием", site: "3", icon: "zarplata20", isPng: false, imagePath: "", views: 3249, responses: 491, expires: "18.11" },
    { id: 3, vacancy: "Повар кассир", region: "Самара городок", tariff: "С автоподнятием", site: "3", icon: "zarplata20", isPng: false, imagePath: "", views: 2249, responses: 391, expires: "17.11" },
    { id: 4, vacancy: "Лесник", region: "Самара городок", tariff: "С автоподнятием", site: "3", icon: "zarplata20", isPng: false, imagePath: "", views: 3149, responses: 481, expires: "19.11" },
    { id: 5, vacancy: "Менеджер по продажам всякой всячины", region: "Самара городок", tariff: "С автоподнятием", site: "3", icon: "zarplata20", isPng: false, imagePath: "", views: 3239, responses: 461, expires: "14.11" },
    { id: 6, vacancy: "Разработчик", region: "Самара городок", tariff: "С автоподнятием", site: "3", icon: "zarplata20", isPng: false, imagePath: "", views: 3248, responses: 490, expires: "18.10" },
    { id: 7, vacancy: "Бизнес коуч", region: "Самара городок", tariff: "С автоподнятием", site: "3", icon: "zarplata20", isPng: false, imagePath: "", views: 3229, responses: 421, expires: "11.11" },
    { id: 8, vacancy: "Астролог", region: "Томск", tariff: "С Бизнес", site: "youla", icon: false, isPng: true, imagePath: "/img/logo20.png", views: 3249, responses: 491, expires: "18.11" },
    // Добавь остальные данные
]);


const selected = ref({}); // Выбранные чекбоксы
const allSelected = ref(false);
const sortKey = ref(""); // Поле для сортировки
const sortOrder = ref("asc"); // Порядок сортировки
const sortDirection = ref("asc");
const isOpenPopup = ref(false);
const publicationsHh = ref([]);
const publications = await getPublications()
publicationsHh.value = publications.roles?.items
console.log('publicationsHh.value', publicationsHh.value)
const sortedData = computed(() => {
    if (!sortKey.value) return publicationsHh.value;
    return [...publicationsHh.value].sort((a, b) => {
        const multiplier = sortOrder.value === "asc" ? 1 : -1;
        if (a[sortKey.value] > b[sortKey.value]) return 1 * multiplier;
        if (a[sortKey.value] < b[sortKey.value]) return -1 * multiplier;
        return 0;
    });
});

const sortBy = (key) => {
    if (sortKey.value === key) {
/**
 * Changes the sort order of the list of publications.
 * If the sort key is the same as the current sort key, the sort order is reversed.
 * If the sort key is different, the sort order is set to ascending.
 * @param {string} key - The key to sort by.
 */
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
        sortKey.value = key;
        sortOrder.value = "asc";
        sortDirection.value = "asc";
    }
};

// Вычисляемое свойство для стилей стрелки
const sortArrowStyle = (key) => {
    return {
        transform: sortKey.value === key && sortOrder.value === "asc" ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease", // Плавное вращение
    };
};

const toggleAll = (isChecked) => {
    data.value.forEach((item) => {
        selected.value[item.id] = isChecked;
    });
};

// Следить за изменениями состояния частных чекбоксов
watch(selected, (newSelected) => {
    // Проверяем, выбраны ли все элементы
    const allChecked = data.value.every(item => newSelected[item.id]);
    const noneChecked = data.value.every(item => !newSelected[item.id]);

    allSelected.value = allChecked; // Обновляем общий чекбокс

    // Логика для состояния "частично выбрано" (например, при необходимости в будущем)
    if (!allChecked && !noneChecked) {
        console.log("Частично выбрано"); // Для добавления UI-реакции
    }
}, { deep: true }); // Обязательно deep, так как мы следим за вложенными объектами

const dropdownOptions = ["Редактировать текст", "Посмотреть публикацию", "Снять с публикации", "Дублировать публикацию", "Показать отчет по публикации"];

const openPopupNewPublication = () => {
    isOpenPopup.value = true;
}
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
    grid-template-columns:
        1.75%
        /* 1-й столбец */
        16.186%
        /* 2-й столбец */
        16.186%
        /* 3-й столбец */
        16.186%
        /* 4-й столбец */
        7.175%
        /* 5-й столбец */
        11.199%
        /* 6-й столбец */
        9.362%
        /* 7-й столбец */
        9.887%
        /* 8-й столбец */
        3.5%;
    /* 9-й столбец */
    gap: 10px;
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
    /* Для эстетики */
}

.table-row:last-child {
    border-radius: 0 0 15px 15px;
}
</style>