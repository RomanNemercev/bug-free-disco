<script setup lang="ts">
  import MyTooltip from '~/components/custom/MyTooltip.vue';

  import { ref } from 'vue';

  defineProps({
    icon: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    iconWidth: {
      type: [String, Number],
      default: '17',
    },
    iconHeight: {
      type: [String, Number],
      default: '17',
    },
    buttonWidth: {
      type: [String, Number],
      default: '40',
    },
    buttonHeight: {
      type: [String, Number],
      default: '40',
    },
    tooltipText: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      default:
        'flex-center cursor-pointer rounded-ten border p-10.5px transition-colors',
    },
    isHoveredClasses: {
      type: String,
      default: 'border-zumthor bg-zumthor text-dodger',
    },
    isNotHoveredClasses: {
      type: String,
      default: 'border-athens bg-athens-gray text-slate-custom',
    },
    isActiveClasses: {
      type: String,
      default: 'border-zumthor bg-zumthor text-dodger',
    },
  });

  const isHovered = ref<boolean>(false);

  const emit = defineEmits<{
    click: [];
  }>();

  const handleButtonClick = () => {
    emit('click');
  };
</script>

<template>
  <div
    class="flex-center cursor-pointer rounded-ten border p-10.5px transition-colors"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="handleButtonClick"
    :class="[
      classes,
      isActive
        ? isActiveClasses
        : isHovered
          ? isHoveredClasses
          : isNotHoveredClasses,
    ]"
    :style="{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }"
  >
    <MyTooltip :text="tooltipText" />
    <svg-icon :name="icon" :width="iconWidth" :height="iconHeight" />
  </div>
</template>
