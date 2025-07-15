<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    fileType: {
        type: String,
        default: 'file',
        validator: (value) => ['file', 'img'].includes(value) // Валидация значений
    },
    modelValue: {
        type: [File, String],
        default: null
    },
    minStyle: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

// Локализация для fileType
const fileTypeLabels = {
    file: 'файл',
    img: 'изображение'
}
const localizedFileType = fileTypeLabels[props.fileType] || props.fileType

const fileInput = ref(null)
const imgContainer = ref(null)
const img = ref(null)
const previewUrl = ref(null)
const error = ref('')
const buttonText = ref('') // Реактивный текст кнопки

// Устанавливаем начальный текст кнопки
const setInitialButtonText = () => {
    buttonText.value = `
    <span class="text-dodger text-sm font-medium inline-block mb-[3px]">Загрузить ${localizedFileType}</span><br>
    <span class="text-13px text-slate-custom inline-block w-[75%]">или перетащите его в область рамки</span>
  `
}
setInitialButtonText()

onMounted(() => {
    if (props.modelValue && typeof props.modelValue === 'string') {
        previewUrl.value = props.modelValue
        imgContainer.value.style.display = 'block'
    }
})

const handleButtonClick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение <label>
    if (buttonText.value.includes('Загрузить')) {
        fileInput.value.click()
    } else {
        fileInput.value.value = ''
        previewUrl.value = null
        emit('update:modelValue', null)
        setInitialButtonText() // Восстанавливаем начальный текст
        imgContainer.value.style.display = 'none'
        error.value = ''
    }
}

const validateFile = (file) => {
    if (props.fileType === 'img' && !file.type.startsWith('image/')) {
        error.value = `Пожалуйста, выберите изображение. Загружен ${file.type}`
        return false
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB
        error.value = 'Файл должен быть меньше 5MB'
        return false
    }
    return true
}

const handleFileChange = () => {
    const file = fileInput.value.files[0]
    if (file) {
        if (!validateFile(file)) {
            fileInput.value.value = ''
            previewUrl.value = null
            imgContainer.value.style.display = 'none'
            return
        }

        if (fileInput.value.files.length > 1) {
            error.value = 'Можно загрузить только 1 файл'
            return
        }

        error.value = ''
        if (props.fileType === 'img') {
            const reader = new FileReader()
            reader.onload = (e) => {
                previewUrl.value = e.target.result
                imgContainer.value.style.display = 'block'
                buttonText.value = `<span class="text-red-500 text-sm font-medium">Удалить</span>` // Красный текст
                emit('update:modelValue', file)
            }
            reader.readAsDataURL(file)
        } else {
            previewUrl.value = null
            imgContainer.value.style.display = 'none'
            buttonText.value = `<span class="text-red-500 text-sm font-medium">Удалить</span>` // Красный текст
            emit('update:modelValue', file)
        }
    }
}

const handleDragOver = (e) => {
    e.preventDefault()
}

const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
        fileInput.value.files = e.dataTransfer.files
        handleFileChange()
    }
}

watch(() => props.modelValue, (newValue) => {
    if (newValue === null) {
        previewUrl.value = null
        imgContainer.value.style.display = 'none'
        setInitialButtonText()
        error.value = ''
    }
})
</script>

<template>
    <div
      class="relative w-full bg-athens-gray rounded-fifteen border border-athens p-25px flex flex-col items-center pt-35px pb-[22px]"
      @dragover.prevent @drop="handleDrop">
        <div ref="imgContainer" class="file-preview mb-25px w-[100px] h-[100px] overflow-hidden rounded-[50%]"
          style="display: none;">
            <img ref="img" :src="previewUrl" alt="Preview" class="file-image w-[100px] h-[100px] object-cover" />
        </div>
        <input ref="fileInput" type="file" class="hidden" id="file-upload" @change="handleFileChange">
        <label for="file-upload" class="cursor-pointer flex flex-col items-center gap-y-[24px]"
          @click="handleButtonClick" :class="minStyle ? 'gap-y-[17px]' : 'gap-y-[24px]'">
            <div class="file-icon w-[100px] rounded-full flex items-center justify-center" :class="[
                minStyle ? 'bg-transparent' : 'bg-white',
                minStyle ? 'h-[36px]' : 'h-[100px]'
            ]" v-if="!previewUrl">
                <svg-icon v-if="!previewUrl && !props.modelValue && !minStyle" name="upload" width="30" height="30" />
                <svg-icon v-if="!previewUrl && props.modelValue && props.fileType === 'file' && !minStyle"
                  name="check-success" width="30" height="30" />
                <svg-icon v-if="!previewUrl && !props.modelValue && minStyle" name="download-fill" width="25"
                  height="25" />
            </div>
            <div v-if="!previewUrl && props.modelValue && props.fileType === 'file'" class="text-sm text-center">
                Загружен:<br><span class="text-dodger">{{ props.modelValue.name }}</span>
            </div>
            <button id="file-upload-button" class="leading-[110%]" v-html="buttonText"></button>
        </label>
        <div v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</div>
    </div>
</template>

<style scoped>
.file-preview {
    transition: opacity 0.3s;
    opacity: 0;
}

.file-preview[style*="display: block"] {
    opacity: 1;
}
</style>