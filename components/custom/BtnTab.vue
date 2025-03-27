<template>
  <div class="gap-x-2.5 flex">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="rounded-ten leading-normal py-11px px-15px text-sm font-medium transition-colors relative"
      :class="{
        'bg-space text-white': tab.value === modelValue,
        'bg-athens': hoveredTabs[tab.value],
      }"
      @click="selectTab(tab.value)"
      @mouseover="hoveredTabs[tab.value] = true"
      @mouseleave="hoveredTabs[tab.value] = false"
    >
      {{ tab.label }}
      <span
        v-if="tab.notification"
        class="absolute top-[-10px] right-0 px-6px py-[2px] rounded-full bg-dodger flex items-center justify-center text-xs font-bold text-white leading-normal"
      >
        {{ tab.notification }}
      </span>
    </button>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, ref, reactive } from 'vue'

  const hoveredTabs = reactive({})

  const props = defineProps({
    modelValue: String,
    tabs: Array,
  })

  const emit = defineEmits(['update:modelValue'])

  const selectTab = value => {
    emit('update:modelValue', value)
  }

  props.tabs.forEach(tab => {
    hoveredTabs[tab.value] = false
  })
</script>
