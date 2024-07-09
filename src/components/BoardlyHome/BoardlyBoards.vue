<template>
    <div class="boards">
        <BoardCard 
        v-for="board in store.boards" :board="board"
        />
    </div>
</template>
<script setup>
import store from '../../store/store';
import BoardCard from './BoardCard.vue';
import Board from '../../models/Board';

const JSONboards = JSON.parse(localStorage.getItem('boards'))
const boards = JSONboards.map((board) => { return Board.fromJSON(board) })
store.boards = boards
</script>
<style scoped>
.boards{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-left: 5px;
    padding-right: 5px;
}
</style>