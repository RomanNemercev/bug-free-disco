<script setup lang="ts">
  import MyTooltip from '~/components/custom/MyTooltip.vue';

  import { ref } from 'vue';

  const isHovered = ref<boolean>(false);
</script>

<template>
  <div
    class="flex-center cursor-pointer rounded-ten border p-10.5px transition-colors"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    :class="
      isHovered
        ? 'border-zumthor bg-zumthor text-dodger'
        : 'border-athens bg-athens-gray text-slate-custom'
    "
  >
    <MyTooltip text="Новая задача" />
    <svg-icon name="calendar20" width="17" height="17" />
  </div>
</template>
