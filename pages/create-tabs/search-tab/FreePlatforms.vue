<script setup>
import MyTooltip from "~/components/custom/MyTooltip.vue";

// const cards = Array.from({ length: 10 }, (_, i) => ({
//     id: i + 1,
//     buttonText: "Опубликовать",
// }));

const cards = [
    {
        id: "free-1",
        buttonText: "Опубликовать",
    },
    {
        id: "free-2",
        buttonText: "Опубликовать",
    },
    {
        id: "free-3",
        buttonText: "Опубликовать",
    },
    {
        id: "free-4",
        buttonText: "Опубликовать",
    },
    {
        id: "free-5",
        buttonText: "Опубликовать",
    },
    {
        id: "free-6",
        buttonText: "Опубликовать",
    },
    {
        id: "free-7",
        buttonText: "Опубликовать",
    },
    {
        id: "free-8",
        buttonText: "Опубликовать",
    },
    {
        id: "free-9",
        buttonText: "Опубликовать",
    },
    {
        id: "free-10",
        buttonText: "Опубликовать",
    }
]

const items = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
}));
</script>

<template>
    <div>
        <!-- Кнопка "Назад" из слота -->
        <slot name="back" />

        <!-- Контент страницы -->
        <div>
            <div class="flex justify-between items-end mb-25px">
                <div>
                    <p class="text-xl font-semibold text-space mb-2.5">Доступные площадки для размещения</p>
                    <p class="text-sm font-normal text-slate-custom">Опубликуйте вакансию на&nbsp;бесплатных ресурсах
                        в&nbsp;один
                        клик</p>
                </div>
                <UiButton variant="action" size="action" class="h-fit">Опубликовать на всех доступных
                    площадках
                </UiButton>
            </div>
            <div class="mb-35px">
                <div class="grid grid-cols-4 gap-15px">
                    <div v-for="card in cards" :key="card.id"
                      class="flex flex-col items-center justify-between p-25px rounded-fifteen bg-white">
                        <!-- Тултип (посадочное место) -->
                        <div class="self-end">
                            <span>
                                <svg-icon name="question" width="20" height="20" />
                                <MyTooltip
                                  text="Все - отбражаются все кандидаты Новые - кандидаты за последние 7 дней Непросмотренные - кандидаты которых вы еще не просмотрелии" />
                            </span>
                        </div>

                        <!-- Заголовок -->
                        <div class="company-logo min-h-20"></div>

                        <!-- Кнопка (посадочное место для shadcn) -->
                        <UiButton variant="default" size="default" class="w-full">{{ card.buttonText }}</UiButton>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <p class="text-xl font-semibold text-space mb-2.5">Требуют вашего внимания</p>
                    <p class="text-sm font-normal text-slate-custom">Некоторым площадкам нужна дополнительная информация
                        которая может отсутствовать в&nbsp;вашей вакансии</p>
                </div>
                <div>
                    <div class="grid grid-cols-4 gap-15px">
                        <div v-for="item in items" :key="item.id"
                          class="flex flex-col items-center justify-between p-25px rounded-fifteen bg-white">
                            <!-- Тултип (посадочное место) -->
                            <div class="self-end">
                                <span>
                                    <svg-icon name="question" width="20" height="20" />
                                    <MyTooltip
                                      text="Все - отбражаются все кандидаты Новые - кандидаты за последние 7 дней Непросмотренные - кандидаты которых вы еще не просмотрелии" />
                                </span>
                            </div>
                            <!-- Заголовок -->
                            <div class="company-logo min-h-20"></div>
                            <div class="rounded-fifteen p-15px bg-athens-gray">
                                <p class="text-sm font-normal text-space">Для публикации на этой доске необходимо
                                    заполнить поле: <span class="text-dodger">Город</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.grid {
    display: grid;
    gap: 1rem;
}

.company-logo {
    max-width: 173px;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('@/assets/img/freeplatfotms-company-logo.png');
}
</style>