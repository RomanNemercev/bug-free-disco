import { useUserStore } from '@/stores/user';

interface VacancyResponse {
    data: {
        data: any[]
    }
}

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
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }

    try {
        const response = await $fetch<VacancyResponse>('/vacancies', {
            method: 'GET',
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, // Новый заголовок
            },
        });

        console.log('Полный ответ сервера:', response);
        return response?.data?.data || null;
    } catch (err: any) {
        console.error('Ошибка при запросе:', err);
        if (err.response?.status === 401) {
            const userStore = useUserStore();
            userStore.clearUserData();

            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        }
        return null;
    }
};