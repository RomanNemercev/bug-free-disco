<template>
  <div class="relative">
    <button
      ref="trigger"
      class="text-sm text-dodger font-medium hover:underline"
      @click="isOpen = !isOpen"
    >
      {{ formatLabels[props.modelValue as keyof typeof formatLabels] }}
    </button>

    <Transition name="slide-up">
      <div
        v-if="isOpen"
        class="absolute bottom-full left-0 mb-1 w-[200px] bg-white rounded-fifteen shadow-md py-2"
        @click.stop
      >
        <button
          v-for="(label, format) in formatLabels"
          :key="format"
          class="w-full text-left px-4 py-2 text-sm hover:bg-athens-gray transition-colors"
          :class="{
            'text-dodger': modelValue === format,
            'text-space': modelValue !== format,
          }"
          @click="selectFormat(format)"
        >
          {{ label }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  const props = defineProps<{
    modelValue: string
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: string]
    select: [format: string]
  }>()

  const isOpen = ref(false)
  const trigger = ref<HTMLElement | null>(null)

  const formatLabels = {
    note: 'Заметка',
    comment: 'Комментарий',
    task: 'Задача',
    email: 'Email',
    sms: 'СМС',
    chat: 'Чат',
  }

  const selectFormat = (format: string) => {
    emit('update:modelValue', format)
    emit('select', format)
    isOpen.value = false
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (trigger.value && !trigger.value.contains(event.target as Node)) {
      isOpen.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<style scoped>
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.3s ease-out;
  }

  .slide-up-enter-from,
  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
</style>
