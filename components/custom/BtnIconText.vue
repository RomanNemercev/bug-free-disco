<template>
  <button
    class="flex items-center text-sm text-dodger gap-x-2 font-medium"
    @click="$emit('click')"
  >
    <span>
      <svg-icon :name="icon" :width="width" :height="height" />
    </span>
    {{ text }}
  </button>
</template>

<script setup>
  defineProps({
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    width: {
      type: [String, Number],
      default: '18',
    },
    height: {
      type: [String, Number],
      default: '18',
    },
  })

  defineEmits(['click'])
</script>
