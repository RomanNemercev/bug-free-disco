interface ServerResponse {
    authorization: {
        token: string;
    };
}

export const getServerToken = async () => {
    const config = useRuntimeConfig();

    console.log(config.public.apiBase);
    try {
        const response = await $fetch<ServerResponse>('/login-jwt', {
            method: 'POST',
            baseURL: config.public.apiBase,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                email: config.public.apiEmail,
                password: config.public.apiPassword,
            },
        });

        console.log('Данные server token:', response.authorization?.token);

        if (response.authorization?.token) {
            const tokenCookie = useCookie('auth_token');
            tokenCookie.value = response.authorization.token;
            console.log('Token server is saved in cookie:', tokenCookie.value);
            return tokenCookie.value;
        } else {
            console.warn('Токен не получен в ответе сервера');
            return null;
        }
    } catch (err: any) {
        console.error('Ошибка при получении server token:', err.message || err);
        if (err.response?.status === 401) {
            console.warn('401: Неверные учетные данные или доступ запрещён');
        }
        return null;
    }
};