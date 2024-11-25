<template>
    <div id="mainpage">
        <HomeHeader />
        <main>
            <!-- <h1 style="margin: 0%; margin-left: 10px; margin-bottom: 5px; color: var(--text-color); font-size: 25px;">Recientes</h1> -->
            <h2 style="margin: 0%; margin-left: 10px; margin-bottom: 5px; margin-top: 15px; color: var(--text-color); font-size: 20px; font-weight: bold;">Tu espacio de trabajo</h2>
            <BoardlyBoards />
        </main>
    </div>
</template>

<script setup>

import BoardlyBoards from '../components/BoardlyHome/BoardlyBoards.vue'
import HomeHeader from '../components/AppHome/HomeHeader.vue';
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