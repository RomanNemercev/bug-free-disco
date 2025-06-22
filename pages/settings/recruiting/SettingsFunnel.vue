<script setup>
import { ref } from 'vue'
import DotsDropdown from '~/components/custom/DotsDropdown.vue'

definePageMeta({
  layout: 'settings',
})

useHead({
  title: 'Настройки — Воронка найма',
})

const funnelsData = ref([
  {
    id: 1,
    name: 'Воронка для менеджера по продажам',
    stages: 5,
  },
  {
    id: 2,
    name: 'Повар от 12/12/2024',
    stages: 12,
  },
  {
    id: 3,
    name: 'Продавец консультантов',
    stages: 24,
  }
])
</script>

<template>
  <div>
    <div class="mb-2.5">
      <div class="flex justify-between mb-1px bg-white rounded-fifteen p-25px gap-2.5 pb-23px items-center">
        <div>
          <p class="text-xl text-space mb-2.5 font-semibold">Воронка найма</p>
          <p class="text-sm text-bali font-normal leading-150">Настройте воронку или создайте новую под определенную
            вакансию</p>
        </div>
        <UiButton variant="action" size="semiaction">Создать новую воронку</UiButton>
      </div>
    </div>
    <div class="[&>*:not(:last-child)]:mb-11px">
      <div v-if="funnelsData.length > 0" v-for="(funnel, index) in funnelsData" :key="index"
        class="bg-white rounded-fifteen p-25px flex justify-between gap-x-2.5">
        <div>
          <p class="text-lg text-space font-medium leading-130 mb-5px">{{ funnel.name }}</p>
          <p class="text-sm font-normal text-bali">{{ funnel.stages }} этапов</p>
        </div>
        <div class="flex gap-x-2.5">
          <div
            class="text-sm cursor-pointer transition-all w-fit h-fit select-none flex gap-x-2.5 py-2.5 px-5 items-center rounded-ten whitespace-nowrap"
            :class="[funnel.stagesOpen ? 'bg-space text-white' : 'bg-zumthor text-dodger']"
            @click="funnel.stagesOpen = !funnel.stagesOpen">
            <p><span v-if="!funnel.stagesOpen">Раскрыть этапы</span><span v-else>Скрыть этапы</span></p><span
              class="flex h-fit" :class="{ 'rotate-180': funnel.stagesOpen }"><svg-icon name="dropdown-arrow" width="16"
                height="16" /></span>
          </div>
          <DotsDropdown :items="['Удалить воронку']" />
        </div>
      </div>
      <div v-else class="text-bali min-h-[223px] flex items-center justify-center bg-catskill rounded-fifteen">
        <p class="text-15px font-medium text-bali">Тут ничего</p>
      </div>
    </div>
  </div>
</template>
