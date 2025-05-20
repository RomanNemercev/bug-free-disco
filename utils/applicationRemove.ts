export const deleteApplication = async (id) => {
    const config = useRuntimeConfig();

    const { data, error } = await useFetch(`/applications/${id}`, {
        method: 'DELETE',
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useCookie('auth_token').value}`,
            'X-Auth-User': `${useCookie('auth_user').value}`,
        },
    });

    console.log('Server response:', data.value);
    console.log('Server error:', error.value);

    if (error.value) {
        console.error('Application deletion error:', error.value);
        return { data: null, error: error.value };
    }

    return { data: data.value, error: null };
};