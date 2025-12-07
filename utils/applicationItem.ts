import { type Application } from "~/types/application"

interface NotData {
    'message': string;
}

export async function fetchApplicationDetail(id: string) {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;

    try {
        const response: Application | NotData = await $fetch(`${config.public.apiBase}/applications/${id}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
                'X-Auth-User': `${authUser}`
            }
        });

        // console.log('Success - 200:', response);
        // console.log('typeof response.data:', typeof response);
        // check on validate repsponse date
        if (!response || typeof response !== 'object' || Array.isArray(response)) {
            throw new Error('Response is not a valid Application object');
        }


        return response;
    } catch (error) {
        if (error.response.status === 401) {
            useRouter().replace('/auth');
        } else {
            console.error('Missed data. Error occured:', error);
            return { data: null, error: error.response._data.message };
        }
    }
}

export async function reject(id: string, descr: string) {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;
    const arr: any = ref([]);
    const error: any = ref(null);
    const dataBody = new FormData();
    dataBody.append('description', descr);

    try {
        const response: Application | NotData = await $fetch(`${config.public.apiBase}/applications/${id}/reject`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
                'X-Auth-User': `${authUser}`
            },
            method: 'POST',
            body: dataBody
        });

        arr.value = response;
    } catch (err: any) {
        if (error.response.status === 401) {
            useRouter().replace('/auth');
        } else {
            console.error('Missed data. Error occured:', err);
            error.value = err.response._data.message
        }
    }

    return { data: null, error: error.value };
}

export async function approve(id: string) {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;
    const arr: any = ref([]);
    const error: any = ref(null);

    try {
        const response: Application | NotData = await $fetch(`${config.public.apiBase}/applications/${id}/approve`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
                'X-Auth-User': `${authUser}`
            },
            method: 'POST',
        });

        arr.value = response;
    } catch (err: any) {
        if (error.response.status === 401) {
            useRouter().replace('/auth');
        } else {
            console.error('Missed data. Error occured:', err);
            error.value = err.response._data.message
        }
    }

    return { data: null, error: error.value };
}