<template>
    <div class="card-list">
        <template v-if="mode === 'settings'">
            <div>
                <draggable v-model="items" item-key="id" handle=".drag-handle" animation="200" ghost-class="ghost"
                  chosen-class="chosen" @start="onDragStart" @end="onDragEnd">
                    <template #item="{ element }">
                        <div class="card" :class="{ 'dragging-card': isDragging }">
                            <div class="drag-handle w-10 h-10 p-2.5 mr-15px cursor-grab">
                                <svg-icon name="drag-burger" width="20" height="20" />
                            </div>
                            <div
                              class="card-content flex items-center py-[9px] px-15px border border-athens rounded-ten bg-athens-gray w-full overflow-hidden">
                                <svg-icon v-if="element.icon" :name="element.icon" width="18" height="18"
                                  class="mr-2.5 text-slate-custom" />
                                <div class="star text-red-custom mr-1">{{ element.star }}</div>
                                <div class="card-title text-sm font-normal text-space truncate">{{ element.title }}
                                </div>
                            </div>
                            <button class="settings-button" @click="openSettings(element)">
                                <svg-icon name="more-settings" width="18" height="18" />
                            </button>
                            <button class="delete-button" @click="openDeletePopup(element)">
                                <svg-icon name="more-delete" width="18" height="18" />
                            </button>
                        </div>
                    </template>
                </draggable>
                <button class="add-question-button" @click="openAddQuestionPopup">
                    <svg-icon name="accordion-plus" width="20" height="20" class="mr-5px" /><span>Добавить вопрос</span>
                </button>
            </div>
        </template>
        <template v-else>
            <div v-if="selectedQuestions.length">
                <draggable v-model="selectedQuestions" item-key="id" handle=".drag-handle" animation="200"
                  ghost-class="ghost" chosen-class="chosen" @start="onDragStart" @end="onDragEnd">
                    <template #item="{ element }">
                        <div class="card last-of-type:mb-25px" :class="{ 'dragging-card': isDragging }">
                            <div class="drag-handle w-10 h-10 p-2.5 mr-15px cursor-grab">
                                <svg-icon name="drag-burger" width="20" height="20" />
                            </div>
                            <div
                              class="card-content flex items-center py-[9px] px-15px border border-athens rounded-ten bg-athens-gray w-full overflow-hidden">
                                <svg-icon v-if="element.icon" :name="element.icon" width="18" height="18"
                                  class="mr-2.5 text-slate-custom" />
                                <div class="star text-red-custom mr-1">{{ element.star }}</div>
                                <div class="card-title text-sm font-normal text-space truncate">{{ element.title }}
                                </div>
                            </div>
                            <!-- <button class="settings-button" @click="openSettings(element)">
                                <svg-icon name="more-settings" width="18" height="18" />
                            </button> -->
                            <button class="delete-button" @click="removeSelectedQuestion(element)">
                                <svg-icon name="more-delete" width="18" height="18" />
                            </button>
                        </div>
                    </template>
                </draggable>
            </div>
            <div v-if="showDropdown" class="mb-25px">
                <my-dropdown :defaultValue="'Выберите вопрос'" :options="availableQuestions.map(i => i.title)"
                  @select="onSelectQuestion" />
            </div>
            <button class="text-sm text-dodger font-medium flex w-fit" @click="showDropdown = !showDropdown">
                <svg-icon name="accordion-plus" width="20" height="20" class="mr-5px" /><span>Добавить вопрос</span>
            </button>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from "vuedraggable";
import MyDropdown from "~/components/custom/MyDropdown.vue";

const emit = defineEmits(['open-settings', 'open-delete', 'open-add-question', 'update:selected']);
const selectedQuestions = ref([]);
const showDropdown = ref(false);

const props = defineProps({
    mode: {
        type: String,
        default: 'settings', // 'settings' или 'publish'
    },
    questions: {
        type: Array,
        default: () => [],
    }
});

const items = ref([
    { id: 1, title: 'Доводилось ли вам принимать участие в международных конференциях?', icon: 'conference', },
    { id: 2, star: '*', title: 'Какими из перечисленных программ вы вледеете?', icon: 'software', },
    { id: 3, title: 'Готов приступить к работе ближайшее время?', icon: 'ready', },
    { id: 4, title: 'Как вы относитесь к животным?', icon: 'text', },
    { id: 5, star: '*', title: 'Пожалуйста, опишите одним предложением ваш предыдущий опыт на работе?', icon: 'paragraph', },
    { id: 6, title: 'Пожалуйста, укажите удобное для вас время начала рабочего дня', icon: 'time', },
    { id: 7, star: '*', title: 'Пожалуйста, укажите дату удобного для вас дня стажировки', icon: 'meet-time', },
    { id: 8, star: '*', title: 'Пожалуйста, укажите дату от вашего трудоустройства до последнего увольнения на предыдущем месте работы', icon: 'more-calendar' },
    { id: 9, star: '*', title: 'Пожалуйста, укажите ссылку на ваше портфолио', icon: 'link' },
    { id: 10, title: 'Пожалуйста, укажите н.п. проживания', icon: 'geo-label' },
    { id: 11, title: 'Пожалуйста, загрузите файл вашей предыдущей работы ', icon: 'download' },
])

function openSettings(item) {
    console.log('Open settings popup for:', item);
    emit('open-settings');
}

function openDeletePopup(item) {
    console.log('Open delete popup for:', item);
    emit('open-delete');
}

function openAddQuestionPopup() {
    console.log('Open add question popup');
    emit('open-add-question');
}

const onDragStart = () => {
    isDragging.value = true;
};

const onDragEnd = () => {
    isDragging.value = false;
}

const isDragging = ref(false);

const availableQuestions = computed(() => {
    const base = props.mode === 'publish' ? (props.questions.length ? props.questions : items.value) : items.value;
    return base.filter(q => !selectedQuestions.value.some(sel => sel.id === q.id));
});

function onSelectQuestion(title) {
    const base = props.mode === 'publish' ? (props.questions.length ? props.questions : items.value) : items.value;
    const found = base.find(q => q.title === title);
    if (found && !selectedQuestions.value.some(q => q.id === found.id)) {
        selectedQuestions.value.push(found);
        emit('update:selected', selectedQuestions.value);
    }
    showDropdown.value = false;
}

function removeSelectedQuestion(item) {
    selectedQuestions.value = selectedQuestions.value.filter(q => q.id !== item.id);
    emit('update:selected', selectedQuestions.value);
}
</script>

<style scoped>
.card-list {
    display: flex;
    flex-direction: column;
}

.card {
    display: flex;
    align-items: center;
    background-color: transparent;
}

.card:not(:last-child) {
    margin-bottom: 12px;
}

.card-title {
    flex-grow: 1;
}

.settings-button,
.delete-button {
    border: 1px solid #edeff5;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
    background-color: #f4f6f8;
}

.add-question-button {
    color: #5898ff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    width: fit-content;
    display: flex;
    align-items: center;
    margin-top: 25px;
}
</style>