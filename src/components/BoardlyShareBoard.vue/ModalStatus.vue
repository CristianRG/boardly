<template>
    <div class="content">
        <span style="font-size: 20px;" v-if="!response.status">Trying to connet with the board...</span>
        <span v-if="response.status == 404"
            style="font-size: 15px; text-align: center; display: block; color: var(--color-danger);">{{ response.message
            }} <br>Try it again or check if the url is right...</span>
        <span v-if="response.status == 200"
            style="font-size: 15px; text-align: center; display: block; color: var(--color-success);">{{
                response.message }}</span>
        <div class="buttons-group" style="margin-top: 1rem; margin-bottom: 0%;">
            <button v-if="response.status == 404" class="btn btn-danger" @click="options.CANCEL()">Cancel</button>
            <button v-if="response.status == 404" class="btn btn-success" @click="emits('persist')">Retry</button>
            <button v-if="response.status == 200" class="btn btn-danger" @click="options.CANCEL()">Cancel</button>
            <button v-if="response.status == 200" class="btn btn-success" @click="options.CONTINUE()">Accept</button>
        </div>
    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import router from '../../routes/routes';
import Board from '../../models/Board';
import store from '../../store/store';
const props = defineProps({
    response: {
        type: Object,
        required: true
    }
})
const emits = defineEmits(['close', 'persist'])
const options = {
    CANCEL: () => { router.push({ name: 'Boards' }), emits('close') },
    CONTINUE: () => {
        const board = Board.fromJSON(JSON.parse(props.response.board))
        const JSONboards = JSON.parse(localStorage.getItem('boards')) ? JSON.parse(localStorage.getItem('boards')) : []
        store.boards = JSONboards.length > 0 ? JSONboards.map(b => { return Board.fromJSON(b) }) : [] 

        const index = store.boards.findIndex(b => b.id == board.id)
        if(index !== -1){
            store.boardFunctions.updateBoard(board, store.boards)
        }
        else{
            store.boards.push(board)
        }

        localStorage.setItem('boards', JSON.stringify(store.boards))
        router.push({name: 'Board', params: {id: props.response.board.id}})
        emits('close')
    }
}

</script>
<style scoped>
.content {
    display: block;
}
</style>