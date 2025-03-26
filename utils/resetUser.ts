// resetUser.ts
import { getServerToken } from "./getServerToken";

export const resetUser = async (email) => {
    const serverToken = await getServerToken();

    if (!serverToken) {
        console.error('Token server not found');
        return { data: null, error: { message: 'Token server not found' } };
    }

    const config = useRuntimeConfig();

    const { data, error } = await useFetch('/restore-access', {
        method: 'POST',
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serverToken}`,
        },
        body: { email },
    });

    console.log('Server response:', data.value);
    console.log('Server error:', error.value);

    if (error.value) {
        console.error('Login error:', error.value);
        return { data: null, error: error.value }; // Возвращаем ошибку
    }

    return { data: data.value, error: null }; // Возвращаем данные
};