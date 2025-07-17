<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import MyInput from '~/components/custom/MyInput.vue'
import MyDropdown from '~/components/custom/MyDropdown.vue'
import EmailInput from '~/components/custom/EmailInput.vue'
import PhoneInput from '~/components/custom/PhoneInput.vue'
import Popup from '~/components/custom/Popup.vue'
import PasswordInput from '~/components/custom/PasswordInput.vue'

const userStore = useUserStore()
const userName = computed(() => userStore.name || 'Гость')

definePageMeta({
  layout: 'settings',
})

useHead({
  title: 'Настройки — Профиль',
})

const firstName = ref('')
const lastName = ref('')
const position = ref('')
const department = ref('')
const phone = ref('')
const email = ref('')
const changePassword = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const repeatNewPassword = ref('')

const departments = ref([
  {
    name: 'HR',
    value: 1,
  },
  {
    name: 'Бухгалтерия',
    value: 2,
  },
  {
    name: 'Разработка',
    value: 3,
  },
  {
    name: 'Продажи',
    value: 4,
  }
])

const notMatch = ref(false)

function checkRepeatPasswords() {
  if (newPassword.value !== repeatNewPassword.value) {
    notMatch.value = true
    console.log('notMatch value is: ', notMatch.value)
  } else {
    notMatch.value = false
    console.log('notMatch value now: ', notMatch.value)
  }
}
</script>

<template>
  <div>
    <div>
      <div class="w-full bg-white rounded-fifteen flex px-25px py-15px h-fit gap-x-15px items-center mb-15px">
        <UiAvatar size="setting">
          <UiAvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
          <UiAvatarFallback>{{ userStore.initials }}</UiAvatarFallback>
        </UiAvatar>
        <div class="h-fit">
          <p class="text-lg font-medium text-space leading-normal mb-5px">
            {{ userName }}
          </p>
          <p class="text-sm font-normal text-bali">Администратор</p>
        </div>
      </div>
      <div class="rounded-fifteen p-25px bg-white mb-15px">
        <p class="text-xl font-semibold text-space mb-25px">Основная информация</p>
        <div class="mb-25px">
          <div class="grid grid-cols-2 gap-x-15px mb-15px">
            <div>
              <p class="text-sm font-medium text-space leading-150 mb-15px">Имя</p>
              <MyInput v-model="firstName" :placeholder="'Ваше имя'" />
            </div>
            <div>
              <p class="text-sm font-medium text-space leading-150 mb-15px">Фамилия</p>
              <MyInput v-model="lastName" :placeholder="'Ваша фамилия'" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-x-15px mb-15px">
            <div>
              <p class="text-sm font-medium text-space leading-150 mb-15px">Должность</p>
              <MyInput v-model="position" :placeholder="'Введите вашу должность'" />
            </div>
            <div>
              <p class="text-sm font-medium text-space leading-150 mb-15px">Отдел</p>
              <MyDropdown v-model="department" :options="departments" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-x-15px mb-15px">
            <div>
              <p class="text-sm font-medium text-space leading-150 mb-15px">Email</p>
              <EmailInput v-model="email" :placeholder="'Введите email'" />
            </div>
            <div>
              <p class="text-sm font-medium text-space leading-150 mb-15px">Телефон</p>
              <PhoneInput v-model="phone" :placeholder="'Введите ваш номер телефона'" />
            </div>
          </div>
        </div>
        <UiButton variant="black" size="semiaction">Сохранить изменения</UiButton>
      </div>
      <div class="rounded-fifteen p-25px bg-white">
        <p class="text-xl font-semibold text-space mb-25px">Безопасность</p>
        <div>
          <p class="text-sm font-medium text-space mb-2.5">Пароль аккаунта</p>
          <button class="flex" @click="changePassword = true"><svg-icon name="gear-dodger" width="20"
              height="20" /><span class="ml-5px text-dodger text-sm font-medium">Изменить</span></button>
        </div>
      </div>
    </div>
    <transition name="fade">
      <Popup :isOpen="changePassword" @close="changePassword = false" :width="'490px'">
        <div>
          <p class="text-xl font-semibold text-space mb-[23px]">Изменить основной пароль</p>
          <div class="mb-15px">
            <p class="text-sm font-medium leading-150 mb-15px">Введите текущий пароль</p>
            <PasswordInput v-model="currentPassword" :placeholder="'*************'" />
          </div>
          <div class="mb-15px">
            <p class="text-sm font-medium leading-150 mb-15px">Введите новый пароль</p>
            <PasswordInput v-model="newPassword" :placeholder="'******'" />
          </div>
          <div class="mb-25px">
            <p class="text-sm font-medium leading-150 mb-15px">Повторите новый пароль</p>
            <PasswordInput v-model="repeatNewPassword" :placeholder="'******'" @blur="checkRepeatPasswords()" />
            <span v-if="notMatch" class="text-red-custom text-xs mt-1 block">
              Пароли не совпадают
            </span>
          </div>
          <div class="flex gap-x-15px">
            <UiButton variant="action" size="semiaction">Сохранить</UiButton>
            <UiButton variant="back" size="semiaction" @click="changePassword = false">Отмена</UiButton>
          </div>
        </div>
      </Popup>
    </transition>
  </div>
</template>

<style scoped>
/* Анимация появления и скрытия */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-from {
  opacity: 1;
}
</style>