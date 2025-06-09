<template>
  <div class="cursor-pointer w-full relative" ref="minDropdown">
    <div 
      class="dropdown-selected-option relative border border-athens rounded-ten py-9px px-15px bg-athens-gray"
       @click="toggleDropdown"
       @focus="isFocused = true"
      @blur="handleBlur"
      :class="[
        { 'bg-athens-gray': !isError },
        { 'border-red-custom': isError },
        { focused: isFocused },
      ]"
    >
      {{ currectDate }}
      <span v-if="!currectDate" class="color-gray">Выберите дату</span>
    </div>
    <transition name="slide-fade">
      <div class="absolute w-max bg-white border border-athens rounded-ten shadow-shadow-droplist bottom-0 z-10 right-0"
        v-if="isDropDownVisible">
        <CalendarBarStatic ref="calendareBar" @update:placeholder="updateDate" @dblclick="isDropDownVisible = false" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue';
import CalendarBarStatic from '@/components/custom/CalendarBarStatic.vue';
import { dateStringToDots } from '../../helpers/date'
import { clickOutside } from '../../helpers/handlers'

const emit = defineEmits(['update:modelValue'])
const calendareBar  = ref(null)

const isDropDownVisible = ref(false);
const minDropdown = ref(null);

const isFocused = ref(false)
const isError = ref(false)

const currectDate = ref(null); 

const handleBlur = () => {
    isFocused.value = false
  }
const toggleDropdown = () => {
  isDropDownVisible.value = !isDropDownVisible.value
}

const updateDate = (newDate) => {
  currectDate.value = dateStringToDots(newDate.toString())
  emit('update:modelValue', currectDate.value)
};

// onBeforeUnmount(() => {
//   document.removeEventListener('click', (event) => clickOutside(event, calendareBar, () => isDropDownVisible.value = false))
// })

//  onMounted(() => {
//     document.addEventListener('click', (event) => clickOutside(event, calendareBar, () => isDropDownVisible.value = false))
//   })
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
</style>