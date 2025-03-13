// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const tokenCookie = useCookie('auth_token');
  // Пропускаем проверку для страницы /auth
  if (to.path === '/auth') {
    return; // Ничего не делаем, разрешаем доступ
  }
  if (!tokenCookie.value) {
    return navigateTo('/auth');
  } else {
    console.log('Токен есть! middleware работает');
  }
});