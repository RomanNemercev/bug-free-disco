interface ServerResponse {
  authorization: {
    token: string;
  };
}

export const getServerToken = async () => {
  const config = useRuntimeConfig();

  // Проверяем наличие необходимых переменных окружения
  if (!config.public.apiBase || !config.public.apiEmail || !config.public.apiPassword) {
    console.warn('Отсутствуют необходимые переменные окружения для получения server token');
    return null;
  }

  // console.log(config.public.apiBase);
  try {
    const response = await $fetch<ServerResponse>('/login-jwt', {
      method: 'POST',
      baseURL: config.public.apiBase as string,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: config.public.apiEmail,
        password: config.public.apiPassword,
      },
      // Таймаут для предотвращения зависания запроса
      timeout: 10000, // 10 секунд
    });

    // console.log('Данные server token:', response.authorization?.token);

    if (response.authorization?.token) {
      const tokenCookie = useCookie('auth_token');
      tokenCookie.value = response.authorization.token;
      // console.log('Token server is saved in cookie:', tokenCookie.value);
      return tokenCookie.value;
    } else {
      console.warn('Токен не получен в ответе сервера');
      return null;
    }
  } catch (err: any) {
    // Обработка различных типов ошибок
    if (err.code === 'ETIMEDOUT' || err.name === 'TimeoutError') {
      console.error('Таймаут при получении server token: API не отвечает в течение 10 секунд');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Ошибка подключения: API недоступен');
    } else if (err.response?.status === 401) {
      console.warn('401: Неверные учетные данные или доступ запрещён');
    } else {
      console.error('Ошибка при получении server token:', err.message || err);
    }
    return null;
  }
};
