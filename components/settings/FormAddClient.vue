<template>
    <p class="leading-normal text-xl font-semibold text-space mb-[10px]"> 
       Приглашение заказчика
    </p>
    <p class="leading-normal text-sm font-normal text-bali mb-[25px]">
        Приглашенному участнику придет письмо с доступом которое нужно подтвердить.
    </p>
    <form>
        <div class="w-full max-w-[400px] mb-15px">
            <p class="text-sm font-medium text-space leading-normal mb-15px">
              Email<span class="text-red-500">*</span>
            </p>
            <MyInput
              placeholder="Введите email"
              v-model="data.email"
            />
            <div v-if="errors.post" class="text-red-500 text-xs mt-1">
              {{ errors.email }}
            </div>
        </div>
        <div class="w-full max-w-[400px] mb-15px">
            <p class="text-sm font-medium text-space leading-normal mb-15px">
              ФИО заказчика<span class="text-red-500">*</span>
            </p>
            <div class="w-full flex justify-between gap-x-15px mb-15px">
                <MyInput
                  placeholder="Фамилия"
                  v-model="data.lastName"
                />
                <MyInput
                  placeholder="Имя"
                  v-model="data.firstName"
                />
                <MyInput
                  placeholder="Отчество"
                  v-model="data.pathronomic"
                />
            </div>
            <div v-if="errors.post" class="text-red-500 text-xs mt-1">
              {{ errors.name }}
            </div>
        </div>
        <div class="w-full mb-15px">
            <div class="flex justify-between gap-x-15px">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Отдел<span class="text-red-500">*</span>
                </p>
                <a href="#" class="text-sm font-medium text-dodger link-manage">
                    Управлять
                </a>
            </div>
              <response-input
                class="w-full"
                :responses="departments"
                :model-value="data.division ? data.division.name : null"
                :showRoles="true"
                notFound="Отдел не найден"
                placeholder="Введите название отдела"
                @update:modelValue="(name, index) =>updateDepartment(name, index)"
              />
              <div v-if="errors.department" class="text-red-500 text-xs mt-1">
                {{ errors.department }}
              </div>
        </div>
        <div class="w-full mb-15px">
            <p class="text-sm font-medium text-space leading-normal mb-4">
                  Вакансия
            </p>
            <response-input
                class="w-full"
                :responses="vacancies"
                :model-value="data.vacancie"
                :showRoles="true"
                notFound="Вакансия не найдена"
                placeholder="Введите название вакансии"
                @update:modelValue="data.vacancie = $event"
              />
              <div v-if="errors.vanancie" class="text-red-500 text-xs mt-1">
                {{ errors.vacancie }}
              </div>
        </div>
        <!-- <div class="w-full mb-35px">
            <p class="text-sm font-medium text-space leading-normal mb-4">
                  Права
            </p>
            <MyCheckbox class="mb-[10px]" :id="'show-contacts'" :label="'Может комментировать кандидатов'" v-model="data.isComment" />
            <MyCheckbox :id="'show-contacts'" :label="'Может вести переписку с кандидатом'" v-model="data.isMessage" />
       </div> -->
       <div data-v-5b26d963="" class="flex gap-15px justify-between w-fit">
        <button data-v-5b26d963="" 
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-dodger text-white p-semi-btn text-sm rounded-ten leading-normal h-fit font-bold"
          @click="createClient"
        >
            Пригласить
        </button>
        <button data-v-5b26d963="" 
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-athens-gray border border-athens text-slate-custom p-border-semi-btn text-sm rounded-ten leading-normal font-medium"
        >
            Отмена
        </button>
        <div v-if="errors.response" class="text-red-500 text-xs mt-1">
                {{ errors.response }}
        </div>
    </div>
     <div v-if="success.status" class="text-red-500 text-xs mt-1">
                {{ success.message }}
        </div>
    </form>
</template>

<script setup>
import MyInput from "../custom/MyInput.vue";
import MyDropdown from "../custom/MyDropdown.vue";
import MyCheckbox from "../custom/MyCheckbox.vue";
import { getDepartments } from "@/utils/executorsList";
import ResponseInput from "../custom/ResponseInput.vue";
import { getVacancies } from "@/utils/getVacancies";
import { registerClient } from "@/utils/registerUser";


const errors = ref({})
const data = ref({})
const departments = ref([]);
const vacancies = ref([]);
const success = ref({
  status: false,
  message: ''
});

departments.value = await getDepartments();
const apiVacancies = await getVacancies();

apiVacancies.map((vacancy) => {
  vacancies.value.push({
    id: vacancy.id,
    name: vacancy.title,
    role: ''
  })
})

const updateDepartment = (name, index) => {
  data.value.department = index;
}


async function createClient(event) {
  event.preventDefault();
  data.value.name = ''
  if (data.value.email) {
    data.value.login = data.value.email
  }
  if (data.value.firstName) {
    data.value.name += data.value.firstName
  }
  if (data.value.firstName) {
    data.value.name += ` ${data.value.lastName}`
  }
  if (data.value.pathronomic) {
    data.value.name += ` ${data.value.pathronomic}`
  }
  console.log('data', data.value.department);
  const { data: response, error, message}  = await registerClient('register-client', data.value)
  if (error) {
    errors.value.response = message
  } else {
    errors.value.response = false
    success.value.status = true
    success.value.message = response.message
  }
}
</script>

<style scoped>
.link-manage:hover {
    text-decoration: underline;
}
</style>