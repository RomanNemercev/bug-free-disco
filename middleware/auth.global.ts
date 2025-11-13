// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie, useRoute } from '#app';
import type { RouteLocationNormalized } from '#app'; // Импортируем типы
import { profile as getProfile} from '~/utils/loginUser';

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const tokenCookie = useCookie('auth_token');
  
 if (to.path === '/auth' || to.path.startsWith('/public')) {
    return;
  }

  // Проверка: токен отсутствует, пустой или null
  if (!tokenCookie?.value) {
    return navigateTo('/auth');
  } else {
      const { data: profileUser, error: profileError, status } = await getProfile();
      if (status == 401) {
        await getServerToken();
        const { data: profileUser, error: profileError, status: statusUpdate } = await getProfile();
        if (statusUpdate == 401) {
          if (profileError == 'Unauthorized')
          return navigateTo('/auth');
        }
        navigateTo({ path: to.path });
        return;
      } else {
        return;
      }
  }
});