import { defineStore } from 'pinia'

export const useForms = defineStore('forms', {
    state: () => ({
        questions: [] as Array<{
            id: number
            type: string
            title: string
            required: boolean
            options?: string[]
        }>,
        forms: [] as Array<{
            id: number
            name: string
            questions: any[]
            created?: string
        }>,
    }),
    actions: {
        setQuestions(questions: any[]) {
            this.questions = questions
        },
        addQuestion(question: any) {
            this.questions.push(question)
        },
        updateQuestion(index: number, question: any) {
            this.questions[index] = question
        },
        removeQuestion(index: number) {
            this.questions.splice(index, 1)
        },
        addForm(form: { id: number; name: string; questions: any[]; created?: string }) {
            this.forms.push(form)
        },
        resetQuestions() {
            this.questions = []
        },
    }
})