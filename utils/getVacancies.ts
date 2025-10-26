import { useUserStore } from '@/stores/user';

interface VacancyResponse {
    data: {
        data: any[]
    }
}

export const getVacancies = async (params: any = '') => {
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
        const response = await $fetch<VacancyResponse>('/vacancies' + `?${params}`, {
            method: 'GET',
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, // Новый заголовок
            },
        });

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

export const getVacancy = async ( id: String) => {
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
        const response: any = await $fetch<VacancyResponse>(`/vacancies/${id}`, {
            method: 'GET',
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, // Новый заголовок
            },
        });


        return response ? JSON.parse(response).data : null;
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

export const getVacanciesNames = async () => {
    const vacancies: any = await getVacancies();
    return vacancies?.map((vacancy: string | number, key: keyof any) => {
        (vacancy as any)['name'] = (vacancy as any)['title']

        return vacancy
    }) || [];
};

export const getPhrases = async () => {
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
        const response = await $fetch<VacancyResponse>('/phrases', {
            method: 'GET',
            baseURL: config.public.apiBase as string, 
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken,
            },
        });

        return { data: response?.data || null, error: null };
    } catch (err: any) {
        console.error('Ошибка при запросе:', err);
        if (err.response?.status === 401) {
            const userStore = useUserStore();
            userStore.clearUserData();

            serverTokenCookie.value = null; 
            userTokenCookie.value = null;
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        }
        return { data: null, error: 'Срок сессии истек. Пожалуйста, авторизуйтесь снова.'};
    }
};
