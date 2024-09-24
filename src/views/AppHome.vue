<template>
    <HomeHeader />
    <main>
        <section style="margin-left: 12px;">
            <h1 style="margin: 0%;">Boarldy Note App</h1>
            <p>Una aplicación de notas minimalista.
                <br>Organiza tus actividades en flujos de trabajo.
                <br><strong>Simple, sencillo y eficiente.</strong>
                <br>
                <br>¡Comienza ahora!
            </p>
            <button class="btn btn-success" style="font-size: 15px;" @click="getBoards">Comenzar</button>
        </section>
        <section>
            <img v-if="store.theme == 'dark'" src="/img/dark_design_boardly.webp" alt="dark_design">
            <img v-if="store.theme == 'light'" src="/img/light_design_boardly.webp" alt="ligth_design">
            <span style="display: inline-block; padding-left: 10px; font-size: 20px; font-style: italic;">Take notes,
                organize your thoughts</span>
        </section>
    </main>
    <HomeFooter />
    <Teleport to="body">
        <AlertTemplate v-if="showAlert" :alert @close="showAlert = false" />
    </Teleport>
</template>

<script setup>

import { ref } from 'vue';
import HomeHeader from '../components/AppHome/HomeHeader.vue';
import AlertTemplate from '../components/Alerts/AlertTemplate.vue';
import HomeFooter from '../components/AppHome/HomeFooter.vue';
import { useUser } from '../composables/useUser';
import Alert from '../models/Alert';
import store from '../store/store';
import router from '../routes/routes';

const showAlert = ref(false)
const { setUser, saveUserState } = useUser()

const getBoards = () => {
    if (!store.user) {
        showAlert.value = true;
    }
    else {
        router.push({ name: 'Boards' })
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
    Alert.action('Aceptar', alert.styles.btnSuccess, () => { continueAsGuess(), showAlert.value = false })
]

</script>
<style scoped>
main {
    width: 100%;
    height: calc(100% - 8rem);
    margin-top: 4rem;
    display: flex;
    color: var(--text-color);

    & section {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;

        & h1 {
            font-size: 60px;
        }

        & p {
            font-size: 30px;
        }

        & button {
            width: fit-content;
        }
    }
}

@media (max-width: 1000px) {
    main {
        flex-direction: column;

        & section {
            width: 100%;
            height: 50%;
        }

        & section:nth-child(1){
            
            & h1 {
                font-size: 30px;
            }

            & p {
                font-size: 20px;
            }
        }


        & section:nth-child(2) {
            flex-direction: row;
            align-items: center;

            & img {
                width: 60%;
            }

            & span {
                font-size: 20px;
            }
        }
    }
}

@media (max-width: 700px) {
    
    main {
        & section:nth-child(1){
            
            & h1 {
                font-size: 30px;
            }

            & p {
                font-size: 18px;
            }
        }
    }
}
</style>