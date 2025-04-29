<template>
  <div class="w-full relative" ref="inputCalendarWrapper">
    <input
      class="w-full rounded-ten py-2.5 px-15px text-sm font-normal text-space transition-color"
      :class="[
        isFocused ? 'focused' : '',
        fullStyles ? 'bg-athens-gray' : 'bg-transparent',
      ]"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :value="formattedDate"
      @input="store.selectedDate = $event.target.value"
    />
    <div class="absolute top-2.5 right-15px">
      <button
        @click="toggleCalendar"
        :class="[
          fullStyles ? 'text-slate-custom' : 'text-dodger',
          calendarVisible && fullStyles ? 'text-space' : 'text-slate-custom',
        ]"
      >
        <svg-icon
          v-if="!calendarVisible"
          :name="fullStyles ? 'calendar20' : 'calendar-start'"
          width="20"
          height="20"
        />
        <svg-icon
          v-if="calendarVisible"
          :name="fullStyles ? 'calendar20' : 'calendar-end'"
          width="20"
          height="20"
        />
      </button>
    </div>
    <div class="absolute top-10 right-15px" v-if="calendarVisible">
      <CalendarBar @update:selectedDate="updateDate" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { useCalendarStore } from '@/stores/calendarStore'
  import CalendarBar from '@/components/custom/CalendarBar.vue'

  const store = useCalendarStore() // ✅ Используем Pinia
  const localSelectedDate = ref(store.selectedDate)

  const isFocused = ref(false)
  const calendarVisible = ref(false)
  const inputCalendarWrapper = ref(null)

  const toggleCalendar = () => {
    calendarVisible.value = !calendarVisible.value
  }

  // Закрываем календарь при клике вне него
  onClickOutside(inputCalendarWrapper, () => {
    calendarVisible.value = false
  })

  const formattedDate = computed(() => {
    if (!store.selectedDate) return 'Сегодня'

    const date = new Date(store.selectedDate)
    return date.toLocaleDateString('ru-RU') // ✅ Преобразуем в формат DD.MM.YYYY
  })

  const updateDate = newDate => {
    localSelectedDate.value = newDate
    store.setSelectedDate(newDate) // ✅ Обновляем глобальное состояние
  }

  const props = defineProps({
    fullStyles: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style scoped>
  .calendar-wrapper {
    background-color: #ffffff;
  }

  .focused {
    background-color: #f9fafc;
    border: 1px solid #5898ff;
    outline: none;
  }
</style>
