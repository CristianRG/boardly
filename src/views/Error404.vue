<template>
    <main>
        <span>Oops... Pagina no encontrada</span>
        <span style="color: var(--color-danger);">404</span>
        <router-link to="/">Volver al inicio</router-link>
    </main>
</template>
<style scoped>
main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 50px;
    font-weight: bold;
    color: var(--text-color);
}

a{
    text-decoration: none;
    margin-top: 20px;
    font-size: 20px;
}
</style>