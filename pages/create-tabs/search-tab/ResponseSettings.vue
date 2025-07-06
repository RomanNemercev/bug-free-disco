<script setup>
import MinDropdown from '~/components/custom/MinDropdown.vue'
import ConfigResponse from '~/components/custom/config-response/ConfigResponse.vue'
import MoreQuestions from '~/components/custom/MoreQuestions.vue'
import MyDropdown from '~/components/custom/MyDropdown.vue'
import MyInput from '~/components/custom/MyInput.vue'
import MyCheckbox from '~/components/custom/MyCheckbox.vue'
import PhoneInput from '~/components/custom/PhoneInput.vue'
import GeoInput from '~/components/custom/GeoInput.vue'
import MyTextarea from '~/components/custom/MyTextarea.vue'
import CustomCalendar from '~/components/custom/CustomCalendar.vue'
import InputUpload from '~/components/custom/InputUpload.vue'
import ExpandableForm from '~/components/custom/ExpandableForm.vue'

import { ref } from 'vue'

const templates = [
  {
    id: 'template1',
    name: 'Менеджер по продажам',
  },
  {
    id: 'template2',
    name: 'Повар',
  },
]

const activeTemplate = ref(null)
const fio = ref('')
const mail = ref('')
const phone = ref('')
const location = ref('')
const lastExperience = ref('')
const internationalCommunity = ref('')
const dateReady = ref('')
const dateEmployment = ref('')
const dateDismissal = ref('')
const portfolioLink = ref('')
const readyToWork = ref(false)
const packageDocuments = ref(false)
const reliableInformation = ref(false)
const photoLoad = ref('')
const educationData = ref(null)
const animalResponse = ref('')

const communityOptions = [
  {
    id: 1,
    name: 'Да',
  },
  {
    id: 2,
    name: 'Нет',
  },
  {
    id: 3,
    name: 'Нет, но очень хотелось бы',
  },
]

// created dev branch
</script>

<template>
  <div>
    <slot name="back" />
    <MinDropdown :options="templates" v-model="activeTemplate" />
    <div class="flex gap-x-[24px] pt-4">
      <div class="max-w-full w-full flex-1 min-w-0">
        <div class="mb-25px p-25px bg-white rounded-fifteen">
          <ConfigResponse />
        </div>
        <div class="p-25px bg-white rounded-fifteen mb-25px">
          <h2 class="text-xl font-semibold text-space mb-1">Дополнительные вопросы</h2>
          <p class="text-sm font-normal text-slate-custom mb-8">
            Добавляйте и редактируйте свои вопросы
          </p>
          <MoreQuestions />
        </div>
        <div class="gap-15px flex max-w-fit">
          <UiButton variant="action" size="semiaction">
            Сохранить и продолжить
          </UiButton>
          <UiButton variant="black" size="black" class="font-semibold">
            Сохранить и назвать шаблон
          </UiButton>
        </div>
      </div>
      <!-- box of the below is hidden -->
      <div class="max-w-[375px] w-full flex-none rounded-twentyfive bg-white max-h-[76.564vh] sticky top-4 hidden">
        <div class="pt-3.5 pl-[53.5px] pr-2.5 pb-2.5">
          <svg-icon name="abstract" width="243" height="16" />
        </div>
        <div class="px-[8.75px] pb-[31.98px]">
          <div class="border border-athens rounded-ten">
            <div class="py-25px px-23px border-b border-athens">
              <p class="text-25px font-bold leading-130 text-dodger">
                Менеджер по продажам
              </p>
              <span class="font-normal text-space leading-150 text-sm">
                г. Москва
              </span>
            </div>
            <div>
              <div>
                <div class="pl-35px">
                  <button class="py-4 px-5px relative text-sm text-slate-custom font-semibold mr-15px">
                    О вакансии
                  </button>
                  <button class="py-4 px-5px relative text-sm text-slate-custom font-semibold btn-active">
                    Анкета
                  </button>
                  <div class="shadow-shadow-droplist"></div>
                </div>
              </div>
              <div class="bg-athens-gray py-35px px-13px custom-shadow">
                <div class="custom-border rounded-fifteen p-25px bg-zumthor mb-15px">
                  <p class="text-lg font-medium text-space leading-130 mb-5px">
                    Автозаполнение анкеты
                  </p>
                  <p class="text-13px font-normal text-slate-custom mb-25px leading-130">
                    Сэкономьте время, импортировав резюме в одном из следующих
                    форматов: .pdf, .doc, .docx, .odt, rtf
                  </p>
                  <UiButton variant="black" size="black" class="font-semibold">
                    Загрузить резюме
                  </UiButton>
                </div>
                <div class="bg-white rounded-fifteen p-25px mb-15px">
                  <p class="mb-35px text-space text-xl leading-130 font-semibold">
                    Личная информация
                  </p>
                  <div class="mb-15px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      <span class="text-red-custom">*</span>
                      Ваше ФИО
                    </p>
                    <MyInput :placeholder="'Фамилия Имя Отчество'" v-model="fio" class="mb-25px" />
                  </div>
                  <div class="mb-15px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      <span class="text-red-custom">*</span>
                      Электронная почта
                    </p>
                    <MyInput :placeholder="'Введите email'" v-model="mail" class="mb-25px" />
                  </div>
                  <div class="mb-15px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      Контактный телефон
                    </p>
                    <phone-input v-model="phone" class="mb-25px" />
                  </div>
                  <div class="mb-15px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      Адрес
                      <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                      </span>
                    </p>
                    <geo-input class="mb-2.5" v-model="location" />
                  </div>
                  <div class="mb-15px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      Фотография
                      <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                      </span>
                    </p>
                    <InputUpload v-model="photoLoad" file-type="img" />
                  </div>
                  <div class="mb-15px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      Образование
                      <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                      </span>
                    </p>
                    <div>
                      <ExpandableForm v-model="educationData" initial-text="Добавить">
                        <template #form="{ data }">
                          <div>
                            <div>
                              <p><span>*</span>Образование</p>
                              <MyInput :placeholder="'Введите учебное заведение'" v-model="data.institution" />
                            </div>
                            <div>
                              <p><span>*</span>Область обучения<span>(не обязательно)</span></p>
                              <MyInput :placeholder="'Введите область обучения'" v-model="data.faculty" />
                            </div>
                            <div>
                              <p>Специальность<span>(не обязательно)</span></p>
                              <MyInput :placeholder="'Специальность'" v-model="data.speciality" />
                            </div>
                            <div>
                              <p>Ученая степень<span>(не обязательно)</span></p>
                              <MyInput :placeholder="'Введите ученую степень'" v-model="data.academic" />
                            </div>
                            <div>
                              <p>Дата начала<span>(не обязательно)</span></p>
                              <CustomCalendar v-model="data.dateStart" />
                            </div>
                            <div>
                              <p>Дата окончания<span>(не обязательно)</span></p>
                              <CustomCalendar v-model="data.dateFinish" />
                            </div>
                          </div>
                        </template>
                        <template #summary="{ data }">
                          <p>{{ data.institution }}, {{ data.specialty }}<br>{{ data.academic }}, с {{ data.dateStart }}
                            по {{
                              data.dateFinish }}</p>
                        </template>
                      </ExpandableForm>
                    </div>
                  </div>
                  <div class="mb-15px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      Опыт
                      <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                      </span>
                    </p>
                    <div class="p-15px rounded-fifteen border border-athens-gray bg-zumthor">
                      Компонент с опытом
                    </div>
                  </div>
                  <div>
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      Резюме
                      <span class="text-13px font-normal text-slate-custom">
                        (не обязательно)
                      </span>
                    </p>
                    <div class="p-15px rounded-fifteen border border-athens-gray bg-zumthor">
                      Компонент с резюме
                    </div>
                  </div>
                </div>
                <div class="bg-white rounded-fifteen p-25px mb-15px">
                  <p class="mb-35px text-space text-xl leading-130 font-semibold">
                    Дополнительно
                  </p>
                  <div class="mb-35px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      Как вы относитесь к животным?
                    </p>
                    <MyInput :placeholder="'Введите ваш ответ'" v-model="animalResponse" class="mb-25px" />
                  </div>
                  <div class="mb-35px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      Опишите одним предложением ваш предыдущий опыт на работе?
                    </p>
                    <MyTextarea v-model="lastExperience" :maxHeight="100"
                      :placeholder="'Опишите ключевые требования'" />
                  </div>
                  <div class="mb-35px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      Доводилось ли вам принимать участие в международных
                      конференциях?
                    </p>
                    <MyDropdown v-model="internationalCommunity" :defaultValue="'Выберите вариант ответа'"
                      :options="communityOptions" />
                  </div>
                  <div class="mb-35px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      Какими из перечисленных программ вы владеете?
                    </p>
                    <div class="p-15px rounded-fifteen border border-athens-gray bg-zumthor">
                      Компонент с чекбоксами
                    </div>
                  </div>
                  <div class="mb-35px">
                    <p class="text-sm font-medium mb-4 leading-normal text-space">
                      Пожалуйста, укажите удобное для вас время начала рабочего
                      дня
                    </p>
                    <div class="p-15px rounded-fifteen border border-athens-gray bg-zumthor">
                      Компонент с часами-минутами
                    </div>
                  </div>
                  <div class="mb-35px">
                    <p class="text-sm font-medium leading-normal text-space mb-15px">
                      Пожалуйста, укажите дату удобного для вас дня стажировки
                    </p>
                    <CustomCalendar v-model="dateReady" :placeholder="'Введите дату'" />
                  </div>
                  <div class="mb-35px">
                    <p class="text-sm font-medium leading-normal text-space mb-15px">
                      Пожалуйста, укажите дата начала трудоустройства и дату
                      увольнения на последнем месте работы
                    </p>
                    <div class="flex gap-x-15px">
                      <CustomCalendar v-model="dateEmployment" :placeholder="'Выберите дату от'" />
                      <CustomCalendar v-model="dateDismissal" :placeholder="'Выберите дату до'" />
                    </div>
                  </div>
                  <div class="mb-35px">
                    <p class="text-sm font-medium leading-normal text-space mb-15px">
                      Пожалуйста, укажите ссылку на ваше портфолио
                    </p>
                    <MyInput v-model="portfolioLink" :placeholder="'https://'" />
                  </div>
                  <div class="mb-35px">
                    <p class="text-sm font-medium leading-normal text-space mb-15px">
                      Пожалуйста, укажите ссылку на ваше портфолио
                    </p>
                    <div class="p-15px rounded-fifteen border border-athens-gray bg-zumthor">
                      Компонент с файлом с прошлой работы
                    </div>
                  </div>
                  <div class="mb-15px">
                    <p class="text-sm font-medium leading-normal text-space mb-15px">
                      Пожалуйста, поставьте галочку на утверждениях из ниже представленных
                    </p>
                    <div>
                      <MyCheckbox id="ready-to-work" label="Готов приступ к работе ближайшее время"
                        v-model="readyToWork" />
                      <MyCheckbox id="package-documents" label="У меня имеется весь пакет документов"
                        v-model="packageDocuments" />
                      <MyCheckbox id="reliable-information"
                        label="Вся информация предоставленная мной является достоверной"
                        v-model="reliableInformation" />
                    </div>
                  </div>
                  <UiButton variant="action" size="semiaction" class="w-full uppercase">Отправить анкету</UiButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-active {
  color: #2f353d;
}

.btn-active::after {
  position: absolute;
  content: '';
  width: calc(100% - 10px);
  height: 5px;
  background-color: #5898ff;
  border-radius: 2px 2px 0 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.custom-shadow {
  box-shadow: 0px 10px 15px -9px rgba(34, 60, 80, 0.2) inset;
}

.custom-border {
  border: 1px solid rgba(0, 82, 208, 0.2);
}
</style>
