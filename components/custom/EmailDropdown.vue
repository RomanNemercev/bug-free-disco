<template>
    <div class="relative" ref="dropdownContainer">
        <!-- выбранный элемент -->
        <div class="flex items-center justify-between bg-athens-gray rounded-ten py-2.5 px-4 cursor-pointer"
          @click="toggleDropdown" :class="{ 'border-red': !selectedOption, 'border-transparent': selectedOption }">
            <div class="text-sm font-medium flex items-center space-x-2">
                <img v-if="selectedOption?.icon" :src="selectedOption.icon" alt="Icon" class="w-5 h-5" />
                <span
                  :class="{ 'text-slate-custom': !selectedOption && !isDropdownVisible, 'text-space': selectedOption && isDropdownVisible, 'text-space': selectedOption }">
                    <template v-if="selectedOption">
                        {{ selectedOption.name }}
                        <span class="text-slate-custom">({{ selectedOption.email }})</span>
                    </template>
                    <template v-else>
                        {{ placeholder }}
                    </template>
                </span>
            </div>
            <svg class="w-[18px] h-[18px] transform transition-transform" :class="{
                'rotate-180': isDropdownVisible,
                'text-slate-custom': !selectedOption && !isDropdownVisible, 'text-space': !selectedOption && isDropdownVisible, 'text-space': selectedOption,
            }" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.2241 7.34787L9.59912 12.9729C9.52073 13.0515 9.42759 13.1139 9.32503 13.1565C9.22247 13.1991 9.11251 13.221 9.00146 13.221C8.89041 13.221 8.78046 13.1991 8.6779 13.1565C8.57534 13.1139 8.48219 13.0515 8.40381 12.9729L2.77881 7.34787C2.6203 7.18936 2.53125 6.97438 2.53125 6.75021C2.53125 6.52605 2.6203 6.31107 2.77881 6.15256C2.93732 5.99405 3.1523 5.905 3.37646 5.905C3.60063 5.905 3.81561 5.99405 3.97412 6.15256L9.00217 11.1806L14.0302 6.15185C14.1887 5.99335 14.4037 5.9043 14.6279 5.9043C14.852 5.9043 15.067 5.99335 15.2255 6.15185C15.384 6.31036 15.4731 6.52535 15.4731 6.74951C15.4731 6.97368 15.384 7.18866 15.2255 7.34717L15.2241 7.34787Z"
                  fill="currentColor" />
            </svg>
        </div>
        <!-- выпадающий список -->
        <transition name="slide-fade">
            <ul v-if="isDropdownVisible" class="absolute bg-white border rounded-lg shadow-lg w-full mt-2 z-10">
                <li v-for="(option, index) in options" :key="index" @click="selectOption(option)"
                  class="flex items-center py-13px px-4 cursor-pointer hover:bg-gray-100">
                    <div class="flex gap-x-2 items-center max-w-[200px] w-full">
                        <img v-if="option.icon" :src="option.icon" alt="Icon" class="w-5 h-5" />
                        <p class="text-sm font-normal text-space">{{ option.name }}</p>
                    </div>
                    <span class="text-slate-custom max-w-56 truncate text-sm font-normal">{{ option.email }}</span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: [String, Object],
        default: null,
    },
    placeholder: {
        type: String,
        default: 'Выберите email',
    },
});

const emit = defineEmits(['update:modelValue']);

const isDropdownVisible = ref(false);
const selectedOption = ref(props.modelValue);

const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
}

const selectOption = (option) => {
    selectedOption.value = option;
    emit('update:modelValue', option);
    isDropdownVisible.value = false;
};

// close on click outside
const dropdownContainer = ref(null);

const handleClickOutside = (event) => {
    if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
        isDropdownVisible.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
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