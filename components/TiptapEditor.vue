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
      <button @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active bg-dodger text-white border-dodger': editor.isActive('orderedList') }"
        class="w-10 h-10 flex-center p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="orlist" width="20" height="20" />
      </button>
      <button @click="setLink" :class="{ 'is-active bg-dodger text-white border-dodger': editor.isActive('link') }"
        class="w-10 h-10 flex-center p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="link" width="20" height="20" />
      </button>
      <button @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')"
        class="w-10 h-10 flex-center disabled:text-gray-400 disabled:hover:border-athens disabled:hover:bg-white p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="unlink" width="20" height="20" />
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

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: String
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(newValue) {
      if (this.editor && this.editor.getHTML() !== newValue) {
        this.editor.commands.setContent(newValue, false); // обновляем контент, но без триггера обновления
      }
    }
  },

  mounted() {
    this.editor = new Editor({
      editorProps: {
        attributes: {
          class: 'border border-athens py-15px px-3.5 min-h-[460px] max-h-[460px] overflow-y-auto outline-none prose max-w-none rounded-b-fifteen bg-athens-gray',
        },
      },
      content: this.modelValue || `<div>
      <h4>О компании</h4>
      <ul>
        <li></li>
        </ul>
    </div>
    <div>
      <h4>Требования</h4>
      <ul>
        <li></li>
      </ul>
    </div>
    <div>
      <h4>Обязанности</h4>
      <ul>
        <li></li>
      </ul>
    </div>
    <div>
      <h4>Условия</h4>
      <ul>
        <li></li>
      </ul>
    </div>`,
      extensions: [StarterKit, Link.configure({
        openOnClick: true,
        defaultProtocol: 'https',
      }),],
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML()); // обновляем данные в родительском компоненте
      }
    });
  },

  methods: {
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()

        return
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss" scoped>
.is-active.bg-dodger {
  background-color: #5898FF;
}

.is-active.bg-dodger:hover {
  color: #ffffff;
}
</style>
