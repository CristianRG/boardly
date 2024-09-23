<template>
    <div class="content">
        <span style="font-size: 30px;">Nuevo tablero</span>
        <div class="form-group" style="margin-top: 1rem;">
            <label for="name">Nombre del tablero</label>
            <input type="text" id="name" v-model="board.name" />
        </div>
        <div class="form-group">
            <label for="description">Descripción del tablero (Opcional)</label>
            <textarea id="description" maxlength="100" v-model="board.description" />
        </div>
        <div class="buttons-group">
            <button @click="$emit('close')" class="btn btn-danger">Cancelar</button>
            <button v-if="!editable" @click="handleAdd" class="btn btn-success">Crear tablero</button>
            <button v-if="editable" @click="handleEdit" class="btn btn-success">Actualizar tablero</button>
        </div>
        <span v-if="error" style="display: block; text-align: center; color: var(--color-danger);">{{ error }}</span>
    </div>
</template>
<script setup>
import { reactive, ref, defineProps } from 'vue';
import Board from '../../models/Board'
import { uuid } from 'vue-uuid';
import { useBoardFunctions } from '../../composables/helpers/useBoardFunctions';
import { useIsLoggedFuctions } from '../../composables/helpers/useIsLoggedFunctions';
import { useFetch } from '../../composables/useFetch';

const props = defineProps({
    board: {
        type: Board,
        required: false,
        default: new Board('', '', '', [], store.user, [])
    },
    editable: Boolean
})

const { handleAddBoard, handleUpdateBoard } = useBoardFunctions()
const { handleSaveInLocalStorage } = useIsLoggedFuctions()
const { postData } = useFetch()

import store from '../../store/store';
import Notification from '../../models/NotificationModel';
const board = reactive(Board.fromJSON({ ...props.board }))
let error = ref(null)

const emits = defineEmits(['close'])

const handleAdd = async () => {
    if (!board.name) {
        error.value = 'Debes ingresar un nombre para el tablero'
    }
    else {
        board.id = uuid.v4()
        board.owner = store.user
        board.sections = store.defaultBoardSections(board.owner)
        board.users = []
        handleAddBoard(board, store.boards)
        if (!store.logged) {
            handleSaveInLocalStorage(store.boards)
            store.notifications.push(new Notification(uuid.v4(), 'Tablero agregado por @' + store.user.name))
        }
        else {
            const response = await postData({
                URL: `${store.SERVICE_API}/board`, body: {
                    idUser: store.user.id, ...board
                }
            })

            if (response.status == 201) {
                let result = await response.json()
                store.notifications.push(new Notification(uuid.v4(), 'Tablero agregado por @' + store.user.name))
            }
        }
        emits('close')
    }
}

const handleEdit = () => {
    if (!board.name) {
        error.value = 'Debes ingresar un nombre para el tablero'
    }
    else {
        handleUpdateBoard(board, store.boards)
        handleSaveInLocalStorage(store.boards)
        store.notifications.push(new Notification(uuid.v4(), 'Tablero editado por @' + store.user.name))
        emits('close')
    }
}

</script>
<style scoped>
.content {
    height: fit-content;
    display: block;
}
</style>