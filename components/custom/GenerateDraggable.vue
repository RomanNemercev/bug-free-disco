<template>
    <draggable v-model="items" item-key="id" handle=".drag-handle" animation="200" ghost-class="ghost"
      chosen-class="chosen" @start="onDragStart" @end="onDragEnd">
        <template #item="{ element, index }">
            <div class="card first-of-type:mt-4 last-of-type:mb-4" :class="{ 'dragging-card': isDragging }">
                <div class="drag-handle w-10 h-10 p-2.5 mr-2.5 cursor-grab">
                    <svg-icon name="drag-burger" width="20" height="20" />
                </div>
                <div class="card-content flex items-center w-full overflow-hidden">
                    <MyInput :placeholder="props.placeholder" v-model="element.title" />
                </div>
                <button class="delete-button" @click="removeCard(index)">
                    <svg-icon name="more-delete" width="18" height="18" />
                </button>
                <button v-if="index === items.length - 1" class="add-button text-slate-custom" @click="addCard(index)">
                    <svg-icon name="more-plus" width="18" height="18" />
                </button>
            </div>
        </template>
    </draggable>
</template>

<script setup>
import { computed, ref } from "vue";
import draggable from "vuedraggable";
import MyInput from "~/components/custom/MyInput.vue";

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    placeholder: {
        type: String,
        default: "Введите значение",
    }
});
const emit = defineEmits(['update:items']);

const items = computed({
    get: () => props.items,
    set: (val) => emit('update:items', val),
});

const isDragging = ref(false);

const onDragStart = () => {
    isDragging.value = true;
};

const onDragEnd = () => {
    isDragging.value = false;
};

const removeCard = (index) => {
    if (items.value.length > 1) {
        items.value.splice(index, 1);
        emit('update:items', [...items.value]);
    } else {
        alert("Нельзя удалить последний вариант");
    }
};

const addCard = (index) => {
    const newCard = {
        id: Date.now(),
        title: '',
    };
    items.value.splice(index + 1, 0, newCard);
    emit('update:items', [...items.value]);
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