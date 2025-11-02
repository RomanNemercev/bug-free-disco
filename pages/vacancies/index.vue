<script setup>
  import DotsDropdown from '~/components/custom/DotsDropdown.vue'
  import VacancyCard from '~/components/custom/page-parts/VacancyCard.vue'
  import Pagination from '@/components/custom/Pagination.vue'
  import GeoInput from '~/components/custom/GeoInput.vue'
  import ResponseInput from '~/components/custom/ResponseInput.vue'
  // import CheckboxGroup from '~/components/custom/CheckboxGroup.vue'
  import UiDotsLoader from '~/components/custom/UiDotsLoader.vue'
  import MyDropdown from '@/components/custom/MyDropdown.vue'
  import DropdownCalendarStatic from '@/components/custom/DropdownCalendarStatic.vue'

  import { ref, computed, nextTick, watch, onMounted } from 'vue'
  import { getVacancies } from '~/utils/getVacancies'
  import { clientsList } from '@/utils/clientsList'
  import { getDepartments, responsiblesList } from "@/utils/executorsList";

  import vacanciesDraftData from '@/src/data/vacancies-draft.json'
  import vacanciesArchiveData from '@/src/data/vacancies-archive.json'
  import VacancyCardDropdown from '@/src/data/vacancy-card-dropdown.json'
  import VacancyCardDraftDropdown from '@/src/data/vacancy-card-draft-dropdown.json'
  import VacancyCardArchiveDropdown from '@/src/data/vacancy-card-archive-dropdown.json'

  const vacancyItems = [
    'Пункт меню 1',
    'Пункт меню 2',
    'Пункт меню 3',
    'Пункт меню 4',
    'Пункт меню 5',
    'Пункт меню 6',
    'Пункт меню 7',
  ]

  const isHoveredFunnel = ref(false)
  const isActiveFunnel = ref(false)
  const isHoveredSort = ref(false)
  const isActiveSort = ref(false)
  const vacancies = ref([])
  const vacanciesDraft = ref(vacanciesDraftData)
  const vacanciesArchive = ref(vacanciesArchiveData)
  const currentPage = ref(1)
  const currentDraftPage = ref(1)
  const currentArchivePage = ref(1)
  const itemsPerPage = 10
  const itemsDraftPerPage = 10
  const itemsArchivePerPage = 10
  const cardsBlock = ref(null)
  const selectedMore = ref([])
  const activeVacancies = ref(true)
  const archiveVacancies = ref(false)
  const draftVacancies = ref(false)
  const containerHeight = ref(0) // отслеживаю высоту контейнера
  const containerRef = ref(null) // ссылка на контейнер
  const loading = ref(false)
  const clients = ref([])
  const recruiters = ref([])
  const departments = ref([])
  const responsibles = ref([])
  const filters = ref({
    status: null,
    client: null,
    city: null,
    executor: null,
    responsible: null,
    create: {
      from: null,
      to: null
    }
  })
  const filterStatuses = {'В работе': 'active', 'Черновик': 'draft', 'Архив': 'archive'}
  departments.value = await getDepartments();
  responsibles.value = await responsiblesList();

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(vacancies.value.length / itemsPerPage))
  )
  const totalDraftPages = computed(() =>
    Math.max(1, Math.ceil(vacanciesDraft.value.length / itemsDraftPerPage))
  )
  const totalArchivePages = computed(() =>
    Math.max(1, Math.ceil(vacanciesArchive.value.length / itemsArchivePerPage))
  )

  const paginatedVacancies = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    return vacancies.value.slice(startIndex, startIndex + itemsPerPage)
  })

  const paginatedDraftVacancies = computed(() => {
    const startIndex = (currentDraftPage.value - 1) * itemsDraftPerPage
    return vacanciesDraft.value.slice(
      startIndex,
      startIndex + itemsDraftPerPage
    )
  })

  const paginatedArchiveVacancies = computed(() => {
    const startIndex = (currentArchivePage.value - 1) * itemsArchivePerPage
    return vacanciesArchive.value.slice(
      startIndex,
      startIndex + itemsArchivePerPage
    )
  })

  function handlePageChange(page) {
    currentPage.value = page
  }

  function handleDraftPageChange(page) {
    currentDraftPage.value = page
  }

  function handleArchivePageChange(page) {
    currentArchivePage.value = page
  }

  function funnelToggleActive() {
    isActiveFunnel.value = !isActiveFunnel.value
    cardsBlock.value.style.borderBottomLeftRadius = isActiveFunnel.value
      ? '0px'
      : '15px'
    cardsBlock.value.style.borderBottomRightRadius = isActiveFunnel.value
      ? '0px'
      : '15px'
  }

  function sortToggleActive() {
    isActiveSort.value = !isActiveSort.value
    cardsBlock.value.style.borderBottomLeftRadius = isActiveSort.value
      ? '0px'
      : '15px'
    cardsBlock.value.style.borderBottomRightRadius = isActiveSort.value
      ? '0px'
      : '15px'
  }

  function showActiveVacancies() {
    activeVacancies.value = true
    archiveVacancies.value = false
    draftVacancies.value = false
  }

  function showArchiveVacancies() {
    activeVacancies.value = false
    archiveVacancies.value = true
    draftVacancies.value = false
  }

  function showDraftVacancies() {
    activeVacancies.value = false
    draftVacancies.value = true
    archiveVacancies.value = false
  }

  // Функция для обновления высоты контейнера
  async function updateContainerHeight() {
    await nextTick()
    if (containerRef.value) {
      const activeBlock = containerRef.value.querySelector('.active-view')
      containerHeight.value = activeBlock?.offsetHeight || 0
    }
  }

  // Обработчик удаления вакансии
  const handleVacancyDeleted = vacancyId => {
    // Удаляем вакансию из списка
    vacancies.value = vacancies.value.filter(
      vacancy => vacancy.id !== vacancyId
    )
    console.log(`Вакансия с id ${vacancyId} удалена из списка`)
  }

  const { clients:  responseClients, error: clientsError } = await clientsList('clients')
  if (!clientsError) {
    clients.value = responseClients
  }

  const { clients:  responseRecruiters, error: recruitersError } = await clientsList('recruiters')
  if (!recruitersError) {
    recruiters.value = responseRecruiters
  }

  // Инициализация высоты при монтировании
  // onMounted(updateContainerHeight, fetchVacancies);
  onMounted(async () => {
    updateContainerHeight()
    loading.value = true
    const result = await getVacancies()
    if (result) {
      vacancies.value = result
      loading.value = false
      console.log('Вакансии успешно загружены:', vacancies.value)
    } else {
      console.log('Cannot fetch vacancies')
    }
  })

  const filteredVacancies = async() => {
    loading.value = true
    let params = ''
    for (let key in filters.value) {
      if (filters.value[key]) {
        if (key === 'status') {
          params += `&filters[${key}]=${filterStatuses[filters.value[key]]}`
        }else {
          if (key === 'create') {
            console.log('create', filters)
            if (filters.value.create.from || filters.value.create.to) {
              const from = filters.value.create.from ? filters.value.create.from : '01.01.1970'
              const to = filters.value.create.to ? filters.value.create.to : '01.01.3000'
              params += `&filters[${key}]=${from};${to}`
            }
          } else {
            params += `&filters[${key}]=${filters.value[key]}`
          }
        }
      } 
    }
    if (params !== '') {
      params = params.slice(1)
    }
    const response = await getVacancies(params)
  
    vacancies.value = response
    loading.value = false
  }

  // Следим за изменением активных блоков
  watch(
    [activeVacancies, archiveVacancies, draftVacancies],
    updateContainerHeight
  )
</script>

<template>
  <div class="container pt-35px pb-28">
    <!-- header block -->
    <div
      class="w-full p-25px rounded-t-fifteen bg-white flex justify-between mb-px items-center"
    >
      <div>
        <p class="text-xl font-semibold text-space leading-normal mb-2.5">
          Вакансии
        </p>
        <p class="text-sm font-normal text-slate-custom">
          Управляйте вакансиями с этого раздела
        </p>
      </div>
      <NuxtLink to="/vacancies/newvacancy">
        <span
          class="bg-dodger text-white text-sm font-semibold rounded-ten py-11.5px px-[19px]"
        >
          Добавить вакансию
        </span>
      </NuxtLink>
    </div>
    <!-- cards block -->
    <div
      class="bg-catskill rounded-b-fifteen py-13px px-25px mb-15px pb-15px transition-all relative"
      ref="cardsBlock"
    >
      <div class="flex justify-between">
        <div class="flex">
          <div class="flex justify-between gap-x-2.5 mr-2.5">
            <button
              class="flex rounded-ten py-2.5 px-15px text-sm font-medium gap-x-2.5 cursor-pointer"
              @click="showActiveVacancies()"
              style="
                transition-property: background-color, color;
                transition-duration: 0.2s;
                transition-timing-function: ease-in-out;
              "
              :class="
                activeVacancies
                  ? 'bg-space text-white'
                  : 'bg-transparent text-space'
              "
            >
              <p>Активные вакансии</p>
              <span class="text-slate-custom text-sm font-medium">
                {{ vacancies.length }}
              </span>
            </button>
            <button
              class="flex rounded-ten py-2.5 px-15px text-space text-sm font-medium gap-x-2.5 cursor-pointer"
              @click="showDraftVacancies()"
              style="
                transition-property: background-color, color;
                transition-duration: 0.2s;
                transition-timing-function: ease-in-out;
              "
              :class="
                draftVacancies
                  ? 'bg-space text-white'
                  : 'bg-transparent text-space'
              "
            >
              <p>Черновики</p>
              <span class="text-slate-custom text-sm font-medium">
                {{ vacanciesDraft.length }}
              </span>
            </button>
            <button
              class="flex rounded-ten py-2.5 px-15px text-space text-sm font-medium gap-x-2.5 cursor-pointer"
              @click="showArchiveVacancies()"
              style="
                transition-property: background-color, color;
                transition-duration: 0.2s;
                transition-timing-function: ease-in-out;
              "
              :class="
                archiveVacancies
                  ? 'bg-space text-white'
                  : 'bg-transparent text-space'
              "
            >
              <p>Архив</p>
              <span class="text-slate-custom text-sm font-medium">
                {{ vacanciesArchive.length }}
              </span>
            </button>
          </div>
          <DotsDropdown :items="vacancyItems" />
        </div>
        <div class="flex gap-x-15px">
          <button
            class="p-2.5 rounded-ten border transition-colors"
            @mouseover="isHoveredSort = true"
            @mouseleave="isHoveredSort = false"
            @click="sortToggleActive()"
            :class="
              isHoveredSort
                ? 'border-zumthor text-dodger bg-zumthor'
                : 'text-slate-custom border-athens bg-white'
            "
          >
            <svg-icon name="sort-list" width="20" height="20" />
          </button>
          <button
            class="p-2.5 rounded-ten border transition-colors"
            @mouseover="isHoveredFunnel = true"
            @mouseleave="isHoveredFunnel = false"
            @click="funnelToggleActive()"
            :class="
              isHoveredFunnel
                ? 'border-zumthor text-dodger bg-zumthor'
                : 'text-slate-custom border-athens bg-white'
            "
          >
            <svg-icon name="funnel" width="20" height="20" />
          </button>
        </div>
        </div>
        <transition name="fade">
          <div
            v-if="isActiveFunnel"
            class="relative bg-white w-full top-[10px] left-0 p-25px pt-15px rounded-b-ten z-10"
          >
            <p class="text-18px font-medium text-space leading-normal mb-35px">
              Фильтры
            </p>
            <div class="filters grid grid-cols-4 gap-15px mb-6">
              <div>
                <p class="text-sm font-medium text-space mb-3.5">
                  Статус
                </p>
                <MyDropdown 
                  :defaultValue="''" 
                  placeholder="Выберите статус"
                  :options="['В работе', 'Черновик', 'Архив']"
                  :model-value="filters.status ? filters.status : ''"
                  @update:model-value="$event => filters.status = $event" 
                />
              </div>
              <div>
                <p class="text-sm font-medium text-space mb-3.5">
                  Рекрутер
                </p>
                <response-input 
                  placeholder="Выберите рекрутера"
                  :responses="recruiters"
                  @update:modelValue="($event, index) => filters.executor = index"
                 />
              </div>
              <div>
                <p class="text-sm font-medium text-space mb-3.5">Заказчик</p>
                <response-input
                  placeholder="Выберите заказчика"
                  :showRoles="false"
                  :responses="clients"
                  @update:modelValue="($event, index) => filters.client = index"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-space mb-3.5">
                  Город
                </p>
                <geo-input 
                  placeholder="Введите город" 
                  :model-value="filters.city ? filters.city : ''"
                  @update:modelValue="$event => filters.city = $event"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-space mb-3.5">
                  Отдел
                </p>
                <response-input
                class="w-full"
                :responses="departments"
                :model-value="filters.division ? filters.division.name : null"
                :showRoles="true"
                notFound="Отдел не найден"
                placeholder="Введите название отдела"
                @update:modelValue="(name, index) => console.log(name, index)"
              />
              </div>
              <div>
                <p class="text-sm font-medium text-space mb-3.5">Согласующий</p>
                <response-input
                  placeholder="Выберите согласующего"
                  :showRoles="false"
                  :responses="responsibles"
                  @update:modelValue="($event, index) => filters.responsible = index"
                />
              </div>
              <div class="col-span-2">
                <p class="text-sm font-medium text-space mb-3.5">
                  Дата создания
                </p>
                <p class="flex gap-15px">
                   <DropdownCalendarStatic 
                  @update:model-value="filters.create.from = $event" 
                />
                <DropdownCalendarStatic 
                  @update:model-value="filters.create.from = $event" 
                />
                </p>  
              </div>
            </div>
            <!-- <div class="mb-35px">
              <p class="text-sm font-medium text-space mb-3">Дополнительно</p>
              <div class="flex flex-col gap-y-2.5">
                <CheckboxGroup
                  :options="checkboxOptions"
                  v-model="selectedMore"
                />
              </div>
            </div> -->
            <UiButton variant="action" size="semiaction" @click="filteredVacancies">Применить</UiButton>
          </div>
        </transition>
        <transition name="fade">
          <div
            v-if="isActiveSort"
            class="relative bg-white w-full top-[10px] left-0 p-25px pt-15px rounded-b-ten z-10"
          >
            <p class="text-18px font-medium text-space leading-normal mb-25px">
              Фильтры
            </p>
            <div class="flex gap-x-2.5">
              <button
                class="rounded-ten px-2.5 py-5px bg-athens-gray text-sm font-normal text-slate-custom"
              >
                Новые
              </button>
              <button
                class="rounded-ten px-2.5 py-5px bg-athens-gray text-sm font-normal text-slate-custom"
              >
                Старые
              </button>
              <button
                class="rounded-ten px-2.5 py-5px bg-athens-gray text-sm font-normal text-slate-custom"
              >
                По региону
              </button>
              <button
                class="rounded-ten px-2.5 py-5px bg-athens-gray text-sm font-normal text-slate-custom"
              >
                По заказчику
              </button>
            </div>
          </div>
        </transition>
      <!-- </div> -->
    </div>
    <div
      ref="containerRef"
      :style="{ height: `${containerHeight}px` }"
      class="relative"
    >
      <transition
        name="fade"
        @after-enter="
          {
            updateContainerHeight
          }
        "
      >
        <div v-if="activeVacancies" class="absolute w-full active-view">
          <div v-if="loading" class="absolute top-1/2 left-1/2">
            <UiDotsLoader />
          </div>
          <div
            class="[&>*:not(:last-child)]:mb-15px"
            v-else-if="vacancies.length > 0"
            :class="totalPages === 1 ? 'pb-52' : 'pb-0'"
          >
            <VacancyCard
              v-for="(vacancy, index) in paginatedVacancies"
              :key="vacancy.id"
              :vacancy="vacancy"
              @vacancy-deleted="handleVacancyDeleted"
              :dropdownItems="VacancyCardDropdown"
              :class="{ 'mb-4': index !== paginatedVacancies.length - 1 }"
            />
            <Pagination
              v-if="totalPages > 1"
              :currentPage="currentPage"
              :totalPages="totalPages"
              @page-changed="handlePageChange"
            />
          </div>
          <div v-if="vacancies.length === 0 && loading === false" class="bg-catskill p-20 px-25px  mb-35px transition-all relative text-center">
            Вакансий не найдено
          </div> 
        </div>
      </transition>
      <transition name="fade" @after-enter="updateContainerHeight">
        <div v-if="draftVacancies" class="absolute w-full active-view">
          <div
            v-if="vacanciesDraft.length === 0"
            class="bg-catskill w-full rounded-fifteen min-h-56 flex items-center justify-center"
          >
            <p class="text-15px font-medium text-slate-custom">
              Вы ещё не добавили вакансии которые можно редактировать
            </p>
          </div>
          <div v-if="vacanciesDraft.length > 0" class="flex flex-col gap-15px">
            <VacancyCard
              v-for="(vacancy, index) in paginatedDraftVacancies"
              :key="vacancy.id"
              :vacancy="vacancy"
              :dropdownItems="VacancyCardDraftDropdown"
              :class="{ 'mb-4': index !== paginatedDraftVacancies.length - 1 }"
            />
            <Pagination
              v-if="totalDraftPages > 1"
              :currentPage="currentDraftPage"
              :totalPages="totalDraftPages"
              @page-changed="handleDraftPageChange"
            />
          </div>
        </div>
      </transition>
      <transition name="fade" @after-enter="updateContainerHeight">
        <div v-if="archiveVacancies" class="absolute w-full active-view">
          <div
            v-if="vacanciesArchive.length === 0"
            class="bg-catskill w-full rounded-fifteen min-h-56 flex items-center justify-center"
          >
            <p class="text-15px font-medium text-slate-custom">
              Вы еще не добавляли вакансии в архив
            </p>
          </div>
          <div v-if="vacanciesArchive.length > 0" class="flex flex-col gap-15px">
            <VacancyCard
              v-for="(vacancy, index) in paginatedArchiveVacancies"
              :key="vacancy.id"
              :vacancy="vacancy"
              :dropdownItems="VacancyCardArchiveDropdown"
              :class="{
                'mb-4': index !== paginatedArchiveVacancies.length - 1,
              }"
            />
            <Pagination
              v-if="totalArchivePages > 1"
              :currentPage="currentArchivePage"
              :totalPages="totalArchivePages"
              @page-changed="handleArchivePageChange"
            />
          </div>
          <div v-if="loadingCandidates" class="absolute top-1/2 left-1/2">
            <UiDotsLoader />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
  .pagination {
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-top: 10px;
  }

  .active {
    font-weight: bold;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  @media (max-width: 992px) {
    .filters {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media (max-width: 768px) {
    .filters {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 560px) {
    .filters {
      grid-template-columns:  1fr;
    }
  }
</style>
