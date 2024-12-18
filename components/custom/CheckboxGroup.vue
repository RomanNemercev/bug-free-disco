<template>
    <label v-for="option in options" :key="option.id" class="flex items-center cursor-pointer check-wrapper">
        <input type="checkbox" :id="option.id" :value="option.value" v-model="selectedOptions" class="hidden" />
        <div class="mr-2.5 w-5 h-5 flex items-center justify-center border rounded-md check-item" :class="{
            'bg-dodger border-dodger': selectedOptions.includes(option.value),
            'border-athens bg-athens-gray': !selectedOptions.includes(option.value)
        }">
            <svg v-if="selectedOptions.includes(option.value)" xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M16.704 5.293a1 1 0 00-1.408 0L7.5 12.086 4.704 9.293a1 1 0 00-1.408 1.414l3.5 3.5a1 1 0 001.408 0l8-8a1 1 0 000-1.414z"
                  clip-rule="evenodd" />
            </svg>
        </div>
        <span class="text-sm text-space">{{ option.label }}</span>
    </label>
</template>

<script>
export default {
    name: "CheckboxGroup",
    props: {
        options: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        selectedOptions: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            },
        },
    },
};
</script>

<style scoped>
.check-wrapper:hover .check-item {
    border: 1px solid #5898FF;
}
</style>