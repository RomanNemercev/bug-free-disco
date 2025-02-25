// auth.ts
import axiosInstance from './axios';
import { useCookie, defineNuxtPlugin, useNuxtApp } from '#app';

interface AuthResponse {
    authorization: {
        token: {
            value: string;
        };
    };
}

const FIXED_AUTH_DATA = {
    email: 'api-jwt@jobly.ru',
    password: 'hdjkmRkkj:sg'
};

const ensureToken = async (): Promise<string> => {
    const { $axios } = useNuxtApp();
    const tokenCookie = useCookie('auth_token');
    let token = tokenCookie.value as string | null;
    if (!token) {
        console.log('Токена нет – запрашиваем его с /login-jwt');
        try {
            const response = await $axios.post('/login-jwt', FIXED_AUTH_DATA, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = (response.data as AuthResponse).authorization.token;
            console.log("Проверка токена: ", (response.data as AuthResponse).authorization.token);
            tokenCookie.value = token;
            console.log("Проверка токена для cookies: ", tokenCookie.value);
            console.log('Получен токен через /login-jwt:', token);
        } catch (error) {
            console.error('Ошибка при получении токена через /login-jwt:', error);
            throw error;
        }
    }
    token = tokenCookie.value;
    if (!token) {
        throw new Error('Не удалось получить токен.');
    }
    return token;
};

const login = async (email: string, password: string): Promise<any> => {
    const { $axios } = useNuxtApp();
    try {
        // Получаем токен из ensureToken, если он отсутствует – он будет запрошен автоматически
        const token = await ensureToken();
        // Отправляем запрос на /login с данными пользователя
        const response = await $axios.post('/login', {
            email,
            password
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Для авторизации
            }
        });
        // Предполагается, что ответ содержит auth_token и данные пользователя
        const authToken = response.data.user.auth_token; // или response.data.auth_token, в зависимости от API
        // Сохраняем полученный токен в cookies
        const authCookie = useCookie('auth_token');
        authCookie.value = authToken;
        return response.data;
    } catch (error) {
        console.error('Ошибка логина:', error);
        throw error;
    }
};

const refreshToken = async () => {
    // Если возникает 401, можно вызвать refreshToken – здесь можно реализовать дополнительную логику,
    // но пока, согласно объяснениям backend, можно считать, что при 401 данные не обновляются автоматически.
    // Вероятно, при 401 нужно перенаправить пользователя на страницу авторизации.
    console.warn('refreshToken вызван – обработка 401, но механизм refresh пока не реализован.');
    throw new Error('Токен просрочен, требуется повторная авторизация.');
};

export default defineNuxtPlugin((nuxtApp: any) => {
    nuxtApp.provide('auth', {
        ensureToken,
        login,
        refreshToken
    });
});
