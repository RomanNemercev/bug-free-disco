<template>
    <draggable v-model="items" item-key="id" handle=".drag-handle" animation="200" ghost-class="ghost"
      chosen-class="chosen" @start="onDragStart" @end="onDragEnd">
        <template #item="{ element, index }">
            <div class="card" :class="{ 'dragging-card': isDragging }">
                <div class="drag-handle w-10 h-10 p-2.5 mr-2.5 cursor-grab">
                    <svg-icon name="drag-burger" width="20" height="20" />
                </div>
                <div class="card-content flex items-center w-full overflow-hidden">
                    <MyInput placeholder="Введите значение" v-model="element.title" />
                </div>
                <button class="delete-button" @click="removeCard(index)">
                    <svg-icon name="more-delete" width="18" height="18" />
                </button>
                <button v-if="element.plus" class="add-button" @click="addCard(index)">
                    <svg-icon name="more-plus" width="18" height="18" />
                </button>
            </div>
        </template>
    </draggable>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import MyInput from "~/components/custom/MyInput.vue";

const items = ref([
    { id: 1, title: 'Да', plus: false },
    { id: 2, title: 'Нет', plus: false },
    { id: 3, title: 'Нет, но готов приобрести', plus: true },
]);

const onDragStart = () => {
    isDragging.value = true;
};

const onDragEnd = () => {
    isDragging.value = false;
}

const isDragging = ref(false);

// Удаление карточки
const removeCard = (index) => {
    if (items.value.length > 1) { // Проверяем длину массива items
        items.value.splice(index, 1); // Удаляем карточку
    } else {
        alert("Нельзя удалить последнюю карточку"); // Сообщение об ошибке
    }
};


// Добавление новой карточки
const addCard = (index) => {
    const newCard = {
        ...items.value[index], // Копируем данные текущей карточки
        id: Date.now(), // Генерируем уникальный ID
    };
    items.value.splice(index + 1, 0, newCard); // Вставляем карточку после текущей
};
</script>

<style scoped>
.card {
    display: flex;
    align-items: center;
    background-color: transparent;
}

.card:not(:last-child) {
    margin-bottom: 9px;
}

.card-content {
    width: calc(100% - 150px);
}

.delete-button,
.add-button {
    border: 1px solid #edeff5;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
    background-color: #f4f6f8;
}
</style>