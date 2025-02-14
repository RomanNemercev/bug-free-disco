<template>
    <div class="w-full relative" ref="inputCalendarWrapper">
        <input class="w-full rounded-ten py-2.5 px-15px text-sm font-normal text-space transition-color"
          :class="isFocused ? 'focused' : ''" @focus="isFocused = true" @blur="isFocused = false"
          :value="store.selectedDate" @input="store.selectedDate = $event.target.value" />
        <div class="absolute top-2.5 right-15px">
            <button @click="toggleCalendar">
                <svg-icon v-if="!calendarVisible" name="calendar-start" width="20" height="20" />
                <svg-icon v-if="calendarVisible" name="calendar-end" width="20" height="20" />
            </button>
        </div>
        <div class="absolute top-10 right-15px" v-if="calendarVisible">
            <CalendarBar @update:selectedDate="updateDate" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useCalendarStore } from '@/stores/calendarStore';
import CalendarBar from '@/components/custom/CalendarBar.vue';

const store = useCalendarStore(); // ✅ Используем Pinia

const isFocused = ref(false);
const calendarVisible = ref(false);
const inputCalendarWrapper = ref(null);

const toggleCalendar = () => {
    calendarVisible.value = !calendarVisible.value;
};

// Закрываем календарь при клике вне него
onClickOutside(inputCalendarWrapper, () => {
    calendarVisible.value = false;
});

// ✅ Теперь обновляет store, а он обновляет input
const updateDate = (newDate) => {
    store.selectedDate = newDate;
};
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