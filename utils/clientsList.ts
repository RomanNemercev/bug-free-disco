interface Client {
    'id': number;
    'name': string;
    'email': string;
    'role': string;
}


interface ApiResponseClients {
    'message': string;
    'data': [Client];
}

export async function  clientsList(nameList: string = 'clients', getParams?: string) {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;

    try {
        const response: ApiResponseClients = await $fetch(`${config.public.apiBase}/customer-with-roles/${nameList}/?${getParams || ''}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
             'X-Auth-User': `${authUser}`
        }
    });
    const clients: Client[] = response.data.map((client: Client) => ({
            id: client.id,
            name: client.name,
            email: client.email,
            role: 'Менеджер'
        }));

        return { clients: clients, errors: null };
    } catch (error) {
        console.error('Missed data. Error occured:', error);
        return { clients: [], errors: 'Ошибка получения списка' };
    }

};