<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    initialText: {
        type: String,
        default: 'Добавить'
    },
    modelValue: {
        type: Object,
        default: null
    },
    validationRules: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['update:modelValue'])

const isExpanded = ref(false)
const isSubmitted = ref(!!props.modelValue)
const formData = ref(props.modelValue || {})
const errors = ref({})

const toggleExpand = () => {
    isExpanded.value = !isExpanded.value
    if (!isExpanded.value) {
        formData.value = props.modelValue || {}
        errors.value = {}
    }
}

const validateField = (field) => {
    const rule = props.validationRules[field]
    if (!rule) return true

    const value = formData.value[field] || ''
    let error = ''

    if (rule.required && !value.trim()) {
        error = rule.message || `${field} is required`
    }

    if (rule.minLength && value.length < rule.minLength) {
        error = rule.minLengthMessage || `${field} должен содержать минимум ${rule.minLength} символов`
    }

    if (!error && errors.value[field]) {
        delete errors.value[field]
    } else {
        errors.value[field] = error
    }

    return !error
}

const validateForm = () => {
    errors.value = {}
    let isValid = true

    for (const field in props.validationRules) {
        if (!validateField(field)) {
            isValid = false
        }
    }

    return isValid
}

const updateFormData = (newData) => {
    formData.value = newData
}

const handleApply = () => {
    if (validateForm()) {
        emit('update:modelValue', formData.value)
        isSubmitted.value = true
        isExpanded.value = false
    }
}

const handleCancel = () => {
    formData.value = props.modelValue || {}
    errors.value = {}
    isExpanded.value = false
}

const handleEdit = () => {
    isSubmitted.value = false
    isExpanded.value = true
}

const handleDelete = () => {
    formData.value = {}
    emit('update:modelValue', null)
    isSubmitted.value = false
    isExpanded.value = false
}

watch(() => props.modelValue, (newValue) => {
    formData.value = newValue || {}
    isSubmitted.value = !!newValue
})
</script>

<template>
    <div>
        <button v-if="!isSubmitted" @click="toggleExpand">
            <span class="flex items-center">
                <span class="transition-transform duration-300" :class="{ 'rotate-45': isExpanded }">
                    <svg-icon name="plus-blue20" width="20" height="20" />
                </span>
                <span class="text-dodger text-sm font-medium"><span v-if="!isExpanded">{{ initialText }}</span><span
                      v-else>Скрыть</span></span>
            </span></button>
        <div v-if="isSubmitted" class="bg-athens-gray rounded-fifteen p-25px border border-athens flex justify-between">
            <div>
                <slot name="summary" :data="formData">
                    <p>{{ JSON.stringify(formData) }}</p>
                </slot>
            </div>
            <div class="flex gap-x-2.5">
                <button @click="handleEdit"
                  class="w-10 h-10 flex items-center justify-center transition-colors rounded-ten bg-white border border-athens text-slate-custom hover:text-white hover:bg-dodger hover:border-dodger">
                    <svg-icon name="settings" width="20" height="20" />
                </button>
                <button @click="handleDelete"
                  class="w-10 h-10 flex items-center justify-center transition-colors rounded-ten bg-white border border-athens text-slate-custom hover:text-white hover:bg-dodger hover:border-dodger">
                    <svg-icon name="basket-basket" width="20" height="20" />
                </button>
            </div>
        </div>
        <div v-if="isExpanded" class="mt-15px border border-athens rounded-fifteen p-15px">
            <slot name="form" :data="formData" :errors="errors" :validateField="validateField"
              @update:data="updateFormData"></slot>
            <div class="mt-25px grid grid-cols-2 gap-x-15px">
                <UiButton size="action" variant="action" @click="handleApply">Сохранить</UiButton>
                <UiButton size="back" variant="back" @click="handleCancel">Отмена</UiButton>
            </div>
        </div>
    </div>
</template>