<script setup>
  const props = defineProps({
    status: {
      type: String,
      default: 'Введите значение статуса',
    },
    nameIcon: {
      type: String,
      required: false,
    },
  })
</script>

<template>
  <div
    class="border border-athens rounded-ten bg-athens-gray w-full py-[7px] px-3.5"
    :class="{ 'flex gap-x-2.5 py-[9px]': !!props.nameIcon }"
  >
    <span v-if="nameIcon" class="text-space">
      <svg-icon :name="nameIcon" width="20" height="20" />
    </span>
    <span class="text-sm font-normal select-none text-space">
      {{ status }}
    </span>
  </div>
</template>
