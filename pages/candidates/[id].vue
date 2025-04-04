<template>
  <div class="container py-25px">
    <div class="flex justify-between mb-25px">
      <NuxtLink to="/candidates" class="text-blue-500 hover:underline">
        ← Вернуться к списку
      </NuxtLink>
      <div>кнопки для навигации</div>
    </div>
    <div class="w-full">
      <div class="bg-white rounded-fifteen p-25px relative mb-15px pt-15px">
        <div class="justify-between flex mb-[41px]">
          <ButtonSelector :options="options" v-model="selectedLabel" />
          <div class="flex gap-x-2.5">
            <BtnMessage />
            <BtnCalendar />
            <BtnEmail />
            <BtnStop />
            <div>
              <MyTooltip text="Еще действия" />
              <DotsDropdown :items="dropdownOptions" />
            </div>
          </div>
        </div>
        <div
          class="absolute w-full left-0 h-[1px] bg-athens-gray top-[70px]"
        ></div>
        <div class="flex justify-between">
          <div>
            <p class="text-25px font-bold text-space leading-normal mb-2">
              {{ candidate.surname }} {{ candidate.firstName }}
            </p>
            <p class="text-15px font-medium text-space leading-normal mb-6px">
              {{ candidate.vacancy }}
            </p>
            <p class="text-13px text-slate-custom mb-6">
              г. {{ candidate.location }}
            </p>
            <div class="flex">
              <p
                class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]"
              >
                Телефон:
              </p>
              <div class="mr-2.5 flex">
                <span class="text-sm font-medium text-space mr-4">
                  {{ candidate.phone }}
                </span>
                <div>
                  <button class="mr-1">
                    <svg-icon name="tg20" width="21" height="21" />
                  </button>
                  <button class="mr-1">
                    <svg-icon name="viber20" width="21" height="21" />
                  </button>
                  <button>
                    <svg-icon name="wh20" width="21" height="21" />
                  </button>
                </div>
              </div>
            </div>
            <div class="flex">
              <p
                class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]"
              >
                Почта:
              </p>
              <p class="text-sm font-medium text-space">
                {{ candidate.email }}
              </p>
            </div>
            <div class="flex">
              <p
                class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]"
              >
                Скайп:
              </p>
              <p class="text-sm font-medium text-space">
                {{ candidate.skype }}
              </p>
            </div>
            <div class="flex">
              <p
                class="min-w-[70px] text-sm font-normal text-space leading-150 mb-5px mr-[45px]"
              >
                Telegram:
              </p>
              <p class="text-sm font-medium text-space">
                {{ candidate.telegram }}
              </p>
            </div>
            <div class="flex">
              <p
                class="min-w-[70px] text-sm font-normal text-space leading-150 mr-[45px]"
              >
                Теги:
              </p>
              <div class="flex">
                <span
                  v-for="(tag, index) in candidate.tags"
                  :key="index"
                  class="mr-2 text-dodger text-sm font-medium"
                >
                  {{ tag }}
                </span>
                <button class="text-slate-custom flex items-center ml-2.5">
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
          <div class="w-[200px] h-[200px]">
            <img
              :src="candidate.photo"
              alt="photo of candidate"
              class="rounded-fifteen h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="bg-catskill rounded-t-fifteen py-15px px-25px mb-px">
          <BtnTab :tabs="tabs" v-model="activeTab" />
        </div>
        <div>
          <div v-if="activeTab === 'resume'">
            <div class="mb-px bg-white p-25px pt-[27px]">
              <p class="text-15px text-space font-medium mb-15px">
                Краткие сведения
              </p>
              <p class="text-sm text-slate-custom leading-150">
                {{ candidate.quickInfo }}
              </p>
            </div>
            <div class="mb-px bg-white p-25px">
              <p class="text-15px text-space font-medium mb-4">Образование</p>
              <p class="text-sm text-slate-custom">{{ candidate.education }}</p>
            </div>
            <div class="mb-px bg-white p-25px">
              <p class="text-15px text-space font-medium mb-3.5">Навыки</p>
              <div>
                <div v-if="candidate.skills.length === 0">
                  <p class="text-sm font-normal text-slate-custom">
                    Кандидат не указал навыки
                  </p>
                </div>
                <div v-else class="gap-5px flex flex-wrap">
                  <span
                    v-for="(skill, index) in candidate.skills"
                    :key="index"
                    class="text-13px font-normal text-space px-[10.56px] py-5px rounded-plus bg-athens-gray max-h-[27px] whitespace-nowrap"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
            <div class="bg-white mb-px p-25px pt-27px pb-[23px]">
              <p class="text-15px text-space font-medium mb-15px">
                Прикрепленные файлы
              </p>
              <div v-if="candidate.attachedFiles.length === 0">
                <p class="text-sm font-normal text-slate-custom">
                  Кандидат не прикрепил файлы
                </p>
              </div>
              <div v-else class="flex gap-25px">
                <div
                  v-for="file in candidate.attachedFiles"
                  :key="file.name"
                  class="max-w-[100px]"
                >
                  <a :href="file.path" target="_blank">
                    <span
                      class="bg-zumthor w-[100px] h-[100px] flex items-center justify-center text-sm font-medium text-dodger rounded-tl-fifteen rounded-tr-[35px] rounded-b-fifteen uppercase mb-9px"
                    >
                      {{ file.type }}
                    </span>
                    <div class="flex">
                      <span class="truncate text-sm text-dodger font-medium">
                        {{ file.name }}
                      </span>
                      <span class="text-sm text-dodger font-medium">
                        .{{ file.type }}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-b-fifteen p-25px">
              <p class="text-15px text-space font-medium mb-4">Ссылки</p>
              <div>
                <div v-if="candidate.links.length === 0">
                  <p class="text-sm font-normal text-slate-custom">
                    Кандидат не поделился ссылками
                  </p>
                </div>
                <div v-else>
                  <div v-for="(link, index) in candidate.links" :key="index">
                    <a
                      :href="link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-dodger text-sm font-medium hover:underline"
                    >
                      {{ link }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'fields'">
            <div class="bg-white p-25px pb-[37px] mb-px pl-30px">
              <div class="flex items-center mb-22px">
                <p class="text-lg text-space font-bold mr-2.5 leading-normal">
                  Форма отклика
                </p>
                <span
                  class="rounded-fifteen text-xs font-normal px-2.5 py-[3.5px] bg-feta h-fit"
                >
                  Заполнено
                </span>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Фамилия Имя Отчество
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.surname }} {{ candidate.firstName }}
                  {{ candidate.patronymic || '' }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Электронная почта
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.email }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Телефон
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.phone }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Заголовок
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.header }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Адрес проживания
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.locationFull }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Образование
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.educationLevel }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Опыт работы
                </p>
                <p class="text-sm font-normal text-space leading-150">
                  {{ candidate.experience }}
                </p>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">Фото</p>
                <a
                  :href="candidate.photo"
                  target="_blank"
                  class="text-dodger text-sm font-normal"
                >
                  {{ candidate.photo?.split('/').pop() ?? 'Фото не загружено' }}
                </a>
              </div>
              <div class="flex gap-2.5 mb-5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Загрузка резюме
                </p>
                <a
                  :href="candidate.resumeDownload"
                  target="_blank"
                  class="text-dodger text-sm font-normal"
                >
                  {{
                    candidate.resumeDownload?.split('/').pop() ??
                    'Резюме не загружено'
                  }}
                </a>
              </div>
              <div class="flex gap-2.5">
                <p class="text-sm font-normal text-space min-w-[250px]">
                  Сопроводительное письмо
                </p>
                <a
                  :href="candidate.coverLetter"
                  target="_blank"
                  class="text-dodger text-sm font-normal"
                >
                  {{
                    candidate.coverLetter?.split('/').pop() ??
                    'Файл не загружен'
                  }}
                </a>
              </div>
            </div>
            <div class="bg-white p-25px mb-px pl-30px">
              <div class="flex items-center mb-2.5">
                <p class="text-lg text-space font-bold mr-2.5 leading-normal">
                  Анкета
                </p>
                <span
                  class="rounded-fifteen text-xs font-normal px-2.5 py-[3.5px] bg-serenade h-fit"
                >
                  Отправлено, ожидает заполнения
                </span>
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Фамилия Имя Отчество
                </p>
                <MyInputSecond v-model="newName" />
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Электронная почта
                </p>
                <MyInputSecond v-model="newEmail" type="email" />
              </div>
              <div class="flex gap-2.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Телефон
                </p>
                <PhoneInputSecond v-model="newPhone" />
              </div>
              <div class="flex gap-2.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Заголовок
                </p>
                <MyInputSecond v-model="newHeader" />
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Адрес проживания
                </p>
                <MyInputSecond v-model="newLocation" />
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Образование
                </p>
                <MyInputSecond v-model="newEducation" />
              </div>
              <div class="flex gap-2.5 items-center">
                <p class="text-sm font-normal text-space min-w-[235px]">
                  Опыт работы
                </p>
                <MyInputSecond v-model="newExperience" />
              </div>
              <div class="mb-0.5">
                <FileUpload
                  label="Фото"
                  inputId="photo"
                  @update:file="uploadPhoto = $event"
                />
              </div>
              <div>
                <FileUpload
                  label="Загрузка резюме"
                  inputId="resume"
                  @update:file="uploadResume = $event"
                />
              </div>
              <div>
                <FileUpload
                  label="Сопроводительное письмо"
                  inputId="letter"
                  @update:file="uploadLetter = $event"
                />
              </div>
            </div>
            <div class="bg-white p-25px pl-30px">
              <div class="flex items-center mb-26px">
                <p class="text-lg text-space font-bold mr-2.5 leading-normal">
                  Пользовательские поля
                </p>
                <span
                  class="rounded-fifteen text-xs font-normal px-2.5 py-[3.5px] bg-athens-gray h-fit"
                >
                  Используется в системе
                </span>
              </div>
              <div class="flex gap-2.5 items-center">
                <p class="text-sm font-normal text-space min-w-[240px]">
                  Разряд
                </p>
                <MinDropdownSecond :options="positions" v-model="newPosition" />
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[240px]">Раз</p>
                <MyInputSecond v-model="newCustomFirst" />
              </div>
              <div class="flex gap-2.5 mb-0.5 items-center">
                <p class="text-sm font-normal text-space min-w-[240px]">Два</p>
                <MyInputSecond v-model="newCustomSecond" />
              </div>
              <div class="flex gap-2.5 items-center">
                <p class="text-sm font-normal text-space min-w-[240px]">Три</p>
                <MyInputSecond v-model="newCustomThird" />
              </div>
              <button class="flex items-center gap-x-5px mt-25px">
                <svg-icon name="plus-blue20" width="20" height="20" />
                <span class="text-dodger text-sm font-medium">Добавить</span>
              </button>
            </div>
            <div class="bg-white pb-25px rounded-b-fifteen px-15px">
              <div>
                <UiButton
                  class="mr-15px"
                  variant="semiaction"
                  size="semiaction"
                >
                  Сохранить изменения
                </UiButton>
                <UiButton variant="back" size="back">Отмена</UiButton>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'chat'">
            <div>
              <div class="bg-athens-gray p-25px">
                <ChatDivider text="13/12/2025" />
                <p class="text-13px font-normal text-slate-custom px-20">
                  <span>18.01.2024 15:04</span>
                  создан кандидат Анатольев Дмитрий Корсаров
                </p>
                <p class="text-13px font-normal text-slate-custom px-20">
                  <span>18.01.2024 15:04</span>
                  кандидат Анатольев Дмитрий Корсаров откликнулся на вакансию
                  Консультант продавцов
                </p>
                <p class="text-13px font-normal text-slate-custom px-20">
                  <span>18.01.2024 15:04</span>
                  Перемещение на этап Подумать пользователем Анатолий Семенов
                </p>
                <ChatDivider text="Сегодня" />
                <div
                  class="w-full p-15px bg-white rounded-fifteen flex mb-15px"
                >
                  <div
                    class="shrink-0 w-50px h-50px rounded-full bg-pink flex items-center justify-center mr-15px"
                  >
                    <svg-icon name="missed-call" width="26" height="26" />
                  </div>
                  <div>
                    <p class="text-13px font-normal text-slate-custom">
                      <span>18.01.2024 15:04</span>
                      от кандидата Марго Роби
                    </p>
                    <p class="text-space text-sm font-normal">
                      Пропущенный вызов
                    </p>
                    <p class="text-13px font-normal text-slate-custom">
                      <span>18.01.2024 15:04</span>
                      от кандидата Марго Роби
                    </p>
                    <p class="text-space text-sm font-normal">
                      Пропущенный вызов
                    </p>
                  </div>
                </div>
                <div
                  class="w-full p-15px bg-white rounded-fifteen flex mb-15px"
                >
                  <div
                    class="shrink-0 w-50px h-50px rounded-full bg-athens-gray flex items-center justify-center mr-15px"
                  >
                    <svg-icon name="document" width="26" height="26" />
                  </div>
                  <div>
                    <p class="text-13px font-normal text-slate-custom">
                      <span>18.01.2024 15:04</span>
                      Анатолий Семенов оставил заметку
                    </p>
                    <p class="text-space text-sm font-normal">
                      Кандидат утверждает что у него есть знакомые которые
                      работали в компании и отзываются не очень хорошо, но
                      самому ему все нравится. Ему нужно время подумать.
                    </p>
                  </div>
                </div>
                <div
                  class="w-full p-15px bg-white rounded-fifteen flex mb-15px"
                >
                  <div
                    class="shrink-0 w-50px h-50px rounded-full bg-zumthor flex items-center justify-center mr-15px text-dodger"
                  >
                    <svg-icon name="calendar" width="26" height="26" />
                  </div>
                  <div>
                    <p class="text-13px font-normal text-slate-custom">
                      <span>18.01.2024 15:04</span>
                      для пользователя Анатолий Семенов
                    </p>
                    <div class="flex">
                      <p class="text-sm font-normal text-space min-w-40">
                        Название задачи
                      </p>
                      <p class="text-sm font-normal text-dodger">
                        Интервью с кандидатом
                      </p>
                    </div>
                    <div class="flex">
                      <p class="text-sm font-normal text-space min-w-40">
                        Запланировано:
                      </p>
                      <p class="text-sm font-normal text-dodger">
                        13/02/2024 в 13:30
                      </p>
                    </div>
                    <button class="text-sm text-dodger font-medium">
                      Выполнить
                    </button>
                  </div>
                </div>
                <div
                  class="w-full p-15px bg-white rounded-fifteen flex mb-15px"
                >
                  <div
                    class="shrink-0 w-50px h-50px rounded-full bg-chilean flex items-center justify-center mr-15px text-dodger"
                  >
                    <svg-icon name="mail" width="26" height="26" />
                  </div>
                  <div class="truncate">
                    <div class="mb-15px">
                      <p class="text-13px font-normal text-slate-custom">
                        <span>18.01.2024 15:04</span>
                        входящее письмо от Марго Роби для Анатолий Семенов
                      </p>
                      <div>
                        <p class="underline text-sm font-medium text-space">
                          Реквизиты компании
                        </p>
                        <p class="text-sm font-normal text-space truncate">
                          Здравствуйте, [Имя клиента]! Для завершения оформления
                          документов нам необходимо уточнить ваши реквизиты.
                          Пожалуйста, отправьте следующую информацию:
                          [Запрашиваемые данные, например: название организации,
                          ИНН, расчётный счёт и т.д.] Если у вас возникнут
                          вопросы, буду рад помочь! Спасибо за оперативность. С
                          уважением, [Ваше имя] [Ваша должность] [Контактные
                          данные]
                        </p>
                      </div>
                    </div>
                    <div class="relative">
                      <p class="text-13px font-normal text-slate-custom">
                        <span>18.01.2024 15:04</span>
                        входящее письмо от Марго Роби для Анатолий Семенов
                      </p>
                      <div
                        class="flex absolute right-0 top-0 items-center gap-x-5px"
                      >
                        <svg-icon name="sended" width="15" height="15" />
                        <p class="text-13px font-normal text-slate-custom">
                          Доставлено
                        </p>
                      </div>
                    </div>
                    <div>
                      <p class="underline text-sm font-medium text-space">
                        Реквизиты компании
                      </p>
                      <p class="text-sm font-normal text-space truncate">
                        Благодарю за обращение. Вот реквизиты нашей компании:
                        Название организации: [Название] ИНН: [Ваш ИНН] КПП:
                        [Ваш КПП] Расчётный счёт: [Ваш счёт] Банк: [Название
                        банка] БИК: [Ваш БИК] Корреспондентский счёт: [Ваш корр.
                        счёт] Если потребуется дополнительная информация,
                        пожалуйста, дайте знать. С уважением, [Имя клиента]
                        [Должность, если есть] [Контактные данные]
                        [Запрашиваемые данные, например: название организации,
                        ИНН, расчётный счёт и т.д.] Если у вас возникнут
                        вопросы, буду рад помочь! Спасибо за оперативность. С
                        уважением, [Ваше имя] [Ваша должность] [Контактные
                        данные]
                      </p>
                    </div>
                    <button
                      class="flex items-center text-sm text-dodger gap-x-5px"
                    >
                      <span>
                        <svg-icon name="resend" width="18" height="18" />
                      </span>
                      Отправить письмо
                    </button>
                  </div>
                </div>
                <div
                  class="w-full p-15px bg-white rounded-fifteen flex mb-15px"
                >
                  <div
                    class="shrink-0 w-50px h-50px rounded-full bg-chilean flex items-center justify-center mr-15px text-dodger"
                  >
                    <svg-icon name="mail" width="26" height="26" />
                  </div>
                  <div class="truncate">
                    <p class="text-13px font-normal text-slate-custom">
                      <span>18.01.2024 15:04</span>
                      входящее письмо от Марго Роби для Анатолий Семенов
                    </p>
                    <div>
                      <p class="underline text-sm font-medium text-space">
                        Другая тема письма
                      </p>
                      <p class="text-sm font-normal text-space truncate">
                        Здравствуйте, [Имя клиента]! Для завершения оформления
                        документов нам необходимо уточнить ваши реквизиты.
                        Пожалуйста, отправьте следующую информацию:
                      </p>
                    </div>
                    <button
                      class="flex items-center text-sm text-dodger gap-x-5px"
                    >
                      <span>
                        <svg-icon name="resend" width="18" height="18" />
                      </span>
                      Отправить письмо
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'review'">Рассмотрения</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { candidatesFull } from '~/utils/candidatesFull'

  import ButtonSelector from '~/components/custom/ButtonSelector.vue'
  import BtnMessage from '~/components/custom/BtnMessage.vue'
  import BtnCalendar from '~/components/custom/BtnCalendar.vue'
  import BtnEmail from '~/components/custom/BtnEmail.vue'
  import BtnStop from '~/components/custom/BtnStop.vue'
  import DotsDropdown from '~/components/custom/DotsDropdown.vue'
  import MyTooltip from '~/components/custom/MyTooltip.vue'
  import BtnTab from '~/components/custom/BtnTab.vue'
  import MyInputSecond from '~/components/custom/MyInputSecond.vue'
  import PhoneInputSecond from '~/components/custom/PhoneInputSecond.vue'
  import FileUpload from '~/components/custom/FileUpload.vue'
  import MinDropdownSecond from '~/components/custom/MinDropdownSecond.vue'
  import ChatDivider from '~/components/custom/ChatDivider.vue'

  const route = useRoute()

  const candidate = computed(() => {
    return candidatesFull.find(c => c.id === Number(route.params.id))
  })

  const options = [
    'Все',
    'Не разобранное',
    'Подумать',
    'Подходящие',
    'Отклоненные',
    'Служба безопасности',
  ]

  const positions = [
    {
      id: 'position_1',
      name: '1 разряд',
    },
    {
      id: 'position_2',
      name: '2 разряд',
    },
    {
      id: 'position_3',
      name: '3 разряд 3 разряд',
    },
    {
      id: 'position_4',
      name: '4 разряд',
    },
    {
      id: 'position_5',
      name: '5 разряд',
    },
  ]

  const activeTab = ref('chat') // Начальный таб
  const tabs = [
    { label: 'Резюме', value: 'resume' },
    { label: 'Поля', value: 'fields' },
    { label: 'Общение', value: 'chat', notification: '+1' },
    { label: 'Рассмотрения', value: 'review' },
  ]
  const dropdownOptions = ['Опция 1', 'Опция 2', 'Опция 3']

  const selectedLabel = ref('Подумать')

  const newName = ref('')
  const newEmail = ref('')
  const newPhone = ref('')
  const newHeader = ref('')
  const newLocation = ref('')
  const newEducation = ref('')
  const newExperience = ref('')
  const uploadPhoto = ref(null)
  const uploadResume = ref(null)
  const uploadLetter = ref(null)
  const newPosition = ref('')
  const newCustomFirst = ref('')
  const newCustomSecond = ref('')
  const newCustomThird = ref('')
</script>
