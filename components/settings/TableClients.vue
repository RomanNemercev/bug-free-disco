<template>
    <div v-if="props.list.length === 0" class="w-full min-h-[223px] bg-white rounded-t-fifteen p-25px flex justify-center items-center gap-2.5 pb-23px text-bali">
        {{ props.emptyText }}
    </div>
    <div v-else
      class="w-full bg-white rounded-t-fifteen p-25px flex justify-between gap-2.5 pb-23px"
    >
        <TableUsers :users="props.list" :dropdownOptions="[]" />
    </div>
</template>

<script setup>
import TableUsers from '../custom/TableUsers.vue';

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
        default: 'Список пуст'
    }
})
</script>