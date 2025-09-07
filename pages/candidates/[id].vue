<template>
  <div class="container py-25px">
    <div class="flex justify-between mb-25px">
      <NuxtLink to="/candidates" class="text-blue-500 hover:underline">
        <div class="flex items-center gap-2.5 justify-center">
          <svg-icon name="arrow-left-dodger" width="18" height="18" />
          <span class="text-sm font-medium text-dodger">
            Вернуться к списку
          </span>
        </div>
      </NuxtLink>
      <div class="flex items-center gap-2.5">
        <!-- Кнопка "Назад" -->
        <button
          class="p-2.5 rounded-ten bg-white text-slate-custom"
          :class="{ 'opacity-0 cursor-auto': currentIndex === 0 }"
          :disabled="currentIndex === 0"
          @click="goToPrevious"
        >
          <svg-icon name="pagination-arrow-left" width="20" height="20" />
        </button>

        <!-- Индикатор текущей позиции -->
        <div
          class="bg-white rounded-ten py-3 px-15px text-13px font-bold text-space leading-normal"
        >
          <span>{{ currentIndex + 1 }}</span>
          из
          <span>{{ totalCandidates }}</span>
        </div>

        <!-- Кнопка "Вперёд" -->
        <button
          class="p-2.5 rounded-ten bg-white text-slate-custom"
          :class="{
            'opacity-0 cursor-auto': currentIndex === totalCandidates - 1,
          }"
          :disabled="currentIndex === totalCandidates - 1"
          @click="goToNext"
        >
          <svg-icon name="pagination-arrow-right" width="20" height="20" />
        </button>
      </div>
    </div>
    <div class="w-full" v-if="candidate">
      <div class="bg-white rounded-fifteen p-25px relative mb-15px pt-15px">
        <div class="justify-between flex mb-[41px]">
          <ButtonSelector :options="options" v-model="selectedLabel" />
          <div class="flex gap-x-2.5">
            <BtnMessage />
            <BtnCalendar />
            <BtnEmail />
            <BtnStop />
            <div>
              <MyTooltip text="Еще действия" />
              <DotsDropdown :items="dropdownOptions" />
            </div>
          </div>
        </div>
        <div
          class="absolute w-full left-0 h-[1px] bg-athens-gray top-[70px]"
        ></div>
        <div class="flex justify-between">
          <div>
            <p class="text-25px font-bold text-space leading-normal mb-2">
              {{ candidate.surname }} {{ candidate.firstName }}
            </p>
            <p class="text-15px font-medium text-space leading-normal mb-6px">
              {{ candidate.vacancy }}
            </p>
            <p class="text-13px text-slate-custom mb-6">
              г. {{ candidate.location }}
            </p>
            <div class="flex">
              <p
                class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]"
              >
                Телефон:
              </p>
              <div class="mr-2.5 flex">
                <span class="text-sm font-medium text-space mr-4">
                  {{ candidate.phone }}
                </span>
                <div>
                  <button class="mr-1">
                    <svg-icon name="tg20" width="21" height="21" />
                  </button>
                  <button class="mr-1">
                    <svg-icon name="viber20" width="21" height="21" />
                  </button>
                  <button>
                    <svg-icon name="wh20" width="21" height="21" />
                  </button>
                </div>
              </div>
            </div>
            <div class="flex">
              <p
                class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]"
              >
                Почта:
              </p>
              <p class="text-sm font-medium text-space">
                {{ candidate.email }}
              </p>
            </div>
            <div class="flex">
              <p
                class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]"
              >
                Скайп:
              </p>
              <p class="text-sm font-medium text-space">
                {{ candidate.skype }}
              </p>
            </div>
            <div class="flex">
              <p
                class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]"
              >
                Telegram:
              </p>
              <p class="text-sm font-medium text-space">
                {{ candidate.telegram }}
              </p>
            </div>
            <div class="flex">
              <p
                class="min-w-[70px] text-sm font-normal text-space leading-150 mr-[45px]"
              >
                Теги:
              </p>
              <div class="flex">
                <span
                  v-for="(tag, index) in candidate.tags"
                  :key="index"
                  class="mr-2 text-dodger text-sm font-medium"
                >
                  {{ tag }}
                </span>
                <button
                  :class="{ 'ml-2.5': candidate.tags.length > 0 }"
                  class="text-slate-custom flex items-center"
                >
                  <svg-icon
                    name="plus-gray20"
                    width="18"
                    height="17"
                    class="mr-5px"
                  />
                  <span class="text-sm font-medium">Добавить</span>
                </button>
              </div>
            </div>
          </div>
          <div class="w-[200px] h-[200px]">
            <img
              :src="candidate.photo"
              alt="Фото кандидата"
              class="rounded-fifteen h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="bg-catskill rounded-t-fifteen py-15px px-25px mb-px">
          <BtnTab :tabs="tabs" v-model="activeTab" />
        </div>
        <div>
          <div v-if="activeTab === 'resume'">
            <div class="mb-px bg-white p-25px pt-[27px]">
              <p class="text-15px text-space font-medium mb-15px">
                Краткие сведения
              </p>
              <p class="text-sm text-slate-custom leading-150">
                {{ candidate.quickInfo }}
              </p>
            </div>
            <div class="mb-px bg-white p-25px">
              <p class="text-15px text-space font-medium mb-4">Образование</p>
              <p class="text-sm text-slate-custom mb-8">{{ candidate.education.level.name }}</p>
              <ul v-if="candidate.education.primary.length > 0">
                <li
                  v-for="(item, index) in candidate.education.primary"
                  :key="index"
                  class="text-sm text-slate-custom mb-4"
                >
                  {{ item.name }}
                  <p class="text-xs">
                    <span v-if="item.university_acronym">{{ item.university_acronym }}, </span>
                    <span v-if="item.organization">{{ item.organization }}, </span>
                    <span v-if="item.result">{{ item.result }}, </span>
                    <span v-if="item.year">{{ item.year }}</span>
                  </p>
                </li>
              </ul>
            </div>
            <div class="mb-px bg-white p-25px">
              <p class="text-15px text-space font-medium mb-4">Курсы повышения квалификации</p>
              <p class="text-sm text-slate-custom mb-8">{{ candidate.education.additional.name }}</p>
              <ul v-if="candidate.education.additional.length > 0">
                <li
                  v-for="(item, index) in candidate.education.additional"
                  :key="index"
                  class="text-sm text-slate-custom mb-4"
                >
                  {{ item.name }}
                  <p class="text-xs">
                    <span v-if="item.organization">{{ item.organization }}, </span>
                    <span v-if="item.result">{{ item.result }}, </span>
                    <span v-if="item.year">{{ item.year }}</span>
                  </p>
                </li>
              </ul>
            </div>
            <div class="mb-px bg-white p-25px">
              <p class="text-15px text-space font-medium mb-3.5">Навыки</p>
              <div>
                <div v-if="candidate.skills.length === 0">
                  <p class="text-sm font-normal text-slate-custom">
                    Кандидат не указал навыки
                  </p>
                </div>
                <div v-else class="gap-5px flex flex-wrap">
                  <span
                    v-for="(skill, index) in candidate.skills"
                    :key="index"
                    class="text-13px font-normal text-space px-[10.56px] py-5px rounded-plus bg-athens-gray max-h-[27px] whitespace-nowrap"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
            <div class="bg-white mb-px p-25px pt-27px pb-[23px]">
              <p class="text-15px text-space font-medium mb-15px">
                Прикрепленные файлы
              </p>
              <div v-if="candidate.attachedFiles.length === 0">
                <p class="text-sm font-normal text-slate-custom">
                  Кандидат не прикрепил файлы
                </p>
              </div>
              <div v-else class="flex gap-25px">
                <div
                  v-for="file in candidate.attachedFiles"
                  :key="file.name"
                  class="max-w-[100px]"
                >
                  <a :href="file.path" target="_blank">
                    <span
                      class="bg-zumthor w-[100px] h-[100px] flex items-center justify-center text-sm font-medium text-dodger rounded-tl-fifteen rounded-tr-[35px] rounded-b-fifteen uppercase mb-9px"
                    >
                      {{ file.type }}
                    </span>
                    <div class="flex">
                      <span class="truncate text-sm text-dodger font-medium">
                        {{ file.name }}
                      </span>
                      <span class="text-sm text-dodger font-medium">
                        .{{ file.type }}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-b-fifteen p-25px">
              <p class="text-15px text-space font-medium mb-4">Ссылки</p>
              <div>
                <div v-if="candidate.links.length === 0">
                  <p class="text-sm font-normal text-slate-custom">
                    Кандидат не поделился ссылками
                  </p>
                </div>
                <div v-else>
                  <div v-for="(link, index) in candidate.links" :key="index">
                    <a
                      :href="link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-dodger text-sm font-medium hover:underline"
                    >
                      {{ link }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'fields'">
            <div class="bg-white p-25px pb-[37px] mb-px pl-30px">
              <div class="flex items-center mb-22px">
                <p class="text-lg text-space font-bold mr-2.5 leading-normal">
                  Форма отклика
                </p>
                <span
                  class="rounded-fifteen text-xs font-normal px-2.5 py-[3.5px] bg-feta h-fit"
                >
                  Заполнено
                </span>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Фамилия Имя Отчество
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.surname }} {{ candidate.firstName }}
                  {{ candidate.patronymic || '' }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Электронная почта
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.email }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Телефон
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.phone }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Заголовок
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.header }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Адрес проживания
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.locationFull }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Образование
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.educationLevel }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Опыт работы
                </p>
                <ul v-if="candidate.experience.length > 0" class="text-sm font-normal text-space leading-150">
                  <li class="mb-5" v-for="(exp, index) in candidate.experience" :key="index">
                    <div class="text-13px font-normal text-slate-custom leading-normal mb-7px">
                      <p class="text-13px font-normal text-slate-custom leading-normal mb-7px">
                        {{ exp?.start ? dateStringToDots(exp?.start) : '' }} - {{ exp?.end ? dateStringToDots(exp?.start) : 'по настоящее время' }}
                      </p>
                      <p v-if="exp.employer !== null" class="flex items-center gap-2">
                        <img v-if="exp.employer?.logo_urls" :src="exp.employer.logo_urls[90]" width="40"> 
                        <a v-if="exp.employer?.alternate_url" class="text-dodger" :href="exp.employer.alternate_url" target="_blank">
                          {{ exp?.employer.name }}
                        </a>
                      </p>
                      
                    </div>
                    <p class="underline text-sm font-medium text-space leading-normal mb-2">
                        {{ exp?.position }}
                      </p>
                      <template v-if="exp?.description.split('\n').length > 0">
                        <p v-for="(description, index) in exp?.description.split('\n')" :key="index" class="text-sm font-normal text-space truncate">
                        {{ description }}
                      </p>
                      </template>
                  </li>
                </ul>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">Фото</p>
                <a
                  :href="candidate.photo"
                  target="_blank"
                  class="text-dodger text-sm font-normal"
                >
                  {{ candidate.photo?.split('/').pop() ?? 'Фото не загружено' }}
                </a>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Загрузка резюме
                </p>
                <a
                  :href="candidate.resumeDownload"
                  target="_blank"
                  class="text-dodger text-sm font-normal"
                >
                  {{
                    candidate.resumeDownload?.split('/').pop() ??
                    'Резюме не загружено'
                  }}
                </a>
              </div>
              <div class="flex gap-2.5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Сопроводительное письмо
                </p>
                <a
                  :href="candidate.coverLetter"
                  target="_blank"
                  class="text-dodger text-sm font-normal"
                >
                  {{
                    candidate.coverLetter?.split('/').pop() ??
                    'Файл не загружен'
                  }}
                </a>
              </div>
            </div>
            <div class="bg-white p-25px mb-px pl-30px">
              <div class="flex items-center mb-2.5">
                <p class="text-lg text-space font-bold mr-2.5 leading-normal">
                  Анкета
                </p>
                <span
                  class="rounded-fifteen text-xs font-normal px-2.5 py-[3.5px] bg-serenade h-fit"
                >
                  Отправлено, ожидает заполнения
                </span>
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Фамилия Имя Отчество
                </p>
                <MyInputSecond v-model="newName" />
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Электронная почта
                </p>
                <MyInputSecond v-model="newEmail" type="email" />
              </div>
              <div class="flex gap-2.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Телефон
                </p>
                <PhoneInputSecond v-model="newPhone" />
              </div>
              <div class="flex gap-2.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Заголовок
                </p>
                <MyInputSecond v-model="newHeader" />
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Адрес проживания
                </p>
                <MyInputSecond v-model="newLocation" />
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Образование
                </p>
                <MyInputSecond v-model="newEducation" />
              </div>
              <div class="flex gap-2.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Опыт работы
                </p>
                <MyInputSecond v-model="newExperience" />
              </div>
              <div class="mb-0.5">
                <FileUpload
                  label="Фото"
                  inputId="photo"
                  @update:file="uploadPhoto = $event"
                />
              </div>
              <div>
                <FileUpload
                  label="Загрузка резюме"
                  inputId="resume"
                  @update:file="uploadResume = $event"
                />
              </div>
              <div>
                <FileUpload
                  label="Сопроводительное письмо"
                  inputId="letter"
                  @update:file="uploadLetter = $event"
                />
              </div>
            </div>
            <div class="bg-white p-25px pl-30px">
              <div class="flex items-center mb-26px">
                <p class="text-lg text-space font-bold mr-2.5 leading-normal">
                  Пользовательские поля
                </p>
                <span
                  class="rounded-fifteen text-xs font-normal px-2.5 py-[3.5px] bg-athens-gray h-fit"
                >
                  Используется в системе
                </span>
              </div>
              <div class="flex gap-2.5 items-center">
                <p class="text-sm font-normal text-space min-w-[240px]">
                  Разряд
                </p>
                <MinDropdownSecond :options="positions" v-model="newPosition" />
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[240px]">Раз</p>
                <MyInputSecond v-model="newCustomFirst" />
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[240px]">Два</p>
                <MyInputSecond v-model="newCustomSecond" />
              </div>
              <div class="flex gap-2.5 items-center">
                <p class="text-sm font-normal text-space min-w-[240px]">Три</p>
                <MyInputSecond v-model="newCustomThird" />
              </div>
              <button class="flex items-center gap-x-5px mt-25px">
                <svg-icon name="plus-blue20" width="20" height="20" />
                <span class="text-dodger text-sm font-medium">Добавить</span>
              </button>
            </div>
            <div class="bg-white pb-25px rounded-b-fifteen px-15px">
              <div>
                <UiButton
                  class="mr-15px"
                  variant="semiaction"
                  size="semiaction"
                >
                  Сохранить изменения
                </UiButton>
                <UiButton variant="back" size="back">Отмена</UiButton>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'chat'">
            <div>
              <Timeline :timeline-groups="timelineGroups" />
              <ChatInput
                :initial-recipient="`${candidate.firstName} ${candidate.surname}`"
                @send="handleChatSend"
              />
            </div>
          </div>
          <div v-if="activeTab === 'review'">Рассмотрения</div>
        </div>
      </div>
    </div>
    <div v-else>Загрузка...</div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { fetchCandidateById } from '~/utils/fetchCandidatesById'

  import ButtonSelector from '~/components/custom/ButtonSelector.vue'
  import BtnMessage from '~/components/custom/BtnMessage.vue'
  import BtnCalendar from '~/components/custom/BtnCalendar.vue'
  import BtnEmail from '~/components/custom/BtnEmail.vue'
  import BtnStop from '~/components/custom/BtnStop.vue'
  import DotsDropdown from '~/components/custom/DotsDropdown.vue'
  import MyTooltip from '~/components/custom/MyTooltip.vue'
  import BtnTab from '~/components/custom/BtnTab.vue'
  import MyInputSecond from '~/components/custom/MyInputSecond.vue'
  import PhoneInputSecond from '~/components/custom/PhoneInputSecond.vue'
  import FileUpload from '~/components/custom/FileUpload.vue'
  import MinDropdownSecond from '~/components/custom/MinDropdownSecond.vue'
  import Timeline from '@/components/timeline/index.vue'
  import ChatInput from '@/components/chat/ChatInput.vue'

  import { dateStringToDots, formatDate } from '@/helpers/date'

  import { getProfile as profileHh, getResponse, getData } from '@/utils/hhAccount'

  // get current route from candidateFull
  const route = useRoute()
  const router = useRouter()

  // get current index from candidateFull
  // Тут currentIndex и totalCandidates НЕ МОЖЕМ корректно посчитать без списка всех кандидатов!
  // Можно временно использовать заглушки:
  const currentIndex = ref(0) // пока 0

  // get total candidates from candidateFull
  const totalCandidates = ref(1) // пока 1

  // if candidate not found, throw 404 error
  if (currentIndex.value === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Candidate not found',
    })
  }

  const candidate = ref(null)
  const loading = ref(true)

  const options = [
    'Все',
    'Не разобранное',
    'Подумать',
    'Подходящие',
    'Отклоненные',
    'Служба безопасности',
  ]

  const positions = [
    {
      id: 'position_1',
      name: '1 разряд',
    },
    {
      id: 'position_2',
      name: '2 разряд',
    },
    {
      id: 'position_3',
      name: '3 разряд 3 разряд',
    },
    {
      id: 'position_4',
      name: '4 разряд',
    },
    {
      id: 'position_5',
      name: '5 разряд',
    },
  ]

  const activeTab = ref('resume') // Начальный таб
  const tabs = [
    { label: 'Резюме', value: 'resume' },
    { label: 'Поля', value: 'fields' },
    { label: 'Общение', value: 'chat', notification: '+1' },
    { label: 'Рассмотрения', value: 'review' },
  ]
  const dropdownOptions = ['Опция 1', 'Опция 2', 'Опция 3']

  const selectedLabel = ref('Подумать')

  const newName = ref('')
  const newEmail = ref('')
  const newPhone = ref('')
  const newHeader = ref('')
  const newLocation = ref('')
  const newEducation = ref('')
  const newExperience = ref('')
  const uploadPhoto = ref(null)
  const uploadResume = ref(null)
  const uploadLetter = ref(null)
  const newPosition = ref('')
  const newCustomFirst = ref('')
  const newCustomSecond = ref('')
  const newCustomThird = ref('')
  import { inject } from 'vue';

  const timelineGroups = ref([]);
  // const timelineGroups = ref([
  //   {
  //     date: '13/12/2025',
  //     events: [
  //       {
  //         id: 1,
  //         type: 'system',
  //         time: '18.01.2024 15:04',
  //         content: 'создан кандидат Анатольев Дмитрий Корсаров',
  //       },
  //       {
  //         id: 2,
  //         type: 'system',
  //         time: '18.01.2024 15:04',
  //         content:
  //           'кандидат Анатольев Дмитрий Корсаров откликнулся на вакансию Консультант продавцов',
  //       },
  //       {
  //         id: 3,
  //         type: 'system',
  //         time: '18.01.2024 15:04',
  //         content:
  //           'Перемещение на этап Подумать пользователем Анатолий Семенов',
  //       },
  //     ],
  //   },
  //   {
  //     date: 'Сегодня',
  //     events: [
  //       {
  //         id: 4,
  //         type: 'call',
  //         calls: [
  //           {
  //             time: '18.01.2024 15:04',
  //             candidateName: 'Марго Роби',
  //           },
  //           {
  //             time: '18.01.2024 15:04',
  //             candidateName: 'Марго Роби',
  //           },
  //         ],
  //       },
  //       {
  //         id: 5,
  //         type: 'note',
  //         time: '18.01.2024 15:04',
  //         author: 'Анатолий Семенов',
  //         content:
  //           'Кандидат утверждает что у него есть знакомые которые работали в компании и отзываются не очень хорошо, но самому ему все нравится. Ему нужно время подумать.',
  //       },
  //       {
  //         id: 6,
  //         type: 'task',
  //         time: '18.01.2024 15:04',
  //         user: 'Анатолий Семенов',
  //         title: 'Интервью с кандидатом',
  //         scheduled: '13/02/2024 в 13:30',
  //       },
  //       {
  //         id: 7,
  //         type: 'email',
  //         emails: [
  //           {
  //             time: '18.01.2024 15:04',
  //             direction: 'входящее',
  //             from: 'Анатолий Семенов',
  //             to: 'Марго Роби',
  //             subject: 'Реквизиты компании',
  //             content: `Здравствуйте, [Имя клиента]! Для завершения оформления документов нам необходимо уточнить ваши реквизиты. Пожалуйста, отправьте следующую информацию: [Запрашиваемые данные, например: название организации, ИНН, расчётный счёт и т.д.] Если у вас возникнут вопросы, буду рад помочь! Спасибо за оперативность. С уважением, [Ваше имя] [Ваша должность] [Контактные данные]`,
  //           },
  //           {
  //             time: '18.01.2024 15:04',
  //             direction: 'входящее',
  //             from: 'Марго Роби',
  //             to: 'Анатолий Семенов',
  //             status: 'Доставлено',
  //             subject: 'Реквизиты компании',
  //             content: `Благодарю за обращение. Вот реквизиты нашей компании: Название организации: [Название] ИНН: [Ваш ИНН] КПП: [Ваш КПП] Расчётный счёт: [Ваш счёт] Банк: [Название банка] БИК: [Ваш БИК] Корреспондентский счёт: [Ваш корр. счёт] Если потребуется дополнительная информация, пожалуйста, дайте знать. С уважением, [Имя клиента] [Должность, если есть] [Контактные данные] [Запрашиваемые данные, например: название организации, ИНН, расчётный счёт и т.д.] Если у вас возникнут вопросы, буду рад помочь! Спасибо за оперативность. С уважением, [Ваше имя] [Ваша должность] [Контактные данные]`,
  //           },
  //         ],
  //       },
  //       {
  //         id: 8,
  //         type: 'email',
  //         emails: [
  //           {
  //             time: '18.01.2024 15:04',
  //             direction: 'входящее',
  //             from: 'Марго Роби',
  //             to: 'Анатолий Семенов',
  //             subject: 'Другая тема письма',
  //             content: `Здравствуйте, [Имя клиента]! Для завершения оформления документов нам необходимо уточнить ваши реквизиты. Пожалуйста, отправьте следующую информацию: [Запрашиваемые данные, например: название организации, ИНН, расчётный счёт и т.д.] Если у вас возникнут вопросы, буду рад помочь! Спасибо за оперативность. С уважением, [Ваше имя] [Ваша должность] [Контактные данные]`,
  //           },
  //         ],
  //       },
  //       {
  //         id: 9,
  //         type: 'hh_chat',
  //         time: '18.01.2024 15:04',
  //         author: 'Марго Роби',
  //         company: 'ООО КОМПАНИЯ',
  //         content: 'Здравствуйте! Посмотрите пожалуйста мой отклик',
  //         initials: 'СК',
  //       },
  //       {
  //         id: 10,
  //         type: 'telegram',
  //         time: '18.01.2024 15:04',
  //         author: 'Марго Роби',
  //         content:
  //           'Здравствуйте, как думаете, с моими скиллами какие у меня есть шансы попасть к вам на работу?',
  //         initials: 'МР',
  //       },
  //       {
  //         id: 11,
  //         type: 'whatsapp',
  //         time: '18.01.2024 15:04',
  //         author: 'Марго Роби',
  //         content:
  //           'Здравствуйте, как думаете, с моими скиллами какие у меня есть шансы попасть к вам на работу?',
  //         initials: 'МР',
  //       },
  //       {
  //         id: 12,
  //         type: 'comment',
  //         time: '18.01.2024 15:04',
  //         author: 'Марго Роби',
  //         content:
  //           'Коллеги, кандидат не плохой, давайте рассмотрим его под микроскопом?',
  //         initials: 'АС',
  //       },
  //     ],
  //   },
  // ])

  // fnc for check load data
  function sanitazeCandidate(data) {
    if (!data) return null
    
    let address = data?.area.name ? `г. ${data?.area.name}` :  ''
    address += data?.metro?.name ? `, м. ${data.metro.name}` : ''

    return {
      id: data.id ?? null,
      created: data.created_at ?? null,
      age: data.age ?? null,
      firstName: data.first_name ?? '',
      surname: data.last_name ?? '',
      patronymic: data.patronymic ?? '',
      email: data.contact ? data.contact.find(function(value) {return value.kind === 'email';})?.contact_value : '',
      phone: data.contact ? data.contact.find(function(value) {return value.kind === 'phone';})?.contact_value : '',
      location: data?.area.name ?? '',
      vacancy: data.title ?? '',
      gender: data.gender.name ?? '',
      status: data.status ?? '',
      skills: data.skill_set ?? [],
      experience: data.experience ?? '',
      skype: data.skype ?? '',
      telegram: data.telegram ?? '',
      tags: data.tags ?? '',
      quickInfo: data.quickInfo ?? '',
      education: data.education ?? '',
      attachedFiles: data.attachments ?? [],
      links: [
        // 'www.testlink-null.com',
        // 'www.testlink-one.com',
        // 'www.testlink-second.com',
      ],
      header: data.title ?? '',
      locationFull: address,
      educationLevel: data.education.level.name ?? '',
      resumeDownloadLink: data.resumeDownloadLink ?? '',
      coverLetter: data.coverPath ?? '',
      comments: data.comments ?? [],
      timeline: data.timeline ?? [],
      customFields: data.customFields ?? null,
      customer: data.customer ?? null,
      icon: data.icon ?? null,
      photo:
        data.photo?.medium !== null ? data.photo?.medium : null,
    }
  }

  const handleChatSend = messageData => {
    console.log('Получены данные в родительском компоненте:', messageData)
    // TODO: Implement message sending logic
  }

  const loadCandidate = async id => {
    loading.value = true
    try {
      // const rawData = await fetchCandidateById(id)
      const { responses, errorResponses } = await getResponse(id)
      const rawData = responses
      const dataUrl = {url: rawData.resume.url}
      const resume = await getData(dataUrl);
      candidate.value = sanitazeCandidate(resume.responses)
      console.log('Candidate loaded:', candidate)
    } catch (error) {
      console.error(error)
      throw createError({
        statusCode: 404,
        statusMessage: 'Candidate not found',
      })
    } finally {
      loading.value = false
    }
  }

  const getMessageSystem = (data) => {
    return{
      id: data.id,
      type: 'system',
      time: formatDate(data.time),
      timestamp: data.timestamp,
      content: data.text,
    }
  }

  const getMessagePlatform = (data) => {
    return {
          id: data.id,
          type: data.platformName,
          time: formatDate(data.time),
          timestamp: data.timestamp,
          author: data.author,
          company: data.company,
          content: data.text,
          initials: data.initials,
    }
  }

  // load cans on visit page
  onMounted(async() => {
    const id = parseInt(route.params.id)
    if (!isNaN(id)) {
      await loadCandidate(id)
      const messagers = await getData({url: `https://api.hh.ru/negotiations/${id}/messages`});
      const profile = ref(null)
      if (messagers.responses.items.length > 0) {
        messagers.responses.items.forEach(async (item) => {
          const date = dateStringToDots(item.created_at)
          let isAdd = false;
          if (item.state.name == 'Отклик') {
            const actionCandidate = candidate.value.gender == 'Женский' ? 'откликнулась' : 'откликнулся'
           
            timelineGroups.value.map(function(value, index) {
              if (value.date === date.replaceAll('.', '/')) { 
                timelineGroups.value[index].events.push(getMessageSystem({
                  id: item.id,
                  timestamp: item.created_at,
                  time: item.created_at,
                  content: `кандидат ${candidate.value.surname} ${candidate.value.firstName} ${candidate.value?.patronymic} ${actionCandidate} на вакансию ${candidate.value.vacancy}`
                }))
                isAdd = true
              }
            })
            if (!isAdd) {
              timelineGroups.value.push({
                date: date.replaceAll('.', '/'),
                events: [getMessageSystem({
                  id: item.id,
                  timestamp: item.created_at,
                  time: item.created_at,
                  text: `кандидат ${candidate.value.surname} ${candidate.value.firstName} ${candidate.value?.patronymic} ${actionCandidate} на вакансию ${candidate.value.vacancy}`
                })]
              })
            }
          }

          if (item.state.name == 'Текст') {
            let employer = '';
            let company = '';
            let initials = '';
            if (profile.value == null) {
              profile.value = await profileHh()
              if (!profile.error) {
                if (item.author.participant_type == 'applicant') {
                  company = profile.value.data.data.employer.name
                  employer = `${candidate.value.firstName} ${candidate.value.surname}` 
                  initials = candidate.value.firstName[0] + candidate.value.surname[0]
                } else {
                  company = `${candidate.value.firstName} ${candidate.value.surname}` 
                  employer = `${profile.value.data.data.first_name} ${profile.value.data.data.last_name}` 
                  initials = profile.value.data.data.first_name[0] + profile.value.data.data.last_name[0]
                }
              }
            }

            const newEvent = getMessagePlatform({
              id: item.id,
              platformName: 'hh_chat',
              author: employer,
              company: company,
              time: item.created_at,
              timestamp: item.created_at,
              text: item.text,
              initials: initials
            });
          
            timelineGroups.value.map(function(value, index) {
              if (value.date === date.replaceAll('.', '/')) {
                timelineGroups.value[index].events.push(getMessagePlatform({
                  id: item.id,
                  platformName: 'hh_chat',
                  author: employer,
                  company: company,
                  time: item.created_at,
                  timestamp: item.created_at,
                  text: item.text,
                  initials: initials
                }))
                isAdd = true
              }
            })
            if (!isAdd) {
              timelineGroups.value.push({
                date: date.replaceAll('.', '/'),
                events: [getMessagePlatform({
                  id: item.id,
                  platformName: 'hh_chat',
                  author: item.author.participant_type == 'applicant' ? `${candidate.value.surname} ${candidate.value.firstName} ` : company,
                  company: item.author.participant_type == 'applicant' ? employer : `${candidate.value.surname} ${candidate.value.firstName} `,
                  time: item.created_at,
                  timestamp: item.created_at,
                  text: item.text,
                  initials: `${candidate.value.surname[0]}${candidate.value.firstName[0]}`
                })]
              })
            }
          }
        })

        timelineGroups.value.forEach((item, index) => {
          if (Array.isArray(item.events)) {
            console.log(index, timelineGroups.value[index].events);
          timelineGroups.value[index].events.sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            if (isNaN(dateA) || isNaN(dateB)) {
              console.warn(`Невалидная дата: ${a.timestamp} или ${b.timestamp}`);
              return 0;
            }
            return dateB - dateA;
          });
        }
      })
      }
    }
  })

  // load cans on route change
  watch(
    () => route.params.id,
    newId => {
      const id = parseInt(newId)
      if (!isNaN(id)) {
        loadCandidate(id)
      }
    }
  )

  // next or prev candidate moving
  const goToPrevious = () => {
    const prevId = candidate.value?.id - 1
    if (prevId > 0) router.push(`/candidates/${prevId}`)
  }

  const goToNext = () => {
    const nextId = candidate.value?.id + 1
    router.pust(`/candidates/${nextId}`)
  }
</script>
