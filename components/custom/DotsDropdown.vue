<template>
    <div class="relative inline-block" ref="dropdownRef">
        <button
          class="text-slate-custom w-10 h-10 bg-athens-gray border border-athens rounded-ten outline-none focus:outline-none flex items-center justify-center hover:bg-zumthor hover:text-dodger hover:border-zumthor transition-all"
          :class="{ '!bg-zumthor !text-dodger !border-zumthor': isOpen }" @click="toggleDropdown">
            <svg-icon name="dots-dropdown" width="22" height="6" />
        </button>
        <transition name="slide-fade">
            <div v-if="isOpen"
              class="absolute right-0 mt-15px bg-white rounded-plus shadow-shadow-droplist cards z-10 min-w-[226px]">
                <div v-for="(item, index) in items" :key="index"
                  class="cards-item px-15px py-2.5 text-slate-custom text-sm font-normal cursor-pointer whitespace-nowrap hover:bg-gray-100 hover:text-space"
                  @click="handleClick(item)">
                    {{ item }}
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
    name: 'DropdownMenu',
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    emits: ['select-item'], // Добавляем emit события
    setup(props, { emit }) {
        const isOpen = ref(false);
        const dropdownRef = ref(null);

        const toggleDropdown = () => {
            isOpen.value = !isOpen.value;
        };

        const closeDropdown = (event) => {
            if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
                isOpen.value = false;
            }
        };

        const handleClick = (item) => {
            emit('select-item', item); // Эмитим событие при выборе
            isOpen.value = false; // Закрываем меню
        };

        onMounted(() => {
            document.addEventListener("click", closeDropdown);
        });

        onUnmounted(() => {
            document.removeEventListener("click", closeDropdown);
        });

        return {
            isOpen,
            toggleDropdown,
            handleClick,
            dropdownRef,
        };
    },
};
</script>

<style scoped>
/***** Scoped styles не нужны, всё через Tailwind *****/
.cards-item:not(:last-child) {
    border-bottom: 1px solid #f4f6f8;
}

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