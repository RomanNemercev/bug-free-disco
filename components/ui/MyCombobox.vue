<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '../../lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import { ref } from 'vue'

const frameworks = [
    { value: 'next.js', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxt', label: 'Nuxt' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
]

const open = ref(false)
const value = ref('')
</script>

<template>
    <div class="w-full">
        <Popover v-model:open="open">
            <PopoverTrigger as-child>
                <Button variant="outline" role="combobox" :aria-expanded="open" class="w-full justify-between">
                    {{ value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Выберите значение..." }}
                    <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-full p-0">
                <Command>
                    <CommandInput class="h-9" placeholder="Найти..." />
                    <CommandEmpty>Не резаультатов</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem v-for="framework in frameworks" :key="framework.value" :value="framework.value"
                              @select="(ev) => {
                                if (typeof ev.detail.value === 'string') {
                                    value = ev.detail.value
                                }
                                open = false
                            }">
                                {{ framework.label }}
                                <CheckIcon :class="cn(
                                    'ml-auto h-4 w-4',
                                    value === framework.value ? 'opacity-100' : 'opacity-0',
                                )" />
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    </div>
</template>

<style scoped></style>