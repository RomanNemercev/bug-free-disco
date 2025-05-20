<script setup lang="ts">
  import { ref, watch, computed } from 'vue'

  const props = defineProps({
    placeholder: {
      type: String,
      default: 'Введите дату (DD.MM.YYYY)',
    },
    modelValue: {
      type: String,
      default: null,
    },
    search: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const isFocused = ref(false)
  const localValue = ref<string>(props.modelValue || '')
  const isError = ref(false) // Состояние ошибки

  // Функция для форматирования
  const formatDate = (value: string) => {
    // Удаляем все нецифровые символы
    let cleaned = value.replace(/[^0-9]/g, '')

    // Ограничиваем до 8 цифр (DDMMYYYY)
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8)

    // Форматируем: DD.MM.YYYY
    let formatted = ''
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 2 || i === 4) formatted += '.'
      formatted += cleaned[i]
    }

    // Валидация полной даты
    if (formatted.length === 10) {
      const [day, month, year] = formatted.split('.').map(Number)
      const isValid =
        day >= 1 &&
        day <= 31 &&
        month >= 1 &&
        month <= 12 &&
        year >= 0 &&
        year <= 9999
      if (!isValid) {
        return formatted.slice(0, formatted.lastIndexOf('.') + 3) // Обрезаем до последнего валидного
      }
    }

    return formatted
  }

  // Проверка на валидность
  const validateDate = (value: string) => {
    if (!value) {
      isError.value = false // Пустое поле не считается ошибкой
      return
    }
    isError.value = value.length > 0 && value.length < 10 // Неполная дата
    if (value.length === 10) {
      const [day, month, year] = value.split('.').map(Number)
      const isValid =
        day >= 1 &&
        day <= 31 &&
        month >= 1 &&
        month <= 12 &&
        year >= 0 &&
        year <= 9999
      isError.value = !isValid
    }
  }

  // Обновление значения с форматированием
  const updateValue = (event: Event) => {
    const input = event.target as HTMLInputElement
    const rawValue = input.value
    const formattedValue = formatDate(rawValue)
    localValue.value = formattedValue
    emit('update:modelValue', formattedValue)
  }

  // Обработчик потери фокуса
  const handleBlur = () => {
    isFocused.value = false
    validateDate(localValue.value) // Проверяем при потере фокуса
  }

  // Синхронизация с modelValue
  watch(
    () => props.modelValue,
    newValue => {
      localValue.value = newValue || ''
    }
  )
</script>

<template>
  <div class="w-full relative">
    <input
      type="text"
      class="text-sm font-normal border rounded-ten min-h-10 w-full pl-15px pr-15px"
      :class="[
        { 'bg-athens-gray': !isError },
        { 'border-red-custom': isError },
        { focused: isFocused },
        { search: search },
      ]"
      :placeholder="isFocused ? '' : placeholder"
      :value="localValue"
      @input="updateValue"
      @focus="isFocused = true"
      @blur="handleBlur"
      maxlength="10"
    />
    <div v-if="isError" class="text-red-500 text-xs mt-1">
      введите дату в формате DD.MM.YYYY
    </div>
  </div>
</template>

<style scoped>
  input {
    border-width: 1px;
    transition: border-color 0.3s;
  }

  input::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
  }

  .focused {
    border-color: #4a90e2;
  }

  .border-red-500 {
    border-color: #ef4444;
  }

  .focused {
    border: 1px solid #5898ff;
    outline: none;
    padding-left: 15px;
    background-image: none;
  }
</style>
