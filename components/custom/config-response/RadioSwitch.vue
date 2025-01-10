<template>
    <div class="radio-group">
        <label v-for="(option, index) in options" :key="index" :class="{ active: isMandatory === option.value }">
            <input type="radio" :value="option.value" v-model="isMandatory" class="hidden-radio" />
            {{ option.label }}
        </label>
    </div>
</template>

<script>
export default {
    props: {
        value: Boolean, // Выбранное значение
        options: {
            type: Array,
            required: true,
            default: () => [
                { label: "Обязательно", value: true },
                { label: "Необязательно", value: false },
            ],
        },
    },
    computed: {
        isMandatory: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit("update:value", newValue);
            },
        },
    },
};
</script>

<style scoped>
.radio-group {
    display: flex;
    gap: 1rem;
}

.radio-group label {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 20px;
    background-color: #f5f5f5;
    color: #666;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.radio-group label.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}

.hidden-radio {
    display: none;
}
</style>