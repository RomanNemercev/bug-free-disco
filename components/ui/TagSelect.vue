<script setup>
import { ref } from 'vue';

// Текущий ввод пользователя
const currentTag = ref('');

const isFocused = ref(false);

// Массив тегов
const tags = ref([]);

// Все доступные варианты (можно получать с бэкенда)
const options = ref(['Дизайн', 'Аналитика', 'Разработка', 'Тестирование', 'Продажи', 'Маркетинг']);

// Отфильтрованные варианты для автокомплита
const filteredOptions = ref([]);

// Фильтрация списка в зависимости от ввода
const filterOptions = () => {
    const input = currentTag.value.toLowerCase();
    filteredOptions.value = options.value.filter(option =>
        option.toLowerCase().includes(input) && !tags.value.includes(option)
    );
};

// Добавление нового тега
const addTag = () => {
    if (currentTag.value && !tags.value.includes(currentTag.value)) {
        tags.value.push(currentTag.value); // Добавляем тег
    }
    currentTag.value = ''; // Очищаем поле
    filteredOptions.value = []; // Сбрасываем список предложений
};

// Выбор тега из автокомплита
const selectOption = (option) => {
    tags.value.push(option); // Добавляем выбранный тег
    currentTag.value = ''; // Очищаем поле
    filteredOptions.value = []; // Сбрасываем список
};

// Удаление тега
const removeTag = (index) => {
    tags.value.splice(index, 1); // Удаляем тег по индексу
};

// Очистка поля ввода
const clearInput = () => {
    currentTag.value = '';
    filteredOptions.value = [];
};

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Например, Аналитика'
    }
})
</script>


<template>
    <div class="tag-input-wrapper flex flex-col">
        <!-- Список тегов -->
        <div class="tags flex flex-wrap gap-x-5px">
            <div v-for="(tag, index) in tags" :key="index"
              class="tag flex items-center bg-zumthor py-5px rounded-ten font-medium text-dodger text-sm px-10px mb-[15px]">
                {{ tag }}
                <button class="remove-button cursor-pointer ml-1" @click="removeTag(index)"><svg-icon name="reset-tag"
                      width="20" height="20" /></button>
            </div>
        </div>
        <div class="relative">
            <!-- Поле ввода -->
            <div class="input-container relative w-full">
                <input type="text" v-model="currentTag" @keyup.enter="addTag" @input="filterOptions"
                  :placeholder="isFocused ? '' : placeholder" @focus="isFocused = true" @blur="isFocused = false"
                  class="input-skills w-full py-[9px] pl-[42px] border border-athens rounded-ten bg-athens-gray text-sm font-normal focus:outline-none focus:border focus:border-dodger" />
                <button class="clear-input absolute top-2/4 right-4 text-slate-custom" v-if="currentTag"
                  @click="clearInput">✖</button>
            </div>

            <!-- Выпадающий список с предложениями -->
            <transition name="slide-fade">
                <ul v-if="filteredOptions.length && currentTag"
                  class="autocomplete-list absolute w-full bg-white border border-athens rounded-plus shadow-shadow-droplist top-12 z-10">
                    <li v-for="(option, index) in filteredOptions" :key="index" @click="selectOption(option)"
                      class="option text-slate-custom text-sm font-normal py-10px px-15px hover:text-space hover:bg-zumthor cursor-pointer">
                        {{ option }}
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.input-skills {
    background-image: url('../../assets/sprite/svg/search.svg');
    background-repeat: no-repeat;
    background-position: 15px center;
}

.input-skills::placeholder {
    color: #9098b4;
}

.clear-input {
    transform: translateY(-50%);
    cursor: pointer;
}

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
