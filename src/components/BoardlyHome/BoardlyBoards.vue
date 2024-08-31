<template>
    <div class="boards">
        <BoardCard v-for="board in store.boards" :board="board" />
        <ModalTemplate :content="ModalNewBoard" :show @close="show=false" />
        <AddButton message="Nuevo tablero" @click="show = true" />
    </div>
</template>
<script setup>
import store from '../../store/store';
import BoardCard from './BoardCard.vue';
// import Board from '../../models/Board';
import ModalTemplate from '../Modals/ModalTemplate.vue';
import ModalNewBoard from './ModalNewBoard.vue';
import AddButton from '../Common/AddButton.vue';
import { ref } from 'vue';

// console.log(store.boards)

// const JSONboards = localStorage.getItem('boards') ? JSON.parse(localStorage.getItem('boards')) : []
// const boards = JSONboards.length != 0 ? JSONboards.map((board) => { return Board.fromJSON(board) }) : []
// store.boards = boards
const show = ref(false)

</script>
<style scoped>
.boards {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-left: 10px;
    padding-right: 5px;
}
</style>