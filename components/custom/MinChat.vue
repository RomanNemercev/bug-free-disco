<!-- components/custom/MinChat.vue -->
<script setup>
  import { ref, nextTick } from 'vue'

  // Сообщение и файлы
  const messageContent = ref(
    'Мы ищем талантливого и амбициозного Менеджера по работе с ключевыми клиентами, который сможет внести свой вклад в развитие нашего бизнеса и достижение успеха. Если вы готовы к новым вызовам и стремитесь к профессиональному росту, эта вакансия для вас. Мы ищем талантливого и амбициозного Менеджера по работе с ключевыми клиентами, который сможет внести свой вклад в развитие нашего бизнеса и достижение успеха. Если вы готовы к новым вызовам и стремитесь к профессиональному росту, эта вакансия для васМы ищем талантливого и амбициозного Менеджера по работе с ключевыми клиентами, который сможет внести свой вклад в развитие нашего бизнеса и достижение успеха. Если вы готовы к новым вызовам и стремитесь к профессиональному росту, эта вакансия для васМы ищем талантливого и амбициозного Менеджера по работе с ключевыми клиентами, который сможет внести свой вклад в развитие нашего бизнеса и достижение успеха. Если вы готовы к новым вызовам и стремитесь к профессиональному росту, эта вакансия для вас'
  )
  const attachedFiles = ref([
    { name: 'Frame 4962938.png', format: 'png' },
    { name: 'Frame 1233.png', format: 'png' },
  ])
  const textareaRef = ref(null)

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
  const messages = ref([]) // Временное состояние для прототипа
  const sendMessage = () => {
    if (!messageContent.value.trim()) return

    messages.value.push({
      id: messages.value.length + 1,
      type: 'standard',
      author: 'Вы', // Текущий пользователь
      content: messageContent.value,
      dateTime: new Date().toISOString(),
    })

    // Сбрасываем форму
    messageContent.value = ''
    attachedFiles.value = []
    autoResize()
  }

  // Для прототипа: передаём messages в MinTimeline через provide/inject
  import { provide } from 'vue'
  provide('messages', messages)

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
    <div class="flex items-end relative p-15px bg-white">
      <!-- Кнопка прикрепить -->
      <label
        class="attach-btn flex items-center justify-center w-10 h-10 rounded cursor-pointer"
        :class="{
          'bg-gray-300': attachedFiles.length,
          'bg-gray-100': !attachedFiles.length,
        }"
      >
        <span>{{ attachedFiles.length ? attachedFiles.length : '📎' }}</span>
        <input type="file" multiple class="hidden" @change="handleFileAttach" />
      </label>

      <!-- Поле ввода -->
      <textarea
        ref="textareaRef"
        v-model="messageContent"
        rows="1"
        class="flex-1 p-2 border rounded resize-none min-h-[40px] max-h-[180px]"
        placeholder="Введите сообщение..."
        @input="autoResize"
      ></textarea>

      <!-- Кнопка отправить -->
      <button
        @click="sendMessage"
        class="send-btn bg-blue-500 text-white px-4 py-2 rounded"
      >
        Отправить
      </button>
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
  }
  .attach-btn {
    transition: background-color 0.3s;
  }
</style>
