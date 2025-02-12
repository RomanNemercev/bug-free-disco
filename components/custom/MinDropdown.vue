<template>
    <div class="cursor-pointer relative w-fit" ref="minDropdown">
        <div @click="toggleDropdown">
            <div class="pr-6">
                <div
                  :class="{ 'text-slate-custom font-semibold': !selectedOption, 'text-space font-semibold': selectedOption }"
                  class="text-sm">{{
                    mappedSelectedOption }}</div>
                <div class="dropdown-arrow top-0 absolute right-0 transition-transform duration-300 text-bali"
                  :class="{ 'rotate-180 text-dodger': isDropDownVisible, 'text-space': selectedOption }">
                    <svg-icon name="arrow-min-dropdown" width="19" height="19" />
                </div>
            </div>
        </div>
        <transition name="slide-fade">
            <div class="absolute w-max bg-white border border-athens rounded-ten shadow-shadow-droplist top-8 z-10"
              v-if="isDropDownVisible">
                <div
                  class="option text-slate-custom text-sm font-normal py-10px px-15px hover:text-space hover:bg-zumthor cursor-pointer first:rounded-t-ten last:rounded-b-ten"
                  v-for="(option, index) in props.options" :key="index" @click="toggleOptionSelect(option)">
                    {{ option.name || option }}
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue';

const selectedOption = ref(null);
const isDropDownVisible = ref(false);
const minDropdown = ref(null);
const emit = defineEmits(['update:modelValue']);
const toggleDropdown = () => {
    isDropDownVisible.value = !isDropDownVisible.value
}

const props = defineProps({
    modelValue: {
        default: null,
    },
    defaultValue: {
        type: String,
        default: 'Выбрать значение',
    },
    options: {
        type: Array,
        required: true,
    },
})

const mappedSelectedOption = computed(() => {
    return selectedOption.value?.name || selectedOption.value || props.defaultValue;
});

// choose option
const toggleOptionSelect = (option) => {
    selectedOption.value = option;
    isDropDownVisible.value = false;
    emit('update:modelValue', option?.name || option);
};

const closeDropdown = (element) => {
    if (!minDropdown.value?.contains(element.target)) {
        isDropDownVisible.value = false;
    }
}

onMounted(() => {
    window.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropdown);
})
</script>

<style scoped>
.option:not(:last-child) {
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