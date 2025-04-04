<template>
  <div class="flex items-center gap-x-2.5">
    <!-- label -->
    <label :for="inputId" class="text-space font-normal text-sm min-w-[235px]">
      {{ label }}
    </label>

    <!-- hidden file input -->
    <input
      :id="inputId"
      type="file"
      class="hidden"
      @change="handleFileChange"
      ref="fileInput"
    />

    <!-- placeholder or file name -->
    <button
      type="button"
      @click="triggerFileInput"
      ref="buttonRef"
      class="transition-colors py-2.5 px-15px min-h-10 min-w-[221px] rounded-ten text-left hover:bg-catskill focus:outline-dodger focus:outline-1 focus:outline focus:bg-catskill focus:outline-offset-0"
    >
      <span v-if="!fileName" class="text-sm text-slate-custom font-normal flex">
        ...
      </span>
      <span v-else class="text-dodger text-sm font-normal">
        {{ fileName }}
      </span>
    </button>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue'

  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    inputId: {
      type: String,
      required: true,
    },
  })

  const emit = defineEmits(['update:file'])
  const fileInput = ref(null)
  const fileName = ref('')
  const buttonRef = ref(null)

  const triggerFileInput = () => {
    fileInput.value.click()
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      fileName.value = file.name
      emit('update:file', file)
    } else {
      fileName.value = ''
      emit('update:file', null)
    }
  }

  // Управляем классом через JS
  watch(fileName, newValue => {
    if (newValue) {
      buttonRef.value.classList.add('file-selected')
    } else {
      buttonRef.value.classList.remove('file-selected')
    }
  })

  // Устанавливаем начальное состояние при монтировании
  onMounted(() => {
    if (fileName.value) {
      buttonRef.value.classList.add('file-selected')
    }
  })
</script>

<style scoped>
  /* Отключаем стили фокуса, когда файл выбран */
  button.file-selected {
    background-color: transparent;
    outline: none !important;
  }

  button.file-selected:focus {
    outline: none !important;
    background-color: transparent !important;
  }
</style>
