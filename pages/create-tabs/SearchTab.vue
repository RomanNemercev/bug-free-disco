<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

import CopyBoard from '~/components/custom/CopyBoard.vue'
import UiLoader from '~/components/UiLoader.vue'

//   get global loader
const { $loader } = useNuxtApp()
const router = useRoute()

// Состояние для управления отображением лоадера
const showLoader = ref(false)
let loaderTimeout = null

// Состояние для определения текущей активной страницы
const currentPage = ref('')

// Лениво загружаемые компоненты
const pages = {
  premiumPlatforms: defineAsyncComponent(() =>
    import('~/pages/create-tabs/search-tab/PremiumPlatforms.vue')
  ),
  freePlatforms: defineAsyncComponent(() =>
    import('~/pages/create-tabs/search-tab/FreePlatforms.vue')
  ),
  responseSettings: defineAsyncComponent(() =>
    import('~/pages/create-tabs/search-tab/ResponseSettings.vue')
  ),
}

// Функция переключения страницы
function openPage(pageName) {
  // router.push({ path: `vacancies/PremiumPlatforms` })
  currentPage.value = pageName
}

function goBack() {
  currentPage.value = null
}

// Обработчики событий Suspense
const onPending = () => {
  console.log('Suspense: Loading started')
  // Добавляем минимальную задержку, чтобы избежать мигания
  loaderTimeout = setTimeout(() => {
    showLoader.value = true
    $loader.show()
  }, 300) // Показываем лоадер только если загрузка длится дольше 300 мс
}

const onResolve = () => {
  console.log('Suspense: Loading finished')
  clearTimeout(loaderTimeout)
  showLoader.value = false
  $loader.hide()
}

const onFallback = () => {
  console.log('Suspense: Showing fallback')
}
</script>

<template>
  <div class="container pb-72 pt-48">
    <div v-if="!currentPage">
      <p class="text-space text-xl font-semibold leading-normal mb-2">
        Опубликовать на сайтах
      </p>
      <p class="text-sm text-bali font-normal leading-normal mb-27px">
        Все что нужно, чтобы начать быстро и эффективно
      </p>
      <div class="flex gap-x-15px mb-9">
        <div class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
          <div class="bg-img star mb-25px"></div>
          <p class="text-base font-medium text-space text-center mb-3 leading-normal">
            Премиальные доски объявлений
          </p>
          <p class="text-13px text-slate-custom font-normal text-center mb-auto leading-130">
            Используйте работные сайты и&nbsp;доски объявлений с&nbsp;премиум
            публикацией, что&nbsp;бы повысить узнаваемость вашей вакансии
          </p>
          <router-link to="/vacancies/PremiumPlatforms">
            <UiButton variant="semiaction" size="semiaction" class="w-full">
              Выбрать площадки
            </UiButton>
          </router-link>

        </div>
        <div class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
          <div class="bg-img planet mb-25px"></div>
          <p class="text-base font-medium text-space text-center mb-3 leading-normal">
            Бесплатные доски&nbsp;объявлений
          </p>
          <p class="text-13px text-slate-custom font-normal text-center mb-auto leading-130">
            Более 100+ бесплатных площадок для размещения в один клик
          </p>
          <UiButton variant="semiaction" size="semiaction" class="w-full" @click="openPage('freePlatforms')">
            Выбрать площадки
          </UiButton>
        </div>
        <div class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
          <div class="bg-img message mb-25px"></div>
          <p class="text-base font-medium text-space text-center mb-3 leading-normal">
            Поделиться
            <br />
            в социальных сетях
          </p>
          <p class="text-13px text-slate-custom font-normal text-center mb-auto leading-130">
            Расскажите о&nbsp;вашей вакансии в&nbsp;социальных сетях у&nbsp;себя
            на&nbsp;странице или поделитесь с&nbsp;контактами
          </p>
          <div class="flex gap-x-2.5">
            <a href="#"><svg-icon name="vk" class="w-10 h-10" /></a>
            <a href="#"><svg-icon name="tg" class="w-10 h-10" /></a>
            <a href="#"><svg-icon name="ok" class="w-10 h-10" /></a>
          </div>
        </div>
      </div>
      <div>
        <p class="text-space text-xl font-semibold leading-normal mb-2">
          Дополнительные инструменты
        </p>
        <p class="text-sm text-bali font-normal leading-normal mb-27px">
          Ускорьте существующие процессы найма
        </p>
        <div class="flex gap-x-15px">
          <div class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
            <div class="bg-img form mb-25px"></div>
            <p class="text-base font-medium text-space text-center mb-3 leading-normal">
              Настройте форму отклика
            </p>
            <p class="text-13px text-slate-custom font-normal text-center mb-auto leading-130">
              Кнопка импорта поможет легко скопировать и&nbsp;импортировать
              контакт со&nbsp;странице браузера, на&nbsp;которой
              вы&nbsp;находитесь
            </p>
            <UiButton variant="semiaction" size="semiaction" class="w-full" @click="openPage('responseSettings')">
              Настроить
            </UiButton>
          </div>
          <div class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
            <div class="bg-img import mb-25px"></div>
            <p class="text-base font-medium text-space text-center mb-3 leading-normal">
              Установите
              <br />
              кнопку импорта
            </p>
            <p class="text-13px text-slate-custom font-normal text-center mb-auto leading-130">
              Кнопка импорта поможет легко скопировать и&nbsp;импортировать
              контакт со&nbsp;странице браузера, на&nbsp;которой
              вы&nbsp;находитесь
            </p>
            <UiButton variant="semiaction" size="semiaction" class="w-full">
              Установить расширение
            </UiButton>
          </div>
          <div class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
            <div class="bg-img link mb-25px"></div>
            <p class="text-base font-medium text-space text-center mb-3 leading-normal">
              Короткая ссылка
              <br />
              на вакансию
            </p>
            <p class="text-13px text-slate-custom font-normal text-center mb-auto leading-130">
              Расскажите о вашей вакансии в социальных сетях, у себя на странице
              или отправьте контакту
            </p>
            <copy-board url="https://example.com/very-long-url-that-will-overflow-the-container-boundaries" />
          </div>
          <div class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
            <div class="bg-img inbox mb-25px"></div>
            <p class="text-base font-medium text-space text-center mb-3 leading-normal">
              Почтовый ящик
              <br />
              для резюме
            </p>
            <p class="text-13px text-slate-custom font-normal text-center mb-auto leading-130">
              Отправляйте резюме непосредственно на электронную почту,
              отправленные резюме будут автоматиски добавлены в раздел кандидаты
            </p>
            <copy-board url="https://example.com/very-long-url-that-will-overflow-the-container-boundaries" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Динамическая загрузка страницы с лоадером -->
      <Suspense @pending="onPending" @resolve="onResolve" @fallback="onFallback">
        <template #default>
          <component :is="pages[currentPage]">
            <template #back>
              <UiButton variant="black" size="black" @click="goBack" class="mb-35px">
                Назад
              </UiButton>
            </template>
          </component>
        </template>
        <template #fallback>
          <UiLoader v-if="showLoader" />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
.bg-img {
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
}

.star {
  background-image: url('../../assets/img/star.svg');
}

.planet {
  background-image: url('../../assets/img/planet.svg');
}

.message {
  background-image: url('../../assets/img/message.svg');
}

.form {
  background-image: url('../../assets/img/form.svg');
}

.import {
  background-image: url('../../assets/img/import.svg');
}

.link {
  background-image: url('../../assets/img/vacancy-link.svg');
}

.inbox {
  background-image: url('../../assets/img/inbox.svg');
}
</style>
