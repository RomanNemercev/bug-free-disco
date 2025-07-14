<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    @click.self="closePopup"
    :class="[isOpen ? 'opacity-100' : 'opacity-0', overflowContainer ? 'overflow-y-auto' : (overflowVisible ? 'overflow-visible' : 'overflow-hidden'), parentRounded ? 'rounded-fifteen' : 'rounded-none']">
    <div @click.self="closePopup" class="w-full absolute" :style="{ maxWidth: width, top: lgSize ? '10%' : 'auto' }">
      <div class="bg-white w-full h-full rounded-fifteen p-25px relative transform" :style="{
        maxWidth: width,
        height: height === 'auto' ? 'auto' : (lgSize ? 'auto' : height),
        overflow: disableOverflowHidden ? 'visible' : 'hidden',
        top: topActive ? '-10%' : 'auto',
        maxHeight: maxHeight ? 'none' : '80vh',
      }" :class="{ 'pr-2.5': customStyles }">
        <div ref="scrollContainer" class="overflow-y-auto h-full pr-[15px]" :style="{
          ...customStyles,
          maxHeight: height === 'auto' ? '100%' : height,
          overflow: disableOverflowHidden ? 'visible' : 'auto',
        }">
          <button v-if="showCloseButton && !hasScrollbar" @click="closePopup"
            class="absolute top-25px right-25px text-gray-500 hover:text-black">
            ✖
          </button>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  showCloseButton: { type: Boolean, default: false },
  width: { type: String, default: 'fit-content' },
  height: { type: String, default: 'auto' },
  disableOverflowHidden: { type: Boolean, default: false },
  overflowContainer: { type: Boolean, default: false },
  overflowVisible: { type: Boolean, default: false },
  topActive: { type: Boolean, default: false },
  maxHeight: { type: Boolean, default: false },
  lgSize: { type: Boolean, default: false },
  parentRounded: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])

const scrollContainer = ref(null)
const hasScrollbar = ref(false)
const customStyles = ref({})

const closePopup = () => {
  emit('close')
}

const checkScrollbar = () => {
  if (scrollContainer.value) {
    hasScrollbar.value = scrollContainer.value.scrollHeight > scrollContainer.value.clientHeight;
    updateStyles();
  }
}

const updateStyles = () => {
  if (hasScrollbar.value) {
    customStyles.value = { paddingRight: '15px' };
  } else {
    customStyles.value = {};
  }
}

watch(() => props.isOpen, newVal => {
  if (newVal) checkScrollbar();
});

watch(() => scrollContainer.value?.scrollHeight, () => {
  checkScrollbar();
});

onMounted(() => {
  checkScrollbar();
  window.addEventListener('resize', checkScrollbar);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScrollbar);
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
  margin-right: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #79869a;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #5a6a7f;
}
</style>