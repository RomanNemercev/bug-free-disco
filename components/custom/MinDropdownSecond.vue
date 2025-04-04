<script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

  const selectedOption = ref(null)
  const isDropDownVisible = ref(false)
  const minDropdown = ref(null)
  const emit = defineEmits(['update:modelValue'])

  const props = defineProps({
    modelValue: {
      default: null,
    },
    defaultValue: {
      type: String,
      default: 'Выбрать',
    },
    options: {
      type: Array,
      required: true,
    },
  })

  const toggleDropdown = () => {
    isDropDownVisible.value = !isDropDownVisible.value
  }

  const mappedSelectedOption = computed(() => {
    return (
      selectedOption.value?.name || selectedOption.value || props.defaultValue
    )
  })

  const toggleOptionSelect = option => {
    selectedOption.value = option
    isDropDownVisible.value = false
    emit('update:modelValue', option?.name || option)
  }

  const closeDropDown = element => {
    if (!minDropdown.value?.contains(element.target)) {
      isDropDownVisible.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('click', closeDropDown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropDown)
  })
</script>

<template>
  <div
    class="cursor-pointer relative max-w-[276px] w-full rounded-ten py-2.5 px-15px hover:bg-catskill transition-colors"
    ref="minDropdown"
  >
    <div @click="toggleDropdown">
      <div class="pr-2 relative w-fit">
        <div
          class="text-sm font-normal"
          :class="{
            'text-slate-custom': !selectedOption,
            'text-space': selectedOption,
          }"
        >
          {{ mappedSelectedOption }}
        </div>
        <div
          class="dropdown-arrow top-px absolute left-full transition-transform duration-300 text-bali"
          :class="{
            'rotate-180 text-dodger': isDropDownVisible,
            'text-space': selectedOption,
          }"
        >
          <svg-icon name="arrow-min-dropdown" width="19" height="19" />
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div
        class="absolute w-full bg-white border border-athens rounded-ten shadow-shadow-droplist top-50px z-10 left-0"
        v-if="isDropDownVisible"
      >
        <div
          class="option text-slate-custom text-sm font-normal py-10px px-15px hover:text-space cursor-pointer first:rounded-t-ten last:rounded-b-ten"
          v-for="(option, index) in props.options"
          :key="index"
          @click="toggleOptionSelect(option)"
        >
          {{ option.name || option }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .option:not(:last-child) {
    border-bottom: 1px solid #f4f6f8;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-4px);
    opacity: 0;
  }
</style>
