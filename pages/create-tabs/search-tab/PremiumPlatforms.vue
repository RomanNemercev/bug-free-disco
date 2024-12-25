<script setup>
import DotsDropdonw from '~/components/custom/DotsDropdown.vue';
import MultiDropdown from '~/components/custom/MultiDropdown.vue';
import CardIcon from '~/components/custom/CardIcon.vue';

import { useCartStore } from '@/stores/cart';
import { onMounted } from 'vue';

import optionsData from '~/src/data/options-data.json';
import cardsData from '~/src/data/cards-data.json';
import ratesData from '~/src/data/rates-data.json';

const cartStore = useCartStore();

onMounted(() => {
    // Инициализируем данные через Pinia
    cartStore.setCardsData(cardsData);
    cartStore.setRatesData(ratesData);
});
function getCardName(id) {
    const card = this.cartStore.cardsData.find(card => card.id === id);
    return card?.name || 'Неизвестный товар';
}

function getRateName(id, rateId) {
    const card = cartStore.cardsData.find((card) => card.id === id);
    if (!card) return ''; // Возвращаем пустую строку, если карточка не найдена

    const rate = ratesData.find((rate) => rate.id === rateId);
    if (!rate) return ''; // Возвращаем пустую строку, если тариф не найден

    return rate.name || ''; // Если у тарифа нет названия, возвращаем пустую строку
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

const getCardProperty = (id, key) => {
    const card = cartStore.cardsData.find(card => card.id === id);
    return card ? card[key] : null; // Если карта найдена, вернуть значение ключа
};

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
            <div class="grid grid-cols-[repeat(auto-fit,minmax(234px,1fr))] gap-15px mb-35px max-w-[875px] w-full">
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
            <div class="max-w-[275px] w-full">
                <div v-if="Object.keys(cartStore.cartItems).length > 0"
                  class="flex flex-col p-25px bg-white rounded-fifteen">
                    <p class="text-xl font-semibold text-gray-900 mb-25px">Ваша корзина</p>
                    <div class="w-full h-[1px] bg-athens"></div>
                    <div v-for="(item, id) in cartStore.cartItems" :key="id"
                      class="flex justify-between flex-col border-b py-25px">
                        <div class="flex gap-x-15px mb-25px">
                            <CardIcon :icon="getCardProperty(id, 'icon')" :isPng="getCardProperty(id, 'isPng')"
                              :imagePath="getCardProperty(id, 'imagePath')" />
                            <div class="flex flex-col gap-y-5px">
                                <p class="text-15px font-medium">{{ getCardName(id) }}</p>
                                <p class="text-sm font-normal text-slate-custom">{{ getRateName(id, item.rateId) }}</p>
                                <p class="text-15px font-medium">
                                    {{ getRatePrice(id, item.rateId) * item.count }} руб.
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-15px">
                            <div class="flex items-center gap-x-5px w-full">
                                <button @click="cartStore.removeItem(id)" :disabled="cartStore.isRemoveDisabled(id)"
                                  :class="{
                                    'opacity-50 cursor-not-allowed': cartStore.isRemoveDisabled(id),
                                    'hover:text-dodger hover:border-zumthor hover:bg-zumthor active:text-white active:bg-dodger active:border-dodger': !cartStore.isRemoveDisabled(id),
                                }"
                                  class="w-10 h-10 bg-athens-gray border border-athens rounded-ten flex items-center justify-center text-slate-custom transition-all shrink-0"><svg-icon
                                      name="basket-minus" width="20" height="20" /></button>
                                <p
                                  class="text-sm font-semibold w-full h-10 bg-athens-gray border border-athens rounded-ten flex items-center justify-center text-space">
                                    {{ item.count }}</p>
                                <button @click="cartStore.addItem(id, item.rateId)"
                                  class="w-10 h-10 bg-athens-gray border border-athens rounded-ten flex items-center justify-center text-slate-custom hover:text-dodger hover:border-zumthor hover:bg-zumthor active:text-white active:bg-dodger active:border-dodger transition-all shrink-0"><svg-icon
                                      name="basket-plus" width="20" height="20" /></button>
                            </div>
                            <button @click="cartStore.deleteItem(id)"
                              class="w-10 h-10 bg-athens-gray border border-athens rounded-ten flex items-center justify-center text-slate-custom hover:text-red hover:border-cinderella hover:bg-pink active:text-white active:bg-red active:border-red transition-all ml-auto shrink-0"><svg-icon
                                  name="basket-basket" width="20" height="20" /></button>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="flex justify-between">
                            <p class="text-sm font-normal text-slate-custom">Позиций</p>
                            <p class="text-15px font-semibold text-space">{{ cartStore.totalItems }}</p>
                        </div>
                        <div class="flex justify-between mb-35px">
                            <p class="text-sm font-normal text-slate-custom">Итого</p>
                            <p class="text-15px font-semibold text-space">{{ cartStore.totalSum }} ₽</p>
                        </div>
                        <UiButton variant="action" size="action" class="w-full">Перейти к оформлению</UiButton>
                    </div>
                </div>
                <div v-else class="p-4 bg-white rounded-fifteen">
                    <p class="text-lg font-medium text-gray-600">Ваша корзина пуста</p>
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
</style>