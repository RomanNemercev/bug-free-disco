<script setup>
import Autocomplete from "~/components/ui/Autocomplete.vue";
import MyInput from "~/components/ui/MyInput.vue";
import MyTooltip from "~/components/ui/MyTooltip.vue";
import MyAISelect from "~/components/ui/MyAISelect.vue";
import TiptapEditor from '~/components/TiptapEditor.vue';
import MyCombobox from "~/components/ui/MyCombobox.vue";
import MyDropdown from "~/components/ui/MyDropdown.vue";
import TagSelect from "~/components/ui/TagSelect.vue";
import MyAccordion from "~/components/ui/MyAccordion.vue";
import MyCheckbox from "~/components/ui/MyCheckbox.vue";
import SalaryRange from "~/components/ui/SalaryRange.vue";
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import CardOption from '@/components/ui/CardOption.vue'
import GeoInput from '@/components/ui/GeoInput.vue'
import ResponseInput from '@/components/ui/ResponseInput.vue'

import schedule from "~/src/data/work-schedule.json";
import experience from "~/src/data/experience.json";
import education from "~/src/data/education.json";
import currency from "~/src/data/currency.json";

import { ref, onMounted } from 'vue';
import majors from "~/src/data/majors.json";

const ArrayCurrency = currency;
const ArrayEducation = education;
const ArrayExperience = experience;
const ArraySchedule = schedule;
const ArrayMajors = majors;

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

const isChecked = ref(false);
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
                            <MyCombobox />
                        </div>
                    </div>
                    <div class="w-full">
                        <p class="text-sm font-medium text-space">Выберите специализацию</p>
                        <div>
                            <MyCombobox />
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
                            <MyCheckbox id="dms" label="ДМС" v-model="isChecked" />
                            <MyCheckbox id="mobile" label="Мобильная связь" />
                            <MyCheckbox id="fitness" label="Фитнес" />
                            <MyCheckbox id="nutrition" label="Питание" />
                            <MyCheckbox id="coveralls" label="Спецодежда" />
                            <MyCheckbox id="trips" label="Командировки" />
                            <MyCheckbox id="car" label="Cлужебный автомобиль" />
                            <MyCheckbox id="moving" label="Помощь с переездом, проживание" />
                            <MyCheckbox id="none-registration" label="Без оформления по ТК" />
                        </div>
                    </MyAccordion>
                    <MyAccordion title="водительские права">
                        <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
                            <MyCheckbox id="A" label="A" />
                            <MyCheckbox id="B" label="B" />
                            <MyCheckbox id="C" label="C" />
                            <MyCheckbox id="D" label="D" />
                            <MyCheckbox id="E" label="E" />
                            <MyCheckbox id="M" label="M" />
                            <MyCheckbox id="BE" label="BE" />
                            <MyCheckbox id="TB" label="TB" />
                            <MyCheckbox id="DE" label="DE" />
                            <MyCheckbox id="CE" label="CE" />
                        </div>
                    </MyAccordion>
                    <MyAccordion title="дополнительные возможности">
                        <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
                            <MyCheckbox id="personal-car" label="Личный автомобиль" />
                            <MyCheckbox id="pensioners" label="Вакансия подходит для пенсионеров" />
                            <MyCheckbox id="international" label="Требуется загранпаспорт" />
                            <MyCheckbox id="weekend" label="Работа только по СБ и ВС" />
                            <MyCheckbox id="students" label="Вакансия подходит для студентов" />
                            <MyCheckbox id="temp" label="Возможно временное оформление" />
                            <MyCheckbox id="evening" label="Можно начинать после 16:00" />
                            <MyCheckbox id="teens" label="Вакансия подходит для соискателей от 14 лет" />
                            <MyCheckbox id="half" label="Можно работать сменами по 4-6 часов" />
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
                    <div>
                        <p class="text-sm font-medium text-space">Номер телефона</p>
                        <MyCheckbox id="show-contacts" label="Отображать контакты в вакансии" v-model="isChecked" />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-space">Email</p>
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
    </div>
</template>
