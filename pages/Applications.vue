<template>
    <div class="container pb-72 pt-[34px]">
        <div class="bg-white p-25px rounded-fifteen flex justify-between mb-3.5 items-center">
            <div>
                <p class="text-xl font-semibold text-space leading-normal mb-2.5">Заявки</p>
                <p class="text-sm font-normal text-slate-custom leading-normal">Отправьте приглашение заказчику и
                    управляйте доступом
                </p>
            </div>
            <UiButton size="semiaction" variant="action" @click="handleOpenNewApp">Новая заявка</UiButton>
        </div>

        <div class="w-full leading-normal pl-15px pr-25px rounded-t-fifteen bg-catskill mb-px">
            <div class="header-wrapper grid grid-cols-8 gap-x-2.5 min-h-[71px] items-center">
                <div v-for="header in headers" :key="header.key"
                  class="text-sm font-medium text-slate-custom flex pl-2.5"
                  @click="['createdAt', 'closeDate', 'status'].includes(header.key) && sortBy(header.key)"
                  :class="{ 'cursor-pointer select-none': ['createdAt', 'closeDate', 'status'].includes(header.key) }">
                    <span>{{ header.label }}</span>
                    <button v-if="['createdAt', 'closeDate', 'status'].includes(header.key)"
                      class="relative flex items-center justify-center ml-[2.2px] custom-button">
                        <span :style="sortArrowStyle(header.key)" class="ml-1"><svg-icon name="sort-arrow" width="16px"
                              height="15px" /></span>
                    </button>
                </div>
                <div></div>
            </div>
        </div>

        <div v-for="(vacancy, index) in sortedData" :key="index" :data-vacancy="vacancy.title"
          class="items-wrapper grid grid-cols-8 gap-x-2.5 mb-px min-h-[61px] pl-15px pr-25px bg-white last-of-type:rounded-b-fifteen">
            <!-- simple values -->
            <div class="text-sm font-medium text-space py-5 pl-2.5">{{ vacancy.title }}</div>
            <div class="text-sm font-medium text-space py-5 pl-2.5">{{ vacancy.region }}</div>
            <div class="text-sm font-medium text-space py-5 pl-2.5">{{ vacancy.createdAt }}</div>
            <div class="text-sm font-medium text-space py-5 pl-2.5">{{ vacancy.closeDate }}</div>
            <!-- status vacancy -->
            <div class="text-sm font-medium text-space py-5 pl-2.5">{{ statusLabels[vacancy.status] }}</div>
            <!-- admin or responsible column on user role -->
            <div class="text-sm font-medium text-space py-5 pl-2.5" v-if="['admin', 'responsible'].includes(userRole)">
                {{
                    vacancy.customer }}</div>
            <div v-if="userRole === 'customer'" class="text-sm font-medium text-space py-5 pl-5px">{{
                vacancy.responsible }}</div>

            <!-- admin or costomer column -->
            <div>
                <div v-if="userRole === 'admin'">
                    <div class="text-sm font-medium text-space py-5 pl-2.5" v-if="vacancy.executor">{{ vacancy.executor
                        }}
                    </div>
                    <div v-else>
                        <!-- Если выбрано значение, показываем его -->
                        <div v-if="vacancy.responseChoose" class="text-sm font-medium text-dodger py-5 pl-2.5">
                            {{ vacancy.responseChoose }}
                        </div>
                        <button v-else-if="!vacancy.showResponseInput" @click="openResponseInput(vacancy, $event)"
                          class="text-sm font-medium text-dodger py-5 pl-2.5">Добавить</button>
                        <response-input v-model="vacancy.responseChoose" v-show="vacancy.showResponseInput"
                          @update:modelValue="(value) => updateResponseChoose(vacancy, value)"
                          class="mb-0 w-full max-w-input py-5" :responses="responses" />
                    </div>
                </div>
                <div v-if="userRole === 'responsible'">
                    <div v-if="vacancy.executor" class="text-sm font-medium text-space py-5 pl-2.5">{{ vacancy.executor
                        }}</div>
                    <div v-else><button @click="takeInWork(vacancy)"
                          class="py-5 pl-2.5 text-sm font-medium text-dodger">Взять в работу</button>
                    </div>
                </div>
                <div div v-if="userRole === 'customer'">
                    <div v-if="vacancy.executor" class="text-sm font-medium text-space py-5 pl-2.5">{{
                        vacancy.responsible }}</div>
                    <div v-else>
                        <p class="py-5 text-bali text-sm font-normal pl-2.5">Не назначен</p>
                    </div>
                </div>
            </div>
            <!-- dropdown item -->
            <div class="py-2.5">
                <DotsDropdown :items="dropdownOptions" />
            </div>
        </div>
        <transition name="fade" @after-leave="enableBodyScroll">
            <Popup :isOpen="isNewAppPopup" @close="handleCloseNewApp" :width="'740px'" :showCloseButton="false"
              :disableOverflowHidden="true" :overflowContainer="true">
                <p class="leading-normal text-xl font-semibold text-space mb-35px">Новая заявка</p>
                <div>
                    <p class="text-sm font-medium text-space mb-5px">Ответственный</p>
                    <div ref="responseContainer">
                        <div v-if="newResponse" class="text-sm font-medium text-dodger">{{ newResponse }}</div>
                        <button v-else-if="!showNewResponse" @click="openNewResponse"
                          class="text-sm font-medium text-dodger">Добавить</button>
                        <response-input class="w-full" :responses="responses" v-model="newResponse"
                          v-show="showNewResponse" @update:modelValue="(value) => updateNewResponse(value)" />
                    </div>
                </div>
                <div class="grid gap-x-5 grid-flow-col">
                    <div>
                        <p class="text-sm font-medium text-space">Должность</p>
                        <SimpleInput placeholder="Введите название должности" v-model="newPosition" />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-space">Департамент</p>
                        <SimpleInput v-model="newDepartment" />
                    </div>
                </div>
                <div class="grid gap-x-5 grid-flow-col">
                    <div>
                        <p class="text-sm font-medium text-space">Регион поиска</p>
                        <SimpleInput v-model="newRegion" />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-space">Причина открытия вакансии</p>
                        <SimpleInput v-model="newReason" />
                    </div>
                </div>
                <div class="grid gap-x-5 grid-flow-col">
                    <div>
                        <p class="text-sm font-medium text-space">Зарплата от</p>
                        <SimpleInput v-model="salaryMin" type="number" />

                    </div>
                    <div>
                        <p class="text-sm font-medium text-space">Зарплата до</p>
                        <SimpleInput v-model="salaryMax" type="number" />
                    </div>
                </div>
                <div>
                    <p class="text-sm font-medium text-space">Количество позиций</p>
                    <SimpleInput v-model="vacancyCount" type="number" />
                </div>
                <div>
                    <p class="text-sm font-medium text-space">Требования кандидата</p>
                    <SimpleInput v-model="requirements" />
                </div>
                <div>
                    <p class="text-sm font-medium text-space">Обязанности кандидата</p>
                    <SimpleInput v-model="responsibilities" />
                </div>
                <div class="grid gap-x-5 grid-flow-col">
                    <div>
                        <p class="text-sm font-medium text-space">Начать подбор не позднее </p>
                        <InputCalendar />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-space">Желаемая дата выхода кандидата</p>
                        <SimpleInput v-model="exitDate" />
                    </div>
                </div>
                <div class="flex gap-15px justify-between w-fit">
                    <UiButton variant="action" size="action">Создать</UiButton>
                    <UiButton variant="back" size="second-back" @click="handleCloseNewApp">Отмена</UiButton>
                </div>
            </Popup>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// import { getMovieList } from "@/src/api";

// const apiTest = getMovieList('movie');

// const initTop = await useAsyncData('top10', async () => await getMovieList('movie'));
// console.log(apiTest);

import ResponseInput from '@/components/custom/ResponseInput.vue';
import DotsDropdown from '@/components/custom/DotsDropdown.vue';
import Popup from '~/components/custom/Popup.vue';
import SimpleInput from '~/components/custom/SimpleInput.vue';
import InputCalendar from '~/components/custom/InputCalendar.vue';

import responses from '~/src/data/responses.json';
import dataList from '~/src/data/roles-data-admin.json';

const data = ref(dataList.map(vacancy => ({
    ...vacancy,
    showResponseInput: false, // Добавляем состояние для каждого элемента
    responseChoose: '', // Выбранный ответственный
})));

const headers = computed(() => {
    const baseHeaders = [
        { key: "title", label: "Вакансия" },
        { key: "region", label: "Регион" },
        { key: "createdAt", label: "Создана от" },
        { key: "closeDate", label: "Закрыть до" },
        { key: "status", label: "Статус" },
        { key: "executor", label: "Исполнитель" }
    ];

    if (['admin', 'responsible'].includes(userRole.value)) {
        baseHeaders.splice(5, 0, { key: "customer", label: "Заказчик" });
    } else if (userRole.value === 'customer') {
        baseHeaders.splice(5, 0, { key: "responsible", label: "Ответственный" });
    }

    return baseHeaders;
});

const sortKey = ref("");
const sortOrder = ref("asc");
const userRole = ref("admin"); // Change to "admin" or "responsible" and "customer" for testing
const dropdownOptions = ["Управлять", "Копировать заявку", "Удалить"];
const isNewAppPopup = ref(false);
const showNewResponse = ref(false);
const newResponse = ref('');
const responseContainer = ref(null);
const newPosition = ref('');
const newDepartment = ref('');
const newRegion = ref('');
const newReason = ref('');
const salaryMin = ref('');
const salaryMax = ref('');
const vacancyCount = ref('');
const requirements = ref('');
const responsibilities = ref('');
const startDate = ref('');
const exitDate = ref('');

const statusLabels = {
    new: "Новая заявка",
    in_review: "На рассмотрении",
    in_work: "В работе",
    paused: "Приостановлена"
};

const statusWeights = {
    new: 1,
    in_review: 2,
    in_work: 3,
    paused: 4
};

const sortedData = computed(() => {
    if (!sortKey.value) return data.value;

    return [...data.value].sort((a, b) => {
        const multiplier = sortOrder.value === "asc" ? 1 : -1;

        if (sortKey.value === "status") {
            return (statusWeights[a.status] - statusWeights[b.status]) * multiplier;
        }

        if (a[sortKey.value] > b[sortKey.value]) return 1 * multiplier;
        if (a[sortKey.value] < b[sortKey.value]) return -1 * multiplier;
        return 0;
    });
});

const sortBy = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
        sortKey.value = key;
        sortOrder.value = "asc";
    }
};

const sortArrowStyle = (key) => {
    return {
        transform: sortKey.value === key && sortOrder.value === "asc" ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease"
    };
};

const takeInWork = (vacancy) => {
    console.log(`Вакансия взята в работу: ${vacancy.title}`);
};

const openResponseInput = (vacancy, event) => {
    event.stopPropagation(); // Останавливаем всплытие события
    vacancy.showResponseInput = true;
};

const handleClickOutside = (event) => {
    data.value.forEach(vacancy => {
        if (vacancy.showResponseInput) {
            const element = document.querySelector(`[data-vacancy="${vacancy.title}"]`);
            if (element && !element.contains(event.target)) {
                // Если не было выбора, оставляем кнопку "Добавить"
                if (!vacancy.responseChoose) {
                    vacancy.showResponseInput = false;
                } else {
                    vacancy.showResponseInput = false;
                }
            }
        }
    });
};

const handleClickOutsideNewAppPopup = (event) => {
    if (responseContainer.value && !responseContainer.value.contains(event.target)) {
        if (!newResponse.value) {
            showNewResponse.value = false; // Закрываем input, если ничего не выбрано
        }
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('click', handleClickOutsideNewAppPopup);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('click', handleClickOutsideNewAppPopup);
});

const updateResponseChoose = (vacancy, value) => {
    if (value) {
        vacancy.responseChoose = value;
        vacancy.showResponseInput = false;
    }
};


// popup's settings
// config for control scroll
function disableBodyScroll() {
    document.body.style.overflow = 'hidden'; // Отключаем прокрутку
}

function enableBodyScroll() {
    document.body.style.overflow = ''; // Включаем прокрутку
}

function handleOpenNewApp() {
    isNewAppPopup.value = true;
    disableBodyScroll();
}

function handleCloseNewApp() {
    isNewAppPopup.value = false;
    enableBodyScroll();
}

const openNewResponse = (event) => {
    event.stopPropagation();
    showNewResponse.value = true;
};

const updateNewResponse = (value) => {
    if (value) {
        newResponse.value = value;
        showNewResponse.value = false;
    }
}
</script>

<style scoped>
.header-wrapper {
    grid-template-columns: 14.01% 14.01% 10.485% 10.662% 13.128% 14.01% 14.01% 3.525%;
}

.items-wrapper {
    grid-template-columns: 13.833% 13.833% 10.485% 10.662% 13.833% 13.833% 13.833% 3.525%;
}

/* Анимация появления и скрытия */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-leave-from {
    opacity: 1;
}
</style>