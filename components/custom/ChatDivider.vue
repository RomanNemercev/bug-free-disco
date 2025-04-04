<template>
  <div class="relative flex items-center my-4">
    <div class="flex-grow border-t border-athens"></div>
    <span
      class="mx-5px px-3 py-1 bg-transparent text-slate-custom text-xs rounded-fifteen border-2 border-athens font-normal"
    >
      {{ text }}
    </span>
    <div class="flex-grow border-t border-athens"></div>
  </div>
</template>

<script setup>
  defineProps({
    text: {
      type: String,
      required: true,
    },
  })
</script>
