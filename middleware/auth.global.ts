// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app';
import type { RouteLocationNormalized } from '#app'; // Импортируем типы

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const tokenCookie = useCookie('auth_token');
  if (to.path === '/auth') {
    return;
  }
  if (!tokenCookie.value) {
    return navigateTo('/auth');
  } else {
    console.log('Токен есть! middleware работает');
  }
});