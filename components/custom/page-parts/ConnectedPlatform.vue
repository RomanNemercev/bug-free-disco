<template>
    <div class="w-full mb-25px">
        <p class="text-sm font-medium text-space leading-normal mb-4">
          Подключенные профили
        </p>
        <MyInput
          v-model="props.email"
          :class="'bg-feta'"
        />
    </div>
</template>

<script setup lang="ts">
import MyInput from "~/components/custom/MyInput.vue";

const props = defineProps(
    {
        email: {
            type: String,
            required: true
        }
    }
)
</script>