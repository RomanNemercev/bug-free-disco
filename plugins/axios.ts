import axios from 'axios';
import { useCookie } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const axiosInstance = axios.create({
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    axiosInstance.interceptors.request.use((config) => {
        const token = useCookie('token').value;
        console.log('Токен из cookies в interceptors:', token || '❌ Токен отсутствует');
        config.headers['Content-Type'] = 'application/json';
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        else if (!token) {
            console.warn('⚠️ Внимание! Токен отсутствует, запрос может не пройти авторизацию.');
        }
        return config;
    });

    axiosInstance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response) {
            console.error(`Ошибка API: ${error.response.status}`, error.response.data);
        }
        return Promise.reject(error);
    });

    nuxtApp.provide('axios', axiosInstance);
});