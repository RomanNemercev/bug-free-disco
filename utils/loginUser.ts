import { getServerToken } from './getServerToken';

export const loginUser = async (email, password) => {
    const serverToken = await getServerToken();
    if (!serverToken) {
        console.error('Token server not found');
        return null;
    }

    const config = useRuntimeConfig();

    const { data, error } = await useFetch('/login', {
        method: 'POST',
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serverToken}`,
        },
        body: {
            email,
            password,
        },
    });

    console.log('Server response:', data.value);
    console.log('Server error:', error.value);

    if (error.value) {
        console.error('Login error:', error.value);
        return null;
    }

    if (data.value?.user?.auth_token) {
        const userTokenCookie = useCookie('auth_user');
        userTokenCookie.value = data.value?.user?.auth_token;
        console.log('User token is save in cookie', userTokenCookie.value);
    }

    return data.value;
}