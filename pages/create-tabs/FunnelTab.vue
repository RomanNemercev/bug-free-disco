<script setup>
  import { ref, onMounted } from 'vue'
  import draggable from 'vuedraggable'
  import MyInput from '@/components/custom/MyInput.vue'
  import UiDotsLoader from '@/components/custom/UiDotsLoader.vue'

  const items = ref([])
  const isDragging = ref(false)
  const newFunnelName = ref('')
  const isLoading = ref(true)

  const fetchItems = async () => {
    try {
      isLoading.value = true
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
    } finally {
      isLoading.value = false
    }
  }

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

  onMounted(async () => {
    await fetchItems()
  })
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
        <UiDotsLoader v-if="isLoading" />
        <div v-else>
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
                    <button class="flex items-center gap-x-5px">
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
  </div>
</template>

<style scoped>
  .card:not(:last-child) {
    margin-bottom: 1.22rem;
  }
</style>
