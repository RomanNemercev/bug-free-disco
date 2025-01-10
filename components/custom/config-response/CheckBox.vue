<template>
    <div class="checkbox" :class="{ checked: isChecked }" @click="toggleChecked">
        {{ isChecked ? "Включено" : "Выключено" }}
    </div>
</template>

<script>
export default {
    props: {
        value: Boolean,
    },
    computed: {
        isChecked: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit("update:value", newValue)
            },
        },
    },
    methods: {
        toggleChecked() {
            this.isChecked = !this.isChecked;
        },
    },
};
</script>

<style scoped>
.checkbox {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    background: #f0f0f0;
    color: #666;
    transition: all 0.3s;
}

.checkbox.checked {
    background: #007bff;
    color: #fff;
}
</style>