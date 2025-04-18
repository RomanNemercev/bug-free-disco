<script setup>
  definePageMeta({
    layout: 'settings',
  })

  useHead({
    title: 'Настройки — Заказчики',
  })
</script>

<template>
  <div class="default-template">
    <h1 class="text-xl font-semibold">Default Template</h1>
    <h2 class="text-lg font-semibold">Part: Customers</h2>
    <p class="text-sm font-medium">This is a default template example.</p>
    <ui-button size="semiaction" variant="action">Action</ui-button>
  </div>
</template>

<style scoped>
  .default-template {
    background-color: #fff;
    padding: 25px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
