<script setup>
  import { ref } from 'vue'
  import draggable from 'vuedraggable'
  import MyInput from '@/components/custom/MyInput.vue'
  import Popup from '~/components/custom/Popup.vue'
  import StatusService from '~/components/custom/ServiceStatus.vue'
  import MyDropdown from '~/components/custom/MyDropdown.vue'
  import ResponseChoose from '~/components/custom/ResponseChoose.vue'
  import Autocomplete from '~/components/custom/Autocomplete.vue'

  import * as DropdownData from '~/src/data/funnelDropdowns.json'
  import responses from '~/src/data/responses.json'
  import ActiveTasks from '~/src/data/active-tasks.json'

  const items = ref([])
  const isDragging = ref(false)
  const newFunnelName = ref('')

  const openPopups = ref([])
  const openActionPopup = ref(false)
  const openInvitePopup = ref(false)
  const openMovePopup = ref(false)
  const openMailPopup = ref(false)
  const openFormPopup = ref(false)
  const openRemovePopup = ref(false)
  const openDeniedPopup = ref(false)
  const openChangeResponsePopup = ref(false)
  const openChangeTextPopup = ref(false)
  const showInput = ref(false)
  const showInputTask = ref(false)
  const openWebhookPopup = ref(false)
  const openCreateTaskPopup = ref(false)
  const openFinishTaskPopup = ref(false)
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
  const deniedFieldIfValue = ref('')
  const deniedFieldConditionValue = ref('')
  const deniedFieldWhenValue = ref('')
  const newResponsible = ref('')
  const changeText = ref('')
  const sendWebhook = ref('')
  const createTask = ref('')
  const newResponseTask = ref('')
  const taskCreateFieldWhenValue = ref('')
  const targetToFinishTask = ref('')
  const taskFinishFieldWhenValue = ref('')

  const removingItemTitle = ref('')

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
      handler: handleDeniedPopup,
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
      handler: handleChangeResponsePopup,
    },
    {
      id: 6,
      icon: 'change-text',
      title: 'Изменить поле',
      handler: handleOpenChangeTextPopup,
    },
    {
      id: 7,
      icon: 'webhook',
      title: 'Отправить webhook',
      handler: handleOpenWebhookPopup,
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
      handler: handleCreateTaskPopup,
    },
    {
      id: 10,
      icon: 'task-complete',
      title: 'Завершить задачу',
      handler: handleFinishTaskPopup,
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
    removingItemTitle.value = items.value[index].title
    handleRemovePopup()
  }

  const confirmRemove = () => {
    const index = items.value.findIndex(
      item => item.title === removingItemTitle.value
    )
    if (index !== -1) {
      items.value.splice(index, 1) // Удаляем элемент
    }
    handleCloseRemovePopup() // Закрываем попап
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

  function handleRemovePopup() {
    openRemovePopup.value = true
    disableBodyScroll('remove')
  }

  function handleCloseRemovePopup() {
    openRemovePopup.value = false
  }

  function handleDeniedPopup() {
    openDeniedPopup.value = true
    openActionPopup.value = false
    disableBodyScroll('denied')
  }

  function handleCloseDeniedPopup() {
    openDeniedPopup.value = false
    openActionPopup.value = true
    disableBodyScroll('action')
  }

  function handleChangeResponsePopup() {
    openChangeResponsePopup.value = true
    openActionPopup.value = false
    disableBodyScroll('change-response')
  }

  function handleCloseChangeResponsePopup() {
    openChangeResponsePopup.value = false
    openActionPopup.value = true
    disableBodyScroll('action')
  }

  function handleShowInput(value) {
    console.log('handleShowInput called with:', value) // Для отладки
    showInput.value = value
  }

  function handleShowInputTask(value) {
    showInputTask.value = value
  }

  function handleOpenChangeTextPopup() {
    openChangeTextPopup.value = true
    openActionPopup.value = false
    disableBodyScroll('change-field')
  }

  function handleCloseChangeTextPopup() {
    openChangeTextPopup.value = false
    openActionPopup.value = true
    disableBodyScroll('action')
  }

  function handleOpenWebhookPopup() {
    openWebhookPopup.value = true
    openActionPopup.value = false
    disableBodyScroll('webhook')
  }

  function handleCloseWebhookPopup() {
    openWebhookPopup.value = false
    openActionPopup.value = true
    disableBodyScroll('action')
  }

  function handleCreateTaskPopup() {
    openCreateTaskPopup.value = true
    openActionPopup.value = false
    disableBodyScroll('create-task')
  }

  function handleCloseCreateTaskPopup() {
    openCreateTaskPopup.value = false
    openActionPopup.value = true
    disableBodyScroll('action')
  }

  function handleFinishTaskPopup() {
    openFinishTaskPopup.value = true
    openActionPopup.value = false
    disableBodyScroll('finish-task')
  }

  function handleCloseFinishTaskPopup() {
    openFinishTaskPopup.value = false
    openActionPopup.value = true
    disableBodyScroll('action')
  }
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
        :options="DropdownData.inviteFieldIf"
        class="mb-15px"
        v-model="inviteFieldIfValue"
      />
      <p class="text-sm font-medium text-space mb-15px">Условие</p>
      <MyDropdown
        :defaultValue="'Выберите условие'"
        :options="DropdownData.inviteFieldCondition"
        class="mb-15px"
        v-model="inviteFieldConditionValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Когда</p>
      <MyDropdown
        :defaultValue="'Выберите время'"
        :options="DropdownData.inviteFieldWhen"
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
        :options="DropdownData.moveFieldLevel"
        class="mb-15px"
        v-model="moveFieldLevelValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Если</p>
      <MyDropdown
        :defaultValue="'Выберите поле'"
        :options="DropdownData.moveFieldIf"
        class="mb-15px"
        v-model="moveFieldIfValue"
      />
      <p class="text-sm font-medium text-space mb-15px">Условие</p>
      <MyDropdown
        :defaultValue="'Выберите условие'"
        :options="DropdownData.moveFieldCondition"
        class="mb-15px"
        v-model="moveFieldConditionValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Когда</p>
      <MyDropdown
        :defaultValue="'Выберите время'"
        :options="DropdownData.moveFieldWhen"
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
        :options="DropdownData.mailFieldSend"
        class="mb-15px"
        v-model="mailFieldSendValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Если</p>
      <MyDropdown
        :defaultValue="'Выберите поле'"
        :options="DropdownData.mailFieldItems"
        class="mb-15px"
        v-model="mailFieldItemValue"
      />
      <p class="text-sm font-medium text-space mb-15px">Условие</p>
      <MyDropdown
        :defaultValue="'Выберите условие'"
        :options="DropdownData.mailFieldConditions"
        class="mb-15px"
        v-model="mailFieldConditionValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Когда</p>
      <MyDropdown
        :defaultValue="'Выберите условие'"
        :options="DropdownData.mailFieldWhen"
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
        :options="DropdownData.formFieldSend"
        class="mb-15px"
        v-model="formFieldSendValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Если</p>
      <MyDropdown
        :defaultValue="'Выберите поле'"
        :options="DropdownData.formFieldIf"
        class="mb-15px"
        v-model="formFieldIfValue"
      />
      <p class="text-sm font-medium text-space mb-15px">Условие</p>
      <MyDropdown
        :defaultValue="'Выберите условие'"
        :options="DropdownData.formFieldConditions"
        class="mb-15px"
        v-model="formFieldConditionValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Когда</p>
      <MyDropdown
        :defaultValue="'Выберите время'"
        :options="DropdownData.formFieldWhen"
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
  <transition name="fade" @after-leave="enableBodyScroll('remove')">
    <Popup
      :isOpen="openRemovePopup"
      @close="handleCloseRemovePopup"
      :width="'490px'"
    >
      <p class="text-xl font-semibold text-space mb-2.5 leading-normal">
        Удаление поля
      </p>
      <p class="text-bali text-sm font-normal mb-25px line-height">
        Вы действительно хотите удалить поле&nbsp;
        <span class="whitespace-nowrap">“{{ removingItemTitle }}”</span>
        &nbsp;?
      </p>
      <div class="flex justify-between">
        <UiButton variant="back" size="back" @click="handleCloseRemovePopup">
          Отмена
        </UiButton>
        <UiButton variant="delete" size="delete" @click="confirmRemove">
          Удалить поле
        </UiButton>
      </div>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll('denied')">
    <Popup
      :isOpen="openDeniedPopup"
      @close="handleCloseDeniedPopup"
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
        :nameIcon="'stop20'"
        :status="'Отказать кандидату'"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px">Если</p>
      <MyDropdown
        :defaultValue="'Выберите поле'"
        :options="DropdownData.deniedFieldIf"
        class="mb-15px"
        v-model="deniedFieldIfValue"
      />
      <p class="text-sm font-medium text-space mb-15px">Условие</p>
      <MyDropdown
        :defaultValue="'Выберите условие'"
        :options="DropdownData.deniedFieldCondition"
        class="mb-15px"
        v-model="deniedFieldConditionValue"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Когда</p>
      <MyDropdown
        :defaultValue="'Выберите время'"
        :options="DropdownData.deniedFieldWhen"
        v-model="deniedFieldWhenValue"
        class="mb-25px"
      />
      <div>
        <UiButton size="semiaction" variant="action" class="mr-15px">
          Добавить
        </UiButton>
        <UiButton
          size="second-back"
          variant="back"
          @click="handleCloseDeniedPopup"
        >
          Назад
        </UiButton>
      </div>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll('change-response')">
    <Popup
      :isOpen="openChangeResponsePopup"
      @close="handleCloseChangeResponsePopup"
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
        :nameIcon="'change-user'"
        :status="'Сменить ответственного'"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Настоящий ответственный
      </p>
      <StatusService :status="'Иванов Иван'" class="mb-15px" />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Новый ответственный
      </p>
      <ResponseChoose
        v-model="newResponsible"
        :showInput="showInput"
        :responses="responses"
        @update:showInput="handleShowInput"
        class="mb-25px"
      />
      <div>
        <UiButton size="semiaction" variant="action" class="mr-15px">
          Добавить
        </UiButton>
        <UiButton
          size="second-back"
          variant="back"
          @click="handleCloseChangeResponsePopup"
        >
          Назад
        </UiButton>
      </div>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll('change-field')">
    <Popup
      :isOpen="openChangeTextPopup"
      @close="handleCloseChangeTextPopup"
      :show-close-button="false"
      :width="'400px'"
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
        :nameIcon="'change-text'"
        :status="'Изменить поле'"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Настоящее поле
      </p>
      <StatusService :status="'Временное значение'" class="mb-15px" />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Новое поле
      </p>
      <MyInput
        :placeholder="'Введите значение'"
        v-model="changeText"
        class="mb-25px"
      />
      <div>
        <UiButton size="semiaction" variant="action" class="mr-15px">
          Добавить
        </UiButton>
        <UiButton
          size="second-back"
          variant="back"
          @click="handleCloseChangeTextPopup"
        >
          Назад
        </UiButton>
      </div>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll('webhook')">
    <Popup
      :isOpen="openWebhookPopup"
      @close="handleCloseWebhookPopup"
      :show-close-button="false"
      :width="'400px'"
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
        :nameIcon="'webhook'"
        :status="'Отправить webhook'"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Адрес webhook(url)
      </p>
      <MyInput
        :placeholder="'Введите адрес'"
        v-model="sendWebhook"
        class="mb-25px"
      />
      <div>
        <UiButton size="semiaction" variant="action" class="mr-15px">
          Добавить
        </UiButton>
        <UiButton
          size="second-back"
          variant="back"
          @click="handleCloseWebhookPopup"
        >
          Назад
        </UiButton>
      </div>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll('create-task')">
    <Popup
      :isOpen="openCreateTaskPopup"
      @close="handleCloseCreateTaskPopup"
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
        :nameIcon="'task-create'"
        :status="'Создать задачу'"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Название задачи
      </p>
      <MyInput
        :placeholder="'Введите название'"
        v-model="createTask"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Ответственный
      </p>
      <ResponseChoose
        v-model="newResponseTask"
        :showInput="showInputTask"
        :responses="responses"
        @update:showInputTask="handleShowInputTask"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Когда</p>
      <MyDropdown
        :defaultValue="'Выберите время'"
        :options="DropdownData.taskCreateFieldWhen"
        v-model="taskCreateFieldWhenValue"
        class="mb-25px"
      />
      <div>
        <UiButton size="semiaction" variant="action" class="mr-15px">
          Добавить
        </UiButton>
        <UiButton
          size="second-back"
          variant="back"
          @click="handleCloseCreateTaskPopup"
        >
          Назад
        </UiButton>
      </div>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll('finish-task')">
    <Popup
      :isOpen="openFinishTaskPopup"
      @close="handleCloseFinishTaskPopup"
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
        :nameIcon="'task-complete'"
        :status="'Завершить задачу'"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">
        Выбрать задачу
      </p>
      <Autocomplete
        :source="ActiveTasks"
        v-model="targetToFinishTask"
        placeholder="Начните ввод для поиска"
        class="mb-15px"
      />
      <p class="text-sm font-medium text-space mb-15px leading-normal">Когда</p>
      <MyDropdown
        :defaultValue="'Выберите время'"
        :options="DropdownData.taskFinishFieldWhen"
        v-model="taskFinishFieldWhenValue"
        class="mb-25px"
      />
      <div>
        <UiButton size="semiaction" variant="action" class="mr-15px">
          Добавить
        </UiButton>
        <UiButton
          size="second-back"
          variant="back"
          @click="handleCloseFinishTaskPopup"
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
