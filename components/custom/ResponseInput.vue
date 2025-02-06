<script setup>
import { ref } from "vue";
import debounce from 'lodash/debounce';

const currentResponse = ref('');
const filteredResponses = ref([]);
const isFocused = ref(false);

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Ответственный',
    },
    showRoles: {
        type: Boolean,
        default: false,
    },
    responses: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

// Дебаунс-функция для фильтрации списка
const filterResponses = debounce(() => {
    const input = currentResponse.value.toLowerCase();
    filteredResponses.value = props.responses.filter(response => {
        const name = response.name.toLowerCase();
        const role = response.role ? response.role.toLowerCase() : '';
        return name.includes(input) || (props.showRoles && role.includes(input));
    });
}, 300);

const clearResponse = () => {
    currentResponse.value = '';
    filteredResponses.value = [];
    emit('update:modelValue', '');
};

const selectResponse = (response) => {
    currentResponse.value = response.name; // Записываем только имя в поле ввода
    filteredResponses.value = [];
    isFocused.value = false;
    emit('update:modelValue', response.name);
};
</script>

<template>
    <div class="response-input-wrapper">
        <div class="relative">
            <div class="response-input-container relative w-full">
                <input type="text" v-model="currentResponse" @input="filterResponses" @focus="isFocused = true"
                  @blur="isFocused = false" :placeholder="isFocused ? '' : placeholder"
                  class="response-input w-full py-[9px] pl-[42px] pr-[42px] text-ellipsis border border-athens rounded-ten bg-athens-gray text-sm font-normal focus:outline-none focus:border focus:border-dodger" />
                <button class="clear-response absolute top-2/4 right-4 text-slate-custom" v-if="currentResponse"
                  @click="clearResponse">
                    ✖
                </button>
            </div>

            <transition name="slide-fade">
                <ul v-if="filteredResponses.length && currentResponse"
                  class="responses-list absolute w-full bg-white border border-athens rounded-plus shadow-shadow-droplist top-12 z-10">
                    <li v-for="(response, index) in filteredResponses" :key="index"
                      class="response text-slate-custom text-sm font-normal py-10px px-15px hover:text-space hover:bg-zumthor cursor-pointer"
                      @mousedown="selectResponse(response)" :class="{ 'flex flex-col gap-y-2': showRoles }">
                        <span :class="{ 'text-space': showRoles }">{{ response.name }}</span>
                        <span v-if="props.showRoles && response.role" class="text-13px text-slate-custom font-normal">
                            {{ response.role }}
                        </span>
                    </li>
                </ul>

                <div v-else-if="currentResponse && isFocused"
                  class="no-reponse absolute w-full bg-white border border-athens rounded-plus shadow-shadow-droplist top-12 z-10">
                    <div class="text-slate-custom text-sm font-normal py-10px px-15px">
                        Ответственный не найден
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.response-input {
    background-image: url('../../assets/sprite/svg/search.svg');
    background-repeat: no-repeat;
    background-position: 15px center;
}


.response-input::placeholder {
    color: #9098b4;
    font-size: 14px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
}

.clear-response {
    transform: translateY(-50%);
    cursor: pointer;
}

.response:not(:last-child) {
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