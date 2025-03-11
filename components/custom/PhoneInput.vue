<template>
    <div class="w-full">
        <input v-model="formattedValue" class="bg-athens-gray border border-athens rounded-ten min-h-10 w-full pl-15px"
          :class="{ 'focused': isFocused, 'border-red-500': error }" placeholder="+7-000-000-0000"
          @focus="isFocused = true" @blur="validatePhone" @input="handleInput" />
        <span v-if="error" class="text-red-500 text-xs">{{ error }}</span>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);
const error = ref("");
const rawValue = ref(""); // Оригинальный ввод
const formattedValue = ref("");

const handleInput = (event) => {
    // Получаем только цифры
    const digits = event.target.value.replace(/\D/g, "").slice(0, 11); // Ограничиваем до 11 цифр (+7 + 10 цифр)

    // Формируем маску с "+"
    let mask = "+7";
    if (digits.length > 1) mask += ` (${digits.slice(1, 4)}`;
    if (digits.length >= 5) mask += `) ${digits.slice(4, 7)}`;
    if (digits.length >= 8) mask += `-${digits.slice(7, 9)}`;
    if (digits.length >= 10) mask += `-${digits.slice(9, 11)}`;

    // Обновляем значения
    rawValue.value = digits;
    formattedValue.value = mask;

    // Отправляем на сервер номер с "+"
    emit("update:modelValue", `+${digits}`);
};

const validatePhone = () => {
    isFocused.value = false;

    if (!rawValue.value || rawValue.value.length < 11) {
        error.value = "Введите полный номер телефона";
    } else {
        error.value = "";
    }
};
</script>

<style scoped>
input::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-family: "Inter", sans-serif;
}

.focused {
    outline: 1px solid #5898FF;
}

.border-red-500 {
    border-color: #ef4444;
}
</style>