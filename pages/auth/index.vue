<template>
    <div class="body-page">
        <div class="container-reg">
            <EnterForm />
        </div>
    </div>
</template>

<script setup>
import EnterForm from "~/pages/auth/EnterForm.vue";

definePageMeta({
    layout: 'blank',
})
</script>

<style scoped>
/* fonts */
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
    border-radius: 5px;
    background-color: #F4F6F8;
    width: 100%;
    line-height: normal;
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


:deep(.btn) {
    border-radius: 10px;
    min-width: 80px;
    min-height: 40px;
    padding: 10px 20px;
}

/* end components */
.container-reg {
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
    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
    opacity: 0;
    visibility: hidden;
    z-index: -1;
}

.form.active {
    visibility: visible;
    opacity: 1;
    z-index: 0;
}
</style>