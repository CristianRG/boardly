<template>
    <div id="mainpage">
        <BoardlySidebar :board="store.board"/>
        <main>
            <BoardlyBoard :board="store.board" />
        </main>
    </div>
</template>

<script setup>

import BoardlyHeader from '../components/BoardlyHome/BoardlyHeader.vue'
import BoardlyBoard from '../components/BoardlyHome/BoardlyBoard.vue'
import BoardlySidebar from '../components/BoardlyHome/BoardlySidebar.vue'

import Board from '../models/Board.js'
import User from '../models/User.js'

import store from '../store/store.js'
import { ref } from 'vue'

const sidebarActive = ref(false)

// define user to default when user is no logged and is no saved in localStorage
if (store.user == null) {
    if (localStorage.getItem('user')) store.user = User.fromJSON(JSON.parse(localStorage.getItem('user')))
    else {
        store.user = store.userFunctions.setUser(new User(), store.logged)
        localStorage.setItem('user', JSON.stringify(store.user))
    }
}

// in case the user is no logged and doesn't exits in localStoeage define sections by default
if (!store.logged && !localStorage.getItem('boards')) {
    store.boards.push(new Board('cc2bdfb7-f30d-4694-800f-bfcfe76bfda4', 'new board', 'board created by default', null, store.user, null))
    store.boards[0].sections = store.defaultBoardSections(store.user)
    localStorage.setItem('boards', JSON.stringify(store.boards))
} else {
    store.boards = JSON.parse(localStorage.getItem('boards')).map(board => {
        return Board.fromJSON(board)
    })
}


const board = store.boards[0]

store.board = board


</script>

<style scoped>
#mainpage {
    width: 100%;
    height: 100vh;
    display: flex;
}

main {
    height: 100%;
    width: 100%;
    background-color: var(--body-color);
    transition: var(--tran-05);
    overflow-x: scroll;
    overflow-y: scroll;
    /* background: #35333C; */
}

.sidebar.close~main{
    left: 78px;
    height: 100vh;
}
</style>