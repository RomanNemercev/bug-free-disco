<template>
    <div class="dropdown-wrapper cursor-pointer relative" ref="dropDown">
        <div class="dropdown-selected-option relative border rounded-ten py-9px px-15px" :class="[
            'border-athens',
            isSelected ? 'bg-zumthor text-dodger' : 'bg-athens-gray',
        ]" @click="toggleDropDown">
            <div>
                <div :class="isSelected ? 'text-dodger' : 'text-space'" class="text-sm">
                    {{ mappedSelectedOption || props.placeholder }}
                </div>
                <!-- Стрелка -->
                <div class="dropdown-arrow absolute right-3.5 top-2 transition-transform duration-300" :class="[
                    isDropDownVisible ? 'rotate-180 text-dodger' : 'text-bali',
                    isSelected ? 'text-dodger' : 'text-bali',
                ]">
                    <svg-icon name="dropdown-arrow" width="20" height="20" />
                </div>
            </div>
        </div>
        <transition name="slide-fade">
            <div
              class="options-wrapper absolute w-full bg-white border border-athens rounded-ten shadow-shadow-droplist top-14 z-10"
              v-if="isDropDownVisible">
                <div
                  class="option font-normal py-10px px-15px hover:bg-athens-gray cursor-pointer first:rounded-t-ten last:rounded-b-ten"
                  v-for="(option, index) in props.options" :key="index" @click="toggleOptionSelect(option)">
                    <div class="text-space text-sm">{{ option.title }}</div>
                    <div class="text-xs text-slate-custom text-13px">{{ option.description }}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import {
    defineProps,
    ref,
    computed,
    defineEmits,
    onMounted,
    onBeforeUnmount,
} from 'vue';

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
    modelValue: {
        default: null,
    },
    selected: {
        type: [Object, null],
        default: null,
    },
    placeholder: {
        type: String,
        default: 'Выбрать значение',
    },
    variant: {
        type: String,
        default: 'default', // default | selected
    },
});

const dropDown = ref(null);
const isDropDownVisible = ref(false);
const emit = defineEmits(['update:modelValue']);
const selectedOption = ref(props.selected); // Устанавливаем начальное значение

const isSelected = computed(() => props.variant === 'selected');
const mappedSelectedOption = computed(() => {
    return selectedOption.value?.title || null;
});

// Открытие/закрытие выпадающего списка
const toggleDropDown = () => {
    isDropDownVisible.value = !isDropDownVisible.value;
};

// Выбор значения
const toggleOptionSelect = (option) => {
    selectedOption.value = option || null;
    emit('update:modelValue', option || null);
    isDropDownVisible.value = false;
};

// Закрытие выпадающего списка при клике вне его
const closeDropDown = (element) => {
    if (!dropDown.value?.contains(element.target)) {
        isDropDownVisible.value = false;
    }
};

onMounted(() => {
    window.addEventListener('click', closeDropDown);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropDown);
});
</script>
