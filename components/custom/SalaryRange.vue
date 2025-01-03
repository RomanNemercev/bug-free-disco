<template>
    <div class="w-full flex gap-x-2.5">
        <!-- Поле "От" -->
        <input type="text" v-model="from" @input="handleInput('from', $event.target.value)"
          @blur="handleBlurAndValidate('from')"
          class="bg-athens-gray border border-athens rounded-ten min-h-10 max-w-400px w-full pl-15px" placeholder="От"
          @focus="handleFocus('from')" :class="{ 'focused': isFocused.from }" />
        <!-- Поле "До" -->
        <input type="text" v-model="to" @input="handleInput('to', $event.target.value)"
          @blur="handleBlurAndValidate('to')"
          class="bg-athens-gray border border-athens rounded-ten min-h-10 max-w-400px w-full pl-15px" placeholder="До"
          @focus="handleFocus('to')" :class="{ 'focused': isFocused.to }" />
    </div>
</template>

<script>
export default {
    name: "SalaryRange",
    data() {
        return {
            from: "", // Значение поля "От"
            to: "", // Значение поля "До"
            isFocused: { from: false, to: false },
        };
    },
    methods: {
        handleInput(field, value) {
            // Оставляем только цифры
            const sanitizedValue = value.replace(/\D/g, "");

            if (field === "from") {
                this.from = sanitizedValue;
            } else if (field === "to") {
                this.to = sanitizedValue;
            }
        },
        validateRange() {
            // Преобразуем значения в числа для проверки
            const fromValue = parseInt(this.from, 10);
            const toValue = parseInt(this.to, 10);

            if (fromValue && toValue) {
                // Проверяем, чтобы "from" <= "to"
                if (fromValue > toValue) {
                    this.from = toValue.toString();
                }
                // Проверяем, чтобы "to" >= "from"
                if (toValue < fromValue) {
                    this.to = fromValue.toString();
                }
            }
        },
        handleBlurAndValidate(field) {
            // Сбрасываем фокус и выполняем валидацию
            this.isFocused[field] = false;
            this.validateRange();
        },
        handleFocus(field) {
            this.isFocused[field] = true;
        },
    },
};
</script>

<style scoped>
input::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
}

.focused {
    outline: 1px solid #5898FF;
}
</style>