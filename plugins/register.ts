// register.ts
import { useNuxtApp, defineNuxtPlugin } from "#app";

interface RegisterData {
    login: string;
    name: string;
    email: string;
    phone_formatted: string;
    password: string;
    password_confirmation: string;
    site: string | null;
}

const registerUser = async (userData: RegisterData): Promise<any> => {
    try {
        const { $auth, $axios } = useNuxtApp();
        console.log('$auth:', $auth);
        // userData содержит: { login, name, email, phone, password, password_confirmation, site }
        // Сначала убеждаемся, что токен есть
        const token = await $auth.ensureToken();
        const response = await $axios.post('/register', userData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        throw error;
    }
};

export default defineNuxtPlugin((nuxtApp: any) => {
    nuxtApp.provide('register', {
        registerUser
    });
});