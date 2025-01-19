<template>
    <div>
        <!-- Если это PNG, добавляем background-image -->
        <div v-if="isPng && imagePath"
          :style="{ backgroundImage: `url(${imagePath})`, width: `${width}px`, height: `${height}px` }" class="icon">
        </div>
        <!-- Если это SVG, рендерим svg-icon -->
        <svg-icon v-else-if="icon" :name="icon" :width="width" :height="height" />
        <!-- Если ни PNG, ни SVG, выводим дефолтную иконку или ничего -->
        <div v-else class="icon icon-default" :style="{ width: `${width}px`, height: `${height}px` }"></div>
    </div>
</template>

<!-- #### Логика: -->

<!-- ```javascript -->
<script setup>
defineProps({
    icon: { type: [String, Boolean], default: false },
    isPng: { type: Boolean, default: false },
    imagePath: { type: String, default: '' },
    width: { type: Number, default: 41 }, // Default width
    height: { type: Number, default: 40 }, // Default height
});
</script>

<style scoped>
.icon {
    background-size: contain;
    background-repeat: no-repeat;
}

.icon-default {
    background-image: url('@/assets/img/default.png');
    /* Дефолтная картинка */
}
</style>
