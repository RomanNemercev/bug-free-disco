<template>
    <div>
        <!-- Если это PNG, добавляем background-image -->
        <div v-if="isPng && imagePath" :style="{ backgroundImage: `url(${imagePath})` }" class="icon"></div>
        <!-- Если это SVG, рендерим svg-icon -->
        <svg-icon v-else-if="icon" :name="icon" width="41" height="40" />
        <!-- Если ни PNG, ни SVG, выводим дефолтную иконку или ничего -->
        <div v-else class="icon icon-default"></div>
    </div>
</template>

#### Логика:

```javascript
<script setup>
defineProps({
    icon: { type: [String, Boolean], default: false },
    isPng: { type: Boolean, default: false },
    imagePath: { type: String, default: '' },
});
</script>

<style scoped>
.icon {
    width: 41px;
    height: 40px;
    background-size: contain;
    background-repeat: no-repeat;
}

.icon-default {
    background-image: url('@/assets/img/default.png');
    /* Дефолтная картинка */
}
</style>
