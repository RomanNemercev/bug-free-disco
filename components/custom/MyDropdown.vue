<template>
  <div class="dropdown-wrapper cursor-pointer relative" ref="dropDown">
    <div class="dropdown-selected-option relative border border-athens rounded-ten py-9px px-15px bg-athens-gray"
      @click="toggleDropDown">
      <div>
        <div :class="{
          'text-bali': !selectedOption,
          'text-space': selectedOption,
        }" class="text-sm">
          {{ mappedSelectedOption }}
        </div>
        <div v-show="!selectedOption"
          class="right-3.5 top-2 transition-transform duration-300 text-bali text-sm">
          {{ props.placeholder }}
        </div>
        <!-- Стрелка -->
        <div v-show="!selectedOption"
          class="dropdown-arrow absolute right-3.5 top-[calc(50%-10px)] transition-transform duration-300 text-bali"
          :class="{ 'rotate-180 text-dodger': isDropDownVisible }">
          <svg-icon name="dropdown-arrow" width="20" height="20" />
        </div>
        <!-- Крестик -->
        <div v-show="selectedOption" class="dropdown-cross absolute right-3.5 top-2" @click.stop="resetSelection">
          <svg-icon name="dropdown-cross" width="20" height="20" />
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div
        class="options-wrapper absolute w-full bg-white border border-athens rounded-ten shadow-shadow-droplist top-14 z-10"
        v-if="isDropDownVisible">
        <div
          class="option text-slate-custom text-sm font-normal py-10px px-15px hover:text-space hover:bg-zumthor cursor-pointer first:rounded-t-ten last:rounded-b-ten"
          v-for="option in props.options" :key="getOptionKey(option)" @click="toggleOptionSelect(option)">
          {{ getOptionLabel(option) }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    validator: (options) => options.every(opt => typeof opt === 'string' || ('name' in opt && 'value' in opt))
  },
  modelValue: {
    type: [String, Number, Object, null],
    default: null,
  },
  defaultValue: {
    type: String,
    default: null,
  },
  initialValue: {
    type: [String, Number, Object, null],
    default: null,
  },
  selected: {
    type: [Number, String, null],
    default: null,
  },
  placeholder: {
    type: String,
    default: 'Выберите значение',
  },
})

const emit = defineEmits(['update:modelValue', 'select'])

const dropDown = ref(null)
const isDropDownVisible = ref(false)
const selectedOption = ref(props.defaultValue ? props.defaultValue : null)

// Утилиты для обработки options
const getOptionValue = (option) => option?.value ?? option
const getOptionLabel = (option) => option?.name ?? option
const getOptionKey = (option) => getOptionValue(option)
const valueData = ref(props.defaultValue)

// Вычисляемое свойство для отображаемого значения
const mappedSelectedOption = computed(() => {
  if (selectedOption.value === null || selectedOption.value === undefined) {
    return props.defaultValue
  }
  // Если selectedOption не в options, показываем его как есть (для данных с сервера)
  return getOptionLabel(selectedOption.value)
})

// Инициализация selectedOption
const initializeSelectedOption = () => {
  let initial = props.initialValue ?? props.modelValue ?? props.selected
  if (initial !== null && initial !== undefined) {
    const option = props.options.find(opt => getOptionValue(opt) === getOptionValue(initial))
    selectedOption.value = option ?? initial // Сохраняем initial, даже если его нет в options
  } else {
    selectedOption.value = null
  }
}

// Открытие/закрытие выпадающего списка
const toggleDropDown = () => {
  isDropDownVisible.value = !isDropDownVisible.value
}

// Выбор значения
const toggleOptionSelect = (option) => {
  selectedOption.value = option
  emit('update:modelValue', getOptionValue(option))
  emit('select', option)
  isDropDownVisible.value = false
}

// Сброс значения
const resetSelection = () => {
  selectedOption.value = null
  emit('update:modelValue', null)
  isDropDownVisible.value = false
}

// Закрытие выпадающего списка при клике вне
const closeDropDown = (event) => {
  if (!dropDown.value?.contains(event.target)) {
    isDropDownVisible.value = false
  }
}

// Проверка валидности selectedOption при изменении options
watch(() => props.options, (newOptions) => {
  if (selectedOption.value !== null) {
    const currentValue = getOptionValue(selectedOption.value)
    const isValid = newOptions.some(opt => getOptionValue(opt) === currentValue)
    // Сбрасываем только если компонент используется в контексте динамических опций (например, SettingsForms)
    // Для данных с сервера (InfoTab) сохраняем значение
    if (!isValid && !props.initialValue) {
      selectedOption.value = null
      emit('update:modelValue', null)
    }
  }
}, { deep: true })

// Синхронизация modelValue → selectedOption
watch(() => props.modelValue, (newValue) => {
  if (newValue !== getOptionValue(selectedOption.value)) {
    const option = props.options.find(opt => getOptionValue(opt) === newValue)
    selectedOption.value = option ?? newValue // Сохраняем newValue, если оно с сервера
    if (!option && newValue !== null && !props.initialValue) {
      emit('update:modelValue', null) // Сбрасываем, если значение невалидно и не с сервера
    }
  }
}, { immediate: true })

// Обработка selected
watch(() => props.selected, (newSelected) => {
  if (newSelected !== null && newSelected !== getOptionValue(selectedOption.value)) {
    const option = props.options.find(opt => getOptionValue(opt) === newSelected)
    selectedOption.value = option ?? null
    emit('update:modelValue', getOptionValue(option) ?? null)
  }
}, { immediate: true })

onMounted(() => {
  window.addEventListener('click', closeDropDown)
  initializeSelectedOption()
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropDown)
})
</script>

<style scoped>
.option:not(:last-child) {
  border-bottom: 1px solid #f4f6f8;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-4px);
  opacity: 0;
}

.dropdown-arrow {
  transition: transform 0.3s ease-in-out;
}
</style>