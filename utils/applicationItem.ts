import { type Application } from "~/types/application"

interface NotData {
    'message': string;
}

export async function fetchApplicationDetail(id: number) {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;

    try {
        const response: Application | NotData= await $fetch(`${config.public.apiBase}/applications/${id}`, {
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
        console.error('Missed data. Error occured:', error);
        throw error;
    }
}