<template>
    <div class="relative text-left flex items-center h-fit" ref="btnSelector">
        <!-- Кнопка подтверждения -->
        <button @click="confirmTransfer" class="px-4 py-2 bg-zumthor text-dodger rounded-l-ten border-r border-pattens">
            Перенести на “{{ selectedLabel }}”
        </button>

        <!-- Выпадающий список -->
        <div class="inline-block relative">
            <button @click="toggleDropdown" class="px-9px py-2.5 bg-zumthor text-dodger rounded-r-ten">
                <svg-icon name="ai-arrow" width="20" height="20" />
            </button>

        </div>
        <transition name="slide-fade">
            <div v-if="showDropdown" class="absolute z-10 mt-15px rounded-plus shadow-shadow-droplist top-10 w-full">
                <ul class="bg-transparent rounded-plus divide-y divide-athens">
                    <li v-for="(label, index) in props.options" :key="index" @click="selectOption(label)"
                      class="text-sm font-normal text-slate-custom px-15px py-[9.5px] cursor-pointer bg-white first:rounded-t-plus last:rounded-b-plus first:py-2.5 leading-normal hover:bg-slate-100">
                        {{ label }}
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        default: null,
    },
    options: {
        type: Array,
        required: true,
    },
})

const emit = defineEmits(['update:modelValue']);
const btnSelector = ref(null);
const selectedLabel = ref('Подумать') // начальное значение
const showDropdown = ref(false)

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
}

const selectOption = (label) => {
    selectedLabel.value = label
    showDropdown.value = false
    emit('update:modelValue', label)
}

const confirmTransfer = () => {
    // Здесь будет логика "перенести на выбранное"
    console.log('Переносим на:', selectedLabel.value)
}

const handleClickOutside = (event) => {
    if (!btnSelector.value.contains(event.target)) {
        showDropdown.value = false
    }
}

onMounted(() => {
    window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside);
});
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