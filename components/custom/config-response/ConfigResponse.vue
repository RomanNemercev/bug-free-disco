<template>
    <div class="config-response">
        <h2 class="text-xl font-semibold text-space mb-1">Форма отклика</h2>
        <p class="text-sm font-normal text-slate-custom mb-8">
            Настройте форму отклика для публичной вакансии
        </p>

        <draggable v-model="items" item-key="id" handle=".drag-handle" animation="200" ghost-class="ghost"
          chosen-class="chosen" @start="onDragStart" @end="onDragEnd">
            <template #item="{ element }">
                <div class="card flex" :class="{ 'dragging-card': isDragging }">
                    <div class="drag-handle p-2.5 mr-15px cursor-grab">
                        <svg-icon name="drag-burger" width="20" height="20" />
                    </div>
                    <div
                      class="w-full border border-athens rounded-ten bg-athens-gray flex justify-between items-center pl-15px pr-2.5 py-[6.5px]">
                        <div class="max-w-[calc(100%/3)]">
                            <p class="text-sm font-normal text-space truncate">
                                {{ element.title }}
                            </p>
                        </div>

                        <!-- Условия -->
                        <template v-if="element.type === 'mandatory'">
                            <div
                              class="fixed-card rounded-ten bg-dodger text-white text-13px font-medium py-[5px] px-2.5">
                                Обязательно
                            </div>
                        </template>
                        <template v-else-if="element.type === 'radio'">
                            <RadioSwitch :value="element.value" :options="element.options"
                              @update:value="updateValue(element, $event)" />
                        </template>
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import draggable from "vuedraggable";
import RadioSwitch from "./RadioSwitch.vue";

// Реактивные переменные
const items = ref([]);
const isDragging = ref(false);

// Функция для обновления значения
const updateValue = (item, newValue) => {
    item.value = newValue;
};

// Функция для загрузки данных
const fetchItems = async () => {
    items.value = [
        { id: 1, title: "Фамилия Имя Отчество", type: "mandatory" },
        { id: 2, title: "Электронная почта", type: "mandatory" },
        {
            id: 3,
            title: "Телефон",
            type: "radio",
            value: false,
            options: [
                { label: "Обязательно", value: true },
                { label: "Необязательно", value: false },
                { label: "Выключено", value: 'phone-none' },
            ],
        },
        {
            id: 4,
            title: "Заголовок",
            type: "radio",
            value: false,
            options: [
                { label: "Обязательно", value: true },
                { label: "Необязательно", value: false },
                { label: "Выключено", value: 'title-none' },
            ],
        },
        {
            id: 5,
            title: "Адрес проживания",
            type: "radio",
            value: false,
            options: [
                { label: "Обязательно", value: true },
                { label: "Необязательно", value: false },
                { label: "Выключено", value: 'adress-none' },
            ],
        },
        {
            id: 6,
            title: "Фото",
            type: "radio",
            value: false,
            options: [
                { label: "Обязательно", value: true },
                { label: "Необязательно", value: false },
                { label: "Выключено", value: 'photo-none' },
            ],
        },
        {
            id: 7,
            title: "Образование",
            type: "radio",
            value: false,
            options: [
                { label: "Необязательно", value: false },
                { label: "Выключено", value: 'education-none' },
            ]
        },
        {
            id: 8,
            title: "Опыт работы",
            type: "radio",
            value: false,
            options: [
                { label: "Необязательно", value: false },
                { label: "Выключено", value: 'work-none' },
            ]
        },
        {
            id: 9,
            title: "Загрузка резюме",
            type: "radio",
            value: false,
            options: [
                { label: "Обязательно", value: true },
                { label: "Необязательно", value: false },
                { label: "Выключено", value: 'resume-none' },
            ]
        },
        {
            id: 10,
            title: "Сопроводительное письмо",
            type: "radio",
            value: false,
            options: [
                { label: "Обязательно", value: true },
                { label: "Необязательно", value: false },
                { label: "Выключено", value: 'letter-none' },
            ]
        },
    ];
};

// Обработчики событий перетаскивания
const onDragStart = () => {
    isDragging.value = true;
};

const onDragEnd = () => {
    isDragging.value = false;
};

// Загрузка данных при монтировании компонента
onMounted(() => {
    fetchItems();
});
</script>

<style scoped>
.card:not(:last-child) {
    margin-bottom: 0.5rem;
}
</style>
