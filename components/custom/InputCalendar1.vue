<template>
    <div class="w-full relative">
        <input class="w-full rounded-ten py-2.5 px-15px text-sm font-normal text-space transition-colors"
          :placeholder="isFocused ? '' : placeholder" @input="updateValue" :value="localValue" @focus="isFocused = true"
          @blur="onBlur" @mouseleave="isHovered = false" @mouseover="isHovered = true" @keydown="applyMask"
          maxlength="10" :class="[isFocused ? 'focused' : '', isHovered ? 'bg-catskill' : '']" />
        <div class="absolute top-2.5 right-15px">
            <button @click="toggleDropdown" v-show="isFocused || localValue" @mousedown.prevent="toggleDropdown">
                <svg-icon v-if="!isDropdownVisible" name="calendar-start" width="20" height="20" />
                <svg-icon v-if="isDropdownVisible" name="calendar-end" width="20" height="20" />
            </button>
        </div>
        <transition name="slide-fade">
            <div ref="calendarWrapper"
              class="absolute w-max bg-white border border-athens rounded-ten shadow-shadow-droplist top-8 z-10 right-0"
              v-if="isDropdownVisible" @mousedown="insideCalendar = true">
                <CalendarBar />
            </div>
        </transition>
    </div>
</template>

<script setup>
import CalendarBar from '@/components/custom/CalendarBar.vue';

import { ref, watch, computed, onMounted, onUnmounted } from 'vue';

const isFocused = ref(false);
const isHovered = ref(false);
const isDropdownVisible = ref(false);
const selectedDate = ref(null);
const calendarWrapper = ref(null);
let insideCalendar = false;

const props = defineProps({
    placeholder: {
        type: String,
        default: 'дд.мм.гггг'
    },
    modelValue: {
        type: [String, Number],
        default: null,
    }
})

const emit = defineEmits(['update:modelValue'])

// Следим за `modelValue` и обновляем `localValue`
const localValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

// Следим за выбором даты в календаре и обновляем input
watch(selectedDate, (newDate) => {
    if (newDate) {
        localValue.value = formatDate(newDate);
        emit('update:modelValue', localValue.value);
        isDropdownVisible.value = false; // Закрываем календарь после выбора даты
    }
});

// Форматируем дату в `дд.мм.гггг`
const formatDate = (date) => {
    if (!date) return '';
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
};

const updateValue = (event) => {
    localValue.value = event.target.value;
};

const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
}

// Обработчик потери фокуса
const onBlur = () => {
    setTimeout(() => {
        if (!insideCalendar) {
            isFocused.value = false;
            isDropdownVisible.value = false;
        }
        insideCalendar = false; // Сбрасываем после обработки
    }, 100);
};

// Маска ввода даты
const applyMask = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Убираем все нечисловые символы
    if (value.length > 8) value = value.slice(0, 8); // Ограничиваем 8 символами (ДДММГГГГ)

    let formatted = value;
    if (value.length >= 2) formatted = `${value.slice(0, 2)}.${value.slice(2)}`;
    if (value.length >= 4) formatted = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4)}`;

    localValue.value = formatted;
    emit('update:modelValue', formatted);
};

const handleClickOutside = (event) => {
    const calendarElement = document.querySelector('.calendar-wrapper');
    const isCombobox = event.target.closest('[role="combobox"]'); // Проверяем, не кликнут ли селект

    if (
        isDropdownVisible.value &&
        calendarWrapper.value &&
        !calendarWrapper.value.contains(event.target) &&
        (!calendarElement || !calendarElement.contains(event.target)) &&
        !isCombobox // Не закрываем, если клик по combobox
    ) {
        isDropdownVisible.value = false;
    }
};

watch(isDropdownVisible, (newValue) => {
    if (newValue) {
        setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
    } else {
        document.removeEventListener('click', handleClickOutside);
    }
});


onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
input::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
}

.focused {
    border: 1px solid #5898FF;
    outline: none;
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
</style>