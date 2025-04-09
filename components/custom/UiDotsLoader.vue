<template>
  <div
    class="text-center py-4 flex items-center w-full gap-x-2.5 justify-center relative min-h-10"
  >
    <div
      v-for="i in 4"
      :key="i"
      class="w-2.5 h-2.5 bg-dodger rounded-full"
      :class="
        i % 2 === 0
          ? 'translate-y-[20px] animate-dot-up'
          : '-translate-y-[20px] animate-dot-down'
      "
    ></div>
  </div>
</template>
