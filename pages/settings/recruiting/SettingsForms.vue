<script setup>
import { ref, watch } from 'vue'
import DotsDropdown from '~/components/custom/DotsDropdown.vue'
import Popup from '~/components/custom/Popup.vue'
import MyInput from '~/components/custom/MyInput.vue'
import MoreQuestions from '~/components/custom/MoreQuestions.vue'
import MyDropdown from '~/components/custom/MyDropdown.vue'
import GenerateDraggable from '~/components/custom/GenerateDraggable.vue'
import MyCheckbox from '~/components/custom/MyCheckbox.vue'
import BtnTab from '~/components/custom/BtnTab.vue'
import MyTextarea from '~/components/custom/MyTextarea.vue'
import MultiSelect from '~/components/custom/MultiSelect.vue'
import ChooseTime from '~/components/custom/ChooseTime.vue'
import DropdownCalendarStatic from '~/components/custom/DropdownCalendarStatic.vue'
import GeoInput from '~/components/custom/GeoInput.vue'
import InputUpload from '~/components/custom/InputUpload.vue'
import CheckboxGroup from '~/components/custom/CheckboxGroup.vue'

import SettingsArray from '~/src/data/change-settings.json'

import { useForms } from '~/stores/forms'

definePageMeta({
  layout: 'settings',
})

useHead({
  title: 'Настройки — Анкеты',
})

const forms = ref([
  {
    id: 1,
    name: 'Для менеджеров',
    reply: 12,
    changed: '11/06/2024',
  },
  {
    id: 2,
    name: 'Повар кондитер',
    reply: 1,
    changed: '12/06/2024',
  },
  {
    id: 3,
    name: 'Продавец консультантов',
    reply: 32,
    changed: '01/02/2024',
  },
])

const createNewForm = ref(false);
const newFormName = ref('');
const headerFormName = ref('');
const openSettingsPopup = ref(false)
const openDeletePopup = ref(false)
const SettingsArrayValue = ref('')
const InputExampleHeader = ref('Есть ли у вас гарнитура?')
const makeRequired = ref(false)
const newFormTabs = ref('questions')
const formsStore = useForms()
const questions = ref([])
const isOpenDate = ref(false)
const isOpenDateFrom = ref(false)
const isOpenDateTo = ref(false)
const answers = ref([])

function enableBodyScroll() {
  document.body.style.overflow = '' // Включаем прокрутку
}

const isOpenCalendar = (value) => {
  console.log('value', value)
  isOpenDate.value = value
}

const isOpenCalendarFrom = (value) => {
  isOpenDateFrom.value = value
}

const isOpenCalendarTo = (value) => {
  isOpenDateTo.value = value
}

// Обработчики событий закрытия попапов
function handleCloseSettingsPopup() {
  openSettingsPopup.value = false
  enableBodyScroll()
}

function handleCloseDeletePopup() {
  openDeletePopup.value = false
  enableBodyScroll()
}

watch(questions, (val) => {
  console.log('new question', JSON.parse(JSON.stringify(val)))
  formsStore.setQuestions(val)
})

function handleOpenCreateForm() {
  createNewForm.value = true
}

function hanldeCloseCreateForm() {
  createNewForm.value = false
}

// Ensure answers[idx] is an array for checkbox questions
watch(questions, (val) => {
  val.forEach((q, idx) => {
    if (q.type === 'Чекбокс' && !Array.isArray(answers.value[idx])) {
      answers.value[idx] = [];
    }
  });
});
</script>

<template>
  <div>
    <div class="p-25px rounded-fifteen bg-white flex justify-between mb-15px items-center">
      <div>
        <p class="text-xl font-semibold text-space mb-2.5">Анкеты</p>
        <p class="text-sm text-bali font-normal leading-150">Узнавайте опыт кандидатов и&nbsp;многое другое</p>
      </div>
      <UiButton variant="action" size="semiaction" class="font-semibold" @click="handleOpenCreateForm">Создать анкету
      </UiButton>
    </div>
    <div class="[&>*:not(:last-child)]:mb-7px" v-if="forms.length > 0">
      <div v-for="(form, index) in forms" :key="index">
        <div class="p-25px pb-15px flex justify-between bg-white rounded-t-fifteen mb-1px">
          <div>
            <p class="text-lg text-space leading-130 mb-5px">{{ form.name }}</p>
            <p class="text-sm text-bali font-normal">Ответы: {{ form.reply }}</p>
          </div>
          <DotsDropdown :width="'fit'" :items="['Настроить', 'Удалить']" />
        </div>
        <div class="bg-catskill py-15px px-25px rounded-b-fifteen text-sm font-medium text-bali">Изменено: {{
          form.changed
        }}</div>
      </div>
    </div>
    <div v-else class="text-bali min-h-[223px] flex items-center justify-center bg-catskill rounded-fifteen">
      <p class="text-15px font-medium text-bali">Вы еще не создавали анкеты</p>
    </div>
    <transition name="fade">
      <Popup :isOpen="createNewForm" @close="hanldeCloseCreateForm" :width="'690px'" :overflowContainer="true"
        :maxHeight="true" :disableOverflowHidden="true" :lgSize="true">
        <div>
          <div>
            <p class="text-xl font-semibold text-space mb-25px">Информация об анкете</p>
            <BtnTab :tabs="[
              { label: 'Вопросы', value: 'questions' },
              { label: 'Предпросмотр', value: 'preview' }
            ]" v-model="newFormTabs" class="pb-15px" />
            <div class="h-1px w-full bg-athens-gray"></div>
          </div>
          <div v-if="newFormTabs === 'questions'" class="pt-25px">
            <!-- <p class="text-xl font-semibold text-space mb-2.5">Новая анкета</p>
            <p class="text-sm font-normal text-bali mb-[24px]">Короткое описание того что такое анкета</p> -->
            <div>
              <div class="mb-[14px]">
                <p class="text-sm text-space font-medium mb-[12px]">Системное название анкеты</p>
                <MyInput class="mb-2.5" :placeholder="'Например: Анкета на вакансию повара'" v-model="newFormName" />
                <p class="text-xs text-bali font-normal">Будет отображаться в системе</p>
              </div>
              <div class="mb-[14px]">
                <p class="text-sm text-space font-medium mb-[13px]">Оглавление анкеты</p>
                <MyInput class="mb-2.5" :placeholder="'Например: Пожалуйста, ответьте на следующие вопросы'"
                  v-model="headerFormName" />
                <p class="text-xs text-bali font-normal">Видно кандидату</p>
              </div>
              <div>
                <p class="text-sm font-medium text-space mb-[13px]">Вопросы:</p>
                <MoreQuestions v-model:modelValue="questions" />
              </div>
            </div>
            <div class="mt-25px flex justify-between">
              <UiButton variant="semiaction" size="semiaction">Создать</UiButton>
              <UiButton variant="back" size="second-back" @click="createNewForm = false">Отмена</UiButton>
            </div>
          </div>
          <div v-else class="pt-25px">
            <p class="text-xl font-semibold text-space mb-25px">Предпросмотр</p>
            <div v-for="(q, idx) in questions" :key="q.id" class="mb-4 p-2 border rounded">
              <div v-if="q.type === 'Поле для ввода в одну строку'">
                <p>{{ q.title }}</p>
                <MyInput :placeholder="'Введите ваш ответ'" v-model="answers[idx]" />
                <p class="text-xs text-bali mt-1">Ответ: {{ answers[idx] }}</p>
              </div>
              <div v-if="q.type === 'Поле для ввода в несколько строк'">
                <p>{{ q.title }}</p>
                <MyTextarea :maxHeight="100" :placeholder="'Введите ваш ответ'" v-model="answers[idx]" />
                <p class="text-xs text-bali mt-1">Ответ: {{ answers[idx] }}</p>
              </div>
              <div v-if="q.type === 'Выпадающий список (один выбор)'">
                <p>{{ q.title }}</p>
                <MyDropdown :defaultValue="'Выберите вариант ответа'" :options="q.options" v-model="answers[idx]" />
                <p class="text-xs text-bali mt-1">Выбрано: {{ answers[idx] }}</p>
              </div>
              <div v-if="q.type === 'Мультисписок (вопрос с вариантами ответа)'">
                <p>{{ q.title }}</p>
                <MultiSelect :options="q.options" v-model="answers[idx]" />
                <p class="text-xs text-bali mt-1">Выбрано: {{ answers[idx] }}</p>
              </div>
              <div v-if="q.type === 'Время (выбор времени)'">
                <p>{{ q.title }}</p>
                <ChooseTime v-model="answers[idx]" />
                <p class="text-xs text-bali mt-1">Время: {{ answers[idx] }}</p>
              </div>
              <div v-if="q.type === 'Дата (выбор даты)'">
                <p>{{ q.title }}</p>
                <DropdownCalendarStatic :is-open="isOpenDate" @isOpen="isOpenCalendar" v-model="answers[idx]" />
                <p class="text-xs text-bali mt-1">Дата: {{ answers[idx] }}</p>
              </div>
              <div v-if="q.type === 'Дата (срок)'">
                <p>{{ q.title }}</p>
                <div class="flex gap-x-15px">
                  <DropdownCalendarStatic :is-open="isOpenDateFrom" @isOpen="isOpenCalendarFrom"
                    v-model="answers[idx + '_from']" />
                  <DropdownCalendarStatic :is-open="isOpenDateTo" @isOpen="isOpenCalendarTo"
                    v-model="answers[idx + '_to']" />
                </div>
                <p class="text-xs text-bali mt-1">Срок: {{ answers[idx + '_from'] }} — {{ answers[idx + '_to'] }}</p>
              </div>
              <div v-if="q.type === 'Ссылка'">
                <p>{{ q.title }}</p>
                <MyInput :placeholder="'https://'" v-model="answers[idx]" />
                <p class="text-xs text-bali mt-1">Ссылка: {{ answers[idx] }}</p>
              </div>
              <div v-if="q.type === 'Адрес'">
                <p>{{ q.title }}</p>
                <geo-input v-model="answers[idx]" />
                <p class="text-xs text-bali mt-1">Адрес: {{ answers[idx] }}</p>
              </div>
              <div v-if="q.type === 'Файл'">
                <p>{{ q.title }}</p>
                <InputUpload v-model="answers[idx]" />
                <p class="text-xs text-bali mt-1">Файл: {{ answers[idx] }}</p>
              </div>
              <div v-if="q.type === 'Чекбокс'">
                <p>{{ q.title }}</p>
                <CheckboxGroup :options="q.options.map(opt => ({ label: opt, value: opt }))" v-model="answers[idx]" />
                <p class="text-xs text-bali mt-1">Выбрано: {{ Array.isArray(answers[idx]) ? answers[idx].join(', ') : ''
                }}</p>
              </div>
              <div>Тип: {{ q.type }}</div>
              <div>Вопрос: {{ q.title }}</div>
              <div>Обязательный: {{ q.required ? 'Да' : 'Нет' }}</div>
              <div v-if="q.options && q.options.length">
                Опции:
                <ul>
                  <li v-for="(opt, idx2) in q.options" :key="idx2">{{ opt }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </transition>
    <transition name="fade" @after-leave="enableBodyScroll">
      <Popup :isOpen="openSettingsPopup" @close="handleCloseSettingsPopup" :showCloseButton="false" :width="'490px'"
        :disableOverflowHidden="true" :lgSize="true">
        <p class="text-xl font-semibold text-space mb-6">Редактор поля</p>
        <p class="text-sm font-medium text-space mb-15px">Тип вопроса</p>
        <my-dropdown :defaultValue="'Выберите тип поля'" :options="SettingsArray" v-model="SettingsArrayValue" />
        <div v-if="SettingsArrayValue === 'Поле для ввода в одну строку'">
          <p class="text-sm font-medium text-space my-15px">Заголовок</p>
          <MyInput :placeholder="'Введите заголовок'" v-model="InputExampleHeader" class="mb-5" />
          <GenerateDraggable class="mb-[23px]" />
          <MyCheckbox id="make-required" label="Сделать поле обязательным" v-model="makeRequired" class="mb-25px" />
          <div class="flex gap-15px justify-between max-w-fit">
            <UiButton variant="action" size="semiaction">Сохранить</UiButton>
            <UiButton variant="back" size="second-back" @click="handleCloseSettingsPopup">
              Отмена
            </UiButton>
          </div>
        </div>
      </Popup>
    </transition>
    <transition name="fade" @after-leave="enableBodyScroll">
      <Popup :isOpen="openDeletePopup" @close="handleCloseDeletePopup" :width="'490px'" :showCloseButton="false">
        <p class="leading-normal text-xl font-semibold text-space mb-2">
          Удаление поля
        </p>
        <p class="text-sm font-normal text-slate-custom mb-25px">
          Вы действительно хотите удалить поле “Телефон” ?
        </p>
        <div class="flex gap-15px justify-between">
          <UiButton variant="back" size="second-back" @click="handleCloseDeletePopup">
            Отмена
          </UiButton>
          <UiButton variant="delete" size="delete">Удалить поле</UiButton>
        </div>
      </Popup>
    </transition>
  </div>
</template>

<style scoped>
/* Анимация появления и скрытия */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-from {
  opacity: 1;
}
</style>