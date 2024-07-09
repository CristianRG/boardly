<template>
    <div id="`{{ board.id }}`" class="card"
    @click="router.push({name: 'Board', params: { id: board.id}})"
    >
        <span class="name">{{ board.name }}</span>
        <span class="description">{{ board.description }}</span>
        <span class="owner">{{ board.owner.name }}</span>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
import router from '../../routes/routes'
import Board from '../../models/Board'

const props = defineProps({
    board: {
        type: Board,
        required: true
    }
})

</script>
<style scoped>

.card{
    width: 12rem;
    height: 12rem;
    display: grid;
    grid-template-rows: 1.5rem 1fr 1rem;
    padding: 5px;
    background: var(--body-color);
    border-radius: 5px;
    border: 1px solid var(--text-color);
}

.name, .description, .owner {
    color: var(--text-color);
    font-weight: 500;
}

.name{
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}
.description{
    margin-top: .8rem;
    font-size: 1rem;
}
.owner{
    font-size: 0.8rem;
    text-align: end;
}
</style>