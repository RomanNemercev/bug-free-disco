<template>
    <div class="w-full border border-athens py-4 px-1 leading-normal rounded-2xl">
        <div class="grid grid-cols-7 gap-4 pb-2 border-b border-athens">
            <div v-for="header in headers" :key="header.key" class="text-center font-bold">
                <span>{{ header.label }}</span>
                <button v-if="['createdAt', 'closeDate', 'status'].includes(header.key)" @click="sortBy(header.key)"
                  class="relative flex items-center justify-center ml-2">
                    <span :style="sortArrowStyle(header.key)" class="ml-1">&#9662;</span>
                </button>
            </div>
        </div>

        <div v-for="(vacancy, index) in sortedData" :key="index"
          class="grid grid-cols-7 gap-4 py-2 border-b border-athens">
            <!-- Vacancy Title -->
            <div>{{ vacancy.title }}</div>

            <!-- Region -->
            <div>{{ vacancy.region }}</div>

            <!-- Created At -->
            <div>{{ vacancy.createdAt }}</div>

            <!-- Close Date -->
            <div>{{ vacancy.closeDate }}</div>

            <!-- Status with conditional rendering -->
            <div>
                <span v-if="vacancy.status === 'new'">Новая заявка</span>
                <span v-else-if="vacancy.status === 'in_review'">На рассмотрении</span>
                <span v-else-if="vacancy.status === 'in_work'">В работе</span>
                <span v-else>Приостановлена</span>
            </div>

            <!-- Customer or Responsible column depending on user role -->
            <div v-if="userRole !== 'customer'">{{ vacancy.customer }}</div>
            <div v-else>{{ vacancy.responsible }}</div>

            <!-- Executor Column -->
            <div>
                <span v-if="vacancy.executor">{{ vacancy.executor }}</span>
                <component v-if="isAdmin" is="CustomAdminComponent" />
                <button v-else-if="isRecruiter" @click="takeInWork(vacancy)">Взять в работу</button>
                <span v-else class="text-gray-400">Не назначен</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Sample data for demonstration
const data = ref([
    { title: "Повар", region: "Пермь", createdAt: "10.05.2024", closeDate: "10.05.2024", status: "new", customer: "Людмила Сергеева", responsible: "Иван Иванов", executor: "Алексей Смирнов" },
    { title: "Астролог", region: "Пермь", createdAt: "10.05.2024", closeDate: "10.05.2024", status: "in_review", customer: "Людмила Сергеева", responsible: "Иван Иванов", executor: "" },
    { title: "Маркетолог", region: "Пермь", createdAt: "10.05.2024", closeDate: "10.05.2024", status: "in_work", customer: "Людмила Сергеева", responsible: "Иван Иванов", executor: "Алексей Смирнов" },
]);

const headers = [
    { key: "title", label: "Вакансия" },
    { key: "region", label: "Регион" },
    { key: "createdAt", label: "Создана от" },
    { key: "closeDate", label: "Закрыть до" },
    { key: "status", label: "Статус" },
    { key: "customer", label: "Заказчик" },
    { key: "executor", label: "Исполнитель" }
];

const sortKey = ref("");
const sortOrder = ref("asc");
const userRole = ref("customer"); // Change to "admin" or "recruiter" for testing
const isAdmin = computed(() => userRole.value === "admin");
const isRecruiter = computed(() => userRole.value === "recruiter");

const sortedData = computed(() => {
    if (!sortKey.value) return data.value;
    return [...data.value].sort((a, b) => {
        const multiplier = sortOrder.value === "asc" ? 1 : -1;
        if (a[sortKey.value] > b[sortKey.value]) return 1 * multiplier;
        if (a[sortKey.value] < b[sortKey.value]) return -1 * multiplier;
        return 0;
    });
});

const sortBy = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
        sortKey.value = key;
        sortOrder.value = "asc";
    }
};

const sortArrowStyle = (key) => {
    return {
        transform: sortKey.value === key && sortOrder.value === "asc" ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease"
    };
};

const takeInWork = (vacancy) => {
    console.log(`Вакансия взята в работу: ${vacancy.title}`);
};
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
    text-align: center;
}

button {
    background: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
}
</style>