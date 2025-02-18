<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.25s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<!--<script lang="ts" setup>
import { onMounted } from 'vue';

import { API_DOMAIN } from "~/src/constants";
// let storageToken = window.localStorage.getItem('jobly-token');

// if (storageToken === undefined) {
//   const apiToken = await $fetch(API_DOMAIN, {
//     method: 'POST',
//     body: {
//       "email": "api-jwt@jobly.ru",
//       "password": "hdjkmRkkj:sg"
//     }
//   });
//   console.log(apiToken);
// }

onMounted(async () => {
  if (process.client) {
    try {
      let data = {
        email: 'api-jwt@jobly.ru',
        password: 'hdjkmRkkj:sg'
      };

      const response = await $fetch("https://admin.job-ly.ru/api/login-jwt", {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      console.log("Ответ сервера:", response);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  }
});
</script>
-->
