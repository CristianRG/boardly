<template>
    <div class="card">
        <div class="login" v-if="showLogForm">
            <!-- Your login form goes here -->
            <h1 style="margin-bottom: 2rem; color: #623EE6;">Inicia sesión</h1>
            <form @submit.prevent="login">
                <label for="username">Usuario</label>
                <input type="text" id="username" v-model="username" />
                <label for="password">Contraseña</label>
                <input type="password" id="password" v-model="password" />
                <button class="btn btn-danger" @click="router.push({ name: 'Home' })">Cancelar</button>
                <button class="btn btn-success" type="submit" @click="handleLogin">Login</button>
            </form>
            <span>¿Aún no tines una cuenta? <a href="#" @click="showLogForm = false">Click aquí</a> para
                registrarte</span>
        </div>
        <div class="signup" v-if="!showLogForm">
            <!-- Your signup form goes here -->
            <h5 style="margin-bottom: 2rem; color: #623EE6">Regístrate</h5>
            <form @submit.prevent="signup">
                <label for="signupUsername">Nombre de Usuario</label>
                <input type="text" id="signupUsername" v-model="signupUsername" />
                <label for="signupEmail">Correo electrónico</label>
                <input type="email" id="signupEmail" v-model="signupEmail" />
                <label for="signupPassword">Contraseña</label>
                <input type="password" id="signupPassword" v-model="signupPassword" />
                <button class="btn btn-danger" @click="router.push({ name: 'Home' })">Cancelar</button>
                <button class="btn btn-success" type="submit">Signup</button>
            </form>
            <span>¿Ya tienes una cuenta? <a href="#" @click="showLogForm = true">Click aquí</a> para iniciar
                sesión</span>
        </div>
        <div class="message">
            <span>{{ errorMessage }}</span>
        </div>
    </div>
</template>

<script setup>
import router from '../../routes/routes'
import { ref, watch } from 'vue'
import { useFetch } from '../../composables/useFetch';
import store from '../../store/store';
const {URL, data, fetchData, resultResponse, postData} = useFetch()
const username = ref('')
const password = ref('')
const signupUsername = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const showLogForm = ref(true)
const errorMessage = ref('')

const handleLogin = async () => {
    //URL.value = `${store.URL_BASE}/ping`
    URL.value = `${store.URL_BASE}${store.SERVICE_API}/user/login`
    data.value = {email: username.value, password: password.value}
    await postData()
    if(resultResponse.value.status == 404){
        errorMessage.value = resultResponse.value.message
    }
    console.log(resultResponse.value)
}

</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35rem;
    min-width: 15rem;
    height: fit-content;
    background-color: var(--section-color);
    border-radius: 5px;
    padding: 1rem;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
}

.login,
.signup {
    padding: 1rem;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login h1, .signup h5{
    font-size: 30px;
}

form {
    width: 100%;
}

form button {
    margin-right: 5px;
}

.login input,
.signup input {
    margin-bottom: 1rem;
    padding: .5rem;
    width: 100%;
    border: none;
    outline: none;
    background-color: var(--section-color);
    color: var(--text-color);
    border-bottom: 1px solid var(--text-color);
    transition: border-color 0.3s ease;
}

.login input:focus,
.signup input:focus {
    border-bottom-color: #623EE6;
}

.login label,
.signup label {
    margin-bottom: .5rem;
    color: var(--text-color);
}

.login span,
.signup span {
    color: var(--text-color);
    margin-top: 1rem;
}

.message {
    height: 1rem;
    color: var(--color-danger);
}
</style>