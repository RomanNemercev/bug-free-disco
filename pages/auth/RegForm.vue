<template>
    <div class="body">
        <div class="reg-wrapper">
            <div class="reg form" id="reg">
                <div v-if="currentStep === 'first'" class="reg__first-step child-form" @changeStep="changeStep"
                  :class="{ 'active': currentStep === 'first' }">
                    <button class="reg__to-in btn-reset" id="back-to-reg" @click="$emit('changeForm', 'enter')">
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M17.8132 10.5C17.8132 10.7486 17.7145 10.9871 17.5387 11.1629C17.3628 11.3387 17.1244 11.4375 16.8757 11.4375H5.39136L9.41636 15.4617C9.59248 15.6378 9.69143 15.8767 9.69143 16.1258C9.69143 16.3748 9.59248 16.6137 9.41636 16.7898C9.24024 16.966 9.00137 17.0649 8.7523 17.0649C8.50323 17.0649 8.26436 16.966 8.08824 16.7898L2.46324 11.1648C2.37584 11.0777 2.30649 10.9742 2.25917 10.8603C2.21186 10.7463 2.1875 10.6242 2.1875 10.5008C2.1875 10.3774 2.21186 10.2552 2.25917 10.1413C2.30649 10.0273 2.37584 9.92381 2.46324 9.83671L8.08824 4.21171C8.17544 4.1245 8.27897 4.05533 8.39291 4.00813C8.50685 3.96094 8.62897 3.93665 8.7523 3.93665C8.87563 3.93665 8.99775 3.96094 9.11169 4.00813C9.22563 4.05533 9.32916 4.1245 9.41636 4.21171C9.50357 4.29891 9.57275 4.40244 9.61994 4.51638C9.66714 4.63032 9.69143 4.75244 9.69143 4.87577C9.69143 4.9991 9.66714 5.12122 9.61994 5.23516C9.57275 5.3491 9.50357 5.45263 9.41636 5.53983L5.39136 9.56249H16.8757C17.1244 9.56249 17.3628 9.66126 17.5387 9.83708C17.7145 10.0129 17.8132 10.2514 17.8132 10.5Z"
                              fill="#9098B4" />
                        </svg>
                    </button>
                    <p class="reg__title f25w700">
                        Регистрация <span class="reg__title-brand c-dodger">Jobly</span>
                    </p>
                    <div class="reg__data-wrapper">
                        <p class="reg__first-name f14w500">
                            <span class="reg__circle">*</span> Как вас зовут?
                        </p>
                        <label class="reg__data-label"><input type="text" class="reg__name e-input f14w400"
                              placeholder="Введите ваше ФИО" id="name" v-model="name" required /><span v-if="nameError"
                              id="name-error" class="error-message f12w400" style="color: red">{{ nameError
                                }}</span></label>
                        <div class="reg__inputs p-flex">
                            <div class="reg__email-wrapper">
                                <p class="reg__email-title f14w500">
                                    <span class="reg__circle">*</span> Email
                                </p>
                                <label class="reg__email-label"><input type="email"
                                      class="reg__email-input e-input f14w400" placeholder="Введите email" id="email"
                                      required v-model="email" /><span v-if="emailError" id="email-error"
                                      class="error-message f12w400" style="color: red">{{
                                        emailError
                                        }}</span></label>
                            </div>
                            <div class="reg__phone-wrapper">
                                <p class="reg__phone-title f14w500">
                                    <span class="reg__circle">*</span> Номер телефона
                                </p>
                                <label class="reg__phone-label"><input type="tel"
                                      class="reg__phone-input e-input f14w400" placeholder="+7" id="phone" required
                                      v-model="phone" @focus="onFocusPhone" @blur="onBlurPhone"
                                      @input="onInputPhone" /><span v-if="phoneError" id="phone-error"
                                      class="error-message f12w400" style="color: red">{{
                                        phoneError
                                        }}</span></label>
                            </div>
                        </div>
                        <p class="reg__web-title f14w500">
                            Сайт компании<span class="reg__web-descr f13w300 c-bali">
                                (не обязательно)</span>
                        </p>
                        <label class="reg__web-label"><input type="text" class="reg__web-input e-input f14w400"
                              placeholder="https://" /></label>
                    </div>
                    <button class="btn-reset f14w400 c-dodger reg__btn-next" id="first-continue" @click="nextStep">
                        Продолжить
                    </button>
                </div>


                <div v-if="currentStep === 'second'" class="reg__second-step child-form" @changeStep="changeStep"
                  :class="{ 'active': currentStep === 'second' }">
                    <button class="reg__to-first btn-reset" id="reg-to-first-step" @click="goToFirst">
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M17.8132 10.5C17.8132 10.7486 17.7145 10.9871 17.5387 11.1629C17.3628 11.3387 17.1244 11.4375 16.8757 11.4375H5.39136L9.41636 15.4617C9.59248 15.6378 9.69143 15.8767 9.69143 16.1258C9.69143 16.3748 9.59248 16.6137 9.41636 16.7898C9.24024 16.966 9.00137 17.0649 8.7523 17.0649C8.50323 17.0649 8.26436 16.966 8.08824 16.7898L2.46324 11.1648C2.37584 11.0777 2.30649 10.9742 2.25917 10.8603C2.21186 10.7463 2.1875 10.6242 2.1875 10.5008C2.1875 10.3774 2.21186 10.2552 2.25917 10.1413C2.30649 10.0273 2.37584 9.92381 2.46324 9.83671L8.08824 4.21171C8.17544 4.1245 8.27897 4.05533 8.39291 4.00813C8.50685 3.96094 8.62897 3.93665 8.7523 3.93665C8.87563 3.93665 8.99775 3.96094 9.11169 4.00813C9.22563 4.05533 9.32916 4.1245 9.41636 4.21171C9.50357 4.29891 9.57275 4.40244 9.61994 4.51638C9.66714 4.63032 9.69143 4.75244 9.69143 4.87577C9.69143 4.9991 9.66714 5.12122 9.61994 5.23516C9.57275 5.3491 9.50357 5.45263 9.41636 5.53983L5.39136 9.56249H16.8757C17.1244 9.56249 17.3628 9.66126 17.5387 9.83708C17.7145 10.0129 17.8132 10.2514 17.8132 10.5Z"
                              fill="#9098B4" />
                        </svg>
                    </button>
                    <p class="reg__title f25w700">
                        Регистрация <span class="reg__title-brand c-dodger">Jobly</span>
                    </p>
                    <div class="reg__check-pass p-flex">
                        <div class="reg__check-first">
                            <p class="reg__pass-title f14w500">
                                <span class="reg__circle">*</span> Пароль
                            </p>
                            <label class="reg__pass-label"><input type="password"
                                  class="reg__check-input e-input f14w400" placeholder="******" id="pass"
                                  v-model="password" />
                                <button type="button" class="pass-eye" @click="togglePassword('pass')"
                                  data-id="pass"></button>
                                <span v-if="passwordError" id="pass-error" class="error-message f12w400"
                                  style="color: red">{{
                                    passwordError
                                    }}</span></label>
                        </div>
                        <div class="reg__check-second">
                            <p class="reg__pass-title f14w500">
                                <span class="reg__circle">*</span> Повторите пароль
                            </p>
                            <label class="reg__pass-label"><input type="password"
                                  class="reg__check-input e-input f14w400" placeholder="******" id="repeat-pass"
                                  v-model="repeatPassword" />
                                <button type="button" class="pass-eye" @click="togglePassword('repeat-pass')"
                                  data-id="repeat-pass"></button>
                                <span v-if="repeatPasswordError" id="repeat-pass-error" class="error-message f12w400"
                                  style="color: red">{{ repeatPasswordError }}</span></label>
                        </div>
                    </div>
                    <p class="reg__pass-descr f12w400 c-bali">
                        Пароль должен состоять минимум из 8 символов, содержать минимум одну
                        строчную, одну прописную букву и одну цифру
                    </p>
                    <p class="reg__check-promo f14w500">
                        Промокод<span class="reg__check-option f13w400 c-bali">
                            (не обязательно)</span>
                    </p>
                    <label class="reg__promo-label"><input type="text" class="reg__promo-input e-input f14w400"
                          placeholder="-" /></label>
                    <button class="btn-reset reg__btn-finish f14w600 c-white" id="reg-btn-prefinal" @click="nextStep1">
                        Зарегистрироваться
                    </button>
                    <p class="reg__agree f12w400 c-bali">
                        При регистрации вы подтверждаете согласие с<a href="#" class="reg__agree-link c-dodger">
                            пользовательским соглашением</a>
                        и
                        <a href="#" class="reg__agree-link c-dodger">политикой о данных пользователей</a>
                    </p>
                </div>


                <div v-if="currentStep === 'third'" class="reg__third-step child-form" @changeStep="changeStep"
                  :class="{ 'active': currentStep === 'third' }">
                    <button class="reg__to-second btn-reset" id="reg-to-second-btn">
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M17.8132 10.5C17.8132 10.7486 17.7145 10.9871 17.5387 11.1629C17.3628 11.3387 17.1244 11.4375 16.8757 11.4375H5.39136L9.41636 15.4617C9.59248 15.6378 9.69143 15.8767 9.69143 16.1258C9.69143 16.3748 9.59248 16.6137 9.41636 16.7898C9.24024 16.966 9.00137 17.0649 8.7523 17.0649C8.50323 17.0649 8.26436 16.966 8.08824 16.7898L2.46324 11.1648C2.37584 11.0777 2.30649 10.9742 2.25917 10.8603C2.21186 10.7463 2.1875 10.6242 2.1875 10.5008C2.1875 10.3774 2.21186 10.2552 2.25917 10.1413C2.30649 10.0273 2.37584 9.92381 2.46324 9.83671L8.08824 4.21171C8.17544 4.1245 8.27897 4.05533 8.39291 4.00813C8.50685 3.96094 8.62897 3.93665 8.7523 3.93665C8.87563 3.93665 8.99775 3.96094 9.11169 4.00813C9.22563 4.05533 9.32916 4.1245 9.41636 4.21171C9.50357 4.29891 9.57275 4.40244 9.61994 4.51638C9.66714 4.63032 9.69143 4.75244 9.69143 4.87577C9.69143 4.9991 9.66714 5.12122 9.61994 5.23516C9.57275 5.3491 9.50357 5.45263 9.41636 5.53983L5.39136 9.56249H16.8757C17.1244 9.56249 17.3628 9.66126 17.5387 9.83708C17.7145 10.0129 17.8132 10.2514 17.8132 10.5Z"
                              fill="#9098B4" />
                        </svg>
                    </button>
                    <p class="reg__third-title f25w700">Спасибо за регистрацию!</p>
                    <div class="reg__third-quiz">
                        <p class="reg__quiz-title f14w500">Как вы узнали о нас?</p>
                        <div class="reg__quiz-wrapper">
                            <label class="reg__quiz-label">
                                <input type="radio" class="reg__quiz-radio checkbox-hide" name="source" />
                                <span class="reg__quiz-value f14w400 radio-visible">Социальные сети</span>
                            </label>
                            <label class="reg__quiz-label">
                                <input type="radio" class="reg__quiz-radio checkbox-hide" name="source" />
                                <span class="reg__quiz-value f14w400 radio-visible">Поисковые системы (Яндекс,
                                    Google)</span>
                            </label>
                            <label class="reg__quiz-label">
                                <input type="radio" class="reg__quiz-radio checkbox-hide" name="source" />
                                <span class="reg__quiz-value f14w400 radio-visible">Рекомендация</span>
                            </label>
                            <label class="reg__quiz-label">
                                <input type="radio" class="reg__quiz-radio checkbox-hide" name="source" />
                                <span class="reg__quiz-value f14w400 radio-visible">Рекламная кампания (звонок,
                                    смс)</span>
                            </label>
                        </div>
                        <div class="reg__third-btns">
                            <button class="btn-reset btn reg__btn-send f14w600 c-white">
                                Принять ответ
                            </button>
                            <button class="btn-reset reg__btn-skip f14w400 c-dodger">
                                Пропустить
                            </button>
                        </div>
                    </div>
                </div>

                <div class="reg__progress-bar">
                    <div class="reg__progress-count" id="reg-progress-bar" :class="[
                        { 'reg__progress-count--second': currentStep === 'second' },
                        { 'reg__progress-count--third': currentStep === 'third' },
                    ]"></div>
                </div>
            </div>
            <div class="video-block">
                <video-player src="/assets/demo1.mp4" poster="/assets/cover2.png" controls :loop="false" :volume="0.6"
                  :width="442.5" style="height: 100%;" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

const currentStep = ref('first');
const name = ref('');
const email = ref('');
const phone = ref('');
const emailError = ref(null);
const nameError = ref(null);
const phoneError = ref('');
const password = ref('');
const repeatPassword = ref('');
const passwordError = ref(null);
const repeatPasswordError = ref(null);

const changeStep = (step) => {
    currentStep.value = step;
}

// Переход к следующему шагу
function nextStep() {
    // Запускаем валидацию
    const isValid = checkFirstStep();

    // Если все поля валидны, переходим к следующему шагу
    if (isValid) {
        currentStep.value = 'second';
    }
}

const togglePassword = (id) => {
    const passwordInput = document.getElementById(id);
    const eyeButton = document.querySelector(`.pass-eye[data-id="${id}"]`);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeButton.classList.add('show');
    } else {
        passwordInput.type = 'password';
        eyeButton.classList.remove('show');
    }
};

const checkPasswords = () => {
    // Сбрасываем ошибки
    passwordError.value = null;
    repeatPasswordError.value = null;

    let isValid = true;

    // Проверка на пустое поле пароля
    if (!password.value) {
        passwordError.value = 'Поле обязательно для заполнения';
        isValid = false;
    } else {
        // Проверка на длину и сложность пароля
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordPattern.test(password.value)) {
            passwordError.value =
                'Пароль не соответствует условиям';
            isValid = false;
        }
    }

    // Проверка на пустое поле повторного ввода пароля
    if (!repeatPassword.value) {
        repeatPasswordError.value = 'Повторите пароль';
        isValid = false;
    }

    // Проверка на совпадение паролей
    if (password.value && repeatPassword.value && password.value !== repeatPassword.value) {
        repeatPasswordError.value = 'Пароли не совпадают';
        isValid = false;
    }

    return isValid;
};

const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Проверка всех полей формы на первом шаге
const checkFirstStep = () => {
    // Очистка ошибок
    emailError.value = null;
    nameError.value = null;
    phoneError.value = null;

    let isValid = true;

    // Валидация имени
    if (!name.value) {
        nameError.value = 'Поле обязательно для заполнения';
        isValid = false;
    }

    // Валидация email
    if (!validateEmail(email.value)) {
        emailError.value = 'Введите корректный email';
        isValid = false;
    }

    // Валидация телефона
    const phoneDigits = phone.value.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
        phoneError.value = 'Введите корректный номер';
        isValid = false;
    }

    return isValid;
}

// check phone data
const onFocusPhone = () => {
    if (!phone.value) {
        phone.value = '+7 (';
    }

    // set placeholder
    phoneError.value = ''; // reset error on focus
};

const onBlurPhone = () => {
    if (phone.value === '+7 (') {
        phone.value = '';
    }

    // Проверка на количество цифр
    const digits = phone.value.replace(/\D/g, '');
    if (digits.length !== 11) {
        phoneError.value = 'Введите корректный номер';
    } else {
        phoneError.value = '';
    }
};

// listener input events
const onInputPhone = (event) => {
    let input = event.target.value.replace(/\D/g, ''); // remove non-digit characters
    let formattedInput = '+7 ('; // let's on code country

    if (input.length > 1) {
        formattedInput += input.substring(1, 4); // format city index
    }
    if (input.length >= 5) {
        formattedInput += ') ' + input.substring(4, 7); // format first part of number
    }
    if (input.length >= 8) {
        formattedInput += '-' + input.substring(7, 9); // format second part of number
    }
    if (input.length >= 10) {
        formattedInput += '-' + input.substring(9, 11); // format third part of number
    }

    // update value of phone
    phone.value = formattedInput;

    if (input.length === 11) {
        phoneError.value = '';
    }
};

function goToFirst() {
    currentStep.value = 'first';
}

const nextStep1 = () => {
    // Проверка паролей
    const isValid = checkPasswords();

    // Выводим лог для диагностики
    console.log(isValid); // Это поможет понять, что возвращается из checkPasswords

    // Если все поля валидны, переходим к следующему шагу
    if (isValid) {
        currentStep.value = 'third'; // Переход на следующий шаг
    }
};
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
    border: 1px solid #EDEFF5;
    border-radius: 10px;
    background-color: #F4F6F8;
    padding: 8.5px 9px;
    display: flex;
    margin-bottom: 52px;
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
    margin-bottom: 37px;
}

.reg__first-name {
    margin-bottom: 17px;
}

.reg__circle {
    color: #f50a0a;
}

.reg__data-label {
    display: block;
    margin-bottom: 15px;
}

.reg__email-title {
    margin-bottom: 17px;
}

.reg__phone-title {
    margin-bottom: 17px;
}

.reg__inputs {
    gap: 15px;
    margin-bottom: 16px;
}

.reg__web-title {
    margin-bottom: 16px;
}

.reg__web-label {
    display: block;
    margin-bottom: 25px;
}

.reg__web-descr {
    padding-left: 3px;
}

.reg__btn-next {
    width: 100%;
    padding: 11.96px 10px;
    background-color: #eff5ff;
    border-radius: 10px;
    margin-bottom: 49px;
}

.reg__progress-bar {
    position: absolute;
    width: calc(100% - 100px);
    left: 50px;
    bottom: 50px;
    height: 10px;
    border-radius: 15px;
    background-color: #E8F1FF;
}

.reg__progress-count {
    position: absolute;
    left: 0;
    top: 0;
    height: 10px;
    border-radius: 15px;
    background-color: #5898ff;
    width: 133px;
    transition: width .3s ease-out;
}

.reg__progress-count--second {
    width: 266px;
}

.reg__progress-count--third {
    width: 385px;
}

.reg__name,
.reg__promo-input,
.reg__check-input,
.reg__email-input,
.reg__phone-input,
.reg__web-input,
.reset__email-input {
    padding: 10.96px 15px 10.96px 15px;
    border-radius: 5px;
}

.reg__pass-title {
    margin-bottom: 16px;
}

.reg__check-pass {
    gap: 15px;
    margin-bottom: 10px;
}

.reg__pass-descr {
    margin-bottom: 27px;
    line-height: 130%;
}

.reg__check-promo {
    margin-bottom: 16px;
}

.reg__promo-label {
    display: block;
    margin-bottom: 25px;
}

.reg__btn-finish {
    padding: 11.96px 10px;
    background-color: #5898ff;
    border-radius: 10px;
    margin-bottom: 16px;
    width: 100%;
}

.reg__agree {
    margin-bottom: 60px;
    line-height: 130%;
}

.reg__check-option {
    padding-left: 2px;
}

.reg__quiz-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 27px;
    line-height: 124%;
}

.reg__third-title {
    margin-bottom: 52px;
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
    grid-template-columns: 2.1405fr 1fr;
    margin-bottom: 25px;
}

.reg__btn-skip {
    padding: 11px 10px;
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
}

.reg__pass-label .pass-eye {
    top: -10px;
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
    /* min-height: 631px; */
    /* max-width: 442.5px; */
    /* width: 100%; */
}

.body {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.video-js .vjs-control-bar {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.vjs-poster {
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
    transform: translate(-50px, -50px);
    background-image: url('../../assets/img/play-icon.svg');
    transition: opacity .3s ease-in-out;
}

:deep(.video-js .vjs-big-play-button:hover) {
    opacity: .5
}
</style>