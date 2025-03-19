// axios.ts
import axios from 'axios';
import { useCookie, defineNuxtPlugin, useRuntimeConfig, useRoute, useNuxtApp } from '#app';

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
        const userTokenCookie = useCookie('auth_user');
        const token = tokenCookie.value;
        const userToken = userTokenCookie.value;

        console.log('🔐 Основной токен:', token || '❌ отсутствует');
        console.log('🧑‍💼 Пользовательский токен:', userToken || '❌ отсутствует');
        requestConfig.headers['Content-Type'] = 'application/json';
        if (requestConfig.url && token && !requestConfig.url.includes('/login-jwt')) {
            requestConfig.headers.Authorization = `Bearer ${token}`;
        }

        return requestConfig;
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                console.warn('⚠️ Получен 401 – пробуем обновить токен...');
                try {
                    const { $auth } = useNuxtApp();
                    const newToken = await ($auth as { refreshToken: () => Promise<string> }).refreshToken();

                    if (newToken) {
                        // rewrite request with new token
                        useCookie('auth_token').value = newToken;

                        // repeat new request with new token
                        error.config.headers.Authorization = `Bearer ${useCookie('auth_token').value}`;
                        console.log('🔁 Повторный запрос с заголовками:', error.config.headers);
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

