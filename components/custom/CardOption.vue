<script setup>
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'

const props = defineProps({
    id: String,
    title: String,
    description: String,
    selectedCard: String,
    hoveredCard: String
})

const emit = defineEmits(['update:selected', 'hover', 'leave'])

const isSelected = computed(() => props.selectedCard === props.id)
const isHovered = computed(() => props.hoveredCard === props.id)

const handleClick = () => emit('update:selected', props.id)
const handleHover = () => emit('hover', props.id)
const clearHover = () => emit('leave')
</script>

<template>
    <div class="max-w-[265px] w-full my-checkbox h-auto">
        <Label :for="id"
          class="h-full cursor-pointer flex flex-col p-15px border border-athens rounded-ten bg-athens-gray gap-y-[11px] transition-all"
          @mouseover="handleHover" @mouseleave="clearHover"
          :class="{ 'bg-dodger border-transparent': isHovered, 'border-transparent bg-zumthor': isSelected }">
            <div class="flex justify-between w-full card-checkbox">
                <p :class="[
                    isSelected ? 'text-dodger' : 'text-space',
                    isHovered && !isSelected ? 'text-white' : ''
                ]" class="text-15px font-semibold transition-colors">{{ title }}</p>
                <RadioGroupItem :id="id" :value="id" @click="handleClick" />
            </div>
            <p class="text-13px font-normal transition-colors leading-normal"
              :class="isHovered && !isSelected ? 'text-white' : 'text-slate-custom'" v-html="description"></p>
        </Label>
    </div>
</template>

<style scoped lang="scss">
.my-checkbox:hover {
    .card-checkbox {
        .radio-check {
            border: 2px solid #ffffff;
        }

        .radio-check[data-state='checked'] {
            border: 2px solid #5898ff;
        }
    }
}
</style>
