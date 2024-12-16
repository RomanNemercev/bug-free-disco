<script setup>
const isFocused = ref(false)

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Введите значение'
    }
})
</script>

<template>
    <div class="w-full max-w-400px">
        <input class="bg-athens-gray border border-athens rounded-ten min-h-10 max-w-400px w-full pl-15px"
          :placeholder="isFocused ? '' : placeholder" @focus="isFocused = true" :class="{ 'focused': isFocused }"
          @blur="isFocused = false" />
    </div>
</template>

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