import { getServerToken } from './getServerToken';

export const registerUser = async (userData) => {
    const token = await getServerToken();
    if (!token) {
        console.error('Token not found');
        return null;
    }

    const config = useRuntimeConfig();
    const { data, error } = await useFetch('/register', {
        method: 'POST',
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: userData,
    });

    console.log('Server response:', data.value);
    console.log('Server error:', error.value);

    return error.value ? null : data.value;
};