<template>
    <div ref="dropdownRef" class="relative w-full" :class="{ 'shadow-shadow-droplist rounded-t-[10px]': isOpen }"
      @click="handleWrapperClick">
        <div
          class="flex items-center gap-2 py-[9px] pl-15px pr-15px border border-athens rounded-ten cursor-pointer relative bg-athens-gray"
          :class="{ 'bg-white border-transparent': isOpen }">
            <input v-if="isOpen" ref="inputRef" type="text" v-model="searchQuery" placeholder="Поиск"
              :class="{ 'border border-athens rounded-ten bg-athens-gray py-[9px] pl-[43px] pr-15px': isOpen }"
              class="dropdown-input w-full focus:outline-none bg-athens-gray text-bali text-sm font-normal"
              @blur="handleBlur" />
            <template v-else>
                <span v-if="selectedValue" class="truncate" @click.stop="toggleDropdown">
                    {{ selectedValue.label }}
                </span>
                <span v-else class="text-bali text-sm font-normal" @click.stop="toggleDropdown">
                    {{ placeholder }}
                </span>
            </template>

            <!-- Крестик с классом clear-icon -->
            <span v-if="selectedValue" class="text-gray-500 absolute right-2 cursor-pointer clear-icon"
              @click="clearSelection">
                &#10006;
            </span>
            <!-- Стрелка -->
            <span v-else class="absolute right-1 ml-auto mr-2.5 cursor-pointer text-bali" v-show="!isOpen">
                <svg-icon name="dropdown-arrow" width="20" height="20" />
            </span>
        </div>

        <!-- Выпадающий список -->
        <transition name="slide-fade">
            <ul v-if="isOpen"
              class="absolute bg-white border rounded mt-[1px] overflow-y-auto max-h-40 z-10 w-full transition-opacity duration-300 ease-in-out"
              :class="{ 'shadow-shadow-combolist rounded-b-[10px]': isOpen }">
                <li v-for="item in filteredOptions" :key="item.id" @click="selectOption(item)"
                  class="item-list text-sm text-slate-custom py-10px px-15px cursor-pointer hover:bg-gray-100">
                    {{ item.label }}
                </li>
                <li v-if="filteredOptions.length === 0" class="p-2 text-gray-500 text-center">
                    Нет результатов
                </li>
            </ul>
        </transition>
    </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const props = defineProps({
    options: {
        type: Array,
        required: true,
        default: () => [],
    },
    placeholder: {
        type: String,
        default: "Выберите значение",
    },
    modelValue: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const searchQuery = ref("");
const inputRef = ref(null);
const dropdownRef = ref(null);

const selectedValue = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit("update:modelValue", value);
    },
});

// Фильтрация опций
const filteredOptions = computed(() => {
    if (!searchQuery.value) return props.options;
    const query = searchQuery.value.toLowerCase();
    return props.options.filter((option) =>
        option.label.toLowerCase().includes(query)
    );
});

// Обработчик клика на обертке
const handleWrapperClick = (event) => {
    // Проверка на клик по крестику
    if (event.target.closest('.clear-icon')) return;

    // Открытие/закрытие списка
    toggleDropdown();
};

// Открытие/закрытие списка
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
        setTimeout(() => inputRef.value?.focus(), 0);
    }
};

// Выбор элемента
const selectOption = (option) => {
    selectedValue.value = option;
    isOpen.value = false;
    searchQuery.value = "";
};

// Очистка выбора
const clearSelection = () => {
    selectedValue.value = null;
};

// Обработка клика вне компонента
const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isOpen.value = false;
        searchQuery.value = "";
    }
};

const handleBlur = () => {
    setTimeout(() => {
        isOpen.value = false;
        searchQuery.value = "";
    }, 100);
};

// Слушатели
onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<style scoped>
.dropdown-input {
    background-image: url('../../assets/sprite/svg/search.svg');
    background-repeat: no-repeat;
    background-position: 15px center;
}

::-webkit-scrollbar {
    width: 10px;
    background-color: #f4f6f8;
    border-bottom-right-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: #79869a;
    /* Your preferred color */
    border-radius: 5px;
}

.item-list {
    line-height: normal;
}

.item-list:not(:last-child) {
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