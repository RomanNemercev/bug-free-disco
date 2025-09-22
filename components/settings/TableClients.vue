<template>
    <div v-if="props.list.length === 0" class="w-full min-h-[223px] bg-white rounded-t-fifteen p-25px flex justify-center items-center gap-2.5 pb-23px text-bali">
        {{ props.emptyText }}
    </div>
    <div 
      class="w-full bg-white rounded-t-fifteen p-25px flex justify-between gap-2.5 pb-23px"
    >
        таблица
    </div>
</template>

<script setup>
const props = defineProps({
    typeList: {
        type: String,
        default: 'list'
    },
    list: {
        type: Array,
        default: []
    },
    emptyText: {
        type: String,
        default: 'У вас пока нет заказчиков'
    }
})
</script>