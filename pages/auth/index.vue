<template>
    <div class="auth-container">
        <h1>Вход в систему</h1>
        <form>
            <input type="email" placeholder="Введите email" />
            <input type="password" placeholder="Введите пароль" />
            <button>Войти</button>
        </form>
        <router-link to="/">На главную</router-link>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'blank',
});
</script>


<style scoped>
.auth-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
}
</style>