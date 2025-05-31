<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// const props = defineProps({ id: String })
const router = useRouter()
const id = router.currentRoute.value.params.id

// Импорт данных
import companies from '~/src/data/companies.json'

// Находим вакансию и её компанию
const vacancy = computed(() => {
    // console.log('Searching for id:', id) // Отладка
    for (const company of companies) {
        const vac = company.vacancies.find(v => String(v.id) === id) // Сравнение строк
        if (vac) {
            // console.log('Found vacancy:', vac) // Отладка
            return { ...vac, companyId: company.id }
        }
    }
    console.log('Vacancy not found for id:', id) // Отладка
    return {}
})

const companyId = computed(() => vacancy.value.companyId || null)
const company = computed(() => companies.find(c => c.id === companyId.value) || {})

const activeTab = ref('about')
const formData = ref({ name: '', email: '' })


const handleSubmit = () => {
    console.log('Отклик отправлен', formData.value)
}

const goToCompany = () => {
    if (companyId.value) {
        router.push(`/public/company/${companyId.value}`)
    }
}

definePageMeta({
    layout: 'blank',
})
useHead({ title: vacancy.value.title || 'Вакансия не найдена' })
</script>

<template>
    <div class="vacancy-page">
        <div class="vacancy-header bg-white">
            <div class="vacancy-header__container">
                <label class="flex items-center cursor-pointer w-fit mb-35px" :disabled="!companyId"
                  @click="goToCompany">
                    <button id="go-to-company-button"
                      class="text-slate-custom p-[9px] border border-athens rounded-ten bg-athens-gray mr-15px"><svg-icon
                          name="arrow-left" width="20" height="20" /></button>
                    <div class="text-xs text-slate-custom font-normal leading-130">
                        <p class="leading-[18.5px]">Назад к<br>{{ company.name || 'Неизвестно' }}</p>
                    </div>
                </label>
                <h1 class="text-25px text-dodger leading-130 font-bold mb-15px">
                    {{ vacancy.title || 'Вакансия не найдена' }}
                </h1>
                <p class="text-sm font-normal text-space leading-150">г. {{ company.city }}</p>
            </div>
            <div class="w-full h-[1px] bg-athens-gray"></div>
            <div class="vacancy-tabs__container">
                <div class="tabs">
                    <button :class="{ active: activeTab === 'about' }" @click="activeTab = 'about'" class="mr-15px">О
                        вакансии</button>
                    <button :class="{ active: activeTab === 'form' }" @click="activeTab = 'form'">Анкета</button>
                </div>
            </div>
        </div>
        <div class="vacancy-main" v-if="activeTab === 'about'">
            <div class="vacancy-main__container p-25px bg-white rounded-fifteen mb-15px">
                <div class="mb-35px">
                    <div>
                        <p class="text-lg font-medium leading-130 text-space mb-15px">Описание вакансии</p>
                        <div class="description mb-[23px]"
                          v-html="vacancy.description || 'Описание вакансии не найдено'"></div>
                    </div>
                    <div class="mb-25px">
                        <p class="text-lg font-medium leading-130 text-space mb-15px">Обязанности</p>
                        <div class="responsibilities" v-html="vacancy.responsibilities || 'Обязанности не найдены'">
                        </div>
                    </div>
                    <div>
                        <p class="text-lg font-medium leading-130 text-space mb-15px">Требования</p>
                        <div class="requirements" v-html="vacancy.requirements || 'Требования не найдены'"></div>
                    </div>
                </div>
                <div class="flex justify-end">
                    <div class="flex items-center bg-catskill rounded-fifteen py-15px px-25px">
                        <p class="mr-25px text-base text-slate-custom font-normal">Поделиться:</p>
                        <div class="flex gap-x-2.5"><a href="#"><svg-icon name="vk" width="40" height="40" /></a><a
                              href="#"><svg-icon name="tg" width="40" height="40" /></a><a href="#"><svg-icon name="ok"
                                  width="40" height="40" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <UiButton variant="action" size="semiaction" class="w-full uppercase min-h-[50px]">Откликнуться на вакансию
            </UiButton>
        </div>
        <div v-if="activeTab === 'form'">
            <form @submit.prevent="handleSubmit">
                <input v-model="formData.name" placeholder="Имя" />
                <input v-model="formData.email" placeholder="Email" />
                <button type="submit">Отправить отклик</button>
            </form>
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
.vacancy-page {
    width: 100%;
    position: relative;
    min-height: 100vh;
}

.vacancy-header {
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
}

.vacancy-header__container {
    max-width: 775px;
    width: 100%;
    margin: 0 auto;
    padding: 25px;
}

.vacancy-tabs__container {
    max-width: 775px;
    margin: 0 auto;
    padding-left: 25px;
    padding-top: 1px;
    padding-bottom: 1px;
}

.tabs button {
    padding: 12px 5px 18px 5px;
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

.vacancy-main {
    padding: 35px 25px 169px 25px;
    max-width: 775px;
    width: 100%;
    margin: 0 auto;
}

.responsibilities :deep(ul) {
    list-style-type: disc;
    padding-left: 22px;
}

.responsibilities :deep(li) {
    font-size: 14px;
}

.requirements :deep(ul) {
    list-style-type: disc;
    padding-left: 22px;
}

.requirements :deep(li) {
    font-size: 14px;
}

.vacancy-visit {
    font-size: 14px;
    font-weight: 500;
    color: #5898ff;
    padding-right: 20px;
    background-image: url('../../../assets/sprite/svg/arrow-link.svg');
    background-repeat: no-repeat;
    background-position: right center;
}

.description :deep(p) {
    font-size: 14px;
}
</style>