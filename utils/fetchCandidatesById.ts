interface ApiResponse {
    data: {
        data: any[];
        total: number;
        current_page: number;
        last_page: number;
        per_page: number;
        firstName: string;
    };
}

export async function fetchCandidateById(id: number) {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;

    console.log('Запрашиваю кандидата с id:', id);
    console.log('auth_token:', authToken);
    console.log('auth_user:', authUser);
    console.log('URL запроса:', `${config.public.apiBase}/candidates/${id}`);

    try {
        const response: ApiResponse = await $fetch(`${config.public.apiBase}/candidates/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
                'X-Auth-User': `${authUser}`
            }
        });

        return response.data
    } catch (error) {
        console.error('Ошибка при получении кандидата:', error);
        console.error(`Ошибка при получении кандидата #${id}:`, error);
        throw createError({
            statusCode: 404,
            statusMessage: 'Кандидат не найден'
        });
    }
}
