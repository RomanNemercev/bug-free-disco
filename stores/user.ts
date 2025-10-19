// store for user data

import { defineStore } from 'pinia'

interface UserState {
    name: string;
    email: string;
    role: string
    // add other user properties as needed
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        name: '',
        email: '',
        role: ''
        // add other user properties as needed
    }),

    getters: {
        initials: (state) => {
            if (!state.name) return 'ГС' // Гость

            const words = state.name.split(' ').filter(word => word.length > 0);

            if (words.length === 0) return 'ГС'

            if (words.length === 1) {
                // if name is one word, return first letter twice
                const firstLetter = words[0].charAt(0).toUpperCase();
                return `${firstLetter}${firstLetter}`
            }

            // if name is two words, return first letters of both words
            const firstWord = words[0].charAt(0).toUpperCase();
            const secondWord = words[1].charAt(0).toUpperCase();
            return `${firstWord}${secondWord}`
        }
    },

    actions: {
        setUserData(userData: Partial<UserState>) {
            if (userData.name) this.name = userData.name;
            if (userData.email) this.email = userData.email;
            if (userData.role) this.role = userData.role;
        },

        clearUserData() {
            this.name = '';
            this.email = '';
            this.role = '';
        }
    },

    persist: true,
})



