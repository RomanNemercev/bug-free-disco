<template>
  <div ref="container" class="relative">
    <div v-if="showInput">
      <ResponseInput
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        class="mb-0 w-full max-w-input"
        :responses="responses"
      />
    </div>
    <div v-else>
      <div
        v-if="modelValue"
        class="text-sm font-medium text-dodger p-2.5 pl-0"
        @click="openInput"
      >
        {{ modelValue }}
      </div>
      <button
        v-else
        ref="addButton"
        @click="openInput"
        class="text-sm font-medium text-dodger p-2.5 pl-0"
      >
        Добавить
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import ResponseInput from '~/components/custom/ResponseInput.vue'

  const props = defineProps({
    modelValue: String,
    showInput: Boolean,
    responses: Array,
  })

  const emit = defineEmits(['update:modelValue', 'update:showInput'])

  const container = ref(null)
  const addButton = ref(null)

  //   watching modelValue
  watch(
    () => props.modelValue,
    newValue => {
      if (newValue) {
        emit('update:showInput', false)
      }
    }
  )

  function openInput(event) {
    event.stopPropagation() // Останавливаем всплытие события
    console.log('openInput called')
    emit('update:showInput', true)
    // Опционально: сбрасываем modelValue, чтобы начать выбор заново
    // emit('update:modelValue', '');
  }

  function handleClickOutside(event) {
    if (container.value && !container.value.contains(event.target)) {
      console.log('handleClickOutside called')
      emit('update:showInput', false)
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>
