<script setup>
import Autocomplete from '~/components/custom/Autocomplete.vue'
import MyInput from '~/components/custom/MyInput.vue'
import MyTooltip from '~/components/custom/MyTooltip.vue'
import TiptapEditor from '~/components/TiptapEditor.vue'
import MyDropdown from '~/components/custom/MyDropdown.vue'
import TagSelect from '~/components/custom/TagSelect.vue'
import MyAccordion from '~/components/custom/MyAccordion.vue'
import MyCheckbox from '~/components/custom/MyCheckbox.vue'
import SalaryRange from '~/components/custom/SalaryRange.vue'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { parseHtmlToJson } from '~/utils/htmlParser'
import CardOption from '@/components/custom/CardOption.vue'
import GeoInput from '@/components/custom/GeoInput.vue'
import ResponseInput from '@/components/custom/ResponseInput.vue'
import CheckboxGroup from '~/components/custom/CheckboxGroup.vue'
import PhoneInput from '~/components/custom/PhoneInput.vue'
import EmailInput from '~/components/custom/EmailInput.vue'
import CustomDropdown from '~/components/custom/CustomDropdown.vue'
import GenerateButton from '~/components/custom/GenerateButton.vue'

import schedule from '~/src/data/work-schedule.json'
import experience from '~/src/data/experience.json'
import education from '~/src/data/education.json'
import currency from '~/src/data/currency.json'
import AccordionAdditional from '~/src/data/accordion-additional.json'
import CarId from '~/src/data/car-id.json'
import MoreOptions from '~/src/data/more-options.json'
import industry from '~/src/data/industry.json'
import specialization from '~/src/data/specialization.json'

import { ref, onMounted, computed } from 'vue'
import { createVacancy } from '~/utils/createVacancy'
import { getPhrases, getVacancy } from '@/utils/getVacancies'
import { executorsList } from '~/utils/executorsList'
import { updateVacancy } from '~/utils/updateVacancy'
import majors from '~/src/data/majors.json'

const ArraySpecialization = specialization
const ArrayOptions = MoreOptions
const ArrayCarId = CarId
const ArrayAdditional = AccordionAdditional
const ArrayCurrency = currency
const ArrayEducation = education
const ArrayExperience = experience
const ArraySchedule = schedule
const ArrayMajors = majors
const ArrayIndustry = industry

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'create',
  }
})
console.log('type', props.type)

// const vacancyStore = useVacancyStore()
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
const selectedCard = ref(null)
const hoveredCard = ref(null)

const executors = ref([])

const handleCheck = id => {
  selectedCard.value = id
  workSpace.value = id
}

onBeforeMount(async () => {
    // получаем динамический список исполнителей
    const {executors: executorData} = await executorsList();
    executors.value = executorData
  // if (vacancyStore.isEditing && vacancyStore.editingVacancyId) {
  //   loadVacancyData(vacancyStore.editingVacancyId).then(() => {
  //     selectedCard.value = workSpace.value
  //     console.log(
  //       'Значение selectedCard после загрузки: ',
  //       selectedCard.value
  //     )
  //   })
  // }
})

const handleHover = id => {
  hoveredCard.value = id
}

const clearHover = () => {
  hoveredCard.value = null
}

const handleWorkSpaceUpdate = newValue => {
  selectedCard.value = newValue // Синхронизируем selectedCard с workSpace
}

const cards = [
  {
    id: '1',
    title: 'Офис',
    description: 'Сотрудники<br>работают в офисе',
  },
  {
    id: '2',
    title: 'Гибрид',
    description: 'Сотрудники работают как офисе,<br>так и дома',
  },
  {
    id: '3',
    title: 'Удаленно',
    description: 'Сотрудники<br>работают из дома',
  },
]

const showContacts = ref(true)
const salaryType = ref('')

// зависимости для отправки на сервер
const newVacancy = ref({place: 1, currency: 'RUB (рубль)'})
if (props.id) {
  const currectVacancy = await getVacancy(props.id)
  if (currectVacancy) {
    selectedCard.value = currectVacancy?.place.toString() || '1'
    for (let key in currectVacancy) {
      newVacancy.value[key] = currectVacancy[key]
    }
  }
  console.log('vacancy', newVacancy.value)
}
const editVacancyData = ref({}) 
const newCode = ref('')
const jobDescription = ref('')
// Автоматически форматируем перед отправкой
const formattedJobDescription = computed(() =>
  parseHtmlToJson(jobDescription.value)
)
const selectEmployment = ref('')
const selectedSpecialization = ref('')
const selectedIndustry = ref('')
const selectedSchedule = ref('')
const selectedExperience = ref('')
const selectedEducation = ref('')
const tags = ref([])
const selectedAdditional = ref([])
const selectedCarId = ref([])
const selectedOptions = ref([])
const salary = ref({ 
  from: newVacancy.value.salary_from ? newVacancy.value.salary_from : null, 
  to: newVacancy.value.salary_to ? newVacancy.value.salary_to : null 
})
const currencyType = ref('RUB (рубль)')
const workSpace = ref('1')
const location = ref('')
const response = ref('')
const phone = ref(null)
const email = ref('')
const errors = ref({})
const { data, error} = await getPhrases()
tags.value = data;


const descriptionText = computed(() => {
  return formattedJobDescription.value
    .reduce((acc, section) => {
      return acc + `${section.title} ${section.items.join(' ')} `
    }, '')
    .trim() // Убираем лишний пробел в конце
})

const tagsString = computed(() => {
  return tags.value.join(' ') || ''
})

const vacancyData = computed(() => {
  return {
    name: newVacancy.value,
    code: newCode.value,
    description: descriptionText.value,
    industry: selectedIndustry.value,
    specializations: selectedSpecialization.value,
    employment: selectEmployment.value,
    schedule: selectedSchedule.value,
    experience: selectedExperience.value,
    education: selectedEducation.value,
    phrases: tagsString.value,
    conditions: selectedAdditional.value, // массив
    drivers: selectedCarId.value, // массив
    additions: selectedOptions.value, // массив
    salary_from: salary.value.from,
    salary_to: salary.value.to,
    currency: currencyType.value,
    place: workSpace.value,
    location: location.value,
    customer_id: 10,
    customer_phone: phone.value,
    customer_email: email.value,
  }
})

const validateVacancy = () => {
  let errorsValid = true;
  if (!newVacancy.value.name) {
    errors.value.name = 'Поле обязательно к заполнению'
    errorsValid = false
  } else {
    if (errors.value.name) delete errors.value.name
  }

  if (!newVacancy.value.description) {
    errors.value.description = 'Поле обязательно к заполнению'
    errorsValid = false
  } else {
    if (errors.value.description) delete errors.value.description
  }

  if (newVacancy.value.salary_from && newVacancy.value.salary_to) {
    if (newVacancy.value.salary_from > newVacancy.value.salary_to) {
      errors.value.salary = 'Зарплата от должна быть меньше зарплаты до'
      errorsValid = false
    }
  }

  if (!errorsValid && errors.value.response) {
    delete errors.value.response
  }

  return errorsValid
}

const updateVacancyHandler = async id => {
  try {
    const { data, error } = await updateVacancy(id, vacancyData.value)

    if (data) {
      console.log('Успех обновления:', data.message)
      // vacancyStore.resetEditing()
    } else if (error) {
      const status = error.status
      const message = error.data?.message || error.message
      if (status === 409) {
        console.warn('Конфликт:', message)
      } else if (status === 422) {
        console.error('Ошибка валидации:', message)
      } else {
        console.error('Ошибка сервера:', message)
      }
    }
  } catch (error) {
    console.error('Ошибка сети:', error.message)
  }
}

async function saveVacancy() {
  if (validateVacancy()) {
     console.log('data', newVacancy.value)
    console.log('edit data', editVacancyData.value)
    const { data: response, error} = props.type === 'edit' 
      ? await updateVacancy(props.id, editVacancyData.value) 
      : await createVacancy(newVacancy.value)
    console.log('ответ создания вакансии', response)
    console.log('ошибка создания вакансии', error)
    if (response == null) {
      switch (error.status) {
        case 409:
          errors.value.response = 'Вакансия с таким названием/кодом уже существует'
          break
        case 422:
          errors.value.response = 'Ошибка валидации вакансии'
          break
        default:
          errors.value.response = 'Произошла ошибка при создании вакансии'
          break
      }
    } else {
      await navigateTo('/vacancies')
    }
  }
}

const updateEvent = (data, property) => {
  if (props.type === 'edit') {
    editVacancyData.value[property] = data
  } else {
    newVacancy.value[property] = data
    alert('update newVacancy')
  }
}


const updateTags = (data) => {
  if (data.length > 0) {
    const phrases = []
    data.forEach((item, key) => {
      phrases.push(item.id)
    })
    if (props.type === 'edit') {
      editVacancyData.value.phrases = phrases
    } else {
      newVacancy.value.phrases = phrases
    }
    
  } else {
    if (props.type === 'edit') {
      if (editVacancyData.value.phrases)
      delete editVacancyData.value.phrases
    } else {
      if (newVacancy.value.phrases) 
    delete newVacancy.value.phrases
    }
  }
}

const updateDataSalary = (objSalary, type, value) => {
  if (type == 'from') {
    if (value) {
      objSalary.salary_from = value
    } else {
      delete objSalary.salary_from
    }
    
  } else {
    if (value) {
      objSalary.salary_to = value
    } else {
      delete objSalary.salary_to
    }
  }
}
const updateSalary = (type, value) => {
  if (props.type === 'edit') {
    updateDataSalary(editVacancyData.value, type, value)
  } else {
    updateDataSalary(newVacancy.value, type, value)
  }
}

const updateExecutor = (value, id) => {
  if (id == null) {
    if (value == '') {
      delete newVacancy.value.executor_name
    } else {
      newVacancy.value.executor_name = value
    }
    delete newVacancy.value.executor_id
  } else {
    newVacancy.value.executor_id = id
  }
}


</script>

<template>
  <div class="container pb-10">
    <div class="flex gap-x-[24px] pt-48">
      <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
        <p class="text-space text-xl font-semibold mb-8">Основная информация</p>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              <span class="text-red-custom">*</span>
              Название должности
            </p>
            <Autocomplete 
              :source="ArrayMajors" 
              :model-value="newVacancy.name ? newVacancy.name : ''" 
              @update:model-value="$event => updateEvent($event, 'name')"
              placeholder="Например, Менеджер по продажам" class="mb-11px" />
              <div v-if="errors.name" class="text-red-500 text-xs mt-1">
                  {{ errors.name }}
              </div>
            <p class="text-xs text-bali">
              Осталось 80 символов. Специальных символов нет.
            </p>
          </div>
          <div class="w-full">
            <div class="flex">
              <p class="text-sm font-medium mb-4 leading-normal text-space mr-[3px]">
                Код вакансии
              </p>
              <span>
                <svg-icon name="question" width="20" height="20" />
                <MyTooltip
                  text="Каждая вакансия получает свой уникальный код, что позволяет точно идентифицировать её в системе и избежать путаницы, особенно при работе с большим количеством вакансий." />
              </span>
            </div>
            <div class="max-w-400px">
              <MyInput 
                :placeholder="'Код вакансии'" 
                type="string" 
                :model-value="newVacancy.code ? newVacancy.code : ''" 
                @update:model-value="$event => updateEvent($event, 'code')"
              />
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="w-full flex justify-between">
            <p class="text-sm font-medium text-space">
              <span class="text-red-custom">*</span>
              Описание вакансии
            </p>
            <generate-button />
          </div>
        </div>
        <div class="mt-15px mb-3.5">
          <TiptapEditor 
              :model-value="newVacancy.description ? newVacancy.description : ''" 
              @update:model-value="(value) => updateEvent(value, 'description')"
            />
        </div>
        <div id v-if="errors.description" class="text-red-500 text-xs mt-1">
                  {{ errors.description }}
        </div>
        <p class="text-xs text-bali font-normal">
          Максимум 700 символов. Использовано 0 символов.
        </p>
      </div>
      <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
        <p class="text-space leading-[17px] text-13px font-normal">
          Ваша заявка на&nbsp;размещение вакансии
          на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках находиться
          в&nbsp;стадии рассмотрения. Эта вакансия уже опубликована
          на&nbsp;вашей странице вакансий. Процесс утверждения займет
          до&nbsp;4&nbsp;часов.
        </p>
      </div>
    </div>
    <div class="flex gap-x-[24px] pt-3.5">
      <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
        <p class="text-space text-xl font-semibold mb-[31px]">
          Подробности о компании
        </p>
        <div class="flex justify-between gap-25px">
          <div class="w-full">
            <p class="text-sm font-medium text-space mb-3.5">
              Отрасль компании
            </p>
            <div class="w-full relative">
              <CustomDropdown 
                :options="ArrayIndustry" 
                placeholder="Выберите отрасль" 
                :model-value="newVacancy.industry ? newVacancy.industry : ''" 
                @update:model-value="$event => updateEvent($event, 'industry')"
              />
            </div>
          </div>
          <div class="w-full">
            <p class="text-sm font-medium text-space mb-3.5">
              Выберите специализацию
            </p>
            <div>
              <CustomDropdown 
                :options="ArraySpecialization" 
                placeholder="Выберите специализацию"
                :model-value="newVacancy.specializations? newVacancy.specializations : ''" 
                @update:model-value="$event => updateEvent($event, 'specializations')"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
        <p class="text-space leading-[17px] text-13px font-normal">
          Ваша заявка на&nbsp;размещение вакансии
          на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках находиться
          в&nbsp;стадии рассмотрения. Эта вакансия уже опубликована
          на&nbsp;вашей странице вакансий. Процесс утверждения займет
          до&nbsp;4&nbsp;часов.
        </p>
      </div>
    </div>
    <div class="flex gap-x-[24px] pt-3.5">
      <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
        <p class="text-space text-xl font-semibold mb-[31px]">
          Подробности вакансии
        </p>
        <div class="flex justify-between gap-25px mb-3.5">
          <div class="w-full">
            <p class="text-sm font-medium text-space mb-3.5">Тип занятости</p>
            <my-dropdown 
              :defaultValue="'Тип занятости'" 
              :options="options" 
              :model-value="newVacancy.employment ? newVacancy.employment : ''"
              @update:model-value="$event => updateEvent($event, 'employment')"
            />
          </div>
          <div class="w-full">
            <p class="text-sm font-medium text-space mb-3.5">График работы</p>
            <my-dropdown 
              :defaultValue="'График работы'" 
              :options="ArraySchedule" 
              :model-value="newVacancy.schedule ? newVacancy.schedule : ''"
              @update:model-value="$event => updateEvent($event, 'schedule')" 
            />
          </div>
        </div>
        <div class="flex justify-between gap-25px mb-3.5">
          <div class="w-full">
            <p class="text-sm font-medium text-space mb-3.5">Опыт работы</p>
            <my-dropdown 
              :defaultValue="'Опыт работы'" 
              :options="ArrayExperience" 
              :model-value="newVacancy.experience ? newVacancy.experience : ''"
              @update:model-value="(value) => updateEvent(value, 'experience')" 
            />
          </div>
          <div class="w-full">
            <p class="text-sm font-medium text-space mb-3.5">Образование</p>
            <my-dropdown 
              :defaultValue="'Образование'" 
              :options="ArrayEducation" 
              :model-value="newVacancy.education ? newVacancy.education : ''"
              @update:model-value="(value) => updateEvent(value, 'education')"
            />
          </div>
        </div>
        <div class="w-full mb-9 max-w-input">
          <p class="text-sm font-medium text-space mb-13px">Ключевые фразы</p>
          <tag-select 
            :options="tags"
            :model-value="newVacancy.phrases ? newVacancy.phrases : []"
            @update:model-value="$event => updateTags($event)" 
            @delete="$event => updateTags($event)"
          />
        </div>
        <div class="w-fit">
          <MyAccordion title="дополнительные условия" class="mb-15px">
            <div class="flex flex-col flex-wrap max-h-40 gap-x-25px gap-y-15px">
              <CheckboxGroup 
                :model-value="newVacancy.conditions"
                :options="ArrayAdditional" 
                @update:model-value="(value) => updateEvent(value, 'conditions')"
              />
            </div>
          </MyAccordion>
          <MyAccordion title="водительские права" class="mb-15px">
            <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
              <CheckboxGroup 
                v-model="newVacancy.drivers" 
                :options="ArrayCarId" 
                @update:model-value="(value) => updateEvent(value, 'drivers')"
              />
            </div>
          </MyAccordion>
          <MyAccordion title="дополнительные пожелания">
            <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
              <CheckboxGroup 
                v-model="newVacancy.additions" 
                :options="ArrayOptions" 
                @update:model-value="(value) => updateEvent(value, 'additions')"
              />
            </div>
          </MyAccordion>
        </div>
      </div>
      <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
        <p class="text-space leading-[17px] text-13px font-normal">
          Ваша заявка на&nbsp;размещение вакансии
          на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках находиться
          в&nbsp;стадии рассмотрения. Эта вакансия уже опубликована
          на&nbsp;вашей странице вакансий. Процесс утверждения займет
          до&nbsp;4&nbsp;часов.
        </p>
      </div>
    </div>
    <div class="flex gap-x-[24px] pt-3.5">
      <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
        <p class="text-space text-xl font-semibold mb-[31px]">
          Заработная плата
        </p>
        <div class="flex justify-between gap-25px">
          <div class="w-full">
            <p class="text-sm font-medium text-space mb-3.5">
              Заработная плата / мес
            </p>
            <SalaryRange 
              class="mb-4" 
              :model-value="salary" 
              :from="salary.from"
              :to="salary.to"
              @update:model-value="updateSalary"
            />
            <div v-if="errors.salary" class="text-red-500 text-xs mt-1">
                  {{ errors.salary }}
            </div>
            <div>
              <RadioGroup 
                default-value="past-cash" 
                class="flex gap-[18px]" 
                v-model="salaryType"
              >
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
            <my-dropdown 
              :defaultValue="'Валюта'" 
              :options="ArrayCurrency" 
              :selected="0" 
              :model-value="newVacancy.currency"
              @update:model-value="(value) => updateEvent(value, 'currency')"
            />
          </div>
        </div>
      </div>
      <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
        <p class="text-space leading-[17px] text-13px font-normal">
          Ваша заявка на&nbsp;размещение вакансии
          на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках находиться
          в&nbsp;стадии рассмотрения. Эта вакансия уже опубликована
          на&nbsp;вашей странице вакансий. Процесс утверждения займет
          до&nbsp;4&nbsp;часов.
        </p>
      </div>
    </div>
    <div class="flex gap-x-[24px] pt-3.5">
      <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
        <p class="text-space text-xl font-semibold mb-[33px]">Место работы</p>
        <div class="mb-[23px]">
          <RadioGroup default-value="1" class="flex gap-x-15px w-full" v-model="selectedCard"
            @update:model-value="$event => updateEvent($event, 'place')">
            <CardOption v-for="card in cards" 
              :key="card.id" 
              :id="card.id" 
              :title="card.title"
              :description="card.description" 
              :selectedCard="selectedCard" 
              :hoveredCard="hoveredCard"
              @update:selected="handleCheck" 
              @hover="handleHover" 
              @leave="clearHover" 
            />
          </RadioGroup>
        </div>
        <p class="text-sm font-medium text-space mb-15px">Локация офиса</p>
        <geo-input 
          class="mb-2.5" 
          :model-value="newVacancy.location"
          @update:model-value="$event => updateEvent($event, 'location')"
        />
        <p class="leading-normal text-xs text-bali font-normal">
          Укажите расположение офиса для нового сотрудника.
        </p>
      </div>
      <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
        <p class="text-space leading-[17px] text-13px font-normal">
          Ваша заявка на&nbsp;размещение вакансии
          на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках находиться
          в&nbsp;стадии рассмотрения. Эта вакансия уже опубликована
          на&nbsp;вашей странице вакансий. Процесс утверждения займет
          до&nbsp;4&nbsp;часов.
        </p>
      </div>
    </div>
    <div class="flex gap-x-[24px] pt-3.5 mb-25px">
      <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
        <p class="leading-normal text-space text-xl font-semibold mb-[33px]">
          Контактная информация
        </p>
        <p class="text-sm font-medium text-space mb-16px">Контактное лицо</p>
        <response-input 
          class="mb-6 w-full max-w-input" 
          :responses="executors" 
          :model-value="newVacancy.executor_name" 
          @input:modelValue="$event => updateEvent($event, 'executor_name')"
          @update:modelValue="$event => updateEvent($event, 'executor_name')"
        />
        <div class="w-full flex justify-between gap-x-[25px]">
          <div class="w-full max-w-[400px]">
            <p class="text-sm font-medium text-space leading-normal mb-4">
              Номер телефона
            </p>
            <phone-input 
              :model-value="newVacancy.executor_phone" 
              @update:model-value="$event => updateEvent($event, 'executor_phone')" 
              class="mb-25px" 
            />
            <MyCheckbox :id="'show-contacts'" :label="'Отображать контакты в вакансии'" v-model="showContacts" />
          </div>
          <div class="w-full">
            <p class="text-sm font-medium text-space leading-normal mb-4">
              Email
            </p>
            <email-input 
              :model-value="newVacancy.executor_email" 
              @update:model-value="$event => updateEvent($event, 'executor_email')" 
            />
          </div>
        </div>
      </div>
      <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
        <p class="text-space leading-[17px] text-13px font-normal">
          Ваша заявка на&nbsp;размещение вакансии
          на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках находиться
          в&nbsp;стадии рассмотрения. Эта вакансия уже опубликована
          на&nbsp;вашей странице вакансий. Процесс утверждения займет
          до&nbsp;4&nbsp;часов.
        </p>
      </div>
    </div>
    <UiButton @click="saveVacancy" variant="action" size="semiaction" class="font-semibold">
      Сохранить и продолжить
    </UiButton>
    <div v-if="errors.response" class="text-red-500 text-xs mt-1">
      {{ errors.response }}
    </div>
  </div>
</template>

<style scoped>
.max-w-input {
  max-width: calc(50% - 12.5px);
}
</style>
