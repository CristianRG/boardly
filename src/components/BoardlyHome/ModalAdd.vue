<template>
    <div class="form-group">
        <label for="title">Titulo</label>
        <input type="text" id="title" class="form-control" placeholder="Titulo" 
        v-model="titleActivity">
    </div>
    <div class="form-group">
        <label for="content">Contenido</label>
        <textarea id="content" class="form-control" placeholder="Contenido" rows="5"
            v-model="contentActivity"></textarea>
    </div>
    <div class="button-group">
        <button type="button" class="btn-cancelar" @click="close()">Cancelar</button>
        <button type="button" class="btn-aceptar" @click="addActivity()">Aceptar</button>
    </div>
</template>
<script setup>
import { defineProps, ref, defineEmits } from 'vue'
import store from '../../store/store.js'

import Activity from '../../models/Activity.js'
import { uuid } from 'vue-uuid';
import Board from '../../models/Board.js';

const props = defineProps({
    boardSectionId: String
})

const emit = defineEmits(['closeAdd'])

const activity = new Activity()

const boardSectionId = props.boardSectionId

let titleActivity = ref(activity.title)

let contentActivity = ref(activity.content)

function close() {
    emit('closeAdd')
}

function addActivity() {
    activity.id = uuid.v4()
    activity.title = titleActivity.value
    activity.content = contentActivity.value
    activity.owner = store.user
    activity.comments = []

    const indexSection = store.board.sections.findIndex(section => section.id == boardSectionId)

    store.board.sections[indexSection].activities.push(activity)

    // save in localStorage...
    const boards = JSON.parse(localStorage.getItem('boards'))
    const board = Board.fromJSON(boards.find(board => board.id == store.board.id))
    
    board.sections[indexSection].activities.push(activity)

    // replace element in boards who has the same id at the board
    const indexBoard = boards.findIndex(board => board.id == store.board.id)
    boards[indexBoard] = board

    localStorage.setItem('boards', JSON.stringify(boards))
    
    close()
}

</script>
<style scoped>
.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
textarea {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    width: 100%;
    padding: 5px 0;
    font-size: 16px;
    background: none;
    transition: border-color 0.3s ease;
}

textarea {
    resize: none;
}

input[type="text"]:focus,
textarea:focus {
    border-bottom: 1px solid #623EE6;
}

.btn-cancelar,
.btn-aceptar {
    border: none;
    outline: none;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 5px;
}

.btn-cancelar {
    background: #1a1822;
    color: white;
    margin-right: 10px;
    border: 1px solid #ccc;
}

.btn-aceptar {
    background: #623EE6;
    color: white;
    border: 1px solid #ccc;
}
</style>