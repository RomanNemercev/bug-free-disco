<template>
  <div class="cursor-pointer w-full relative" ref="dataPicker">
    <div class="dropdown-selected-option relative border border-athens rounded-ten py-7px px-15px bg-athens-gray"
      @click="toggleDropdown" @focus="isFocused = true" @blur="handleBlur" :class="[
        { 'bg-athens-gray': !isError },
        { 'border-red-custom': isError },
        { focused: isFocused },
      ]">
      {{ currectDate }}
      <span v-if="!currectDate" class="color-gray text-sm font-normal">
        {{
          props.dateFrom ? 'Начало периода' :
            props.dateTo ? 'Конец периода' :
              'Выберите дату'
        }}
      </span>
      <div class="absolute right-[15px] top-[11.5px]">
        <transition name="fade-icon" mode="out-in">
          <span :key="props.isOpen">
            <svg-icon :name="isDropDownVisible ? 'calendar-end' : 'calendar-start'"
              :class="isDropDownVisible ? 'text-dodger' : 'text-bali'" width="20" height="20" />
          </span>
        </transition>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="absolute w-max bottom-0 z-10 right-0 top-[54px]" v-if="isDropDownVisible">
        <CalendarBarStatic ref="calendarBar" @update:placeholder="updateDate" @dblclick="isDropDownVisible = false" class="calendar-wrapper" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CalendarBarStatic from '@/components/custom/CalendarBarStatic.vue';
import { dateStringToDots } from '../../helpers/date'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  dateFrom: {
    type: Boolean,
    default: false
  },
  dateTo: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'isOpen'])
const calendarBar = ref(null)
const dataPicker = ref(null)

const isDropDownVisible = ref(props.isOpen);

const isFocused = ref(false)
const isError = ref(false)

const currectDate = ref(null);

const handleBlur = () => {
  isFocused.value = false
}
const toggleDropdown = () => {
  isDropDownVisible.value = !isDropDownVisible.value
  emit('isOpen', isDropDownVisible.value)
}

const updateDate = (newDate) => {
  currectDate.value = dateStringToDots(newDate.toString())
  emit('update:modelValue', currectDate.value)
};

watch(() => props.isOpen, (newStatus) => {
  console.log('Новое значение', newStatus)
  isDropDownVisible.value = newStatus
});

// Обработка клика вне компонента
const handleClickOutside = (event) => {
  const selectContent = document.querySelector('.calendar-wrapper');
  // console.log('isDropDownVisible.value', isDropDownVisible.value)
  // console.log('dataPicker.value', dataPicker.value)
  // console.log('dataPicker.value.contains(event.target)', !dataPicker.value.contains(event.target))
  // console.log('calendarBar.value?.$el', calendarBar.value?.$el)
  // console.log('calendarBar.value.$el.contains(event.target)', calendarBar.value.$el.contains(event.target))
  // console.log('event.target.contains(selectContent)', !event.target.contains(selectContent))
  console.log('event', event.target)
  if (
    isDropDownVisible.value &&
    // dataPicker.value &&
    !dataPicker.value.contains(event.target) &&
    (calendarBar.value?.$el !== undefined) &&
    !calendarBar.value.$el.contains(event.target) &&
    // (calendarBar.value?.$el !== undefined || !calendarBar.value.$el.contains(event.target))  &&
    // !calendarBar.value.$el.contains(event.target) &&
    (!event.target.contains(selectContent) || !selectContent)
    // !selectContent
  ) {

    isDropDownVisible.value = false;
    emit('isOpen', isDropDownVisible.value);
  }
  // if (
  //   calendarBar.value?.$el !== undefined && 
  //   dataPicker.value &&
  //   !calendarBar.value.$el.contains(event.target) && 
  //   isDropDownVisible.value) {
  //   isDropDownVisible.value = false;
  //   emit('isOpen', isDropDownVisible.value);
  // }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// watch(
//   () => props.isOpen,
//   (newStatus) => {
//     isDropDownVisible.value = newStatus;
//   },
// );
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-4px);
  opacity: 0;
}

input {
  border-width: 1px;
  transition: border-color 0.3s;
}

input::placeholder {
  font-size: 14px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
}

.focused {
  border-color: #4a90e2;
}

.border-red-500 {
  border-color: #ef4444;
}

.focused {
  border: 1px solid #5898ff;
  outline: none;
  padding-left: 15px;
  background-image: none;
}

.color-gray {
  color: #9098b4;
}

.fade-icon-enter-active,
.fade-icon-leave-active {
  transition: opacity 0.2s;
}

.fade-icon-enter-from,
.fade-icon-leave-to {
  opacity: 0;
}
</style>