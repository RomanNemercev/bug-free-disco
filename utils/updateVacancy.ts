export const updateVacancy = async (id, vacancyData) => {
    const config = useRuntimeConfig();

    try {
        const data = await $fetch(`/vacancies/${id}`, {
            method: 'PUT',
            baseURL: config.public.apiBase,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useCookie('auth_token').value}`,
                'X-Auth-User': `${useCookie('auth_user').value}`,
            },
            body: vacancyData,
        });

        console.log('Server response: ', data);
        return { data, error: null };
    } catch (error) {
        console.error('Vacancy update error: ', error);
        return { data: null, error };
    }
};