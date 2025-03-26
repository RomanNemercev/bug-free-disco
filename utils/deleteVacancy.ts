export const deleteVacancy = async (vacancyId) => {
    const config = useRuntimeConfig();

    try {
        const data = await $fetch(`/vacancies/${vacancyId}`, {
            method: 'DELETE',
            baseURL: config.public.apiBase,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useCookie('auth_token').value}`,
                'X-Auth-User': `${useCookie('auth_user').value}`,
            },
        });

        console.log('Server response: ', data);
        return { data: data, error: null };
    } catch (error) {
        console.error('Vacancy deletion error: ', error);
        return { data: null, error };
    }
};