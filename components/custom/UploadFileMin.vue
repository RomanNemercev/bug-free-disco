<template>
    <div class="file-upload">
        <!-- Default state -->
        <button v-if="!modelValue" @click="triggerFileInput"
          class="border-none bg-transparent text-dodger text-sm font-medium flex gap-x-5px items-center">
            <svg-icon name="uploadDodger" width="20" height="20" />
            Загрузить
        </button>

        <!-- Selected file state -->
        <div v-else class="flex items-center gap-x-2.5 w-fit">
            <span class="text-sm text-space font-medium">{{ modelValue.name }}</span>
            <button @click="removeFile" class="text-red-custom">
                <svg-icon name="basket-fill" width="20" height="20" />
            </button>
        </div>

        <!-- Hidden file input -->
        <input ref="fileInput" type="file" @change="handleFileSelect" class="hidden" :accept="acceptedTypes" />
    </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: File,
        default: null
    },
    acceptedTypes: {
        type: String,
        default: '*'
    }
})

const fileInput = ref(null)

const triggerFileInput = () => {
    fileInput.value.click()
}

const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
        emit('update:modelValue', file)
    }
}

const removeFile = () => {
    fileInput.value.value = '' // Reset input
    emit('update:modelValue', null)
}
</script>