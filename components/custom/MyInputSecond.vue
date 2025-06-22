<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  placeholder: {
    type: String,
    default: '...',
  },
  placeholderFontSize: {
    type: String,
    default: '14px',
  }
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
  <div class="w-full">
    <input :type="type" :value="localValue" @input="updateValue" :placeholder="placeholder"
      :style="`--placeholder-font-size: ${props.placeholderFontSize}`" />
  </div>
</template>

<style scoped>
::placeholder {
  color: #79869a;
  font-size: var(--placeholder-font-size, 14px);
  font-weight: 400;
}

input {
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  color: #2f353d;
  transition: background-color 0.3s ease;
  border-radius: 10px;
  line-height: normal;
  padding: 11.5px 15px;
}

input:hover {
  background-color: #f9fafc;
}

input:focus {
  outline: 1px solid #5898ff;
  background-color: #f9fafc;
}
</style>
