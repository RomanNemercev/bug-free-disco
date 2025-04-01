<template>
  <div class="enter active form">
    <p class="enter__title f25w700">
      Вход в
      <span class="enter__title-custom">Jobly</span>
    </p>
    <p class="enter__descr f14w500 c-bali">Используйте данные для входа</p>
    <div class="enter__data">
      <p class="enter__email-title f14w500">Email</p>
      <label class="enter__email-wrapper">
        <input
          type="email"
          class="enter__email-input e-input f14w400"
          placeholder="Введите email"
          v-model="email"
          :class="{ error: emailError }"
        />
        <span
          v-if="emailError"
          class="error-message f12w400"
          style="color: red"
        >
          {{ emailError }}
        </span>
      </label>
      <p class="enter__pass-title f14w500">Пароль</p>
      <label class="enter__pass-wrapper">
        <input
          type="password"
          class="enter__pass-input e-input f14w400"
          placeholder="******"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          :class="{ error: passwordError }"
        />
        <span
          v-if="passwordError"
          class="error-message f12w400"
          style="color: red"
        >
          {{ passwordError }}
        </span>
        <button type="button" class="pass-eye" @click="togglePassword"></button>
      </label>
    </div>
    <button class="btn-reset btn enter__btn-in f14w600 c-white" @click="login">
      Войти
    </button>
    <p v-if="authError" class="text-center text-red mt-[-15px] text-sm">
      {{ authError }}
    </p>
    <div class="enter__btns">
      <button
        class="btn-reset enter__btn-reg c-dodger f14w500"
        @click="$emit('changeForm', 'reg')"
      >
        Регистрация
      </button>
      <button
        class="btn-reset enter__btn-forgot c-dodger f14w500"
        @click="$emit('changeForm', 'reset')"
      >
        Забыли пароль?
      </button>
    </div>
    <div class="enter__more">
      <a href="#" class="enter__more-agree c-dodger f14w500">
        Пользовательское соглашение
      </a>
      <a href="#" class="enter__more-supp c-dodger f14w500">Поддержка</a>
    </div>
  </div>
</template>

<script setup>
  import { ref, nextTick } from 'vue'
  import { loginUser } from '~/utils/loginUser'
  import { navigateTo } from '#app'

  const email = ref('')
  const password = ref('')
  const emailError = ref(null)
  const passwordError = ref(null)
  const showPassword = ref(false)
  const authError = ref(null)

  const togglePassword = () => {
    showPassword.value = !showPassword.value
    // Принудительное обновление типа через $nextTick
    nextTick(() => {
      const input = document.querySelector('.enter__pass-input')
      input.type = showPassword.value ? 'text' : 'password'

      // change eye icon
      const eyeButton = document.querySelector('.pass-eye')
      if (showPassword.value) {
        eyeButton.classList.add('show')
      } else {
        eyeButton.classList.remove('show')
      }
    })
  }

  const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const login = async () => {
    emailError.value = null
    passwordError.value = null
    authError.value = null

    let isValid = true

    if (!email.value) {
      emailError.value = 'Это поле обязательно для заполнения'
      isValid = false
    } else if (!validateEmail(email.value)) {
      emailError.value = 'Введите корректный email'
      isValid = false
    }

    if (!password.value) {
      passwordError.value = 'Это поле обязательно для заполнения'
      isValid = false
    } else if (password.value.length < 8) {
      passwordError.value = 'Пароль должен содержать не менее 8 символов'
      isValid = false
    }

    if (!isValid) return

    const { data, error } = await loginUser(email.value, password.value)
    console.log('result login:', { data, error })

    if (error) {
      authError.value = error
      return
    }

    if (data) {
      // Успешная авторизация, перенаправляем на главную страницу
      await navigateTo('/')
    }
  }
</script>

<style scoped>
  /* Добавим стили здесь */
  .enter {
    background-color: #ffffff;
    padding: 50px;
    border-radius: 15px;
    max-width: 400px;
    width: 100%;
  }

  .enter__title {
    text-align: center;
    margin-bottom: 12px;
    line-height: normal;
  }

  .enter__title-custom {
    color: #5898ff;
  }

  .enter__descr {
    text-align: center;
    margin-bottom: 35px;
  }

  .enter__email-title {
    margin-bottom: 15px;
  }

  .enter__email-input {
    display: block;
    margin-bottom: 15px;
    padding: 10.5px 15px 10.5px 15px;
    border-radius: 5px;
  }

  .enter__pass-input {
    padding: 10.5px 15px 10.5px 15px;
    border-radius: 5px;
  }

  .enter__pass-title {
    margin-bottom: 15px;
  }

  .enter__pass-wrapper {
    display: block;
    margin-bottom: 15px;
    position: relative;
  }

  .enter__btn-in {
    background-color: #5898ff;
    margin-bottom: 23px;
    width: 100%;
  }

  .enter__btns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 31px;
  }

  .enter__more {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .enter__more-agree {
    margin-bottom: 10px;
  }

  .error-message {
    font-size: 12px;
    color: red;
    margin-bottom: 12px;
    display: inline-block;
  }

  .enter__pass-input.error + .error-message {
    margin-bottom: 0;
  }
</style>
