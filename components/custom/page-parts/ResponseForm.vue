<script setup>
import { ref } from 'vue'

import InputUpload from '~/components/custom/InputUpload.vue'
import ExpandableForm from '~/components/custom/ExpandableForm.vue'
import MyInput from '~/components/custom/MyInput.vue'
import PhoneInput from '~/components/custom/PhoneInput.vue'
import GeoInput from '~/components/custom/GeoInput.vue'
import MyTextarea from '~/components/custom/MyTextarea.vue'
import MyDropdown from '~/components/custom/MyDropdown.vue'
import CustomCalendar from '~/components/custom/CustomCalendar.vue'
import MyCheckbox from '~/components/custom/MyCheckbox.vue'

const educationData = ref(null)
const fio = ref({ name: '', lastName: '' });
const mail = ref('')
const phone = ref('')
const location = ref('')
const photoLoad = ref('')
const animalResponse = ref('')
const lastExperience = ref('')
const internationalCommunity = ref('')
const dateReady = ref('')
const dateEmployment = ref('')
const dateDismissal = ref('')
const portfolioLink = ref('')
const readyToWork = ref(false)
const packageDocuments = ref(false)
const reliableInformation = ref(false)

const communityOptions = [
    {
        id: 1,
        name: 'Да',
    },
    {
        id: 2,
        name: 'Нет',
    },
    {
        id: 3,
        name: 'Нет, но очень хотелось бы',
    },
]

</script>

<template>
    <div>
        <div
          class="border border-science-opacity rounded-fifteen p-25px bg-zumthor mb-15px flex gap-x-25px items-center">
            <div>
                <p class="text-lg font-medium text-space leading-130 mb-5px">
                    Автозаполнение анкеты
                </p>
                <p class="text-13px font-normal text-slate-custom leading-130">
                    Сэкономьте время, импортировав резюме в одном из следующих
                    форматов: .pdf, .doc, .docx, .odt, rtf
                </p>
            </div>
            <UiButton variant="black" size="black" class="font-semibold">
                Загрузить резюме
            </UiButton>
        </div>
        <div class="bg-white rounded-fifteen p-25px mb-15px">
            <p class="mb-35px text-space text-xl leading-130 font-semibold">
                Личная информация
            </p>
            <div class="mb-15px grid gap-x-15px grid-cols-2">
                <div>
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                        <span class="text-red-custom">*</span>
                        Ваше имя
                    </p>
                    <MyInput :placeholder="'Фамилия Имя Отчество'" v-model="fio.name" />
                </div>
                <div>
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                        <span class="text-red-custom">*</span>
                        Ваша фамилия
                    </p>
                    <MyInput :placeholder="'Фамилия'" v-model="fio.lastName" />
                </div>
            </div>
            <div class="mb-15px grid gap-x-15px grid-cols-2">
                <div>
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                        <span class="text-red-custom">*</span>
                        Электронная почта
                    </p>
                    <MyInput :placeholder="'Введите email'" v-model="mail" />
                </div>
                <div>
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                        Контактный телефон
                    </p>
                    <PhoneInput v-model="phone" />
                </div>
            </div>
            <div class="mb-15px">
            </div>
            <div class="mb-15px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Адрес
                    <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                    </span>
                </p>
                <geo-input class="mb-2.5" v-model="location" />
            </div>
            <div class="mb-15px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Фотография
                    <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                    </span>
                </p>
                <InputUpload v-model="photoLoad" file-type="img" />
            </div>
            <div class="mb-15px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Образование
                    <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                    </span>
                </p>
                <div>
                    <ExpandableForm v-model="educationData" initial-text="Добавить" :validation-rules="{
                        institution: { required: true, message: 'Укажите учебное заведение' }
                    }">
                        <template #form="{ data, errors, validateField }">
                            <div>
                                <div class="mb-15px">
                                    <p class="text-sm font-medium leading-150 text-space mb-15px"><span
                                          class="text-red-custom mr-1">*</span>Образование</p>
                                    <MyInput :placeholder="'Введите учебное заведение'" v-model="data.institution"
                                      @blur="validateField('institution')" />
                                    <span v-if="errors.institution" class="error text-red-custom text-13px leading-130">
                                        {{ errors.institution }}
                                    </span>
                                </div>
                                <div class="mb-15px">
                                    <p class="text-sm font-medium mb-15px">Область обучения<span
                                          class="text-13px text-slate-custom leading-130 ml-1">(не
                                            обязательно)</span></p>
                                    <MyInput :placeholder="'Введите область обучения'" v-model="data.faculty" />
                                </div>
                                <div class="mb-15px">
                                    <p class="text-sm font-medium mb-15px">Специальность<span
                                          class="text-13px text-slate-custom leading-130 ml-1">(не
                                            обязательно)</span></p>
                                    <MyInput :placeholder="'Специальность'" v-model="data.speciality" />
                                </div>
                                <div class="mb-15px">
                                    <p class="text-sm font-medium mb-15px">Ученая степень<span
                                          class="text-13px text-slate-custom leading-130 ml-1">(не
                                            обязательно)</span></p>
                                    <MyInput :placeholder="'Введите ученую степень'" v-model="data.academic" />
                                </div>
                                <div class="grid grid-cols-2 gap-x-15px">
                                    <div>
                                        <p class="text-sm font-medium mb-15px">Дата начала<span
                                              class="text-13px text-slate-custom leading-130 ml-1">(не
                                                обязательно)</span></p>
                                        <CustomCalendar v-model="data.dateStart" />
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium mb-15px">Дата окончания<span
                                              class="text-13px text-slate-custom leading-130 ml-1">(не
                                                обязательно)</span></p>
                                        <CustomCalendar v-model="data.dateFinish" />
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #summary="{ data }">
                            <div>
                                <div>
                                    <p class="text-lg font-medium text-space leading-130">{{ data.institution }}</p>
                                    <p class="text-sm font-normal text-slate-custom leading-150 mt-8"
                                      v-if="data.faculty || data.speciality">{{ data.faculty }}<span
                                          v-if="data.faculty && data.speciality">, </span>{{ data.speciality }}</p>
                                    <p class="text-sm font-normal text-slate-custom leading-150 mt-2.5"
                                      v-if="data.academic || data.dateStart && data.dateFinish">{{ data.academic
                                    }}<span v-if="data.academic && data.dateStart && data.dateFinish">, </span>
                                        <span v-if="data.dateStart && data.dateFinish">c {{ data.dateStart }} по {{
                                            data.dateFinish }}</span>
                                    </p>
                                </div>
                            </div>
                        </template>
                    </ExpandableForm>
                </div>
            </div>
            <div class="mb-15px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Опыт
                    <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                    </span>
                </p>
                <div class="p-15px rounded-fifteen border border-athens-gray bg-zumthor">
                    Компонент с опытом
                </div>
            </div>
            <div>
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Резюме
                    <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                    </span>
                </p>
                <div class="p-15px rounded-fifteen border border-athens-gray bg-zumthor">
                    Компонент с резюме
                </div>
            </div>
        </div>
        <div class="bg-white rounded-fifteen p-25px mb-15px">
            <p class="mb-35px text-space text-xl leading-130 font-semibold">
                Дополнительно
            </p>
            <div class="mb-35px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Как вы относитесь к животным?
                </p>
                <MyInput :placeholder="'Введите ваш ответ'" v-model="animalResponse" class="mb-25px" />
            </div>
            <div class="mb-35px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Опишите одним предложением ваш предыдущий опыт на работе?
                </p>
                <MyTextarea v-model="lastExperience" :maxHeight="100" :placeholder="'Опишите ключевые требования'" />
            </div>
            <div class="mb-35px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Доводилось ли вам принимать участие в международных
                    конференциях?
                </p>
                <MyDropdown v-model="internationalCommunity" :defaultValue="'Выберите вариант ответа'"
                  :options="communityOptions" />
            </div>
            <div class="mb-35px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Какими из перечисленных программ вы владеете?
                </p>
                <div class="p-15px rounded-fifteen border border-athens-gray bg-zumthor">
                    Компонент с чекбоксами
                </div>
            </div>
            <div class="mb-35px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Пожалуйста, укажите удобное для вас время начала рабочего
                    дня
                </p>
                <div class="p-15px rounded-fifteen border border-athens-gray bg-zumthor">
                    Компонент с часами-минутами
                </div>
            </div>
            <div class="mb-35px">
                <p class="text-sm font-medium leading-normal text-space mb-15px">
                    Пожалуйста, укажите дату удобного для вас дня стажировки
                </p>
                <CustomCalendar v-model="dateReady" :placeholder="'Введите дату'" />
            </div>
            <div class="mb-35px">
                <p class="text-sm font-medium leading-normal text-space mb-15px">
                    Пожалуйста, укажите дата начала трудоустройства и дату
                    увольнения на последнем месте работы
                </p>
                <div class="flex gap-x-15px">
                    <CustomCalendar v-model="dateEmployment" :placeholder="'Выберите дату от'" />
                    <CustomCalendar v-model="dateDismissal" :placeholder="'Выберите дату до'" />
                </div>
            </div>
            <div class="mb-35px">
                <p class="text-sm font-medium leading-normal text-space mb-15px">
                    Пожалуйста, укажите ссылку на ваше портфолио
                </p>
                <MyInput v-model="portfolioLink" :placeholder="'https://'" />
            </div>
            <div class="mb-35px">
                <p class="text-sm font-medium leading-normal text-space mb-15px">
                    Пожалуйста, укажите ссылку на ваше портфолио
                </p>
                <div class="p-15px rounded-fifteen border border-athens-gray bg-zumthor">
                    Компонент с файлом с прошлой работы
                </div>
            </div>
            <div class="mb-15px">
                <p class="text-sm font-medium leading-normal text-space mb-15px">
                    Пожалуйста, поставьте галочку на утверждениях из ниже представленных
                </p>
                <div>
                    <MyCheckbox id="ready-to-work" label="Готов приступ к работе ближайшее время"
                      v-model="readyToWork" />
                    <MyCheckbox id="package-documents" label="У меня имеется весь пакет документов"
                      v-model="packageDocuments" />
                    <MyCheckbox id="reliable-information"
                      label="Вся информация предоставленная мной является достоверной" v-model="reliableInformation" />
                </div>
            </div>
            <UiButton variant="action" size="semiaction" class="w-full uppercase">Отправить анкету</UiButton>
        </div>
    </div>
</template>