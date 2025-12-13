<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Popup from '../Popup.vue';
  import ButtonSelector from '~/components/custom/ButtonSelector.vue';
  import DotsDropdown from '~/components/custom/DotsDropdown.vue';
  import MyTooltip from '~/components/custom/MyTooltip.vue';
  import BtnIcon from '~/components/custom/BtnIcon.vue';
  import DynamicForm from '~/components/custom/DynamicForm.vue';
  import Button from '@/components/ui/button/Button.vue';
  import { getVacancyName } from '@/src/api/vacancies';
  import { deleteCandidate, updateCandidate } from '@/src/api/candidates';
  import { usePopups } from '@/composables/usePopup';
  import type { Candidate, CandidateUpdateRequest } from '@/types/candidates';
  import type { FormConfig } from '@/types/form';
  import {
    normalizeUsername,
    prepareUsernameForApi,
  } from '@/helpers/messengers';

  const props = defineProps<{
    candidate: Candidate;
    isFunnel: boolean;
  }>();

  const router = useRouter();
  const vacancyName = ref<string>('');
  const selectedLabel = ref<string>('Подумать');
  const candidateEditForm = ref<Record<string, any>>({});
  const serverErrors = ref<Record<string, string>>({});
  const isSubmitting = ref(false);
  const isSuccess = ref(false);
  const successMessage = ref('');

  const emailFormConfig: FormConfig = {
    fields: [
      {
        name: 'subject',
        label: 'Тема письма',
        type: 'text',
        placeholder: 'Например: Приглашаем на вакансию',
        validation: {
          required: true,
          message: 'Тема письма обязательна для заполнения',
        },
      },
      {
        name: 'body',
        label: 'Содержание письма',
        type: 'textarea',
        placeholder: 'Начните вводить...',
        validation: {
          required: true,
          minLength: 10,
          message: 'Напишите хоть что-нибудь... Не менее 10 символов',
        },
      },
    ],
  };

  const candidateFormConfig: FormConfig = {
    fields: [
      {
        name: 'firstname',
        label: 'Имя',
        type: 'text',
        placeholder: 'Введите имя',
        required: true,
        row: 1,
        colSpan: 4,
        validation: {
          required: true,
          message: 'Имя обязательно для заполнения',
          minLength: 3,
        },
      },
      {
        name: 'surname',
        label: 'Фамилия',
        type: 'text',
        placeholder: 'Введите фамилию',
        required: false,
        row: 1,
        colSpan: 4,
        validation: {
          required: false,
        },
      },
      {
        name: 'patronymic',
        label: 'Отчество',
        type: 'text',
        placeholder: 'Введите отчество',
        required: false,
        row: 1,
        colSpan: 4,
        validation: {
          required: false,
        },
      },
      {
        name: 'resume',
        label: 'Название резюме',
        type: 'text',
        placeholder: 'Например, Менеджер по продажам',
        row: 2,
      },
      {
        name: 'email',
        label: 'Электронная почта',
        type: 'email',
        placeholder: 'Введите email',
        required: true,
        row: 3,
        validation: {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Введите корректный email',
        },
      },
      {
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        placeholder: '+7',
        defaultValue: '+7',
        row: 4,
        validation: {
          pattern: /^\+7\d{10}$/,
          message: 'Введите корректный номер телефона (+7XXXXXXXXXX)',
        },
      },
      {
        name: 'telegram',
        label: 'Телеграм',
        type: 'text',
        placeholder: '@имя_пользователя',
        row: 5,
        colSpan: 6,
        validation: {
          custom: (value: string) => {
            if (!value) return null;

            const cleanValue = normalizeUsername(value);

            if (!cleanValue) return null; // Пустое значение допустимо

            // Проверяем формат username (без @)
            if (!/^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(cleanValue)) {
              return 'Имя пользователя должно быть от 5 до 32 символов, начинаться с буквы и содержать только латинские буквы, цифры и подчеркивания';
            }

            // Дополнительные проверки
            if (cleanValue.includes('__')) {
              return 'Имя пользователя не может содержать двойные подчеркивания';
            }

            if (cleanValue.endsWith('_')) {
              return 'Имя пользователя не может заканчиваться подчеркиванием';
            }

            return null;
          },
        },
      },
      {
        name: 'messengerMax',
        label: 'Max',
        type: 'text',
        placeholder: '@имя_пользователя или номер телефона',
        row: 5,
        colSpan: 6,
        validation: {
          custom: (value: string) => {
            if (!value) return null;

            const cleanValue = normalizeUsername(value);

            if (!cleanValue) return null;

            // Проверяем, это username или номер телефона
            const isUsername = /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(cleanValue);
            const isPhone = /^\+?[1-9]\d{1,14}$/.test(cleanValue);

            if (isUsername) {
              // Дополнительные проверки для username
              if (cleanValue.includes('__') || cleanValue.endsWith('_')) {
                return 'Некорректное имя пользователя';
              }
              return null;
            }

            if (isPhone) {
              // Дополнительная проверка для российского формата
              if (
                cleanValue.startsWith('+7') &&
                !/^\+7\d{10}$/.test(cleanValue)
              ) {
                return 'Российский номер должен быть в формате +7XXXXXXXXXX';
              }
              return null;
            }

            return 'Введите корректное имя пользователя (5-32 символа) или номер телефона';
          },
        },
      },
    ],
    submitButtonText: 'Сохранить изменения',
    cancelButtonText: 'Отмена',
    showCancelButton: true,
  };

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

  const emit = defineEmits<{
    'candidate-updated': [candidate: Candidate];
    'candidate-deleted': [id: number];
  }>();

  const popups = usePopups({
    deleteCandidate: {
      manageBodyScroll: true,
      onClose: () => {
        console.log('Попап удаления закрыт');
      },
    },
    editCandidate: {
      manageBodyScroll: true,
      onClose: () => {
        candidateEditForm.value = {};
        serverErrors.value = {};
        isSubmitting.value = false;
        console.log('Попап редактирования данных кандидата закрыт');
      },
    },
    mailToCandidate: {
      manageBodyScroll: true,
      onClose: () => {
        console.log('Попап отправки почты закрыт');
      },
    },
  });

  const confirmDelete = async () => {
    try {
      await deleteCandidate(props.candidate.id);
      // alert('Кандидат успешно удален');
      emit('candidate-deleted', props.candidate.id);
      router.push('/candidates');
    } catch (error) {
      console.error('Ошибка при удалении кандидата:', error);
      alert('Не удалось удалить кандидата');
    } finally {
      popups.deleteCandidate.close();
    }
  };

  const sendEmail = (data: Record<string, any>) => {
    console.log('send email', data);
  };

  const parseServerErrors = (error: any): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (error.response?.status === 409) {
      const message = error.response._data?.message || error.message || '';
      if (message.toLowerCase().includes('mail')) {
        errors.email = 'Кандидат с таким email уже существует';
      }
      if (
        message.toLowerCase().includes('телефон') ||
        message.toLowerCase().includes('phone')
      ) {
        errors.email =
          'Кандидат с таким адресом электронной почты уже существует';
      }
      if (Object.keys(errors).length === 0) {
        errors._general = message || 'Кандидат с такими данными уже существует';
      }
    }

    if (error.response?.status === 422) {
      const responseErrors = error.response._data?.errors || {};
      Object.keys(responseErrors).forEach(field => {
        errors[field] = Array.isArray(responseErrors[field])
          ? responseErrors[field][0]
          : responseErrors[field];
      });
    }

    if (!errors._general && error.message) {
      errors._general = error.message;
    }

    return errors;
  };

  // Обработчики событий
  // Удалить кандидата
  const handleDeleteCandidate = () => {
    popups.deleteCandidate.open();
  };

  const handleFormSubmit = async (formData: Record<string, string>) => {
    if (!popups.editCandidate.isOpen.value) {
      console.warn('[handleFormSubmit] Попап закрыт, прерываем обработку');
      return;
    }

    isSubmitting.value = true;
    serverErrors.value = {};

    try {
      const updateData: CandidateUpdateRequest = {
        firstname: formData.firstname,
        surname: formData.surname || '',
        patronymic: formData.patronymic || null,
        email: formData.email,
        phone:
          formData.phone && formData.phone !== '+7' ? formData.phone : null,
        resume: formData.resume || null,
        messengerMax: prepareUsernameForApi(formData.messengerMax),
        telegram: prepareUsernameForApi(formData.telegram),
      };

      const response = await updateCandidate(props.candidate.id, updateData);
      if (response && typeof response === 'object' && response.data) {
        isSuccess.value = true;
        successMessage.value = 'Данные кандидата успешно обновлены';

        setTimeout(() => {
          isSuccess.value = false;
          popups.editCandidate.close();
        }, 2000);
        emit('candidate-updated', response.data.data as Candidate);

        popups.editCandidate.close();
      } else {
        console.warn('[handleFormSubmit] Неожиданный формат ответа:', response);
        const errorMessage =
          typeof response === 'string'
            ? response
            : response.message || 'Неизвестная ошибка сервера';

        const errors = parseServerErrors({
          message: errorMessage,
          response: {
            status: 500,
            _data: { message: errorMessage },
          },
        });
        serverErrors.value = errors;
      }
    } catch (error: any) {
      console.error(
        '[handleFormSubmit] Ошибка при обновлении кандидата:',
        error
      );
      const errors = parseServerErrors(error);
      serverErrors.value = errors;
    } finally {
      isSubmitting.value = false;
    }
  };

  const handleFormCancel = () => {
    popups.editCandidate.close();
  };

  const handleShareCandidate = () => {
    // Вариант 1: Копирование ссылки в буфер обмена
    const candidateUrl = `${window.location.origin}/candidates/${props.candidate.id}`;
    navigator.clipboard
      .writeText(candidateUrl)
      .then(() => {
        // Показать уведомление об успехе
        alert('Ссылка на кандидата скопирована в буфер обмена');
      })
      .catch(error => {
        console.error('Ошибка при копировании:', error);
        alert('Не удалось скопировать ссылку');
      });

    // Вариант 2: Открыть модальное окно с опциями шаринга
    // showShareDialog.value = true;
  };

  // Редактировать
  const handleEditCandidate = () => {
    candidateEditForm.value = {
      firstname: props.candidate.firstname || '',
      surname: props.candidate.surname || '',
      patronymic: props.candidate.patronymic || '',
      email: props.candidate.email || '',
      phone: props.candidate.phone || '',
      resume: props.candidate.resume || '',
      messengerMax: normalizeUsername(props.candidate.messengerMax),
      telegram: normalizeUsername(props.candidate.telegram),
    };

    serverErrors.value = {};

    popups.editCandidate.open();
  };

  // Файл резюме
  const handleResumeFile = () => {
    if (props.candidate.resumePath) {
      // Скачать файл резюме
      window.open(props.candidate.resumePath, '_blank');
    } else if (props.candidate.attachments?.length) {
      // Открыть первый файл вложения
      window.open(props.candidate.attachments[0].link, '_blank');
    } else {
      alert('Резюме не найдено');
    }
  };

  // Переместить в вакансию
  const handleMoveToVacancy = () => {
    // Открыть диалог выбора вакансии
  };

  // Копировать в вакансию
  const handleCopyToVacancy = () => {
    // Открыть диалог выбора вакансии
  };

  // Отправить сообщение
  const handleSendMessage = () => {
    // Переход в чат с кандидатом
    router.push(`/candidates/${props.candidate.id}?tab=chat`);

    // Или открыть модальное окно отправки сообщения
    // showMessageDialog.value = true;
  };

  // Отправить на оценку
  const handleSendForEvaluation = () => {
    // Открыть диалог выбора получателя оценки
  };

  const handleSelectItem = (item: string) => {
    switch (item) {
      case 'Поделиться кандидатом':
        handleShareCandidate();
        break;
      case 'Редактировать':
        handleEditCandidate();
        break;
      case 'Файл резюме':
        handleResumeFile();
        break;
      case 'Переместить в вакансию':
        handleMoveToVacancy();
        break;
      case 'Копировать в вакансию':
        handleCopyToVacancy();
        break;
      case 'Отправить сообщение':
        handleSendMessage();
        break;
      case 'Отправить на оценку {-}':
        handleSendForEvaluation();
        break;
      case 'Удалить':
        handleDeleteCandidate();
        break;
      default:
        console.warn('Неизвестное действие:', item);
    }
  };

  const handleClickAddComment = () => {
    console.log('click add comment');
  };

  const handleClickNewTask = () => {
    console.log('click new task');
  };

  const handleClickEmail = () => {
    popups.mailToCandidate.open();
  };

  const handleClickRefuse = () => {
    console.log('click refuse');
  };

  const handleClickAddTag = () => {
    console.log('click add tag');
  };

  const handleClickTelegram = () => {
    if (props.candidate?.telegram) {
      window.open(`https://t.me/${props.candidate?.telegram}`, '_blank');
    }
  };

  onMounted(async () => {
    if (props.candidate?.vacancy) {
      vacancyName.value = await getVacancyName(
        props.candidate?.vacancy.toString()
      );
    } else {
      vacancyName.value = 'Вакансия не определена';
    }
    popups.editCandidate.close();
    popups.deleteCandidate.close();
    popups.mailToCandidate.close();
  });
</script>

<template>
  <div class="relative mb-15px rounded-fifteen bg-white p-25px pt-15px">
    <div
      class="mb-[41px] flex"
      :class="{ 'justify-between': isFunnel, 'justify-end': !isFunnel }"
    >
      <ButtonSelector
        v-if="isFunnel"
        :options="options"
        v-model="selectedLabel"
      />
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
          @click="handleClickRefuse"
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
    <Popup
      :isOpen="popups.deleteCandidate.isOpen"
      @close="popups.deleteCandidate.close"
      width="790px"
      :showCloseButton="false"
      :lgSize="true"
    >
      <div class="gap-y-35px">
        <h2 class="mb-10px text-20px font-semibold leading-normal text-space">
          Подтверждение удаления
        </h2>
        <p class="mb-25px text-sm text-slate-custom">
          Вы действительно хотите удалить кандидата {{ candidate.surname }}
          {{ candidate.firstname }}?
        </p>
        <div class="flex gap-x-15px">
          <Button
            variant="destructive"
            class="px-20px py-11.5px font-medium"
            @click="confirmDelete"
          >
            Удалить
          </Button>
          <Button
            variant="outline"
            class="px-20px py-11.5px font-medium"
            @click="popups.deleteCandidate.close"
          >
            Отмена
          </Button>
        </div>
      </div>
    </Popup>
    <Popup
      :isOpen="popups.mailToCandidate.isOpen"
      @close="popups.mailToCandidate.close"
      width="790px"
      :showCloseButton="false"
      :lgSize="true"
    >
      <div class="gap-y-35px">
        <h2 class="mb-25px text-20px font-semibold leading-normal text-space">
          Письмо кандидату
        </h2>
        <DynamicForm
          :config="emailFormConfig"
          @submit="sendEmail"
          @cancel="popups.mailToCandidate.close"
        />
      </div>
    </Popup>
    <Popup
      :isOpen="popups.editCandidate.isOpen"
      @close="popups.editCandidate.close"
      width="790px"
      :showCloseButton="false"
      :lgSize="true"
    >
      <div class="gap-y-35px">
        <h2 class="mb-25px text-20px font-semibold leading-normal text-space">
          Редактировать кандидата
        </h2>
        <!-- Сообщение об успехе -->
        <transition name="fade">
          <div
            v-if="isSuccess"
            class="border-green-200 bg-green-50 text-green-700 mb-4 flex items-center gap-2 rounded-ten border p-4"
          >
            <svg
              class="h-5 w-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span>{{ successMessage }}</span>
          </div>
        </transition>
        <transition name="fade">
          <div
            v-if="serverErrors._general"
            class="mb-4 flex items-start gap-2 rounded-ten border border-red-200 bg-red-50 p-4 text-red-700"
          >
            <svg
              class="mt-0.5 h-5 w-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
            <div class="flex-1">
              <p class="font-medium">Ошибка</p>
              <p class="text-sm">{{ serverErrors._general }}</p>
            </div>
            <button
              @click="serverErrors._general = ''"
              class="ml-2 text-red-700 hover:text-red-900"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
        </transition>
        <DynamicForm
          :config="candidateFormConfig"
          :model-value="candidateEditForm"
          :server-errors="serverErrors"
          :loading="isSubmitting"
          @submit="handleFormSubmit"
          @cancel="handleFormCancel"
        />
        <div
          v-if="isSuccess"
          class="border-green-200 bg-green-50 text-green-700 mb-4 rounded-ten border p-4"
        >
          {{ successMessage }}
        </div>

        <div
          v-if="serverErrors._general"
          class="mb-4 rounded-ten border border-red-200 bg-red-50 p-4 text-red-700"
        >
          {{ serverErrors._general }}
        </div>
      </div>
    </Popup>
  </div>
</template>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
