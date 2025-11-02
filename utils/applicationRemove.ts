import { data } from "autoprefixer";

export const deleteApplication = async (id) => {
    const config = useRuntimeConfig();

    try {
        const data = await $fetch(`/applications/${id}`, {
        method: 'DELETE',
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useCookie('auth_token').value}`,
            'X-Auth-User': `${useCookie('auth_user').value}`,
        },
    });

    console.log('Server response:', data);
    } catch (error) {
        if (error.response.status === 401) {
            useRouter().replace('/auth');
        } else {
            console.error('Application deletion error:', error);
            return { data: null, error: error.response._data.message };
        }
    }


    return { data: data, error: null };
};