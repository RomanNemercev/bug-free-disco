<template>
  <div class="w-full bg-space">
    <div
      class="max-w-2xl px-50px py-[12.8px] mx-auto flex leading-normal items-center"
    >
      <router-link to="/">
        <h1 class="text-white text-25px font-bold uppercase px-3 py-0.5 mr-4">
          jobly
        </h1>
      </router-link>
      <ul class="flex gap-x-5px items-center">
        <li>
          <NuxtLink to="/applications" exact-active-class="active-link">
            <p
              class="page-name leading-normal text-white opacity-50 px-3 py-2 hover:opacity-100 transition-all rounded-lg hover:bg-hoverbtn text-15px font-semibold"
            >
              Заявки
            </p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/vacancies"
            :class="{ 'active-link': isVacanciesActive }"
          >
            <p
              class="page-name leading-normal text-white opacity-50 px-3 py-2 hover:opacity-100 transition-all rounded-lg hover:bg-hoverbtn text-15px font-semibold"
            >
              Вакансии
            </p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/candidates" exact-active-class="active-link">
            <p
              class="page-name leading-normal text-white opacity-50 px-3 py-2 hover:opacity-100 transition-all rounded-lg hover:bg-hoverbtn text-15px font-semibold"
            >
              Кандидаты
            </p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/reports" exact-active-class="active-link">
            <p
              class="page-name leading-normal text-white opacity-50 px-3 py-2 hover:opacity-100 transition-all rounded-lg hover:bg-hoverbtn text-15px font-semibold"
            >
              Отчеты
            </p>
          </NuxtLink>
        </li>
      </ul>
      <ul class="flex ml-auto items-center">
        <li class="mr-5px">
          <div
            class="w-10 h-10 rounded-plus flex items-center justify-center hover:bg-hoverbtn transition-all cursor-pointer"
          >
            <svg-icon name="pulse" width="20" height="20" />
          </div>
        </li>
        <li class="mr-5px">
          <div
            class="w-10 h-10 rounded-plus flex items-center justify-center hover:bg-hoverbtn transition-all cursor-pointer text-white"
          >
            <svg-icon name="calendar" width="20" height="20" />
          </div>
        </li>
        <li class="mr-5px">
          <div
            class="w-10 h-10 rounded-plus flex items-center justify-center hover:bg-hoverbtn transition-all cursor-pointer"
          >
            <svg-icon name="bell" width="20" height="20" />
          </div>
        </li>
        <li class="mr-5">
          <div
            class="w-10 h-10 rounded-plus flex items-center justify-center hover:bg-hoverbtn transition-all cursor-pointer"
          >
            <svg-icon name="settings" width="20" height="20" />
          </div>
        </li>
        <li>
          <div class="cursor-pointer max-h-[40px]">
            <UiAvatar>
              <UiAvatarImage
                src="https://github.com/radix-vue.png"
                alt="@radix-vue"
              />
              <UiAvatarFallback>{{ userStore.initials }}</UiAvatarFallback>
            </UiAvatar>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  import { useUserStore } from '@/stores/user'

  const route = useRoute()
  const isVacanciesActive = computed(() => route.path.startsWith('/vacancies'))
  const userStore = useUserStore()
</script>

<style lang="scss" scoped>
  .active-link {
    .page-name {
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
</style>
