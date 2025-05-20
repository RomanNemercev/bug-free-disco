export const createApplication = async (applicationData) => {
    const config = useRuntimeConfig();

    const { data, error } = await useFetch('/applications', {
        method: 'POST',
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useCookie('auth_token').value}`,
            'X-Auth-User': `${useCookie('auth_user').value}`,
        },
        body: applicationData,
    });

    console.log('Server response:', data.value);
    console.log('Server error:', error.value);

    if (error.value) {
        console.error('Application creation error:', error.value);
        return { data: null, error: error.value };
    }

    return { data: data.value, error: null };
};