<!-- components/custom/MinTimeline.vue -->
<script setup>
  import { ref } from 'vue'

  // Начальные данные (позже можно заменить на API)
  const messages = ref([
    {
      id: 1,
      type: 'standard',
      author: 'Василисов Василий Сергеевич',
      content: 'Пожалуйста, кто-то, закройте окно в коридоре, уже ДУЕТ!',
      dateTime: '2024-09-11T18:03:00',
    },
    {
      id: 2,
      type: 'with-recipient',
      author: 'Алексеев Алексей Алексеевич',
      recipients: ['Василисов Василий Сергеевич'],
      content: 'Коллега уважаемый, попробуй сделать это самостоятельно!',
      dateTime: '2024-09-11T18:03:00',
    },
    {
      id: 3,
      type: 'with-file',
      author: 'Георгиева Настасья Самбурская',
      recipients: [
        'Василисов Василий Сергеевич',
        'Алексеев Алексей Алексеевич',
      ],
      content:
        'Коллеги! Отчет готов! Прошу ознакомиться и дать обратную связь ближайшее время',
      file: { name: 'Какой-то отчет.pdf', format: 'pdf' },
      dateTime: '2024-09-11T18:03:00',
    },
    {
      id: 4,
      type: 'standard',
      author: 'Денисов Василис Алексеевич',
      content: 'Благодарность за отчет!',
      dateTime: '2024-09-11T18:03:00',
    },
    {
      id: 5,
      type: 'standard',
      author: 'Василисов Василий Сергеевич',
      content: 'Пожалуйста, кто-то, откройте окно в коридоре, уже не ДУЕТ!',
      dateTime: '2024-09-11T18:03:00',
    },
  ])

  // Форматирование даты и времени
  import dayjs from 'dayjs'
  const formatDateTime = dateTime => {
    return dayjs(dateTime).format('DD.MM.YYYY / HH:mm')
  }
</script>

<template>
  <div class="[&>*:not(:last-of-type)]:mb-2.5">
    <div v-for="message in messages" :key="message.id">
      <!-- Стандартное сообщение -->
      <div v-if="message.type === 'standard'" class="message-standard">
        <div>
          <p class="text-sm font-medium">{{ message.author }}</p>
          <p class="text-13px font-normal">{{ message.content }}</p>
        </div>
        <p class="text-slate-custom font-normal text-sm ml-auto shrink-0">
          {{ formatDateTime(message.dateTime) }}
        </p>
      </div>

      <!-- Сообщение с адресатом -->
      <div
        v-if="message.type === 'with-recipient'"
        class="message-with-recipient"
      >
        <div>
          <p class="text-sm font-medium">
            {{ message.author }}
          </p>
          <p class="text-sm font-medium text-space">
            <span class="text-dodger">
              {{ message.recipients.join(', ') }},
            </span>
            {{ message.content }}
          </p>
        </div>
        <p class="text-gray-500 text-sm ml-auto shrink-0">
          {{ formatDateTime(message.dateTime) }}
        </p>
      </div>

      <!-- Сообщение с файлом -->
      <div v-if="message.type === 'with-file'" class="message-with-file">
        <div>
          <p class="text-sm font-medium">
            {{ message.author }}
          </p>
          <p class="text-sm font-medium text-space mb-15px">
            <span class="text-dodger">
              {{ message.recipients.join(', ') }},
            </span>
            {{ message.content }}
          </p>
          <a
            :href="`#${message.file.name}`"
            class="text-dodger text-sm font-medium"
          >
            {{ message.file.name }}
          </a>
        </div>
        <p class="text-gray-500 text-sm ml-auto shrink-0">
          {{ formatDateTime(message.dateTime) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .message-standard,
  .message-with-recipient,
  .message-with-file {
    display: flex;
    column-gap: 15px;
    background-color: #ffffff;
    border-radius: 15px;
    padding: 15px 25px;
  }
</style>
