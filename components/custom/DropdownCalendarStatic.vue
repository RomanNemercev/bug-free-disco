<template>
  <div class="cursor-pointer w-full relative" ref="dataPicker">
    <div class="dropdown-selected-option relative border border-athens rounded-ten py-7px px-15px bg-athens-gray"
      @click="toggleDropdown" @focus="isFocused = true" @blur="handleBlur" :class="[
        { 'bg-athens-gray': !isError },
        { 'border-red-custom': isError },
        { focused: isFocused },
      ]">
      {{ currectDate }}
      <span v-if="!currectDate" class="color-gray text-sm font-normal">
        {{
          props.dateFrom ? 'Начало периода' :
            props.dateTo ? 'Конец периода' :
              'Выберите дату'
        }}
      </span>
      <div class="absolute right-[15px] top-[11.5px]">
        <transition name="fade-icon" mode="out-in">
          <span :key="props.isOpen">
            <svg-icon :name="isDropDownVisible ? 'calendar-end' : 'calendar-start'"
              :class="isDropDownVisible ? 'text-dodger' : 'text-bali'" width="20" height="20" />
          </span>
        </transition>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="absolute w-max bottom-0 z-10 right-0 top-[54px]" v-if="isDropDownVisible">
        <CalendarBarStatic ref="calendarBar" @update:placeholder="updateDate" @dblclick="isDropDownVisible = false" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CalendarBarStatic from '@/components/custom/CalendarBarStatic.vue';
import { dateStringToDots } from '../../helpers/date'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  dateFrom: {
    type: Boolean,
    default: false
  },
  dateTo: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'isOpen'])
const calendarBar = ref(null)
const dataPicker = ref(null)

const isDropDownVisible = ref(props.isOpen);

const isFocused = ref(false)
const isError = ref(false)

const currectDate = ref(null);

const handleBlur = () => {
  isFocused.value = false
}
const toggleDropdown = () => {
  isDropDownVisible.value = !isDropDownVisible.value
  // emit('isOpen', isDropDownVisible.value)
}

const updateDate = (newDate) => {
  currectDate.value = dateStringToDots(newDate.toString())
  emit('update:modelValue', currectDate.value)
};

watch(() => props.isOpen, (newStatus) => {
  console.log('Новое значение', newStatus)
  isDropDownVisible.value = newStatus
});

// Обработка клика вне компонента
const handleClickOutside = (event) => {
  if (
    isDropDownVisible.value &&
    dataPicker.value &&
    !dataPicker.value.contains(event.target) &&
    calendarBar.value?.$el &&
    !calendarBar.value.$el.contains(event.target)
  ) {
    isDropDownVisible.value = false;
    emit('isOpen', isDropDownVisible.value);
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(
  () => props.isOpen,
  (newStatus) => {
    isDropDownVisible.value = newStatus;
  },
);


// onBeforeUnmount(() => {
//   document.removeEventListener('click', (event) => clickOutside(event, calendareBar, () => isDropDownVisible.value = false))
// })

//  onMounted(() => {
//     document.addEventListener('click', (event) => clickOutside(event, calendareBar, () => {
//       const parentModal = event.target.closest('.shadow-shadow-droplist')
//       if (parentModal == null) {
//         isDropDownVisible.value = false
//       }
//       console.log('event', parentModal)
//     }))
//   })

// const closeCalendar = (event) => {
//   const target = event.target;
//   const isVisible = isDropDownVisible.value;
//   if (!isVisible) {
//     console.log('Дропдаун не виден на момент события, обработка прервана');
//     return;
//   }

//   // Блокируем изменения isDropDownVisible до завершения проверки
//   const originalValue = isDropDownVisible.value;
//   setTimeout(() => {
//     if (originalValue !== isDropDownVisible.value) {
//       console.log('Состояние isDropDownVisible изменилось во время проверки, игнорируем');
//       return;
//     }
//   }, 0);

//   setTimeout(() => {
//     if (!document.contains(target)) {
//       console.log('Элемент клика удалён из DOM после задержки');
//       return;
//     }

//     console.log('Начальный элемент клика:', target.tagName.toLowerCase(), 'Классы:', Array.from(target.classList).join(' '));

//     if (dataPicker.value?.contains(target)) {
//       console.log('Элемент внутри dataPicker, игнорируем:', target.tagName.toLowerCase(), 'Классы:', Array.from(target.classList).join(' '));
//       return;
//     }

//     if (calendarBar.value?.$el?.contains(target)) {
//       console.log('Элемент внутри calendarBar, игнорируем:', target.tagName.toLowerCase(), 'Классы:', Array.from(target.classList).join(' '));
//       return;
//     }

//     const ignoreClasses = ['header-handler', 'calendar-wrapper', 'select-month-custom'];
//     let el = target;
//     let isIgnoredByClass = false;
//     let level = 0;

//     while (el && level < 10) {
//       if (el.classList) {
//         const tagName = el.tagName.toLowerCase();
//         const classes = Array.from(el.classList).join(' ');
//         console.log(`Уровень ${level}: Проверяем элемент: <${tagName} class="${classes}">`);
//         const matchingClasses = ignoreClasses.filter(cls => el.classList.contains(cls));
//         if (matchingClasses.length > 0) {
//           console.log(`Уровень ${level}: Найден игнорируемый класс(ы): ${matchingClasses.join(', ')} на элементе <${tagName} class="${classes}">`);
//           isIgnoredByClass = true;
//           break;
//         }
//       }
//       el = el.parentElement;
//       level++;
//     }

//     if (isIgnoredByClass) {
//       console.log('Элемент проигнорирован по классу, закрытие отменено');
//       return;
//     }

//     console.log('Ни один из условий исключения не выполнен, закрываем дропдаун');
//     isDropDownVisible.value = false;
//     emit('isOpen', isDropDownVisible.value);
//   }, 0);
// };

// onMounted(() => {
//   console.log('dataPicker:', dataPicker.value, 'calendarBar:', calendarBar.value?.$el);
//   window.addEventListener('click', closeCalendar);
// });

// onBeforeUnmount(() => {
//   console.log('Удалён слушатель кликов');
//   window.removeEventListener('click', closeCalendar);
// });
</script>

<style scoped>
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

input {
  border-width: 1px;
  transition: border-color 0.3s;
}

input::placeholder {
  font-size: 14px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
}

.focused {
  border-color: #4a90e2;
}

.border-red-500 {
  border-color: #ef4444;
}

.focused {
  border: 1px solid #5898ff;
  outline: none;
  padding-left: 15px;
  background-image: none;
}

.color-gray {
  color: #9098b4;
}

.fade-icon-enter-active,
.fade-icon-leave-active {
  transition: opacity 0.2s;
}

.fade-icon-enter-from,
.fade-icon-leave-to {
  opacity: 0;
}
</style>