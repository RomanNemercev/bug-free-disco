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
        value: {
            type: [Boolean, String, Number],
            required: true
        },
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
    padding: 5px 10px;
    background-color: transparent;
    color: #79869a;
    font-size: 13px;
    font-weight: 500;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.radio-group label.active {
    background-color: #5898ff;
    color: #ffffff;
}

.hidden-radio {
    display: none;
}
</style>