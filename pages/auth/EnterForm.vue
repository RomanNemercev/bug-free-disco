<template>
    <div class="enter active form">
        <p class="enter__title f25w700">
            Вход <span class="enter__title-custom">JOBLY</span>
        </p>
        <p class="enter__descr f14w500 c-bali">Используйте данные для входа</p>
        <div class="enter__data">
            <p class="enter__email-title f14w500">Email</p>
            <label class="enter__email-wrapper">
                <input type="email" class="enter__email-input e-input f14w400" placeholder="Введите email"
                  v-model="email" />
            </label>
            <p class="enter__pass-title f14w500">Пароль</p>
            <label class="enter__pass-wrapper">
                <input type="password" class="enter__pass-input e-input f14w400" placeholder="******"
                  :type="showPassword ? 'text' : 'password'" v-model="password" required />
                <button type="button" class="pass-eye" @click="togglePassword"></button>
            </label>
        </div>
        <button class="btn-reset btn enter__btn-in f14w600 c-white" @click="login">Войти</button>
        <div class="enter__btns">
            <button class="btn-reset enter__btn-reg c-dodger f14w500" @click="$emit('changeForm', 'reg')">
                Регистрация
            </button>
            <button class="btn-reset enter__btn-forgot c-bali f14w500" @click="$emit('changeForm', 'reset')">
                Забыли пароль?
            </button>
        </div>
        <div class="enter__more">
            <a href="#" class="enter__more-agree c-dodger f14w500">Пользовательское соглашение</a>
            <a href="#" class="enter__more-supp c-dodger f14w500">Поддержка</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "EnterForm",
    data() {
        return {
            email: "",
            password: "",
            showPassword: false,
        };
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        login() {
            // Логика входа
            console.log("Email:", this.email, "Password:", this.password);
        },
    },
};
</script>

<style scoped>
/* Добавим стили здесь */
.enter {
    background-color: #ffffff;
    padding: 50px;
    border-radius: 15px;
    max-width: 500px;
    width: 100%;
}

.enter__title {
    text-align: center;
    margin-bottom: 12px;
}

.enter__title-custom {
    color: #5898ff;
}

.enter__descr {
    text-align: center;
    margin-bottom: 52px;
}

.enter__email-title {
    margin-bottom: 15px;
}

.enter__email-input {
    display: block;
    margin-bottom: 17px;
    padding: 10.96px 15px 10.96px 15px;
    border-radius: 5px;
}

.enter__pass-input {
    padding: 10.96px 15px 10.96px 15px;
    border-radius: 5px;
}

.enter__pass-title {
    margin-bottom: 15px;
}

.enter__pass-wrapper {
    display: block;
    margin-bottom: 26px;
    position: relative;
}

.enter__btn-in {
    background-color: #5898ff;
    margin-bottom: 26px;
    width: 100%;
}

.enter__btns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 51px;
}

.enter__more {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.enter__more-agree {
    margin-bottom: 16px;
}
</style>