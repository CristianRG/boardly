<template>
    <div class="content">
        <span style="font-size: 30px;">Nuevo tablero</span>
        <div class="form-group" style="margin-top: 1rem;">
            <label for="name">Nombre del tablero</label>
            <input type="text" id="name" v-model="board.name" />
        </div>
        <div class="form-group">
            <label for="description">Descripción del tablero (Opcional)</label>
            <textarea id="description" 
            maxlength="100"
            v-model="board.description" />
        </div>
        <div class="buttons-group">
            <button @click="$emit('close')" class="btn btn-danger">Cancelar</button>
            <button @click="newBoard()" class="btn btn-success">Crear tablero</button>
        </div>
        <span v-if="error"
        style="display: block; text-align: center; color: var(--color-danger);"
        >{{ error }}</span>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import Board from '../../models/Board'
import { uuid } from 'vue-uuid';
import store from '../../store/store';
import { useLocalStorage } from '../../composables/useLocalStorage';
const board = reactive(new Board())
let error = ref(null)
const { addBoard } = useLocalStorage()

const emits = defineEmits(['close'])

const newBoard = () => {
    if (!board.name) {
        error.value = 'Debes ingresar un nombre para el tablero'
    }
    else {
        error.value = ''
        board.id = uuid.v4()
        board.owner = store.user
        board.sections = []
        board.users = []

        store.boards.push(board)
        addBoard(board)
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