<template>
    <div class="w-full">
        <input class="w-full rounded-ten py-2.5 px-15px text-sm font-normal text-space transition-colors" :type="type"
          :value="localValue" @input="updateValue" :placeholder="isFocused ? '' : placeholder"
          :class="[isFocused ? 'focused' : '', isHovered ? 'bg-catskill' : '']" @focus="isFocused = true"
          @blur="isFocused = false" @mouseover="isHovered = true" @mouseleave="isHovered = false" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    placeholder: {
        type: String,
        default: '...'
    },
    type: {
        type: String,
        default: 'text'
    },
    modelValue: {
        type: [String, Number],
        default: null,
    }
})

const emit = defineEmits(['update:modelValue'])
const isFocused = ref(false);
const isHovered = ref(false);
const localValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
        localValue.value = newValue;
    }
);

const updateValue = (event) => {
    localValue.value = event.target.value;
    emit('update:modelValue', localValue.value);
}
</script>

<style scoped>
input::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
}

.focused {
    background-color: #f9fafc;
    border: 1px solid #5898FF;
    outline: none;
}
</style>