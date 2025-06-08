export const createVacancy = async (vacancyData: any) => {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;


    try {
        const response: {data: any, message: string } = await $fetch(`${config.public.apiBase}/vacancies`, {
            method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`,
                    'X-Auth-User': `${authUser}`
                },
            body: vacancyData,
        })

        return { data: response, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}