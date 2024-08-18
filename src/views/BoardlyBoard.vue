<template>
    <div id="mainpage">
        <BoardlySidebar 
        v-if="store.board"
        :board="store.board"/>
        <BoardlyHeader />
        <main>
            <BoardlyBoard 
            v-if="store.board"
            :board="store.board" />
        </main>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import store from '../store/store.js'

import BoardlyHeader from '../components/BoardlyHome/BoardlyBoard/BoardlyHeader.vue'
import BoardlyBoard from '../components/BoardlyHome/BoardlyBoard/BoardlyBoard.vue'
import BoardlySidebar from '../components/BoardlyHome/BoardlyBoard/BoardlySidebar.vue'
import Board from '../models/Board.js'
import router from '../routes/routes.js'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const JSONboards = JSON.parse(localStorage.getItem('boards'))
store.boards = JSONboards.map(b => { return Board.fromJSON(b) })
const board = JSONboards.find(board => board.id === props.id)

if (!board) {
    router.push({name: '404'})
}
else{
    store.board = Board.fromJSON(board)
}

</script>

<style scoped>
#mainpage {
    width: 100%;
    height: 100vh;
    display: flex;
}

main {
    display: flex;
    flex-direction: column;
    height: calc(100% - 4rem);
    width: 100%;
    background-color: var(--body-color);
    transition: var(--tran-05);
    overflow-x: scroll;
    overflow-y: scroll;
    margin-top: 4rem;
    padding-top: 10px;
    /* background: #35333C; */
}

::-webkit-scrollbar {
    display: none;
}

</style>