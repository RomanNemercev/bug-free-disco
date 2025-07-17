<template>
    <label v-for="option in props.options" :key="option.value"
      class="flex items-center cursor-pointer check-wrapper w-fit">
        <input type="checkbox" :id="option.value" :value="option.value" v-model="selectedOptions" class="hidden" />
        <div class="mr-2.5 w-5 h-5 flex items-center justify-center border rounded-md check-item" :class="{
            'bg-dodger border-dodger': selectedOptions.includes(option.value),
            'border-athens bg-athens-gray': !selectedOptions.includes(option.value)
        }">
            <svg v-if="selectedOptions.includes(option.value)" xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M16.704 5.293a1 1 0 00-1.408 0L7.5 12.086 4.704 9.293a1 1 0 00-1.408 1.414l3.5 3.5a1 1 0 001.408 0l8-8a1 1 0 000-1.414z"
                  clip-rule="evenodd" />
            </svg>
        </div>
        <span class="text-sm text-space select-none">{{ option.label }}</span>
    </label>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    options: {
        type: Array,
        required: true,
        validator: (options) => options.every(opt => 'value' in opt && 'label' in opt)
    },
    modelValue: {
        type: Array,
        default: () => [],
    },
})

const emit = defineEmits(['update:modelValue'])

const selectedOptions = ref([...props.modelValue])

// Синхронизация modelValue → selectedOptions
watch(() => props.modelValue, (newValue) => {
    // Проверяем, отличается ли новое значение от текущего, чтобы избежать рекурсии
    if (JSON.stringify(newValue) !== JSON.stringify(selectedOptions.value)) {
        selectedOptions.value = [...newValue]
    }
}, { immediate: true })

// Синхронизация selectedOptions → modelValue
watch(selectedOptions, (newValue) => {
    // Проверяем, отличается ли новое значение от modelValue, чтобы избежать рекурсии
    if (JSON.stringify(newValue) !== JSON.stringify(props.modelValue)) {
        emit('update:modelValue', newValue)
    }
}, { deep: true })
</script>

<style scoped>
.check-wrapper:hover .check-item {
    border: 1px solid #5898FF;
}
</style>