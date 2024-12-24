<script setup>
import DotsDropdonw from '~/components/custom/DotsDropdown.vue';
import MultiDropdown from '~/components/custom/MultiDropdown.vue';
import CardIcon from '~/components/custom/CardIcon.vue';

import { useCartStore } from '@/stores/cart';
import { onMounted } from 'vue';

const cartStore = useCartStore();

// Передаём данные карточек в хранилище

console.log(cartStore.cartItems);

onMounted(() => {
    // Инициализируем данные через Pinia
    cartStore.setCardsData([
        {
            id: 'basket-1',
            name: 'hh.ru',
            icon: 'hh',
            isPng: false,
            selectedRate: null,
        },
        {
            id: 'basket-2',
            name: 'avito.ru',
            icon: 'avito',
            isPng: false,
            selectedRate: null,
        },
        {
            id: 'basket-3',
            name: 'rabota.ru',
            icon: 'rabota-ru',
            isPng: false,
            selectedRate: null,
        },
        {
            id: 'basket-4',
            name: 'zarplata.ru',
            icon: 'zarplata',
            isPng: false,
            selectedRate: null,
        },
        {
            id: 'basket-5',
            name: 'superjob',
            icon: 'superjob',
            isPng: false,
            selectedRate: null,
        },
        {
            id: 'basket-6',
            name: 'youla.ru',
            icon: false,
            isPng: true,
            imagePath: '/img/logo.png',
            selectedRate: null,
        },
        {
            id: 'basket-7',
            name: 'careerist.ru',
            icon: 'careerist',
            isPng: false,
            selectedRate: null,
        },
    ]);
});

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
];

const ratesData = [
    {
        id: "rates-1",
        title: "Стандарт (1 490 ₽)",
        description: "Стандартная вакансия, размещается на 30 дней.",
        price: 1490,
    },
    {
        id: "rates-2",
        title: "С автоподнятием (4 390 ₽)",
        description: "Вакансия поднимается каждые 3 дня, в течении 30 дней.",
        price: 4390,
    },
    {
        id: "rates-3",
        title: "Бизнес (14 640 ₽)",
        description: "Вакансия висит в топе в течении 7 дней, размещается на 7 дней.",
        price: 14640,
    },
    {
        id: "rates-4",
        title: "Бизнес",
        description: "Вакансия висит в топе в течении 7 дней, размещается на 7 дней.",
        price: 0,
    }
];

function getCardName(id) {
    const card = this.cartStore.cardsData.find(card => card.id === id);
    return card?.name || 'Неизвестный товар';
}
function getCardRates(id) {
    const card = this.cartStore.cardsData.find(card => card.id === id);
    return card?.ratesData || [];
}
function getRatePrice(id, rateId) {
    const card = cartStore.cardsData.find((card) => card.id === id);
    if (!card) return 0; // Возвращаем 0, если карточка не найдена

    const rate = ratesData.find((rate) => rate.id === rateId);
    if (!rate) return 0; // Возвращаем 0, если тариф не найден

    return rate.price || 0; // Если у тарифа нет цены, возвращаем 0
}

function handleAddToCart(cardId, selectedRate) {
    if (!selectedRate) {
        alert('Пожалуйста, выберите тарифный план.');
        return;
    }
    this.cartStore.addItem(cardId, selectedRate.id);
}

const selectedRate = ref('');

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
        <div class="grid grid-cols-[repeat(auto-fit,minmax(234px,1fr))] gap-15px mb-35px max-w-[875px]">
            <!-- Первая карточка -->
            <div class="p-25px bg-white rounded-fifteen flex flex-col min-h-[404px]">
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
            <div class="p-25px bg-white rounded-fifteen flex flex-col min-h-[404px]">
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
              class="p-25px bg-white rounded-fifteen flex flex-col min-h-[404px] items-center justify-center cursor-pointer text-slate-custom hover:bg-dodger hover:text-dodger group transition-colors">
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
        <div class="grid grid-cols-[repeat(auto-fit,minmax(234px,1fr))] gap-15px mb-35px max-w-[875px]">
            <!-- Первая карточка -->
            <div class="p-25px bg-white rounded-fifteen flex flex-col min-h-[404px]">
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
            <div class="p-25px bg-white rounded-fifteen flex flex-col min-h-[404px]">
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
                <MultiDropdown :options="optionsData" :selected="optionsData[0]" class="mb-15px" />
                <UiButton variant="action" size="action" class="mt-auto">Опубликовать</UiButton>
            </div>
            <!-- Третья карточка -->
            <div class="p-25px bg-white rounded-fifteen flex flex-col min-h-[404px]">
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
        <div class="w-full gap-x-15px flex">
            <div
              class="grid grid-cols-[repeat(auto-fit,minmax(234px,1fr))] gap-15px mb-35px max-w-[875px] flex-wrap w-full">
                <!-- Динамический рендеринг карточек -->
                <div v-for="card in cartStore.cardsData" :key="card.id"
                  class="p-25px bg-white rounded-fifteen flex flex-col min-w-56 min-h-[248px]">
                    <div class="flex items-center gap-2.5 mb-3.5">
                        <CardIcon :icon="card.icon" :isPng="card.isPng" :imagePath="card.imagePath" />
                        <p class="text-sm font-medium text-slate-custom">{{ card.name }}</p>
                    </div>
                    <div class="w-full h-[1px] bg-athens mb-3.5"></div>
                    <p class="text-sm font-medium text-space mb-3.5">Тарифный план:</p>
                    <MultiDropdown :options="ratesData" class="mb-15px" variant="selected" v-model="card.selectedRate"
                      placeholder="Выберите тариф" />
                    <UiButton :variant="cartStore.isInCart(card.id) ? 'success' : 'action'"
                      @click="handleAddToCart(card.id, card.selectedRate)" class="mt-auto">
                        {{ cartStore.isInCart(card.id) ? 'В корзине' : 'В корзину' }}
                        <svg-icon v-if="cartStore.isInCart(card.id)" name="check-success" width="16" height="16" />
                    </UiButton>
                </div>
            </div>
            <div>
                <div v-if="Object.keys(cartStore.cartItems).length > 0" class="flex flex-col p-4 bg-white rounded-lg">
                    <p class="text-xl font-semibold text-gray-900">Ваша корзина</p>
                    <div v-for="(item, id) in cartStore.cartItems" :key="id"
                      class="flex justify-between items-center py-2 border-b">
                        <div class="flex items-center gap-2">
                            <p class="text-sm font-medium">{{ getCardName(id) }}</p>
                        </div>
                        <div class="flex flex-col gap-1">
                            <select v-model="item.rateId" @change="cartStore.setRate(id, item.rateId)"
                              class="border rounded p-1 text-sm">
                                <option v-for="rate in getCardRates(id)" :key="rate.id" :value="rate.id">
                                    {{ rate.title }}
                                </option>
                            </select>
                            <div class="flex items-center gap-2">
                                <button @click="cartStore.removeItem(id)"
                                  class="px-2 py-1 bg-gray-200 rounded">-</button>
                                <p class="text-sm font-medium">{{ item.count }}</p>
                                <button @click="cartStore.addItem(id, item.rateId)"
                                  class="px-2 py-1 bg-gray-200 rounded">+</button>
                            </div>
                        </div>
                        <p class="text-sm font-medium">
                            {{ getRatePrice(id, item.rateId) * item.count }} ₽
                        </p>
                        <button @click="cartStore.deleteItem(id)" class="text-red-500">Удалить</button>
                    </div>
                    <div class="mt-4">
                        <p class="text-lg font-semibold">Итого: {{ cartStore.cardsData.totalSum }} ₽</p>
                        <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Перейти к оформлению</button>
                    </div>
                </div>
                <div v-else class="p-4 bg-white rounded-lg">
                    <p class="text-lg font-medium text-gray-600">Ваша корзина пуста</p>
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
</style>