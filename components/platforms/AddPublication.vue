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
            :v-model="data.platform"
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
          <TiptapEditor v-model="data.description" class="mb-15px" />
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
            :options="roles"
            :selected="currectRole"
            v-model="currectRole"
            ></DropDownRoles>
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Выберите специализацию
            </p>
            <DropDownRoles 
            :options="currectRole?.roles"
            :selected="currectRole?.roles[0]"
            v-model="data.professional_roles[0]"
            ></DropDownRoles>
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Тип занятости
            </p>
            <DropDownTypes 
            :options="[]"
            ></DropDownTypes>
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              График работы
            </p>
            <MyInput
                placeholder="Введите число дней"
                :type="'Number'"
            />
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Образование
            </p>
            <MyInput
                placeholder="Например, Менеджер по продажам"
            />
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Опыт работы
            </p>
            <MyInput
                placeholder="Код вакансии"
            />
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Ключевые фразы
            </p>
            <MyInput
                placeholder="Например, Менеджер по продажам"
            />
          </div>
        </div>
        <div class="w-fit mb-25px">
          <MyAccordion title="дополнительные условия" class="mb-15px">
            <div class="flex flex-col flex-wrap max-h-40 gap-x-25px gap-y-15px">
              <CheckboxGroup  :m-value=null :options="ArrayAdditional" />
            </div>
          </MyAccordion>
          <MyAccordion title="водительские права" class="mb-15px">
            <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
              <CheckboxGroup  :m-value=null :options="ArrayCarId"/>
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
              <div class="w-full">
                <MyInput
                placeholder="От"
                type="Number"
                />
              </div>
              <div class="w-full">
                <MyInput
                placeholder="До"
                type="Number"
                />
              </div>
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
             <MyCheckbox :id="'show-contacts'" :label="'Сохранить в черновике'" />
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <UiButton @click="savePublication" variant="action" size="semiaction" class="font-semibold">
              Опубликовать
            </UiButton>
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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import CardOption from '~/components/custom/CardOption.vue';
import PhoneInput from '~/components/custom/PhoneInput.vue';
import MoreOptions from '~/src/data/more-options.json'
import CarId from '~/src/data/car-id.json'
import AccordionAdditional from '~/src/data/accordion-additional.json'
import currency from '~/src/data/currency.json'
import { inject } from 'vue'
import { 
  getProfile as profileHh, 
  getAvailableTypes as typesHh, 
  addDraft as addDraftHh,
  getRoles as getRolesHh
} from '@/utils/hhAccount'

const platforms = ref(inject('platformsGlobal'))
const data = ref({})
data.value.days = "30"
data.value.workSpace = '1'
data.value.area = {
  "id": "1"
}
data.value.professional_roles = []
data.value.billing_types = {
  "id": "free"
}
const ArrayAdditional = ref(AccordionAdditional)
const ArrayOptions = ref(MoreOptions)
const ArrayCarId = ref(CarId)
const ArrayCurrency = ref(currency)
const roles = ref(data.value.professional_roles[0]);
const currectRole = ref(null)

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
  if (data.value.platform === 'hh') {
    console.log('savePublication', data.value);
    const { draft, errorDraft} = await addDraftHh(data.value);
  }
  
}

const changeBalance = (value) => {
  data.value.billing_types = value.vacancy_billing_type
}

const changePlatform = (value) => {
  data.value.platform = value.platform
}

onBeforeMount(async () => {
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

  const { roles, errorRoles } = await getRolesHh()
  if (!errorRoles) {
    roles.value = roles.categories
    currectRole.value = roles.value[0]
    data.value.professional_roles[0] = currectRole.value
    console.log('roles', currectRole.value);
  }
})

</script>