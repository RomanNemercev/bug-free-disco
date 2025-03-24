export const getVacancies = async () => {
    const config = useRuntimeConfig();

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    // const userTokenCookie = useCookie('auth_user');
    // const userToken = userTokenCookie.value;
    // if (!userToken) {
    //     console.error('Токен пользователя не найден в cookie');
    //     return null;
    // }

    try {
        const response = await $fetch('/vacancies', {
            method: 'GET',
            baseURL: config.public.apiBase, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                // 'X-Auth-User': userToken, // Новый заголовок
            },
        });

        console.log('Полный ответ сервера:', response);
        return response?.data?.data || null;
    } catch (err) {
        console.error('Ошибка при запросе:', err);
        return null;
    }
};