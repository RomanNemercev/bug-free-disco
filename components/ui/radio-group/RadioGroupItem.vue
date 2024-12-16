<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem v-bind="forwardedProps" :class="cn(
    'radio-check aspect-square h-[18px] w-[18px] rounded-full border-2 border-space text-dodger focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    props.class,
  )
    ">
    <RadioGroupIndicator class="flex items-center justify-center">
      <div class="radio-circle w-[10px] h-[10px] rounded-full bg-dodger"></div>
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>

<style scoped>
.radio-check[data-state="checked"] {
  border-color: #5898ff;
}
</style>
