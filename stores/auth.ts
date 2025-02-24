import axios from 'axios';
import { defineStore } from 'pinia';
import { useCookie } from '#app';

interface User {
    email: string;
    password?: string; // Если реально нужно, но хранить пароль – не самое безопасное решение
}

interface AuthPayload {
    token: string;
    user: User;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        token: null as string | null,
    }),
    getters: {
        isAuthenticated(state): boolean {
            return !!state.token;
        },
    },
    actions: {
        setAuth({ token, user }: AuthPayload) {
            console.log('setAuth вызывается с данными:', { token, user });
            this.token = token;
            this.user = user;
            localStorage.setItem('authToken', token);
        },
        clearAuth() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('authToken');
        },
        async refreshToken() {
            console.log('refreshToken вызван, текущий user:', this.user);
            if (!this.user || !this.user.email) {
                throw new Error('Данные пользователя отсутствуют');
            }
            if (!this.user.password) {
                throw new Error('Пароль пользователя отсутствует');
            }
            try {
                const response = await axios.post('https://admin.job-ly.ru/api/login-jwt', {
                    email: this.user.email,
                    password: this.user.password,
                });
                const newToken = response.data.authorization.token.value;
                this.token = newToken;
                localStorage.setItem('authToken', newToken);
            } catch (error) {
                console.error('Ошибка обновления токена', error);
                this.clearAuth();
                throw error;
            }
        },
    },
});
