<template>
    <div class="container pt-25px">
        <p class="text-25px font-bold text-space leading-normal mb-26px">Здравствуйте, Денис Максимов!</p>
        <div class="flex justify-between gap-x-25px">
            <div
              class="max-w-[275px] w-full bg-white rounded-fifteen flex justify-start flex-col items-center p-25px h-fit">
                <UiAvatar size="user" class=mb-26px>
                    <UiAvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                    <UiAvatarFallback>ДМ</UiAvatarFallback>
                </UiAvatar>
                <p class="text-lg font-medium text-space leading-normal mb-2.5">Денис Максимов</p>
                <p class="text-13px font-normal text-slate-custom">denmaksimov@gmail.com</p>
            </div>
            <div v-if="currentLevel === 'beginner'" class="w-full bg-white rounded-fifteen p-25px">
                <p class="text-xl text-space font-semibold leading-normal mb-9">С чего начать?</p>
                <div class="flex gap-x-2.5">
                    <div
                      class="bg-zumthor rounded-fifteen flex flex-col items-center justify-center py-35px px-25px border border-athens">
                        <p class="text-15px text-space font-medium mb-2.5 text-center">Создайте вакансии</p>
                        <p class="text-sm text-slate-custom leading-150 text-center mb-auto">Напишите описание вакансии,
                            выберите, где
                            разместить
                            рекламу,
                            и&nbsp;опубликуйте свою
                            вакансию на&nbsp;популярных бесплатных и&nbsp;платных досках объявлений.</p>
                        <UiButton variant="action" size="semiaction" class="mt-15px">Добавить вакансию</UiButton>
                    </div>
                    <div class="flex items-center">
                        <span
                          class="text-13px font-normal text-space leading-130 py-2.5 px-15px bg-athens-gray rounded-fifteen h-fit">или</span>
                    </div>
                    <div
                      class="bg-chilean border border-athens rounded-fifteen flex flex-col items-center justify-center py-35px px-25px">
                        <p class="text-15px text-space font-medium text-center mb-2.5">Исследуйте кабинет с помощью
                            демоданных
                        </p>
                        <p class="text-sm text-slate-custom leading-150 text-center mb-auto">Узнайте как работает
                            brandcrm,
                            заполнив свою
                            учетную запись примерами данных, включая
                            вакансии, кандидатов, команду и&nbsp;отчеты.</p>
                        <UiButton variant="orange" size="semiaction" class="mt-15px">Заполнить демоданными</UiButton>
                    </div>
                </div>
            </div>
            <div v-if="currentLevel === 'user'" class="bg-white w-full rounded-fifteen p-25px">
                <div class="flex justify-between">
                    <p class="text-base font-normal text-space">Мероприятия</p>
                    <DropdownCalendar />
                </div>
                <EventList v-for="event in events" :key="event.date" :event="event" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import DropdownCalendar from '@/components/custom/DropdownCalendar.vue';
import EventList from '@/components/custom/page-parts/EventList.vue';

const currentLevel = ref('user');

interface EventData {
    date: string
    time: string
    participants: string[]
    eventName: string
    description: string
    organizer: string
}

const events: EventData[] = [
    {
        date: 'Воскресенье, 15 октября, 2024г',
        time: '15:35-16:00',
        participants: ['Антонина Сарова', 'Андрей Саров', 'Алексей Андреев'],
        eventName: 'Собеседование по Skype',
        description: 'Обсудить опыт кандидата',
        organizer: 'Антонина Сарова',
    },
    {
        date: '...',
        time: '...',
        participants: ['...'],
        eventName: '...',
        description: '...',
        organizer: '...',
    }
]
</script>

<style scoped></style>
