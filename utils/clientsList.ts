interface Client {
    'id': number;
    'name': string;
    'role': string;
}


interface ApiResponseClients {
    'message': string;
    'data': [Client];
}

export async function  clientsList() {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;

    const response: ApiResponseClients = await $fetch(`${config.public.apiBase}/clients/`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
             'X-Auth-User': `${authUser}`
        }
    });

    if (!response.data || !response.data || !Array.isArray(response.data)) {
        throw new Error('Данные заказчиков не найдены или имеют неверный формат');
    }

    const clients: Client[] = response.data.map((client: Client) => ({
            id: client.id,
            name: client.name,
            role: 'Менеджер'
        }));

        return { clients };
};