<template>
    <div class="w-full relative" ref="inputCalendarWrapper">
        <input class="w-full rounded-ten py-2.5 px-15px text-sm font-normal text-space transition-colors bg-athens-gray"
          :class="isFocused ? 'focused' : ''" @focus="isFocused = true" @blur="isFocused = false"
          :placeholder="isFocused ? '' : placeholder" v-model="innerValue" />
        <div class="absolute top-2.5 right-15px">
            <button @click="toggleCalendar"><svg-icon v-if="!calendarVisible" name="calendar-start" width="20"
                  height="20" />
                <svg-icon v-if="calendarVisible" name="calendar-end" width="20" height="20" /></button>
        </div>
        <div class="absolute top-10 right-15px" v-if="calendarVisible">
            <CalendarBar v-model="innerValue" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import CalendarBar from '@/components/custom/CalendarBar.vue';

const isFocused = ref(false);
const calendarVisible = ref(false);
const inputCalendarWrapper = ref(null);

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

// Отправляем данные наружу
const emit = defineEmits(['update:modelValue']);

const innerValue = computed({
    get: () => props.modelValue,  // Читаем из родителя
    set: (value) => emit('update:modelValue', value) // Отправляем наружу
});

const toggleCalendar = () => {
    calendarVisible.value = !calendarVisible.value;
}

onClickOutside(inputCalendarWrapper, () => {
    calendarVisible.value = false;
})
</script>

<style scoped>
.calendar-wrapper {
    background-color: #ffffff;
}

.focused {
    background-color: #f9fafc;
    border: 1px solid #5898FF;
    outline: none;
}
</style>