<template>
  <div class="flex justify-center">
    <div class="flex justify-center mt-25px bg-white w-fit p-2.5 rounded-ten leading-normal">
      <!-- Кнопка "Назад" -->
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
        @mouseover="setHoverState('leftArrow', true)" @mouseleave="setHoverState('leftArrow', false)"
        :class="buttonClasses('arrow', 'leftArrow')" class="p-2.5 rounded-ten mr-2.5 transition-colors">
        <svg-icon name="pagination-arrow-left" width="20" height="20" />
      </button>

      <!-- Блок с кнопками страниц -->
      <div class="flex justify-center gap-x-5px">
        <!-- Первая страница -->
        <button v-if="shouldShowFirst" @click="changePage(1)" @mouseover="setHoverState(1, true)"
          @mouseleave="setHoverState(1, false)" :class="buttonClasses('page', 1)"
          class="p-1 min-w-10 h-10 text-13px font-bold rounded-ten transition-colors">
          1
        </button>

        <!-- Многоточие слева -->
        <span v-if="showLeftDots"
          class="p-2 min-w-10 h-10 text-13px font-bold text-slate-custom flex justify-center items-center">
          ...
        </span>

        <!-- Основные страницы -->
        <button v-for="page in visiblePages" :key="page" @click="changePage(page)"
          @mouseover="setHoverState(page, true)" @mouseleave="setHoverState(page, false)"
          :class="buttonClasses('page', page)"
          class="p-1 min-w-10 h-10 text-13px font-bold rounded-ten transition-colors">
          {{ page }}
        </button>

        <!-- Многоточие справа -->
        <span v-if="showRightDots"
          class="px-2 min-w-10 h-10 text-13px font-bold text-slate-custom flex justify-center items-center">
          ...
        </span>

        <!-- Последняя страница -->
        <button v-if="shouldShowLast" @click="changePage(totalPages)" @mouseover="setHoverState(totalPages, true)"
          @mouseleave="setHoverState(totalPages, false)" :class="buttonClasses('page', totalPages)"
          class="p-1 min-w-10 h-10 text-13px font-bold rounded-ten transition-colors">
          {{ totalPages }}
        </button>
      </div>

      <!-- Кнопка "Вперед" -->
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)"
        @mouseover="setHoverState('rightArrow', true)" @mouseleave="setHoverState('rightArrow', false)"
        :class="buttonClasses('arrow', 'rightArrow')" class="p-2.5 rounded-ten ml-2.5 transition-colors">
        <svg-icon name="pagination-arrow-right" width="20" height="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["page-changed"]);

const maxVisiblePages = 5;

// Вычисляемые свойства
const shouldShowFirst = computed(() => props.currentPage > 3);
const shouldShowLast = computed(() => props.currentPage < props.totalPages - 2);

const showLeftDots = computed(() => props.currentPage > maxVisiblePages);
const showRightDots = computed(() => props.currentPage < props.totalPages - maxVisiblePages + 1);

const visiblePages = computed(() => {
  const { currentPage, totalPages } = props;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage === totalPages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
});

// Состояние наведения
const hoverState = ref({
  leftArrow: false,
  rightArrow: false,
  pages: {},
});

// Установка состояния наведения
function setHoverState(key, value) {
  if (key === "leftArrow" || key === "rightArrow") {
    hoverState.value[key] = value;
  } else {
    hoverState.value.pages[key] = value;
  }
}

// Изменение страницы
function changePage(page) {
  emit("page-changed", page);
}

// Классы для кнопок
function buttonClasses(type, key) {
  if (type === "arrow") {
    return hoverState.value[key] ? "bg-zumthor text-dodger" : "bg-athens-gray text-slate-custom";
  } else if (type === "page") {
    if (props.currentPage === key) {
      return "bg-space text-white";
    }
    return hoverState.value.pages[key] ? "bg-athens-gray text-space" : "bg-transparent text-slate-custom";
  }
}
</script>