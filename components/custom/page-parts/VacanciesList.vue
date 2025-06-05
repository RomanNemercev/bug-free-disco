<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import companies from '~/src/data/companies.json'

const router = useRouter()
const companyId = router.currentRoute.value.params.companyId

const company = computed(() => companies.find(c => c.id === companyId) || {})
const vacancies = computed(() => company.value.vacancies || {})
</script>

<template>
    <ul class="[&>*:not(:last-child)]:mb-15px">
        <li v-for="(vac, id) in vacancies" :key="vac.id" class="p-5 bg-white rounded-fifteen">
            <div class="grid-custom mb-15px">
                <div class="flex flex-col gap-y-2.5">
                    <a class="text-lg font-medium text-space cursor-pointer w-fit leading-130"
                      @click.prevent="router.push(`/public/vacancies/${vac.id}`)">{{ vac.title }}</a>
                    <span class="text-sm font-medium text-space leading-150">{{ vac.salary }} ₽</span>
                </div>
                <p class="inline-block text-xs font-normal text-slate-custom ml-auto pr-0.5">Опубликовано: <span>{{
                    vac.publishedDate
                        }}</span></p>
            </div>
            <p class="text-sm font-normal text-space leading-150 mb-3.5">г. {{ vac.location }}</p>
            <div class="flex gap-2.5">
                <span v-if="!vac.options?.length">Нет тегов</span>
                <span v-else v-for="(option, index) in vac.options" :key="index"
                  class="bg-zumthor rounded-plus py-[6.5px] px-15px text-dodger text-13px font-medium leading-130">{{
                    option }}</span>
            </div>
        </li>
    </ul>
</template>

<style scoped>
.grid-custom {
    display: grid;
    grid-template-columns: 0.72703fr 0.27297fr;
}
</style>