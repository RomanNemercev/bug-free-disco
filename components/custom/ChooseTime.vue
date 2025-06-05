<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: Number,
        default: null,
    },
})

const emit = defineEmits(['update:modelValue'])

const hours = ref('')
const minutes = ref('')
const isHoursFocused = ref(false)
const isMinutesFocused = ref(false)

// Обновление modelValue при изменении часов или минут
const updateValue = () => {
    const hourNum = parseInt(hours.value) || 0
    const minuteNum = parseInt(minutes.value) || 0
    const newValue = (hourNum * 100) + minuteNum
    emit('update:modelValue', newValue)
}

// Надо иметь в виду что при проверки значений используя интерполяцию на странице
// они будут отображаться в реальном времени, но не при SSG

// Инициализация значений из modelValue
watch(() => props.modelValue, (newValue) => {
    if (newValue !== null) {
        const hoursValue = Math.floor(newValue / 100) || 9 // Часы (09 по умолчанию)
        const minutesValue = (newValue % 100) || 0 // Минуты (00 по умолчанию)
        hours.value = String(hoursValue).padStart(2, '0')
        minutes.value = String(minutesValue).padStart(2, '0')
    } else {
        hours.value = '09'
        minutes.value = '00'
        // Инициализируем значение по умолчанию при первой загрузке
        updateValue()
    }
}, { immediate: true })

// Ограничение ввода до 2 символов
const limitInput = (event, fieldName, maxLength = 2) => {
    let value = event.target.value
    // Оставляем только цифры
    value = value.replace(/[^0-9]/g, '')
    if (value.length > maxLength) {
        value = value.slice(0, maxLength)
    }
    event.target.value = value
    if (fieldName === 'hours') {
        hours.value = value
    } else if (fieldName === 'minutes') {
        minutes.value = value
    }
}

// Валидация при blur
const validateHours = () => {
    let value = parseInt(hours.value) || 0
    if (value === 0 && !hours.value) {
        value = 9
    } else if (value > 23) {
        value = 23
    } else if (value < 0) {
        value = 9
    }
    hours.value = String(value).padStart(2, '0')
    updateValue()
}

const validateMinutes = () => {
    let value = parseInt(minutes.value) || 0
    if (value === 0 && !minutes.value) {
        value = 0
    } else if (value > 59) {
        value = 59
    } else if (value < 0) {
        value = 0
    }
    minutes.value = String(value).padStart(2, '0')

    // Если оба поля пустые, устанавливаем значения по умолчанию
    if (!minutes.value && !hours.value) {
        hours.value = '09'
    }
    updateValue()
}

// Обработчики фокуса
const onHoursFocus = () => {
    isHoursFocused.value = true
}

const onHoursBlur = () => {
    isHoursFocused.value = false
    validateHours()
}

const onMinutesFocus = () => {
    isMinutesFocused.value = true
}

const onMinutesBlur = () => {
    isMinutesFocused.value = false
    validateMinutes()
}
</script>

<template>
    <div class="w-full flex gap-15px">
        <input type="number" v-model="hours" @input="limitInput($event, 'hours', 2)" @focus="onHoursFocus"
          @blur="onHoursBlur" :class="{ focused: isHoursFocused }"
          class="text-sm font-normal bg-athens-gray border border-athens rounded-ten min-h-10 w-1/2 pl-15px"
          placeholder="09" min="0" max="23">
        <input type="number" v-model="minutes" @input="limitInput($event, 'minutes', 2)" @focus="onMinutesFocus"
          @blur="onMinutesBlur" :class="{ focused: isMinutesFocused }"
          class="text-sm font-normal bg-athens-gray border border-athens rounded-ten min-h-10 w-1/2 pl-15px"
          placeholder="00" min="0" max="59">
    </div>
</template>

<style scoped>
input::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
}

.focused {
    border: 1px solid #5898ff;
    outline: none;
    padding-left: 15px;
    background-image: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
</style>