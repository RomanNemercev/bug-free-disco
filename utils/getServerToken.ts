interface ServerResponse {
    authorization: {
        token: string;
    };
}

export const getServerToken = async () => {
    const config = useRuntimeConfig();

    const { data } = await useFetch<ServerResponse>('/login-jwt', {
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

    // Логируем данные и ошибку
    console.log('Данные server token:', data.value?.authorization?.token); // Добавляем опциональную цепочку

    if (data.value?.authorization?.token) {
        const tokenCookie = useCookie('auth_token');
        tokenCookie.value = data.value?.authorization?.token;
        console.log('Token server is save in cookie', tokenCookie.value);
    }

    // Возвращаем токен, если он есть
    return data.value?.authorization?.token || null; // Исправляем доступ к токену
};