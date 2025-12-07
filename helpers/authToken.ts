export interface AuthTokens {
  config: ReturnType<typeof useRuntimeConfig>;
  serverToken: string;
  userToken: string;
}

// Общий тип для результата API запросов HeadHunter с поддержкой дополнительных свойств
export type ApiHhResult = {
  data: any;
  error: string | null;
  [key: string]: any; // Индексная сигнатура для дополнительных свойств
};

export function getAuthTokens(): AuthTokens | null {
  const config = useRuntimeConfig();
  const serverTokenCookie = useCookie('auth_token');
  const userTokenCookie = useCookie('auth_user');

  const serverToken = serverTokenCookie.value;
  const userToken = userTokenCookie.value;

  if (!serverToken || !userToken) {
    if (!serverToken) console.error('Токен сервера не найден в cookie');
    if (!userToken) console.error('Токен пользователя не найден в cookie');
    return null;
  }

  return { config, serverToken, userToken };
}

export function clearAuthTokens(): void {
  const serverTokenCookie = useCookie('auth_token');
  const userTokenCookie = useCookie('auth_user');
  serverTokenCookie.value = null;
  userTokenCookie.value = null;
}

export function createAuthHeaders(serverToken: string, userToken: string) {
  return {
    'Accept': 'application/json',
    'Authorization': `Bearer ${serverToken}`,
    'X-Auth-User': userToken,
  };
}

export function handle401Error(showAlert = false) {
  clearAuthTokens();

  if (showAlert) {
    alert('Срок сессии истек. Пожалуйста, авторизуйтесь снова.');
  }

  navigateTo('/auth');
}

// export function createApiResult<T>(dataField: string = 'data') {
//   return ref<{ [key: string]: T | string | null }>({
//     [dataField]: null,
//     error: null
//   });
// }
