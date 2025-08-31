interface PlatformResponse {
    data: {
        message: string
        url_auth: string
    }
}

export const getProfile = async () => {
    const config = useRuntimeConfig();

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    const result = ref<{ data: any, error: string | null}>({ data: null, error: null });
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }

    try {
        const response = await $fetch<PlatformResponse>('/hh/profile', {
            method: 'GET',
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, // Новый заголовок
            },
        });

        result.value.data = response;
    } catch (err: any) {
        if (err.response?.status === 404) {
            result.value.error = err.response._data.message;
        }
        if (err.response?.status === 401) {
            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        }
    } finally {
        return result.value;
    }
};

export const auth = async () => {
    const config = useRuntimeConfig();

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    const result = ref<{ data: any, error: string | null}>({ data: null, error: null });
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }

    try {
        const response = await $fetch<PlatformResponse>('/hh/auth', {
            method: 'GET',
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, // Новый заголовок
            },
        });

        result.value.data = response;
    } catch (err: any) {
        if (err.response?.status === 401) {
            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        } else {
            result.value.error = err.response._data.message;
        }
    } finally {
        return result.value;
    }
};

export const getCode = async () => {
    const config = useRuntimeConfig();

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    const result = ref<{ data: any, error: string | null}>({ data: null, error: null });
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }

    try {
        const response = await $fetch<PlatformResponse>(`/hh/code`, {
            method: 'GET',
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, // Новый заголовок
            },
        });

        console.log('response', response);

        result.value.data = response;
    } catch (err: any) {
        if (err.response?.status === 401) {
            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        } else {
            result.value.error = err.response._data.message;
        }
    } finally {
        return result.value;
    }
};

export const getPublications = async () => {
    const config = useRuntimeConfig();

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    const result = ref<{ roles: any, errorRoles: string | null}>({ roles: null, errorRoles: null });
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }
    
    try {
        const response = await $fetch<PlatformResponse>('/hh/publications', {
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, 
            },
        });

        result.value.roles = response.data;
    } catch (err: any) {
        if (err.response?.status === 404) {
            result.value.errorRoles = err.response._data.message;
        }
        if (err.response?.status === 401) {
            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        }
    } finally {
        return result.value;
    }
}

export const getAvailableTypes = async (employerId: string, managerId: string) => {
    const config = useRuntimeConfig();

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    const result = ref<{ types: any, errorTypes: string | null}>({ types: null, errorTypes: null });
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }
    
    try {
        const response = await $fetch<PlatformResponse>('/hh/avalibale-types', {
            method: 'POST',
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, // Новый заголовок
            },
            body: { employer_id: employerId, manager_id: managerId },
        });

        result.value.types = response.data.items;
    } catch (err: any) {
        console.log('error types available ', err.response._data.message);
        if (err.response?.status === 404) {
            result.value.errorTypes = err.response._data.message;
        }
        if (err.response?.status === 401) {
            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        }
    } finally {
        return result.value;
    }
}

export const addDraft = async (data: any) => {
    const config = useRuntimeConfig();
    const bodyData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            if (value.length > 0) {
                if (value[0] !== null) {
                    console.log(`${key}[0][id]` + value[0].id)
                    bodyData.append(`${key}[0][id]`, value[0].id);
                    // for (let index in value[0]) {
                    //     alert(`${key}[0][${index}]` + value[0][index])
                    //     bodyData.append(`${key}[0][${index}]`, value[0][index]);
                    // }
                }
            }
        } else {
            if (typeof value === 'object') {
                if (Object.keys(value).length > 0) {
                    // console.log(`${key}[id]` + value.id)
                    // bodyData.append(`${key}[id]`, `${value.id}`);
                    for (let index in value) {
                        console.log('API: ' + `${key}[${index}]` + `${value[index]}`);
                        bodyData.append(`${key}[${index}]`, `${value[index]}`);
                    }
                }
            } else {
                bodyData.append(key, value);
            }
            
        }
        // if (key == 'professional_roles' ) {
        //     bodyData.append('professional_roles[0][id]', data.professional_roles[0].id);
        // } else {
        //     bodyData.append(key, value);
        // }
    })
    

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    const result = ref<{ draft: any, errorDraft: string | null}>({ draft: null, errorDraft: null });
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }
    
    try {
        const response = await $fetch<PlatformResponse>('/hh/drafts', {
            method: 'POST',
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, 
            },
            body: bodyData,
        });

        result.value.draft = response.data;
    } catch (err: any) {
        if (err.response?.status !== 401) {
            result.value.errorDraft = err.response._data.message;
        } else {
            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        }
    } finally {
        return result.value;
    }
}

export const getRoles = async () => {
    const config = useRuntimeConfig();

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    const result = ref<{ roles: any, errorRoles: string | null}>({ roles: null, errorRoles: null });
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }
    
    try {
        const response = await $fetch<PlatformResponse>('/hh/roles', {
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, 
            },
        });

        result.value.roles = response.data;
    } catch (err: any) {
        console.log('error types available ', err.response._data.message);
        if (err.response?.status === 404) {
            result.value.errorRoles = err.response._data.message;
        }
        if (err.response?.status === 401) {
            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        }
    } finally {
        return result.value;
    }
}

export const getVacancies = async () => {
    const config = useRuntimeConfig();

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    const result = ref<{ vacancies: any, errorVacancies: string | null}>({ vacancies: null, errorVacancies: null });
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }
    
    try {
        const response = await $fetch<PlatformResponse>('/hh/vacancies', {
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, 
            },
        });

        result.value.vacancies = response.data;
    } catch (err: any) {
        if (err.response?.status === 404) {
            result.value.errorVacancies = err.response._data.message;
        }
        if (err.response?.status === 401) {
            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        }
    } finally {
        return result.value;
    }
}

export const getDrafts = async () => {
    const config = useRuntimeConfig();

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    const result = ref<{ drafts: any, errorDrafts: string | null}>({ drafts: null, errorDrafts: null });
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }
    
    try {
        const response = await $fetch<PlatformResponse>('/hh/drafts', {
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, 
            },
        });

        result.value.drafts = response.data;
    } catch (err: any) {
        if (err.response?.status === 404) {
            result.value.errorDrafts = err.response._data.message;
        }
        if (err.response?.status === 401) {
            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        }
    } finally {
        return result.value;
    }
}

export const getResponses = async (id: string) => {
    const config = useRuntimeConfig();

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    const result = ref<{ responses: any, errorResponses: string | null}>({ responses: null, errorResponses: null });
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }
    
    try {
        const response = await $fetch<PlatformResponse>(`/hh/vacancy-responses/${id}`, {
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, 
            },
        });

        result.value.responses = response.data;
        console.log(result.value.responses);
    } catch (err: any) {
        if (err.response?.status === 404) {
            result.value.errorResponses = err.response._data.message;
        }
        if (err.response?.status === 401) {
            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        }
    } finally {
        return result.value;
    }
}

export const getResponse = async (id: string) => {
    const config = useRuntimeConfig();

    // Токен сервера из cookie
    const serverTokenCookie = useCookie('auth_token');
    const serverToken = serverTokenCookie.value;
    if (!serverToken) {
        console.error('Токен сервера не найден в cookie');
        return null;
    }

    // Токен пользователя из cookie
    const userTokenCookie = useCookie('auth_user');
    const userToken = userTokenCookie.value;
    const result = ref<{ responses: any, errorResponses: string | null}>({ responses: null, errorResponses: null });
    if (!userToken) {
        console.error('Токен пользователя не найден в cookie');
        return null;
    }
    
    try {
        const response = await $fetch<PlatformResponse>(`/hh/vacancy-response/${id}`, {
            baseURL: config.public.apiBase as string, // https://admin.job-ly.ru/api
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${serverToken}`,
                'X-Auth-User': userToken, 
            },
        });

        result.value.responses = response.data;
        console.log(result.value.responses);
    } catch (err: any) {
        if (err.response?.status === 404) {
            result.value.errorResponses = err.response._data.message;
        }
        if (err.response?.status === 401) {
            serverTokenCookie.value = null; // Удаляем просроченный токен сервера
            userTokenCookie.value = null;   // Удаляем просроченный токен пользователя
            // Middleware сработает автоматически при следующем роутинге
            alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
            navigateTo('/auth');
        }
    } finally {
        return result.value;
    }
}