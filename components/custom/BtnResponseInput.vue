<template>
    <div ref="responseContainer">
        <div v-if="modelValue" class="text-sm font-medium text-dodger pl-15px">{{ modelValue }}</div>
        <button v-else-if="!showInput" @click="openInput" class="text-sm font-medium text-dodger py-2.5 px-15px">
            Добавить
        </button>
        <response-input v-show="showInput" class="w-full" :responses="responses" v-model="inputValue"
          @update:modelValue="updateResponse" />
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import ResponseInput from './ResponseInput.vue';

const props = defineProps({
    modelValue: String, // Данные из v-model
    responses: Array, // Передаваемые ответы
});
const emit = defineEmits(['update:modelValue']);

const showInput = ref(false);
const inputValue = ref(props.modelValue);
const responseContainer = ref(null);

const openInput = (event) => {
    event.stopPropagation();
    showInput.value = true;
};

const updateResponse = (value) => {
    if (value) {
        inputValue.value = value;
        emit('update:modelValue', value);
        showInput.value = false;
    }
};

// Закрываем input при клике вне него
const handleClickOutside = (event) => {
    if (responseContainer.value && !responseContainer.value.contains(event.target)) {
        if (!inputValue.value) {
            showInput.value = false;
        }
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

// Следим за внешними изменениями modelValue
watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
});
</script>