<template>
    <HomeHeader />
    <h1>Welcome to Boardly App</h1>
    <h2>Boardly is a virtual board application</h2>
    <button class="btn btn-success" @click="getBoards">Get started</button>
    <Teleport to="body">
        <AlertTemplate v-if="showAlert" :alert @close="showAlert = false"/>
    </Teleport>
</template>

<script setup>

import { ref } from 'vue';
import HomeHeader from '../components/AppHome/HomeHeader.vue';
import AlertTemplate from '../components/Alerts/AlertTemplate.vue';
import { useUser } from '../composables/useUser';
import Alert from '../models/Alert';
import store from '../store/store';
import router from '../routes/routes';

const showAlert = ref(false)
const {setUser, saveUserState} = useUser()

const getBoards = () => {
    if(!store.user){
        showAlert.value = true;
    }
    else{
        router.push({name: 'Boards'})
    }
}

function continueAsGuess() {
    setUser(null, store.logged)
    saveUserState()
    router.push({ name: 'Boards' })
}

const alert = new Alert()
alert.type = alert.types.info
alert.title = 'Invitado'
alert.message = `Por el momento no podemos hacer un registro de sus datos. Sin embargo, puede continuar como invitado. Su espacio de trabajo, así como
                sus tableros serán almacenados de forma local en su navegador.`
alert.actions = [
    Alert.action('Cancelar', alert.styles.btnDanger, () => showAlert.value = false),
    Alert.action('Aceptar', alert.styles.btnSuccess, () => {continueAsGuess(), showAlert.value = false})
]

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