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
import { defineEmits, defineProps, onMounted, ref } from 'vue'
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
    background: #1a1822;;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 5px;
    max-width: 400px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: black;
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