<script setup lang="ts">
  import { ref } from 'vue';
  import ButtonSelector from '~/components/custom/ButtonSelector.vue';
  import DotsDropdown from '~/components/custom/DotsDropdown.vue';
  import MyTooltip from '~/components/custom/MyTooltip.vue';
  import BtnIcon from '~/components/custom/BtnIcon.vue';
  import { getVacancyName } from '@/src/api/vacancies';

  import type { Candidate } from '@/types/candidates';
  import type { ApiResponseVacancy, Vacancy } from '@/types/vacancy';

  const props = defineProps<{
    candidate: Candidate;
  }>();

  const vacancyName = ref<string>('');

  vacancyName.value = await getVacancyName(
    props.candidate?.vacancy?.toString() || '0'
  );

  const options = [
    'Все',
    'Не разобранное',
    'Подумать',
    'Подходящие',
    'Отклоненные',
    'Служба безопасности',
  ];

  const dropdownOptions = [
    'Поделиться кандидатом',
    'Редактировать',
    'Файл резюме',
    'Переместить в вакансию',
    'Копировать в вакансию',
    'Отправить сообщение',
    'Отправить на оценку {-}',
    'Удалить',
  ];

  const selectedLabel = ref<string>('Подумать');

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleClickAddComment = () => {
    console.log('click add comment');
  };

  const handleClickNewTask = () => {
    console.log('click new task');
  };

  const handleClickEmail = () => {
    console.log('click email');
  };

  const handleClickStop = () => {
    console.log('click stop');
  };

  const handleClickAddTag = () => {
    console.log('click add tag');
  };

  const handleClickTelegram = () => {
    if (props.candidate?.telegram) {
      window.open(`https://t.me/${props.candidate?.telegram}`, '_blank');
    }
  };
</script>

<template>
  <div class="relative mb-15px rounded-fifteen bg-white p-25px pt-15px">
    <div class="mb-[41px] flex justify-between">
      <ButtonSelector :options="options" v-model="selectedLabel" />
      <div class="flex gap-x-2.5">
        <BtnIcon
          icon="message20"
          tooltipText="Добавить комментарий"
          @click="handleClickAddComment"
        />
        <BtnIcon
          icon="calendar20"
          tooltipText="Новая задача"
          @click="handleClickNewTask"
        />
        <BtnIcon
          icon="email20"
          tooltipText="Написать письмо"
          @click="handleClickEmail"
        />
        <BtnIcon
          icon="stop20"
          tooltipText="Отказать кандидату"
          classes="flex-center cursor-pointer rounded-ten border p-10.5px transition-colors"
          isHoveredClasses="border-red-custom bg-red-custom text-white"
          isNotHoveredClasses="border-border-pink bg-pink text-red-custom"
          @click="handleClickStop"
        />
        <div>
          <MyTooltip text="Еще действия" />
          <DotsDropdown
            :items="dropdownOptions"
            @select-item="handleSelectItem"
          />
        </div>
      </div>
    </div>
    <div class="absolute left-0 top-[70px] h-[1px] w-full bg-athens-gray"></div>
    <div class="flex justify-between">
      <div>
        <div class="mb-2 text-25px font-bold leading-normal text-space">
          {{ candidate.surname }} {{ candidate.firstname }}
          {{ candidate?.patronymic }}
        </div>
        <div class="mb-6px text-15px font-medium leading-normal text-space">
          {{ vacancyName }}
        </div>
        <div class="mb-6 text-13px text-slate-custom">
          {{
            candidate.location ? 'г. ' + candidate.location : 'Город не указан'
          }}
        </div>
        <div v-if="candidate.phone" class="flex">
          <div
            class="mb-5px mr-[45px] min-w-[70px] text-sm font-normal leading-150 text-space"
          >
            Телефон:
          </div>
          <div class="mr-2.5 flex">
            <span class="mr-4 text-sm font-medium text-space">
              <a :href="`tel:${candidate.phone}`">
                <!-- <svg-icon name="phone20" width="21" height="21" /> -->
                {{
                  candidate.phone.slice(0, 2) +
                  '-' +
                  candidate.phone.slice(2, 5) +
                  '-' +
                  candidate.phone.slice(5, 8) +
                  '-' +
                  candidate.phone.slice(8, 12)
                }}
              </a>
            </span>
            <div v-if="candidate.telegram">
              <button class="mr-1" @click="handleClickTelegram">
                <svg-icon
                  class="pointer-events-none [&_use]:pointer-events-none"
                  name="tg20"
                  width="21"
                  height="21"
                />
              </button>
              <!-- <button class="mr-1">
                <svg-icon
                  class="pointer-events-none"
                  name="viber20"
                  width="21"
                  height="21"
                />
              </button>
              <button>
                <svg-icon
                  class="pointer-events-none"
                  name="wh20"
                  width="21"
                  height="21"
                />
              </button> -->
            </div>
          </div>
        </div>
        <div class="flex">
          <span
            class="mb-5px mr-[45px] min-w-[70px] text-sm font-normal leading-150 text-space"
          >
            Почта:
          </span>
          <span class="text-sm font-medium text-space">
            {{ candidate.email }}
          </span>
        </div>
        <div class="flex">
          <span
            class="mb-5px mr-[45px] min-w-[70px] text-sm font-normal leading-150 text-space"
          >
            Скайп:
          </span>
          <span class="text-sm font-medium text-space">
            {{ candidate.skype }}
          </span>
        </div>
        <div class="flex">
          <span
            class="mb-5px mr-[45px] min-w-[70px] text-sm font-normal leading-150 text-space"
          >
            Telegram:
          </span>
          <span class="text-sm font-medium text-space">
            {{ candidate.telegram ? '@' + candidate.telegram : '' }}
          </span>
        </div>
        <div class="flex">
          <span
            class="mr-[45px] min-w-[70px] text-sm font-normal leading-150 text-space"
          >
            Теги:
          </span>
          <div class="flex">
            <span
              v-for="(tag, index) in candidate?.tags"
              :key="index"
              class="mr-2 text-sm font-medium text-dodger"
            >
              {{ tag }}
            </span>
            <button
              :class="{
                'ml-2.5': candidate?.tags && candidate?.tags?.length > 0,
              }"
              class="flex items-center text-slate-custom"
              @click="handleClickAddTag"
            >
              <svg-icon
                name="plus-gray20"
                width="18"
                height="17"
                class="mr-5px"
              />
              <span class="text-sm font-medium">Добавить</span>
            </button>
          </div>
        </div>
      </div>
      <div class="h-[200px] w-[200px]">
        <img
          :src="candidate.imagePath || '/img/default-avatar.png'"
          alt="Фото кандидата"
          class="h-full w-full rounded-fifteen bg-catskill object-contain"
        />
      </div>
    </div>
  </div>
</template>
