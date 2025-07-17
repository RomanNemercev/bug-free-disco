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
            ;['dateStart', 'dateWork', 'status'].includes(header.key) &&
              sortBy(header.key)
          "
          :class="{
            'cursor-pointer select-none': [
              'dateStart',
              'dateWork',
              'status',
            ].includes(header.key),
          }"
        >
          <span>{{ header.label }}</span>
          <button
            v-if="['dateStart', 'dateWork', 'status'].includes(header.key)"
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
    <div class="bg-white p-25px rounded-b-fifteen" v-if="loading">
      <UiDotsLoader />
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="data.length === 0">Заявки не найдены.</div>
      <div v-else>
        <div
          v-for="(vacancy, index) in data"
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
            {{ vacancy.status }}
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
                  @update:modelValue="
                    value => updateResponseChoose(vacancy, value)
                  "
                  class="mb-0 w-full max-w-input py-5"
                  :responses="executors"
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
                <p class="py-5 text-bali text-sm font-normal pl-2.5">
                  Не назначен
                </p>
              </div>
            </div>
          </div>
          <!-- dropdown item -->
          <div class="py-2.5">
            <DotsDropdown
              :items="dropdownOptions"
              @select-item="
                selectedItem => handleRemoveApplication(selectedItem, vacancy)
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="userRole === 'admin' && isNewAppPopupAdmin">
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
        <!-- администратор -->
          <p class="leading-normal text-xl font-semibold text-space mb-[39px]">
            Новая заявка
          </p>
          <div class="mb-22">
            <div class="mb-15px">
              <p class="text-sm font-medium text-space mb-7px">
                Утверждение
              </p>
              <response-input
                class="w-full"
                :responses="executors"
                :model-value="newApplication.responsible ? newApplication.responsible.name : null"
                :showRoles="true"
                placeholder="Кому отправить заявку"
                @update:modelValue="updateNewResponsible"
              />
              <div v-if="errors.response" class="text-red-500 text-xs mt-1">
                {{ errors.response }}
              </div>
            </div>
            <div class="w-full flex justify-between gap-x-15px mb-15px">
              <!-- <div class="w-full max-w-[400px]">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Заказчик
                </p>
                <response-input
                  class="w-full"
                  :responses="clients"
                  :model-value="newApplication.client ?newApplication.client.name : ''"
                  :client="newApplication"
                  :showRoles="true"
                  @update:modelValue="updateNewClient"
                />
                <div v-if="errors.customer" class="text-red-500 text-xs mt-1">
                  {{ errors.customer }}
                </div>
              </div> -->
              <!-- <div class="w-full">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Исполнитель
                </p>
                <response-input
                  class="w-full"
                  :responses="executors"
                  :model-value="newApplication.executor ? newApplication.executor.name : ''"
                  :showRoles="true"
                  @update:modelValue="updateNewExecutor"
                />
                <div v-if="errors.executor" class="text-red-500 text-xs mt-1">
                  {{ errors.executor }}
                </div>
              </div> -->
            </div>
            <div class="w-full flex justify-between gap-x-15px mb-15px">
              <div class="w-full max-w-[400px]">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Название должности<span class="text-red-500">*</span>
                </p>
                <MyInput
                  placeholder="Введите должность"
                  v-model="newApplication.position"
                />
                <div v-if="errors.post" class="text-red-500 text-xs mt-1">
                  {{ errors.post }}
                </div>
              </div>
              <div class="w-full">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Подразделение
                </p>
                <MyInput
                  placeholder="Введите название подразделения"
                  v-model="newApplication.division"
                />
                <div v-if="errors.department" class="text-red-500 text-xs mt-1">
                  {{ errors.department }}
                </div>
              </div>
            </div>
            <div class="w-full mb-2.5">
              <p class="text-sm font-medium text-space leading-normal mb-4">
                Регион поиска<span class="text-red-500">*</span>
              </p>
              <geo-input
                v-model="newApplication.city"
                :placeholder="'Введите город'"
              />
              <div v-if="errors.location" class="text-red-500 text-xs mt-1">
                {{ errors.location }}
              </div>
            </div>
            <div class="w-full mb-2.5">
              <p class="text-sm font-medium text-space leading-normal mb-4">
                Сколько человек нужно нанять<span class="text-red-500">*</span>
              </p>
              <MyInput
                placeholder="Введите число позиций на вакансию"
                v-model="newApplication.count"
                :type="'Number'"
              />
              <div v-if="errors.positions" class="text-red-500 text-xs mt-1">
                {{ errors.positions }}
              </div>
            </div>
            <div class="w-full mb-2.5 flex gap-x-15px">
              <div class="w-full">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Зарплата
                </p>
                <SalaryRange  
                  :from="newApplication.salaryFrom" 
                  :to="newApplication.salaryTo" 
                  @update:from="newApplication.salaryFrom = $event"
                  @update:to="newApplication.salaryTo = $event"
                />
                <div v-if="errors.salaryFrom" class="text-red-500 text-xs mt-1">
                  {{ errors.salaryFrom }}
                </div>
                <div v-if="errors.salaryTo" class="text-red-500 text-xs mt-1">
                  {{ errors.salaryTo }}
                </div>
              </div>
              <div class="w-full">
                <p class="text-sm font-medium text-space leading-normal mb-4">
                  Валюта
                </p>
                <my-dropdown
                  :defaultValue="'Валюта'"
                  :options="ArrayCurrency"
                  :selected="0"
                  v-model="newApplication.currency"
                />
                <div v-if="errors.currency" class="text-red-500 text-xs mt-1">
                  {{ errors.currency }}
                </div>
              </div>
            </div>
            <div class="w-full mb-15px">
              <p class="text-sm font-medium text-space leading-normal mb-4">
                Причина открытия вакансии<span class="text-red-500">*</span>
              </p>
              <my-dropdown
                :options="reasonseForOpenVacancy"
                v-model="newApplication.reason"
                :defaultValue="'Укажите вариант ответа'"
              />
              <div v-if="errors.reason" class="text-red-500 text-xs mt-1">
                {{ errors.reason }}
              </div>
            </div>
            <div class="w-full gap-x-15px flex mb-15px">
              <div class="w-full">
                <p class="text-sm font-medium text-space mb-1">
                  Начать подбор не позднее
                </p>
                <!-- <InputCalendar :fullStyles="true" /> -->
                 <DropdownCalendarStatic 
                   @update:model-value="newApplication.dateStart = $event" 
                   :is-open="isOpenDateFrom"
                   @update:isOpen="isOpenFrom"
                />
                
                <div v-if="errors.dateStart" class="text-red-500 text-xs mt-1">
                  {{ errors.dateStart }}
                </div>
              </div>
              <div class="w-full">
                <p class="text-sm font-medium text-space mb-1">
                  Желаемая дата выхода кандидата
                </p>
                <DropdownCalendarStatic 
                  @update:model-value="newApplication.dateWork = $event" 
                  :is-open="isOpenDateTo"
                />
                <div v-if="errors.dateWork" class="text-red-500 text-xs mt-1">
                  {{ errors.dateWork }}
                </div>
              </div>
            </div>
            <div class="w-full">
              <p class="text-sm font-medium text-space leading-normal mb-4">
                Требования к кандидату
              </p>
              <MyTextarea
                v-model="newApplication.require"
                :placeholder="'Опишите ключевые требования'"
              />
              <div v-if="errors.requirements" class="text-red-500 text-xs mt-1">
                {{ errors.requirements }}
              </div>
            </div>
            <div class="w-full mb-25px">
              <p class="text-sm font-medium text-space leading-normal mb-4">
                Обязанности кандидата
              </p>
              <MyTextarea
                v-model="newApplication.duty"
                :placeholder="'Опишите ключевые обязанности кандидата'"
              />
              <div
                v-if="errors.responsibilities"
                class="text-red-500 text-xs mt-1"
              >
                {{ errors.responsibilities }}
              </div>
            </div>
            <div></div>
            <div class="flex gap-15px justify-between w-fit">
              <UiButton
                variant="action"
                size="semiaction"
                class="font-bold"
                @click="createApplicationHandler()"
              >
                Отправить заявку
              </UiButton>
              <UiButton
                variant="back"
                size="second-back"
                class="font-medium"
                @click="closeNewApplicationPopup"
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
                    v-if="newExecutor.name"
                    class="text-sm font-medium text-dodger pl-15px"
                  >
                    {{ newExecutor.name }}
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
                    @update:modelValue="updateNewExecutor"
                  />
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-space mb-7px pl-15px">
                  Заказчик
                </p>
                <div ref="customerContainer">
                  <div
                    v-if="newCustomer.name"
                    class="text-sm font-medium text-dodger pl-15px"
                  >
                    {{ newCustomer.name }}
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
                    v-model="newCustomer.name"
                    v-show="showNewCustomer"
                    @update:modelValue="(value, id) => updateNewCustomer(value, id)"
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
                :customer="'responsible'"
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
        :width="'750px'"
        :showCloseButton="false"
        :disableOverflowHidden="true"
        :overflowContainer="true"
        maxHeight
        :lgSize="true"
      >
        <template #default>
          <div v-if="errorItem">{{ errorItem }}</div>
          <div v-else-if="detailedVacancy">
            <h3 class="text-xl font-semibold text-space mb-5">
              {{ detailedVacancy.position }}
            </h3>
            <p class="text-sm text-slate-custom font-normal mb-25px">
              {{ detailedVacancy.city }}
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
              class="relative"
              :style="{ height: tabContentHeight + 'px' }"
              :class="popupSelectedTab === 'popupComments' ? 'mb-0' : 'mb-25px'"
            >
              <div
                ref="tabContentInner"
                class="absolute bg-athens-gray w-[calc(100%+50px)] left-[-25px] top-[-2px]"
                :class="popupSelectedTab === 'popupComments' ? 'p-0' : 'p-15px'"
              >
                <div v-if="popupSelectedTab === 'popupMainInfo'">
                  <div
                    class="flex gap-x-5 p-25px bg-white rounded-fifteen mb-2.5"
                  >
                    <div class="w-full">
                      <p class="text-sm font-medium mb-5px">Исполнитель</p>
                      <BtnResponseInput
                        v-model="selectedVacancy.executor"
                        :responses="executors"
                        :customer="'executor'"
                        @update:modelValue="updateResponse"
                      />
                    </div>
                    <div class="w-full">
                      <p class="text-sm font-medium mb-15px">Статус заявки</p>
                      <p class="text-sm text-slate-custom">
                        {{
                          selectedVacancy.status ||
                          'Неизвестный статус'
                        }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="flex gap-x-5 p-25px bg-white rounded-fifteen mb-2.5"
                  >
                    <div class="w-full">
                      <p class="text-sm font-medium mb-15px">Вакансия</p>
                      <BtnAddBindVacancy 
                        v-model="vacancy"
                        :vacancies="vacancies"
                        @update:modelValue="updateResponse"
                      />
                    </div>
                    <div class="w-full">
                      <p class="text-sm font-medium mb-15px">Кандидаты</p>
                      <p class="text-sm text-slate-custom">
                        {{ detailedVacancy.vacancy ? detailedVacancy.vacancy.candidates_count : '0' }}
                      </p>
                    </div>
                  </div>
                  <div class="p-25px bg-white rounded-fifteen">
                    <div class="flex gap-x-15px mb-5">
                      <div class="w-full">
                        <p class="text-sm font-medium mb-15px">Заказчик</p>
                        <BtnResponseInput
                          :responses="clients"
                          v-model="clientName"
                          :placeholder="'ФИО заказчика'"
                          :minStyles="true"
                          :showRoles="true"
                          :customer="'client'"
                          @update:modelValue="updateResponse"
                        />
                      </div>
                      <div class="w-full">
                        <p class="text-sm font-medium mb-15px">
                          Ответственный заявки
                        </p>
                        <BtnResponseInput
                          :responses="executors"
                          v-model="responsibleName"
                          :placeholder="'ФИО ответственного'"
                          :minStyles="true"
                          :showRoles="true"
                          :customer="'responsible'"
                          @update:modelValue="updateResponse"
                        />
                      </div>
                    </div>
                    <div class="flex gap-x-15px mb-5">
                      <div class="w-full">
                        <p class="text-sm font-medium mb-15px">Департамент</p>
                        <p class="text-slate-custom font-normal text-sm">
                          {{ detailedVacancy.division }}
                        </p>
                      </div>
                      <div class="w-full">
                        <p class="text-sm font-medium mb-15px">
                          Причина открытия вакансии
                        </p>
                        <p class="text-slate-custom font-normal text-sm">
                          {{ detailedVacancy.reason }}
                        </p>
                      </div>
                    </div>
                    <div class="flex gap-x-15px mb-5">
                      <div class="w-full">
                        <p class="text-sm font-medium mb-15px">Зарплата</p>
                        <p class="text-slate-custom font-normal text-sm">
                          от {{ detailedVacancy.salaryFrom }} до
                          {{ detailedVacancy.salaryTo }}
                          {{ detailedVacancy.currency }}
                        </p>
                      </div>
                      <div class="w-full">
                        <p class="text-sm font-medium mb-15px">
                          Количество позиций
                        </p>
                        <p class="text-slate-custom font-normal text-sm">
                          {{ detailedVacancy.count }}
                        </p>
                      </div>
                    </div>
                    <div class="mb-5">
                      <p class="text-sm font-medium mb-15px">
                        Требования кандидата
                      </p>
                      <p class="text-slate-custom font-normal text-sm">
                        {{ detailedVacancy.require }}
                      </p>
                    </div>
                    <div class="mb-5">
                      <p class="text-sm font-medium mb-15px">
                        Обязанности кандидата
                      </p>
                      <p class="text-slate-custom font-normal text-sm">
                        {{ detailedVacancy.duty }}
                      </p>
                    </div>
                    <div class="flex gap-x-15px">
                      <div class="w-full">
                        <p class="text-sm font-medium mb-15px">
                          Начать подбор не позднее
                        </p>
                        <p class="text-slate-custom font-normal text-sm">
                          {{ detailedVacancy.dateStart }}
                        </p>
                      </div>
                      <div class="w-full">
                        <p class="text-sm font-medium mb-15px">
                          Желаемая дата выхода кандидата
                        </p>
                        <p class="text-slate-custom font-normal text-sm">
                          {{ detailedVacancy.dateWork }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="popupSelectedTab === 'popupHistory'">
                  <div class="[&>*:not(:last-of-type)]:mb-2.5">
                    <div
                      v-for="event in historyTabEvents"
                      :key="event.id"
                      class="flex bg-white rounded-fifteen px-25px py-15px"
                    >
                      <div>
                        <p class="font-medium text-sm text-space mb-5px">
                          {{ event.eventTitle }}
                        </p>
                        <p class="text-sm font-normal text-slate-custom">
                          {{ event.eventContent }}
                        </p>
                      </div>
                      <div class="ml-auto">
                        <p class="text-sm font-normal text-slate-custom">
                          {{
                            formatDateTime(event.eventLogDateTime).date
                          }}&nbsp;/&nbsp;{{
                            formatDateTime(event.eventLogDateTime).time
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="popupSelectedTab === 'popupComments'">
                  <div>
                    <!-- <div>
                      <MinTimeline
                        :messages="messages"
                        :container-height="400"
                        :padding="{ top: 4, bottom: 25, left: 25, right: 25 }"
                      />
                    </div>
                    <MinChat /> -->
                    <ChatMin
                      :container-height="400"
                      :initial-messages="messages"
                      :padding="{ top: 10, bottom: 20, left: 25, right: 25 }"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-x-15px">
              <UiButton variant="action" size="semiaction" @click="() => handlerUpdateApplication([], selectedVacancy)">Готово</UiButton>
              <UiButton
                variant="back"
                size="second-back"
                class="font-medium"
                @click="closePopup"
              >
                Отмена
              </UiButton>
            </div>
          </div>
        </template>
      </Popup>
    </transition>
    <div
      v-if="loadingItem"
      class="absolute bg-black bg-opacity-50 inset-0 flex items-center justify-center"
    >
      <UiCircleLoader />
    </div>
    <Pagination
      v-if="pagination.total_page > 1"
      :currentPage="pagination.current_page"
      :totalPages="pagination.last_page"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script setup>
  import {
    ref,
    computed,
    onMounted,
    onUnmounted,
    onBeforeUnmount,
    watchEffect,
    nextTick,
    watch,
  } from 'vue'
  import dayjs from 'dayjs'
  // import { useUserStore } from '@/stores/user'

  // import { getMovieList } from "@/src/api";
  // const apiTest = getMovieList('movie');
  // const initTop = await useAsyncData('top10', async () => await getMovieList('movie'));
  // console.log(apiTest);

  import ResponseInput from '~/components/custom/ResponseInput.vue'
  import DotsDropdown from '~/components/custom/DotsDropdown.vue'
  import Popup from '~/components/custom/Popup.vue'
  import SimpleInput from '~/components/custom/SimpleInput.vue'
  import InputCalendar from '~/components/custom/InputCalendar.vue'
  import BtnResponseInput from '~/components/custom/BtnResponseInput.vue'
  import BtnAddBindVacancy from '~/components/custom/BtnAddBindVacancy.vue'
  import MyInput from '~/components/custom/MyInput.vue'
  import GeoInput from '~/components/custom/GeoInput.vue'
  import SalaryRange from '~/components/custom/SalaryRange.vue'
  import MyDropdown from '~/components/custom/MyDropdown.vue'
  import MyTextarea from '~/components/custom/MyTextarea.vue'
  import ChatMin from '~/components/custom/chat-min'
  import UiDotsLoader from '~/components/custom/UiDotsLoader.vue'
  import UiCircleLoader from '~/components/custom/UiCircleLoader.vue'
  import Pagination from '~/components/custom/Pagination.vue'
  import DropdownCalendarStatic from '~/components/custom/DropdownCalendarStatic.vue'
  import responses from '~/src/data/responses.json'
  import currency from '~/src/data/currency.json'

  import { fetchApplications } from '~/utils/applicationsList'
  import { fetchApplicationDetail } from '~/utils/applicationItem'
  import { createApplication } from '~/utils/applicationCreate'
  import { deleteApplication } from '~/utils/applicationRemove'
  import { clientsList } from '~/utils/clientsList'
  import { executorsList } from '~/utils/executorsList'
  import { fetchApplicationUpdate } from '~/utils/applicationUpdate'
  import { getVacancies, getVacanciesNames } from '~/utils/getVacancies'


  const applications = ref([])
  // const data = ref(
  //   dataList.map(vacancy => ({
  //     ...vacancy,
  //     showResponseInput: false, // Добавляем состояние для каждого элемента
  //     responseChoose: '', // Выбранный ответственный
  //   }))
  // )
  const data = ref([])
  const pagination = ref({
    current_page: 1,
    total: 1,
    per_page: 10,
    last_page: 1,
    links: [],
  })
  const error = ref(null)
  const loading = ref(true)
  const loadingItem = ref(false)
  const errorItem = ref(null)
  const isOpenDateFrom = ref(false)
  const isOpenDateTo = ref(false)

  const headers = computed(() => {
    const baseHeaders = [
      { key: 'title', label: 'Вакансия' },
      { key: 'region', label: 'Регион' },
      { key: 'dateStart', label: 'Создана от' },
      { key: 'dateWork', label: 'Закрыть до' },
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
  const newApplication = ref({})
  const newResponseResponsible = ref('')
  const showNewResponseResponsible = ref(false)
  const responseContainerResponsible = ref(null)
  const newExecutor = ref({id: null, name: ''})
  const showNewExecutor = ref(false)
  const executorContainer = ref(null)
  const newCustomer = ref({id: null, name: ''})
  const showNewCustomer = ref(false)
  const newClient = ref({id: null, name: ''})
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
  const detailedVacancy = ref(null) // Для хранения полной информации о заявке
  const popupSelectedTab = ref('popupMainInfo')
  const tabContentInner = ref(null)
  const tabContentHeight = ref(0)
  const popupResponse = ref(null)

  const ArrayCurrency = currency
  const addNewCustomer = ref('')
  const addNewResponsible = ref('')
  const clients = ref([])
  const executors = ref([])
  const vacancies = ref([])
  let resizeObserver = null
  const errors = ref({})
  const updateData = ref({});

  // Функция обновления высоты контента
  const updateTabHeight = () => {
    nextTick(() => {
      if (tabContentInner.value) {
        tabContentHeight.value = tabContentInner.value.offsetHeight
        console.log('Correct height in popup - enabled.')
      } else {
        console.warn('tabContent is null when updating height')
      }
    })
  }

  const isOpenFrom = (value) => {
    console.log('value', value)
    isOpenDateFrom.value = value
  }

  // const statusLabels = {
  //   new: 'Новая заявка',
  //   in_review: 'На рассмотрении',
  //   in_work: 'В работе',
  //   paused: 'Приостановлена',
  // }

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
    let asc = sortOrder.value === 'asc' ? '' : '&asc=0'
     loadApplications(1, `sort=${sortKey.value}${asc}`)
    console.log('key sort', sortKey.value)
    console.log('type sort', sortOrder.value)
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
    const elTarget = event.target
    //console.log('event', event.target);
    //обработчик события клика вне календаря
    if ((!elTarget || !elTarget.classList.contains('.shadow-shadow-droplist')) || !elTarget.closest('.calendar-wrapper')) {
      // console.log('от', isOpenDateFrom.value)
      // console.log('до', isOpenDateTo.value)
      if (isOpenDateFrom.value)
          isOpenDateFrom.value = false
      if (isOpenDateTo.value)
          isOpenDateTo.value = false
    console.log('after от', isOpenDateFrom.value)
      console.log('artes до', isOpenDateTo.value)
    }
    
    // if (!event.target.classList.contains('.dropdown-selected-option')) {
    //   if (event.target.closest('.shadow-shadow-droplist')) {
    //     console.log('date from', isOpenDateFrom.value)
    //     console.log('date to', isOpenDateTo.value)
    //     if (isOpenDateFrom.value)
    //       isOpenDateFrom.value = false
        
    //     // if (isOpenDateTo.value)
    //     //   isOpenDateTo.value = false
    //   } else {
        
    //     if (isOpenDateFrom.value)
    //       isOpenDateFrom.value = false
    //     if (isOpenDateTo.value)
    //       isOpenDateTo.value = false
    //     console.log('Клик вне', isOpenDateFrom.value)
    //   }
    // } else {
    //   if (isOpenDateFrom.value)
    //       isOpenDateFrom.value = false
    //     if (isOpenDateTo.value)
    //       isOpenDateTo.value = false
    //   console.log('Клик вне', isOpenDateFrom.value)
      
    // }
    
    
    if (!isNewAppPopupAdmin.value && newApplication.value) {
      newApplication.value = {}
      errors.value = {}
    }
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
      if (!newExecutor.value.name) {
        showNewExecutor.value = false // Закрываем input, если ничего не выбрано
      }
    }
  }

  const handleClickOutsideNewAppPopupCustomer = event => {
    if (
      customerContainer.value &&
      !customerContainer.value.contains(event.target)
    ) {
      if (!newCustomer.value.name) {
        showNewCustomer.value = false // Закрываем input, если ничего не выбрано
      }
    }
  }

  const loadApplications = async (page = 1, params = '') => {
    // load data applications
    loading.value = true
    try {
      const {
        applications: fetchedApplications,
        pagination: fetchedPagination,
      } = await fetchApplications(page, params)
      applications.value = fetchedApplications
      console.log('Loaded applications: ', applications.value)
      data.value = applications.value.map(vacancy => ({
        ...vacancy,
        responsible: vacancy.responsible, // TODO: Заменить на данные из API
        candidates: 0, // TODO: Заменить на данные из API
        showResponseInput: false,
        responseChoose: '',
      }))
      pagination.value = fetchedPagination
      console.log('Loaded data: ', applications.value)
      console.log('Pagination: ', pagination.value)

      // получаем динамический список клиентов
      const {clients: clientData} = await clientsList();
      clients.value = clientData
    } catch (error) {
      error.value = 'Ошибка загрузки заявок.'
      console.error(error)
    } finally {
      loading.value = false
    }

    // получаем динамический список вакансий
      vacancies.value = await getVacanciesNames();
      console.log('vacancies', vacancies.value)

    // получаем динамический список исполнителей
    const {executors: executorData} = await executorsList();
    executors.value = executorData
  }

  const handlePageChange = async page => {
    pagination.value.current_page = page
    await loadApplications(page)
  }

  const getClients = async () => {
    const { clients } = await clientsList();
    
    return clients;
  }

  const getExecutors = async () => {
    const { executors } = await executorsList();
    
    return executors;
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('click', handleClickOutsideNewAppPopup)
    document.addEventListener('click', handleClickOutsideNewAppPopupResponsible)
    document.addEventListener('click', handleClickOutsideNewAppPopupExecutor)
    document.addEventListener('click', handleClickOutsideNewAppPopupCustomer)
    loadApplications()
    console.log('Applications data for check: ', applications)
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

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
      console.log('correct height in popup is - disabled.')
    }
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

  function updateNewExecutor(value, id) {
    // сonsole.log('value executor ', value)
    if (value) {
      newExecutor.value.name = value
      newExecutor.value.id = id
      showNewExecutor.value = false
      if (!newApplication.value.executor) {
        newApplication.value.executor = {}
      }
      newApplication.value.executor.id = id
      newApplication.value.executor.name = value
      // сonsole.log('newApplication.value.executor.id ', newApplication.value.executor.id)
    }
  }

  function updateNewResponsible(value, id) {
    if (value) {
      newExecutor.value.name = value
      newExecutor.value.id = id
      showNewExecutor.value = false
      if (!newApplication.value.responsible) {
        newApplication.value.responsible = {}
      }
      newApplication.value.responsible.id = id
      newApplication.value.responsible.name = value
    }
  }

  const updateNewCustomer = (value, id) => {
    if (value) {
      newCustomer.value.name = value
      newCustomer.value.id = id
      showNewCustomer.value = false
    }
  }

  const updateNewClient = (value, id) => {
    if (value) {
      newClient.value.name = value
      newClient.value.id = id
      showNewCustomer.value = false
      if (!newApplication.value.client) {
        newApplication.value.client = {}
      }
      newApplication.value.client.id = id
      newApplication.value.client.name = value
    }
  }

  const closeNewApplicationPopup = () => {
    if (newApplication.value) {
      newApplication.value = {}
    }
    
    isNewAppPopupAdmin.value = false
  }

  watch(selectedVacancy, newValue => {
    if (newValue) {
      // popup is opening
      nextTick(() => {
        if (tabContentInner.value) {
          let isInitialUpdate = true
          resizeObserver = new ResizeObserver(() => {
            if (isInitialUpdate) {
              isInitialUpdate = false
            } else {
              updateTabHeight()
              console.log('call fnc second time')
            }
          })
          resizeObserver.observe(tabContentInner.value)
          updateTabHeight()
          console.log('call fnc first time')
        } else {
          console.warn('tabContentInner is null after popup open')
        }
      })
    } else {
      // popup is closing
      if (resizeObserver) {
        resizeObserver.disconnect()
        resizeObserver = null
        console.log('correct height container in popup is disabled')
      }
    }
  })

  // Следим за изменением выбранного таба и обновляем высоту
  watch(popupSelectedTab, () => {
    updateTabHeight()
  })

  const openPopup = async vacancy => {
    loadingItem.value = true
    try {
      const fullData = await fetchApplicationDetail(vacancy.id)
      detailedVacancy.value = fullData.data // save full response.data
    
      selectedVacancy.value = vacancy // open popup
    } catch (error) {
      error.value = 'Ошибка загрузки деталей заявки.' 
      console.error(error)
    } finally {
      loadingItem.value = false
    }
  }

  const closePopup = () => {
    console.log('Close popup. Clear fullData.')
    selectedVacancy.value = null
    detailedVacancy.value = null
  }

  const reasonseForOpenVacancy = [
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


  const EVENT_TYPES = {
    CREATED: 'Создана заявка',
    UNDER_REVIEW: 'Принята к рассмотрению',
    ASSIGNED: 'Назначен ответственный',
  }

  const historyTabEvents = [
    {
      id: 1,
      eventTitle: EVENT_TYPES.CREATED,
      eventContent: 'Программист 1С на неполный день',
      eventLogDateTime: '2024-09-11T18:03:00',
    },
    {
      id: 2,
      eventTitle: EVENT_TYPES.UNDER_REVIEW,
      eventContent: 'Василисов Василий Сергеевич',
      eventLogDateTime: '2024-09-11T18:03:00',
    },
    {
      id: 3,
      eventTitle: EVENT_TYPES.ASSIGNED,
      eventContent: 'Михайлов Михаил Михайлович',
      eventLogDateTime: '2024-09-11T18:03:00',
    },
  ]

  const formatDateTime = dateTime => {
    return {
      date: dayjs(dateTime).format('DD.MM.YYYY'),
      time: dayjs(dateTime).format('HH:mm'),
    }
  }

  // const getStatusLabel = statusId => {
  //   console.log('Статус: ', statusId)
  //   const statusKey = Object.keys(statusWeights).find(
  //     key => statusWeights[key] === statusId
  //   )
  //   return statusKey ? statusLabels[statusKey] : 'Не указан'
  // }

  // Начальные данные (позже можно заменить на API)
  const messages = ref([
    {
      id: 1,
      type: 'standard',
      author: 'Василисов Василий Сергеевич',
      content: 'Пожалуйста, кто-то, закройте окно в коридоре, уже ДУЕТ!',
      dateTime: '2024-09-11T18:03:00',
    },
    {
      id: 2,
      type: 'with-recipient',
      author: 'Алексеев Алексей Алексеевич',
      recipients: ['Василисов Василий Сергеевич'],
      content: 'Коллега уважаемый, попробуй сделать это самостоятельно!',
      dateTime: '2024-09-11T18:03:00',
    },
    {
      id: 3,
      type: 'with-file',
      author: 'Георгиева Настасья Самбурская',
      recipients: [
        'Василисов Василий Сергеевич',
        'Алексеев Алексей Алексеевич',
      ],
      content:
        'Коллеги! Отчет готов! Прошу ознакомиться и дать обратную связь ближайшее время',
      file: { name: 'Какой-то отчет.pdf', format: 'pdf' },
      dateTime: '2024-09-11T18:03:00',
    },
    {
      id: 4,
      type: 'standard',
      author: 'Денисов Василис Алексеевич',
      content: 'Благодарность за отчет!',
      dateTime: '2024-09-11T18:03:00',
    },
    {
      id: 5,
      type: 'standard',
      author: 'Василисов Василий Сергеевич',
      content: 'Пожалуйста, кто-то, откройте окно в коридоре, уже не ДУЕТ!',
      dateTime: '2024-09-11T18:03:00',
    },
  ])

  const validateForm = () => {
    const newErrors = {}

    if (!newApplication.value.position) newErrors.post = 'Укажите должность'
    if (!newApplication.value.city) newErrors.location = 'Укажите регион поиска'
    if (!newApplication.value.count || newApplication.value.count <= 0) {
      newErrors.positions = 'Укажите корректное количество позиций'
    }
    console.log('from', newApplication.value.salaryFrom, 'to', newApplication.value.salaryTo)
    if (newApplication.value.salaryFrom && newApplication.value.salaryTo) {
      console.log('from', newApplication.value.salaryFrom, 'to', newApplication.value.salaryTo)
       if (newApplication.value.salaryFrom > newApplication.value.salaryTo) {
        newErrors.salaryTo =
          'Максимальная зарплата должна быть больше минимальной'
      }
    }
    if (!newApplication.value.currency) newApplication.value.currency = currency[0]['name']
    if (!newApplication.value.reason)
      newErrors.reason = 'Укажите причину открытия вакансии'

    errors.value = newErrors

    return Object.keys(newErrors).length === 0 // Возвращаем true, если ошибок нет
  }

  const applicationData = computed(() => {
    return {
      position: newApplication.value.position,
      division: newApplication.value.division,
      count: newApplication.value.count,
      salaryFrom: newApplication.value.salaryFrom,
      salaryTo: newApplication.value.salaryTo,
      currency: newApplication.value.currency,
      require: newApplication.value.require,
      duty: newApplication.value.duty,
      city: newApplication.value.city,
      reason: newApplication.value.reason,
      dateStart: newApplication.value.dateStart,
      dateWork: newApplication.value.dateWork,
      vacancy: newApplication.value.vacancy?.id,
      status: newApplication.value.status?.id,
      executor: newApplication.value.executor?.id,
      client: newApplication.value.client?.id,
      responsible: newApplication.value.responsible?.id,
    }
  })

  const createApplicationHandler = async () => {
    console.log('data' , newApplication.value)
    if (validateForm()) {
      try {
        const { data, error } = await createApplication(
          applicationData.value
        )
        console.log('error', error)
        if (!error) {
          console.log('Success:', data.message)
          isNewAppPopupAdmin.value = false // Закрываем попап
          loadApplications()
        } else if (error) {
          const status = error.status
          const message = error.data?.message || error.message

          if (status === 422) {
            console.warn('Validate error:', message)
          } else {
            console.warn('Error:', message)
          }
        }
      } catch (error) {
        console.error('Network error:', error.message)
      }
    } else {
      console.log('Form validation failed')
    }
  }

  const clientName = computed({
    get: () => {
      // Безопасная проверка на client и client.name
      return detailedVacancy.value.client?.name || ''
    },
    set: newValue => {
      // Обновляем detailedVacancy.client, если это необходимо
      if (detailedVacancy.value.client) {
        detailedVacancy.value.client.name = newValue
      } else {
        // Если client === null, создаем объект client
        detailedVacancy.value.client = { id: 0, name: newValue } // Или другой id
      }
    },
  })

  const responsibleName = computed({
    get: () => {
      // Безопасная проверка на responsible и responsible.name
      return detailedVacancy.value.responsible?.name || ''
    },
    set: newValue => {
      // Обновляем detailedVacancy.responsible, если это необходимо
      
      if (detailedVacancy.value.name) {
        detailedVacancy.value.responsible.name = newValue
      } else {
        // Если responsible === null, создаем объект responsible
        detailedVacancy.value.responsible = { id: 0, name: newValue } // Или другой id
      }
    },
  })

  const vacancy = computed({
    get: () => {
      // Безопасная проверка на responsible и responsible.name
      return detailedVacancy.value?.vacancy || null
    },
    set: newValue => {
      // Обновляем detailedVacancy.responsible, если это необходимо
      
      if (detailedVacancy.value.name) {
        detailedVacancy.value.vacancy.name = newValue
      } else {
        // Если responsible === null, создаем объект responsible
        detailedVacancy.value.vacancy = { id: 0, name: newValue } // Или другой id
      }
    },
  })

  const updateResponse = (value, id, key = null) => {
    console.log('key', key)
    if (key) {
      updateData.value[key] = id
    }
  }

  const updateExecutor = () => {
    updateData.value.append('executor', id)
  }


  const handleRemoveApplication = async (item, vacancy) => {
    if (item === 'Удалить') {
      console.log('Application for removing, ID:', vacancy.id)
      try {
        const { data, error } = await deleteApplication(vacancy.id)
        if (error) {
          console.error('Failed to delete application:', error)
          return
        }
        console.log('Application deleted successfully:', data)
        // Опционально: обнови список заявок после удаления
        loadApplications() // Если нужно перезагрузить список
      } catch (err) {
        console.error('Unexpected error during deletion:', err)
      }
    }
    if (item === 'Копировать заявку') {
      const { data, error} = await fetchApplicationDetail(vacancy.id)
      newApplication.value = data
      console.log('dat ' , newApplication.value)
      isNewAppPopupAdmin.value = true
    }
    if (item === 'Управлять') {
      openPopup(vacancy)
    }
  }

  const handlerUpdateApplication = async (dataForm, vacancy) => {
    if (Object.keys(updateData.value).length > 0) {
      const { data, error } = await fetchApplicationUpdate(updateData.value, vacancy.id)
      updateData.value = {}
      loadApplications() 
    } 
    
    closePopup()
  }
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
