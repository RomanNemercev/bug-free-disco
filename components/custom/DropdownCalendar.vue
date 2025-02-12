<template>
  <div class="cursor-pointer relative w-fit" ref="minDropdown">
    <div @click="toggleDropdown">
      <div class="pr-6 flex">
        <div class="text-sm" :class="isDropDownVisible ? 'text-dodger' : 'text-slate-custom'">Сегодня</div>
        <div class="dropdown-arrow absolute right-0 transition-transform duration-300 text-bali"
          :class="{ 'rotate-180 text-dodger': isDropDownVisible }">
          <svg-icon name="arrow-min-dropdown" width="19" height="19" />
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="absolute w-max bg-white border border-athens rounded-ten shadow-shadow-droplist top-8 z-10 right-0"
        v-if="isDropDownVisible">
        <CalendarBar />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import CalendarBar from '@/components/custom/CalendarBar.vue';

const isDropDownVisible = ref(false);
const minDropdown = ref(null);

const toggleDropdown = () => {
  isDropDownVisible.value = !isDropDownVisible.value
}
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
</style>