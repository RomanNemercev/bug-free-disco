<template>
  <div>
    <section v-if="editor"
      class="buttons flex items-center flex-wrap gap-x-4 border-t border-l border-r border-athens p-4 rounded-t-fifteen bg-athens-gray">
      <button @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active bg-dodger text-white border-dodger': editor.isActive('bold') }"
        class="p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="bold" width="20" height="20" />
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active bg-dodger text-white border-dodger': editor.isActive('bulletList') }"
        class="p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="list" width="20" height="20" />
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active bg-dodger text-white border-dodger': editor.isActive('orderedList') }"
        class="p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="orlist" width="20" height="20" />
      </button>
      <button @click="setLink" :class="{ 'is-active bg-dodger text-white border-dodger': editor.isActive('link') }"
        class="p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="link" width="20" height="20" />
      </button>
      <button @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')"
        class="disabled:text-gray-400 disabled:hover:border-athens disabled:hover:bg-white p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="unlink" width="20" height="20" />
      </button>
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()"
        class="disabled:text-gray-400 disabled:hover:border-athens disabled:hover:bg-white p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
        <svg-icon name="undo" width="20" height="20" />
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()"
        class="disabled:text-gray-400 disabled:hover:border-athens disabled:hover:bg-white p-1 border border-athens bg-white rounded-ten hover:border-border-editor hover:bg-zumthor hover:text-dodger active:bg-dodger active:text-white active:border-dodger transition-all">
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

  data() {
    return {
      editor: null,
    }
  },

  mounted() {
    this.editor = new Editor({
      editorProps: {
        attributes: {
          class: 'border border-athens p-4 min-h-[460px] max-h-[460px] overflow-y-auto outline-none prose max-w-none rounded-b-fifteen bg-athens-gray',
        },
      },
      content: `<div class="mb-4">
      <h4 class="text-15px font-medium text-space about">О компании</h4>
      <ul class="ml-6 mt-2 text-gray-700">
        <li></li>
        </ul>
    </div>
    <div class="mb-4">
      <h4 class="text-15px font-medium text-space">Требования</h4>
      <ul class="ml-6 mt-2 text-gray-700">
        <li></li>
      </ul>
    </div>
    <div class="mb-4">
      <h4 class="text-15px font-medium text-space">Обязанности</h4>
      <ul class="ml-6 mt-2 text-gray-700">
        <li></li>
      </ul>
    </div>
    <div class="mb-4">
      <h4 class="text-15px font-medium text-space">Условия</h4>
      <ul class="ml-6 mt-2 text-gray-700">
        <li></li>
      </ul>
    </div>`,
      extensions: [StarterKit, Link.configure({
        openOnClick: true,
        defaultProtocol: 'https',
      }),],
    })
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
