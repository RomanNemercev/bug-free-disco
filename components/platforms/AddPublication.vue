<template>
  <div class="container p-0">
    <div class="flex gap-x-[24px]">
      <div class="max-w-[875px] flex-grow bg-white rounded-fifteen">
        <p class="text-space text-xl font-semibold">Новая публикация</p>
        <div class="mb-25px mt-25px border-t"></div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Доступные источники
            </p>
            <DropDownList 
            :options="platforms" 
            v-model="data.platform"
            :selected="data.platform"
            @update:model-value="$event => changePlatform($event)"
            ></DropDownList>
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Баланс публикаций:
            </p>
            <DropDownTypes 
            :options="platforms[0]?.types"
            :selected="data.billing_types"
            @update:model-value="$event => changeBalance($event)"
            ></DropDownTypes>
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Дней всего
            </p>
            <MyInput
                placeholder="Введите число дней"
                v-model="data.days"
                :type="'Number'"
                :readonly="true"
            />
          </div>
        </div>
        <div class="mb-25px mt-25px border-t"></div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              <span class="text-red-custom">*</span>
              Название должности
            </p>
            <MyInput
                placeholder="Например, Менеджер по продажам"
                v-model="data.name"
            />
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Код вакансии
            </p>
            <MyInput
                placeholder="Код вакансии"
                v-model="data.code"
                @update:model-value="$event => updateEvent($event, 'code')"
            />
          </div>
        </div>
        <div class="w-full">
          <div class="w-full flex justify-between">
            <p class="text-sm font-medium text-space mb-4">
              <span class="text-red-custom">*</span>
              Описание вакансии
            </p>
          </div>
          <GenerateButton></GenerateButton>
          <div class="mt-15px mb-25px">
          <TiptapEditor 
            v-model="data.description" 
            class="mb-15px" 
            @update:model-value="$event => updateEvent($event, 'description')"
          />
          <p class="text-xs text-bali font-normal">
            Максимум 700 символов. Использовано 0 символов.
          </p>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Отрасль компании
            </p>
            <DropDownRoles 
            :options="currectRole"
            :selected="data.industry ?? ''"
            @update:model-value="$event => updateIndustry($event)"
            ></DropDownRoles>
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Выберите специализацию
            </p>
            <DropDownRoles
            :options="currectRole[data.industry.key]?.roles"
            :selected="data.professional_roles[0]"
            v-model="data.professional_roles[0]"
            @update:model-value="$event => updateRoles($event)"
            ></DropDownRoles>
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Тип занятости
            </p>
            <DropDownTypes 
            :options=HH_EMPLOYMENT_TYPES
            :selected="data.employment_form"
            v-model="data.employment_form"
            ></DropDownTypes>
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              График работы
            </p>
            <DropDownTypes 
            :options=HH_WORKING_HOURS
            :selected="data.work_schedule_by_days"
            v-model="data.work_schedule_by_days"
            ></DropDownTypes>
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Образование
            </p>
            <DropDownTypes 
            :options=HH_EDUCATION_LAVEL
            :selected="data.education_level"
            v-model="data.education_level"
            ></DropDownTypes>
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Опыт работы
            </p>
            <DropDownTypes 
            :options=experience
            :selected="data.experience"
            v-model="data.experience"
            ></DropDownTypes>
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Ключевые фразы
            </p>
            <tag-select :options="phrases" :model-value="data.phrases ? data.phrases : []"
            @update:model-value="$event => updateTags($event)" @delete="$event => updateTags($event)" />
          </div>
        </div>
        <div class="w-fit mb-25px">
          <MyAccordion title="дополнительные условия" class="mb-15px">
            <div class="flex flex-col flex-wrap max-h-40 gap-x-25px gap-y-15px">
              <CheckboxGroup  model-value='' :options="ArrayAdditional" />
            </div>
          </MyAccordion>
          <MyAccordion title="водительские права" class="mb-15px">
            <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
              <CheckboxGroup  
                v-model="data.driver_license_types" 
                :options="ArrayCarId" 
                @update:model-value="($event, data) => updateEvent($event, 'driver_license_types', data)"
              />
            </div>
          </MyAccordion>
          <MyAccordion title="дополнительные пожелания">
            <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
              <CheckboxGroup  :m-value=null :options="ArrayOptions"/>
            </div>
          </MyAccordion>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Заработная плата / мес
            </p>
            <div class="flex items-center gap-[10px]">
              <!-- <div class="w-full">
                <MyInput
                placeholder="От"
                type="Number"
                v-model="data.salary_range?.from"
                @update:model-value="$event => updateEvent($event, 'salary_range.from')"
                />
              </div> -->
              <!-- <div class="w-full">
                <MyInput
                placeholder="До"
                type="Number"
                v-model="data.salary_range?.to"
                /> 
              </div>-->
            </div>
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Валюта
            </p>
            <my-dropdown :defaultValue="'Валюта'" :options="ArrayCurrency" :selected="0"
              :initialValue="null"/>
          </div>
        </div>
        <RadioGroup default-value="past-cash" class="flex gap-[18px] mb-25px" v-model="salaryType">
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
        <div class="w-full justify-between flex gap-25px mb-6">
           <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Место работы
            </p>
            <RadioGroup default-value="1" class="flex gap-x-15px w-full" >
              <CardOption v-for="card in cards" 
                  :key="card.id" 
                  :id="card.id"
                  :title="card.title"
                  :description="card.description"  :hoveredCard="hoveredCard"
                  :selectedCard="data.workSpace"
                  @update:selected="handleCheck" @hover="handleHover" @leave="clearHover" 
              />
            </RadioGroup>
           </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
           <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Локация офиса
            </p>
            <p class="leading-normal text-xs text-bali font-normal">
              Укажите расположение офиса для нового сотрудника.
             </p>
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-25px">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Контактное лицо
            </p>
            <MyInput
                placeholder="Ответственный"
                type="String"
            />
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Номер телефона
            </p>
            <PhoneInput 
              :model-value="null"
            />
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
             <MyCheckbox :id="'show-contacts'" :label="'Отображать контакты в вакансии'" />
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
             <MyCheckbox 
               id="show-contacts" 
               label="Сохранить в черновике" 
               v-model="isDraft" 
               @update:model-value="$event => (isDraft = $event)"
             />
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <UiButton @click="savePublication" variant="action" size="semiaction" class="font-semibold">
              Опубликовать
            </UiButton>
            <div class="status" v-if="status">
              {{ status }}
            </div>
          </div>
          <div class="w-full flex justify-end">
            <UiButton variant="semiaction" size="semiaction" class="text-space">
              Отмена
            </UiButton>
          </div>
        </div>
      </div>   
      </div>
    </div>
  </div>
</template>
<script setup>
import DropDownList from './DropDownList.vue';
import DropDownTypes from './DropDownTypes.vue';
import DropDownRoles from './DropDownRoles.vue';
import MyDropdown from '~/components/custom/MyDropdown.vue';
import MyInput from '~/components/custom/MyInput.vue';
import MyCheckbox from '~/components/custom/MyCheckbox.vue';
import TiptapEditor from '~/components/TiptapEditor.vue';
import GenerateButton from '../custom/GenerateButton.vue';
import MyAccordion from '~/components/custom/MyAccordion.vue';
import CheckboxGroup from '~/components/custom/CheckboxGroup.vue';
import TagSelect from '~/components/custom/TagSelect.vue'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import CardOption from '~/components/custom/CardOption.vue';
import { getPhrases } from '@/utils/getVacancies'
import PhoneInput from '~/components/custom/PhoneInput.vue';
import MoreOptions from '~/src/data/more-options.json'
import CarId from '~/src/data/car-id.json'
import AccordionAdditional from '~/src/data/accordion-additional.json'
import currency from '~/src/data/currency.json'
import { 
  PLATFORM_PROPERTIES, 
  HH_EMPLOYMENT_TYPES, 
  HH_WORKING_HOURS, 
  HH_EDUCATION_LAVEL 
} from '@/src/constants'
import experience from '~/src/data/experience.json'
import { inject } from 'vue'
import { 
  getProfile as profileHh, 
  getAvailableTypes as typesHh, 
  addDraft as addDraftHh,
  getRoles as getRolesHh
} from '@/utils/hhAccount'
import { getVacancy } from '@/utils/getVacancies';
import { useRoute } from 'vue-router'

const platforms = ref(inject('platformsGlobal'))
const isPlatforms = ref(inject('isPlatforms'))
const vacancyData = inject('vacancyCurrect')
const currectRole = ref(null)
const roleData = ref(null)
const status = ref(null)
const route = useRoute();
const isDraft = ref(true)
console.log('current vacancy - ', vacancyData);
const phrases = ref(null)
const data = ref({})
data.value.days = "30"
data.value.workSpace = '1'
data.value.areas = [{"id":"1"}]
data.value.salary_range = {}
data.value.professional_roles = [null]
data.value.employment_form = null
data.value.work_schedule_by_days = ref(null)
data.value.education_level = ref(null)
data.value.experience = ref(null)
data.value.driver_license_types = ref(null)

const { roles, errorRoles } = await getRolesHh()
if (!errorRoles) {
  currectRole.value = roles.categories
}

const vacancyId = route.query.id
const globCurrentVacancy = ref(inject('vacancyCurrect'))
if (vacancyId) {
  if (!globCurrentVacancy.value || vacancyId !== globCurrentVacancy.value.id.toString()) {
    
    const  vacancy = await getVacancy(vacancyId)
    if (vacancy) {
      globCurrentVacancy.value = vacancy
    }
  }
}

const getPhrasesVacancy = async function() {
  const { data, error } = await getPhrases()
  return data
}

phrases.value = await getPhrasesVacancy()

if (globCurrentVacancy.value) {
  for (const key in PLATFORM_PROPERTIES[data.value.platform]) {
    data.value[key] = globCurrentVacancy.value[key]
  }

  if (globCurrentVacancy.value['salary_from']) {
      data.value.salary_range.from = globCurrentVacancy.value['salary_from']
  }
  if (globCurrentVacancy.value.salary_to) {
      data.value.salary_range.to = globCurrentVacancy?.value?.salary_to
  }
  if (globCurrentVacancy.value.schedule) {
    data.value.work_schedule_by_days = HH_WORKING_HOURS.find((item) => item.name == globCurrentVacancy.value.schedule)
  }
  if (globCurrentVacancy.value.education) {
    data.value.education_level = HH_EDUCATION_LAVEL.find((item) => item.name == globCurrentVacancy.value.education)
  }
  if (globCurrentVacancy.value.education) {
    data.value.experience = experience.find((item) => item.name == globCurrentVacancy.value.experience)
  }
  if (globCurrentVacancy.value.phrases) {
    data.value.phrases = globCurrentVacancy.value.phrases
  }
  if (globCurrentVacancy.value.drivers) {
    data.value.driver_license_types = globCurrentVacancy.value.drivers
  }
  data.value.salary_range.currency = 'RUR'
  data.value.salary_range.gross = true
}

data.value.salary_range = {}
if (vacancyData.value) {
  data.value.name = vacancyData.value.name
  data.value.code = vacancyData.value.code
  data.value.description = vacancyData.value.description
  data.value.industry = currectRole.value.filter(function (n, index) {
    n.key = index
    return n.name == vacancyData.value.industry
  })[0]
  if (data.value.industry !== undefined && data.value.industry.length == 0) {
    data.value.professional_roles[0] = data.value.industry.roles.filter(function (n) {
      return n.name == vacancyData.value.specializations
    })
  }
  
  if (data.value.professional_roles.length == 0) {
    roleData.value = data.value.industry.roles[0]
    data.value.professional_roles[0] = data.value.industry.roles[0]
  }
}

data.value.employment_form = HH_EMPLOYMENT_TYPES.filter( (item, i) => {
      return item.siteName == globCurrentVacancy.value?.employment
})[0]

if (!inject('isPlatforms')) {
    const { data, error } = await profileHh()
    if (!error) {
      platforms.value[0].isAuthenticated = true
      platforms.value[0].data = {email: data.data.email }
    }
    const { types, errorTypes } = await typesHh(data.data.employer.id, data.data.manager.id)
      if (!error && !errorTypes) {
        platforms.value[0].types = types
      }
}

for (let key of platforms.value) {
    if (!isPlatforms.value) {
        if (key.platform == 'hh') {
          const profile = await profileHh()  
          if (!profile.error) {
            key.isAuthenticated = true
            key.data = profile.data.data
            isPlatforms.value = true
            data.value.billing_types = key.types ? key.types[6] : null
            console.log('types - ', key['types'])
          }
        }
        data.value.platform = key
    }
}

const ArrayAdditional = ref(AccordionAdditional)
const ArrayOptions = ref(MoreOptions)
const ArrayCarId = ref(CarId)
const ArrayCurrency = ref(currency)

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

const selectedCard = ref(null)
const hoveredCard = ref(null)

const workSpace = ref('1')

const handleCheck = id => {
  selectedCard.value = id
  workSpace.value = id
}

const handleHover = id => {
  hoveredCard.value = id
}

const clearHover = () => {
  hoveredCard.value = null
}

const handleWorkSpaceUpdate = newValue => {
  selectedCard.value = newValue 
}

const savePublication = async () => {
  status.value = ''
  if (data.value.platform.platform === 'hh') { 
    const { draft, errorDraft} = await addDraftHh(data.value);
    console.log('savePublication', data.value);
    if (!errorDraft) {
      status.value = 'Вакансия успешно опубликована'
    } else {
      status.value = errorDraft
    }
  }
}

const changeBalance = (value) => {
  data.value.billing_types = value.vacancy_billing_type
}

const updateIndustry = (value) => {
  data.value.industry = value
  roleData.value = null
  console.log('role', roleData.value)
  data.value.professional_roles[0] = value.roles ? value.roles[0] : null
}

const  updateRoles = (value) => {
  // data.value.industry = value
}

const changePlatform = (value) => {
  data.value.platform = value.platform
}

const updateEvent = (event, property, data) => {
  console.log('event', event, property, data)
  // data.value[property] = event
}

const updateTags = (el) => {
  if (el.length > 0) {
    const phrases = []
    el.forEach((item, key) => {
      phrases.push(item.id)
    })
    data.value.phrases = phrases

  } else {
    if (data.value.phrases)
        delete data.value.phrases
    }
}

onBeforeMount(async () => {
})

</script>