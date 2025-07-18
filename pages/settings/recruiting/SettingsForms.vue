<script setup>
import { ref, watch } from 'vue'
import DotsDropdown from '~/components/custom/DotsDropdown.vue'
import Popup from '~/components/custom/Popup.vue'
import MyInput from '~/components/custom/MyInput.vue'
import MoreQuestions from '~/components/custom/MoreQuestions.vue'
import MyDropdown from '~/components/custom/MyDropdown.vue'
import BtnTab from '~/components/custom/BtnTab.vue'
import MyTextarea from '~/components/custom/MyTextarea.vue'
import MultiSelect from '~/components/custom/MultiSelect.vue'
import ChooseTime from '~/components/custom/ChooseTime.vue'
import DropdownCalendarStatic from '~/components/custom/DropdownCalendarStatic.vue'
import GeoInput from '~/components/custom/GeoInput.vue'
import InputUpload from '~/components/custom/InputUpload.vue'
import CheckboxGroup from '~/components/custom/CheckboxGroup.vue'

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
const openDeletePopup = ref(false)
const newFormTabs = ref('questions')
const formsStore = useForms()
const questions = ref([])
const isOpenDate = ref(false)
const isOpenDateFrom = ref(false)
const isOpenDateTo = ref(false)
const answers = ref([])
const companyName = ref('OOO ЗЕЛЕНОГЛАЗОЕ ТАКСИ')
const openDeleteFormPopup = ref(false)
const selectedForm = ref(null)
const selectedFormIndex = ref(null)

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


function handleCloseDeletePopup() {
  openDeletePopup.value = false
  enableBodyScroll()
}

// watch(questions, (val) => {
//   console.log('new question', JSON.parse(JSON.stringify(val)))
//   formsStore.setQuestions(val)
// })

function handleOpenCreateForm() {
  createNewForm.value = true
}

function hanldeCloseCreateForm() {
  createNewForm.value = false
  newFormName.value = ''
  headerFormName.value = ''
  questions.value = []
}

// Инициализация answers при изменении questions
watch(questions, (newQuestions) => {
  answers.value = newQuestions.map((q, idx) => {
    const currentAnswer = answers.value[idx]
    if (q.type === 'Чекбокс' || q.type === 'Мультисписок (вопрос с вариантами ответа)') {
      return Array.isArray(currentAnswer) ? currentAnswer : []
    }
    if (q.type === 'Выпадающий список (один выбор)') {
      return typeof currentAnswer === 'string' ? currentAnswer : ''
    }
    return typeof currentAnswer === 'string' ? currentAnswer : ''
  })
  formsStore.setQuestions(newQuestions)
}, { immediate: true })

// Сохраняем answers в Pinia при изменении
// watch(answers, (newAnswers) => {
//   formsStore.setAnswers(newAnswers)
// }, { deep: true })

function confirmCreateNewForm() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('ru-RU').replace(/\./g, '/')
  const newForm = {
    id: Date.now(),
    name: newFormName.value,
    reply: questions.value.length,
    changed: formattedDate,
  }
  forms.value.push(newForm) // <-- добавляем в локальный массив для рендера

  formsStore.addForm({
    id: newForm.id,
    name: newForm.name,
    questions: questions.value,
    created: today.toISOString(),
  })
  newFormName.value = ''
  questions.value = []
  headerFormName.value = ''
  createNewForm.value = false
}

function handleCloseDeleteFormPopup() {
  openDeleteFormPopup.value = false
}

const handleDropdownSelect = (item, form, index) => {
  if (item === 'Удалить') {
    selectedForm.value = form
    selectedFormIndex.value = index
    openDeleteFormPopup.value = true
  }
  if (item === 'Настроить') {
    // Логика для редактирования
  }
}

// Когда появится сервер, удаление будет через DELETE-запрос,
// а локальное удаление — только после успешного ответа от сервера.
function handleDeleteForm() {
  if (selectedFormIndex.value !== null) {
    forms.value.splice(selectedFormIndex.value, 1)
    openDeleteFormPopup.value = false
    selectedForm.value = null
    selectedFormIndex.value = null
  }
}
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
          <DotsDropdown :width="'fit'" :items="['Настроить', 'Удалить']"
            @select-item="item => handleDropdownSelect(item, form, index)" />
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
            <p class="text-xl font-semibold text-space mb-23px">Информация об анкете</p>
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
            <div class="mt-35px flex justify-between">
              <UiButton variant="semiaction" size="semiaction" @click="confirmCreateNewForm">Сохранить</UiButton>
              <UiButton variant="back" size="second-back" @click="hanldeCloseCreateForm">Отмена</UiButton>
            </div>
          </div>
          <div v-else class="pt-25px">
            <p class="text-25px font-bold text-space mb-15px leading-normal">Скрин-анкета для дизайнера</p>
            <div class="mb-2.5">
              <div class="flex gap-x-[3px] mb-5px">
                <p class="text-space text-13px font-normal leading-130">Компания:</p>
                <span class="text-bali text-13px font-normal leading-130">{{ companyName }}</span>
              </div>
              <div class="flex gap-x-[3px]">
                <p class="text-space text-13px font-normal leading-130">Вакансия:</p>
                <span class="text-bali text-13px font-normal leading-130">Дизайнер интерфейсов</span>
              </div>
            </div>
            <div class="h-1px w-full bg-athens-gray mb-9px"></div>
            <div v-for="(q, idx) in questions" :key="q.id" class="mb-25px last:mb-0">
              <div v-if="q.type === 'Поле для ввода в одну строку'">
                <p class="text-space text-sm font-medium mb-15px leading-150">{{ q.title }}</p>
                <MyInput :placeholder="'Введите ваш ответ'" v-model="answers[idx]" />
              </div>
              <div v-if="q.type === 'Поле для ввода в несколько строк'">
                <p class="text-space text-sm font-medium mb-15px leading-150">{{ q.title }}</p>
                <MyTextarea :maxHeight="100" :placeholder="'Введите ваш ответ'" v-model="answers[idx]" />
              </div>
              <div v-if="q.type === 'Выпадающий список (один выбор)'">
                <p class="text-space text-sm font-medium mb-15px leading-150">{{ q.title }}</p>
                <MyDropdown :defaultValue="'Выберите вариант ответа'" :options="q.options" v-model="answers[idx]" />
              </div>
              <div v-if="q.type === 'Мультисписок (вопрос с вариантами ответа)'">
                <p class="text-space text-sm font-medium mb-15px leading-150">{{ q.title }}</p>
                <MultiSelect :options="q.options" v-model="answers[idx]" />
              </div>
              <div v-if="q.type === 'Время (выбор времени)'">
                <p class="text-space text-sm font-medium mb-15px leading-150">{{ q.title }}</p>
                <ChooseTime v-model="answers[idx]" />
              </div>
              <div v-if="q.type === 'Дата (выбор даты)'">
                <p class="text-space text-sm font-medium mb-15px leading-150">{{ q.title }}</p>
                <DropdownCalendarStatic :is-open="isOpenDate" @isOpen="isOpenCalendar" v-model="answers[idx]" />
              </div>
              <div v-if="q.type === 'Дата (срок)'">
                <p class="text-space text-sm font-medium mb-15px leading-150">{{ q.title }}</p>
                <div class="flex gap-x-15px">
                  <DropdownCalendarStatic :is-open="isOpenDateFrom" @isOpen="isOpenCalendarFrom"
                    v-model="answers[idx + '_from']" :dateFrom="true" />
                  <DropdownCalendarStatic :is-open="isOpenDateTo" @isOpen="isOpenCalendarTo"
                    v-model="answers[idx + '_to']" :dateTo="true" />
                </div>
              </div>
              <div v-if="q.type === 'Ссылка'">
                <p class="text-space text-sm font-medium mb-15px leading-150">{{ q.title }}</p>
                <MyInput :placeholder="'https://'" v-model="answers[idx]" />
              </div>
              <div v-if="q.type === 'Адрес'">
                <p class="text-space text-sm font-medium mb-15px leading-150">{{ q.title }}</p>
                <geo-input v-model="answers[idx]" />
              </div>
              <div v-if="q.type === 'Файл'">
                <p class="text-space text-sm font-medium mb-15px leading-150">{{ q.title }}</p>
                <InputUpload v-model="answers[idx]" :minStyle="true" />
              </div>
              <div v-if="q.type === 'Чекбокс'">
                <p class="text-space text-sm font-medium mb-15px leading-150">{{ q.title }}</p>
                <div class="[&>*:not(:last-child)]:mb-2.5">
                  <CheckboxGroup :options="q.options.map(opt => ({ label: opt, value: opt }))" v-model="answers[idx]" />
                </div>
              </div>
            </div>
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
    <transition name="fade" @after-leave="enableBodyScroll">
      <Popup :isOpen="openDeleteFormPopup" :width="'400px'" @close="handleCloseDeleteFormPopup">
        <p class="leading-normal text-xl font-semibold text-space mb-2.5">
          Удаление анкеты
        </p>
        <p class="text-sm font-normal text-slate-custom mb-25px">
          Вы действительно хотите удалить анкету {{ selectedForm?.name }} ?
        </p>
        <div class="flex justify-between">
          <UiButton variant="delete" size="delete" @click="handleDeleteForm">Удалить</UiButton>
          <UiButton variant="back" size="second-back" @click="handleCloseDeleteFormPopup">
            Отмена
          </UiButton>
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