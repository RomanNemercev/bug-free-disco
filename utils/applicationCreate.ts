export const createApplication = async (applicationData: any) => {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token').value;
    const authUser = useCookie('auth_user').value;

    try {
    const response = await $fetch(`${config.public.apiBase}/applications`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
                'X-Auth-User': `${authUser}`
            },
            body: applicationData,
        });  

        if (!response || typeof response !== 'object' || Array.isArray(response)) {
            throw new Error('Response is not a valid Application object');
        }
        
        return { data: response, error: null };
    } catch (error) {
        if (error.response.status === 401) {
            alert('Ваша сессия истекла! Пожалуйста, авторизуйтесь снова.');
            useRouter().replace('/auth');
        } else {
            console.error('Ошибка создания заявки:', error);
        throw error;
        }
    }


    // console.log('Server response:', data.value);
    // console.log('Server error:', error.value);

    // if (error.value) {
    //     console.error('Application creation error:', error.value);
    //     return { data: null, error: error.value };
    // }

    // return { data: response.value, error: null };
};