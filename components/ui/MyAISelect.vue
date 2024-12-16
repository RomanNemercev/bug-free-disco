<template>
    <div class="relative">
        <button
          class="flex items-center justify-between w-full px-4 py-2 text-left text-sm font-medium text-gray-700 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          @click="isOpen = !isOpen">
            <span v-if="!selectedOption" class="text-violet">Сгененерировать исскуственным интеллектом</span>
            <span v-else>{{ selectedOption }}</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="#8d47ff" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <ul v-show="isOpen" class="absolute top-full left-0 w-full bg-white shadow-md rounded-lg">
            <li v-for="option in options" :key="option" class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              @click="selectOption(option)">
                {{ option }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
});

const selectedOption = ref(null);
const isOpen = ref(false);

const selectOption = (option) => {
    selectedOption.value = option;
    isOpen.value = false;
};
</script>