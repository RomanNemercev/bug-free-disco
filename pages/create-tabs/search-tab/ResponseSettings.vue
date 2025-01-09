<script setup>
import MinDropdown from '~/components/custom/MinDropdown.vue'

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
        <p>test</p>
    </div>
</template>