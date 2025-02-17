import { defineStore } from 'pinia';
import { ref } from 'vue';
import { today, getLocalTimeZone } from '@internationalized/date';

export const useInputCalendarStore = defineStore('inputCalendar', () => {
    const selectedDate = ref<string>(today(getLocalTimeZone()).toString());
    const setSelectedDate = (date: string) => selectedDate.value = date;
    return { selectedDate, setSelectedDate };
});