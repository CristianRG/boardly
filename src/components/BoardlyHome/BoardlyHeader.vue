<template>
    <div id="nav-header">
        <div class="banner">
            <BoardlyBanner/>
        </div>
        <div class="options">
            <BoardlyUser/>
        </div>
    </div>
</template>

<script setup>
import BoardlyBanner from '../icons/BoardlyBanner.vue';
import BoardlyUser from '../icons/BoardlyUser.vue';
</script>

<style scoped>
    #nav-header {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .banner {
        width: fit-content;
        height: 100%;
    }

    .options {
        width: 80px;
        height: 100%;
    }
</style>