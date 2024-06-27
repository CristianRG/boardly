<template>
    <div id="mainpage">
        <nav>
            <BoardlyHeader/>
        </nav>
        <div class="sidebar" v-if="sidebarActive">
            <BoardlySidebar v-if="sidebarActive"/>
        </div>
        <main>
            <BoardlyBoard :board="store.board"/>
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
if(store.user==null){
    if(localStorage.getItem('user')) store.user = User.fromJSON(JSON.parse(localStorage.getItem('user')))
    else {
        store.user = store.userFunctions.setUser(new User(), store.logged)
        localStorage.setItem('user', JSON.stringify(store.user))
    }
}

// in case the user is no logged and doesn't exits in localStoeage define sections by default
if(!store.logged && !localStorage.getItem('boards')){
    store.boards.push(new Board('cc2bdfb7-f30d-4694-800f-bfcfe76bfda4', 'new board', 'board created by default', null, store.user, null))
    store.boards[0].sections = store.defaultBoardSections(store.user)
    localStorage.setItem('boards', JSON.stringify(store.boards))
}else{
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
    display: grid;
    grid-template-areas: 
            "nav nav nav"
            "main main main"
            "main main main";
    grid-template-columns: 12rem 1fr;
    grid-template-rows: 6rem 1fr;
}
nav {
    grid-area: nav;
    background: linear-gradient(#633EE6, #5536c5, #4620ce);
}

.sidebar {
    grid-area: sidebar;
    height: 100%;
    background: #272433;
}

main {
    grid-area: main;
    overflow-x: scroll;
    background: #35333C;
}
</style>