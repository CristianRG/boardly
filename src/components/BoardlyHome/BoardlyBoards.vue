<template>
    <div class="boards">
        <BoardCard v-for="board in store.boards" :board="board" />
        <ModalTemplate 
        v-if="false"
        :modal />

    </div>
</template>
<script setup>
import store from '../../store/store';
import BoardCard from './BoardCard.vue';
import Board from '../../models/Board';
import ModalTemplate from '../Modals/ModalTemplate.vue';

const JSONboards = JSON.parse(localStorage.getItem('boards'))
const boards = JSONboards.map((board) => { return Board.fromJSON(board) })
store.boards = boards

let modal = {
    content: [
        { target: 'input', options: [{ key: 'type', value: 'text' }, {key: 'placeholder', value: 'Example'}] }
    ]
}

// const input = document.createElement('input')
// input.placeholder

</script>
<style scoped>
.boards {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-left: 10px;
    padding-right: 5px;
}
</style>