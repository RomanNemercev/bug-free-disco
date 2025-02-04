<template>
    <div class="flex gap-2 justify-center mt-4">
        <button :disabled="currentPage === 1" @click="$emit('page-changed', currentPage - 1)" class="border px-4 py-2">
            Назад
        </button>

        <button v-for="page in totalPages" :key="page" :class="{ 'bg-black text-white': page === currentPage }"
          @click="$emit('page-changed', page)" class="border px-4 py-2">
            {{ page }}
        </button>

        <button :disabled="currentPage === totalPages" @click="$emit('page-changed', currentPage + 1)"
          class="border px-4 py-2">
            Вперед
        </button>
    </div>
</template>

<script setup>
defineProps({
    currentPage: Number,
    totalPages: Number
});
</script>