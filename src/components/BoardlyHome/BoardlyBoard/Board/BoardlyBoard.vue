<template>
    <div id="board">
        <Section 
        v-for="section in board.sections" :key="section.id"
        :section="section"
        />
        <ModalTemplate :content="ModalNewSection" :show @close="show = false"/>
        <AddButton message="Nueva sección"
        @click="show = true"
        />
    </div>
</template>
<script setup>
import Section from '../Section/Section.vue';
import AddButton from '../../../Common/AddButton.vue';
import ModalTemplate from '../../../Modals/ModalTemplate.vue';
import ModalNewSection from '../Section/ModalNewSection.vue';
import { defineProps, onMounted, ref } from 'vue'

import Board from '../../../../models/Board';

const props = defineProps({
    board: {
        type: Board,
        required: true
    }
})
import { socket } from '../../../../socket';
import store from '../../../../store/store';

onMounted(() => {
    socket.connect()

    socket.emit('shareBoard', JSON.stringify(store.board))

    socket.on('receiveBoard', (board) => {
        const boardRecived = JSON.parse(board)
        console.log('received board', boardRecived)
    })
})
let show = ref(false)

</script>
<style scoped>
    #board {
        height: 100%;
        width: fit-content;
        display: flex;
        padding-left: 10px;
        padding-right: 10px;
        gap: 1rem;
    }
</style>