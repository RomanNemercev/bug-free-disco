<template>
    <div class="config-response">
        <h2 class="text-xl font-semibold text-space mb-1">Форма отклика</h2>
        <p class="text-sm font-normal text-slate-custom mb-8">
            Настройте форму отклика для публичной вакансии
        </p>

        <draggable v-model="items" itemKey="id" handle=".drag-handle" animation="200" ghostClass="ghost"
          chosenClass="chosen" @start="onDragStart" @end="onDragEnd">
            <template #item="{ element }">
                <div class="card flex" :class="{ 'dragging-card': isDragging }">
                    <div class="drag-handle p-2.5 mr-15px cursor-grab">
                        <svg-icon name="drag-burger" width="20" height="20" />
                    </div>
                    <div
                      class="w-full border border-athens rounded-ten bg-athens-gray flex justify-between items-center pl-15px pr-2.5 py-[6.5px]">
                        <div>
                            <p class="text-sm font-normal text-space">
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
                        <template v-else>
                            <Checkbox :value="element.value" @update:value="updateValue(element, $event)" />
                        </template>
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<script>
import { ref } from "vue";
import draggable from "vuedraggable";
import Checkbox from "./CheckBox.vue";
import RadioSwitch from "./RadioSwitch.vue";

export default {
    components: { draggable, Checkbox, RadioSwitch },
    setup() {
        const items = ref([]);
        const isDragging = ref(false);

        const updateValue = (item, newValue) => {
            item.value = newValue;
        };

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
                        { label: "Выключено", value: false },
                    ],
                },
                {
                    id: 4,
                    title: "Заголовок",
                    type: "checkbox",
                    value: false,
                },
            ];
        };

        const onDragStart = () => {
            isDragging.value = true;
        };

        const onDragEnd = () => {
            isDragging.value = false;
        };

        fetchItems();

        return {
            items,
            isDragging,
            updateValue,
            onDragStart,
            onDragEnd,
        };
    },
};
</script>

<style scoped>
.card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:not(:last-child) {
    margin-bottom: 0.5rem;
}

/* Эффект увеличения при переносе */
.chosen {
    transform: scale(1.2);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

/* Прозрачный элемент (оставленный на месте перетаскивания) */
.ghost {
    opacity: 0.5;
    background: #f7f7f7;
    border-style: dashed;
}

/* Реакция списка на перетаскивание */
.dragging-card {
    transition: all 0.2s ease;
}

/* Раздвигание списка в месте, куда вставляется элемент */
.dragging-card:not(.chosen) {
    margin-bottom: 1rem;
}
</style>
