<template>
    <div class="container pb-72 pt-48">
        <div class="flex justify-between bg-white rounded-fifteen p-25px items-center mb-15px">
            <div>
                <p class="text-xl font-semibold text-space mb-2.5">Активные публикации</p>
                <p class="text-sm font-normal text-slate-custom">Сюда перемещаются активные объявления опубликованные
                    на&nbsp;сайтах или импортированные
                    из&nbsp;подключенных профилей</p>
            </div>
            <UiButton variant="action" size="action" class="font-bold">Добавить публикации</UiButton>
        </div>
        <div class="bg-white rounded-fifteen p-25px">
            <table class="w-full">
                <!-- Хедер таблицы -->
                <thead>
                    <tr>
                        <th>
                            <MyCheckbox @change="toggleAll" />
                        </th>
                        <th>Вакансия</th>
                        <th>Регион</th>
                        <th>Тариф</th>
                        <th @click="sortBy('site')">Сайт</th>
                        <th @click="sortBy('views')">Просмотры</th>
                        <th @click="sortBy('responses')">Отклики</th>
                        <th @click="sortBy('expires')">Истекает</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <!-- Тело таблицы -->
                <tbody>
                    <tr v-for="item in sortedData" :key="item.id">
                        <td>
                            <MyCheckbox v-model="selected[item.id]" />
                        </td>
                        <td>{{ item.vacancy }}</td>
                        <td>{{ item.region }}</td>
                        <td>{{ item.tariff }}</td>
                        <td>{{ item.site }}</td>
                        <td>{{ item.views }}</td>
                        <td>{{ item.responses }}</td>
                        <td>{{ item.expires }}</td>
                        <td>
                            <DotsDropdonw :options="dropdownOptions" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import MyCheckbox from "~/components/custom/MyCheckbox.vue";
import DotsDropdonw from '~/components/custom/DotsDropdown.vue';

const data = ref([
    { id: 1, vacancy: "Менеджер по продажам", region: "Санкт-Петербург", tariff: "Стандарт", site: "SJ", views: 3250, responses: 492, expires: "18.12" },
    { id: 2, vacancy: "Администратор", region: "Самара", tariff: "С автоподнятием", site: "3", views: 3250, responses: 492, expires: "18.12" },
    // Добавь остальные данные
]);

const selected = ref({}); // Выбранные чекбоксы

const sortKey = ref(""); // Поле для сортировки
const sortOrder = ref("asc"); // Порядок сортировки

const sortedData = computed(() => {
    if (!sortKey.value) return data.value;
    return [...data.value].sort((a, b) => {
        const multiplier = sortOrder.value === "asc" ? 1 : -1;
        if (a[sortKey.value] > b[sortKey.value]) return 1 * multiplier;
        if (a[sortKey.value] < b[sortKey.value]) return -1 * multiplier;
        return 0;
    });
});

const sortBy = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
        sortKey.value = key;
        sortOrder.value = "asc";
    }
};

const toggleAll = (isChecked) => {
    data.value.forEach((item) => {
        selected.value[item.id] = isChecked;
    });
};

const dropdownOptions = ["Редактировать", "Удалить"];
</script>