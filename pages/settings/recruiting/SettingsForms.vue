<script setup>
import { ref } from 'vue'
import DotsDropdown from '~/components/custom/DotsDropdown.vue'
import Popup from '~/components/custom/Popup.vue'
import MyInput from '~/components/custom/MyInput.vue'
import MoreQuestions from '~/components/custom/MoreQuestions.vue'
import MyDropdown from '~/components/custom/MyDropdown.vue'
import GenerateDraggable from '~/components/custom/GenerateDraggable.vue'
import MyCheckbox from '~/components/custom/MyCheckbox.vue'

import SettingsArray from '~/src/data/change-settings.json'

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
const openAddQuestionPopup = ref(false)
const SettingsArrayValue = ref('')
const InputExampleHeader = ref('Есть ли у вас гарнитура?')
const makeRequired = ref(false)
const NewArrayValue = ref('')
const makeRequiredNewField = ref(false)

// Обработчики событий
function disableBodyScroll() {
  document.body.style.overflow = 'hidden' // Отключаем прокрутку
}

function enableBodyScroll() {
  document.body.style.overflow = '' // Включаем прокрутку
}

function handleOpenSettings() {
  openSettingsPopup.value = true
  disableBodyScroll()
}

function handleOpenDelete() {
  openDeletePopup.value = true
  disableBodyScroll()
}

function handleOpenAddQuestion() {
  openAddQuestionPopup.value = true
  disableBodyScroll()
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

function handleCloseAddQuestionPopup() {
  openAddQuestionPopup.value = false
  enableBodyScroll()
}
</script>

<template>
  <div>
    <div class="p-25px rounded-fifteen bg-white flex justify-between mb-15px items-center">
      <div>
        <p class="text-xl font-semibold text-space mb-2.5">Анкеты</p>
        <p class="text-sm text-bali font-normal leading-150">Узнавайте опыт кандидатов и&nbsp;многое другое</p>
      </div>
      <UiButton variant="action" size="semiaction" class="font-semibold" @click="createNewForm = true">Создать анкету
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
      <Popup :isOpen="createNewForm" @close="createNewForm = false" :width="'490px'">
        <div>
          <p class="text-xl font-semibold text-space mb-2.5">Новая анкета</p>
          <p class="text-sm font-normal text-bali mb-[24px]">Короткое описание того что такое анкета</p>
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
              <MoreQuestions @open-settings="handleOpenSettings" @open-delete="handleOpenDelete"
                @open-add-question="handleOpenAddQuestion" :mode="'publish'" />
            </div>
          </div>
          <div class="mt-25px">
            <UiButton variant="action" size="semiaction" class="mr-15px font-semibold">Создать</UiButton>
            <UiButton variant="back" size="second-back" @click="createNewForm = false">Отмена</UiButton>
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
    <transition name="fade" @after-leave="enableBodyScroll">
      <Popup :isOpen="openAddQuestionPopup" @close="handleCloseAddQuestionPopup" :width="'490px'"
        :showCloseButton="false" :disableOverflowHidden="true" :lgSize="true">
        <p class="text-xl font-semibold text-space mb-6">Новое поле</p>
        <p class="text-sm font-medium text-space mb-15px">Тип поля</p>
        <my-dropdown :defaultValue="'Выберите тип поля'" :options="SettingsArray" v-model="NewArrayValue" />
        <div v-if="NewArrayValue === 'Поле для ввода в одну строку'">
          <p class="text-sm font-medium text-space my-15px">Заголовок</p>
          <MyInput :placeholder="'Введите текст'" v-model="InputNewField" class="mb-5" />
          <MyCheckbox id="make-required" label="Сделать поле обязательным" v-model="makeRequiredNewField"
            class="mb-25px" />
          <div class="flex gap-15px justify-between max-w-fit">
            <UiButton variant="action" size="semiaction">Сохранить</UiButton>
            <UiButton variant="back" size="second-back" @click="handleCloseAddQuestionPopup">
              Отмена
            </UiButton>
          </div>
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