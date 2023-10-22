<template>
    <div>
      <div ref="editor" class="quill-editor"></div>
    </div>
  </template>
  
  <script>
  import Quill from 'quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
//   import { QuillEditor } from '@vueup/vue-quill';
  import { ref } from 'vue';

  export default {
    props: {
      value: '', // The value passed to v-model
    },
    data() {
      return {
        editor: null,
      };
    },
    mounted() {
      // Initialize Quill with options if needed
      this.editor = new Quill(this.$refs.editor, {
        theme: 'snow', // or 'bubble' for bubble theme
      });
  
      // Set the initial content of the editor
      this.editor.root.innerHTML = this.value;
  
      // Listen for 'text-change' events and emit the value
      this.editor.on('text-change', () => {
        this.$emit('input', this.editor.root.innerHTML);
      });
    },
    watch: {
      value: function (newValue) {
        // Update the editor content when the v-model value changes
        if (this.editor) {
          this.editor.root.innerHTML = newValue;
        }
      },
    },
  };
  </script>