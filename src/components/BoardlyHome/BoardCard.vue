<template>
    <div :id="board.id" class="card">
        <div class="card-header">
            <span class="name" @click="router.push({ name: 'Board', params: { id: board.id } })">
                {{ board.name }}
            </span>
            <div class="options">
                <Edit @click="handleEditBoard(board)" />
                <Delete @click="handleDeleteBoard(board)" />
            </div>
        </div>
        <span class="description" @click="router.push({ name: 'Board', params: { id: board.id } })">{{ board.description
            }}</span>
        <span class="owner" @click="router.push({ name: 'Board', params: { id: board.id } })">{{ board.owner.name
            }}</span>

        <AlertTemplate v-if="showAlert" :alert />
        <ModalTemplate :content="ModalNewBoard" :show :extra/>
    </div>
</template>
<script setup>
import { defineProps, reactive, ref } from 'vue'
import router from '../../routes/routes'
import Board from '../../models/Board'
import Edit from '../icons/Edit.vue'
import Delete from '../icons/Delete.vue'
import store from '../../store/store'
import { useBoardFunctions } from '../../composables/helpers/useBoardFunctions'
import { useIsLoggedFuctions } from '../../composables/helpers/useIsLoggedFunctions'
import AlertTemplate from '../Alerts/AlertTemplate.vue'
import Alert from '../../models/Alert'
import ModalTemplate from '../Modals/ModalTemplate.vue'
import ModalNewBoard from './ModalNewBoard.vue'

const props = defineProps({
    board: {
        type: Board,
        required: true
    }
})

const { handleRemoveBoard } = useBoardFunctions()
const { handleSaveInLocalStorage } = useIsLoggedFuctions()

const showAlert = ref(false)
const alert = reactive(new Alert())
const show = ref(false)
const extra = ref({})

const handleDeleteBoard = (board) => {
    // Add your delete board logic here
    alert.type = alert.types.warning
    alert.message = '¿Estas seguro de querer eliminar este tablero?'
    alert.actions = [
        Alert.action('Cancelar', alert.styles.btnDanger, () => showAlert.value = false),
        Alert.action('Eliminar', alert.styles.btnSuccess, () => {
            handleRemoveBoard(board, store.boards)
            handleSaveInLocalStorage(store.boards)
            showAlert.value = false
        })
    ]
    showAlert.value = true
}

const handleEditBoard = (board) => {
    extra.value = {board, editable: true}
    show.value = true
}

</script>
<style scoped>
.card {
    width: 18rem;
    height: 12rem;
    display: grid;
    grid-template-rows: 1.5rem 1fr 1rem;
    padding: 10px;
    background: var(--section-color);
    border-radius: 5px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--header-color);
    color: var(--text-color);
    border-radius: 5px 5px 0 0;
}

.options {
    display: flex;
    align-items: center;
}

.name,
.description,
.owner {
    color: var(--text-color);
    user-select: none;
    cursor: pointer;
}

.name {
    width: 12.5rem;
    font-weight: bold;
    font-size: 1.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.description {
    margin-top: .8rem;
    font-size: 15px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.owner {
    font-size: 12px;
    text-align: end;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media (max-width: 610px) {
    .card {
        width: 10rem;
        height: 10rem;

        & .card-header {
            width: calc(10rem - 20px);

            & .name {
                font-size: 1.1rem;
            }
        }

        & .description {
            font-size: 15px;
        }

        & .owner {
            font-size: 10px;
        }
    }

    .name {
        font-size: 1.2rem;
    }
}
</style>