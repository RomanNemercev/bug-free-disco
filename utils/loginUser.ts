import { getServerToken } from './getServerToken';
import { useUserStore } from '@/stores/user';

interface LoginResponse {
  user: {
    auth_token: string;
    name: string;
    email: string;
    role: string;
  }
}

export const loginUser = async (email: string, password: string) => {
  const serverToken = await getServerToken();
  if (!serverToken) {
    return { data: null, error: 'Не удалось получить серверный токен' };
  }

  const config = useRuntimeConfig();

  try {

    const response = await $fetch<LoginResponse>('/login', {
      method: 'POST',
      baseURL: config.public.apiBase as string,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serverToken}`,
      },
      body: {
        email,
        password,
      },
    });

    if (response?.user?.auth_token) {
      const userTokenCookie = useCookie('auth_user');
      userTokenCookie.value = response.user.auth_token;
    }
    if (response.user.name && response.user.email) {
      const userStore = useUserStore();
      userStore.setUserData({
        name: response.user.name,
        email: response.user.email,
        role: response.user.role
      });
      console.log('Данные пользователя сохранены в хранилище', userStore.name, userStore.email);
    } else {
      console.warn('Токен не получен в ответе сервера');
    }

    return { data: response, error: null };
  } catch (err: any) {
    console.error('Ошибка при входе:', err.message || err);
    let errorMessage = 'Произошла ошибка при входе';
    if (err.response?.status === 401) {
      errorMessage = 'Неверный email или пароль';
    } else if (err.response?.status === 404) {
      errorMessage = 'Пользователь не найден';
    } else if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    }
    console.error('Детали ошибки:', err.response?.data || err.response);
    return { data: null, error: errorMessage };
  }
};

export const profile = async () => {
  const config = useRuntimeConfig();
  const authToken = useCookie('auth_token').value;
  const authUser = useCookie('auth_user').value;

  // Проверка наличия токенов перед запросом
  if (!authToken || !authUser) {
    return { data: null, error: 'Токены авторизации отсутствуют', status: 401 };
  }

  try {
    const response: { data: any, message: string } = await $fetch(`${config.public.apiBase}/profile`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
        'X-Auth-User': `${authUser}`
      },
      // Таймаут для предотвращения зависания запроса
      timeout: 10000, // 10 секунд
    })

    return { data: response, error: null, status: 200 };
  } catch (error: any) {
    // Обработка различных типов ошибок
    if (error.code === 'ETIMEDOUT' || error.name === 'TimeoutError') {
      console.error('Таймаут при получении профиля: API не отвечает в течение 10 секунд');
      return { data: null, error: 'Таймаут запроса', status: 504 };
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Ошибка подключения: API недоступен');
      return { data: null, error: 'API недоступен', status: 503 };
    } else if (error.response?.status) {
      return {
        data: null,
        error: error.response?._data?.message || 'Ошибка запроса',
        status: error.response.status
      };
    } else {
      console.error('Неизвестная ошибка при получении профиля:', error);
      return { data: null, error: 'Ошибка запроса', status: 500 };
    }
  }
}
