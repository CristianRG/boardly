<template>
    <div id="title">
        <h4 :contenteditable="editTitle" ref="titleRef" @blur="handleBlur" @keydown.enter="handleEnter">{{ section.title
            }}</h4>
        <div id="options">
            <Edit @click="makeEditable" />
            <Delete @click="deleteBoard()"/>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick, toRef } from 'vue'

import Edit from '../../icons/Edit.vue'
import Delete from '../../icons/Delete.vue'
import BoardSection from '../../../models/BoardSection'
import store from '../../../store/store'
import Board from '../../../models/Board'

const props = defineProps({
    section: {
        type: BoardSection,
        required: true
    }
})

const editTitle = ref(false)
const titleRef = ref(null)
const originalTitle = toRef(props.section.title) // Referencia reactiva al título original

const makeEditable = () => {
    editTitle.value = true
    nextTick(() => {
        titleRef.value.focus()
    })
}

const handleBlur = () => {
    editTitle.value = false
    updateTitle()
}

const handleEnter = () => {
    editTitle.value = false
    titleRef.value.blur() // Desenfoca el h4
}

const updateTitle = () => {
    const newTitle = titleRef.value.innerText.trim()
    if (newTitle !== originalTitle.value) {
        // Actualizar el título en la base de datos aquí
        console.log('Nuevo título:', newTitle)
        // Aquí podrías hacer una llamada a tu API para actualizar la base de datos
        // Por ejemplo:
        // api.updateSectionTitle(props.section.id, newTitle)
        // .then(response => {
        //     console.log('Título actualizado exitosamente', response)
        // })
        // .catch(error => {
        //     console.error('Error al actualizar el título', error)
        // })
        const indexSection = store.board.sections.findIndex(section => section.id == props.section.id)
        store.board.sections[indexSection].title = newTitle

        // save in localStorage
        const boards = JSON.parse(localStorage.getItem('boards'))
        const board = Board.fromJSON(boards.find(board => board.id == store.board.id))

        board.sections[indexSection].title = newTitle

        // replace element in boards who has the same id at the board
        const indexBoard = boards.findIndex(board => board.id == store.board.id)
        boards[indexBoard] = board

        localStorage.setItem('boards', JSON.stringify(boards))
         // Actualizar el valor reactivo del título original
    }
}

function deleteBoard(){
    const indexSection = store.board.sections.findIndex(section => section.id == props.section.id)
    store.board.sections.splice(indexSection, 1)

    // save in localStorage
    const boards = JSON.parse(localStorage.getItem('boards'))
    const board = Board.fromJSON(boards.find(board => board.id == store.board.id))

    board.sections.splice(indexSection, 1)

    // replace element in boards who has the same id at the board
    const indexBoard = boards.findIndex(board => board.id == store.board.id)
    boards[indexBoard] = board

    localStorage.setItem('boards', JSON.stringify(boards))
}

</script>

<style scoped>
#title {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

h4 {
    color: var(--text-color);
    font-size: 20px;
    font-weight: bold;
    margin: 0;
}

h4:focus {
    outline: none;
    border-bottom: 1px solid var(--primary-color);
}

#options {
    display: flex;
    align-items: center;
}
</style>