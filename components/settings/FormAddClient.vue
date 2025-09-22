<template>
    <p class="leading-normal text-xl font-semibold text-space mb-[10px]"> 
       Приглашение заказчика
    </p>
    <p class="leading-normal text-sm font-normal text-bali mb-[25px]">
        Приглашенному участнику придет письмо с доступом которое нужно подтвердить.
    </p>
    <form>
        <div class="w-full max-w-[400px] mb-15px">
            <p class="text-sm font-medium text-space leading-normal mb-15px">
              Email<span class="text-red-500">*</span>
            </p>
            <MyInput
              placeholder="Введите email"
              v-model="data.email"
            />
            <div v-if="errors.post" class="text-red-500 text-xs mt-1">
              {{ errors.email }}
            </div>
        </div>
        <div class="w-full max-w-[400px] mb-15px">
            <p class="text-sm font-medium text-space leading-normal mb-15px">
              ФИО заказчика<span class="text-red-500">*</span>
            </p>
            <div class="w-full flex justify-between gap-x-15px mb-15px">
                <MyInput
                  placeholder="Фамилия"
                  v-model="data.lastName"
                />
                <MyInput
                  placeholder="Имя"
                  v-model="data.firstName"
                />
                <MyInput
                  placeholder="Отчество"
                  v-model="data.pathronomic"
                />
            </div>
            <div v-if="errors.post" class="text-red-500 text-xs mt-1">
              {{ errors.name }}
            </div>
        </div>
        <div class="w-full mb-15px">
            <div class="flex justify-between gap-x-15px">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Отдел<span class="text-red-500">*</span>
                </p>
                <a href="#" class="text-sm font-medium text-dodger link-manage">
                    Управлять
                </a>
            </div>
              <my-dropdown
                :options="departments"
                v-model="data.departments"
                :defaultValue="'Вакансия'"
              />
              <div v-if="errors.reason" class="text-red-500 text-xs mt-1">
                {{ errors.reason }}
              </div>
        </div>
        <div class="w-full mb-15px">
            <p class="text-sm font-medium text-space leading-normal mb-4">
                  Вакансия
            </p>
            <my-dropdown
                :options="vacancies"
                v-model="data.vacancies"
                :defaultValue="'Выберите вакансии'"
            />
            <div v-if="errors.reason" class="text-red-500 text-xs mt-1">
                {{ errors.reason }}
            </div>
        </div>
        <div class="w-full mb-35px">
            <p class="text-sm font-medium text-space leading-normal mb-4">
                  Права
            </p>
            <MyCheckbox class="mb-[10px]" :id="'show-contacts'" :label="'Может комментировать кандидатов'" v-model="data.isComment" />
            <MyCheckbox :id="'show-contacts'" :label="'Может вести переписку с кандидатом'" v-model="data.isMessage" />
       </div>
       <div data-v-5b26d963="" class="flex gap-15px justify-between w-fit">
        <button data-v-5b26d963="" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-dodger text-white p-semi-btn text-sm rounded-ten leading-normal h-fit font-bold">
            Пригласить
        </button>
        <button data-v-5b26d963="" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-athens-gray border border-athens text-slate-custom p-border-semi-btn text-sm rounded-ten leading-normal font-medium">
            Отмена
        </button>
    </div>
    </form>
</template>

<script setup>
import MyInput from "../custom/MyInput.vue";
import MyDropdown from "../custom/MyDropdown.vue";
import MyCheckbox from "../custom/MyCheckbox.vue";


const errors = ref({})
const data = ref({})
const departments = ['HR', 'Разработка', 'Продажи'];
const vacancies = ['Менеджер по продажам', 'Менеджер по разработке', 'HR-менеджер'];
</script>

<style scoped>
.link-manage:hover {
    text-decoration: underline;
}
</style>