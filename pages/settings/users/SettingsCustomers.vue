<template>
  <div>
    <div class="default-template">
      <UsersHead 
      typeUser="client" 
      title="Заказчики" 
      @childClick="updateActiveTab" />
    </div>
    <div class="default-template">
      <TableClients v-if="activeTab === 'list'" :list="listActive.list"/>
      <TableClients v-if="activeTab === 'invites'" typeList="invites" :list="listInvites.list" emptyText="Активных приглашений нет" />
    </div>
  </div>
</template>

<script setup>
import TableClients from '@/components/settings/TableClients.vue';
import UsersHead from '@/components/settings/UsersHead.vue';
import { clientsList } from '@/utils/clientsList';

definePageMeta({
  layout: 'settings',
})

useHead({
  title: 'Настройки — Заказчики',
})

const activeTab = ref('list');
const updateActiveTab = async (tab) => {
  activeTab.value = tab;
  if (activeTab.value === 'invites' && !listInvites.value.isGet) {
    const {clients: clients, error: error} = await clientsList('clients', 'status=invites');
    if (!error) {
      listInvites.value.list = clients
      listInvites.value.isGet = true
    }
  }
}

const listActive = ref({
  isGet: false,
  list: []
});
const listInvites = ref({
  isGet: false,
  list: []
})

const {clients: clients, error: error} = await clientsList('clients', 'status=active');
if (!error) {
  listActive.value.list = clients
  console.log('list active clients', listActive.value.list);
} else {
  console.error(error)
}

</script>

<style scoped>
  .default-template {
    background-color: #fff;
    padding: 25px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
  }
  .default-template:not(:last-child) {
    margin-bottom: 10px;
  }
</style>
