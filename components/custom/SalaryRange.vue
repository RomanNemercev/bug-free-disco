<template>
  <div class="w-full flex gap-x-2.5">
    <!-- Поле "От" -->
    <input
      type="text"
      :value="props.from"
      @input="handleInput('from', $event.target.value)"
      @blur="handleBlurAndValidate('from')"
      class="bg-athens-gray border border-athens rounded-ten min-h-10 max-w-400px w-full pl-15px"
      placeholder="От"
      @focus="handleFocus('from')"
      :class="{ focused: isFocused.from }"
    />

    <!-- Поле "До" -->
    <input
      type="text"
      :value="props.to"
      @input="handleInput('to', $event.target.value)"
      @blur="handleBlurAndValidate('to')"
      class="bg-athens-gray border border-athens rounded-ten min-h-10 max-w-400px w-full pl-15px"
      placeholder="До"
      @focus="handleFocus('to')"
      :class="{ focused: isFocused.to }"
    />
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  // const props = defineProps({
  //   modelValue: {
  //     type: Object | Number,
  //     default: () => ({ from: null, to: null }),
  //   },
  // })
  const props = defineProps({
    from: {
      type: Number,
      default: null,
    },
    to: {
      type: Number,
      default: null,
    }
  })

  const emit = defineEmits(['update:modelValue'])
  const localFrom = ref(props.from || '')
  const localTo = ref(props.to || '')
  // const localFrom = ref(props.modelValue.from || '')
  // const localTo = ref(props.modelValue.to || '')

  const isFocused = ref({ from: false, to: false })

  const handleInput = (field, value) => {
    const sanitizedValue = value.replace(/\D/g, '')

    if (field === 'from') {
      localFrom.value = sanitizedValue
    } else if (field === 'to') {
      localTo.value = sanitizedValue
    }

    emit('update:modelValue', localFrom.value, localTo.value )
  }

  const validateRange = () => {
    const fromValue = parseInt(localFrom.value, 10)
    const toValue = parseInt(localTo.value, 10)

    if (fromValue && toValue && fromValue > toValue) {
      localFrom.value = toValue.toString()
    }

    emit('update:modelValue', { from: localFrom.value, to: localTo.value })
  }

  const handleBlurAndValidate = field => {
    isFocused.value[field] = false
    validateRange()
  }

  const handleFocus = field => {
    isFocused.value[field] = true
  }

  // Следим за обновлением modelValue из родителя
  watch(
    () => props.from,
    newValue => {
      localFrom.value = newValue.from || ''
      localTo.value = newValue.to || ''
    },
    { deep: true }
  )
</script>

<style scoped>
  input::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
  }

  .focused {
    outline: 1px solid #5898ff;
  }
</style>
