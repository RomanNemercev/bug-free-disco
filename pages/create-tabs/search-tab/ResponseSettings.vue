<script setup>
import MinDropdown from '~/components/custom/MinDropdown.vue'
import ConfigResponse from '~/components/custom/config-response/ConfigResponse.vue'

const templates = [
    {
        "id": "template1",
        "name": "Менеджер по продажам"
    },
    {
        "id": "template2",
        "name": "Повар"
    },
]

const activeTemplate = ref(null);
</script>

<template>
    <div>
        <slot name="back" />
        <MinDropdown :options="templates" v-model="activeTemplate" />
        <div class="flex gap-x-[24px] pt-4">
            <div class="max-w-[875px] flex-grow p-25px bg-white rounded-fifteen">
                <ConfigResponse />
            </div>
            <div class="max-w-[275px] sticky top-4 rounded-fifteen bg-white p-15px h-fit">
                <p class="text-space leading-[17px] text-13px font-normal">Ваша заявка на&nbsp;размещение вакансии
                    на&nbsp;14&nbsp;из&nbsp;18&nbsp;бесплатных площадках
                    находиться в&nbsp;стадии рассмотрения.
                    Эта вакансия уже опубликована на&nbsp;вашей странице вакансий. Процесс утверждения займет
                    до&nbsp;4&nbsp;часов.</p>
            </div>
        </div>
        <p>test</p>
    </div>
</template>