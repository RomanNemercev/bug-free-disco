<script setup lang="ts">
  import { ref, reactive } from 'vue';

  interface Tab {
    label: string;
    value: string;
    notification?: string;
  }

  const hoveredTabs = reactive<Record<string, boolean>>({});

  const props = defineProps<{
    modelValue: string;
    tabs: Tab[];
  }>();

  const emit = defineEmits(['update:modelValue']);

  const selectTab = (value: string) => {
    emit('update:modelValue', value);
  };

  props.tabs.forEach((tab: Tab) => {
    hoveredTabs[tab.value] = false;
  });
</script>

<template>
  <div class="flex gap-x-2.5">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="relative rounded-ten px-15px py-11.5px text-sm font-medium leading-normal transition-colors"
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
        class="absolute right-0 top-[-10px] flex items-center justify-center rounded-full bg-dodger px-6px py-[2px] text-xs font-bold leading-normal text-white"
      >
        {{ tab.notification }}
      </span>
    </button>
  </div>
</template>
