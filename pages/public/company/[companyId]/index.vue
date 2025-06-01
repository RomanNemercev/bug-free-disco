<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import companies from '~/src/data/companies.json'
import VacanciesList from '~/components/custom/page-parts/VacanciesList.vue'

const router = useRouter()
const companyId = router.currentRoute.value.params.companyId

const company = computed(() => companies.find(c => c.id === companyId) || {})

const activeTab = ref('company')

definePageMeta({
    layout: 'blank',
})
useHead({ title: company.value.name || 'Компания не найдена' })
</script>

<template>
    <div class="relative min-h-[100vh]">
        <div class="w-full">
            <div class="bg-white">
                <div class="max-w-[775px] w-full mx-auto p-25px">
                    <p class="text-sm font-medium text-slate-custom mb-2.5 leading-normal">Карьера в:</p>
                    <h2 class="text-xl font-semibold text-space">{{ company.name || 'Компания не найдена' }}</h2>
                </div>
            </div>
            <div class="w-full h-[1px] bg-athens-gray"></div>
            <div class="bg-white w-full">
                <div class="max-w-[775px] mx-auto px-25px py-[1px] tabs">
                    <button :class="{ active: activeTab === 'vacancies' }" @click="activeTab = 'vacancies'"
                      class="mr-15px">Все
                        вакансии</button>
                    <button :class="{ active: activeTab === 'company' }" @click="activeTab = 'company'">О
                        компании</button>
                </div>
            </div>
        </div>
        <div class="max-w-[775px] w-full mx-auto px-25px py-35px pb-[170px]">
            <div v-if="activeTab === 'vacancies'">
                <h3 class="text-xl font-semibold text-space mb-25px">Открытые вакансии</h3>
                <VacanciesList />
            </div>
            <div v-else-if="activeTab === 'company'">
                <div class="bg-white rounded-fifteen p-25px">
                    <h3 class="text-xl font-semibold text-space mb-15px">О нас</h3>
                    <p class="text-sm font-normal text-space leading-150">
                        {{ company.description || 'Информация отсутствует' }}
                    </p>
                </div>
            </div>
        </div>
        <div class="shadow-shadow-droplist absolute bottom-0 w-full">
            <div class="w-full bg-white text-center py-[11.5px] px-15px">
                <a href="#" class="vacancy-visit">Посетить сайт компании</a>
            </div>
            <div class="w-full h-[1px] bg-athens-gray"></div>
            <div class="w-full bg-white">
                <div class="text-center py-[13.5px] px-15px">
                    <p class="inline-block text-sm font-normal text-space">Работает на</p>&nbsp;<a href="#"
                      class="uppercase text-sm font-medium text-dodger">Hr crm</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tabs button {
    padding: 13px 5px 18px 5px;
    position: relative;
    color: #79869a;
    font-weight: 600;
    font-size: 14px;
    transition: color .3s ease;
    line-height: normal;
}

.tabs button.active {
    color: #2f353d;
    font-weight: 600;
    font-size: 14px;
}

.tabs button.active::after {
    position: absolute;
    content: '';
    width: calc(100% - 10px);
    height: 5px;
    background-color: #5898ff;
    border-radius: 2px 2px 0 0;
    bottom: -2px;
    left: 5px;
}

.vacancy-visit {
    font-size: 14px;
    font-weight: 500;
    color: #5898ff;
    padding-right: 20px;
    background-image: url('../../../../assets/sprite/svg/arrow-link.svg');
    background-repeat: no-repeat;
    background-position: right center;
}
</style>