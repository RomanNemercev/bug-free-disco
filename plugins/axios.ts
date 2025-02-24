import axios from 'axios';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const axiosInstance = axios.create({
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Флаг, чтобы не запускать множественные запросы токена одновременно
    let tokenPromise = null;

    // Функция для получения токена, если его нет в localStorage
    const ensureToken = async () => {
        let token = localStorage.getItem('authToken');
        if (!token) {
            // Если токена нет, запускаем запрос и сохраняем Promise, чтобы избежать параллельных вызовов
            if (!tokenPromise) {
                tokenPromise = (async () => {
                    try {
                        const data = {
                            email: 'api-jwt@jobly.ru',
                            password: 'hdjkmRkkj:sg'
                        };
                        const response = await $fetch(`${config.public.apiBase}/login-jwt`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data)
                        });
                        // Предполагается, что структура ответа такая:
                        // { authorization: { token: { value: '...'} } }
                        token = response.authorization.token.value;
                        localStorage.setItem('authToken', token);
                        console.log('Check token: ', response.data.authorization.token.value)
                        console.log('Получен токен:', token);
                    } catch (error) {
                        console.error('Ошибка получения токена:', error);
                        throw error;
                    } finally {
                        tokenPromise = null;
                    }
                    return token;
                })();
            }
            token = await tokenPromise;
        }
        return token;
    };

    // Request interceptor: обеспечиваем наличие токена
    axiosInstance.interceptors.request.use(async (requestConfig) => {
        try {
            const token = await ensureToken();
            requestConfig.headers['Content-Type'] = 'application/json';
            if (token) {
                requestConfig.headers.Authorization = `Bearer ${token}`;
            } else {
                console.warn('⚠️ Токен отсутствует, запрос может не пройти авторизацию.');
            }
        } catch (error) {
            console.error('Ошибка в interceptor при получении токена:', error);
        }
        return requestConfig;
    });

    // Response interceptor – стандартная обработка ошибок
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                console.error(`Ошибка API: ${error.response.status}`, error.response.data);
            }
            return Promise.reject(error);
        }
    );

    nuxtApp.provide('axios', axiosInstance);
});
