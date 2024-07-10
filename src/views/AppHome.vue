<template>
    <HomeHeader />
    <h1>Welcome to Boardly App</h1>
    <h2>Boardly is a virtual board application</h2>
    <router-link to="/boardly" class="button">Go to Board</router-link>
</template>

<script setup>

import HomeHeader from '../components/AppHome/HomeHeader.vue';


</script>
<style scoped>
.button{
    background: #623EE6;
    color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px 20px;
}
</style>