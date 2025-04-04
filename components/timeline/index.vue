<template>
  <div class="bg-athens-gray p-25px pt-70px">
    <template v-for="(group, index) in timelineGroups" :key="index">
      <ChatDivider :text="group.date" />
      <template v-for="event in group.events" :key="event.id">
        <!-- Системные события -->
        <p
          v-if="event.type === 'system'"
          class="text-13px font-normal text-slate-custom px-20 pb-0.5"
        >
          <span>{{ event.time }}</span>
          {{ event.content }}
        </p>

        <!-- Пропущенные звонки -->
        <TimelineCall v-else-if="event.type === 'call'" :calls="event.calls" />

        <!-- Заметки -->
        <TimelineNote v-else-if="event.type === 'note'" :note="event" />

        <!-- TODO: Добавить остальные типы событий -->
      </template>
    </template>
  </div>
</template>

<script setup>
  import ChatDivider from '@/components/custom/ChatDivider.vue'
  import TimelineCall from './items/TimelineCall.vue'
  import TimelineNote from './items/TimelineNote.vue'

  defineProps({
    timelineGroups: {
      type: Array,
      required: true,
      default: () => [],
    },
  })
</script>
