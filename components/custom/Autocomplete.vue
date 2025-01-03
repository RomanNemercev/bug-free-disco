<template>
    <div class="w-full relative max-w-400px" ref="wrapperRef">
        <input type="text" ref="inputRef" v-model="search"
          class="bg-athens-gray border border-athens rounded-ten min-h-10 max-w-400px pl-15px w-full"
          :placeholder="isFocused ? '' : placeholder" :class="{ 'focused': isFocused, 'has-value': search }"
          @focus="isFocused = true; isOpen = true" @blur="isFocused = false" @keydown.esc="closeList"
          @keydown.enter="submitCustomValue">
        <ul v-show="searchResults.length && isOpen"
          class="absolute left-0 right-0 max-h-52 overflow-y-auto bg-white z-10 shadow-shadow-droplist rounded-plus">
            <li v-for="(result, index) in searchResults" :key="result.name" @click="setSelected(result.name)"
              :class="[index < searchResults.length - 1 ? 'border-b border-athens' : '']"
              class="text-slate-custom hover:text-space cursor-pointer hover:bg-gallery py-1.5 pl-15px">
                {{ result.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    source: {
        type: Array,
        required: true,
        default: () => []
    },
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Введите значение'
    }
})

const emit = defineEmits(['update:modelValue'])

const search = ref('')
const isFocused = ref(false)
const isOpen = ref(false)
const inputRef = ref(null)
const wrapperRef = ref(null)

const searchResults = computed(() => {
    if (search.value === '') {
        return []
    }

    return props.source.filter(item => {
        if (item.name.toLowerCase().includes(search.value.toLowerCase())) {
            return item
        }
    })
})


const setSelected = item => {
    isOpen.value = false
    search.value = item
    emit('update:modelValue', item);
    isFocused.value = false;
}

const closeList = () => {
    isOpen.value = false;
    isFocused.value = false;
}

const submitCustomValue = () => {
    emit('update:modelValue', search.value);
    isOpen.value = false;
    isFocused.value = false;
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
    if (wrapperRef.value && !wrapperRef.value.contains(event.target)) {
        closeList();
    }
}

</script>

<style scoped>
input::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
    max-width: 95%;
}

input:placeholder-shown {
    text-overflow: ellipsis;
}

input:focus-within {
    outline: none;
}

input.focused {
    padding-left: 43px;
    background-image: url('../../assets/sprite/svg/search.svg');
    background-repeat: no-repeat;
    background-position: 15px center;
    background-size: 20px 20px;
    border: 1px solid #5898FF;
}

/* input.has-value {
    padding-left: 15px;
} */

ul {
    top: calc(100% + 15px);
    scrollbar-width: none;
}
</style>