import { defineStore } from 'pinia';
import { ref } from 'vue';
import { today, getLocalTimeZone } from '@internationalized/date';

export const useDropdownCalendarStore = defineStore('dropdownCalendar', () => {
    const dropdownDate = ref<string>(today(getLocalTimeZone()).toString());
    const setDropdownDate = (date: string) => dropdownDate.value = date;
    return { dropdownDate, setDropdownDate };
});