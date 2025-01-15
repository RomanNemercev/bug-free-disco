<template>
    <draggable v-model="items" item-key="id" handle=".drag-handle" animation="200" ghost-class="ghost"
      chosen-class="chosen" @start="onDragStart" @end="onDragEnd">
        <template #item="{ element }">
            <div class="card" :class="{ 'dragging-card': isDragging }">
                <div class="drag-handle w-10 h-10 p-2.5 mr-15px cursor-grab">
                    <svg-icon name="drag-burger" width="20" height="20" />
                </div>
                <div
                  class="card-content flex items-center py-[9px] px-15px border border-athens rounded-ten bg-athens-gray w-full overflow-hidden">
                    <div class="card-title text-sm font-normal text-space truncate">{{ element.title }}</div>
                </div>
                <button class="delete-button">
                    <svg-icon name="more-delete" width="18" height="18" />
                </button>
                <button v-if="element.plus" class="add-button">
                    <svg-icon name="more-plus" width="18" height="18" />
                </button>
            </div>
        </template>
    </draggable>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

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
</script>

<style scoped></style>