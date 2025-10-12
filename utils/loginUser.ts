import { getServerToken } from './getServerToken';
import { useUserStore } from '@/stores/user';

interface LoginResponse {
    user: {
        auth_token: string;
        name: string;
        email: string;
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
            baseURL: config.public.apiBase as string,
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
        console.log('User:', response.user.name);
        console.log('Email:', response.user.email);

        if (response?.user?.auth_token) {
            const userTokenCookie = useCookie('auth_user');
            userTokenCookie.value = response.user.auth_token;
            console.log('User token is save in cookie', userTokenCookie.value);
        }
        if (response.user.name && response.user.email) {
            const userStore = useUserStore();
            userStore.setUserData({
                name: response.user.name,
                email: response.user.email,
            });
            console.log('User data is save in store', userStore.name, userStore.email);
        } else {
            console.warn('Токен не получен в ответе сервера');
        }

        return { data: response, error: null };
    } catch (err: any) {
        console.error('Ошибка при входе:', err.message || err);
        let errorMessage = 'Произошла ошибка при входе';
        if (err.response?.status === 401) {
            errorMessage = 'Неверный email или пароль';
        } else if (err.response?.status === 404) {
            errorMessage = 'Пользователь не найден';
        } else if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
        }
        console.error('Детали ошибки:', err.response?.data || err.response);
        return { data: null, error: errorMessage };
    }
};

export const profile = async () => {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;
    

    try {
        const response: {data: any, message: string } = await $fetch(`${config.public.apiBase}/profile`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
                'X-Auth-User': `${authUser}`
            },
        })

        return { data: response, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}