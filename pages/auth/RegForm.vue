<template>
  <div class="body">
    <div class="reg-wrapper">
      <div class="reg form" id="reg" v-if="currentStep !== 'fourth'">
        <div
          v-if="currentStep === 'first'"
          class="reg__first-step child-form"
          @changeStep="changeStep"
          :class="{ active: currentStep === 'first' }"
        >
          <button
            class="reg__to-in btn-reset"
            id="back-to-reg"
            @click="$emit('changeForm', 'enter')"
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.8132 10.5C17.8132 10.7486 17.7145 10.9871 17.5387 11.1629C17.3628 11.3387 17.1244 11.4375 16.8757 11.4375H5.39136L9.41636 15.4617C9.59248 15.6378 9.69143 15.8767 9.69143 16.1258C9.69143 16.3748 9.59248 16.6137 9.41636 16.7898C9.24024 16.966 9.00137 17.0649 8.7523 17.0649C8.50323 17.0649 8.26436 16.966 8.08824 16.7898L2.46324 11.1648C2.37584 11.0777 2.30649 10.9742 2.25917 10.8603C2.21186 10.7463 2.1875 10.6242 2.1875 10.5008C2.1875 10.3774 2.21186 10.2552 2.25917 10.1413C2.30649 10.0273 2.37584 9.92381 2.46324 9.83671L8.08824 4.21171C8.17544 4.1245 8.27897 4.05533 8.39291 4.00813C8.50685 3.96094 8.62897 3.93665 8.7523 3.93665C8.87563 3.93665 8.99775 3.96094 9.11169 4.00813C9.22563 4.05533 9.32916 4.1245 9.41636 4.21171C9.50357 4.29891 9.57275 4.40244 9.61994 4.51638C9.66714 4.63032 9.69143 4.75244 9.69143 4.87577C9.69143 4.9991 9.66714 5.12122 9.61994 5.23516C9.57275 5.3491 9.50357 5.45263 9.41636 5.53983L5.39136 9.56249H16.8757C17.1244 9.56249 17.3628 9.66126 17.5387 9.83708C17.7145 10.0129 17.8132 10.2514 17.8132 10.5Z"
                fill="#9098B4"
              />
            </svg>
          </button>
          <p class="reg__title f25w700">
            Регистрация в
            <span class="reg__title-brand c-dodger">Jobly</span>
          </p>
          <div class="reg__data-wrapper">
            <p class="reg__first-name f14w500">
              <span class="reg__circle">*</span>
              Как вас зовут?
            </p>
            <label class="reg__data-label">
              <input
                type="text"
                class="reg__name e-input f14w400"
                placeholder="Введите ваше ФИО"
                id="name"
                v-model="name"
                required
                :class="{ error: nameError }"
              />
              <span
                v-if="nameError"
                id="name-error"
                class="error-message f12w400"
                style="color: red"
              >
                {{ nameError }}
              </span>
            </label>
            <div class="reg__inputs p-flex">
              <div class="reg__email-wrapper">
                <p class="reg__email-title f14w500">
                  <span class="reg__circle">*</span>
                  Email
                </p>
                <label class="reg__email-label">
                  <input
                    type="email"
                    class="reg__email-input e-input f14w400"
                    placeholder="Введите email"
                    id="email"
                    required
                    v-model="email"
                    :class="{ error: emailError }"
                  />
                  <span
                    v-if="emailError"
                    id="email-error"
                    class="error-message f12w400"
                    style="color: red"
                  >
                    {{ emailError }}
                  </span>
                </label>
              </div>
              <div class="reg__phone-wrapper">
                <p class="reg__phone-title f14w500">
                  <span class="reg__circle">*</span>
                  Номер телефона
                </p>
                <label class="reg__phone-label">
                  <input
                    type="tel"
                    class="reg__phone-input e-input f14w400"
                    placeholder="+7"
                    id="phone"
                    required
                    v-model="phone"
                    @focus="onFocusPhone"
                    @blur="onBlurPhone"
                    @input="onInputPhone"
                    :class="{ error: phoneError }"
                  />
                  <span
                    v-if="phoneError"
                    id="phone-error"
                    class="error-message f12w400"
                    style="color: red"
                  >
                    {{ phoneError }}
                  </span>
                </label>
              </div>
            </div>
            <p class="reg__web-title f14w500">
              Сайт компании
              <span class="reg__web-descr f13w300 c-bali">
                (не обязательно)
              </span>
            </p>
            <label class="reg__web-label">
              <input
                v-model="web"
                type="text"
                class="reg__web-input e-input f14w400"
                placeholder="https://"
              />
            </label>
          </div>
          <button
            class="btn-reset f14w400 c-dodger reg__btn-next"
            id="first-continue"
            @click="nextStep"
          >
            Продолжить
          </button>
        </div>

        <div
          v-if="currentStep === 'second'"
          class="reg__second-step child-form"
          @changeStep="changeStep"
          :class="{ active: currentStep === 'second' }"
        >
          <button
            class="reg__to-first btn-reset"
            id="reg-to-first-step"
            @click="goToFirst"
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.8132 10.5C17.8132 10.7486 17.7145 10.9871 17.5387 11.1629C17.3628 11.3387 17.1244 11.4375 16.8757 11.4375H5.39136L9.41636 15.4617C9.59248 15.6378 9.69143 15.8767 9.69143 16.1258C9.69143 16.3748 9.59248 16.6137 9.41636 16.7898C9.24024 16.966 9.00137 17.0649 8.7523 17.0649C8.50323 17.0649 8.26436 16.966 8.08824 16.7898L2.46324 11.1648C2.37584 11.0777 2.30649 10.9742 2.25917 10.8603C2.21186 10.7463 2.1875 10.6242 2.1875 10.5008C2.1875 10.3774 2.21186 10.2552 2.25917 10.1413C2.30649 10.0273 2.37584 9.92381 2.46324 9.83671L8.08824 4.21171C8.17544 4.1245 8.27897 4.05533 8.39291 4.00813C8.50685 3.96094 8.62897 3.93665 8.7523 3.93665C8.87563 3.93665 8.99775 3.96094 9.11169 4.00813C9.22563 4.05533 9.32916 4.1245 9.41636 4.21171C9.50357 4.29891 9.57275 4.40244 9.61994 4.51638C9.66714 4.63032 9.69143 4.75244 9.69143 4.87577C9.69143 4.9991 9.66714 5.12122 9.61994 5.23516C9.57275 5.3491 9.50357 5.45263 9.41636 5.53983L5.39136 9.56249H16.8757C17.1244 9.56249 17.3628 9.66126 17.5387 9.83708C17.7145 10.0129 17.8132 10.2514 17.8132 10.5Z"
                fill="#9098B4"
              />
            </svg>
          </button>
          <p class="reg__title f25w700">
            Регистрация в
            <span class="reg__title-brand c-dodger">Jobly</span>
          </p>
          <div class="reg__check-pass p-flex">
            <div class="reg__check-first">
              <p class="reg__pass-title f14w500">
                <span class="reg__circle">*</span>
                Пароль
              </p>
              <label class="reg__pass-label">
                <input
                  type="password"
                  class="reg__check-input e-input f14w400"
                  placeholder="******"
                  id="pass"
                  v-model="password"
                />
                <button
                  type="button"
                  class="pass-eye"
                  @click="togglePassword('pass')"
                  data-id="pass"
                ></button>
                <span
                  v-if="passwordError"
                  id="pass-error"
                  class="error-message f12w400"
                  style="color: red"
                >
                  {{ passwordError }}
                </span>
              </label>
            </div>
            <div class="reg__check-second">
              <p class="reg__pass-title f14w500">
                <span class="reg__circle">*</span>
                Повторите пароль
              </p>
              <label class="reg__pass-label">
                <input
                  type="password"
                  class="reg__check-input e-input f14w400"
                  placeholder="******"
                  id="repeat-pass"
                  v-model="repeatPassword"
                />
                <button
                  type="button"
                  class="pass-eye"
                  @click="togglePassword('repeat-pass')"
                  data-id="repeat-pass"
                ></button>
                <span
                  v-if="repeatPasswordError"
                  id="repeat-pass-error"
                  class="error-message f12w400"
                  style="color: red"
                >
                  {{ repeatPasswordError }}
                </span>
              </label>
            </div>
          </div>
          <p class="reg__pass-descr f12w400 c-bali">
            Пароль должен состоять минимум из 8 символов, содержать минимум одну
            строчную, одну прописную букву и одну цифру
          </p>
          <p class="reg__check-promo f14w500">
            Промокод
            <span class="reg__check-option f13w400 c-bali">
              (не обязательно)
            </span>
          </p>
          <label class="reg__promo-label">
            <input
              type="text"
              class="reg__promo-input e-input f14w400"
              placeholder="-"
            />
          </label>
          <button
            class="btn-reset reg__btn-finish f14w600 c-white"
            id="reg-btn-prefinal"
            @click="nextStep1"
          >
            Зарегистрироваться
          </button>
          <p class="reg__agree f12w400 c-bali">
            При регистрации вы подтверждаете согласие с
            <a href="#" class="reg__agree-link c-dodger">
              пользовательским соглашением
            </a>
            и
            <a href="#" class="reg__agree-link c-dodger">
              политикой о данных пользователей
            </a>
          </p>
        </div>

        <div
          v-if="currentStep === 'third'"
          class="reg__third-step child-form"
          @changeStep="changeStep"
          :class="{ active: currentStep === 'third' }"
        >
          <button
            class="reg__to-second btn-reset"
            id="reg-to-second-btn"
            @click="goToSecond"
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.8132 10.5C17.8132 10.7486 17.7145 10.9871 17.5387 11.1629C17.3628 11.3387 17.1244 11.4375 16.8757 11.4375H5.39136L9.41636 15.4617C9.59248 15.6378 9.69143 15.8767 9.69143 16.1258C9.69143 16.3748 9.59248 16.6137 9.41636 16.7898C9.24024 16.966 9.00137 17.0649 8.7523 17.0649C8.50323 17.0649 8.26436 16.966 8.08824 16.7898L2.46324 11.1648C2.37584 11.0777 2.30649 10.9742 2.25917 10.8603C2.21186 10.7463 2.1875 10.6242 2.1875 10.5008C2.1875 10.3774 2.21186 10.2552 2.25917 10.1413C2.30649 10.0273 2.37584 9.92381 2.46324 9.83671L8.08824 4.21171C8.17544 4.1245 8.27897 4.05533 8.39291 4.00813C8.50685 3.96094 8.62897 3.93665 8.7523 3.93665C8.87563 3.93665 8.99775 3.96094 9.11169 4.00813C9.22563 4.05533 9.32916 4.1245 9.41636 4.21171C9.50357 4.29891 9.57275 4.40244 9.61994 4.51638C9.66714 4.63032 9.69143 4.75244 9.69143 4.87577C9.69143 4.9991 9.66714 5.12122 9.61994 5.23516C9.57275 5.3491 9.50357 5.45263 9.41636 5.53983L5.39136 9.56249H16.8757C17.1244 9.56249 17.3628 9.66126 17.5387 9.83708C17.7145 10.0129 17.8132 10.2514 17.8132 10.5Z"
                fill="#9098B4"
              />
            </svg>
          </button>
          <p class="reg__third-title f25w700">Спасибо за регистрацию!</p>
          <div class="reg__third-quiz">
            <p class="reg__quiz-title f14w500">Как вы узнали о нас?</p>
            <div class="reg__quiz-wrapper">
              <label class="reg__quiz-label">
                <input
                  type="radio"
                  class="reg__quiz-radio checkbox-hide"
                  name="source"
                  value="Социальные сети"
                  v-model="from"
                />
                <span class="reg__quiz-value f14w400 radio-visible">
                  Социальные сети
                </span>
              </label>
              <label class="reg__quiz-label">
                <input
                  type="radio"
                  class="reg__quiz-radio checkbox-hide"
                  name="source"
                  value="Поисковые системы (Яндекс, Google)"
                  v-model="from"
                />
                <span class="reg__quiz-value f14w400 radio-visible">
                  Поисковые системы (Яндекс, Google)
                </span>
              </label>
              <label class="reg__quiz-label">
                <input
                  type="radio"
                  class="reg__quiz-radio checkbox-hide"
                  name="source"
                  value="Рекомендация"
                  v-model="from"
                />
                <span class="reg__quiz-value f14w400 radio-visible">
                  Рекомендация
                </span>
              </label>
              <label class="reg__quiz-label">
                <input
                  type="radio"
                  class="reg__quiz-radio checkbox-hide"
                  name="source"
                  value="Рекламная кампания (звонок, смс)"
                  v-model="from"
                />
                <span class="reg__quiz-value f14w400 radio-visible">
                  Рекламная кампания (звонок, смс)
                </span>
              </label>
            </div>
            <div class="reg__third-btns">
              <button
                class="btn-reset btn reg__btn-send f14w600 c-white"
                @click="finishReg(false)"
              >
                Принять ответ
              </button>
              <button
                class="btn-reset reg__btn-skip f14w400 c-dodger"
                @click="finishReg(true)"
              >
                Пропустить
              </button>
            </div>
          </div>
        </div>

        <div class="reg__progress-bar">
          <div
            class="reg__progress-count"
            id="reg-progress-bar"
            :class="[
              { 'reg__progress-count--second': currentStep === 'second' },
              { 'reg__progress-count--third': currentStep === 'third' },
            ]"
          ></div>
        </div>
      </div>
      <div class="video-block" v-if="currentStep !== 'fourth'">
        <video-player
          src="/assets/demo1.mp4"
          poster="/assets/cover2.png"
          controls
          :loop="false"
          :volume="0.6"
          :width="442.5"
          style="height: 100%"
        />
      </div>
      <div
        v-if="currentStep === 'fourth'"
        class="reg__fourth-step absolute bg-white rounded-fifteen p-50px text-center"
      >
        <p class="text-lg font-semibold text-gray-800 mb-4">
          Регистрация завершена успешно!
          <br />
          Используйте введенные данные для входа.
        </p>
        <p class="text-sm text-gray-600 mb-4">
          Пожалуйста, проверьте ваш электронный почтовый ящик для подтверждения
          регистрации.
        </p>
        <p class="text-sm text-gray-600 mb-6">
          Перенаправление на страницу авторизации через
          <span class="font-medium text-blue-600">{{ finishTime }} сек.</span>
        </p>
        <button
          @click="goToAuth"
          class="w-full bg-dodger text-white py-2 px-4 rounded-lg hover:bg-dodger/80 transition-colors duration-200"
        >
          Перейти сейчас
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onUnmounted } from 'vue'
  import { navigateTo } from '#app'
  import { VideoPlayer } from '@videojs-player/vue'
  import 'video.js/dist/video-js.css'
  import { registerUser } from '~/utils/registerUser'

  const currentStep = ref('first')
  const name = ref('')
  const email = ref('')
  const phone = ref('')
  const web = ref('')
  const emailError = ref(null)
  const nameError = ref(null)
  const phoneError = ref('')
  const password = ref('')
  const repeatPassword = ref('')
  const passwordError = ref(null)
  const repeatPasswordError = ref(null)
  const from = ref(null)
  const isSubmitting = ref(false)
  const finishTime = ref(10)
  let timer = null

  const changeStep = step => {
    currentStep.value = step
  }

  const props = defineProps({
    currentForm: String,
  })

  const emit = defineEmits(['changeForm'])

  // Переход к следующему шагу
  function nextStep() {
    // Запускаем валидацию
    const isValid = checkFirstStep()

    // Если все поля валидны, переходим к следующему шагу
    if (isValid) {
      currentStep.value = 'second'
    }
  }

  const togglePassword = id => {
    const passwordInput = document.getElementById(id)
    const eyeButton = document.querySelector(`.pass-eye[data-id="${id}"]`)

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
      eyeButton.classList.add('show')
    } else {
      passwordInput.type = 'password'
      eyeButton.classList.remove('show')
    }
  }

  const checkPasswords = () => {
    // Сбрасываем ошибки
    passwordError.value = null
    repeatPasswordError.value = null

    let isValid = true

    // Проверка на пустое поле пароля
    if (!password.value) {
      passwordError.value = 'Введите пароль'
      isValid = false
    } else {
      // Проверка на длину и сложность пароля
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (!passwordPattern.test(password.value)) {
        passwordError.value = 'Пароль не соответствует условиям'
        isValid = false
      }
    }

    // Проверка на пустое поле повторного ввода пароля
    if (!repeatPassword.value) {
      repeatPasswordError.value = 'Повторите пароль'
      isValid = false
    }

    // Проверка на совпадение паролей
    if (
      password.value &&
      repeatPassword.value &&
      password.value !== repeatPassword.value
    ) {
      repeatPasswordError.value = 'Пароли не совпадают'
      isValid = false
    }

    return isValid
  }

  const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  // Проверка всех полей формы на первом шаге
  const checkFirstStep = () => {
    // Очистка ошибок
    emailError.value = null
    nameError.value = null
    phoneError.value = null

    let isValid = true

    // Валидация имени
    if (!name.value) {
      nameError.value = 'Поле обязательно для заполнения'
      isValid = false
    }

    // Валидация email
    if (!validateEmail(email.value)) {
      emailError.value = 'Введите корректный email'
      isValid = false
    }

    // Валидация телефона
    const phoneDigits = phone.value.replace(/\D/g, '')
    if (phoneDigits.length !== 11) {
      phoneError.value = 'Введите корректный номер'
      isValid = false
    }

    return isValid
  }

  // check phone data
  const onFocusPhone = () => {
    if (!phone.value) {
      phone.value = '+7 ('
    }

    // set placeholder
    phoneError.value = '' // reset error on focus
  }

  const onBlurPhone = () => {
    if (phone.value === '+7 (') {
      phone.value = ''
    }

    // Проверка на количество цифр
    const digits = phone.value.replace(/\D/g, '')
    if (digits.length !== 11) {
      phoneError.value = 'Введите корректный номер'
    } else {
      phoneError.value = ''
    }
  }

  // listener input events
  const onInputPhone = event => {
    let input = event.target.value.replace(/\D/g, '') // remove non-digit characters
    let formattedInput = '+7 (' // let's on code country

    if (input.length > 1) {
      formattedInput += input.substring(1, 4) // format city index
    }
    if (input.length >= 5) {
      formattedInput += ') ' + input.substring(4, 7) // format first part of number
    }
    if (input.length >= 8) {
      formattedInput += '-' + input.substring(7, 9) // format second part of number
    }
    if (input.length >= 10) {
      formattedInput += '-' + input.substring(9, 11) // format third part of number
    }

    // update value of phone
    phone.value = formattedInput

    if (input.length === 11) {
      phoneError.value = ''
    }
  }

  function goToFirst() {
    currentStep.value = 'first'
  }

  function goToSecond() {
    currentStep.value = 'second'
  }

  const nextStep1 = () => {
    // Проверка паролей
    const isValid = checkPasswords()

    // Выводим лог для диагностики
    console.log(isValid) // Это поможет понять, что возвращается из checkPasswords

    // Если все поля валидны, переходим к следующему шагу
    if (isValid) {
      currentStep.value = 'third' // Переход на следующий шаг
    }
  }

  const phone_formatted = computed(() => {
    // Убираем все символы кроме цифр, затем формируем номер с префиксом "+7"
    const digits = phone.value.replace(/\D/g, '')
    // Если номер введен полностью (11 цифр, первая — 7 или 8), то формируем корректный вариант
    if (digits.length === 11) {
      // Если первая цифра "8", заменяем её на "7"
      const clean = digits[0] === '8' ? '7' + digits.substring(1) : digits
      return '+' + clean
    }
    // Иначе возвращаем пустую строку или неполное значение
    return ''
  })

  const startTimer = () => {
    timer = setInterval(() => {
      if (finishTime.value > 0) {
        finishTime.value -= 1
      } else {
        clearInterval(timer)
        goToAuth()
      }
    }, 1000)
  }

  const goToAuth = () => {
    if (timer) {
      clearInterval(timer)
    }
    emit('changeForm', 'enter')
    currentStep.value = 'first'
    email.value = ''
    name.value = ''
    phone_formatted.value = ''
    password.value = ''
    repeatPassword.value = ''
    web.value = ''
    from.value = null
  }

  watch(currentStep, newStep => {
    if (newStep === 'fourth') {
      finishTime.value = 10
      startTimer()
    }
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
  })

  const finishReg = async (skip = false) => {
    if (isSubmitting.value) {
      console.log('Запрос уже выполняется, пропускаем повторный вызов.')
      return
    }

    isSubmitting.value = true

    try {
      if (
        !email.value ||
        !name.value ||
        !phone_formatted.value ||
        !password.value ||
        !repeatPassword.value
      ) {
        throw new Error('Пожалуйста, заполните все поля.')
      }

      if (password.value !== repeatPassword.value) {
        throw new Error('Пароли не совпадают.')
      }

      const userData = {
        login: email.value,
        name: name.value,
        email: email.value,
        phone: phone_formatted.value,
        password: password.value,
        password_confirmation: repeatPassword.value,
        site: web.value || null,
        from: skip ? null : from.value,
      }

      console.log('Данные для регистрации:', userData)

      const result = await registerUser(userData)
      if (!result) {
        throw new Error('Произошла ошибка при регистрации.')
      }
      console.log('Регистрация прошла успешно: ', result)
      console.log('Данные отправлены на сервер: ', userData)
      currentStep.value = 'fourth'
    } catch (error) {
      console.error('Ошибка регистрации: ', error.message || error)
      alert('Ошибка при регистрации. Проверьте данные.')
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<style scoped>
  /* Анимация */
  /* .fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
} */

  /* custom */
  /*reg*/
  .reg {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 0 0 50px;
    max-width: 442.5px;
    width: 100%;
    position: relative;
    /* чтобы progress-bar позиционировался внутри этого блока */
  }

  .reg__to-in,
  .reg__to-first,
  .reg__to-second,
  .reset__to-reg,
  .reset__to-send {
    border: 1px solid #edeff5;
    border-radius: 10px;
    background-color: #f4f6f8;
    padding: 8.5px 9px;
    display: flex;
    margin-bottom: 26px;
  }

  .reg__to-in:focus-visible,
  .reg__to-first:focus-visible,
  .reg__to-second:focus-visible,
  .reset__to-reg:focus-visible,
  .reset__to-send:focus-visible {
    outline: none;
  }

  .reg__title {
    text-align: center;
    margin-bottom: 38px;
    line-height: normal;
  }

  .reg__first-name {
    line-height: normal;
    margin-bottom: 17px;
  }

  .reg__circle {
    color: #f50a0a;
  }

  .reg__data-label {
    display: block;
    margin-bottom: 12px;
  }

  .reg__email-title {
    margin-bottom: 15px;
  }

  .reg__phone-title {
    margin-bottom: 15px;
  }

  .reg__inputs {
    gap: 15px;
    margin-bottom: 16px;
    width: 100%;
  }

  .reg__web-title {
    margin-bottom: 13px;
  }

  .reg__web-label {
    display: block;
    margin-bottom: 16px;
  }

  .reg__web-descr {
    padding-left: 3px;
  }

  .reg__btn-next {
    width: 100%;
    padding: 9.5px 10px;
    background-color: #eff5ff;
    border-radius: 10px;
    margin-bottom: 35px;
  }

  .reg__progress-bar {
    position: absolute;
    width: calc(100% - 100px);
    left: 50px;
    bottom: 50px;
    height: 10px;
    border-radius: 15px;
    background-color: #e8f1ff;
  }

  .reg__progress-count {
    position: absolute;
    left: 0;
    top: 0;
    height: 10px;
    border-radius: 15px;
    background-color: #5898ff;
    width: 133px;
    transition: width 0.3s ease-out;
  }

  .reg__progress-count--second {
    width: 266px;
  }

  .reg__progress-count--third {
    width: 342.5px;
  }

  .reg__name,
  .reg__promo-input,
  .reg__check-input,
  .reg__email-input,
  .reg__phone-input,
  .reg__web-input,
  .reset__email-input {
    padding: 10.5px 15px 10.5px 15px;
    border-radius: 10px;
  }

  .reg__pass-title {
    margin-bottom: 17px;
    line-height: normal;
  }

  .reg__check-pass {
    gap: 15px;
    margin-bottom: 10px;
  }

  .reg__pass-descr {
    margin-bottom: 16px;
    line-height: 130%;
  }

  .reg__check-promo {
    margin-bottom: 14px;
  }

  .reg__promo-label {
    display: block;
    margin-bottom: 15px;
  }

  .reg__btn-finish {
    padding: 9.5px 10px;
    background-color: #5898ff;
    border-radius: 10px;
    margin-bottom: 16px;
    width: 100%;
  }

  .reg__agree {
    margin-bottom: 36px;
    line-height: 130%;
  }

  .reg__check-option {
    padding-left: 2px;
  }

  .reg__quiz-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 26px;
    line-height: 124%;
  }

  .reg__third-title {
    margin-bottom: 31px;
    text-align: center;
  }

  .reg__quiz-title {
    margin-bottom: 15px;
  }

  .reg__quiz-label:not(:last-of-type) {
    margin-bottom: 10px;
  }

  .reg__third-btns {
    display: grid;
    gap: 10px;
    grid-template-columns: 1.77fr 1fr;
    margin-bottom: 35px;
  }

  .reg__btn-skip {
    padding: 9.5px 10px;
    background-color: #e8f1ff;
    border-radius: 10px;
  }

  .reg__btn-send {
    background-color: #5898ff;
  }

  .reg__first-step,
  .reg__second-step {
    padding: 50px 50px 0 50px;
  }

  .child-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
  }

  .reg__first-step.child-form {
    transform: translate(-50%, 0%);
    top: 0;
  }

  .reg__second-step.child-form {
    transform: translate(-50%, 0);
    top: 0;
  }

  .reg__third-step.child-form {
    transform: translate(-50%, 0);
    top: 58px;
  }

  .reg__third-step.child-form.active {
    top: 0;
  }

  .child-form.active {
    opacity: 1;
    visibility: visible;
    position: relative;
    z-index: 1;
  }

  .reg__pass-label {
    position: relative;
    display: block;
  }

  .reg-wrapper {
    display: flex;
    gap: 15px;
    justify-content: space-between;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding-top: 10%;
  }

  .video-block {
    border-radius: 15px;
    flex: 1;
    overflow: hidden;
    /* min-height: 631px; */
    /* max-width: 442.5px; */
    /* width: 100%; */
  }

  .body {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  :deep(.video-js .vjs-control-bar) {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  :deep(.vjs-poster) {
    background-size: cover;
    border-radius: 15px;
  }

  :deep(.video-js .vjs-big-play-button) {
    height: 100px;
    width: 100px;
    border: none;
    background-color: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50px, -55px);
    background-image: url('../../assets/img/play-icon.svg');
    transition: opacity 0.3s ease-in-out;
  }

  :deep(.video-js .vjs-big-play-button:hover) {
    opacity: 0.5;
  }

  :deep(.video-js .vjs-big-play-button .vjs-icon-placeholder:before) {
    content: none;
  }

  :deep(.video-js) {
    border-radius: 15px;
  }

  .reg__email-wrapper,
  .reg__phone-wrapper,
  .reg__check-first,
  .reg__check-second {
    width: 100%;
  }

  .reg__third-step {
    padding: 50px 50px 0 50px;
  }

  .reg__to-second {
    margin-bottom: 22px;
  }

  .checkbox-hide {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    border: 0;
    clip: rect(0 0 0 0);
  }

  .radio-visible {
    padding-left: 25px;
    position: relative;
    user-select: none;
    cursor: pointer;
  }

  .radio-visible::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background-image: url('../../assets/img/RadioButton-nonechecked.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }

  .radio-visible::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background-image: url('../../assets/img/RadioButton.svg');
    background-repeat: no-repeat;
    background-size: contain;
    visibility: hidden;
    opacity: 0;
  }

  .radio-visible:hover:before {
    background-image: url('../../assets/img/RadioButton-hover.svg');
  }

  .checkbox-hide:checked + .radio-visible::after {
    opacity: 1;
    visibility: visible;
  }

  .reg__fourth-step {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
