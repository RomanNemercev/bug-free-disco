import { getServerToken } from './getServerToken';

interface LoginResponse {
    user: {
        auth_token: string;
    }
}

export const loginUser = async (email: string, password: string) => {
    const serverToken = await getServerToken();
    if (!serverToken) {
        console.error('Token server not found');
        return { data: null, error: 'Не удалось получить серверный токен' };
    }

    const config = useRuntimeConfig();

    try {
        console.log('Отправляемые данные для входа:', { email, password });

        const response = await $fetch<LoginResponse>('/login', {
            method: 'POST',
            baseURL: config.public.apiBase,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
            },
            body: {
                email,
                password,
            },
        });

        console.log('Server response:', response);

        if (response?.user?.auth_token) {
            const userTokenCookie = useCookie('auth_user');
            userTokenCookie.value = response.user.auth_token;
            console.log('User token is save in cookie', userTokenCookie.value);
        } else {
            console.warn('Токен не получен в ответе сервера');
        }

        return { data: response, error: null };
    } catch (err: any) {
        console.error('Ошибка при входе:', err.message || err);
        let errorMessage = 'Произошла ошибка при входе';
        if (err.response?.status === 401) {
            errorMessage = 'Неверный email или пароль';
        } else if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
        }
        console.error('Детали ошибки:', err.response?.data || err.response);
        return { data: null, error: errorMessage };
    }
};