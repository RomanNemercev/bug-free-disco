<template>
  <div class="flex justify-center">
    <div class="flex justify-center mt-25px bg-white w-fit p-2.5 rounded-ten leading-normal">

      <button :disabled="currentPage === 1" @click="$emit('page-changed', currentPage - 1)"
        class="p-2.5 rounded-ten mr-2.5 transition-colors" @mouseover="checkDisableArrowLeft()"
        @mouseleave="isHoveredLeftArrow = false"
        :class="isHoveredLeftArrow ? 'bg-zumthor text-dodger' : 'bg-athens-gray text-slate-custom'">
        <svg-icon name="pagination-arrow-left" width="20" height="20" />
      </button>
      <div class="flex justify-center gap-x-5px">
        <button v-if="shouldShowFirst" @click="$emit('page-changed', 1)" :class="buttonClasses(1, isHoveredFirstPage)"
          @mouseover="isHoveredFirstPage = true" @mouseleave="isHoveredFirstPage = false"
          class="p-1 min-w-10 h-10 text-13px font-bold rounded-ten transition-colors">
          1
        </button>

        <span v-if="showLeftDots"
          class="p-2 min-w-10 h-10 text-13px font-bold text-slate-custom flex justify-center items-center">...</span>

        <button v-for="page in visiblePages" :key="page" @click="$emit('page-changed', page)"
          :class="buttonClasses(page, isHoveredMainPage[page])" @mouseover="isHoveredMainPage[page] = true"
          @mouseleave="isHoveredMainPage[page] = false"
          class="p-1 min-w-10 h-10 text-13px font-bold rounded-ten transition-colors">
          {{ page }}
        </button>

        <span v-if="showRightDots"
          class="px-2 min-w-10 h-10 text-13px font-bold text-slate-custom flex justify-center items-center">...</span>

        <button v-if="shouldShowLast" @click="$emit('page-changed', totalPages)"
          :class="buttonClasses(totalPages, isHoveredLastPage)" @mouseover="isHoveredLastPage = true"
          @mouseleave="isHoveredLastPage = false"
          class="p-1 min-w-10 h-10 text-13px font-bold rounded-ten transition-colors">
          {{ totalPages }}
        </button>
      </div>

      <button :disabled="currentPage === totalPages" @click="$emit('page-changed', currentPage + 1)"
        class="p-2.5 rounded-ten ml-2.5 transition-colors" @mouseover="checkDisableArrowRight()"
        @mouseleave="isHoveredRightArrow = false"
        :class="isHoveredRightArrow ? 'bg-zumthor text-dodger' : 'bg-athens-gray text-slate-custom'">
        <svg-icon name="pagination-arrow-right" width="20" height="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  visiblePages: Array,
  shouldShowFirst: Boolean,
  shouldShowLast: Boolean
});

import { ref, computed } from "vue";

const maxVisiblePages = 5;

const shouldShowFirst = computed(() => props.currentPage > 3);
const shouldShowLast = computed(() => props.currentPage < props.totalPages - 2);

const showLeftDots = computed(() => props.currentPage > maxVisiblePages);
const showRightDots = computed(() => props.currentPage < props.totalPages - maxVisiblePages + 1);

const visiblePages = computed(() => {
  let startPage = Math.max(1, props.currentPage - 2);
  let endPage = Math.min(props.totalPages - 1, props.currentPage + 2);

  if (props.currentPage === 1) {
    endPage = Math.min(maxVisiblePages, props.totalPages - 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
});

const isHoveredLeftArrow = ref(false);
const isHoveredRightArrow = ref(false);
const isHoveredFirstPage = ref(false);
const isHoveredLastPage = ref(false);
const isHoveredMainPage = ref({}); // реактивный объект для всех страниц

function checkDisableArrowLeft() {
  if (props.currentPage === 1) {
    isHoveredLeftArrow.value = false;
  } else {
    isHoveredLeftArrow.value = true;
  }
}

function checkDisableArrowRight() {
  if (props.currentPage === props.totalPages) {
    isHoveredRightArrow.value = false;
  } else {
    isHoveredRightArrow.value = true;
  }
}

// Функция возвращает корректный класс для каждой кнопки в зависимости от состояния
function buttonClasses(page, isHovered) {
  if (props.currentPage === page) {
    return 'bg-space text-white'; // Активная страница — фиксированные стили
  }
  return isHovered ? 'bg-athens-gray text-space' : 'bg-transparent text-slate-custom';
}
</script>