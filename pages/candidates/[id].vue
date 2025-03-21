<template>
    <div class="container pt-25px">
        <div class="flex justify-between mb-25px">
            <NuxtLink to="/candidates" class="text-blue-500 hover:underline">← Вернуться к списку</NuxtLink>
            <div>кнопки для навигации</div>
        </div>
        <div class="w-full">
            <div class="bg-white rounded-fifteen p-25px relative">
                <div class="justify-between flex mb-10">
                    <div class="bg-orange rounded-md text-white p-2.5">крутая кнопка</div>
                    <div class="bg-orange rounded-md text-white p-2.5">много других не таких крутых кнопок</div>
                </div>
                <div class="absolute w-full left-0 h-[1px] bg-athens-gray top-20"></div>
                <div class="flex justify-between">
                    <div>
                        <p class="text-25px font-bold text-space leading-normal mb-2">{{ candidate.name }}</p>
                        <p class="text-15px font-medium text-space leading-normal mb-6px">{{ candidate.vacancy }}</p>
                        <p class="text-13px text-slate-custom mb-6">г. {{ candidate.location }}</p>
                        <div class="flex">
                            <p class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]">Телефон:
                            </p>
                            <div class="mr-2.5 flex"><span class="text-sm font-medium text-space mr-4">{{
                                candidate.phone
                                    }}</span>
                                <div>
                                    <button class="mr-1"><svg-icon name="tg20" width="21" height="21" /></button>
                                    <button class="mr-1"><svg-icon name="viber20" width="21" height="21" /></button>
                                    <button><svg-icon name="wh20" width="21" height="21" /></button>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <p class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]">Почта:
                            </p>
                            <p class="text-sm font-medium text-space">{{ candidate.email }}</p>
                        </div>
                        <div class="flex">
                            <p class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]">Скайп:
                            </p>
                            <p class="text-sm font-medium text-space">{{ candidate.skype }}</p>
                        </div>
                        <div class="flex">
                            <p class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]">
                                Telegram:</p>
                            <p class="text-sm font-medium text-space">{{ candidate.telegram }}</p>
                        </div>
                        <div class="flex">
                            <p class="min-w-[70px] text-sm font-normal text-space leading-150 mr-[45px]">Теги:</p>
                            <div class="flex">
                                <span v-for="(tag, index) in candidate.tags" :key="index"
                                  class="mr-2 text-dodger text-sm font-medium">
                                    {{ tag }}
                                </span>
                                <button class="text-slate-custom flex items-center ml-2.5"><svg-icon name="plus-gray20"
                                      width="18" height="17" class="mr-5px" /><span
                                      class="text-sm font-medium">Добавить</span></button>
                            </div>
                        </div>
                    </div>
                    <div class="rounded-fifteen w-[200px] h-[200px]">
                        <img src="@/assets/img/candidates-photo.png" alt="photo of candidate">
                    </div>
                </div>
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