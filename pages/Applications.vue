<template>
  <div class="container pb-72 pt-[34px]">
    <div
      class="bg-white p-25px rounded-fifteen flex justify-between mb-3.5 items-center"
    >
      <div>
        <p class="text-xl font-semibold text-space leading-normal mb-2.5">
          Заявки
        </p>
        <p class="text-sm font-normal text-slate-custom leading-normal">
          Отправьте приглашение заказчику и управляйте доступом
        </p>
      </div>
      <div>
        <UiButton
          v-if="userRole === 'admin'"
          size="semiaction"
          variant="action"
          @click="isNewAppPopupAdmin = true"
        >
          Новая заявка
        </UiButton>
        <UiButton
          v-else-if="userRole === 'responsible'"
          size="semiaction"
          variant="action"
          @click="isNewAppPopupResponsible = true"
        >
          Новая заявка
        </UiButton>
        <UiButton
          v-else-if="userRole === 'customer'"
          size="semiaction"
          variant="action"
          @click="isNewAppPopupCustomer = true"
        >
          Новая заявка
        </UiButton>
      </div>
    </div>

    <div
      class="w-full leading-normal pl-15px pr-25px rounded-t-fifteen bg-catskill mb-px"
    >
      <div
        class="header-wrapper grid grid-cols-8 gap-x-2.5 min-h-[71px] items-center"
      >
        <div
          v-for="header in headers"
          :key="header.key"
          class="text-sm font-medium text-slate-custom flex pl-2.5"
          @click="
            ;['createdAt', 'closeDate', 'status'].includes(header.key) &&
              sortBy(header.key)
          "
          :class="{
            'cursor-pointer select-none': [
              'createdAt',
              'closeDate',
              'status',
            ].includes(header.key),
          }"
        >
          <span>{{ header.label }}</span>
          <button
            v-if="['createdAt', 'closeDate', 'status'].includes(header.key)"
            class="relative flex items-center justify-center ml-[2.2px] custom-button"
          >
            <span :style="sortArrowStyle(header.key)" class="ml-1">
              <svg-icon name="sort-arrow" width="16px" height="15px" />
            </span>
          </button>
        </div>
        <div></div>
      </div>
    </div>

    <div
      v-for="(vacancy, index) in sortedData"
      :key="index"
      :data-vacancy="vacancy.title"
      class="items-wrapper grid grid-cols-8 gap-x-2.5 mb-px min-h-[61px] pl-15px pr-25px bg-white last-of-type:rounded-b-fifteen"
    >
      <!-- simple values -->
      <div class="text-sm font-medium text-space py-5 pl-2.5">
        <button
          @click="openPopup(vacancy)"
          class="underline text-dodger text-left"
        >
          {{ vacancy.title }}
        </button>
      </div>
      <div class="text-sm font-medium text-space py-5 pl-2.5">
        {{ vacancy.region }}
      </div>
      <div class="text-sm font-medium text-space py-5 pl-2.5">
        {{ vacancy.createdAt }}
      </div>
      <div class="text-sm font-medium text-space py-5 pl-2.5">
        {{ vacancy.closeDate }}
      </div>
      <!-- status vacancy -->
      <div class="text-sm font-medium text-space py-5 pl-2.5">
        {{ statusLabels[vacancy.status] }}
      </div>
      <!-- admin or responsible column on user role -->
      <div
        class="text-sm font-medium text-space py-5 pl-2.5"
        v-if="['admin', 'responsible'].includes(userRole)"
      >
        {{ vacancy.customer }}
      </div>
      <div
        v-if="userRole === 'customer'"
        class="text-sm font-medium text-space py-5 pl-5px"
      >
        {{ vacancy.responsible }}
      </div>

      <!-- admin or customer column -->
      <div>
        <div v-if="userRole === 'admin'">
          <div
            class="text-sm font-medium text-space py-5 pl-2.5"
            v-if="vacancy.executor"
          >
            {{ vacancy.executor }}
          </div>
          <div v-else>
            <!-- Если выбрано значение, показываем его -->
            <div
              v-if="vacancy.responseChoose"
              class="text-sm font-medium text-dodger py-5 pl-2.5"
            >
              {{ vacancy.responseChoose }}
            </div>
            <button
              v-else-if="!vacancy.showResponseInput"
              @click="openResponseInput(vacancy, $event)"
              class="text-sm font-medium text-dodger py-5 pl-2.5"
            >
              Добавить
            </button>
            <response-input
              v-model="vacancy.responseChoose"
              v-show="vacancy.showResponseInput"
              @update:modelValue="value => updateResponseChoose(vacancy, value)"
              class="mb-0 w-full max-w-input py-5"
              :responses="responses"
            />
          </div>
        </div>
        <div v-if="userRole === 'responsible'">
          <div
            v-if="vacancy.executor"
            class="text-sm font-medium text-space py-5 pl-2.5"
          >
            {{ vacancy.executor }}
          </div>
          <div v-else>
            <button
              @click="takeInWork(vacancy)"
              class="py-5 pl-2.5 text-sm font-medium text-dodger"
            >
              Взять в работу
            </button>
          </div>
        </div>
        <div div v-if="userRole === 'customer'">
          <div
            v-if="vacancy.executor"
            class="text-sm font-medium text-space py-5 pl-2.5"
          >
            {{ vacancy.responsible }}
          </div>
          <div v-else>
            <p class="py-5 text-bali text-sm font-normal pl-2.5">Не назначен</p>
          </div>
        </div>
      </div>
      <!-- dropdown item -->
      <div class="py-2.5">
        <DotsDropdown :items="dropdownOptions" />
      </div>
    </div>
    <div v-if="userRole === 'admin'">
      <!-- <transition
        name="fade"
        @after-leave="enableBodyScroll"
        @enter="disableBodyScroll"
      >
        <Popup
          :isOpen="isNewAppPopup"
          @close="() => (isNewAppPopup = false)"
          :width="'740px'"
          :showCloseButton="false"
          :disableOverflowHidden="true"
          :overflowContainer="true"
          maxHeight
          :lgSize="true"
        >
          <p class="leading-normal text-xl font-semibold text-space mb-[39px]">
            Новая заявка
          </p>
          <div class="mb-22px">
            <p class="text-sm font-medium text-space mb-7px pl-15px">
              Ответственный
            </p>
            <div ref="responseContainer">
              <div
                v-if="newResponse"
                class="text-sm font-medium text-dodger pl-15px"
              >
                {{ newResponse }}
              </div>
              <button
                v-else-if="!showNewResponse"
                @click="openNewResponse"
                class="text-sm font-medium text-dodger py-2.5 px-15px"
              >
                Добавить
              </button>
              <response-input
                class="w-full"
                :responses="responses"
                v-model="newResponse"
                v-show="showNewResponse"
                @update:modelValue="value => updateNewResponse(value)"
              />
            </div>
          </div>
          <div class="grid gap-x-5 grid-flow-col mb-6">
            <div>
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Должность
              </p>
              <SimpleInput
                placeholder="Введите название должности"
                v-model="newPosition"
              />
            </div>
            <div>
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Департамент
              </p>
              <SimpleInput v-model="newDepartment" />
            </div>
          </div>
          <div class="grid gap-x-5 grid-flow-col mb-6">
            <div>
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Регион поиска
              </p>
              <SimpleInput v-model="newRegion" />
            </div>
            <div>
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Причина открытия вакансии
              </p>
              <SimpleInput v-model="newReason" />
            </div>
          </div>
          <div class="grid gap-x-5 grid-flow-col mb-6">
            <div>
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Зарплата от
              </p>
              <SimpleInput v-model="salaryMin" type="number" />
            </div>
            <div>
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Зарплата до
              </p>
              <SimpleInput v-model="salaryMax" type="number" />
            </div>
          </div>
          <div class="mb-6">
            <p class="text-sm font-medium text-space pl-15px mb-1">
              Количество позиций
            </p>
            <SimpleInput v-model="vacancyCount" type="number" />
          </div>
          <div class="mb-6">
            <p class="text-sm font-medium text-space pl-15px mb-1">
              Требования кандидата
            </p>
            <SimpleInput v-model="requirements" />
          </div>
          <div class="mb-6">
            <p class="text-sm font-medium text-space pl-15px mb-1">
              Обязанности кандидата
            </p>
            <SimpleInput v-model="responsibilities" />
          </div>
          <div class="grid gap-x-5 grid-flow-col grid-cols-2 mb-9">
            <div>
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Начать подбор не позднее
              </p>
              <InputCalendar />
            </div>
            <div>
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Желаемая дата выхода кандидата
              </p>
              <InputCalendar />
            </div>
          </div>
          <div class="flex gap-15px justify-between w-fit">
            <UiButton variant="action" size="semiaction" class="font-bold">
              Создать
            </UiButton>
            <UiButton
              variant="back"
              size="second-back"
              class="font-medium"
              @click="isNewAppPopup = false"
            >
              Отмена
            </UiButton>
          </div>
        </Popup>
      </transition> -->
      <transition
        name="fade"
        @after-leave="enableBodyScroll"
        @enter="disableBodyScroll"
      >
        <Popup
          :isOpen="isNewAppPopupAdmin"
          @close="() => (isNewAppPopupAdmin = false)"
          :width="'740px'"
          :showCloseButton="false"
          :disableOverflowHidden="true"
          :overflowContainer="true"
          maxHeight
          :lgSize="true"
        >
          <p class="leading-normal text-xl font-semibold text-space mb-[39px]">
            Новая заявка (администратор)
          </p>
          <div class="mb-22">
            <div class="mb-15px">
              <p class="text-sm font-medium text-space mb-7px">
                Ответственный заявки
              </p>
              <response-input
                class="w-full"
                :responses="responseRoles"
                v-model="newResponseAdmin"
                :showRoles="true"
              />
            </div>
            <div class="w-full flex justify-between gap-x-15px mb-15px">
              <div class="w-full max-w-[400px]">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Заказчик
                </p>
                <response-input
                  class="w-full"
                  :responses="responseRoles"
                  v-model="newCustomerAdmin"
                  :showRoles="true"
                />
              </div>
              <div class="w-full">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Исполнитель
                </p>
                <response-input
                  class="w-full"
                  :responses="responseRoles"
                  v-model="newExecutorAdmin"
                  :showRoles="true"
                />
              </div>
            </div>
            <div class="w-full flex justify-between gap-x-15px mb-15px">
              <div class="w-full max-w-[400px]">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Должность
                </p>
                <MyInput
                  placeholder="Введите должность"
                  v-model="newPostAdmin"
                />
              </div>
              <div class="w-full">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Подразделение
                </p>
                <MyInput
                  placeholder="Введите название подразделения"
                  v-model="newDepartmentAdmin"
                />
              </div>
            </div>
            <div class="w-full mb-2.5">
              <p class="text-sm font-medium text-space leading-normal mb-4">
                Регион поиска
              </p>
              <geo-input
                v-model="newLocationAdmin"
                :placeholder="'Введите город'"
              />
            </div>
            <div class="w-full mb-2.5">
              <p class="text-sm font-medium text-space leading-normal mb-4">
                Количество позиций
              </p>
              <MyInput
                placeholder="Введите число позиций на вакансию"
                v-model="newQuantsPositionsAdmin"
                :type="'Number'"
              />
            </div>
            <div class="w-full mb-2.5 flex gap-x-15px">
              <div class="w-full">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Зарплата
                </p>
                <SalaryRange v-model="newSalaryAdmin" />
              </div>
              <div class="w-full">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Валюта
                </p>
                <my-dropdown
                  :defaultValue="'Валюта'"
                  :options="ArrayCurrency"
                  :selected="0"
                  v-model="newCurrencyTypeAdmin"
                />
              </div>
            </div>
            <div class="w-full">
              <p class="text-sm font-medium text-space leading-normal mb-4">
                Требования кандидата
              </p>
              <MyTextarea
                v-model="newRequirementsAdmin"
                :placeholder="'Опишите ключевые требования'"
              />
            </div>
            <div class="w-full">
              <p class="text-sm font-medium text-space leading-normal mb-4">
                Обязанности кандидата
              </p>
              <MyTextarea
                v-model="newResponsibilitiesAdmin"
                :placeholder="'Опишите ключевые обязанности кандидата'"
              />
            </div>
            <div class="w-full mb-15px">
              <p class="text-sm font-medium text-space leading-normal mb-4">
                Обязанности кандидата
              </p>
              <p class="text-sm font-medium text-space leading-normal mb-4">
                Причина открытия вакансии
              </p>
              <my-dropdown
                :options="reasonsForOpenVacancy"
                v-model="newReasonsForVacancyAdmin"
                :defaultValue="'Укажите вариант ответа'"
              />
            </div>
            <div class="w-full gap-x-15px flex mb-25px">
              <div class="w-full">
                <p class="text-sm font-medium text-space mb-1">
                  Начать подбор не позднее
                </p>
                <InputCalendar :fullStyles="true" />
              </div>
              <div class="w-full">
                <p class="text-sm font-medium text-space mb-1">
                  Желаемая дата выхода кандидата
                </p>
                <InputCalendar :fullStyles="true" />
              </div>
            </div>
            <div class="flex gap-15px justify-between w-fit">
              <UiButton variant="action" size="semiaction" class="font-bold">
                Создать
              </UiButton>
              <UiButton
                variant="back"
                size="second-back"
                class="font-medium"
                @click="isNewAppPopupAdmin = false"
              >
                Отмена
              </UiButton>
            </div>
          </div>
        </Popup>
      </transition>
    </div>
    <div v-else-if="userRole === 'responsible'">
      <transition
        name="fade"
        @after-leave="enableBodyScroll"
        @enter="disableBodyScroll"
      >
        <Popup
          :isOpen="isNewAppPopupResponsible"
          @close="() => (isNewAppPopupResponsible = false)"
          :width="'740px'"
          :showCloseButton="false"
          :disableOverflowHidden="true"
          :overflowContainer="true"
          maxHeight
          lgSize
        >
          <p class="leading-normal text-xl font-semibold text-space mb-[39px]">
            Новая заявка
          </p>
          <div class="mb-22px">
            <div class="mb-6">
              <p class="text-sm font-medium text-space mb-7px pl-15px">
                Ответственный
              </p>
              <div ref="responseContainerResponsible">
                <div
                  v-if="newResponseResponsible"
                  class="text-sm font-medium text-dodger pl-15px"
                >
                  {{ newResponseResponsible }}
                </div>
                <button
                  v-else-if="!showNewResponseResponsible"
                  @click="openNewResponseResponsible"
                  class="text-sm font-medium text-dodger py-2.5 px-15px"
                >
                  Добавить
                </button>
                <response-input
                  class="w-full"
                  :responses="responses"
                  v-model="newResponseResponsible"
                  v-show="showNewResponseResponsible"
                  @update:modelValue="
                    value => updateNewResponseResponsible(value)
                  "
                />
              </div>
            </div>
            <div class="grid gap-x-5 grid-flow-col grid-cols-2 mb-5">
              <div>
                <p class="text-sm font-medium text-space mb-7px pl-15px">
                  Исполнитель
                </p>
                <div ref="executorContainer">
                  <div
                    v-if="newExecutor"
                    class="text-sm font-medium text-dodger pl-15px"
                  >
                    {{ newExecutor }}
                  </div>
                  <button
                    v-else-if="!showNewExecutor"
                    @click="openNewExecutor"
                    class="text-sm font-medium text-dodger py-2.5 px-15px"
                  >
                    Добавить
                  </button>
                  <response-input
                    class="w-full"
                    :responses="responses"
                    v-model="newExecutor"
                    v-show="showNewExecutor"
                    @update:modelValue="value => updateNewExecutor(value)"
                  />
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-space mb-7px pl-15px">
                  Заказчик
                </p>
                <div ref="customerContainer">
                  <div
                    v-if="newCustomer"
                    class="text-sm font-medium text-dodger pl-15px"
                  >
                    {{ newCustomer }}
                  </div>
                  <button
                    v-else-if="!showNewCustomer"
                    @click="openNewCustomer"
                    class="text-sm font-medium text-dodger py-2.5 px-15px"
                  >
                    Добавить
                  </button>
                  <response-input
                    class="w-full"
                    :responses="responses"
                    v-model="newCustomer"
                    v-show="showNewCustomer"
                    @update:modelValue="value => updateNewCustomer(value)"
                  />
                </div>
              </div>
            </div>
            <div class="grid gap-x-5 grid-flow-col mb-6">
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Должность
                </p>
                <SimpleInput
                  placeholder="Введите название должности"
                  v-model="newPositionResponsible"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Департамент
                </p>
                <SimpleInput v-model="newDepartmentResponsible" />
              </div>
            </div>
            <div class="grid gap-x-5 grid-flow-col mb-6">
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Регион поиска
                </p>
                <SimpleInput v-model="newRegionResponsible" />
              </div>
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Причина открытия вакансии
                </p>
                <SimpleInput v-model="newReasonResponsible" />
              </div>
            </div>
            <div class="grid gap-x-5 grid-flow-col mb-6">
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Зарплата от
                </p>
                <SimpleInput v-model="salaryMinResponsible" type="number" />
              </div>
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Зарплата до
                </p>
                <SimpleInput v-model="salaryMaxResponsible" type="number" />
              </div>
            </div>
            <div class="mb-6">
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Количество позиций
              </p>
              <SimpleInput v-model="vacancyCountResponsible" type="number" />
            </div>
            <div class="mb-6">
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Требования кандидата
              </p>
              <SimpleInput v-model="requirementsResponsible" />
            </div>
            <div class="mb-6">
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Обязанности кандидата
              </p>
              <SimpleInput v-model="responsibilitiesResponsible" />
            </div>
            <div class="grid gap-x-5 grid-flow-col grid-cols-2 mb-9">
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Начать подбор не позднее
                </p>
                <InputCalendar />
              </div>
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Желаемая дата выхода кандидата
                </p>
                <InputCalendar />
              </div>
            </div>
          </div>
          <div class="flex gap-15px justify-between w-fit">
            <UiButton variant="action" size="semiaction" class="font-bold">
              Отправить на согласование
            </UiButton>
            <UiButton
              variant="back"
              size="second-back"
              class="font-medium"
              @click="isNewAppPopupResponsible = false"
            >
              Отмена
            </UiButton>
          </div>
        </Popup>
      </transition>
    </div>
    <div v-else-if="userRole === 'customer'">
      <transition
        name="fade"
        @after-leave="enableBodyScroll"
        @enter="disableBodyScroll"
      >
        <Popup
          :isOpen="isNewAppPopupCustomer"
          @close="() => (isNewAppPopupCustomer = false)"
          :width="'740px'"
          :showCloseButton="false"
          :disableOverflowHidden="true"
          :overflowContainer="true"
          maxHeight
        >
          <p class="leading-normal text-xl font-semibold text-space mb-[39px]">
            Новая заявка
          </p>
          <div class="mb-22px">
            <div class="mb-6">
              <p class="text-sm font-medium text-space mb-7px pl-15px">
                Ответственный
              </p>
              <BtnResponseInput
                v-model="newResponseCustomer"
                :responses="responses"
              />
            </div>
            <div class="grid gap-x-5 grid-flow-col mb-6">
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Должность
                </p>
                <SimpleInput
                  placeholder="Введите название должности"
                  v-model="newPositionCustomer"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Департамент
                </p>
                <SimpleInput v-model="newDepartmentCustomer" />
              </div>
            </div>
            <div class="grid gap-x-5 grid-flow-col mb-6">
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Регион поиска
                </p>
                <SimpleInput v-model="newRegionCustomer" />
              </div>
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Причина открытия вакансии
                </p>
                <SimpleInput v-model="newReasonCustomer" />
              </div>
            </div>
            <div class="grid gap-x-5 grid-flow-col mb-6">
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Зарплата от
                </p>
                <SimpleInput v-model="salaryMinCustomer" type="number" />
              </div>
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Зарплата до
                </p>
                <SimpleInput v-model="salaryMaxCustomer" type="number" />
              </div>
            </div>
            <div class="mb-6">
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Количество позиций
              </p>
              <SimpleInput v-model="vacancyCountCustomer" type="number" />
            </div>
            <div class="mb-6">
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Требования кандидата
              </p>
              <SimpleInput v-model="requirementsCustomer" />
            </div>
            <div class="mb-6">
              <p class="text-sm font-medium text-space pl-15px mb-1">
                Обязанности кандидата
              </p>
              <SimpleInput v-model="responsibilitiesCustomer" />
            </div>
            <div class="grid gap-x-5 grid-flow-col grid-cols-2 mb-8">
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Начать подбор не позднее
                </p>
                <InputCalendar />
              </div>
              <div>
                <p class="text-sm font-medium text-space pl-15px mb-1">
                  Желаемая дата выхода кандидата
                </p>
                <InputCalendar />
              </div>
            </div>
          </div>
          <div class="flex gap-15px justify-between w-fit">
            <UiButton variant="action" size="semiaction" class="font-bold">
              Отправить на согласование
            </UiButton>
            <UiButton
              variant="back"
              size="second-back"
              class="font-medium"
              @click="isNewAppPopupCustomer = false"
            >
              Отмена
            </UiButton>
          </div>
        </Popup>
      </transition>
    </div>
    <transition
      name="fade"
      @after-leave="enableBodyScroll"
      @enter="disableBodyScroll"
    >
      <Popup
        v-if="selectedVacancy"
        :isOpen="!!selectedVacancy"
        @close="closePopup"
        :width="'740px'"
        :showCloseButton="false"
        :disableOverflowHidden="true"
        :overflowContainer="true"
        maxHeight
      >
        <template #default>
          <h3 class="text-xl font-semibold text-space mb-5">
            {{ selectedVacancy.title }}
          </h3>
          <p class="text-sm text-slate-custom font-normal mb-25px">
            {{ selectedVacancy.region }}
          </p>
          <div class="relative z-10">
            <button
              @click="popupSelectedTab = 'popupMainInfo'"
              class="text-15px font-medium p-15px transition-colors"
              :class="
                popupSelectedTab === 'popupMainInfo'
                  ? 'text-space border-b-2 border-space'
                  : 'text-slate-custom border-none'
              "
            >
              Основная информация
            </button>
            <button
              @click="popupSelectedTab = 'popupHistory'"
              class="text-15px font-medium p-15px transition-colors"
              :class="
                popupSelectedTab === 'popupHistory'
                  ? 'text-space border-b-2 border-space'
                  : 'text-slate-custom border-none'
              "
            >
              История
            </button>
            <button
              @click="popupSelectedTab = 'popupComments'"
              class="text-15px font-medium p-15px transition-colors"
              :class="
                popupSelectedTab === 'popupComments'
                  ? 'text-space border-b-2 border-space'
                  : 'text-slate-custom border-none'
              "
            >
              Комментарии
            </button>
          </div>
          <div
            class="relative mb-25px"
            :style="{ height: tabContentHeight + 'px' }"
          >
            <div
              ref="tabContentInner"
              class="absolute bg-athens-gray w-[calc(100%+50px)] left-[-25px] top-[-2px] p-15px"
            >
              <div v-if="popupSelectedTab === 'popupMainInfo'">
                <div
                  class="flex gap-x-5 py-15px px-2.5 bg-white rounded-fifteen mb-2.5"
                >
                  <div class="w-full">
                    <p class="text-sm pl-15px font-medium mb-5px">
                      Исполнитель
                    </p>
                    <BtnResponseInput
                      v-model="popupResponse"
                      :responses="responses"
                    />
                  </div>
                  <div class="w-full">
                    <p class="text-sm font-medium mb-15px">Статус заявки</p>
                    <p class="text-sm text-slate-custom">
                      {{
                        statusLabels[selectedVacancy.status] ||
                        'Неизвестный статус'
                      }}
                    </p>
                  </div>
                </div>
                <div
                  class="flex gap-x-5 py-15px px-2.5 bg-white rounded-fifteen"
                >
                  <div class="w-full">
                    <p class="text-sm font-medium mb-15px pl-15px">Вакансия</p>
                    <BtnAddBindVacancy :vacancies="vacancyForBind" />
                  </div>
                  <div class="w-full">
                    <p class="text-sm font-medium mb-15px">Кандидаты</p>
                    <p class="text-sm text-slate-custom">
                      {{ selectedVacancy.candidates }}
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="popupSelectedTab === 'popupHistory'">Tab History</div>
              <div v-if="popupSelectedTab === 'popupComments'">
                Tab Comments
              </div>
            </div>
          </div>
          <div class="flex gap-x-15px">
            <UiButton variant="action" size="semiaction">Готово</UiButton>
            <UiButton
              variant="back"
              size="second-back"
              class="font-medium"
              @click="closePopup"
            >
              Отмена
            </UiButton>
          </div>
        </template>
      </Popup>
    </transition>
  </div>
</template>

<script setup>
  import {
    ref,
    computed,
    onMounted,
    onBeforeUnmount,
    watchEffect,
    nextTick,
    watch,
  } from 'vue'

  // import { getMovieList } from "@/src/api";
  // const apiTest = getMovieList('movie');
  // const initTop = await useAsyncData('top10', async () => await getMovieList('movie'));
  // console.log(apiTest);

  import ResponseInput from '@/components/custom/ResponseInput.vue'
  import DotsDropdown from '@/components/custom/DotsDropdown.vue'
  import Popup from '~/components/custom/Popup.vue'
  import SimpleInput from '~/components/custom/SimpleInput.vue'
  import InputCalendar from '~/components/custom/InputCalendar.vue'
  import BtnResponseInput from '~/components/custom/BtnResponseInput.vue'
  import BtnAddBindVacancy from '~/components/custom/BtnAddBindVacancy.vue'
  import MyInput from '~/components/custom/MyInput.vue'
  import GeoInput from '@/components/custom/GeoInput.vue'
  import SalaryRange from '~/components/custom/SalaryRange.vue'
  import MyDropdown from '~/components/custom/MyDropdown.vue'
  import MyTextarea from '~/components/custom/MyTextarea.vue'

  import responses from '~/src/data/responses.json'
  import responseRoles from '~/src/data/response-roles.json'
  import dataList from '~/src/data/roles-data-admin.json'
  import vacancyForBind from '~/src/data/vacancies-for-btnBind.json'
  import currency from '~/src/data/currency.json'

  const data = ref(
    dataList.map(vacancy => ({
      ...vacancy,
      showResponseInput: false, // Добавляем состояние для каждого элемента
      responseChoose: '', // Выбранный ответственный
    }))
  )

  const headers = computed(() => {
    const baseHeaders = [
      { key: 'title', label: 'Вакансия' },
      { key: 'region', label: 'Регион' },
      { key: 'createdAt', label: 'Создана от' },
      { key: 'closeDate', label: 'Закрыть до' },
      { key: 'status', label: 'Статус' },
      { key: 'executor', label: 'Исполнитель' },
    ]

    if (['admin', 'responsible'].includes(userRole.value)) {
      baseHeaders.splice(5, 0, { key: 'customer', label: 'Заказчик' })
    } else if (userRole.value === 'customer') {
      baseHeaders.splice(5, 0, { key: 'responsible', label: 'Ответственный' })
    }

    return baseHeaders
  })

  const sortKey = ref('')
  const sortOrder = ref('asc')
  const userRole = ref('admin') // Change to "admin" or "responsible" and "customer" for testing
  const dropdownOptions = ['Управлять', 'Копировать заявку', 'Удалить']
  // const isNewAppPopup = ref(false)
  const isNewAppPopupAdmin = ref(false)
  const isNewAppPopupCustomer = ref(false)
  const isNewAppPopupResponsible = ref(false)
  const showNewResponse = ref(false)
  const newResponse = ref('')
  const responseContainer = ref(null)
  // const newPosition = ref('')
  // const newDepartment = ref('')
  // const newRegion = ref('')
  // const newReason = ref('')
  // const salaryMin = ref('')
  // const salaryMax = ref('')
  // const vacancyCount = ref('')
  // const requirements = ref('')
  // const responsibilities = ref('')
  const newResponseAdmin = ref('')
  const newResponseResponsible = ref('')
  const showNewResponseResponsible = ref(false)
  const responseContainerResponsible = ref(null)
  const newExecutor = ref('')
  const newExecutorAdmin = ref('')
  const showNewExecutor = ref(false)
  const executorContainer = ref(null)
  const newCustomer = ref('')
  const newCustomerAdmin = ref('')
  const showNewCustomer = ref(false)
  const customerContainer = ref(false)
  const newPositionResponsible = ref('')
  const newDepartmentResponsible = ref('')
  const newRegionResponsible = ref('')
  const newReasonResponsible = ref('')
  const salaryMinResponsible = ref('')
  const salaryMaxResponsible = ref('')
  const vacancyCountResponsible = ref('')
  const requirementsResponsible = ref('')
  const responsibilitiesResponsible = ref('')
  const newResponseCustomer = ref('')
  const newPositionCustomer = ref('')
  const newDepartmentCustomer = ref('')
  const newRegionCustomer = ref('')
  const newReasonCustomer = ref('')
  const salaryMinCustomer = ref('')
  const salaryMaxCustomer = ref('')
  const vacancyCountCustomer = ref('')
  const requirementsCustomer = ref('')
  const responsibilitiesCustomer = ref('')
  const selectedVacancy = ref(null)
  const popupSelectedTab = ref('popupMainInfo')
  const tabContentInner = ref(null)
  const tabContentHeight = ref(0)
  const popupResponse = ref('')
  const newPostAdmin = ref('')
  const newDepartmentAdmin = ref('')
  const newLocationAdmin = ref('')
  const newQuantsPositionsAdmin = ref('')
  const newSalaryAdmin = ref({ from: null, to: null })
  const ArrayCurrency = currency
  const newCurrencyTypeAdmin = ref('RUB (рубль)')
  const newRequirementsAdmin = ref('')
  const newResponsibilitiesAdmin = ref('')
  const newReasonsForVacancyAdmin = ref('')

  const statusLabels = {
    new: 'Новая заявка',
    in_review: 'На рассмотрении',
    in_work: 'В работе',
    paused: 'Приостановлена',
  }

  const statusWeights = {
    new: 1,
    in_review: 2,
    in_work: 3,
    paused: 4,
  }

  const sortedData = computed(() => {
    if (!sortKey.value) return data.value

    return [...data.value].sort((a, b) => {
      const multiplier = sortOrder.value === 'asc' ? 1 : -1

      if (sortKey.value === 'status') {
        return (statusWeights[a.status] - statusWeights[b.status]) * multiplier
      }

      if (a[sortKey.value] > b[sortKey.value]) return 1 * multiplier
      if (a[sortKey.value] < b[sortKey.value]) return -1 * multiplier
      return 0
    })
  })

  const sortBy = key => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = 'asc'
    }
  }

  const sortArrowStyle = key => {
    return {
      transform:
        sortKey.value === key && sortOrder.value === 'asc'
          ? 'rotate(180deg)'
          : 'rotate(0deg)',
      transition: 'transform 0.3s ease',
    }
  }

  const takeInWork = vacancy => {
    console.log(`Вакансия взята в работу: ${vacancy.title}`)
  }

  const openResponseInput = (vacancy, event) => {
    event.stopPropagation() // Останавливаем всплытие события
    vacancy.showResponseInput = true
  }

  const handleClickOutside = event => {
    data.value.forEach(vacancy => {
      if (vacancy.showResponseInput) {
        const element = document.querySelector(
          `[data-vacancy="${vacancy.title}"]`
        )
        if (element && !element.contains(event.target)) {
          // Если не было выбора, оставляем кнопку "Добавить"
          if (!vacancy.responseChoose) {
            vacancy.showResponseInput = false
          } else {
            vacancy.showResponseInput = false
          }
        }
      }
    })
  }

  const handleClickOutsideNewAppPopup = event => {
    if (
      responseContainer.value &&
      !responseContainer.value.contains(event.target)
    ) {
      if (!newResponse.value) {
        showNewResponse.value = false // Закрываем input, если ничего не выбрано
      }
    }
  }

  const handleClickOutsideNewAppPopupResponsible = event => {
    if (
      responseContainerResponsible.value &&
      !responseContainerResponsible.value.contains(event.target)
    ) {
      if (!newResponseResponsible.value) {
        showNewResponseResponsible.value = false // Закрываем input, если ничего не выбрано
      }
    }
  }

  const handleClickOutsideNewAppPopupExecutor = event => {
    if (
      executorContainer.value &&
      !executorContainer.value.contains(event.target)
    ) {
      if (!newExecutor.value) {
        showNewExecutor.value = false // Закрываем input, если ничего не выбрано
      }
    }
  }

  const handleClickOutsideNewAppPopupCustomer = event => {
    if (
      customerContainer.value &&
      !customerContainer.value.contains(event.target)
    ) {
      if (!newCustomer.value) {
        showNewCustomer.value = false // Закрываем input, если ничего не выбрано
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('click', handleClickOutsideNewAppPopup)
    document.addEventListener('click', handleClickOutsideNewAppPopupResponsible)
    document.addEventListener('click', handleClickOutsideNewAppPopupExecutor)
    document.addEventListener('click', handleClickOutsideNewAppPopupCustomer)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('click', handleClickOutsideNewAppPopup)
    document.removeEventListener(
      'click',
      handleClickOutsideNewAppPopupResponsible
    )
    document.removeEventListener('click', handleClickOutsideNewAppPopupExecutor)
    document.removeEventListener('click', handleClickOutsideNewAppPopupCustomer)
  })

  const updateResponseChoose = (vacancy, value) => {
    if (value) {
      vacancy.responseChoose = value
      vacancy.showResponseInput = false
    }
  }

  // popup's settings
  // config for control scroll
  function disableBodyScroll() {
    document.body.style.overflow = 'hidden' // Отключаем прокрутку
  }

  function enableBodyScroll() {
    document.body.style.overflow = '' // Включаем прокрутку
  }

  // const openNewResponse = event => {
  //   event.stopPropagation()
  //   showNewResponse.value = true
  // }

  // const updateNewResponse = value => {
  //   if (value) {
  //     newResponse.value = value
  //     showNewResponse.value = false
  //   }
  // }

  const openNewResponseResponsible = event => {
    event.stopPropagation()
    showNewResponseResponsible.value = true
  }

  const openNewExecutor = event => {
    event.stopPropagation()
    showNewExecutor.value = true
  }

  const openNewCustomer = event => {
    event.stopPropagation()
    showNewCustomer.value = true
  }

  const updateNewResponseResponsible = value => {
    if (value) {
      newResponseResponsible.value = value
      showNewResponseResponsible.value = false
    }
  }

  const updateNewExecutor = value => {
    if (value) {
      newExecutor.value = value
      showNewExecutor.value = false
    }
  }

  const updateNewCustomer = value => {
    if (value) {
      newCustomer.value = value
      showNewCustomer.value = false
    }
  }

  // Функция обновления высоты контента
  const updateTabHeight = () => {
    nextTick(() => {
      if (tabContentInner.value) {
        tabContentHeight.value = tabContentInner.value.offsetHeight
      }
    })
  }

  const openPopup = vacancy => {
    selectedVacancy.value = vacancy
    updateTabHeight()
  }

  const closePopup = () => {
    selectedVacancy.value = null
  }

  // Следим за изменением выбранного таба и обновляем высоту
  watch(popupSelectedTab, updateTabHeight)

  const reasonsForOpenVacancy = [
    {
      name: 'Замена позиции',
      value: 0,
    },
    {
      name: 'Расширения',
      value: 1,
    },
    {
      name: 'Причина 3',
      value: 2,
    },
    {
      name: 'Причина 4',
      value: 3,
    },
    {
      name: 'Причина 5',
      value: 4,
    },
  ]
</script>

<style scoped>
  .header-wrapper {
    grid-template-columns: 14.01% 14.01% 10.485% 10.662% 13.128% 14.01% 14.01% 3.525%;
  }

  .items-wrapper {
    grid-template-columns: 13.833% 13.833% 10.485% 10.662% 13.833% 13.833% 13.833% 3.525%;
  }

  /* Анимация появления и скрытия */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-leave-from {
    opacity: 1;
  }
</style>
