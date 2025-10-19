<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { fetchCandidatesMin } from '~/utils/fetchCandidatesMin'
  import UiDotsLoader from '~/components/custom/UiDotsLoader.vue'

  import MyInput from '~/components/custom/MyInput.vue'
  import MyCheckbox from '~/components/custom/MyCheckbox.vue'
  import CardIcon from '~/components/custom/CardIcon.vue'
  import Pagination from '@/components/custom/Pagination.vue'

  import { getVacancies, getDrafts, getResponses } from '@/utils/hhAccount'

  const isHoveredFunnel = ref(false)
  const isActiveFunnel = ref(false)
  const isHoveredSort = ref(false)
  const isActiveSort = ref(false)
  const selected = ref({})
  const allSelected = ref(false)
  const itemsPerPage = 10
  const currentPage = ref(1)
  const candidates = ref([])

  const router = useRouter()

  const totalPages = ref(1)

  const handlePageChange = async page => {
    currentPage.value = page
    const { candidates: data, pagination } = await fetchCandidatesMin(page)
    paginatedCandidates.value = data
    totalPages.value = pagination.totalPages
  }

  function funnelToggleActive() {
    isActiveFunnel.value = !isActiveFunnel.value
  }

  function sortToggleActive() {
    isActiveSort.value = !isActiveSort.value
  }

  const toggleAll = isChecked => {
    data.value.forEach(item => {
      selected.value[item.id] = isChecked
    })
  }

  watch(
    selected,
    newSelected => {
      const allChecked = data.value.every(item => newSelected[item.id])
      const noneChecked = data.value.every(item => !newSelected[item.id])

      allSelected.value = allChecked

      if (!allChecked && !noneChecked) {
        console.log('Частично выбрано')
      }
    },
    { deep: true }
  )

  const data = ref(null)

  const paginatedCandidates = ref([])

  function goToCandidate(id) {
    router.push(`/candidates/${id}`)
  }

  const loadingCandidates = ref(false)

  const loadCandidates = async () => {
    try {
      loadingCandidates.value = true
      const { candidates: data, pagination } = await fetchCandidatesMin(
        currentPage.value
      )

      // const candidates = await getVacancies(); 
      const { drafts, errorDrafts } = await getDrafts();
      // if (!errorDrafts) {
      //   if (drafts.items.length > 0) {
      //     drafts.items.forEach(async item => {
      //       const candidate = await getResponses(item.draft_id)
      //       console.log('candidate', candidate)
      //     })
      //   }
      // }
      const { responses, errorResponses  } = await getResponses('122562967')
    
      // paginatedCandidates.value = data
      paginatedCandidates.value = responses?.items ?? null
      totalPages.value = pagination.lastPage
    } catch (error) {
      console.error('Ошибка при загрузке кандидатов:', error)
    } finally {
      loadingCandidates.value = false
    }
  }

  loadCandidates()
</script>

<template>
  <div class="container pt-6 pb-28">
    <div class="bg-white rounded-fifteen p-25px relative mb-15px">
      <h2 class="text-xl font-semibold text-space leading-normal mb-2.5">
        Кандидаты
      </h2>
      <p class="text-sm font-normal text-slate-custom mb-50px">
        Управляйте кандидатами с этого раздела
      </p>
      <div class="absolute w-full left-0 h-[1px] bg-athens top-[103px]"></div>
      <div class="flex gap-x-15px">
        <MyInput
          placeholder="Поиск по кандидатам или ключевым фразам"
          :search="true"
        />
        <div class="flex gap-x-15px">
          <button
            class="p-[9px] rounded-ten border transition-colors max-h-10"
            @mouseover="isHoveredSort = true"
            @mouseleave="isHoveredSort = false"
            @click="sortToggleActive()"
            :class="
              isHoveredSort
                ? 'border-zumthor text-dodger bg-zumthor'
                : 'text-slate-custom border-athens bg-athens-gray'
            "
          >
            <svg-icon name="sort-list" width="20" height="20" />
          </button>
          <button
            class="p-[9px] rounded-ten border transition-colors max-h-10"
            @mouseover="isHoveredFunnel = true"
            @mouseleave="isHoveredFunnel = false"
            @click="funnelToggleActive()"
            :class="
              isHoveredFunnel
                ? 'border-zumthor text-dodger bg-zumthor'
                : 'text-slate-custom border-athens bg-athens-gray'
            "
          >
            <svg-icon name="funnel" width="20" height="20" />
          </button>
        </div>
      </div>
    </div>
    <div>
      <div v-if="loadingCandidates" class="absolute top-1/2 left-1/2">
        <UiDotsLoader />
      </div>
      <!-- table cans on grid -->
      <div class="table-container" v-else>
        <!-- header -->
        <div class="table-header">
          <div>
            <MyCheckbox
              id="select-all"
              :label="''"
              v-model="allSelected"
              @update:modelValue="toggleAll"
              :emptyLabel="true"
            />
          </div>
          <div class="px-2.5">Кандидат</div>
          <div class="px-2.5">Источник</div>
          <div class="px-2.5">Резюме</div>
          <div class="px-2.5">Вакансия</div>
          <div class="px-2.5">Этап</div>
        </div>

        <!-- body -->
        <div class="table-body">
          <div
            v-for="item in paginatedCandidates"
            :key="item.id"
            class="table-row"
          >
            <div>
              <MyCheckbox
                :id="item.id"
                :label="''"
                v-model="selected[item.id]"
                :emptyLabel="true"
              />
            </div>
            <div class="flex gap-2.5 p-2.5 items-center">
              <UiAvatar size="candidate">
                <UiAvatarImage
                  src="https://github.com/radix-vue.png"
                  alt="@radix-vue"
                />
                <UiAvatarFallback>{{ item.resume?.last_name[0] }}{{ item.resume?.first_name[0] }}</UiAvatarFallback>
              </UiAvatar>
              <div>
                <p
                  class="text-sm font-medium text-space mb-5px leading-[170%] cursor-pointer"
                  @click="goToCandidate(item.id)"
                >
                  {{ item.resume.last_name }} {{ item.resume.first_name }}
                </p>
                <div class="flex gap-2.5">
                  <!-- <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="text-dodger text-13px font-normal"
                  >
                    {{ tag }}
                  </span> -->
                </div>
              </div>
            </div>
            <div class="px-2.5">
              <CardIcon
                icon="hh"
                :isPng="false"
                imagePath='hh'
                :width="21"
                :height="21"
              />
            </div>
            <div class="px-2.5 text-sm font-normal text-space">
              {{ item.resume.title }}
            </div>
            <div class="px-2.5 text-sm font-normal text-space">
              {{ 'Учитель начальных классов' }}
            </div>
            <div class="px-2.5 text-sm font-normal text-space">
              {{ 'Новый' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- pagination block -->
    <Pagination
      v-if="totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<style scoped>
  .table-container {
    display: grid;
    grid-template-rows: auto;
    gap: 1px;
  }

  .table-header,
  .table-row {
    display: grid;
    grid-template-columns: 1.778% 26.667% 8% 17.778% 17.778% 23.556%;
    gap: 10px;
    padding: 26px 25px;
    align-items: center;
  }

  .table-row {
    padding-top: 0;
    padding-bottom: 0;
  }

  .table-header {
    background-color: #f5f7fa;
    border-radius: 15px 15px 0 0;
    font-weight: 500;
    font-size: 14px;
    color: #79869a;
    text-align: left;
  }

  .table-row {
    background-color: #ffffff;
  }

  .table-row:not(:last-child) {
    margin-bottom: 1px;
  }

  .table-row:last-child {
    border-radius: 0 0 15px 15px;
  }
</style>
