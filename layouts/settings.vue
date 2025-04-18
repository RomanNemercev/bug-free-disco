<template>
  <div>
    <vacancy-header />
    <div class="navigation grid gap-x-25px py-35px px-[133px]">
      <SettingsNavigation />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import SettingsNavigation from '~/components/custom/SettingsNavigation.vue'
</script>

<style scoped>
  .navigation {
    grid-template-columns: 275px 1fr;
  }
</style>
