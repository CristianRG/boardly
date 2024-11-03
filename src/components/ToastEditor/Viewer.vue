<template>
    <div>
        <div ref="viewer"></div>
    </div>
</template>
<script setup>
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import { onMounted, ref, watch } from 'vue';
const props = defineProps({
    content: {
        type: String,
        required: true
    }
})
const viewer = ref()
let v = null
onMounted(() => {
    v = new Viewer({
        el: viewer.value,
        height: '600px',
        initialValue: ''
    })
    v.setMarkdown(props.content)
})

watch(() => props.content, (newV) => {
    v.setMarkdown(newV)
})
</script>
<style scoped>
div {
    width: 100%;
    height: fit-content;
}
</style>