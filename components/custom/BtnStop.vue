<script setup lang="ts">
  import MyTooltip from '~/components/custom/MyTooltip.vue';

  import { ref } from 'vue';

  const isHovered = ref<boolean>(false);

  const emit = defineEmits<{
    'click-stop': [];
  }>();

  const handleClickStop = () => {
    emit('click-stop');
  };
</script>

<template>
  <div
    class="flex-center cursor-pointer rounded-ten border p-10.5px transition-colors"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="handleClickStop"
    :class="
      isHovered
        ? 'border-red-custom bg-red-custom text-white'
        : 'border-border-pink bg-pink text-red-custom'
    "
  >
    <MyTooltip text="Отказать кандидату" />
    <svg-icon name="stop20" width="17" height="17" />
  </div>
</template>
