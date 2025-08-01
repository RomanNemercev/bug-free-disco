<script setup>
import { ref } from 'vue'

const isFocused = ref(false)
const inputRef = ref(null)

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Введите значение',
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    default: null, // value on default
  },
  search: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'blur'])
const localValue = ref(props.modelValue) // local state for control value

// watch for value change
// watch(
//   () => props.modelValue,
//   newValue => {
//     localValue.value = newValue
//   }
// )

// update value on enter at input
const updateValue = event => {
  localValue.value = event.target.value
  emit('update:modelValue', localValue.value)
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
  console.log('Blur triggered')
}

defineExpose({ focus: () => inputRef.value && inputRef.value.focus() })
</script>

<template>
  <div class="w-full">
    <input :type="type" ref="inputRef"
      class="text-sm font-normal bg-athens-gray border border-athens rounded-ten min-h-10 w-full pl-15px"
      :placeholder="isFocused ? '' : placeholder" 
      :value="props.modelValue" 
      @input="updateValue"
      @focus="isFocused = true" 
      :class="[{ focused: isFocused }, { search: search }, props.class]" 
      @blur="handleBlur"
      :readonly="props.readonly" />
  </div>
</template>

<style scoped>
input::placeholder {
  color: #79869a;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
}

.search {
  background-image: url('../../assets/sprite/svg/search.svg');
  background-repeat: no-repeat;
  background-position: 15px center;
  padding-left: 42px;
}

.focused {
  border: 1px solid #5898ff;
  outline: none;
  padding-left: 15px;
  background-image: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
