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
            <button @click="handleAddBoard()" class="btn btn-success">Crear tablero</button>
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
const board = reactive(new Board())
let error = ref(null)

const emits = defineEmits(['close'])

const handleAddBoard = () => {
    if (!board.name) {
        error.value = 'Debes ingresar un nombre para el tablero'
    }
    else {
        board.id = uuid.v4()
        board.owner = store.user
        board.sections = store.defaultBoardSections(board.owner)
        board.users = []
        store.boards.push(board)
        localStorage.setItem('boards', JSON.stringify(store.boards))
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