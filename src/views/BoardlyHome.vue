<template>
    <div id="mainpage">
        <BoardlyHeader style="left: 0px; width: 100%;"/>
        <main>
            <BoardlyBoards />
        </main>
    </div>
</template>

<script setup>

import BoardlyHeader from '../components/BoardlyHome/BoardlyBoard/BoardlyHeader.vue'
import BoardlyBoards from '../components/BoardlyHome/BoardlyBoards.vue'



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

</style>