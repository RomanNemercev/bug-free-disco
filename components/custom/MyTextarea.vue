<script setup>
import { ref, watch } from 'vue'

const isFocused = ref(false)

const props = defineProps({
  modelValue: {
    type: [String, null],
    default: null,
  },
  placeholder: {
    type: String,
    default: 'Введите значение',
  },
  maxHeight: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])
const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  newValue => {
    localValue.value = newValue
  }
)

const updateValue = event => {
  localValue.value = event.target.value
  emit('update:modelValue', localValue.value)
}
</script>

<template>
  <div class="flex">
    <textarea rows="5"
      class="bg-athens-gray text-sm w-full p-15px border border-athens-gray rounded-ten focus:border-dodger focus:outline-none resize-none"
      @focus="isFocused = true" :placeholder="isFocused ? '' : placeholder" @blur="isFocused = false"
      :value="localValue" @input="updateValue"
      :style="{ maxHeight: maxHeight ? maxHeight + 'px' : undefined }"></textarea>
  </div>
</template>

<style scoped>
::placeholder {
  font-size: 14px;
  font-weight: 400;
  color: #79869a;
}

textarea::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
  border-bottom-right-radius: 10px;
}

textarea::-webkit-scrollbar-thumb {
  background-color: #79869a;
  /* Your preferred color */
  border-radius: 5px;
  cursor: pointer;
}

textarea::-webkit-scrollbar-track {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
