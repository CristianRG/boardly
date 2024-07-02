<template>
    <div id="nav-header">
        <div class="banner">
            <BoardlyBanner/>
        </div>
        <div class="options">
            <BoardlyUser :user="store.user"/>
        </div>
    </div>
</template>

<script setup>
import BoardlyBanner from '../icons/BoardlyBanner.vue';
import BoardlyUser from '../icons/BoardlyUser.vue';
import store from '../../store/store';
</script>

<style scoped>
    #nav-header {
        position: fixed;
        left: 90px;
        z-index: 10;
        width: calc(100% - 90px);
        height: 4rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: var(--sidebar-color);
    }

    .banner {
        width: fit-content;
        height: 100%;
    }

    .options {
        width: 4rem;
        height: 3.7rem;
        margin-right: 5px;
    }
</style>