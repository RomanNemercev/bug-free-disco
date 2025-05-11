interface Application {
    id: number;
    created_at: string;
    updated_at: string;
    position: string;
    division: string;
    count: number;
    salaryFrom: number;
    salaryTo: number;
    currency: string;
    require: string;
    duty: string;
    reason: string;
    dateStart: string;
    dateWork: string;
    city: string;
    client: { id: number; name: string } | null;
    vacancy: { id: number; name: string } | null;
    status: { id: number; name: string } | null;
    executor: { id: number; name: string } | null;
}

export async function fetchApplicationDetail(id: number) {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;

    try {
        const response: Application = await $fetch(`${config.public.apiBase}/applications/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
                'X-Auth-User': `${authUser}`
            }
        });

        console.log('Success - 200:', response);
        console.log('typeof response.data:', typeof response);
        // check on validate repsponse date
        if (!response || typeof response !== 'object' || Array.isArray(response)) {
            throw new Error('Response is not a valid Application object');
        }
        return response;
    } catch (error) {
        console.error('Missed data. Error occured:', error);
        throw error;
    }
}