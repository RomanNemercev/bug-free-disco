import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type DateValue, today, getLocalTimeZone } from '@internationalized/date';

export const useCalendarStore = defineStore('calendar', () => {
    const selectedDate = ref<DateValue>(today(getLocalTimeZone())); // ✅ Теперь это DateValue

    return { selectedDate };
});
