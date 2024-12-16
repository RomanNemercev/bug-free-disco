<script setup>
import Autocomplete from "~/components/custom/Autocomplete.vue";
import MyInput from "~/components/custom/MyInput.vue";
import MyTooltip from "~/components/custom/MyTooltip.vue";
import MyAISelect from "~/components/custom/MyAISelect.vue";
import TiptapEditor from '~/components/TiptapEditor.vue';
import MyCombobox from "~/components/custom/MyCombobox.vue";
import MyDropdown from "~/components/custom/MyDropdown.vue";
import TagSelect from "~/components/custom/TagSelect.vue";
import MyAccordion from "~/components/custom/MyAccordion.vue";
import MyCheckbox from "~/components/custom/MyCheckbox.vue";
import SalaryRange from "~/components/custom/SalaryRange.vue";
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import CardOption from '@/components/custom/CardOption.vue';
import GeoInput from '@/components/custom/GeoInput.vue';
import ResponseInput from '@/components/custom/ResponseInput.vue';
import CheckboxGroup from '~/components/custom/CheckboxGroup.vue';
import PhoneInput from '~/components/custom/PhoneInput.vue';
import EmailInput from '~/components/custom/EmailInput.vue';
import CustomDropdown from '~/components/custom/CustomDropdown.vue';

import schedule from "~/src/data/work-schedule.json";
import experience from "~/src/data/experience.json";
import education from "~/src/data/education.json";
import currency from "~/src/data/currency.json";
import AccordionAdditional from "~/src/data/accordion-additional.json";
import CarId from "~/src/data/car-id.json";
import MoreOptions from "~/src/data/more-options.json";
import industry from '~/src/data/industry.json';
import specialization from '~/src/data/specialization.json';

import { ref, onMounted } from 'vue';
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

const major = ref('')
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
const parentSelectedOption = ref(null);
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
</script>

<template>
    <div class="container pb-80">
        <div class="flex gap-x-[24px] pt-10">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="text-xl font-semibold mb-9">Основная информация</p>
                <div class="w-full justify-between flex gap-25px">
                    <div class="w-full">
                        <p class="text-sm font-medium"><span class="text-red">*</span> Название должности</p>
                        <Autocomplete :source="ArrayMajors" v-model="major"
                          placeholder="Например, Менеджер по продажам" />
                        <p class="text-xs text-bali">Осталось 80 символов. Специальных символов нет.</p>
                    </div>
                    <div class="w-full">
                        <div class="flex">
                            <p class="text-sm font-medium">Код вакансии</p>
                            <span>
                                <svg-icon name="question" width="20" height="20" />
                                <MyTooltip text="Hover" />
                            </span>
                        </div>
                        <MyInput />
                    </div>
                </div>
                <div class="w-full">
                    <div class="w-full flex justify-between">
                        <p class="text-sm font-medium"><span class="text-red">*</span>Описание вакансии</p>
                        <MyAISelect :options="['2 строчки', '3 строчки', '4 строчки']" />
                    </div>
                </div>
                <div class="mt-25px">
                    <client-only>
                        <tiptap-editor />
                    </client-only>
                </div>
                <p class="text-xs text-bali font-normal">Максимум 700 символов. Использовано 0 символов.</p>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <div class="flex gap-x-[24px] pt-10">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="text-xl font-semibold mb-9">Подробности о компании</p>
                <div class="flex justify-between gap-25px">
                    <div class="w-full">
                        <p class="text-sm font-medium text-space">Отрасль компании</p>
                        <div class="w-full relative">
                            <CustomDropdown :options="ArrayIndustry" placeholder="Выберите отрасль"
                              v-model="selectedIndustry" />
                        </div>
                    </div>
                    <div class="w-full">
                        <p class="text-sm font-medium text-space">Выберите специализацию</p>
                        <div>
                            <CustomDropdown :options="ArraySpecialization" placeholder="Выберите специализацию"
                              v-model="selectedSpecialization" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <div class="flex gap-x-[24px] pt-10">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="text-xl font-semibold mb-9">Подробности вакансии</p>
                <div class="flex justify-between gap-25px">
                    <div class="w-full">
                        <p class="text-sm font-medium text-space">Тип занятости</p>
                        <my-dropdown :defaultValue="'Тип занятости'" :options="options"
                          v-model="parentSelectedOption" />
                    </div>
                    <div class="w-full">
                        <p class="text-sm font-medium text-space">График работы</p>
                        <my-dropdown :defaultValue="'График работы'" :options="ArraySchedule" />
                    </div>
                </div>
                <div class="flex justify-between gap-25px">
                    <div class="w-full">
                        <p class="text-sm font-medium text-space">Опыт работы</p>
                        <my-dropdown :defaultValue="'Опыт работы'" :options="ArrayExperience" />
                    </div>
                    <div class="w-full">
                        <p class="text-sm font-medium text-space">Образование</p>
                        <my-dropdown :defaultValue="'Образование'" :options="ArrayEducation" />
                    </div>
                </div>
                <div class="w-full">
                    <p class="text-sm font-medium text-space mb-15px">Ключевые фразы</p>
                    <tag-select />
                </div>
                <div class="w-fit">
                    <MyAccordion title="дополнительные условия">
                        <div class="flex flex-col flex-wrap max-h-40 gap-x-25px gap-y-15px">
                            <CheckboxGroup v-model="selectedAdditional" :options="ArrayAdditional" />
                        </div>
                    </MyAccordion>
                    <MyAccordion title="водительские права">
                        <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
                            <CheckboxGroup v-model="selectedCarId" :options="ArrayCarId" />
                        </div>
                    </MyAccordion>
                    <MyAccordion title="дополнительные возможности">
                        <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
                            <CheckboxGroup v-model="selectedOptions" :options="ArrayOptions" />
                        </div>
                    </MyAccordion>
                </div>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <div class="flex gap-x-[24px] pt-10">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="text-xl font-semibold mb-9">Подробности вакансии</p>
                <div class="flex justify-between gap-25px">
                    <div class="w-full">
                        <p class="text-sm font-medium text-space">Заработная плата / мес</p>
                        <SalaryRange />
                        <div>
                            <RadioGroup default-value="past-cash" class="flex">
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
                        <p class="text-sm font-medium text-space">Валюта</p>
                        <my-dropdown :defaultValue="'Валюта'" :options="ArrayCurrency" :selected="0" />
                    </div>
                </div>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <div class="flex gap-x-[24px] pt-10">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="text-xl font-semibold mb-9">Место работы</p>
                <div>
                    <RadioGroup default-value="office" class="flex gap-x-15px w-full">
                        <CardOption v-for="card in cards" :key="card.id" :id="card.id" :title="card.title"
                          :description="card.description" :selectedCard="selectedCard" :hoveredCard="hoveredCard"
                          @update:selected="handleCheck" @hover="handleHover" @leave="clearHover" />
                    </RadioGroup>
                </div>
                <p class="text-sm font-medium text-space">Локация офиса</p>
                <geo-input />
                <p class="text-xs text-bali font-normal">Укажите расположение офиса для нового сотрудника.</p>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <div class="flex gap-x-[24px] pt-10">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <p class="text-xl font-semibold mb-9">Контактная информация</p>
                <p class="text-sm font-medium text-space">Контактное лицо</p>
                <response-input />
                <div class="w-full flex justify-between gap-x-[25px]">
                    <div class="w-full">
                        <p class="text-sm font-medium text-space">Номер телефона</p>
                        <phone-input v-model="phone" />
                        <MyCheckbox id="show-contacts" label="Отображать контакты в вакансии" v-model="showContacts" />
                    </div>
                    <div class="w-full">
                        <p class="text-sm font-medium text-space">Email</p>
                        <email-input v-model="email" />
                    </div>
                </div>
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <UiButton variant="action" size="semiaction">Сохранить и продолжить</UiButton>
    </div>
</template>
