<template>
    <div id="board">
        <Section v-for="section in board.sections" :key="section.id" :section />
        <ModalTemplate :content="ModalNewSection" :show @close="handleNewSection" />
        <AddButton message="Nueva sección" @click="show = true" />
    </div>
</template>
<script setup>
import Section from '../Section/Section.vue';
import AddButton from '../../../Common/AddButton.vue';
import ModalTemplate from '../../../Modals/ModalTemplate.vue';
import ModalNewSection from '../Section/ModalNewSection.vue';
import { defineProps, ref, defineEmits, watch, onUnmounted, onMounted } from 'vue'

import Board from '../../../../models/Board';

const props = defineProps({
    board: {
        type: Board,
        required: true
    }
})

const emits = defineEmits(['scroll'])
import useOnlineBoard from '../../../../composables/helpers/useOnlineBoad';
import store from '../../../../store/store';

let show = ref(false)
const handleNewSection = (section) => {
    if (section) {
        emits('scroll')
    }
    show.value = false
}

const {turnOnline, connected, disconnect, shareBoard} = useOnlineBoard()

onMounted(() => {
    if(props.board.online && props.board.owner.id == store.user.id){
        turnOnline()
        shareBoard()
    }
})

// listen the online property change from the board
watch(props.board, (value) => {
    if(value.online == true && connected.value == false && value.owner.id == store.user.id){
        turnOnline()
        shareBoard()
    }
})

// change online property to false when leaving the board
onUnmounted(() => {
    disconnect()
})

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