<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      @click.self="closePopup"
      :class="[isOpen ? 'opacity-100' : 'opacity-0', overflowContainer ? 'overflow-auto' : 'overflow-hidden']">
        <!-- Внешний контейнер с закруглениями -->
        <div class="bg-white w-full h-full max-h-[80vh] rounded-fifteen p-25px relative transform"
          :style="{ maxWidth: width, height: height === 'auto' ? 'auto' : height, overflow: disableOverflowHidden ? 'visible' : 'hidden', top: topActive ? '-10%' : 'auto' }"
          :class="{ 'pr-2.5': customStyles }">
            <!-- Внутренний контейнер со скроллом -->
            <div ref="scrollContainer" class="overflow-y-auto h-full pr-[15px]"
              :style="{ ...customStyles, maxHeight: height === 'auto' ? 'auto' : height, overflow: disableOverflowHidden ? 'visible' : 'auto' }">
                <!-- btn for close (опционально) -->
                <button v-if="showCloseButton && !hasScrollbar" @click="closePopup"
                  class="absolute top-25px right-25px text-gray-500 hover:text-black">
                    ✖
                </button>
                <!-- content -->
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    showCloseButton: {
        type: Boolean,
        default: true, // По умолчанию кнопка отображается
    },
    width: {
        type: String,
        default: "fit-content",
    },
    height: {
        type: String,
        default: "auto",
    },
    disableOverflowHidden: {
        type: Boolean,
        default: false, // По умолчанию 'overflow-hidden' включен
    },
    overflowContainer: {
        type: Boolean,
        default: false, // по умолчанию overflow-hidden включен
    },
    topActive: {
        type: Boolean,
        default: false, // По умолчанию top-auto
    },
});
const emit = defineEmits(["close"]);

const scrollContainer = ref(null);
const hasScrollbar = ref(false);
const customStyles = ref({});

// Закрытие попапа
const closePopup = () => {
    emit("close");
};

// Проверка наличия скроллбара
const checkScrollbar = () => {
    if (scrollContainer.value) {
        hasScrollbar.value = scrollContainer.value.scrollHeight > scrollContainer.value.clientHeight;
        updateStyles();
    }
};

// Обновление стилей
const updateStyles = () => {
    if (hasScrollbar.value) {
        customStyles.value = {
            paddingRight: "15px", // Учитываем ширину скролл-бара
        };
    } else {
        customStyles.value = {};
    }
};

// Следим за открытием попапа
watch(
    () => props.isOpen,
    (newVal) => {
        if (newVal) {
            checkScrollbar();
        }
    }
);

onMounted(() => {
    checkScrollbar();
});
</script>

<style scoped>
/* Кастомизированный скролл-бар */
::-webkit-scrollbar {
    width: 10px;
    /* Ширина скролл-бара */
    margin-right: 10px;
    /* Визуальный отступ */
}

::-webkit-scrollbar-thumb {
    background-color: #79869a;
    /* Цвет */
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #5a6a7f;
    /* Цвет при наведении */
}
</style>