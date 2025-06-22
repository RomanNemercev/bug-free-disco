<script setup>
import { ref } from 'vue'
import DotsDropdown from '~/components/custom/DotsDropdown.vue'

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
</script>

<template>
  <div>
    <div class="p-25px rounded-fifteen bg-white flex justify-between mb-15px items-center">
      <div>
        <p class="text-xl font-semibold text-space mb-2.5">Анкеты</p>
        <p class="text-sm text-bali font-normal leading-150">Узнавайте опыт кандидатов и&nbsp;многое другое</p>
      </div>
      <UiButton variant="action" size="semiaction" class="font-semibold">Создать анкету</UiButton>
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
  </div>
</template>
