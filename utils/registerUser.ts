import { getServerToken } from './getServerToken';

export const registerUser = async (userData: any) => {
    const token = await getServerToken();
    if (!token) {
        console.error('Token not found');
        return null;
    }

    const config = useRuntimeConfig();

    try {
        console.log('Отправляемые данные для регистрации:', userData);

        const response = await $fetch('/register', {
            method: 'POST',
            baseURL: config.public.apiBase,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: userData,
        });

        console.log('Ответ сервера при регистрации:', response);
        return response;
    } catch (err: any) {
        console.error('Ошибка при регистрации:', err.message || err);
        if (err.response?.status === 422) {
            console.warn('422: Валидация не пройдена или пользователь уже существует.');
        }
        console.error('Детали ошибки:', err.response);
        return null;
    }
};