<template>
    <div id="logo"
    @click="router.push({name: 'Home'})"
    >
        <h1>Boardly</h1>
    </div>
</template>

<script setup>
import router from '../../routes/routes';
</script>
<style scoped>
#logo {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    color: var(--text-color);
}
h1 {
    margin: 0%;
    font-size: 2.5rem;
}
</style>