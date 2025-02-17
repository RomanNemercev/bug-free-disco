import { defineStore } from 'pinia';
import { ref } from 'vue';
import { today, getLocalTimeZone } from '@internationalized/date';

export const useCalendarStore = defineStore('calendar', () => {
    const selectedDate = ref<string>(today(getLocalTimeZone()).toString()); // 📅 Для InputCalendar.vue
    const dropdownDate = ref<string>(today(getLocalTimeZone()).toString()); // 📅 Для DropdownCalendar.vue

    const setSelectedDate = (date: string) => {
        selectedDate.value = date;
    };

    const setDropdownDate = (date: string) => {
        dropdownDate.value = date;
    };

    return { selectedDate, dropdownDate, setSelectedDate, setDropdownDate };
});