<template>
    <div class="modal">
        <div class="modal-content" :class="styleClass">
            <span class="close"
            @click="close()"
            >&times;</span>
            <h2>{{ title }}</h2>
            <ModalAdd :boardSectionId="boardSectionId" @closeAdd="close()"/>
        </div>
    </div>
</template>
<script setup>
import { defineEmits, defineProps, ref } from 'vue'
import ModalAdd from '../BoardlyHome/ModalAdd.vue'

const props = defineProps({
    title: String,
    boardSectionId: String
})

let title = ref(props.title)

const boardSectionId = props.boardSectionId

const emit = defineEmits(['close'])

let styleClass = ref('slide-in-top')

function close() {
    styleClass.value ='slide-out-top'
    setTimeout(()=> {
        emit('close')
    }, 500)
}

</script>
<style scoped>
.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: var(--modal-color);
    margin: 15% auto;
    padding: 20px;
    border: 1px solid var(--text-color);
    border-radius: 5px;
    max-width: 400px;
    color: var(--text-color);
}

.close {
    color: var(--text-color);
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: var(--text-color-danger);
    text-decoration: none;
    cursor: pointer;
}

.content-activity {
    margin-bottom: 5px;
    padding: 5px;
}

.content-edit {
    display: flex;
    justify-content: end;
    margin-bottom: 15px;
}

</style>