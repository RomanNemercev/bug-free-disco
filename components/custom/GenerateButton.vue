<template>
    <div class="generator-container" ref="dropdownRef">
        <!-- Многофункциональная кнопка с триггером стрелки -->
        <div class="dropdown-wrapper">
            <!-- Цикл 3: Дополнительные кнопки(поставил наоборот что бы кнопки позиционировать) -->
            <div v-if="isCycleThree" class="additional-buttons">
                <button class="icon-button" @click="deleteContent"><svg-icon name="ai-delete" width="20"
                      height="20" /></button>
                <button class="icon-button" @click="reloadGeneration"><svg-icon name="ai-reload" width="20"
                      height="20" /></button>
            </div>
            <!-- Главная кнопка -->
            <button class="start-button" :class="{ 'finish-button': isCycleThree }" @click="startLoading"
              v-show="!isLoading || isCycleThree">
                <span>{{ isCycleThree ? selectedStyle : 'Сгененерировать исскуственным интеллектом' }}</span>
            </button>

            <!-- Стрелочка-триггер для открытия списка -->
            <button class="dropdown-trigger" :class="{ 'finish-arrow': isCycleThree }" @click="toggleDropdown"
              v-show="!isLoading || isCycleThree">
                <span class="dropdown-icon" :class="{ active: showDropdown }"><svg-icon name="ai-arrow" width="20"
                      height="20" /></span>
            </button>

            <!-- Выпадающий список -->
            <div v-if="showDropdown" class="dropdown">
                <div v-for="(style, index) in styles" :key="index" class="dropdown-item"
                  :class="{ active: style === selectedStyle }" @click="selectStyle(style)">
                    {{ style }}
                </div>
            </div>
        </div>

        <!-- Цикл 2: Скрин-лоадер -->
        <button v-if="isLoading" class="load-button loading">
            <span class="loading-text">Генерируем описание</span><span class="separeter"></span><span
              class="loader"></span>
        </button>
    </div>
</template>

<script setup>
// Состояния
import { ref, watch, onUnmounted } from "vue";

const styles = ["Формальный тон", "Дружелюбный тон", "Привлекательный тон"];
const selectedStyle = ref(styles[0]); // Значение по умолчанию
const isLoading = ref(false); // Состояние лоадера (Цикл 2)
const isCycleThree = ref(false); // Флаг для 3-го цикла
const showDropdown = ref(false); // Состояние выпадающего списка
const dropdownRef = ref(null);

// Запуск лоадера (Цикл 2)
const startLoading = () => {
    isLoading.value = true;
    showDropdown.value = false;
    isCycleThree.value = false;
    setTimeout(() => {
        isLoading.value = false;
        isCycleThree.value = true;
    }, 2000); // Симуляция задержки
};

// Логика открытия/закрытия выпадающего списка
const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

// Логика выбора стиля
const selectStyle = (style) => {
    selectedStyle.value = style;
    showDropdown.value = false;
};

// Закрытие списка при нажатии вне его
const handleClickOutside = (event) => {
    if (
        dropdownRef.value &&
        !dropdownRef.value.contains(event.target)
    ) {
        showDropdown.value = false;
    }
}

watch(showDropdown, (newValue) => {
    if (newValue) {
        document.addEventListener('click', handleClickOutside)
    } else {
        document.removeEventListener('click', handleClickOutside)
    }
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

// Логика для кнопки "Удалить"
const deleteContent = () => {
    alert("Контент удалён");
};

// Логика для кнопки "Reload"
const reloadGeneration = () => {
    startLoading();
};
</script>

<style scoped>
.generator-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Начальная кнопка */
.start-button {
    background-color: #ede1ff;
    color: #8d47ff;
    border: 1px solid #eaddff;
    border-right: 1px solid #e0cdff;
    padding: 8.5px 20px;
    padding-left: 37px;
    border-radius: 10px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    background-image: url('../../assets/sprite/svg/flash.svg');
    background-repeat: no-repeat;
    background-position: 15px center;
}

/* Кнопка загрузки */
.load-button {
    color: #fff;
    border: none;
    padding: 0 10px 0 15px;
    border-radius: 10px;
    cursor: pointer;
    line-height: normal;
}

.load-button.loading {
    background-color: #8d47ff;
    display: flex;
    align-items: center;
}

.separeter {
    width: 1px;
    height: 40px;
    background-color: #7520ff;
    margin: 0 10px 0 15px;
}

.loading-text,
.loader {
    padding: 10px 0;
}

.loading-text {
    font-size: 14px;
    font-weight: 500;
    font-family: "Inter", sans-serif;
}

/* Финишная кнопка */
.finish-button {
    background-color: #8d47ff;
    color: #ffffff;
    background-image: none;
    padding-left: 15px;
    border: none;
    border-right: 1px solid #7520ff;
    padding-right: 15px;
}

/* Триггер для раскрытия списка */
.dropdown-wrapper {
    display: flex;
    position: relative;
}

.dropdown-trigger {
    background-color: #ede1ff;
    border: 1px solid #eaddff;
    cursor: pointer;
    padding: 0 8px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #a855f7;
}

.finish-arrow {
    background-color: #8d47ff;
    color: #ffffff;
    border: none;
}

.dropdown-icon {
    transition: transform 0.2s;
}

.dropdown-icon.active {
    transform: rotate(180deg);
}

/* Выпадающий список */
.dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #fff;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    max-width: 283px;
    width: 100%;
    margin-top: 15px;
    z-index: 10;
}

.dropdown-item {
    padding: 6px 15px;
    color: #79869a;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    transition: background-color 0.2s;
}

.dropdown-item:not(:last-child) {
    border-bottom: 1px solid #f4f6f8;
}

.dropdown-item:hover,
.dropdown-item.active {
    color: #a855f7;
    background-color: #f3e8ff;
}

/* Loader */
.loader {
    background-image: url('../../assets/img/ai-loader.png');
    width: 21px;
    height: 20px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Дополнительные кнопки */
.additional-buttons {
    display: flex;
    gap: 10px;
    margin-right: 15px;
}

.icon-button {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ede1ff;
    border: none;
    cursor: pointer;
    border-radius: 10px;
}
</style>