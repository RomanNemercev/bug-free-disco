<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: String,
      default: null,
    },
  })

  const emit = defineEmits(['update:modelValue'])
  const rawValue = ref('')
  const isFocused = ref(false)
  const error = ref('')
  const formattedValue = ref('')

  const handleInput = event => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 11)
    rawValue.value = digits
    formattedValue.value = formatPhone(digits)
    emit('update:modelValue', `+${digits}`)
  }

  const formatPhone = digits => {
    let mask = '+7'
    if (digits.length > 1) mask += ` (${digits.slice(1, 4)}`
    if (digits.length >= 5) mask += `) ${digits.slice(4, 7)}`
    if (digits.length >= 8) mask += `-${digits.slice(7, 9)}`
    if (digits.length >= 10) mask += `-${digits.slice(9, 11)}`
    return mask
  }

  const validatePhone = () => {
    isFocused.value = false
    error.value =
      !rawValue.value || rawValue.value.length < 11
        ? 'Введите полный номер телефона'
        : ''
  }

  watch(
    () => props.modelValue,
    newValue => {
      if (newValue) {
        const digits = event.target.value.replace(/\D/g, '').slice(0, 11)
        rawValue.value = digits
        formattedValue.value = formatPhone(digits)
      }
    },
    { immediate: true }
  )
</script>

<template>
  <div class="w-full relative">
    <input
      v-model="formattedValue"
      placeholder="..."
      @input="handleInput"
      @blur="validatePhone"
      @focus="isFocused = true"
    />
    <span v-if="error" class="text-red-500 text-xs absolute top-[45px] left-0">
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
  ::placeholder {
    color: #79869a;
    font-size: 14px;
    font-weight: 400;
  }

  input {
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
