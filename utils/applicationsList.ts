interface Application {
    id: number;
    position: string;
    city: string;
    created_at: string;
    dateStart: string;
    dateWork: string;
    status: { id: number; name: string } | null;
    client: { id: number; name: string } | null;
    vacancy: { id: number; name: string } | null;
    executor: { id: number; name: string } | null;
    division: string;
    count: number;
    salaryFrom: number;
    salaryTo: number;
    currency: string;
    require: string;
    duty: string;
    reason: string;
}

interface ApiResponse {
    data: Application[];
}

export async function fetchApplications() {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;

    try {
        const response: ApiResponse = await $fetch(`${config.public.apiBase}/applications`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
                'X-Auth-User': `${authUser}`
            }
        });

        console.log('Успех - 200:', response);
        // Проверяем, что response.data существует и это массив
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('Данные заявок не найдены или имеют неверный формат');
        }
        return response.data.map((item) => ({
            id: item.id,
            title: item.position,
            region: item.city,
            createdAt: item.created_at,
            closeDate: item.dateWork,
            status: item.status?.id ?? 0, // Если status null, возвращаем 0
            customer: item.client?.name ?? 'Не указан', // Если client null, возвращаем "Не указан"
            executor: item.executor?.name ?? 'Не указан', // Если executor null, возвращаем "Не указан"
            // responsible и candidates пока отсутствуют
        }));
    } catch (error) {
        console.error('Ошибка при получении списка заявок:', error);
        throw error;
    }
}