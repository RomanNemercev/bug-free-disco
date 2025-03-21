<template>
  <div class="border rounded-ten p-10.5px flex-center cursor-pointer transition-colors" @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    :class="isHovered ? 'bg-zumthor border-zumthor text-dodger' : 'bg-athens-gray text-slate-custom border-athens'">
    <MyTooltip text="Написать письмо" />
    <svg-icon name="email20" width="17" height="17" />
  </div>
</template>

<script setup>
import MyTooltip from '~/components/custom/MyTooltip.vue';

import { ref } from "vue";

const isHovered = ref(false);
</script>