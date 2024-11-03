<script setup>
import Editor from '@toast-ui/editor'
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  content: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['update']);
const editor = ref();

onMounted(() => {
  const e = new Editor({
    el: editor.value,
    height: '350px',
    initialEditType: 'wysiwyg',
    initialValue: props.content,  // Establecer valor inicial al crear el editor
    events: {
      change: () => {
        if (e.getMarkdown()) {
          emit('update', e.getMarkdown())
        }
      },
    },
  });

  watch(
    () => props.content,
    (newContent) => {
      if (e.getMarkdown() !== newContent) {
        e.setMarkdown(newContent);
      }
    }
  );
});
</script>

<template>
  <div>
    <div ref="editor" style="margin-bottom: 1rem;" />
  </div>
</template>

<style scoped>
div {
  width: 100%;
}
</style>