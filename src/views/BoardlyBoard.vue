<template>
    <div id="mainpage">
        <BoardlySidebar v-if="store.board" :board="store.board" />
        <BoardlyHeader />
        <main>
            <BoardlyBoard v-if="store.board" :board="store.board" @scroll="handleScrollLeft" />
        </main>
    </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, ref, watch } from 'vue'
import store from '../store/store.js'

import BoardlyHeader from '../components/BoardlyHome/BoardlyBoard/Board/BoardlyHeader.vue'
import BoardlyBoard from '../components/BoardlyHome/BoardlyBoard/Board/BoardlyBoard.vue'
import BoardlySidebar from '../components/BoardlyHome/BoardlyBoard/Board/BoardlySidebar.vue'
import NotificationTemplate from '../components/Alerts/NotificationTemplate.vue'
import Board from '../models/Board.js'
import router from '../routes/routes.js'
import stack from '../store/stack.js'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

let board

// const JSONboards = JSON.parse(localStorage.getItem('boards'))
// store.boards = JSONboards.map(b => { return Board.fromJSON(b) })
board = store.boards.find(b => b.id == props.id)


if (!board) {
    router.push({ name: '404' })
}
else {
    store.board = Board.fromJSON(board)
}

let isDown = false;
let startX;
let scrollLeft;

onMounted(() => {
    const scrollContainer = document.querySelector('main');
    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.classList.add('active')
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        scrollContainer.classList.remove('active');
        isDown = false;
    });

    scrollContainer.addEventListener('mouseup', () => {
        scrollContainer.classList.remove('active');
        isDown = false;
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2; // Ajusta la velocidad de desplazamiento multiplicando por un número mayor o menor
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // event to listen when CTRL-Z is pressed to get the last item
    window.addEventListener('keydown', (event) => {
        if(event.ctrlKey && event.key == 'z'){
            handleCTRLZ()
        }
    })

    window.addEventListener('keydown', (event) => {
        if(event.ctrlKey && event.key == 'y'){
            handleCTRLY()
        }
    })
})

const handleScrollLeft = () => {
    const scrollContainer = document.querySelector('main')
    scrollContainer.scrollLeft = scrollContainer.scrollWidth
}

const handleCTRLZ = () => {
    if(stack.oldDataStack.length > 0){
        store.board = stack.oldDataStack.pop()
        stack.lastDataStack.push(store.board)
    }
}

const handleCTRLY = () => {
    if(stack.lastDataStack.length > 0){
        store.board = stack.lastDataStack.pop()
        stack.oldDataStack.push(store.board)
    }
}

watch((store.board), (newData, oldData) => {
    stack.lastData = (Board.fromJSON({...newData}))
    stack.oldDataStack.push(Board.fromJSON({...oldData}))
})


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

main:active {
    cursor: grabbing;
}

::-webkit-scrollbar {
    display: none;
}
</style>