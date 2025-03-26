import { getServerToken } from './getServerToken';

export const createVacancy = async (vacancyData) => {
    const config = useRuntimeConfig();

    const { data, error } = await useFetch('/vacancies', {
        method: 'POST',
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useCookie('auth_token').value}`,
            'X-Auth-User': `${useCookie('auth_user').value}`,
        },
        body: vacancyData,
    });

    console.log('Server response:', data.value);
    console.log('Server error:', error.value);

    if (error.value) {
        console.error('Vacancion creation error:', error.value);
        return { data: null, error: error.value };
    }

    return { data: data.value, error: null };
}