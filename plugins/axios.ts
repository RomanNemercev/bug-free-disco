// axios.ts
import axios from 'axios';
import { useCookie, defineNuxtPlugin, useRuntimeConfig } from '#app';

export default defineNuxtPlugin((nuxtApp: any) => {
    const config = useRuntimeConfig();

    const axiosInstance = axios.create({
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Интерсептор запроса: если токен есть в cookies, пробрасываем его
    axiosInstance.interceptors.request.use(async (requestConfig) => {
        const tokenCookie = useCookie('auth_token');
        const token = tokenCookie.value;
        console.log('Токен из cookies в interceptors:', token || '❌ Токен отсутствует');
        // Для некоторых эндпоинтов (например, /login-jwt) заголовок не нужен, поэтому можно проверять по requestConfig.url, если требуется.
        requestConfig.headers['Content-Type'] = 'application/json';
        if (requestConfig.url && token && !requestConfig.url.includes('/login-jwt')) {
            requestConfig.headers.Authorization = `Bearer ${token}`;
        } else if (!token) {
            console.warn('⚠️ Токен отсутствует – возможно, потребуется запросить его через /login-jwt');
        }
        return requestConfig;
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                console.warn('⚠️ Получен 401 – пробуем обновить токен...');
                try {
                    const { refreshToken } = useNuxtApp().$auth;
                    const newToken = await refreshToken();

                    if (newToken) {
                        // rewrite request with new token
                        useCookie('auth_token').value = newToken;

                        // repeat new request with new token
                        error.config.headers.Authorization = `Bearer ${newToken}`;
                        return axiosInstance.request(error.config);
                    }
                } catch (refreshError) {
                    console.error('Ошибка при обновлении токена:', refreshError);
                }
            }
            console.error(`Ошибка API: ${error.response?.status}`, error.response?.data);
            return Promise.reject(error);
        }
    );

    nuxtApp.provide('axios', axiosInstance);
});

