<template>
    <div class="card-list">
        <draggable v-model="items" item-key="id" handle=".drag-handle" animation="200" ghost-class="ghost"
          chosen-class="chosen" @start="onDragStart" @end="onDragEnd">
            <template #item="{ element }">
                <div class="card" :class="{ 'dragging-card': isDragging }">
                    <div class="drag-handle">
                        <svg-icon name="drag-burger" width="20" height="20" />
                    </div>
                    <svg-icon v-if="element.icon" :name="element.icon" width="18" height="18" />
                    <div class="card-title">{{ element.title }}</div>
                    <button class="settings-button" @click="openSettings(element)">
                        <svg-icon name="more-settings" width="18" height="18" />
                    </button>
                    <button class="delete-button" @click="openDeletePopup(element)">
                        <svg-icon name="more-delete" width="18" height="18" />
                    </button>
                </div>
            </template>
        </draggable>
        <button class="add-question-button" @click="openAddQuestionPopup">
            Добавить вопрос
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from "vuedraggable";

const items = ref([
    { id: 1, title: 'Доводилось ли вам принимать участие в международных конференциях?', icon: 'conference', },
    { id: 2, title: 'Какими из перечисленных программ вы вледеете?', icon: 'software', },
    { id: 3, title: 'Готов приступить к работе ближайшее время?', icon: 'ready', },
])

function openSettings(item) {
    console.log('Open settings popup for:', item);
}

function openDeletePopup(item) {
    console.log('Open delete popup for:', item);
}

function openAddQuestionPopup() {
    console.log('Open add question popup');
}

const onDragStart = () => {
    isDragging.value = true;
};

const onDragEnd = () => {
    isDragging.value = false;
}

const isDragging = ref(false);
</script>

<style scoped>
.card-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.card {
    display: flex;
    align-items: center;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
}

.card:not(:last-child) {
    margin-bottom: 12px;
}

.drag-handle {
    cursor: grab;
    margin-right: 8px;
}

.card-title {
    flex-grow: 1;
    margin-left: 8px;
}

.settings-button,
.delete-button {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 8px;
}

.add-question-button {
    margin-top: 12px;
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>