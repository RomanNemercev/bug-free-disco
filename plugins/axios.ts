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

    // Request interceptor
    axiosInstance.interceptors.request.use((config) => {
        const authStore = useAuthStore();
        // Берем токен из authStore или из localStorage, если authStore.token отсутствует
        let token = authStore.token || localStorage.getItem('authToken');
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`;
        }
        return config;
    });

    // Response interceptor для обработки 401
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const authStore = useAuthStore();
                try {
                    await authStore.refreshToken();
                    originalRequest.headers.Authorization = `Bearer ${authStore.token}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    authStore.clearAuth();
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    nuxtApp.provide('axios', axiosInstance);
});
