<script setup lang="ts">
  import { ref, onMounted, watch, type Ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getCandidateById } from '@/src/api/candidates';

  import UiDotsLoader from '@/components/custom/UiDotsLoader.vue';

  import BlockCandidateInfo from '~/components/custom/page-parts/BlockCandidateInfo.vue';
  import BlockCandidateTabsInfo from '~/components/custom/page-parts/BlockCandidateTabsInfo.vue';

  import { dateStringToDots, formatDate } from '@/helpers/date';
  import type { ApiResponseById, Candidate } from '@/types/candidates';
  import type { SelectedLabel } from '@/types/ui-components';

  // import {
  //   getProfile as profileHh,
  //   getResponse,
  //   getData,
  // } from '@/utils/hhAccount';

  // get current route from candidateFull
  const route = useRoute();
  const router = useRouter();

  // get current index from candidateFull
  // Тут currentIndex и totalCandidates НЕ МОЖЕМ корректно посчитать без списка всех кандидатов!
  // Можно временно использовать заглушки:
  const currentIndex = ref(0); // пока 0

  // get total candidates from candidateFull
  const totalCandidates = ref(1); // пока 1

  // if candidate not found, throw 404 error
  if (currentIndex.value === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Candidate not found',
    });
  }

  const candidate = ref<Candidate | null>(null);
  const loading = ref(true);

  const selectedLabel = ref<string>('Подумать');

  // const timelineGroups = ref([
  //   {
  //     date: '13/12/2025',
  //     events: [
  //       {
  //         id: 1,
  //         type: 'system',
  //         time: '18.01.2024 15:04',
  //         content: 'создан кандидат Анатольев Дмитрий Корсаров',
  //       },
  //       {
  //         id: 2,
  //         type: 'system',
  //         time: '18.01.2024 15:04',
  //         content:
  //           'кандидат Анатольев Дмитрий Корсаров откликнулся на вакансию Консультант продавцов',
  //       },
  //       {
  //         id: 3,
  //         type: 'system',
  //         time: '18.01.2024 15:04',
  //         content:
  //           'Перемещение на этап Подумать пользователем Анатолий Семенов',
  //       },
  //     ],
  //   },
  //   {
  //     date: 'Сегодня',
  //     events: [
  //       {
  //         id: 4,
  //         type: 'call',
  //         calls: [
  //           {
  //             time: '18.01.2024 15:04',
  //             candidateName: 'Марго Роби',
  //           },
  //           {
  //             time: '18.01.2024 15:04',
  //             candidateName: 'Марго Роби',
  //           },
  //         ],
  //       },
  //       {
  //         id: 5,
  //         type: 'note',
  //         time: '18.01.2024 15:04',
  //         author: 'Анатолий Семенов',
  //         content:
  //           'Кандидат утверждает что у него есть знакомые которые работали в компании и отзываются не очень хорошо, но самому ему все нравится. Ему нужно время подумать.',
  //       },
  //       {
  //         id: 6,
  //         type: 'task',
  //         time: '18.01.2024 15:04',
  //         user: 'Анатолий Семенов',
  //         title: 'Интервью с кандидатом',
  //         scheduled: '13/02/2024 в 13:30',
  //       },
  //       {
  //         id: 7,
  //         type: 'email',
  //         emails: [
  //           {
  //             time: '18.01.2024 15:04',
  //             direction: 'входящее',
  //             from: 'Анатолий Семенов',
  //             to: 'Марго Роби',
  //             subject: 'Реквизиты компании',
  //             content: `Здравствуйте, [Имя клиента]! Для завершения оформления документов нам необходимо уточнить ваши реквизиты. Пожалуйста, отправьте следующую информацию: [Запрашиваемые данные, например: название организации, ИНН, расчётный счёт и т.д.] Если у вас возникнут вопросы, буду рад помочь! Спасибо за оперативность. С уважением, [Ваше имя] [Ваша должность] [Контактные данные]`,
  //           },
  //           {
  //             time: '18.01.2024 15:04',
  //             direction: 'входящее',
  //             from: 'Марго Роби',
  //             to: 'Анатолий Семенов',
  //             status: 'Доставлено',
  //             subject: 'Реквизиты компании',
  //             content: `Благодарю за обращение. Вот реквизиты нашей компании: Название организации: [Название] ИНН: [Ваш ИНН] КПП: [Ваш КПП] Расчётный счёт: [Ваш счёт] Банк: [Название банка] БИК: [Ваш БИК] Корреспондентский счёт: [Ваш корр. счёт] Если потребуется дополнительная информация, пожалуйста, дайте знать. С уважением, [Имя клиента] [Должность, если есть] [Контактные данные] [Запрашиваемые данные, например: название организации, ИНН, расчётный счёт и т.д.] Если у вас возникнут вопросы, буду рад помочь! Спасибо за оперативность. С уважением, [Ваше имя] [Ваша должность] [Контактные данные]`,
  //           },
  //         ],
  //       },
  //       {
  //         id: 8,
  //         type: 'email',
  //         emails: [
  //           {
  //             time: '18.01.2024 15:04',
  //             direction: 'входящее',
  //             from: 'Марго Роби',
  //             to: 'Анатолий Семенов',
  //             subject: 'Другая тема письма',
  //             content: `Здравствуйте, [Имя клиента]! Для завершения оформления документов нам необходимо уточнить ваши реквизиты. Пожалуйста, отправьте следующую информацию: [Запрашиваемые данные, например: название организации, ИНН, расчётный счёт и т.д.] Если у вас возникнут вопросы, буду рад помочь! Спасибо за оперативность. С уважением, [Ваше имя] [Ваша должность] [Контактные данные]`,
  //           },
  //         ],
  //       },
  //       {
  //         id: 9,
  //         type: 'hh_chat',
  //         time: '18.01.2024 15:04',
  //         author: 'Марго Роби',
  //         company: 'ООО КОМПАНИЯ',
  //         content: 'Здравствуйте! Посмотрите пожалуйста мой отклик',
  //         initials: 'СК',
  //       },
  //       {
  //         id: 10,
  //         type: 'telegram',
  //         time: '18.01.2024 15:04',
  //         author: 'Марго Роби',
  //         content:
  //           'Здравствуйте, как думаете, с моими скиллами какие у меня есть шансы попасть к вам на работу?',
  //         initials: 'МР',
  //       },
  //       {
  //         id: 11,
  //         type: 'whatsapp',
  //         time: '18.01.2024 15:04',
  //         author: 'Марго Роби',
  //         content:
  //           'Здравствуйте, как думаете, с моими скиллами какие у меня есть шансы попасть к вам на работу?',
  //         initials: 'МР',
  //       },
  //       {
  //         id: 12,
  //         type: 'comment',
  //         time: '18.01.2024 15:04',
  //         author: 'Марго Роби',
  //         content:
  //           'Коллеги, кандидат не плохой, давайте рассмотрим его под микроскопом?',
  //         initials: 'АС',
  //       },
  //     ],
  //   },
  // ])

  // fnc for check load data

  // function sanitazeCandidate(data) {
  //   if (!data) return null;

  //   let address = data?.area.name ? `г. ${data?.area.name}` : '';
  //   address += data?.metro?.name ? `, м. ${data.metro.name}` : '';

  //   return {
  //     id: data.id ?? null,
  //     created: data.created_at ?? null,
  //     age: data.age ?? null,
  //     firstName: data.first_name ?? '',
  //     surname: data.last_name ?? '',
  //     patronymic: data.patronymic ?? '',
  //     email: data.contact
  //       ? data.contact.find(function (value) {
  //           return value.kind === 'email';
  //         })?.contact_value
  //       : '',
  //     phone: data.contact
  //       ? data.contact.find(function (value) {
  //           return value.kind === 'phone';
  //         })?.contact_value
  //       : '',
  //     location: data?.area.name ?? '',
  //     vacancy: data.title ?? '',
  //     gender: data.gender.name ?? '',
  //     status: data.status ?? '',
  //     skills: data.skill_set ?? [],
  //     experience: data.experience ?? '',
  //     skype: data.skype ?? '',
  //     telegram: data.telegram ?? '',
  //     tags: data.tags ?? '',
  //     quickInfo: data.quickInfo ?? '',
  //     education: data.education ?? '',
  //     attachedFiles: data.attachments ?? [],
  //     links: [
  //       // 'www.testlink-null.com',
  //       // 'www.testlink-one.com',
  //       // 'www.testlink-second.com',
  //     ],
  //     header: data.title ?? '',
  //     locationFull: address,
  //     educationLevel: data.education.level.name ?? '',
  //     resumeDownloadLink: data.resumeDownloadLink ?? '',
  //     coverLetter: data.coverPath ?? '',
  //     comments: data.comments ?? [],
  //     timeline: data.timeline ?? [],
  //     customFields: data.customFields ?? null,
  //     customer: data.customer ?? null,
  //     icon: data.icon ?? null,
  //     photo: data.photo?.medium !== null ? data.photo?.medium : null,
  //   };
  // }

  const loadCandidate = async (id: number) => {
    loading.value = true;
    try {
      const { candidateData, candidateExtra }: ApiResponseById =
        await getCandidateById(id);
      candidate.value = candidateData;
    } catch (error) {
      console.error(error);
      throw createError({
        statusCode: 404,
        statusMessage: 'Candidate not found',
      });
    } finally {
      loading.value = false;
    }
  };

  loadCandidate(parseInt(route.params.id as string));

  const goToPrevious = () => {
    if (candidate.value) {
      const prevId = candidate.value?.id - 1;
      if (prevId >= 0) router.push(`/candidates/${prevId}`);
    }
  };

  const goToNext = () => {
    if (candidate.value) {
      const nextId = candidate.value?.id + 1;
      if (nextId > 0) router.push(`/candidates/${nextId}`);
    }
  };
</script>

<template>
  <div class="container py-25px">
    <div class="mb-25px flex items-center justify-between">
      <NuxtLink to="/candidates" class="text-blue-500 hover:underline">
        <div class="flex items-center justify-center gap-2.5">
          <svg-icon name="arrow-left-dodger" width="18" height="18" />
          <span class="text-sm font-medium text-dodger">
            Вернуться к списку
          </span>
        </div>
      </NuxtLink>
      <div class="flex items-center gap-2.5">
        <!-- Кнопка "Назад" -->
        <button
          class="rounded-ten bg-white p-2.5 text-slate-custom"
          :class="{ 'cursor-auto opacity-0': currentIndex === 0 }"
          :disabled="currentIndex === 0"
          @click="goToPrevious"
        >
          <svg-icon name="pagination-arrow-left" width="20" height="20" />
        </button>

        <!-- Индикатор текущей позиции -->
        <div
          class="rounded-ten bg-white px-15px py-3 text-13px font-bold leading-normal text-space"
        >
          <span>{{ currentIndex + 1 }}</span>
          из
          <span>{{ totalCandidates }}</span>
        </div>

        <!-- Кнопка "Вперёд" -->
        <button
          class="rounded-ten bg-white p-2.5 text-slate-custom"
          :class="{
            'cursor-auto opacity-0': currentIndex === totalCandidates - 1,
          }"
          :disabled="currentIndex === totalCandidates - 1"
          @click="goToNext"
        >
          <svg-icon name="pagination-arrow-right" width="20" height="20" />
        </button>
      </div>
    </div>
    <div class="w-full" v-if="candidate">
      <BlockCandidateInfo :candidate="candidate" />
      <BlockCandidateTabsInfo :candidate="candidate" />
    </div>
    <div v-else class="absolute left-1/2 top-1/2">
      <UiDotsLoader />
    </div>
  </div>
</template>
