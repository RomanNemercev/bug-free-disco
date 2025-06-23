<template>
    <div class="w-full mb-2.5">
        <p class="text-sm font-medium text-space leading-normal mb-4">
          Id-client<span class="text-red-500">*</span>
        </p>
        <MyInput
          placeholder="Введите id клиента платфомы"
          v-model="idClient"
          @input="emit('update:modelValue', {idClient: idClient, idSecret: idSecret})"
          :type="'String'"
        />
        <div v-if="errors.idClient" class="text-red-500 text-xs mt-1">
          {{ errors.idClient }}
        </div>
    </div>
    <div class="w-full mb-25px">
        <p class="text-sm font-medium text-space leading-normal mb-4">
          Id-secret<span class="text-red-500">*</span>
        </p>
        <MyInput
          placeholder="Введите id секретного ключа платформы"
          v-model="idSecret"
          @input="emit('update:modelValue', {idClient: idClient, idSecret: idSecret})"
          :type="'String'"
        />
        <div v-if="errors.idSecret" class="text-red-500 text-xs mt-1">
          {{ errors.idSecret }}
        </div>
    </div>
</template>

<script setup type="ts">
import MyInput from '../MyInput.vue';

const emit = defineEmits(['update:modelValue'])

const idClient = ref('');
const idSecret = ref('');
const errors = ref({
    idClient: null,
    idSecret: null
})
</script>
