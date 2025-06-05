<template>
  <div class="dropdown-wrapper cursor-pointer relative" ref="dropDown">
    <div class="dropdown-selected-option relative border border-athens rounded-ten py-9px px-15px bg-athens-gray"
      @click="toggleDropDown">
      <div>
        <div :class="{
          'text-bali': !selectedOptions.length,
          'text-space': selectedOptions.length
        }" class="text-sm truncate">
          {{ displayValue }}
        </div>
        <!-- Стрелка -->
        <div v-show="!selectedOptions.length"
          class="dropdown-arrow absolute right-3.5 top-2 transition-transform duration-300 text-bali"
          :class="{ 'rotate-180 text-dodger': isDropDownVisible }">
          <svg-icon name="dropdown-arrow" width="20" height="20" />
        </div>
        <!-- Крестик -->
        <div v-show="selectedOptions.length" class="dropdown-cross absolute right-3.5 top-2"
          @click.stop="resetSelection">
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
          v-for="(option, index) in props.options" :key="getOptionValue(option) || index"
          @click.stop="toggleOptionSelect(option)">
          <label class="flex items-center w-full cursor-pointer">
            <!-- Скрытый чекбокс -->
            <input type="checkbox" :checked="isSelected(option)" @change="toggleOptionSelect(option)" class="hidden" />
            <!-- Кастомный чекбокс -->
            <div class="w-5 h-5 flex items-center justify-center border rounded-md check-item mr-[6px]" :class="{
              'bg-dodger border-dodger': isSelected(option),
              'border-athens bg-athens-gray': !isSelected(option)
            }">
              <svg v-if="isSelected(option)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M16.704 5.293a1 1 0 00-1.408 0L7.5 12.086 4.704 9.293a1 1 0 00-1.408 1.414l3.5 3.5a1 1 0 001.408 0l8-8a1 1 0 000-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <span>{{ getOptionLabel(option) }}</span>
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  defaultValue: {
    type: String,
    default: 'Выберите значения'
  }
})

const emit = defineEmits(['update:modelValue'])
const dropDown = ref(null)
const isDropDownVisible = ref(false)
const selectedOptions = ref([...props.modelValue])

// Хелперы для работы с опциями (строки или объекты)
const getOptionValue = (option) => {
  return typeof option === 'object' && option !== null ? option.value : option
}

const getOptionLabel = (option) => {
  return typeof option === 'object' && option !== null ? option.name : option
}

const displayValue = computed(() => {
  if (!selectedOptions.value.length) return props.defaultValue

  return selectedOptions.value
    .map(option => getOptionLabel(option))
    .join(', ')
})

const isSelected = (option) => {
  const optionValue = getOptionValue(option)
  return selectedOptions.value.some(selected => {
    const selectedValue = getOptionValue(selected)
    return selectedValue === optionValue
  })
}

const toggleDropDown = () => {
  isDropDownVisible.value = !isDropDownVisible.value
}

const toggleOptionSelect = (option) => {
  const optionValue = getOptionValue(option)
  const index = selectedOptions.value.findIndex(selected => {
    const selectedValue = getOptionValue(selected)
    return selectedValue === optionValue
  })

  if (index === -1) {
    selectedOptions.value.push(option)
  } else {
    selectedOptions.value.splice(index, 1)
  }

  emit('update:modelValue', [...selectedOptions.value])
}

const resetSelection = () => {
  selectedOptions.value = []
  emit('update:modelValue', [])
}

const closeDropDown = (element) => {
  if (!dropDown.value?.contains(element.target)) {
    isDropDownVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropDown)
})

watch(() => props.modelValue, (newValue) => {
  selectedOptions.value = newValue ? [...newValue] : []
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropDown)
})
</script>