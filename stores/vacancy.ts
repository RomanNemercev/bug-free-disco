import { defineStore } from 'pinia';

export const useVacancyStore = defineStore('vacancy', {
    state: () => ({
        nameVacancy: 'Новая вакансия', // значение по умолчанию
    }),
    actions: {
        setNameVacancy(name: string) {
            this.nameVacancy = name;
        },
    },
});
