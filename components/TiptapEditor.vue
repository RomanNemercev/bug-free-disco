<template>
  <div>
    <section v-if="editor"
      class="buttons flex items-center flex-wrap gap-x-2.5 border-t border-l border-r border-athens px-3.5 py-15px rounded-t-fifteen bg-athens-gray">
      <button @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active bg-dodger text-white border-dodger': editor.isActive('bold') }"
        class="w-10 h-10 flex-center p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="bold" width="20" height="20" />
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active bg-dodger text-white border-dodger': editor.isActive('italic') }"
        class="w-10 h-10 flex-center p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="italic" width="20" height="20" />
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active bg-dodger text-white border-dodger': editor.isActive('bulletList') }"
        class="w-10 h-10 flex-center p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="list" width="20" height="20" />
      </button>
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()"
        class="w-10 h-10 flex-center disabled:text-gray-400 disabled:hover:border-athens disabled:hover:bg-white p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="undo" width="20" height="20" />
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()"
        class="w-10 h-10 flex-center disabled:text-gray-400 disabled:hover:border-athens disabled:hover:bg-white p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="redo" width="20" height="20" />
      </button>
    </section>
    <editor-content :editor="editor" class="list-unreset" />
  </div>
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
// import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  newVacancy: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const defaultContent = computed(() => {
  return props.newVacancy
    ? `<div>
        <h4>О компании</h4>
        <ul><li></li></ul>
      </div>
      <div>
        <h4>Требования</h4>
        <ul><li></li></ul>
      </div>
      <div>
        <h4>Обязанности</h4>
        <ul><li></li></ul>
      </div>
      <div>
        <h4>Условия</h4>
        <ul><li></li></ul>
      </div>`
    : '<p></p>';
});

const editor = ref(null)

watch(() => props.newVacancy, () => {
  if (editor.value) {
    editor.value.commands.setContent(props.modelValue || defaultContent.value);
  }
});

onMounted(() => {
  editor.value = new Editor({
    editorProps: {
      attributes: {
        class: 'border border-athens py-15px px-3.5 min-h-[460px] max-h-[460px] overflow-y-auto outline-none prose max-w-none rounded-b-fifteen bg-athens-gray',
      },
    },
    content: props.modelValue || defaultContent.value,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
        defaultProtocol: 'https',
      }),
      Placeholder.configure({
        placeholder: 'Начните вводить...',
      }),
    ],
    onUpdate: () => {
      emit('update:modelValue', editor.value.getHTML());
    },
  });
});

onUnmounted(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<style lang="scss" scoped>
.is-active.bg-dodger {
  background-color: #5898FF;
}

.is-active.bg-dodger:hover {
  color: #ffffff;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  color: #79869a;
  font-size: 14px;
  font-weight: 400;
  content: attr(data-placeholder);
  height: 0;
  pointer-events: none;
  position: absolute;
  top: 17px;
  left: 14px;
}
</style>
