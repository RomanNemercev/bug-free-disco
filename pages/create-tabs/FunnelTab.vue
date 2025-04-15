<script setup>
  import { ref } from 'vue'
  import draggable from 'vuedraggable'
  import MyInput from '@/components/custom/MyInput.vue'
  import Popup from '~/components/custom/Popup.vue'

  const items = ref([])
  const isDragging = ref(false)
  const newFunnelName = ref('')

  const openActionPopup = ref(false)
  const openInvitePopup = ref(false)
  const openMovePopup = ref(false)
  const openMailPopup = ref(false)
  const openFormPopup = ref(false)

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

  function enableBodyScroll() {
    document.body.style.overflow = '' // Включаем прокрутку
  }

  // config for control scroll
  function disableBodyScroll() {
    document.body.style.overflow = 'hidden' // Отключаем прокрутку
  }

  function handleOpenAction() {
    openActionPopup.value = true
    disableBodyScroll()
  }

  function handleCloseActionPopup() {
    openActionPopup.value = false
    enableBodyScroll()
  }

  function handleOpenInvite() {
    openInvitePopup.value = true
    disableBodyScroll()
  }

  function handleCloseInvitePopup() {
    openInvitePopup.value = false
  }

  function handleOpenMove() {
    openMovePopup.value = true
    disableBodyScroll()
  }

  function handleCloseMovePopup() {
    openMovePopup.value = false
  }

  function handleOpenMail() {
    openMailPopup.value = true
    disableBodyScroll()
  }

  function handleCloseMailPopup() {
    openMailPopup.value = false
  }

  function handleOpenForm() {
    openFormPopup.value = true
    disableBodyScroll()
  }

  function handleCloseFormPopup() {
    openFormPopup.value = false
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
  <transition name="fade" @after-leave="enableBodyScroll">
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
  <transition name="fade" @after-leave="enableBodyScroll">
    <Popup
      :isOpen="openInvitePopup"
      @close="handleCloseInvitePopup"
      :show-close-button="false"
      :width="'400px'"
    >
      <p class="text-xl font-semibold text-space mb-35px leading-normal">
        Назначение действия
      </p>
      <p>Пригласить кандидата</p>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll">
    <Popup
      :isOpen="openMovePopup"
      @close="handleCloseMovePopup"
      :show-close-button="false"
      :width="'400px'"
    >
      <p class="text-xl font-semibold text-space mb-35px leading-normal">
        Назначение действия
      </p>
      <p>Переместить на другой этап</p>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll">
    <Popup
      :isOpen="openMailPopup"
      @close="handleCloseMailPopup"
      :show-close-button="false"
      :width="'400px'"
    >
      <p class="text-xl font-semibold text-space mb-35px leading-normal">
        Назначение действия
      </p>
      <p>Отправить письмо на почту</p>
    </Popup>
  </transition>
  <transition name="fade" @after-leave="enableBodyScroll">
    <Popup
      :isOpen="openFormPopup"
      @close="handleCloseFormPopup"
      :show-close-button="false"
      :width="'400px'"
    >
      <p class="text-xl font-semibold text-space mb-35px leading-normal">
        Назначение действия
      </p>
      <p>Отправить анкету</p>
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
