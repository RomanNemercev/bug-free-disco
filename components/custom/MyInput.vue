<script setup>
import { ref, watch } from 'vue';

const isFocused = ref(false)

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Введите значение'
    },
    type: {
        type: String,
        default: 'text'
    },
    modelValue: {
        type: [String, Number],
        default: null, // value on default
    }
})

const emit = defineEmits(['update:modelValue'])
const localValue = ref(props.modelValue); // local state for control value

// watch for value change
watch(
    () => props.modelValue,
    (newValue) => {
        localValue.value = newValue;
    }
);

// update value on enter at input
const updateValue = (event) => {
    localValue.value = event.target.value;
    emit('update:modelValue', localValue.value);
};
</script>

<template>
    <div class="w-full">
        <input :type="type"
          class="text-sm font-normal bg-athens-gray border border-athens rounded-ten min-h-10 w-full pl-15px"
          :placeholder="isFocused ? '' : placeholder" :value="localValue" @input="updateValue" @focus="isFocused = true"
          :class="{ 'focused': isFocused }" @blur="isFocused = false" />
    </div>
</template>

<style scoped>
input::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
}

.focused {
    border: 1px solid #5898FF;
    outline: none;
}
</style>