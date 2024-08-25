<template>
    <main>
        <ModalTemplate :content="ModalStatus" :show :extra @persist="handleBoard" :disableButtonClose="true"/>
    </main>
</template>
<script setup>
import ModalTemplate from '../components/Modals/ModalTemplate.vue'
import ModalStatus from '../components/BoardlyShareBoard.vue/ModalStatus.vue'
import useOnlineBoard from '../composables/helpers/useOnlineBoad';
import { defineProps, onMounted, ref, watch } from 'vue';
import Board from '../models/Board';
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
const {turnOnline, getBoard, connected, data} = useOnlineBoard()
const board = ref(new Board(props.id))
const show = ref(true)

const handleBoard = () => {
    if(!connected.value){
        turnOnline()
    }

    if(connected.value){
        getBoard(board.value)
    }
    show.value = true
}

const extra = ref({response: {message: 'Connecting...'}})

watch(data, (value) => {
    extra.value = {response: value}
})

onMounted(() => {
    handleBoard()
})
</script>
<style scoped>
main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 50px;
    font-weight: bold;
    color: var(--text-color);
}

a{
    text-decoration: none;
    margin-top: 20px;
    font-size: 20px;
}
</style>