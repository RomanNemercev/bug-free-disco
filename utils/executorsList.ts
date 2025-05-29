interface Executor {
    'id': number;
    'name': string;
    'role': string;
}

interface ApiExecutor {
    'id': number;
    'name': string;
    'role': {
        'id': number,
        'name': string
    };
}


interface ApiResponseExecutors {
    'message': string;
    'data': [ApiExecutor];
}

export async function  executorsList() {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;

    const response: ApiResponseExecutors = await $fetch(`${config.public.apiBase}/executors/`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
             'X-Auth-User': `${authUser}`
        }
    });

    if (!response.data || !response.data || !Array.isArray(response.data)) {
        throw new Error('Данные исполнителей не найдены или имеют неверный формат');
    }

    const executors: Executor[] = response.data.map((executor: ApiExecutor) => ({
            id: executor.id,
            name: executor.name,
            role: executor.role.name 
        }));

        return { executors };
};