<template>
    <div class="form-group">
        <label for="title">Titulo</label>
        <input type="text" id="title" class="form-control" 
        v-model="titleActivity">
    </div>
    <div class="form-group">
        <label for="content">Contenido</label>
        <textarea id="content" class="form-control" rows="5"
            v-model="contentActivity"></textarea>
    </div>
    <div class="button-group">
        <button type="button" class="btn-cancelar" @click="close()">Cancelar</button>
        <button type="button" class="btn-aceptar" @click="edit()">Aceptar</button>
    </div>
</template>
<script setup>
import { defineProps, ref, defineEmits, computed } from 'vue'

import Activity from '../../../models/Activity.js'
import store from '../../../store/store.js';
import Board from '../../../models/Board.js';

const props = defineProps({
    activity: {
        type: Activity,
        required: true
    },
    boardSectionId: String
})

const emit = defineEmits(['closeEdit'])

let titleActivity = ref(props.activity.title)

let contentActivity = ref(props.activity.content)

function close() {
    emit('closeEdit')
}

function edit(){
    const editedAct = new Activity()
    editedAct.id = props.activity.id
    editedAct.owner = props.activity.owner
    editedAct.title = titleActivity.value
    editedAct.content = contentActivity.value
    editedAct.comments = props.activity.comments
    
    const indexSection = store.board.sections.findIndex(section => section.id == props.boardSectionId)

    store.board.sections[indexSection] = store.activityFunctions.updateActivity(store.board.sections[indexSection], editedAct) 

    // save in localStorage...
    const boards = JSON.parse(localStorage.getItem('boards'))
    const board = Board.fromJSON(boards.find(board => board.id == store.board.id))

    board.sections[indexSection] = store.activityFunctions.updateActivity(board.sections[indexSection], editedAct)

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
    border-bottom: 1px solid var(--text-color);
    outline: none;
    width: 100%;
    padding: 5px 0;
    font-size: 16px;
    background: none;
    transition: border-color 0.3s ease;
    color: var(--text-color);
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
    background: var(--text-color-danger);
    color: white;
    margin-right: 10px;
    border: 1px solid var(--text-color);
}

.btn-aceptar {
    background: var(--text-color-success);
    color: white;
    border: 1px solid var(--text-color);
}
</style>