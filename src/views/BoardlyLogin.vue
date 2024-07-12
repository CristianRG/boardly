<template>
    <div class="container-login">
        <LoginCard />
    </div>
</template>

<script setup>
import LoginCard from '../components/BoardlyLogin/LoginCard.vue'
</script>
<style scoped>
.container-login{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>