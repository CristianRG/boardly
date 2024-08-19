<template>
    <div class="content">
        <span style="font-size: 30px; color: var(--text-color);">Nuevo</span>
        <div class="form-group" style="margin-top: 15px;">
            <label for="name">Nombre</label>
            <input type="text" id="name" class="form-control" v-model="sectionTitle">
        </div>
        <div class="buttons-group">
            <button type="button" class="btn btn-danger" @click="$emit('close')">Cancelar</button>
            <button type="button" class="btn btn-success" @click="addSection()">Aceptar</button>
        </div>
    </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue'
import store from '../../../../store/store.js';

import BoardSection from '../../../../models/BoardSection.js';
import { uuid } from 'vue-uuid';
import Board from '../../../../models/Board.js';


const emit = defineEmits(['close'])

const section = new BoardSection()

const sectionTitle = ref(section.title)


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

    emit('close')
}

</script>
<style scoped>

.content {
    display: block;
}

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

</style>