interface ApiResponse {
    data: {
        data: any[];
        id: number;
        position: string;
        division: string;
        count: number;
        salaryFrom: number;
        salaryTo: number;
        currency: string;
        require: string;
        duty: string,
        reason: string;
        name: string;
        city: string;
        created_at: string;
        dateStart: string;
        dateWork: string;
        status: any;
        client: any;
        vacancy: any;
        executor: any;
    }
}

export async function fetchApplications() {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;

    try {
        const response: ApiResponse = await $fetch(`${config.public.apiBase}/applications`, {
            method: 'GET',
            headers: {
                Accept: 'applications/json',
                Authorization: `Bearer ${authToken}`,
                'X-Auth-User': `${authUser}`
            }
        });

        console.log('Успех - 200:', response.data);
        return response.data
    } catch (error) {
        console.error('Ошибка при получении списка заявок:', error);
    }
}