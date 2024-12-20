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
    <div class="relative flex items-center gap-3 max-w-full">
        <!-- Ссылка -->
        <div
          class="truncate text-sm text-space font-normal flex-1 border border-athens rounded-ten bg-athens-gray py-9px px-15px"
          :title="props.url">
            {{ props.url }}
        </div>

        <!-- Кнопка копирования -->
        <button
          class="text-slate-custom flex-shrink-0 p-2 bg-athens-gray border border-athens rounded-lg transition  hover:bg-zumthor hover:border-zumthor hover:text-dodger"
          @click="copyToClipboard">
            <svg-icon name="copy" width="20" height="20" />
        </button>

        <!-- Уведомление о копировании -->
        <transition name="slide-fade">
            <div v-if="isCopied"
              class="absolute mb-1 text-xs text-green-600 bg-white border border-green-200 rounded-lg shadow-md p-1 right-0 bottom-full">
                Скопировано!
            </div>
        </transition>
    </div>
</template>

<style scoped>
/* Кастомный стиль для обрезания URL с "..." */
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(4px);
    opacity: 0;
}
</style>
