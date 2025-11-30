<template>
  <div>
    <div class="default-template">
      <UsersHead 
      typeUser="recruiter" 
      title="Сотрудники" 
      @childClick="updateActiveTab" />
    </div>
    <div class="default-template">
      <TableClients v-if="activeTab === 'list'" :list="listActive.list" emptyText="У вас пока нет сотрудников"/>
      <TableClients v-if="activeTab === 'invites'" typeList="invites" :list="listInvites.list" emptyText="Активных приглашений нет" />
    </div>
  </div>
</template>

<script setup>
import TableClients from '@/components/settings/TableClients.vue';
import UsersHead from '@/components/settings/UsersHead.vue';

  definePageMeta({
    layout: 'settings',
  })

  useHead({
    title: 'Настройки — Сотрудники',
  })


 const activeTab = ref('list');
const updateActiveTab = async (tab, update = false) => {
  activeTab.value = tab;
  if (activeTab.value === 'invites' && (!listInvites.value.isGet || update)) {
    const {clients: clients, error: error} = await clientsList('recruiters', 'status=new');
    if (!error) {
      listInvites.value.list = clients
      listInvites.value.isGet = true
    }
  }
  if (activeTab.value === 'list' && (!listActive.value.isGet || update)) {
    const {clients: clients, error: error} = await clientsList('recruiters', 'status=active');
    if (!error) {
      listActive.value.list = clients
      listActive.value.isGet = true
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

const {clients: clients, error: error} = await clientsList('recruiters', 'status=active');
if (!error) {
  listActive.value.list = clients
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
