<script setup>
import MyTooltip from "~/components/custom/MyTooltip.vue";

// const cards = Array.from({ length: 10 }, (_, i) => ({
//     id: i + 1,
//     buttonText: "Опубликовать",
// }));

const cards = ref([
    {
        id: "free-1",
        buttonText: "Опубликовать",
        isLoading: false,
        isComplete: false
    },
    {
        id: "free-2",
        buttonText: "Опубликовать",
        isLoading: false,
        isComplete: false
    },
    {
        id: "free-3",
        buttonText: "Опубликовать",
        isLoading: false,
        isComplete: false
    },
    {
        id: "free-4",
        buttonText: "Опубликовать",
        isLoading: false,
        isComplete: false
    },
    {
        id: "free-5",
        buttonText: "Опубликовать",
        isLoading: false,
        isComplete: false
    },
    {
        id: "free-6",
        buttonText: "Опубликовать",
        isLoading: false,
        isComplete: false
    },
    {
        id: "free-7",
        buttonText: "Опубликовать",
        isLoading: false,
        isComplete: false
    },
    {
        id: "free-8",
        buttonText: "Опубликовать",
        isLoading: false,
        isComplete: false
    },
    {
        id: "free-9",
        buttonText: "Опубликовать",
        isLoading: false,
        isComplete: false
    },
    {
        id: "free-10",
        buttonText: "Опубликовать",
        isLoading: false,
        isComplete: false
    }
]);

const items = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
}));

const handleButtonClick = (card) => {
    if (!card.isLoading && !card.isComplete) {
        // Скрываем shadcn кнопку, показываем лоадер
        card.isLoading = true;

        // Имитация запроса
        setTimeout(() => {
            card.isLoading = false;
            card.isComplete = true; // Показываем "Готово!"
        }, 2000); // 2 секунды ожидания
    }
};
</script>

<template>
    <div>
        <!-- Кнопка "Назад" из слота -->
        <slot name="back" />

        <!-- Контент страницы -->
        <div>
            <div class="flex justify-between items-end mb-6">
                <div>
                    <p class="text-xl font-semibold text-space mb-2.5">Доступные площадки для размещения</p>
                    <p class="text-sm font-normal text-slate-custom">Опубликуйте вакансию на&nbsp;бесплатных ресурсах
                        в&nbsp;один
                        клик</p>
                </div>
                <UiButton variant="action" size="action" class="leading-normal py-2.5 px-5 text-sm font-semibold h-fit">
                    Опубликовать
                    на всех
                    доступных
                    площадках
                </UiButton>
            </div>
            <div class="mb-35px">
                <div class="grid grid-cols-4 gap-15px">
                    <div v-for="card in cards" :key="card.id"
                      class="flex flex-col items-center justify-between p-25px rounded-fifteen bg-white">
                        <!-- Тултип (посадочное место) -->
                        <div class="tooltip-icon self-end cursor-pointer mb-[22px]">
                            <span>
                                <svg-icon name="question" width="20" height="20" />
                                <MyTooltip
                                  text="Все - отбражаются все кандидаты Новые - кандидаты за последние 7 дней Непросмотренные - кандидаты которых вы еще не просмотрелии" />
                            </span>
                        </div>

                        <!-- Заголовок -->
                        <div class="company-logo min-h-20 mb-25px"></div>

                        <!-- Состояния кнопок -->
                        <div class="w-full">
                            <UiButton v-if="!card.isLoading && !card.isComplete" variant="black" size="black"
                              class="w-full" @click="handleButtonClick(card)">
                                {{ card.buttonText }}
                            </UiButton>

                            <!-- Кастомная кнопка с лоадером -->
                            <button v-else-if="card.isLoading"
                              class="w-full py-2.5 px-4 bg-zumthor font-semibold text-sm text-dodger rounded-ten flex justify-center items-center"
                              disabled>
                                Идет публикация<span class="loader ml-2"></span>
                            </button>

                            <!-- Готово -->
                            <div v-else
                              class="w-full py-2.5 px-4 bg-feta font-normal text-sm text-green rounded-ten text-center">
                                Готово!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <p class="text-xl font-semibold text-space mb-2.5">Требуют вашего внимания</p>
                    <p class="text-sm font-normal text-slate-custom mb-25px">Некоторым площадкам нужна дополнительная
                        информация
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
}

.tooltip-icon {
    transform: translate(1px, -1px);
}

.company-logo {
    max-width: 173px;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('@/assets/img/freeplatfotms-company-logo.png');
}

.loader {
    width: 20px;
    height: 20px;
    background-image: url('@/assets/img/free-loader.png');
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>