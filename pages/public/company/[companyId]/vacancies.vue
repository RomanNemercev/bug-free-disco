<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ companyId: String })
const router = useRouter()

import companies from '~/src/data/companies.json'
const company = computed(() => companies[props.companyId] || {})
const vacancies = computed(() => company.value.vacancies || {})

const goToCompany = () => {
    router.push(`/public/company/${props.companyId}`)
}
</script>

<template>
    <div>
        <h2>Вакансии {{ company.name }}</h2>
        <ul>
            <li v-for="(vac, id) in vacancies" :key="id">
                <a @click.prevent="router.push(`/public/vacancies/${id}`)">{{ vac.title }}</a>
            </li>
        </ul>
        <button @click="goToCompany">О компании</button>
    </div>
</template>