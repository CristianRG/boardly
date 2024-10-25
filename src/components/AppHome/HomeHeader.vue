<template>
    <nav class="home-header">
        <BoardlyBanner />
        <ul>
            <li class="mode">
                <div class="sun-moon">
                    <i class="bx bx-moon icon moon"></i>
                    <i class="bx bx-sun icon sun"></i>
                </div>
                <!-- <span class="mode-text text" ref="modeText">Dark mode</span> -->

                <div class="toggle-switch" ref="modeSwitch">
                    <span class="switch"></span>
                </div>
            </li>
            <li v-if="!store.user && !store.logged">
                <a href="#" class="guess" @click="showAlert = true">Invitado</a>
            </li>
            <li v-if="store.user" style="width: 3.5rem;">
                <BoardlyUser :user="store.user" />
            </li>
            <!-- <li v-if="!store.logged || !store.user">
                <a @click="router.push({name: 'Login'})" class="login">Acceder</a>
            </li> -->
        </ul>
    </nav>
    <Teleport to="body">
        <AlertTemplate v-if="showAlert" :alert @close="showAlert = false"/>
    </Teleport>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import BoardlyBanner from '../icons/BoardlyBanner.vue'
import AlertTemplate from '../Alerts/AlertTemplate.vue'
import { useUser } from '../../composables/useUser'
import { useLocalStorage } from '../../composables/useLocalStorage'
import store from '../../store/store'
import router from '../../routes/routes'
import BoardlyUser from '../icons/BoardlyUser.vue'
import Alert from '../../models/Alert'

const { setUser, saveUserState } = useUser()

const { setItem } = useLocalStorage()

// Dark mode toggle
onMounted(() => {
    const body = document.querySelector('body')
    const modeSwitch = body.querySelector('.toggle-switch')
    setItem('theme', body.classList.contains('dark') ? 'dark' : 'light')
    store.theme = body.classList.contains('dark') ? 'dark' : 'light'

    modeSwitch.addEventListener('click', () => {
        body.classList.toggle('dark')
        setItem('theme', body.classList.contains('dark') ? 'dark' : 'light')
        store.theme = body.classList.contains('dark') ? 'dark' : 'light'
    })
})

function continueAsGuess() {
    setUser(null, store.logged)
    saveUserState()
    router.push({ name: 'Boards' })
}
const showAlert = ref(false)

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
.home-header {
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 4rem;
    background: var(--section-color);
}

ul {
    width: fit-content;
    height: 100%;
    list-style-type: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0%;
    margin: 0%;
    margin-right: 15px;
}

li a {
    padding: 15px;
    color: var(--text-color);
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
}

.mode {
    width: 80px;
    display: flex;
    gap: 5px;
    padding: 10px;
    border-radius: 5px;
    background-color: var(--primary-color-light);
    position: relative;
    transition: var(--tran-05);
}

.mode .sun-moon {
    height: 20px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}

.mode .sun-moon i {
    position: absolute;
}

.mode .sun-moon i.sun {
    opacity: 0;
}

body.dark .mode .sun-moon i.sun {
    opacity: 1;
}

body.dark .mode .sun-moon i.moon {
    opacity: 0;
}

.toggle-switch {
    right: 0;
    height: 100%;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;
}

.toggle-switch .switch {
    position: relative;
    height: 20px;
    width: 40px;
    margin-right: 20px;
    border-radius: 25px;
    background-color: var(--toggle-color);
    transition: var(--tran-05);
}

.switch::before {
    content: "";
    position: absolute;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    background-color: var(--sidebar-color);
    transition: var(--tran-04);
}

body.dark .switch::before {
    left: 20px;
}

.guess {
    background: var(--primary-color-light);
}

.login {
    background: var(--primary-color);
    color: #fff;
}
</style>