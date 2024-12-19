<script setup>
import { ref } from 'vue';

// Пропсы для компонента
const props = defineProps({
    url: {
        type: String,
        required: true, // Ссылка обязательна
    },
});

// Локальное состояние для копирования
const isCopied = ref(false);

// Функция для копирования ссылки
const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(props.url); // Копируем ссылку в буфер
        isCopied.value = true;

        // Убираем статус "скопировано" через 2 секунды
        setTimeout(() => {
            isCopied.value = false;
        }, 2000);
    } catch (error) {
        console.error('Не удалось скопировать ссылку:', error);
    }
};
</script>

<template>
    <div class="relative flex items-center gap-2 max-w-full overflow-hidden">
        <!-- Ссылка -->
        <div class="truncate text-sm text-space font-normal flex-1 border border-athens rounded-ten bg-athens-gray"
          title="Скопировать ссылку">
            {{ props.url }}
        </div>

        <!-- Кнопка копирования -->
        <button class="flex-shrink-0 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition" @click="copyToClipboard">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8 16h8M8 12h8m-8-4h8M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </button>

        <!-- Уведомление о копировании -->
        <div v-if="isCopied"
          class="absolute top-full mt-1 text-xs text-green-600 bg-white border border-green-200 rounded-lg shadow-md p-1">
            Скопировано!
        </div>
    </div>
</template>

<style scoped>
/* Кастомный стиль для обрезания URL с "..." */
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
