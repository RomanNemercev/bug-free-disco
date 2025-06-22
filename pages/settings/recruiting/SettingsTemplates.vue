<script setup>
import { ref } from 'vue'
import BtnTab from '~/components/custom/BtnTab.vue'
import DotsDropdown from '~/components/custom/DotsDropdown.vue'

const templatesTabs = ref('email')

definePageMeta({
  layout: 'settings',
})

useHead({
  title: 'Настройки — Шаблоны',
})

const emailTemplates = ref([
  {
    id: 1,
    name: 'Отказ',
  },
  {
    id: 2,
    name: 'Приглашение'
  },
  {
    id: 3,
    name: 'Отказ'
  }
])

const messengersTemplates = ref([
  {
    id: 1,
    name: 'Отказ',
  },
  {
    id: 2,
    name: 'Приглашение'
  },
  {
    id: 3,
    name: 'Отказ'
  }
])

const formsTemplates = ref([
  {
    id: 1,
    name: 'Отказ',
  },
  {
    id: 2,
    name: 'Приглашение'
  },
  {
    id: 3,
    name: 'Отказ'
  }
])

const templatesTemplates = ref([
  {
    id: 1,
    name: 'Отказ',
  },
  {
    id: 2,
    name: 'Приглашение'
  },
  {
    id: 3,
    name: 'Отказ'
  }
])

const smsTemplates = ref([
  {
    id: 1,
    name: 'Отказ',
  },
  {
    id: 2,
    name: 'Приглашение'
  },
  {
    id: 3,
    name: 'Отказ'
  }
])
</script>

<template>
  <div>
    <div class="mb-6px">
      <div class="flex justify-between mb-1px bg-white rounded-t-fifteen p-25px gap-2.5 pb-23px items-center">
        <div>
          <p class="text-xl text-space mb-2.5 font-semibold">Шаблоны писем</p>
          <p class="text-sm text-bali font-normal leading-150">Редактируйте и&nbsp;настраивайте автоотправку писем</p>
        </div>
        <UiButton variant="action" size="semiaction" class="font-semibold">Создать шаблон</UiButton>
      </div>
      <div class="bg-catskill w-full px-25px py-15px rounded-b-fifteen">
        <BtnTab :tabs="[
          { label: 'Email', value: 'email' },
          { label: 'Мессенджеры', value: 'messenger' },
          { label: 'Анкеты', value: 'forms' },
          { label: 'Формы', value: 'templates' },
          { label: 'Смс', value: 'sms' }
        ]" v-model="templatesTabs" />
      </div>
    </div>
    <div v-if="templatesTabs === 'email'">
      <div v-if="emailTemplates.length > 0">
        <div class="bg-catskill rounded-t-fifteen py-25px px-35px mb-1px">
          <p class="text-sm font-medium text-bali leading-150">Название шаблона</p>
        </div>
        <div
          class="bg-white last:rounded-b-fifteen [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-athens">
          <div v-for="(template, index) in emailTemplates" :key="index">
            <div class="flex justify-between items-center py-[10.5px] px-25px">
              <p class="text-sm font-medium text-space leading-150 pl-2.5">{{ template.name }}</p>
              <DotsDropdown :width="'fit'" :items="['Настроить', 'Удалить']" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-bali min-h-[223px] flex items-center justify-center bg-catskill rounded-fifteen">
        <p class="text-15px font-medium text-bali">Вы еще не создавали шаблоны</p>
      </div>
    </div>
    <div v-else-if="templatesTabs === 'messenger'">
      <div v-if="messengersTemplates.length > 0">
        <div class="bg-catskill rounded-t-fifteen py-25px px-35px mb-1px">
          <p class="text-sm font-medium text-bali leading-150">Название шаблона</p>
        </div>
        <div
          class="bg-white last:rounded-b-fifteen [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-athens">
          <div v-for="(template, index) in messengersTemplates" :key="index">
            <div class="flex justify-between items-center py-[10.5px] px-25px">
              <p class="text-sm font-medium text-space leading-150 pl-2.5">{{ template.name }}</p>
              <DotsDropdown :width="'fit'" :items="['Настроить', 'Удалить']" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-bali min-h-[223px] flex items-center justify-center bg-catskill rounded-fifteen">
        <p class="text-15px font-medium text-bali">Вы еще не создавали шаблоны</p>
      </div>
    </div>
    <div v-else-if="templatesTabs === 'forms'">
      <div v-if="formsTemplates.length > 0">
        <div class="bg-catskill rounded-t-fifteen py-25px px-35px mb-1px">
          <p class="text-sm font-medium text-bali leading-150">Название шаблона</p>
        </div>
        <div
          class="bg-white last:rounded-b-fifteen [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-athens">
          <div v-for="(template, index) in formsTemplates" :key="index">
            <div class="flex justify-between items-center py-[10.5px] px-25px">
              <p class="text-sm font-medium text-space leading-150 pl-2.5">{{ template.name }}</p>
              <DotsDropdown :width="'fit'" :items="['Настроить', 'Удалить']" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-bali min-h-[223px] flex items-center justify-center bg-catskill rounded-fifteen">
        <p class="text-15px font-medium text-bali">Вы еще не создавали шаблоны</p>
      </div>
    </div>
    <div v-else-if="templatesTabs === 'templates'">
      <div v-if="templatesTemplates.length > 0">
        <div class="bg-catskill rounded-t-fifteen py-25px px-35px mb-1px">
          <p class="text-sm font-medium text-bali leading-150">Название шаблона</p>
        </div>
        <div
          class="bg-white last:rounded-b-fifteen [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-athens">
          <div v-for="(template, index) in templatesTemplates" :key="index">
            <div class="flex justify-between items-center py-[10.5px] px-25px">
              <p class="text-sm font-medium text-space leading-150 pl-2.5">{{ template.name }}</p>
              <DotsDropdown :width="'fit'" :items="['Настроить', 'Удалить']" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-bali min-h-[223px] flex items-center justify-center bg-catskill rounded-fifteen">
        <p class="text-15px font-medium text-bali">Вы еще не создавали шаблоны</p>
      </div>
    </div>
    <div v-else-if="templatesTabs === 'sms'">
      <div v-if="smsTemplates.length > 0">
        <div class="bg-catskill rounded-t-fifteen py-25px px-35px mb-1px">
          <p class="text-sm font-medium text-bali leading-150">Название шаблона</p>
        </div>
        <div
          class="bg-white last:rounded-b-fifteen [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-athens">
          <div v-for="(template, index) in smsTemplates" :key="index">
            <div class="flex justify-between items-center py-[10.5px] px-25px">
              <p class="text-sm font-medium text-space leading-150 pl-2.5">{{ template.name }}</p>
              <DotsDropdown :width="'fit'" :items="['Настроить', 'Удалить']" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-bali min-h-[223px] flex items-center justify-center bg-catskill rounded-fifteen">
        <p class="text-15px font-medium text-bali">Вы еще не создавали шаблоны</p>
      </div>
    </div>
  </div>
</template>