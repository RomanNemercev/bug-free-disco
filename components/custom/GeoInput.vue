<script setup>
  import { ref, watch } from 'vue'
  import debounce from 'lodash/debounce'

  const props = defineProps({
    placeholder: {
      type: String,
      default: 'Например, Санкт-Петербург, Лиговский проспект, д2',
    },
    modelValue: {
      type: String,
      default: '',
    },
  })

  const isFocused = ref(false)

  const currentCity = ref(props.modelValue)
  const cities = ref([
    'Санкт-Петербург, ул. Дорожная, д2',
    'Москва, ул. дорожная д2',
    'Челябинск, проспект дорожный,д2',
    'Пермь, проспект дорожный, д2',
    'Томск, переулок дорожный, д2',
    'Волгоград, дорожный проспект, д2',
  ])

  const filteredCities = ref([])

  const filterCities = debounce(() => {
    const input = currentCity.value.toLowerCase()
    filteredCities.value = cities.value.filter(city =>
      city.toLowerCase().includes(input)
    ) 
    if (!filteredCities.value.length) {
      emit('update:modelValue', currentCity.value)
    } 
  }, 300)

  const clearCity = () => {
    currentCity.value = ''
    filteredCities.value = []
    emit('update:modelValue', '')
  }

  const selectCity = city => {
    currentCity.value = city
    filteredCities.value = []
    isFocused.value = false
    emit('update:modelValue', city)
  }

  const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="geo-input-wrapper">
    <!-- поле ввода -->
    <div class="relative">
      <div class="geo-input-container relative w-full">
        <input
          type="text"
          v-model="currentCity"
          @input="filterCities"
          @focus="isFocused = true"
          @blur="isFocused = false"
          :placeholder="isFocused ? '' : placeholder"
          class="geo-input w-full py-[9px] pl-15px border border-athens rounded-ten bg-athens-gray text-sm font-normal focus:outline-none focus:border focus:border-dodger"
        />
        <button
          class="clear-city absolute top-2/4 right-4 text-slate-custom"
          v-if="currentCity"
          @click="clearCity"
        >
          ✖
        </button>
      </div>
      <transition name="slide-fade">
        <ul
          v-if="filteredCities.length && currentCity"
          class="cities-list absolute w-full bg-white border border-athens rounded-plus shadow-shadow-droplist top-12 z-10"
        >
          <li
            v-for="(city, index) in filteredCities"
            :key="index"
            @mousedown="selectCity(city)"
            class="city text-slate-custom text-sm font-normal py-10px px-15px hover:text-space hover:bg-zumthor cursor-pointer"
          >
            {{ city }}
          </li>
        </ul>
        <div
          v-else-if="currentCity && isFocused"
          class="no-cities absolute w-full bg-white border border-athens rounded-plus shadow-shadow-droplist top-12 z-10"
        >
          <div class="text-slate-custom text-sm font-normal py-10px px-15px">
            Город не найден
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
  .geo-input::placeholder {
    color: #9098b4;
    font-size: 14px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
  }

  .geo-input {
    padding-right: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .clear-city {
    transform: translateY(-50%);
    cursor: pointer;
  }

  .city:not(:last-child) {
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
