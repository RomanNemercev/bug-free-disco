<template>
    <div>
        <h1>Добро пожаловать на домашнюю страницу</h1>
        <AppAlert />
    </div>
</template>

<script setup lang="ts">
import '~/assets/css/first.css';
import AppAlert from "~/components/AppAlert.vue";
</script>

<style scoped>
h1 {
    color: var(--color-primary);
}
</style>
