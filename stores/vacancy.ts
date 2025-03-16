import { defineStore } from 'pinia';

export const useVacancyStore = defineStore('vacancy', {
    state: () => ({
        nameVacancy: 'Новая вакансия' as string, // значение по умолчанию
        isEditing: false,
        editingVacancyId: null as number | null,
    }),
    actions: {
        setEditing(id: number) {
            this.isEditing = true;
            this.editingVacancyId = id;
        },
        resetEditing() {
            this.isEditing = false;
            this.editingVacancyId = null;
        },
        setNameVacancy(name: string) {
            this.nameVacancy = name;
        },
    },
});
