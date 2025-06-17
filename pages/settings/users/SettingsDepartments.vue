<script setup>
import { ref } from 'vue'
import BtnTab from '~/components/custom/BtnTab.vue'
import MyCheckbox from '~/components/custom/MyCheckbox.vue'
import MyInputSecond from '~/components/custom/MyInputSecond.vue'
import draggable from 'vuedraggable'


const settingsTabs = ref('departments')
const departmentsCheck = ref(false)

definePageMeta({
  layout: 'settings',
})

useHead({
  title: 'Настройки — Отделы и роли',
})

const data = ref([
  {
    id: 1,
    name: 'Разработка',
    customId: '29139123812',
    checked: false,
    subDepartments: [
      {
        id: 1,
        name: 'Аналитика',
        checked: false,
        hover: false,
      },
      {
        id: 2,
        name: 'Програмированние',
        checked: false,
        hover: false,
      },
      {
        id: 3,
        name: 'Управление проектами',
        checked: false,
        hover: false,
      },
    ],
    newSubDep: '',
  },
  {
    id: 2,
    name: 'Маркетинг',
    customId: '29139123812',
    checked: false,
    subDepartments: [
      {
        id: 1,
        name: 'SEO',
        checked: false,
        hover: false,
      },
      {
        id: 2,
        name: 'SMM',
        checked: false,
        hover: false,
      },
      {
        id: 3,
        name: 'Контент-маркетинг',
        checked: false,
        hover: false,
      },
    ],
    newSubDep: '',
  },
  {
    id: 3,
    name: 'Финансы',
    customId: '29139123812',
    checked: false,
    subDepartments: [
      {
        id: 1,
        name: 'Бухгалтерия',
        checked: false,
        hover: false,
      },
      {
        id: 2,
        name: 'Анализ данных',
        checked: false,
        hover: false,
      },
      {
        id: 3,
        name: 'Управление рисками',
        checked: false,
        hover: false,
      },
    ],
    newSubDep: '',
  },
])

function addSubDepartment(dep) {
  if (!dep.newSubDep || !dep.newSubDep.trim()) return
  dep.subDepartments.push({
    id: dep.subDepartments.length + 1,
    name: dep.newSubDep.trim(),
  })
  dep.newSubDep = ''
  console.log(`Добавлен новый отдел: ${dep.newSubDep.trim()} в департамент ${dep.name}`)
}
</script>

<template>
  <div class="w-full">
    <div class="mb-15px">
      <div class="w-full bg-white rounded-t-fifteen p-25px flex justify-between gap-2.5">
        <div>
          <p class="text-xl font-semibold mb-2.5">Структура вашей организации</p>
          <p class="text-sm font-normal text-bali">Управляйте департаментами и&nbsp;отделами, создавайте структуру вашей
            компании</p>
        </div>
        <UiButton variant="action" size="semiaction">Создать департамент</UiButton>
      </div>
      <div class="w-full bg-athens h-[1px]"></div>
      <div class="bg-catskill w-full p-25px rounded-b-fifteen">
        <BtnTab :tabs="[
          { label: 'Департаменты', value: 'departments' },
          { label: 'Роли', value: 'roles' },
          { label: 'Внешние заказчики', value: 'external' },
        ]" defaultTab="departments" v-model="settingsTabs" />
      </div>
    </div>
    <div>
      <div class="w-full rounded-t-fifteen bg-catskill px-15px py-25px flex">
        <MyCheckbox v-model="departmentsCheck" :twenty-gap="true" :label="'Подразделение'" :id="'departmentsCheck'"
          :labelColor="'bali'" :fontWeight="'medium'" />
      </div>
      <div class="w-full bg-athens h-1px"></div>
      <div class="[&>*:not(:last-child)]:mb-1px rounded-begin">
        <div v-for="(dep, index) in data" :key="index" class="flex flex-col bg-white last-of-type:rounded-b-fifteen">
          <div class="flex items-center py-5 px-15px" :class="{ 'border-b border-athens': dep.viewSubs }">
            <MyCheckbox v-model="dep.checked" :twenty-gap="true" :id="dep.name" />
            <div>
              <div class="cursor-pointer flex items-center" @click="dep.viewSubs = !dep.viewSubs">
                <p class="text-sm font-medium mr-5px select-none"
                  :class="[dep.viewSubs ? 'text-dodger' : 'text-space']">{{ dep.name }}</p><svg-icon
                  :class="[dep.viewSubs ? 'text-dodger rotate-180' : 'text-space']" name="dropdown-arrow" width="16"
                  height="16" />
              </div>
              <span class="text-xs text-bali font-normal leading-130">ID {{ dep.customId }}</span>
            </div>
          </div>
          <div v-show="dep.viewSubs" class="rounded-inter">
            <div class="bg-white rounded-target">
              <draggable v-model="dep.subDepartments" item-key="id" :animation="200" handle=".drag-handle">
                <template #item="{ element: sub, index: subIndex }">
                  <div
                    class="flex items-center px-15px py-2.5 border-b border-athens last-of-type:rounded-b-fifteen last-of-type:border-b-0"
                    :key="sub.id" @mouseover="sub.hover = true" @mouseleave="sub.hover = false">
                    <span class="drag-handle cursor-grab p-2.5 mr-2 rounded-ten hover:bg-zumthor opacity-0"
                      :class="[{ 'opacity-100': sub.hover }]"><svg-icon name="drag-burger" width="20"
                        height="20" /></span>
                    <MyCheckbox v-model="sub.checked" :twenty-gap="true" :id="sub.name" :label="sub.name" />
                    <div class="flex ml-auto gap-x-2.5 opacity-0" :class="[{ 'opacity-100': sub.hover }]">
                      <button
                        class="border border-ahtens bg-athens-gray rounded-ten p-9px text-slate-custom hover:text-dodger hover:bg-zumthor hover:border-zumthor h-fit"><svg-icon
                          name="pencil" width="20" height="20" /></button>
                      <button
                        class="border border-ahtens bg-athens-gray rounded-ten p-9px text-slate-custom hover:text-dodger hover:bg-zumthor hover:border-zumthor h-fit"><svg-icon
                          name="basket-basket" width="20" height="20" /></button>
                      <button
                        class="border border-ahtens bg-athens-gray rounded-ten p-9px text-slate-custom hover:text-dodger hover:bg-zumthor hover:border-zumthor h-fit"><svg-icon
                          name="more-plus" width="20" height="20" /></button>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
            <div class="flex items-center pl-60px py-2.5"><svg-icon name="plus-blue20" width="20" height="20"
                @click="addSubDepartment(dep)" class="mr-2.5 cursor-pointer" />
              <div class="w-full pr-60px">
                <MyInputSecond v-model="dep.newSubDep" :placeholder="'Введите название нового отдела'"
                  @keyup.enter="addSubDepartment(dep)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rounded-begin:last-child .rounded-inter .rounded-target {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
</style>