<script setup>
import Autocomplete from "~/components/custom/Autocomplete.vue";
import MyInput from "~/components/custom/MyInput.vue";
import MyTooltip from "~/components/custom/MyTooltip.vue";
import TiptapEditor from '~/components/TiptapEditor.vue';
import MyDropdown from "~/components/custom/MyDropdown.vue";
import TagSelect from "~/components/custom/TagSelect.vue";
import MyAccordion from "~/components/custom/MyAccordion.vue";
import MyCheckbox from "~/components/custom/MyCheckbox.vue";
import SalaryRange from "~/components/custom/SalaryRange.vue";
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { parseHtmlToJson } from '~/utils/htmlParser';
import { useNuxtApp } from '#app';
import CardOption from '@/components/custom/CardOption.vue';
import GeoInput from '@/components/custom/GeoInput.vue';
import ResponseInput from '@/components/custom/ResponseInput.vue';
import CheckboxGroup from '~/components/custom/CheckboxGroup.vue';
import PhoneInput from '~/components/custom/PhoneInput.vue';
import EmailInput from '~/components/custom/EmailInput.vue';
import CustomDropdown from '~/components/custom/CustomDropdown.vue';
import GenerateButton from '~/components/custom/GenerateButton.vue';

import schedule from "~/src/data/work-schedule.json";
import experience from "~/src/data/experience.json";
import education from "~/src/data/education.json";
import currency from "~/src/data/currency.json";
import AccordionAdditional from "~/src/data/accordion-additional.json";
import CarId from "~/src/data/car-id.json";
import MoreOptions from "~/src/data/more-options.json";
import industry from '~/src/data/industry.json';
import specialization from '~/src/data/specialization.json';
import responses from '~/src/data/responses.json';

import { ref, onMounted, computed } from 'vue';
import { useVacancyStore } from '@/stores/vacancy';
import majors from "~/src/data/majors.json";

const ArraySpecialization = specialization;
const ArrayOptions = MoreOptions;
const ArrayCarId = CarId;
const ArrayAdditional = AccordionAdditional;
const ArrayCurrency = currency;
const ArrayEducation = education;
const ArrayExperience = experience;
const ArraySchedule = schedule;
const ArrayMajors = majors;
const ArrayIndustry = industry;

const vacancyStore = useVacancyStore();
const newVacancy = ref('');
const newCode = ref('');
const options = ref([
    {
        name: 'Полная',
        value: 1,
    },
    {
        name: 'Частичная',
        value: 2,
    },
    {
        name: 'Временная',
        value: 3,
    },
    {
        name: 'Стажировка',
        value: 4,
    },
])
const selectEmployment = ref(null);
const selectedCard = ref(null);
const hoveredCard = ref(null);

const handleCheck = (id) => {
    selectedCard.value = id;
}

onMounted(() => {
    selectedCard.value = "office";
})

const handleHover = (id) => {
    hoveredCard.value = id;
}

const clearHover = () => {
    hoveredCard.value = null;
}

const cards = [
    {
        id: 'office',
        title: 'Офис',
        description: 'Сотрудники<br>работают в офисе',
    },
    {
        id: 'hybrid',
        title: 'Гибрид',
        description: 'Сотрудники работают как офисе,<br>так и дома',
    },
    {
        id: 'outsource',
        title: 'Удаленно',
        description: 'Сотрудники<br>работают из дома',
    }
]

const selectedAdditional = ref([]);
const selectedCarId = ref([]);
const selectedOptions = ref([]);
const showContacts = ref(true);
const phone = ref("");
const email = ref("");
const selectedIndustry = ref(null);
const selectedSpecialization = ref(null);
const jobDescription = ref('');
const selectedSchedule = ref('');
const selectedExperience = ref('');
const tags = ref([]);
const salary = ref({
    from: null,
    to: null
});
const salaryType = ref('');
const currencyType = ref('RUB (рубль)');
const workSpace = ref('office');
const location = ref('');
const response = ref('');
const selectedEducation = ref('');
function saveVacancy() {
    vacancyStore.setNameVacancy(newVacancy.value); // Сохраняем в глобальное хранилище
    alert('Название вакансии сохранено!');
}

// Автоматически форматируем перед отправкой
const formattedJobDescription = computed(() => parseHtmlToJson(jobDescription.value));

const { $axios } = useNuxtApp();
const vacancyData = ref({
    name: newVacancy.value,
    code: newCode.value,
    description: formattedJobDescription.value,
    employment: selectEmployment.value,
    specializations: selectedSpecialization.value,
    industry: selectedIndustry.value,
    schedule: selectedSchedule.value,
    experience: selectedExperience.value,
    education: selectedEducation.value,
    phrases: tags.value,
    conditions: selectedAdditional.value, // массив
    drivers: selectedCarId.value, // массив
    additions: selectedOptions.value, // массив
    salary_from: salary.from,
    salary_to: salary.to,
    currency: currencyType.value,
    place: workSpace.value.title,
    location: location.value,
    customer_id: 1,
    customer_name: responses[0].name,
    customer_phone: phone.value,
    customer_email: email.value,
});
</script>

<template>
    <div class="container pb-10">
        <div class="flex gap-x-[24px] pt-48">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="text-space text-xl font-semibold mb-8">Основная информация</p>
                <div class="w-full justify-between flex gap-25px mb-6">
                    <div class="w-full">
                        <p class="text-sm font-medium mb-4 leading-normal text-space"><span class="text-red">*</span>
                            Название должности</p>
                        <Autocomplete :source="ArrayMajors" v-model="newVacancy"
                          placeholder="Например, Менеджер по продажам" class="mb-11px" />
                        <p class="text-xs text-bali">Осталось 80 символов. Специальных символов нет.</p>
                    </div>
                    <div class="w-full">
                        <div class="flex">
                            <p class="text-sm font-medium mb-4 leading-normal text-space mr-[3px]">Код вакансии</p>
                            <span>
                                <svg-icon name="question" width="20" height="20" />
                                <MyTooltip
                                  text="Каждая вакансия получает свой уникальный код, что позволяет точно идентифицировать её в системе и избежать путаницы, особенно при работе с большим количеством вакансий." />
                            </span>
                        </div>
                        <div class="max-w-400px">
                            <MyInput :placeholder="'Код вакансии'" type="number" v-model="newCode" />
                        </div>
                    </div>
                </div>
                <div class="w-full">
                    <div class="w-full flex justify-between">
                        <p class="text-sm font-medium text-space"><span class="text-red">*</span> Описание вакансии</p>
                        <generate-button />
                    </div>
                </div>
                <div class="mt-15px mb-3.5">
                    <client-only>
                        <tiptap-editor v-model="jobDescription" />
                    </client-only>
                </div>
                <p class="text-xs text-bali font-normal">Максимум 700 символов. Использовано 0 символов.</p>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-space leading-[17px] text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <div class="flex gap-x-[24px] pt-3.5">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="text-space text-xl font-semibold mb-[31px]">Подробности о компании</p>
                <div class="flex justify-between gap-25px">
                    <div class="w-full">
                        <p class="text-sm font-medium text-space mb-3.5">Отрасль компании</p>
                        <div class="w-full relative">
                            <CustomDropdown :options="ArrayIndustry" placeholder="Выберите отрасль"
                              v-model="selectedIndustry" />
                        </div>
                    </div>
                    <div class="w-full">
                        <p class="text-sm font-medium text-space mb-3.5">Выберите специализацию</p>
                        <div>
                            <CustomDropdown :options="ArraySpecialization" placeholder="Выберите специализацию"
                              v-model="selectedSpecialization" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-space leading-[17px] text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <div class="flex gap-x-[24px] pt-3.5">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="text-space text-xl font-semibold mb-[31px]">Подробности вакансии</p>
                <div class="flex justify-between gap-25px mb-3.5">
                    <div class="w-full">
                        <p class="text-sm font-medium text-space mb-3.5">Тип занятости</p>
                        <my-dropdown :defaultValue="'Тип занятости'" :options="options" v-model="selectEmployment" />
                    </div>
                    <div class="w-full">
                        <p class="text-sm font-medium text-space mb-3.5">График работы</p>
                        <my-dropdown :defaultValue="'График работы'" :options="ArraySchedule"
                          v-model="selectedSchedule" />
                    </div>
                </div>
                <div class="flex justify-between gap-25px mb-3.5">
                    <div class="w-full">
                        <p class="text-sm font-medium text-space mb-3.5">Опыт работы</p>
                        <my-dropdown :defaultValue="'Опыт работы'" :options="ArrayExperience"
                          v-model="selectedExperience" />
                    </div>
                    <div class="w-full">
                        <p class="text-sm font-medium text-space mb-3.5">Образование</p>
                        <my-dropdown :defaultValue="'Образование'" :options="ArrayEducation"
                          v-model="selectedEducation" />
                    </div>
                </div>
                <div class="w-full mb-9 max-w-input">
                    <p class="text-sm font-medium text-space mb-13px">Ключевые фразы</p>
                    <tag-select v-model="tags" />
                </div>
                <div class="w-fit">
                    <MyAccordion title="дополнительные условия" class="mb-15px">
                        <div class="flex flex-col flex-wrap max-h-40 gap-x-25px gap-y-15px">
                            <CheckboxGroup v-model="selectedAdditional" :options="ArrayAdditional" />
                        </div>
                    </MyAccordion>
                    <MyAccordion title="водительские права" class="mb-15px">
                        <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
                            <CheckboxGroup v-model="selectedCarId" :options="ArrayCarId" />
                        </div>
                    </MyAccordion>
                    <MyAccordion title="дополнительные пожелания">
                        <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
                            <CheckboxGroup v-model="selectedOptions" :options="ArrayOptions" />
                        </div>
                    </MyAccordion>
                </div>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-space leading-[17px] text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <div class="flex gap-x-[24px] pt-3.5">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="text-space text-xl font-semibold mb-[31px]">Заработная плата</p>
                <div class="flex justify-between gap-25px">
                    <div class="w-full">
                        <p class="text-sm font-medium text-space mb-3.5">Заработная плата / мес</p>
                        <SalaryRange class="mb-4" v-model="salary" />
                        <div>
                            <RadioGroup default-value="past-cash" class="flex gap-[18px]" v-model="salaryType">
                                <div class="my-checkbox">
                                    <Label for="past-cash" class="cursor-pointer flex items-center">
                                        <RadioGroupItem id="past-cash" value="past-cash" class="mr-5px" />
                                        <p>На руки</p>
                                    </Label>
                                </div>
                                <div class="my-checkbox">
                                    <Label for="full-cash" class="cursor-pointer flex items-center">
                                        <RadioGroupItem id="full-cash" value="full-cash" class="mr-5px" />
                                        <p>До вычета налогов</p>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div class="w-full">
                        <p class="text-sm font-medium text-space mb-3.5">Валюта</p>
                        <my-dropdown :defaultValue="'Валюта'" :options="ArrayCurrency" :selected="0"
                          v-model="currencyType" />
                    </div>
                </div>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-space leading-[17px] text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <div class="flex gap-x-[24px] pt-3.5">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="text-space text-xl font-semibold mb-[33px]">Место работы</p>
                <div class="mb-[23px]">
                    <RadioGroup default-value="office" class="flex gap-x-15px w-full" v-model="workSpace">
                        <CardOption v-for="card in cards" :key="card.id" :id="card.id" :title="card.title"
                          :description="card.description" :selectedCard="selectedCard" :hoveredCard="hoveredCard"
                          @update:selected="handleCheck" @hover="handleHover" @leave="clearHover" />
                    </RadioGroup>
                </div>
                <p class="text-sm font-medium text-space mb-15px">Локация офиса</p>
                <geo-input class="mb-2.5" v-model="location" />
                <p class="leading-normal text-xs text-bali font-normal">Укажите расположение офиса для нового
                    сотрудника.</p>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-space leading-[17px] text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <div class="flex gap-x-[24px] pt-3.5 mb-25px">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="leading-normal text-space text-xl font-semibold mb-[33px]">Контактная информация</p>
                <p class="text-sm font-medium text-space mb-16px">Контактное лицо</p>
                <response-input class="mb-6 w-full max-w-input" :responses="responses" v-model="response" />
                <div class="w-full flex justify-between gap-x-[25px]">
                    <div class="w-full max-w-[400px]">
                        <p class="text-sm font-medium text-space leading-normal mb-4">Номер телефона</p>
                        <phone-input v-model="phone" class="mb-25px" />
                        <MyCheckbox id="show-contacts" label="Отображать контакты в вакансии" v-model="showContacts" />
                    </div>
                    <div class="w-full">
                        <p class="text-sm font-medium text-space leading-normal mb-4">Email</p>
                        <email-input v-model="email" />
                    </div>
                </div>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-space leading-[17px] text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <UiButton @click="saveVacancy" variant="action" size="semiaction" class="font-semibold">Сохранить и продолжить
        </UiButton>
    </div>
</template>

<style scoped>
.max-w-input {
    max-width: calc(50% - 12.5px);
}
</style>