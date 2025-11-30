// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie, useRoute } from '#app';
// import type { RouteLocationNormalized } from '#app'; // Импортируем типы
import type { RouteLocationNormalized } from 'vue-router'; // Импортируем типы
import { profile as getProfile } from '~/utils/loginUser';
import { getServerToken } from '~/utils/getServerToken';

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  // Пропускаем middleware во время prerendering (статическая генерация)
  if (import.meta.prerender) {
    return;
  }

  // Пропускаем middleware во время SSR build, если мы на сервере без клиента
  // Это предотвращает выполнение HTTP запросов к API во время сборки
  if (import.meta.server && import.meta.env.NODE_ENV === 'production') {
    return;
  }

  const tokenCookie = useCookie('auth_token');

  if (to.path === '/auth' || to.path.startsWith('/public')) {
    return;
  }

  // Проверка: токен отсутствует, пустой или null
  if (!tokenCookie?.value) {
    // Во время SSR на сервере не делаем редирект, только на клиенте
    if (import.meta.client) {
      return navigateTo('/auth');
    }
    return;
  } else {
    try {
      const { data: profileUser, error: profileError, status } = await getProfile();
      // console.log('route path', to.path);
      if (status == 401) {
        await getServerToken();
        const { data: profileUser, error: profileError, status: statusUpdate } = await getProfile();
        if (statusUpdate == 401) {
          if (profileError == 'Unauthorized') {
            if (import.meta.client) {
              return navigateTo('/auth');
            }
            return;
          }
        }
        // Избегаем бесконечного цикла - не делаем редирект на тот же путь во время SSR
        if (import.meta.client) {
          return navigateTo({ path: to.path });
        }
      } else {
        return;
      }
    } catch (error: any) {
      // Обработка ошибок сети/таймаута
      console.error('Ошибка в middleware auth:', error.message || error);

      // Если это ошибка сети или таймаут, не делаем редирект во время SSR
      if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' || error.name === 'TimeoutError') {
        console.warn('API недоступен или таймаут. Пропускаем проверку авторизации.');
        // Во время SSR просто продолжаем без проверки
        if (import.meta.server) {
          return;
        }
      }

      // Для других ошибок делаем редирект только на клиенте
      if (import.meta.client) {
        return navigateTo('/auth');
      }
    }
  }
});
