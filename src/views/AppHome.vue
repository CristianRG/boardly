<template>
    <h1>Welcome to Boardly App</h1>
    <h2>Boardly is a virtual board application</h2>
    <router-link to="/boardly" class="button">Go to Board</router-link>
    <button class="button"
    @click="continueAsGuess"
    >Continue as guess</button>
</template>

<script setup>
import store from '../store/store'
import router from '../routes/routes'
import { useUser } from '../composables/useUser'

const { setUser, saveUserState } = useUser()

function continueAsGuess(){
    setUser(null, store.logged)
    saveUserState()
    router.push({path: '/boardly'})
}

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