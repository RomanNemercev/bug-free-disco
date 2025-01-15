<template>
    <div class="dropdown-wrapper cursor-pointer relative" ref="dropDown">
        <div class="dropdown-selected-option relative border border-athens rounded-ten py-9px px-15px bg-athens-gray"
          @click="toggleDropDown">
            <div>
                <div :class="{ 'text-bali': !selectedOption, 'text-space': selectedOption }" class="text-sm">
                    {{ mappedSelectedOption }}
                </div>
                <!-- Стрелка -->
                <div v-show="!selectedOption"
                  class="dropdown-arrow absolute right-3.5 top-2 transition-transform duration-300 text-bali"
                  :class="{ 'rotate-180 text-dodger': isDropDownVisible }">
                    <svg-icon name="dropdown-arrow" width="20" height="20" />
                </div>
                <!-- Крестик -->
                <div v-show="selectedOption" class="dropdown-cross absolute right-3.5 top-2"
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
                  v-for="(option, index) in props.options" :key="index" @click="toggleOptionSelect(option)">
                    {{ option.name || option }}
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
    defaultValue: {
        type: String,
        default: 'Выбрать значение',
    },
    selected: {
        type: Number,
        default: null,
    },
});

const dropDown = ref(null);
const isDropDownVisible = ref(false);
const emit = defineEmits(['update:modelValue']);
const selectedOption = ref(null); // Устанавливаем начальное значение

// Установка начального значения
onMounted(() => {
    if (props.selected !== null) {
        const defaultOption = props.options.find(
            (option) => option.value === props.selected
        );
        selectedOption.value = defaultOption || null;
    }
});

const mappedSelectedOption = computed(() => {
    return selectedOption.value?.name || selectedOption.value || props.defaultValue;
});

// Открытие/закрытие выпадающего списка
const toggleDropDown = () => {
    isDropDownVisible.value = !isDropDownVisible.value;
};

// Выбор значения
const toggleOptionSelect = (option) => {
    const valueToEmit = option?.name || option;
    selectedOption.value = option || null;
    emit('update:modelValue', valueToEmit);
    isDropDownVisible.value = false;
};

// Сброс значения
const resetSelection = () => {
    selectedOption.value = null;
    emit('update:modelValue', null);
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