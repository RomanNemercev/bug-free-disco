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
                :readonly="true"
            />
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Код вакансии
            </p>
            <MyInput
                placeholder="Код вакансии"
                :readonly="true"
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
          <TiptapEditor class="mb-15px" />
          <p class="text-xs text-bali font-normal">
            Максимум 700 символов. Использовано 0 символов.
          </p>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Отрасль компании
            </p>
            <DropDownTypes 
            :options="platforms[0]?.types"
            ></DropDownTypes>
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Выберите специализацию
            </p>
            <MyInput
                placeholder="Введите число дней"
                v-model="data.days"
                :type="'Number'"
                :readonly="true"
            />
          </div>
        </div>
        <div class="w-full justify-between flex gap-25px mb-6">
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Тип занятости
            </p>
            <DropDownTypes 
            :options="platforms[0]?.types"
            ></DropDownTypes>
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              График работы
            </p>
            <MyInput
                placeholder="Введите число дней"
                v-model="data.days"
                :type="'Number'"
                :readonly="true"
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
                :readonly="true"
            />
          </div>
          <div class="w-full">
            <p class="text-sm font-medium mb-4 leading-normal text-space">
              Опыт работы
            </p>
            <MyInput
                placeholder="Код вакансии"
                :readonly="true"
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
                :readonly="true"
            />
          </div>
        </div>
        <div class="w-fit">
          <MyAccordion title="дополнительные условия" class="mb-15px">
            <div class="flex flex-col flex-wrap max-h-40 gap-x-25px gap-y-15px">
              <CheckboxGroup  :options="ArrayAdditional" />
            </div>
          </MyAccordion>
          <MyAccordion title="водительские права" class="mb-15px">
            <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
              <CheckboxGroup :options="ArrayCarId"/>
            </div>
          </MyAccordion>
          <MyAccordion title="дополнительные пожелания">
            <div class="flex flex-col flex-wrap max-h-[195px] gap-x-25px gap-y-15px">
              <CheckboxGroup :options="ArrayOptions"/>
            </div>
          </MyAccordion>
        </div>
        </div>   
      </div>
    </div>
  </div>
</template>
<script setup>
import DropDownList from './DropDownList.vue';
import DropDownTypes from './DropDownTypes.vue';
import MyInput from '~/components/custom/MyInput.vue';
import TiptapEditor from '~/components/TiptapEditor.vue'
import GenerateButton from '../custom/GenerateButton.vue';
import MyAccordion from '../custom/MyAccordion.vue';
import MoreOptions from '~/src/data/more-options.json'
import CarId from '~/src/data/car-id.json'
import AccordionAdditional from '~/src/data/accordion-additional.json'
import { inject } from 'vue'
import { getProfile as profileHh, getAvailableTypes as typesHh } from '@/utils/hhAccount'

const platforms = ref(inject('platformsGlobal'))
const data = ref({})
data.value.days = 30

const defaultContent =  `<div>
      <h4>О компании</h4>
      <ul><li></li></ul>
    </div>
    <div>
      <h4>Требования</h4>
      <ul><li></li></ul>
    </div>
    <div>
      <h4>Обязанности</h4>
      <ul><li></li></ul>
    </div>
    <div>
      <h4>Условия</h4>
      <ul><li></li></ul>
    </div>`;

const ArrayAdditional = AccordionAdditional
const ArrayOptions = MoreOptions
const ArrayCarId = CarId

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
        console.log('types hh', types[0]);
      } else {
        console.log('errorTypesHh', errorTypes);
      }
  }
})

console.log('platforms', platforms);
</script>