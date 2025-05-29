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
    }
})

const emit = defineEmits(['update:modelValue'])

const isExpanded = ref(false)
const formData = ref(props.modelValue || {})
const isSubmitted = ref(false)

const toggleExpand = () => {
    if (!isSubmitted.value) isExpanded.value = !isExpanded.value
}

const handleApply = () => {
    isExpanded.value = false
    isSubmitted.value = true
    emit('update:modelValue', { ...formData.value })
}

const handleCancel = () => {
    isExpanded.value = false
    formData.value = props.modelValue || {}
}

const handleEdit = () => {
    isExpanded.value = true
    isSubmitted.value = false
}

const handleDelete = () => {
    formData.value = {}
    isSubmitted.value = false
    emit('update:modelValue', null)
}

watch(() => props.modelValue, (newValue) => {
    formData.value = newValue || {}
    isSubmitted.value = !!newValue
})
</script>

<template>
    <div class="expandable-form">
        <button v-if="!isSubmitted" class="add-button" @click="toggleExpand">{{ initialText }}</button>
        <div v-if="isSubmitted" class="summary">
            <slot name="summary" :data="formData">
                <p>{{ JSON.stringify(formData) }}</p>
            </slot>
            <div class="actions">
                <button class="icon-button" @click="handleEdit">correct</button>
                <button class="icon-button" @click="handleDelete">delete</button>
            </div>
        </div>
        <div v-if="isExpanded" class="form-content">
            <slot name="form" :data="formData" @update:data="formData = $event"></slot>
            <div class="form-actions">
                <button class="apply-button" @click="handleApply">Применить</button>
                <button class="cancel-button" @click="handleCancel">Отмена</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.expandable-form {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 10px;
    background: #fff;
}

.add-button {
    background: #e0f7fa;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #f0f0f0;
    border-radius: 4px;
}

.actions {
    display: flex;
    gap: 5px;
}

.icon-button {
    background: none;
    border: none;
    cursor: pointer;
}

.form-content {
    padding: 10px;
    border: 1px solid #ccc;
    margin-top: 10px;
    border-radius: 4px;
}

.form-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.apply-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 4px;
    cursor: pointer;
}

.cancel-button {
    background: #ccc;
    border: none;
    padding: 5px 15px;
    border-radius: 4px;
    cursor: pointer;
}
</style>