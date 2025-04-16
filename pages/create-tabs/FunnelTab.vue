<script setup>
  import { ref } from 'vue'
  import draggable from 'vuedraggable'
  import MyInput from '@/components/custom/MyInput.vue'
  import Popup from '~/components/custom/Popup.vue'
  import StatusService from '~/components/custom/ServiceStatus.vue'
  import MyDropdown from '~/components/custom/MyDropdown.vue'

  const items = ref([])
  const isDragging = ref(false)
  const newFunnelName = ref('')

  const openPopups = ref([])
  const openActionPopup = ref(false)
  const openInvitePopup = ref(false)
  const openMovePopup = ref(false)
  const openMailPopup = ref(false)
  const openFormPopup = ref(false)
  const inviteFieldIfValue = ref('')
  const inviteFieldConditionValue = ref('')
  const inviteFieldWhenValue = ref('')
  const moveFieldLevelValue = ref('')
  const moveFieldIfValue = ref('')
  const moveFieldConditionValue = ref('')
  const moveFieldWhenValue = ref('')
  const mailFieldSendValue = ref('')
  const mailFieldItemValue = ref('')
  const mailFieldConditionValue = ref('')
  const mailFieldWhenValue = ref('')
  const formFieldSendValue = ref('')
  const formFieldIfValue = ref('')
  const formFieldConditionValue = ref('')
  const formFieldWhenValue = ref('')
  const fetchItems = async () => {
    try {
      items.value = [
        {
          id: 1,
          title: 'Подумать',
          isLocked: true,
          actions: [
            { id: 1, title: 'Смена этапа' },
            { id: 2, title: 'Пригласить кандидата' },
          ],
        },
        {
          id: 2,
          title: 'Подходящие',
          isLocked: true,
          actions: [{ id: 1, title: 'Отправить webhook' }],
        },
        {
          id: 3,
          title: 'Отклоненные',
          isLocked: true,
          actions: [{ id: 1, title: 'Отправить webhook' }],
        },
        {
          id: 4,
          title: 'Не разобранное',
          isLocked: true,
          actions: [{ id: 1, title: 'Отправить webhook' }],
        },
        {
          id: 5,
          title: 'Служба безопасности',
          isLocked: false,
          actions: [{ id: 1, title: 'Новая задача' }],
        },
        {
          id: 6,
          title: 'У заказчика',
          isLocked: false,
          actions: [],
        },
      ]
    } catch (e) {
      console.log('Ошибка при загрузке данных', error)
    }
  }

  const actionBtn = [
    {
      id: 1,
      icon: 'hand',
      title: 'Пригласить кандидата',
      handler: handleOpenInvite,
    },
    {
      id: 2,
      icon: 'move-arrow',
      title: 'Переместить на другой этап',
      handler: handleOpenMove,
    },
    {
      id: 3,
      icon: 'stop20',
      title: 'Отказать кандидату',
    },
    {
      id: 4,
      icon: 'envelope20',
      title: 'Отправить письмо на почту',
      handler: handleOpenMail,
    },
    {
      id: 5,
      icon: 'change-user',
      title: 'Сменить ответственного',
    },
    {
      id: 6,
      icon: 'change-text',
      title: 'Изменить поле',
    },
    {
      id: 7,
      icon: 'webhook',
      title: 'Отправить webhook',
    },
    {
      id: 8,
      icon: 'form-user',
      title: 'Отправить анкету',
      handler: handleOpenForm,
    },
    {
      id: 9,
      icon: 'task-create',
      title: 'Создать задачу',
    },
    {
      id: 10,
      icon: 'task-complete',
      title: 'Завершить задачу',
    },
  ]

  // fn for add new item in array
  const addNewItem = () => {
    // check on empty data in newFunnelName
    if (newFunnelName.value.trim() === '') {
      return
    }

    items.value.push({
      id: items.value.length + 1,
      title: newFunnelName.value,
      isLocked: false,
      actions: [],
    })

    // clear input
    newFunnelName.value = ''
  }

  const removeItem = index => {
    items.value.splice(index, 1)
  }

  //   handler for move and take
  const onDragStart = () => {
    isDragging.value = true
  }

  const onDragEnd = () => {
    isDragging.value = false
  }

  await fetchItems()

  function enableBodyScroll(popupId) {
    openPopups.value = openPopups.value.filter(id => id !== popupId)
    if (openPopups.value.length === 0) {
      document.body.style.overflow = '' // Включаем прокрутку
    }
  }

  // config for control scroll
  function disableBodyScroll(popupId) {
    if (!openPopups.value.includes(popupId)) {
      openPopups.value.push(popupId)
    }
    if (openPopups.value.length > 0) {
      document.body.style.overflow = 'hidden' // Отключаем прокрутку
    }
  }

  function handleOpenAction() {
    openActionPopup.value = true
    disableBodyScroll('action')
  }

  function handleCloseActionPopup() {
    openActionPopup.value = false
  }

  function handleOpenInvite() {
    openInvitePopup.value = true
    openActionPopup.value = false
    disableBodyScroll('invite')
  }

  function handleCloseInvitePopup() {
    openInvitePopup.value = false
    openActionPopup.value = true
    disableBodyScroll('action')
  }

  function handleOpenMove() {
    openMovePopup.value = true
    openActionPopup.value = false
    disableBodyScroll('move')
  }

  function handleCloseMovePopup() {
    openMovePopup.value = false
    openActionPopup.value = true
    disableBodyScroll('action')
  }

  function handleOpenMail() {
    openMailPopup.value = true
    openActionPopup.value = false
    disableBodyScroll('mail')
  }

  function handleCloseMailPopup() {
    openMailPopup.value = false
    openActionPopup.value = true
    disableBodyScroll('action')
  }

  function handleOpenForm() {
    openFormPopup.value = true
    openActionPopup.value = false
    disableBodyScroll('form')
  }

  function handleCloseFormPopup() {
    openFormPopup.value = false
    openActionPopup.value = true
    disableBodyScroll('action')
  }

  const inviteFieldIf = [
    {
      name: 'Номер телефона',
      value: 1,
    },
    {
      name: 'Возраст',
      value: 2,
    },
    {
      name: 'Город',
      value: 3,
    },
    {
      name: 'Регион',
      value: 4,
    },
    {
      name: 'Ссылка',
      value: 5,
    },
    {
      name: 'Файл',
      value: 6,
    },
  ]

  const inviteFieldCondition = [
    {
      name: 'Присутствует',
      value: 1,
    },
    {
      name: 'Отсутствует',
      value: 2,
    },
    {
      name: 'Отличается в большую сторону',
      value: 3,
    },
    {
      name: 'Отличается в меньшую сторону',
      value: 4,
    },
    {
      name: 'Верный ответ',
      value: 5,
    },
    {
      name: 'Неверный ответ',
      value: 6,
    },
    {
      name: 'Флаг установлен',
      value: 7,
    },
    {
      name: 'Флаг не установлен',
      value: 8,
    },
    {
      name: 'Интервал',
      value: 9,
    },
  ]

  const inviteFieldWhen = [
    {
      name: 'Выполнить сразу',
      value: 1,
    },
    {
      name: 'Через 10 минут',
      value: 2,
    },
    {
      name: 'Через 30 минут',
      value: 3,
    },
    {
      name: 'Через 1 час',
      value: 4,
    },
    {
      name: 'Через 3 часа',
      value: 5,
    },
    {
      name: 'Через 12 часов',
      value: 6,
    },
    {
      name: 'Спустя сутки',
      value: 7,
    },
  ]

  const moveFieldLevel = [
    {
      name: 'Подумать',
      value: 1,
    },
    {
      name: 'Подходящие',
      value: 2,
    },
    {
      name: 'Отклоненные',
      value: 3,
    },
    {
      name: 'Не разобранное',
      value: 4,
    },
    {
      name: 'Служба безопасности',
      value: 5,
    },
    {
      name: 'У заказчика',
      value: 6,
    },
  ]

  const moveFieldIf = [
    {
      name: 'Номер телефона',
      value: 1,
    },
    {
      name: 'Возраст',
      value: 2,
    },
    {
      name: 'Город',
      value: 3,
    },
    {
      name: 'Регион',
      value: 4,
    },
    {
      name: 'Ссылка',
      value: 5,
    },
    {
      name: 'Файл',
      value: 6,
    },
  ]

  const moveFieldCondition = [
    {
      name: 'Присутствует',
      value: 1,
    },
    {
      name: 'Отсутствует',
      value: 2,
    },
    {
      name: 'Отличается в большую сторону',
      value: 3,
    },
    {
      name: 'Отличается в меньшую сторону',
      value: 4,
    },
    {
      name: 'Верный ответ',
      value: 5,
    },
    {
      name: 'Неверный ответ',
      value: 6,
    },
    {
      name: 'Флаг установлен',
      value: 7,
    },
    {
      name: 'Флаг не установлен',
      value: 8,
    },
    {
      name: 'Флаг не установлен',
      value: 9,
    },
  ]

  const moveFieldWhen = [
    {
      name: 'Выполнить сразу',
      value: 1,
    },
    {
      name: 'Через 10 минут',
      value: 2,
    },
    {
      name: 'Через 30 минут',
      value: 3,
    },
    {
      name: 'Через 1 час',
      value: 4,
    },
    {
      name: 'Через 3 часа',
      value: 5,
    },
    {
      name: 'Через 12 часов',
      value: 6,
    },
    {
      name: 'Спустя сутки',
      value: 7,
    },
  ]

  const mailFieldSend = [
    {
      name: 'Отказ',
      value: 1,
    },
    {
      name: 'Приглашение',
      value: 2,
    },
    {
      name: 'Не дозвонились',
      value: 3,
    },
  ]

  const mailFieldItems = [
    {
      name: 'Номер телефона',
      value: 1,
    },
    {
      name: 'Возраст',
      value: 2,
    },
    {
      name: 'Город',
      value: 3,
    },
    {
      name: 'Регион',
      value: 4,
    },
    {
      name: 'Ссылка',
      value: 5,
    },
    {
      name: 'Файл',
      value: 6,
    },
  ]

  const mailFieldConditions = [
    {
      name: 'Присутствует',
      value: 1,
    },
    {
      name: 'Отсутствует',
      value: 2,
    },
    {
      name: 'Отличается в большую сторону',
      value: 3,
    },
    {
      name: 'Отличается в меньшую сторону',
      value: 4,
    },
    {
      name: 'Верный ответ',
      value: 5,
    },
    {
      name: 'Неверный ответ',
      value: 6,
    },
    {
      name: 'Флаг установлен',
      value: 7,
    },
    {
      name: 'Флаг не установлен',
      value: 8,
    },
    {
      name: 'Интервал',
      value: 9,
    },
  ]

  const mailFieldWhen = [
    {
      name: 'Выполнить сразу',
      value: 1,
    },
    {
      name: 'Через 10 минут',
      value: 2,
    },
    {
      name: 'Через 30 минут',
      value: 3,
    },
    {
      name: 'Через 1 час',
      value: 4,
    },
    {
      name: 'Через 3 часа',
      value: 5,
    },
    {
      name: 'Через 12 часов',
      value: 6,
    },
    {
      name: 'Спустя сутки',
      value: 7,
    },
  ]

  const formFieldSend = [
    {
      name: 'Анкета на менеджера',
      value: 1,
    },
    {
      name: '19 вопросов',
      value: 2,
    },
    {
      name: 'Психологический тест',
      value: 3,
    },
    {
      name: 'Профориентация',
      value: 4,
    },
  ]

  const formFieldIf = [
    {
      name: 'Номер телефона',
      value: 1,
    },
    {
      name: 'Возраст',
      value: 2,
    },
    {
      name: 'Город',
      value: 3,
    },
    {
      name: 'Регион',
      value: 4,
    },
    {
      name: 'Ссылка',
      value: 5,
    },
    {
      name: 'Файл',
      value: 6,
    },
  ]

  const formFieldConditions = [
    {
      name: 'Присутствует',
      value: 1,
    },
    {
      name: 'Отсутствует',
      value: 2,
    },
    {
      name: 'Отличается в большую сторону',
      value: 3,
    },
    {
      name: 'Отличается в меньшую сторону',
      value: 4,
    },
    {
      name: 'Верный ответ',
      value: 5,
    },
    {
      name: 'Неверный ответ',
      value: 6,
    },
    {
      name: 'Флаг установлен',
      value: 7,
    },
    {
      name: 'Флаг не установлен',
      value: 8,
    },
    {
      name: 'Интервал',
      value: 9,
    },
  ]

  const formFieldWhen = [
    {
      name: 'Выполнить сразу',
      value: 1,
    },
    {
      name: 'Через 10 минут',
      value: 2,
    },
    {
      name: 'Через 30 минут',
      value: 3,
    },
    {
      name: 'Через 1 час',
      value: 4,
    },
    {
      name: 'Через 3 часа',
      value: 5,
    },
    {
      name: 'Через 12 часов',
      value: 6,
    },
    {
      name: 'Спустя сутки',
      value: 7,
    },
  ]
</script>

<template>
  <div class="container pb-10 pt-48">
    <div class="w-full bg-white rounded-fifteen p-25px">
      <div class="mb-[36px]">
        <p class="text-space text-xl font-semibold mb-2.5 leading-normal">
          Настройка воронки найма
        </p>
        <p class="text-sm text-slate-custom leading-normal">
          Настройте ваши этапы и&nbsp;добавьте и&nbsp;действия триггеры
          к&nbsp;ним.
        </p>
      </div>
      <div>
        <draggable
          v-model="items"
          item-key="id"
          handle=".drag-handle"
          animation="200"
          ghost-class="ghost"
          chosen-class="chosen"
          @start="onDragStart"
          @end="onDragEnd"
        >
          <template #item="{ element, index }">
            <div class="card flex" :class="{ 'dragging-card': isDragging }">
              <div class="drag-handle p-2.5 mr-15px cursor-grab h-fit">
                <svg-icon name="drag-burger" width="20" height="20" />
              </div>
              <div class="w-full">
                <div class="flex justify-between items-center w-full mb-2.5">
                  <div
                    class="w-full border border-athens rounded-ten bg-athens-gray flex justify-between items-center pl-15px pr-2.5 py-9px mr-2.5"
                  >
                    <p class="text-sm text-space font-normal">
                      {{ element.title }}
                    </p>
                  </div>
                  <div>
                    <div class="p-2.5" v-if="element.isLocked">
                      <svg-icon name="lock20" width="20" height="20" />
                    </div>
                    <button
                      v-else
                      @click="removeItem(index)"
                      class="text-slate-custom p-2.5 bg-athens-gray border border-athens rounded-ten hover:bg-pink hover:text-red-custom hover:border-pink transition-colors duration-200"
                    >
                      <svg-icon name="basket-basket" width="20" height="20" />
                    </button>
                  </div>
                </div>
                <div class="flex items-center w-full">
                  <div class="flex items-center mr-6px">
                    <p class="text-sm text-slate-custom font-normal mr-1">
                      Действие:
                    </p>
                    <div
                      v-for="(action, actionIndex) in element.actions"
                      :key="action.id"
                      class="flex items-center gap-x-5px mr-1"
                    >
                      <svg-icon name="shuffle" width="18" height="18" />
                      <p class="text-sm text-space font-normal flex">
                        {{ action.title }}
                        <span
                          v-if="
                            element.actions.length > 1 &&
                            actionIndex < element.actions.length - 1
                          "
                        >
                          ,
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    class="flex items-center gap-x-5px"
                    @click="handleOpenAction"
                  >
                    <svg-icon name="plus-blue20" width="20" height="20" />
                    <span class="text-sm text-dodger font-normal">
                      Добавить
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </draggable>
        <div
          class="max-w-[606px] pl-[55px] flex items-center gap-x-2.5 mt-18px mb-[34px]"
        >
          <MyInput
            :placeholder="'Новый этап'"
            type="text"
            v-model="newFunnelName"
          />
          <button
            @click="addNewItem"
            class="flex items-center justify-center text-slate-custom p-2.5 bg-athens-gray border border-athens rounded-ten hover:bg-feta hover:text-green hover:border-border-feta transition-colors duration-200"
          >
            <svg-icon name="more-plus" width="20" height="20" />
          </button>
        </div>
        <div class="gap-x-15px flex">
          <UiButton class="font-bold" variant="action" size="action">
            Сохранить для всех вакансий
          </UiButton>
          <UiButton variant="semiaction" size="semiaction">
            Сохранить как новую
          </UiButton>
        </div>
      </div>
    </div>
  </div>
  <transition name="fade" @after-leave="enableBodyScroll('action')">
    <Popup
      :isOpen="openActionPopup"
      @close="handleCloseActionPopup"
      :showCloseButton="false"
      :width="'490px'"
      :topActive="true"
      :lgSize="true"
      :max-height="true"
      :overflowContainer="true"
    >
      <p class="text-xl font-semibold text-space mb-35px leading-normal">
        Добавить действие
      </p>
      <div class="flex flex-col gap-y-2.5 mb-5">
        <button
          v-for="btn in actionBtn"
          class="border border-athens bg-athens-gray rounded-fifteen text-slate-custom flex py-[14.5px] px-15px"
          @click="btn.handler ? btn.handler() : null"
        >
          <svg-icon :name="btn.icon" width="20" height="20" class="mr-2.5" />
          <span class="text-sm font-normal">
            {{ btn.title }}
          </span>
        </button>
      </div>
      <div class="w-full h-px bg-athens mb-5"></div>
      <p class="text-sm font-medium mb-15px">Интеграция</p>
      <div class="grid grid-cols-3 gap-x-2.5 min-h-[120px] mb-35px">
        <button
          class="rounded-fifteen bg-malachite flex items-center justify-center"
        >
          <svg-icon name="logo-wh60" width="60.21" height="60.27" />
        </button>
        <button
          class="rounded-fifteen bg-picton flex items-center justify-center"
        >
          <svg-icon name="logo-tg54" width="54" height="46" />
        </button>
        <button
          class="rounded-fifteen bg-royal flex items-center justify-center"
        >
          <svg-icon name="logo-vb70" width="69.57" height="71.91" />
        </button>
      </div>
      <UiButton
        size="second-back"
        variant="back"
        @click="handleCloseActionPopup"
      >
        Отмена
      </UiButton>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll('invite')">
    <Popup
      :isOpen="openInvitePopup"
      @close="handleCloseInvitePopup"
      :show-close-button="false"
      :width="'400px'"
      :disableOverflowHidden="true"
      :overflowContainer="true"
    >
      <p class="text-xl font-semibold text-space mb-25px leading-normal">
        Назначение действия
      </p>
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Этап воронки
      </p>
      <StatusService :status="'Подумать'" class="mb-15px" />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Действие
      </p>
      <StatusService
        :nameIcon="'hand'"
        :status="'Пригласить кандидата'"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px">Если</p>
      <MyDropdown
        :defaultValue="'Выберите поле'"
        :options="inviteFieldIf"
        class="mb-15px"
        v-model="inviteFieldIfValue"
      />
      <p class="text-sm font-medium text-space mb-15px">Условие</p>
      <MyDropdown
        :defaultValue="'Выберите условие'"
        :options="inviteFieldCondition"
        class="mb-15px"
        v-model="inviteFieldConditionValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Когда</p>
      <MyDropdown
        :defaultValue="'Выберите время'"
        :options="inviteFieldWhen"
        v-model="inviteFieldWhenValue"
        class="mb-25px"
      />
      <div>
        <UiButton size="semiaction" variant="action" class="mr-15px">
          Добавить
        </UiButton>
        <UiButton
          size="second-back"
          variant="back"
          @click="handleCloseInvitePopup"
        >
          Назад
        </UiButton>
      </div>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll('move')">
    <Popup
      :isOpen="openMovePopup"
      @close="handleCloseMovePopup"
      :show-close-button="false"
      :width="'400px'"
      :disableOverflowHidden="true"
      :overflowContainer="true"
    >
      <p class="text-xl font-semibold text-space mb-25px leading-normal">
        Назначение действия
      </p>
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Этап воронки
      </p>
      <StatusService :status="'Подумать'" class="mb-15px" />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Действие
      </p>
      <StatusService
        :nameIcon="'move-arrow'"
        :status="'Пригласить кандидата'"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Выбор этапа
      </p>
      <MyDropdown
        :defaultValue="'Выберите этап'"
        :options="moveFieldLevel"
        class="mb-15px"
        v-model="moveFieldLevelValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Если</p>
      <MyDropdown
        :defaultValue="'Выберите поле'"
        :options="moveFieldIf"
        class="mb-15px"
        v-model="moveFieldIfValue"
      />
      <p class="text-sm font-medium text-space mb-15px">Условие</p>
      <MyDropdown
        :defaultValue="'Выберите условие'"
        :options="moveFieldCondition"
        class="mb-15px"
        v-model="moveFieldConditionValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Когда</p>
      <MyDropdown
        :defaultValue="'Выберите время'"
        :options="moveFieldWhen"
        class="mb-25px"
        v-model="moveFieldWhenValue"
      />
      <div>
        <UiButton size="semiaction" variant="action" class="mr-15px">
          Добавить
        </UiButton>
        <UiButton
          size="second-back"
          variant="back"
          @click="handleCloseMovePopup"
        >
          Назад
        </UiButton>
      </div>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll('mail')">
    <Popup
      :isOpen="openMailPopup"
      @close="handleCloseMailPopup"
      :show-close-button="false"
      :width="'400px'"
      :disableOverflowHidden="true"
      :overflowContainer="true"
    >
      <p class="text-xl font-semibold text-space mb-25px leading-normal">
        Назначение действия
      </p>
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Этап воронки
      </p>
      <StatusService :status="'Подумать'" class="mb-15px" />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Действие
      </p>
      <StatusService
        :nameIcon="'envelope20'"
        :status="'Отправить письмо на почту'"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Выбор письма
      </p>
      <MyDropdown
        :defaultValue="'Выберите шаблон'"
        :options="mailFieldSend"
        class="mb-15px"
        v-model="mailFieldSendValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Если</p>
      <MyDropdown
        :defaultValue="'Выберите поле'"
        :options="mailFieldItems"
        class="mb-15px"
        v-model="mailFieldItemValue"
      />
      <p class="text-sm font-medium text-space mb-15px">Условие</p>
      <MyDropdown
        :defaultValue="'Выберите условие'"
        :options="mailFieldConditions"
        class="mb-15px"
        v-model="mailFieldConditionValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Когда</p>
      <MyDropdown
        :defaultValue="'Выберите условие'"
        :options="mailFieldWhen"
        class="mb-25px"
        v-model="mailFieldWhenValue"
      />
      <div>
        <UiButton size="semiaction" variant="action" class="mr-15px">
          Добавить
        </UiButton>
        <UiButton
          size="second-back"
          variant="back"
          @click="handleCloseMailPopup"
        >
          Назад
        </UiButton>
      </div>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll('form')">
    <Popup
      :isOpen="openFormPopup"
      @close="handleCloseFormPopup"
      :show-close-button="false"
      :width="'400px'"
      :disableOverflowHidden="true"
      :overflowContainer="true"
    >
      <p class="text-xl font-semibold text-space mb-25px leading-normal">
        Назначение действия
      </p>
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Этап воронки
      </p>
      <StatusService :status="'Подумать'" class="mb-15px" />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Действие
      </p>
      <StatusService
        :nameIcon="'form-user'"
        :status="'Отправить анкету'"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Выбор анкеты
      </p>
      <MyDropdown
        :defaultValue="'Выберите шаблон'"
        :options="formFieldSend"
        class="mb-15px"
        v-model="formFieldSendValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Если</p>
      <MyDropdown
        :defaultValue="'Выберите поле'"
        :options="formFieldIf"
        class="mb-15px"
        v-model="formFieldIfValue"
      />
      <p class="text-sm font-medium text-space mb-15px">Условие</p>
      <MyDropdown
        :defaultValue="'Выберите условие'"
        :options="formFieldConditions"
        class="mb-15px"
        v-model="formFieldConditionValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Когда</p>
      <MyDropdown
        :defaultValue="'Выберите время'"
        :options="formFieldWhen"
        class="mb-25px"
        v-model="formFieldWhenValue"
      />
      <div>
        <UiButton size="semiaction" variant="action" class="mr-15px">
          Добавить
        </UiButton>
        <UiButton
          size="second-back"
          variant="back"
          @click="handleCloseFormPopup"
        >
          Назад
        </UiButton>
      </div>
    </Popup>
  </transition>
</template>

<style scoped>
  .card:not(:last-child) {
    margin-bottom: 1.22rem;
  }

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
