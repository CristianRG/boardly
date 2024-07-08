<template>
    <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" class="form-control" 
        v-model="sectionTitle">
    </div>
    <div class="button-group">
        <button type="button" class="btn-cancelar" @click="close()">Cancelar</button>
        <button type="button" class="btn-aceptar" @click="addSection()">Aceptar</button>
    </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue'
import store from '../../../store/store.js'

import BoardSection from '../../../models/BoardSection.js'
import { uuid } from 'vue-uuid';
import Board from '../../../models/Board.js';


const emit = defineEmits(['closeAdd'])

const section = new BoardSection()

const sectionTitle = ref(section.title)

function close() {
    emit('closeAdd')
}

function addSection() {
    section.id = uuid.v4()
    section.title = sectionTitle.value
    section.activities = []
    section.description = ''
    section.owner = store.user

    store.board.sections.push(section)

    // save in localStorage...
    const boards = JSON.parse(localStorage.getItem('boards'))
    const board = Board.fromJSON(boards.find(board => board.id == store.board.id))
    
    board.sections.push(section)

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