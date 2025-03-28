<script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'

  import MyInput from '~/components/custom/MyInput.vue'
  import MyCheckbox from '~/components/custom/MyCheckbox.vue'
  import CardIcon from '~/components/custom/CardIcon.vue'
  import Pagination from '@/components/custom/Pagination.vue'

  import { candidatesMin } from '~/utils/candidatesMin'

  const isHoveredFunnel = ref(false)
  const isActiveFunnel = ref(false)
  const isHoveredSort = ref(false)
  const isActiveSort = ref(false)
  const selected = ref({})
  const allSelected = ref(false)
  const itemsPerPage = 10
  const currentPage = ref(1)

  const router = useRouter()

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(data.value.length / itemsPerPage))
  )

  function handlePageChange(page) {
    currentPage.value = page
  }

  function funnelToggleActive() {
    isActiveFunnel.value = !isActiveFunnel.value
    // cardsBlock.value.style.borderBottomLeftRadius = isActiveFunnel.value ? "0px" : "15px";
    // cardsBlock.value.style.borderBottomRightRadius = isActiveFunnel.value ? "0px" : "15px";
  }

  function sortToggleActive() {
    isActiveSort.value = !isActiveSort.value
    // cardsBlock.value.style.borderBottomLeftRadius = isActiveSort.value ? "0px" : "15px";
    // cardsBlock.value.style.borderBottomRightRadius = isActiveSort.value ? "0px" : "15px";
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

  // const data = ref([
  //     { id: 1, name: 'Сидоренко Валентин', tags: ['#подходящий', '#IT'], icon: "hh20", isPng: false, imagePath: "", resume: 'Пекарь электромонтер', vacancy: 'Менеджер по продажам', stage: 'Новый' },
  //     { id: 2, name: 'Сидоренко Валентин', tags: ['#подходящий', '#IT'], icon: "hh20", isPng: false, imagePath: "", resume: 'Пекарь электромонтер', vacancy: 'Менеджер по продажам', stage: 'Новый' },
  //     { id: 3, name: 'Сидоренко Валентин', tags: ['#подходящий', '#IT'], icon: "hh20", isPng: false, imagePath: "", resume: 'Пекарь электромонтер', vacancy: 'Менеджер по продажам', stage: 'Новый' },
  //     { id: 4, name: 'Сидоренко Валентин', tags: ['#подходящий', '#IT'], icon: "hh20", isPng: false, imagePath: "", resume: 'Пекарь электромонтер', vacancy: 'Менеджер по продажам', stage: 'Новый' },
  //     { id: 5, name: 'Сидоренко Валентин', tags: ['#подходящий', '#IT'], icon: "hh20", isPng: false, imagePath: "", resume: 'Пекарь электромонтер', vacancy: 'Менеджер по продажам', stage: 'Новый' },
  //     { id: 6, name: 'Сидоренко Валентин', tags: ['#подходящий', '#IT'], icon: "hh20", isPng: false, imagePath: "", resume: 'Пекарь электромонтер', vacancy: 'Менеджер по продажам', stage: 'Новый' },
  //     { id: 7, name: 'Сидоренко Валентин', tags: ['#подходящий', '#IT'], icon: "hh20", isPng: false, imagePath: "", resume: 'Пекарь электромонтер', vacancy: 'Менеджер по продажам', stage: 'Новый' },
  //     { id: 8, name: 'Сидоренко Валентин', tags: ['#подходящий', '#IT'], icon: "hh20", isPng: false, imagePath: "", resume: 'Пекарь электромонтер', vacancy: 'Менеджер по продажам', stage: 'Новый' },
  //     { id: 9, name: 'Сидоренко Валентин', tags: ['#подходящий', '#IT'], icon: "hh20", isPng: false, imagePath: "", resume: 'Пекарь электромонтер', vacancy: 'Менеджер по продажам', stage: 'Новый' },
  //     { id: 10, name: 'Сидоренко Валентин', tags: ['#подходящий', '#IT'], icon: "hh20", isPng: false, imagePath: "", resume: 'Пекарь электромонтер', vacancy: 'Менеджер по продажам', stage: 'Новый' },
  //     { id: 11, name: 'Сидоренко Валентин', tags: ['#подходящий', '#IT'], icon: "hh20", isPng: false, imagePath: "", resume: 'Пекарь электромонтер', vacancy: 'Менеджер по продажам', stage: 'Новый' },
  // ]);

  const data = ref(candidatesMin)

  const paginatedCandidates = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    return data.value.slice(startIndex, startIndex + itemsPerPage)
  })

  function goToCandidate(id) {
    router.push(`/candidates/${id}`)
  }
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
    <!-- table cans on grid -->
    <div class="table-container">
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
          <div class="flex gap-2.5 p-2.5">
            <UiAvatar size="candidate">
              <UiAvatarImage
                src="https://github.com/radix-vue.png"
                alt="@radix-vue"
              />
              <UiAvatarFallback>АА</UiAvatarFallback>
            </UiAvatar>
            <div>
              <p
                class="text-sm font-medium text-space mb-5px leading-[170%] cursor-pointer"
                @click="goToCandidate(item.id)"
              >
                {{ item.surname }} {{ item.firstName }}
              </p>
              <div class="flex gap-2.5">
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="text-dodger text-13px font-normal"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          <div class="px-2.5">
            <CardIcon
              :icon="item.icon"
              :isPng="item.isPng"
              :imagePath="item.imagePath"
              :width="21"
              :height="21"
            />
          </div>
          <div class="px-2.5 text-sm font-normal text-space">
            {{ item.resume }}
          </div>
          <div class="px-2.5 text-sm font-normal text-space">
            {{ item.vacancy }}
          </div>
          <div class="px-2.5 text-sm font-normal text-space">
            {{ item.stage }}
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
