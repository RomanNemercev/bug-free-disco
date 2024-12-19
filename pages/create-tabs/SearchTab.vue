<script setup>
import CopyBoard from "~/components/custom/CopyBoard.vue";
</script>

<template>
    <div class="container pb-72">
        <div>
            <p class="text-space text-xl font-semibold">Основная информация</p>
            <p class="text-xs text-bali">Все что нужно, чтобы начать быстро и эффективно</p>
            <div class="flex gap-x-15px">
                <div class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
                    <div class="bg-img star mb-25px"></div>
                    <p class="text-base font-medium text-space text-center mb-2.5">Премиальные доски объявлений</p>
                    <p class="text-13px text-slate-custom font-normal text-center mb-auto">Используйте работные сайты
                        и&nbsp;доски
                        объявлений с&nbsp;премиум публикацией,
                        что&nbsp;бы
                        повысить узнаваемость вашей вакансии</p>
                    <UiButton variant="semiaction" size="semiaction" class="w-full">Выбрать площадки</UiButton>
                </div>
                <div class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
                    <div class="bg-img planet mb-25px"></div>
                    <p class="text-base font-medium text-space text-center mb-2.5">Бесплатные доски&nbsp;объявлений</p>
                    <p class="text-13px text-slate-custom font-normal text-center mb-auto">Более 100+ бесплатных
                        площадок для размещения в один клик</p>
                    <UiButton variant="semiaction" size="semiaction" class="w-full">Выбрать площадки</UiButton>
                </div>
                <div class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
                    <div class="bg-img message mb-25px"></div>
                    <p class="text-base font-medium text-space text-center mb-2.5">Поделиться
                        в социальных сетях</p>
                    <p class="text-13px text-slate-custom font-normal text-center mb-auto">Расскажите о&nbsp;вашей
                        вакансии в&nbsp;социальных сетях у&nbsp;себя на&nbsp;странице или поделитесь с&nbsp;контактами
                    </p>
                    <div class="flex gap-x-2.5">
                        <a href="#"><svg-icon name="vk" class="w-10 h-10" /></a>
                        <a href="#"><svg-icon name="tg" class="w-10 h-10" /></a>
                        <a href="#"><svg-icon name="ok" class="w-10 h-10" /></a>
                    </div>
                </div>
            </div>
            <div>
                <p class="text-space text-xl font-semibold">Основная информация</p>
                <p class="text-xs text-bali">Все что нужно, чтобы начать быстро и эффективно</p>
                <div class="flex gap-x-15px">
                    <div
                      class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
                        <div class="bg-img form mb-25px"></div>
                        <p class="text-base font-medium text-space text-center mb-2.5">Настройте форму отклика</p>
                        <p class="text-13px text-slate-custom font-normal text-center mb-auto">Кнопка импорта поможет
                            легко скопировать и&nbsp;импортировать контакт со&nbsp;странице браузера, на&nbsp;которой
                            вы&nbsp;находитесь</p>
                        <UiButton variant="semiaction" size="semiaction" class="w-full">Настроить</UiButton>
                    </div>
                    <div
                      class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
                        <div class="bg-img import mb-25px"></div>
                        <p class="text-base font-medium text-space text-center mb-2.5">Установите кнопку&nbsp;импорта
                        </p>
                        <p class="text-13px text-slate-custom font-normal text-center mb-auto">Кнопка импорта поможет
                            легко скопировать и&nbsp;импортировать контакт со&nbsp;странице браузера, на&nbsp;которой
                            вы&nbsp;находитесь</p>
                        <UiButton variant="semiaction" size="semiaction" class="w-full">Установить расширение</UiButton>
                    </div>
                    <div
                      class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
                        <div class="bg-img link mb-25px"></div>
                        <p class="text-base font-medium text-space text-center mb-2.5">Короткая ссылка на вакансию
                        </p>
                        <p class="text-13px text-slate-custom font-normal text-center mb-auto">Расскажите о вашей
                            вакансии в социальных сетях, у себя на странице или отправьте контакту</p>
                        <copy-board
                          url="https://example.com/very-long-url-that-will-overflow-the-container-boundaries" />
                    </div>
                    <div
                      class="max-w-275px w-full p-25px bg-white rounded-fifteen flex flex-col items-center min-h-330px">
                        <div class="bg-img inbox mb-25px"></div>
                        <p class="text-base font-medium text-space text-center mb-2.5">Почтовый ящик<br>для резюме
                        </p>
                        <p class="text-13px text-slate-custom font-normal text-center mb-auto">Отправляйте резюме
                            непосредственно на электронную почту, отправленные резюме будут автоматиски добавлены в
                            раздел кандидаты</p>
                        <copy-board
                          url="https://example.com/very-long-url-that-will-overflow-the-container-boundaries" />
                    </div>
                </div>
            </div>
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