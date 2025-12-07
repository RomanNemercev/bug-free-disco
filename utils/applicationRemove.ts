// import { data } from "autoprefixer";

export const deleteApplication = async (id: string) => {
  const config = useRuntimeConfig();

  try {
    const data = await $fetch(`/applications/${id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBase as string,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('auth_token').value}`,
        'X-Auth-User': `${useCookie('auth_user').value}`,
      },
    });

    // console.log('Server response:', data);
    return { data: data, error: null };
  } catch (error: any) {
    if (error.response?.status === 401) {
      useRouter().replace('/auth');
    } else {
      console.error('Ошибка при удалении заявки:', error);
      return { data: null, error: error.response._data.message };
    }
  }
  return { data: null, error: 'Неизвестная ошибка' };

};
