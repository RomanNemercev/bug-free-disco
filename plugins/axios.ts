import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const axiosInstance = axios.create({
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    axiosInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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