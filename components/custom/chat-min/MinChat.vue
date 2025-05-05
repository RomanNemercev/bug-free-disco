<!-- components/custom/MinChat.vue -->
<script setup>
  import { ref, nextTick, watch, computed } from 'vue'

  const props = defineProps({
    messages: { type: Array, required: true },
  })

  const emit = defineEmits(['add-message'])

  // Сообщение и файлы
  const messageContent = ref('')
  const textareaRef = ref(null)
  const attachedFiles = ref([])

  const buttonClass = computed(() =>
    messageContent.value.trim().length > 0 ? 'bg-dodger' : ''
  )

  // Добавление файлов
  const handleFileAttach = event => {
    const files = event.target.files
    for (let file of files) {
      attachedFiles.value.push({
        name: file.name,
        format: file.name.split('.').pop(),
      })
    }
  }

  // Удаление файла
  const removeFile = index => {
    attachedFiles.value.splice(index, 1)
  }

  // Отправка сообщения (для прототипа добавляем в timeline)
  const sendMessage = () => {
    if (!messageContent.value.trim()) return

    const newMessage = {
      id: props.messages.length + 1,
      type: 'standard',
      author: 'Вы',
      content: messageContent.value,
      dateTime: new Date().toISOString(),
    }

    emit('add-message', newMessage) // Отправляем событие родителю

    // Сбрасываем форму
    messageContent.value = ''
    attachedFiles.value = []
    autoResize()
  }

  const autoResize = () => {
    nextTick(() => {
      const textarea = textareaRef.value
      if (!textarea) return

      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`

      //   if content empty than remove scroll
      if (!messageContent.value || textarea.scrollHeight <= 40) {
        textarea.style.overflowY = 'hidden'
        textarea.style.height = '40px'
      } else {
        textarea.style.overflow = 'auto'
      }
    })
  }
</script>

<template>
  <div>
    <!-- Список прикреплённых файлов -->
    <div v-if="attachedFiles.length" class="file-list flex">
      <div
        v-for="(file, index) in attachedFiles"
        :key="index"
        class="text-sm font-medium flex items-center text-dodger"
      >
        <span>{{ file.name }}</span>
        <button @click="removeFile(index)" class="ml-5px">
          <svg-icon name="cross15" width="15" height="15" />
        </button>
      </div>
    </div>

    <!-- Область ввода -->
    <div class="flex items-end relative py-15px px-25px bg-white gap-x-15px">
      <!-- Кнопка прикрепить -->
      <label
        class="attach-btn flex items-center justify-center w-10 h-10 rounded-full cursor-pointer relative hover:text-white hover:bg-space"
        :class="{
          'bg-space text-white': attachedFiles.length,
          'bg-athens-gray text-slate-custom': !attachedFiles.length,
        }"
      >
        <span
          class="absolute right-[-1px] top-[-9px] w-5 h-5 bg-dodger rounded-full flex items-center justify-center"
          v-if="attachedFiles.length"
        >
          <span class="text-xs text-white font-bold">
            {{ attachedFiles.length }}
          </span>
        </span>
        <span><svg-icon name="clip20" width="20" height="20" /></span>
        <input type="file" multiple class="hidden" @change="handleFileAttach" />
      </label>

      <!-- Поле ввода -->
      <textarea
        ref="textareaRef"
        v-model="messageContent"
        rows="1"
        class="flex-1 py-2.5 rounded resize-none min-h-[40px] max-h-[180px] leading-normal px-0 focus:outline-none"
        placeholder="Введите ваше сообщение"
        @input="autoResize"
      ></textarea>

      <!-- Кнопка отправить -->
      <UiButton
        @click="sendMessage"
        variant="gray"
        size="gray"
        :class="buttonClass"
      >
        Отправить
      </UiButton>
    </div>
  </div>
</template>

<style scoped>
  .file-list {
    flex-wrap: wrap;
    padding: 10px 15px;
    column-gap: 15px;
    row-gap: 10px;
    background-color: #e8f1ff;
  }
  textarea {
    width: 100%;
    box-sizing: border-box;
    overflow-y: hidden;
    font-size: 13px;
    font-weight: 400;
    color: #2f353d;
  }
  .attach-btn {
    transition: background-color 0.3s;
  }

  ::placeholder {
    font-size: 14px;
    font-weight: 400;
    color: #79869a;
  }
</style>
