<script setup>
import DotsDropdonw from '~/components/custom/DotsDropdown.vue';
import MultiDropdown from '~/components/custom/MultiDropdown.vue';

const optionsData = [
    {
        id: 1,
        title: "Стандарт (2)",
        description: "Стандартная вакансия, размещается на 30 дней."
    },
    {
        id: 2,
        title: "Бизнес",
        description: "Вакансия висит в топе в течении 7 дней, размещается на 7 дней."
    }
]

const ratesData = [
    {
        id: "rates-1",
        title: "Стандарт (1 490 ₽)",
        description: "Стандартная вакансия, размещается на 30 дней."
    },
    {
        id: "rates-2",
        title: "С автоподнятием (4 390 ₽)",
        description: "Вакансия поднимается каждые 3 дня, в течении 30 дней."
    },
    {
        id: "rates-3",
        title: "Бизнес (14 640 ₽)",
        description: "Вакансия висит в топе в течении 7 дней, размещается на 7 дней."
    },
    {
        id: "rates-4",
        title: "Бизнес",
        description: "Вакансия висит в топе в течении 7 дней, размещается на 7 дней."
    }
]

const dropItems = ['Импорт публикаций', 'Отвязать профиль'];
</script>

<template>
    <div>
        <!-- Кнопка "Назад" из слота -->
        <slot name="back" />

        <!-- Контент страницы -->
        <p class="text-xl font-semibold text-space mb-5px">Подключенные профили</p>
        <p class="text-sm font-normal text-slate-custom mb-25px">Авторизуйте ваши аккаунты на&nbsp;работных сайтах один
            раз
            и&nbsp;управляйте вакансиями удаленно</p>
        <!-- Первый блок -->
        <div class="flex gap-15px mb-35px max-w-[875px] flex-wrap">
            <!-- Первая карточка -->
            <div
              class="flex-1 basis-[200px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[404px]">
                <div class="flex justify-between mb-3.5">
                    <div class="flex items-center gap-2.5">
                        <svg-icon name="hh" width="41" height="40" />
                        <p class="text-sm font-medium text-slate-custom">hh.ru</p>
                    </div>
                    <DotsDropdonw :items="dropItems" />
                </div>
                <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                <p class="text-sm font-medium text-space mb-3.5">Аккаунт:</p>
                <div class="flex items-center gap-2.5 bg-feta py-11px px-15px rounded-ten mb-15px min-w-0">
                    <div>
                        <svg-icon name="green-circle" width="11" height="11" />
                    </div>
                    <p class="truncate text-sm font-medium text-space leading-normal">evseev15232392@gmai.com</p>
                </div>
                <p class="text-sm font-medium text-space mb-3.5">Баланс публикаций:</p>
                <div class="rounded-ten bg-athens-gray p-15px">
                    <p class="text-13px text-slate-custom font-normal leading-130">Нет доступных к&nbsp;размещению
                        публикаций.
                        Пополните баланс на&nbsp;сайте
                        чтобы опубликовать
                        ваше объявление</p>
                </div>
                <UiButton variant="black" size="black" class="mt-auto">Пополнить баланс</UiButton>
            </div>
            <!-- Вторая карточка -->
            <div
              class="flex-1 basis-[200px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[404px]">
                <div class="flex justify-between mb-3.5">
                    <div class="flex items-center gap-2.5">
                        <svg-icon name="zarplata" width="41" height="40" />
                        <p class="text-sm font-medium text-slate-custom">zarplata.ru</p>
                    </div>
                    <DotsDropdonw :items="dropItems" />
                </div>
                <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                <p class="text-sm font-medium text-space mb-3.5">Аккаунт:</p>
                <div class="w-full flex items-center gap-2.5 bg-feta py-11px px-15px rounded-ten mb-15px">
                    <div>
                        <svg-icon name="green-circle" width="11" height="11" />
                    </div>
                    <p class="truncate text-sm font-medium text-space leading-normal">evseev15232392@gmai.com</p>
                </div>
                <p class="text-sm font-medium text-space mb-3.5">Баланс публикаций:</p>
                <MultiDropdown :options="optionsData" :selected="optionsData[0]" />
                <UiButton variant="action" size="action" class="mt-auto">Опубликовать</UiButton>
            </div>
            <!-- Шаблон для добавления новой -->
            <div
              class="flex-1 basis-[200px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[404px] items-center justify-center cursor-pointer text-slate-custom hover:bg-dodger hover:text-dodger group transition-colors">
                <div class="w-[71px] h-[71px] rounded-full bg-white flex items-center justify-center mb-25px">
                    <svg-icon name="template-plus" width="31" height="31" />
                </div>
                <p class="text-sm font-medium group-hover:text-white">Добавить профиль</p>
            </div>
        </div>
        <!-- Второй блок -->
        <p class="text-xl font-semibold text-space mb-5px">Доступные публикации</p>
        <p class="text-sm font-normal text-slate-custom mb-25px">Авторизуйте ваши аккаунты на&nbsp;работных сайтах один
            раз и&nbsp;управляйте вакансиями удаленно</p>
        <div class="flex gap-15px mb-35px max-w-[875px] flex-wrap">
            <!-- Первая карточка -->
            <div
              class="flex-1 basis-[200px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[404px]">
                <div class="flex justify-between mb-3.5">
                    <div class="flex items-center gap-2.5">
                        <svg-icon name="hh" width="41" height="40" />
                        <p class="text-sm font-medium text-slate-custom">hh.ru</p>
                    </div>
                    <DotsDropdonw :items="dropItems" />
                </div>
                <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                <p class="text-sm font-medium text-space mb-3.5">Аккаунт:</p>
                <div class="w-full flex items-center gap-2.5 bg-zumthor py-11px px-15px rounded-ten mb-15px">
                    <div>
                        <svg-icon name="dodger-circle" width="11" height="11" />
                    </div>
                    <p class="truncate text-sm font-medium text-space leading-normal">Jobly</p>
                </div>
                <p class="text-sm font-medium text-space mb-3.5">Баланс публикаций:</p>
                <MultiDropdown :options="optionsData" :selected="optionsData[1]" class="mb-15px" />
                <p class="text-sm font-medium text-space mb-auto">Статус:</p>
                <div class="p-15px rounded-ten bg-serenade">
                    <p class="text-sm font-medium text-space">Услуга ожидает оплаты по&nbsp;счету: <a href="#"
                          class="text-orange underline">N2939238</a></p>
                </div>
            </div>
            <!-- Вторая карточка -->
            <div
              class="flex-1 basis-[200px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[404px]">
                <div class="flex justify-between mb-3.5">
                    <div class="flex items-center gap-2.5">
                        <svg-icon name="superjob" width="41" height="40" />
                        <p class="text-sm font-medium text-slate-custom">superjob.ru</p>
                    </div>
                    <DotsDropdonw :items="dropItems" />
                </div>
                <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                <p class="text-sm font-medium text-space mb-3.5">Аккаунт:</p>
                <div class="w-full flex items-center gap-2.5 bg-zumthor py-11px px-15px rounded-ten mb-15px">
                    <div>
                        <svg-icon name="dodger-circle" width="11" height="11" />
                    </div>
                    <p class="truncate text-sm font-medium text-space leading-normal">Jobly</p>
                </div>
                <p class="text-sm font-medium text-space mb-3.5">Баланс публикаций:</p>
                <MultiDropdown :options="optionsData" :selected="optionsData[0]" class="mb-15px" variant="selected" />
                <UiButton variant="action" size="action" class="mt-auto">Опубликовать</UiButton>
            </div>
            <!-- Третья карточка -->
            <div
              class="flex-1 basis-[200px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[404px]">
                <div class="flex justify-between mb-3.5">
                    <div class="flex items-center gap-2.5">
                        <div class="youla-pic bg-img"></div>
                        <p class="text-sm font-medium text-slate-custom">youla.ru</p>
                    </div>
                    <DotsDropdonw :items="dropItems" />
                </div>
                <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                <p class="text-sm font-medium text-space mb-3.5">Аккаунт:</p>
                <div class="w-full flex items-center gap-2.5 bg-zumthor py-11px px-15px rounded-ten mb-15px">
                    <div>
                        <svg-icon name="dodger-circle" width="11" height="11" />
                    </div>
                    <p class="truncate text-sm font-medium text-space leading-normal">Jobly</p>
                </div>
                <p class="text-sm font-medium text-space mb-3.5">Баланс публикаций:</p>
                <MultiDropdown :options="optionsData" :selected="optionsData[0]" class="mb-15px" variant="default" />
                <UiButton variant="action" size="action" class="mt-auto">Опубликовать</UiButton>
            </div>
        </div>
        <!-- Третий блок(магазин) -->
        <p class="text-xl font-semibold text-space mb-5px">Магазин Jobly </p>
        <p class="text-sm font-normal text-slate-custom mb-25px">Вакансия будет опубликована с&nbsp;аккаунта Jobly, все
            остальное остается прежним</p>
        <div class="w-full gap-x-25px flex">
            <div class="flex gap-15px mb-35px max-w-[875px] flex-wrap w-full">
                <!-- Первая карточка -->
                <div
                  class="flex-1 basis-[210px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[248px]">
                    <div class="flex items-center gap-2.5 mb-3.5">
                        <svg-icon name="hh" width="41" height="40" />
                        <p class="text-sm font-medium text-slate-custom">hh.ru</p>
                    </div>
                    <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                    <p class="text-sm font-medium text-space mb-3.5">Тарифный план:</p>
                    <MultiDropdown :options="ratesData" :selected="ratesData[0]" class="mb-15px" variant="selected" />
                    <UiButton variant="action" size="action" class="mt-auto">В корзину</UiButton>
                </div>
                <!-- Вторая карточка -->
                <div
                  class="flex-1 basis-[210px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[248px]">
                    <div class="flex items-center gap-2.5 mb-3.5">
                        <div class="avito-pic bg-img"></div>
                        <p class="text-sm font-medium text-slate-custom">avito.ru</p>
                    </div>
                    <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                    <p class="text-sm font-medium text-space mb-3.5">Тарифный план:</p>
                    <MultiDropdown :options="ratesData" :selected="ratesData[0]" class="mb-15px" variant="selected" />
                    <UiButton variant="action" size="action" class="mt-auto">В корзину</UiButton>
                </div>
                <!-- Третья карточка -->
                <div
                  class="flex-1 basis-[210px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[248px]">
                    <div class="flex items-center gap-2.5 mb-3.5">
                        <div class="rabota-pic bg-img"></div>
                        <p class="text-sm font-medium text-slate-custom">rabota.ru</p>
                    </div>
                    <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                    <p class="text-sm font-medium text-space mb-3.5">Тарифный план:</p>
                    <MultiDropdown :options="ratesData" :selected="ratesData[0]" class="mb-15px" variant="selected" />
                    <UiButton variant="action" size="action" class="mt-auto">В корзину</UiButton>
                </div>
                <!-- Четвертая карточка -->
                <div
                  class="flex-1 basis-[210px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[248px]">
                    <div class="flex items-center gap-2.5 mb-3.5">
                        <svg-icon name="zarplata" width="41" height="40" />
                        <p class="text-sm font-medium text-slate-custom">rabota.ru</p>
                    </div>
                    <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                    <p class="text-sm font-medium text-space mb-3.5">Тарифный план:</p>
                    <MultiDropdown :options="ratesData" :selected="ratesData[0]" class="mb-15px" variant="selected" />
                    <UiButton variant="action" size="action" class="mt-auto">В корзину</UiButton>
                </div>
                <!-- Пятая карточка -->
                <div
                  class="flex-1 basis-[210px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[248px]">
                    <div class="flex items-center gap-2.5 mb-3.5">
                        <svg-icon name="superjob" width="41" height="40" />
                        <p class="text-sm font-medium text-slate-custom">superjob.ru</p>
                    </div>
                    <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                    <p class="text-sm font-medium text-space mb-3.5">Тарифный план:</p>
                    <MultiDropdown :options="ratesData" :selected="ratesData[0]" class="mb-15px" variant="selected" />
                    <UiButton variant="action" size="action" class="mt-auto">В корзину</UiButton>
                </div>
                <!-- Шестая карточка -->
                <div
                  class="flex-1 basis-[210px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[248px]">
                    <div class="flex items-center gap-2.5 mb-3.5">
                        <div class="youla-pic bg-img"></div>
                        <p class="text-sm font-medium text-slate-custom">youla.ru</p>
                    </div>
                    <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                    <p class="text-sm font-medium text-space mb-3.5">Тарифный план:</p>
                    <MultiDropdown :options="ratesData" :selected="ratesData[0]" class="mb-15px" variant="selected" />
                    <UiButton variant="action" size="action" class="mt-auto">В корзину</UiButton>
                </div>
                <!-- Седьмая карточка -->
                <div
                  class="flex-1 basis-[210px] max-w-[281.5px] p-25px bg-white rounded-fifteen flex flex-col min-h-[248px]">
                    <div class="flex items-center gap-2.5 mb-3.5">
                        <svg-icon name="careerist" width="41" height="40" />
                        <p class="text-sm font-medium text-slate-custom">careerist.ru</p>
                    </div>
                    <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                    <p class="text-sm font-medium text-space mb-3.5">Тарифный план:</p>
                    <MultiDropdown :options="ratesData" :selected="ratesData[0]" class="mb-15px" variant="selected" />
                    <UiButton variant="action" size="action" class="mt-auto">В корзину</UiButton>
                </div>
            </div>
            <div>
                <div class="flex flex-col p-25px justify-center gap-y-15px bg-white rounded-fifteen">
                    <p class="text-xl font-semibold text-space">Ваша корзина пуста</p>
                    <p class="text-sm font-normal text-slate-custom">Пока здесь пусто</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-img {
    background-size: cover;
    width: 41px;
    height: 40px;
}

.youla-pic {
    background-image: url('@/assets/img/youla.svg');
}

.avito-pic {
    background-image: url('@/assets/img/avito.svg');
}

.rabota-pic {
    background-image: url('@/assets/img/rabota-ru.svg');
}
</style>