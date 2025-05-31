<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import companies from '~/src/data/companies.json'

const router = useRouter()
const companyId = router.currentRoute.value.params.companyId

const company = computed(() => companies.find(c => c.id === companyId) || {})

definePageMeta({
    layout: 'blank',
})
useHead({ title: company.value.name || 'Компания не найдена' })
</script>

<template>
    <div>
        <h2>{{ company.name || 'Компания не найдена' }}</h2>
        <p>{{ company.description || 'Информация отсутствует' }}</p>
    </div>
</template>