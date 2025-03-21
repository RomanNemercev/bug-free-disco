<template>
    <div class="border rounded-ten p-10.5px flex-center cursor-pointer transition-colors" @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
      :class="isHovered ? 'bg-red border-red text-white' : 'text-red border-border-pink bg-pink'">
        <MyTooltip text="Отказать кандидату" />
        <svg-icon name="stop20" width="17" height="17" />
    </div>
</template>

<script setup>
import MyTooltip from '~/components/custom/MyTooltip.vue';

import { ref } from "vue";

const isHovered = ref(false);
</script>