<template>
    <div id="board">
        <BoardSection 
        v-for="section in board.sections" :key="section.id"
        :section="section"
        />
        <SectionAddNew />
    </div>
</template>
<script setup>
import BoardSection from './BoardSection.vue'
import SectionAddNew from './SectionAddNew.vue';
import { defineProps } from 'vue'

import Board from '../../../models/Board'

const props = defineProps({
    board: {
        type: Board,
        required: true
    }
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