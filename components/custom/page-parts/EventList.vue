<template>
    <div
      class="events-wrapper grid grid-cols-2 gap-2.5 p-25px rounded-ten border border-athens bg-catskill transition-colors"
      ref="eventCard" @mouseover="isHovered = true" @mouseleave="isHovered = false"
      :class="{ 'bg-zumthor': isHovered }">
        <div class="text-slate-custom text-sm font-normal">Дата:</div>
        <div class="text-space text-sm font-normal">{{ event.date }}</div>

        <div class="text-slate-custom text-sm font-normal">Время:</div>
        <div class="text-space text-sm font-normal">{{ event.time }}</div>

        <div class="text-slate-custom text-sm font-normal">Участники:</div>
        <div class="text-dodger text-sm font-medium leading-150">
            <span v-for="(participant, index) in event.participants" :key="participant">
                {{ participant }}<span v-if="index !== event.participants.length - 1">, </span>
            </span>
        </div>

        <div class="text-slate-custom text-sm font-normal">Мероприятие:</div>
        <div class="text-space text-sm font-normal">{{ event.eventName }}</div>

        <div class="text-slate-custom text-sm font-normal">Описание:</div>
        <div class="text-space text-sm font-normal">{{ event.description }}</div>

        <div class="text-slate-custom text-sm font-normal">Организатор:</div>
        <div class="text-dodger text-sm font-medium">{{ event.organizer }}</div>
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

const isHovered = ref(false);
</script>

<style scoped>
.events-wrapper {
    grid-template-columns: 19% 81%;
    row-gap: 11px;
}
</style>