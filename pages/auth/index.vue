<template>
    <div class="body-page">
        <div class="auth-container">
            <EnterForm v-if="currentForm === 'enter'" @changeForm="changeForm" />
            <RegForm v-if="currentForm === 'reg'" @changeForm="changeForm" />
            <ResetForm v-if="currentForm === 'reset'" @changeForm="changeForm" />
        </div>
    </div>
</template>

<script setup>
import EnterForm from "~/pages/auth/EnterForm.vue";
import RegForm from "~/pages/auth/RegForm.vue";
import ResetForm from "~/pages/auth/ResetForm.vue";

import { ref } from "vue";

definePageMeta({
    layout: 'blank',
})

const currentForm = ref('enter'); // enter, reg, reset

// Функция переключения форм
const changeForm = (formName) => {
    currentForm.value = formName;
};
</script>

<style scoped>
/* fonts */
:deep(.f12w400) {
    font-size: 12px;
    font-weight: 400;
}

:deep(.f13w300) {
    font-size: 13px;
    font-weight: 300;
}

:deep(.f13w400) {
    font-size: 13px;
    font-weight: 400;
}

:deep(.f14w400) {
    font-size: 14px;
    font-weight: 400;
}

:deep(.f14w500) {
    font-size: 14px;
    font-weight: 500;
}

:deep(.f14w600) {
    font-size: 14px;
    font-weight: 600;
}

:deep(.f25w700) {
    font-size: 25px;
    font-weight: 700;
}

/* end fonts */

/* colors */
:deep(.c-bali) {
    color: #9098B4;
}

:deep(.c-white) {
    color: #ffffff;
}

:deep(.c-dodger) {
    color: #5898ff;
}

/* end colors */

/* components */
:deep(.e-input) {
    border: 1px solid #EDEFF5;
    border-radius: 10px;
    background-color: #F4F6F8;
    width: 100%;
    line-height: normal;
}

:deep(.error) {
    border: 1px solid #f50a0a;
    margin-bottom: 4px;
}

:deep(.e-input:focus) {
    outline: 1px solid #5898ff;
}

:deep(.e-input.error:focus) {
    outline: none
}

:deep(.pass-eye) {
    position: absolute;
    width: 40px;
    height: 40px;
    display: block;
    background-image: url('/assets/img/eyeHide.svg');
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: center;
    bottom: 0;
    right: 5px;
    top: 0;
    cursor: pointer;
    border: none;
    /*opacity: 0.4;*/
    transition: opacity .3s ease-out, background-image .3s ease-out;
}


:deep(.pass-eye.show) {
    background-image: url('/assets/img/eyeShow.svg');
}

:deep(.btn) {
    border-radius: 10px;
    min-width: 80px;
    min-height: 40px;
    padding: 9.5px 20px;
}


:deep(.p-flex) {
    display: flex;
}

/* end components */
.auth-reg {
    position: relative;
    max-width: 530px;
    width: 100%;
    padding: 0 15px;
    margin: 0 auto;
    height: 100vh;
}

.form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
}

.form.active {
    visibility: visible;
    opacity: 1;
    z-index: 0;
}
</style>