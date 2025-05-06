<script setup>
  import { computed, ref, onUnmounted, onMounted } from 'vue'

  const props = defineProps({
    isVisible: { type: Boolean, default: false },
    position: { type: String, default: 'top' },
    ignoreElements: { type: Array, default: () => [] },
  })

  const emit = defineEmits(['update:isVisible'])

  const popupRef = ref(null)

  const positionStyles = computed(() => {
    const baseStyles = {
      position: 'absolute',
      zIndex: 1000,
      borderRadius: '15px',
      backgroundColor: '#FFFFFF',
      color: '#2f353d',
      boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.15)',
    }
    switch (props.position) {
      case 'top':
        return {
          ...baseStyles,
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }
      case 'bottom':
        return {
          ...baseStyles,
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }
      case 'left':
        return {
          ...baseStyles,
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
        }
      case 'right':
        return {
          ...baseStyles,
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
        }
      case 'top-right':
        return { ...baseStyles, top: 'calc(100% + 5px)', right: '0' }
      case 'top-left':
        return { ...baseStyles, top: 'calc(100% + 5px)', left: '0' }
      case 'bottom-right':
        return { ...baseStyles, bottom: 'calc(100% - 5px)', right: '0' }
      case 'bottom-left':
        return { ...baseStyles, bottom: 'calc(100% - 5px)', left: '0' }
      default:
        return {
          ...baseStyles,
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }
    }
  })

  const animationName = computed(
    () => `slide-${props.position.replace('-', '-')}`
  )

  // handler click outside component
  // Обработчик клика вне компонента с учётом исключений
  const handleClickOutside = event => {
    // Проверяем, не попал ли клик в исключённые элементы
    const isIgnored = props.ignoreElements.some(
      el => el && (el === event.target || el.contains(event.target))
    )
    if (isIgnored) return

    // Если клик вне компонента, скрываем
    if (popupRef.value && !popupRef.value.contains(event.target)) {
      emit('update:isVisible', false)
    }
  }
  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside)
  })
</script>

<template>
  <transition :name="animationName">
    <div
      ref="popupRef"
      v-if="isVisible"
      class="popup-notification"
      :style="positionStyles"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<style scoped>
  .popup-notification {
    box-sizing: border-box;
  }

  /* Анимации для всех позиций */
  .slide-top-enter-active,
  .slide-top-leave-active,
  .slide-bottom-enter-active,
  .slide-bottom-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-top-right-enter-active,
  .slide-top-right-leave-active,
  .slide-top-left-enter-active,
  .slide-top-left-leave-active,
  .slide-bottom-right-enter-active,
  .slide-bottom-right-leave-active,
  .slide-bottom-left-enter-active,
  .slide-bottom-left-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .slide-top-enter-from,
  .slide-top-leave-to {
    opacity: 0;
    transform: translate(-50%, -20px);
  }

  .slide-bottom-enter-from,
  .slide-bottom-leave-to {
    opacity: 0;
    transform: translate(-50%, 20px);
  }

  .slide-left-enter-from,
  .slide-left-leave-to {
    opacity: 0;
    transform: translate(-20px, -50%);
  }

  .slide-right-enter-from,
  .slide-right-leave-to {
    opacity: 0;
    transform: translate(20px, -50%);
  }

  .slide-top-right-enter-from,
  .slide-top-right-leave-to {
    opacity: 0;
    transform: translate(20px, -20px);
  }

  .slide-top-left-enter-from,
  .slide-top-left-leave-to {
    opacity: 0;
    transform: translate(-20px, -20px);
  }

  .slide-bottom-right-enter-from,
  .slide-bottom-right-leave-to {
    opacity: 0;
    transform: translate(20px, 20px);
  }

  .slide-bottom-left-enter-from,
  .slide-bottom-left-leave-to {
    opacity: 0;
    transform: translate(-20px, 20px);
  }
</style>
