<template>
    <div class="grid grid-cols-2 gap-4 p-4 border rounded-md">
        <div><strong>Дата:</strong></div>
        <div>{{ event.date }}</div>

        <div><strong>Время:</strong></div>
        <div>{{ event.time }}</div>

        <div><strong>Участники:</strong></div>
        <div>
            <span v-for="participant in event.participants" :key="participant" class="mr-2">
                {{ participant }}
            </span>
        </div>

        <div><strong>Мероприятие:</strong></div>
        <div>{{ event.eventName }}</div>

        <div><strong>Описание:</strong></div>
        <div>{{ event.description }}</div>

        <div><strong>Организатор:</strong></div>
        <div>{{ event.organizer }}</div>
    </div>
</template>

<script lang="ts" setup>
interface EventData {
    date: string
    time: string
    participants: string[]
    eventName: string
    description: string
    organizer: string
}

defineProps<{ event: EventData }>()
</script>

<style scoped>
/* Подключи grid-стили, если используешь Tailwind */
</style>