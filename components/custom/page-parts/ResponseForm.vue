<script setup>
import { ref, computed, watch } from 'vue'

import InputUpload from '~/components/custom/InputUpload.vue'
import ExpandableForm from '~/components/custom/ExpandableForm.vue'
import MyInput from '~/components/custom/MyInput.vue'
import PhoneInput from '~/components/custom/PhoneInput.vue'
import GeoInput from '~/components/custom/GeoInput.vue'
import MyTextarea from '~/components/custom/MyTextarea.vue'
import MyDropdown from '~/components/custom/MyDropdown.vue'
import CustomCalendar from '~/components/custom/CustomCalendar.vue'
import MyCheckbox from '~/components/custom/MyCheckbox.vue'
import UploadFileMin from '~/components/custom/UploadFileMin.vue'
import MultiSelect from '~/components/custom/MultiSelect.vue'
import ChooseTime from '~/components/custom/ChooseTime.vue'

import industry from '~/src/data/industry.json'

// Пропсы для поддержки v-model
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['update:modelValue', 'submit'])

// Реактивные данные формы
const educationData = ref(null)
const experienceData = ref(null)
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
const loadedResume = ref(null)
const selectedApps = ref([])
const timeReady = ref(null)
const fileLoad = ref(null)

// Вычисляемое свойство для объединения всех данных формы
const formData = computed(() => ({
    // Личная информация
    personalInfo: {
        fio: fio.value,
        email: mail.value,
        phone: phone.value,
        location: location.value,
        photo: photoLoad.value,
        education: educationData.value,
        experience: experienceData.value,
        resume: loadedResume.value
    },
    // Дополнительная информация
    additionalInfo: {
        animalResponse: animalResponse.value,
        lastExperience: lastExperience.value,
        internationalCommunity: internationalCommunity.value,
        selectedApps: selectedApps.value,
        timeReady: timeReady.value,
        dateReady: dateReady.value,
        dateEmployment: dateEmployment.value,
        dateDismissal: dateDismissal.value,
        portfolioLink: portfolioLink.value,
        fileLoad: fileLoad.value,
        checkboxes: {
            readyToWork: readyToWork.value,
            packageDocuments: packageDocuments.value,
            reliableInformation: reliableInformation.value
        }
    }
}))

// Отслеживание изменений и передача данных родителю
watch(formData, (newData) => {
    emit('update:modelValue', newData)
}, { deep: true })

// Обработчик отправки формы
const handleSubmit = () => {
    // Проверяем обязательные поля
    if (!fio.value.name || !fio.value.lastName || !mail.value) {
        alert('Пожалуйста, заполните обязательные поля: имя, фамилию и email')
        return
    }

    // Логируем данные в консоль
    console.log('=== ДАННЫЕ ФОРМЫ ===')
    console.log('Личная информация:', formData.value.personalInfo)
    console.log('Дополнительная информация:', formData.value.additionalInfo)
    console.log('Полные данные формы:', formData.value)

    // Эмитим событие submit с данными
    emit('submit', formData.value)
}

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

const appOptions = ref(['Figma', 'Sketch', 'Blender', 'Photoshop', 'Cinema 4D'])
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
            <div class="mb-5 grid gap-x-15px grid-cols-2">
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
            <div class="mb-[17px] grid gap-x-15px grid-cols-2">
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
            <div class="mb-[18px]">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Адрес
                    <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                    </span>
                </p>
                <geo-input class="mb-2.5" v-model="location" />
            </div>
            <div class="mb-[38px]">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Фотография
                    <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                    </span>
                </p>
                <InputUpload v-model="photoLoad" file-type="img" />
            </div>
            <div class="mb-22px">
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
                                <p class="text-lg font-medium text-space leading-130">{{ data.institution }}</p>
                                <p class="text-sm font-normal text-slate-custom leading-150 mt-8"
                                  v-if="data.faculty || data.speciality">{{ data.faculty }}<span
                                      v-if="data.faculty && data.speciality">, </span>{{ data.speciality }}</p>
                                <p class="text-sm font-normal text-slate-custom leading-150 mt-2.5"
                                  v-if="data.academic || (data.dateStart && data.dateFinish)">{{ data.academic
                                    }}<span v-if="data.academic && data.dateStart && data.dateFinish">, </span>
                                    <span v-if="data.dateStart && data.dateFinish">c {{ data.dateStart }} по {{
                                        data.dateFinish }}</span>
                                </p>
                            </div>
                        </template>
                    </ExpandableForm>
                </div>
            </div>
            <div class="mb-22px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Опыт
                    <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                    </span>
                </p>
                <div>
                    <ExpandableForm v-model="experienceData" initial-text="Добавить" :validation-rules="{
                        company: { required: true, message: 'Укажите организацию' }
                    }">
                        <template #form="{ data, errors, validateField }">
                            <div>
                                <div class="mb-15px">
                                    <p class="text-sm font-medium leading-150 text-space mb-15px"><span
                                          class="text-red-custom mr-1">*</span>Организация</p>
                                    <MyInput :placeholder="'Введите должность'" v-model="data.company"
                                      @blur="validateField('company')" />
                                    <span v-if="errors.company" class="error text-red-custom text-13px leading-130">
                                        {{ errors.company }}
                                    </span>
                                </div>
                                <div class="mb-15px">
                                    <p class="text-sm font-medium mb-15px">Регион<span
                                          class="text-13px text-slate-custom leading-130 ml-1">(не
                                            обязательно)</span></p>
                                    <MyInput :placeholder="'Укажите регион'" v-model="data.region" />
                                </div>
                                <div class="mb-15px">
                                    <p class="text-sm font-medium mb-15px">Укажите сайт<span
                                          class="text-13px text-slate-custom leading-130 ml-1">(не
                                            обязательно)</span></p>
                                    <MyInput :placeholder="'https://'" v-model="data.web" />
                                </div>
                                <div class="mb-15px">
                                    <p class="text-sm font-medium mb-15px">Укажите деятельность компании<span
                                          class="text-13px text-slate-custom leading-130 ml-1">(не
                                            обязательно)</span></p>
                                    <CustomDropdown :options="industry" placeholder="Выберите отрасль"
                                      v-model="data.selectedIndustry" />
                                </div>
                                <div class="mb-15px flex gap-x-15px justify-between">
                                    <div class="w-full">
                                        <p class="text-sm font-medium mb-15px">Дата начала<span
                                              class="text-13px text-slate-custom leading-130 ml-1">(не
                                                обязательно)</span></p>
                                        <CustomCalendar v-model="data.dateStart" class="mb-5" />
                                        <MyCheckbox :id="'now-time'" :label="'Работаю по настоящее время'"
                                          v-model="data.nowTime" />
                                    </div>
                                    <div v-if="!data.nowTime" class="w-full">
                                        <p class="text-sm font-medium mb-15px">Дата окончания<span
                                              class="text-13px text-slate-custom leading-130 ml-1">(не
                                                обязательно)</span></p>
                                        <CustomCalendar v-model="data.dateFinish" />
                                    </div>
                                </div>
                                <div class="mb-15px">
                                    <p class="text-sm font-medium mb-15px">Должность<span
                                          class="text-13px text-slate-custom leading-130 ml-1">(не
                                            обязательно)</span></p>
                                    <MyInput :placeholder="'Укажите должность'" v-model="data.position" />
                                </div>
                            </div>
                        </template>
                        <template #summary="{ data }">
                            <div>
                                <p class="text-lg font-medium text-space leading-130">{{ data.company }}</p>
                                <p class="text-sm font-normal text-slate-custom leading-150 mt-7"
                                  v-if="data.region || data.web">{{ data.region }}<span v-if="data.region && data.web">,
                                        <!-- <pre class="inline-block"> </pre> -->
                                    </span>
                                    <a :href="data.web" target="_blank" class="underline">
                                        {{ data.web }}
                                    </a>
                                </p>
                                <p class="text-sm font-normal text-slate-custom leading-150 mt-2.5">{{
                                    data.selectedIndustry }}</p>
                                <p class="text-sm font-normal text-slate-custom leading-150 mt-2.5"
                                  v-if="data.position || (data.dateStart && data.dateFinish)">{{ data.position
                                    }}<span v-if="data.position && data.dateStart && data.dateFinish">, </span>
                                    <span v-if="data.dateStart && data.dateFinish">c {{ data.dateStart }} по {{
                                        data.dateFinish }}</span>
                                </p>
                            </div>
                        </template>
                    </ExpandableForm>
                </div>
            </div>
            <div>
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Резюме
                    <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                    </span>
                </p>
                <UploadFileMin v-model="loadedResume" acceptedFiles="*" />
            </div>
        </div>
        <div class="bg-white rounded-fifteen p-25px pb-2.5 mb-15px">
            <p class="mb-38px text-space text-xl leading-130 font-semibold">
                Дополнительно
            </p>
            <div class="mb-38px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Как вы относитесь к животным?
                </p>
                <MyInput :placeholder="'Введите ваш ответ'" v-model="animalResponse" class="mb-25px" />
            </div>
            <div class="mb-32px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Опишите одним предложением ваш предыдущий опыт на работе?
                </p>
                <MyTextarea v-model="lastExperience" :maxHeight="100" :placeholder="'Введите ваш ответ'" />
            </div>
            <div class="mb-38px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Доводилось ли вам принимать участие в международных
                    конференциях?
                </p>
                <MyDropdown v-model="internationalCommunity" :defaultValue="'Выберите вариант ответа'"
                  :options="communityOptions" />
            </div>
            <div class="mb-38px">
                <p class="text-sm font-medium mb-4 leading-normal text-space">
                    Какими из перечисленных программ вы владеете?
                </p>
                <MultiSelect v-model="selectedApps" :options="appOptions" defaultValue="Выберите навыки" />
            </div>
            <div class="mb-35px">
                <p class="text-sm font-medium mb-5 leading-normal text-space">
                    Пожалуйста, укажите удобное для вас время начала рабочего
                    дня
                </p>
                <ChooseTime v-model="timeReady" />
            </div>
            <div class="mb-35px">
                <p class="text-sm font-medium leading-normal text-space mb-15px">
                    Пожалуйста, укажите дату удобного для вас дня стажировки
                </p>
                <CustomCalendar v-model="dateReady" :placeholder="'Введите дату'" />
            </div>
            <div class="mb-38px">
                <p class="text-sm font-medium text-space mb-15px leading-150">
                    Пожалуйста, укажите дата начала трудоустройства и дату
                    увольнения на последнем месте работы
                </p>
                <div class="flex gap-x-15px">
                    <CustomCalendar v-model="dateEmployment" :placeholder="'Выберите дату от'" />
                    <CustomCalendar v-model="dateDismissal" :placeholder="'Выберите дату до'" />
                </div>
            </div>
            <div class="mb-9">
                <p class="text-sm font-medium leading-normal text-space mb-4">
                    Пожалуйста, укажите ссылку на ваше портфолио
                </p>
                <MyInput v-model="portfolioLink" :placeholder="'https://'" />
            </div>
            <div class="mb-10">
                <p class="text-sm font-medium leading-normal text-space mb-17px">
                    Пожалуйста, загрузите файл вашей предыдущей работы
                </p>
                <InputUpload v-model="fileLoad" file-type="file" />
            </div>
            <div class="mb-15px">
                <p class="text-sm font-medium leading-normal text-space mb-4">
                    Пожалуйста, поставьте галочку на утверждениях из ниже представленных
                </p>
                <div class="flex gap-y-2.5 flex-col">
                    <MyCheckbox id="ready-to-work" label="Готов приступ к работе ближайшее время"
                      v-model="readyToWork" />
                    <MyCheckbox id="package-documents" label="У меня имеется весь пакет документов"
                      v-model="packageDocuments" />
                    <MyCheckbox id="reliable-information"
                      label="Вся информация предоставленная мной является достоверной" v-model="reliableInformation" />
                </div>
            </div>
        </div>
        <UiButton variant="action" size="semiaction" class="w-full uppercase min-h-[50px]" @click="handleSubmit">
            Отправить анкету
        </UiButton>
    </div>
</template>