<template>
    <div class="dropdown-wrapper cursor-pointer relative" ref="dropDown">
        <div class="dropdown-selected-option relative border rounded-ten py-9px px-15px" :class="[
            'border-athens',
            (isSelected && selectedOption) ? 'bg-zumthor text-dodger' : 'bg-athens-gray',
        ]" @click="toggleDropDown">
            <div>
                <div :class="selectedOption ? 'text-space' : 'text-slate-custom'" class="text-sm truncate pr-4">
                    <div v-if="selectedOption" class="flex items-center gap-2.5">
                        <svg-icon :name="selectedOption.platform" width="20" height="20" />
                        <div class="text-xm items-center font-medium">
                            {{ selectedOption.domain }} 
                            <span class="text-slate-custom text-13px">
                                ({{ selectedOption.data.email }})
                            </span>
                        </div>
                    </div>
                    <template v-else>
                        {{ props.placeholder }}
                    </template>
                    <!-- {{ mappedSelectedOption || props.placeholder }} -->
                </div>
                <!-- Стрелка -->
                <div class="dropdown-arrow absolute right-3.5 top-2 transition-transform duration-300" :class="[
                    isDropDownVisible ? 'rotate-180 text-dodger' : 'text-bali',
                    (isSelected && selectedOption) ? 'text-dodger' : 'text-bali',
                ]">
                    <svg-icon name="dropdown-arrow" width="20" height="20" />
                </div>
            </div>
        </div>
        <transition name="slide-fade">
            <div
              class="options-wrapper absolute w-full bg-white border border-athens rounded-ten shadow-shadow-droplist top-14 z-10"
              v-if="isDropDownVisible">
              <template v-for="(option, index) in props.options" :key="index">
                <div v-if="option.isAuthenticated"
                  class="option font-normal py-13px px-15px hover:bg-athens-gray cursor-pointer first:rounded-t-ten last:rounded-b-ten flex items-center gap-2.5"
                   @click="toggleOptionSelect(option)">
                  <!-- <template> -->
                    <svg-icon :name="option.platform" width="20" height="20" />
                    <div class="text-xs items-center text-domain">
                        {{ option.domain }}
                    </div>
                    <div class="text-xs text-slate-custom">
                        {{ option.data.email }}
                    </div>
                  <!-- </template> -->
                </div>
              </template>   
            </div>
        </transition>
    </div>
</template>

<script setup>
import {
    ref,
    computed,
    onMounted,
    onBeforeUnmount,
} from 'vue';

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
    modelValue: {
        default: null,
    },
    selected: {
        type: [Object, null],
        default: null,
    },
    placeholder: {
        type: String,
        default: 'Выбрать значение',
    },
    variant: {
        type: String,
        default: 'selected', // default | selected
    },
});

const dropDown = ref(null);
const isDropDownVisible = ref(false);
const emit = defineEmits(['update:modelValue']);
const selectedOption = ref(props.selected); // Устанавливаем начальное значение

const isSelected = computed(() => props.variant === 'selected');
console.log('drop', isSelected.value);
// Открытие/закрытие выпадающего списка
const toggleDropDown = () => {
    isDropDownVisible.value = !isDropDownVisible.value;
};

// Выбор значения
const toggleOptionSelect = (option) => {
    console.log(option);
    selectedOption.value = option || null;
    emit('update:modelValue', option || null);
    isDropDownVisible.value = false;
};

// Закрытие выпадающего списка при клике вне его
const closeDropDown = (element) => {
    if (!dropDown.value?.contains(element.target)) {
        isDropDownVisible.value = false;
    }
};

onMounted(() => {
    window.addEventListener('click', closeDropDown);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropDown);
});
</script>

<style scoped>
.text-domain {
    width: 272px;
    max-width: 50%;
}
</style>
