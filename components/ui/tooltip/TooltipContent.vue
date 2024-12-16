<script setup lang="ts">
import { cn } from '@/lib/utils'
import { TooltipContent, type TooltipContentEmits, type TooltipContentProps, TooltipPortal, useForwardPropsEmits } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>(), {
  sideOffset: 4,
})

const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent v-bind="{ ...forwarded, ...$attrs }"
      :class="cn('max-w-300px z-50 overflow-hidden rounded-three bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', props.class)">
      <div class="arrow"></div>
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>


<style scoped>
.arrow {
  position: absolute;
  left: 0px;
  transform: translate(73px, 0px);
  bottom: 0;
  width: 16px;
  height: 16px;
  /* color: #333; */
  color: red;
}

.arrow::before {
  /* border-top-color: #2F353D; */
  border-top-color: red;
  bottom: -6px;
  left: -7px;
  border-width: 7px 15px 0;
  transform: scaleX(.5) scaleY(1);
  transform-origin: center top;
  content: "";
  position: absolute;
  border-color: transparent;
  border-style: solid;
}
</style>