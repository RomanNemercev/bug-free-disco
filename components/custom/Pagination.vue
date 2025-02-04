<template>
    <div class="flex gap-2 justify-center mt-4">

        <button :disabled="currentPage === 1" @click="$emit('page-changed', currentPage - 1)" class="border px-4 py-2">
            Назад
        </button>

        <button v-if="shouldShowFirst" @click="$emit('page-changed', 1)"
          :class="{ 'bg-black text-white': currentPage === 1 }" class="border px-4 py-2">
            1
        </button>

        <span v-if="showLeftDots" class="px-2">...</span>

        <button v-for="page in visiblePages" :key="page" @click="$emit('page-changed', page)"
          :class="{ 'bg-black text-white': currentPage === page }" class="border px-4 py-2">
            {{ page }}
        </button>

        <span v-if="showRightDots" class="px-2">...</span>

        <button v-if="shouldShowLast" @click="$emit('page-changed', totalPages)"
          :class="{ 'bg-black text-white': currentPage === totalPages }" class="border px-4 py-2">
            {{ totalPages }}
        </button>

        <button :disabled="currentPage === totalPages" @click="$emit('page-changed', currentPage + 1)"
          class="border px-4 py-2">
            Вперед
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    currentPage: Number,
    totalPages: Number
})

import { computed } from "vue";

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
</script>