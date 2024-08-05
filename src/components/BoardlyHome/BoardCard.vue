<template>
    <div :id="board.id" class="card" @click="router.push({ name: 'Board', params: { id: board.id } })">
        <span class="name">
            {{ board.name }}
            <div class="options">
                <Edit />
                <Delete />
            </div>
        </span>
        <span class="description">{{ board.description }}</span>
        <span class="owner">{{ board.owner.name }}</span>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
import router from '../../routes/routes'
import Board from '../../models/Board'
import Edit from '../icons/Edit.vue'
import Delete from '../icons/Delete.vue'

const props = defineProps({
    board: {
        type: Board,
        required: true
    }
})

</script>
<style scoped>
.card {
    width: 14rem;
    height: 12rem;
    display: grid;
    grid-template-rows: 1.5rem 1fr 1rem;
    padding: 10px;
    background: var(--section-color);
    border-radius: 5px;
}

.options {
    display: flex;
    align-items: center;
}

.name,
.description,
.owner {
    color: var(--text-color);
}

.name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.description {
    margin-top: .8rem;
    font-size: 15px;
}

.owner {
    font-size: 12px;
    text-align: end;
}
</style>