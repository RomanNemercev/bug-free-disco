<template>
    <div class="container pt-25px">
        <div class="flex justify-between mb-25px">
            <NuxtLink to="/candidates" class="text-blue-500 hover:underline">← Вернуться к списку</NuxtLink>
            <div>кнопки для навигации</div>
        </div>
        <div class="flex gap-x-25px w-full">
            <div class="w-full">
                <div class="bg-white rounded-fifteen p-25px">
                    <div>
                        <p class="text-25px font-bold text-space leading-normal mb-5px">{{ candidate.name }}</p>
                        <p class="text-15px font-medium text-space leading-normal">{{ candidate.vacancy }}</p>
                        <p class="text-13px text-slate-custom">г. {{ candidate.location }}</p>
                        <div>
                            <div>
                                <p>Телефон:</p>
                                <div><span>{{ candidate.phone }}</span>
                                    <div>
                                        <button><svg-icon name="tg20" width="20" height="20" /></button>
                                        <button><svg-icon name="viber20" width="20" height="20" /></button>
                                        <button><svg-icon name="wh20" width="20" height="20" /></button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Email:</p>
                                <p>{{ candidate.email }}</p>
                            </div>
                            <div>
                                <p>Skype:</p>
                                <p>{{ candidate.skype }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-fifteen p-25px min-w-[350px]">
                <p class="text-xl font-semibold text-space leading-normal">Оцените кандидата</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { candidatesFull } from "~/utils/candidatesFull";

const route = useRoute();

const candidate = computed(() => {
    return candidatesFull.find(c => c.id === Number(route.params.id));
});
</script>