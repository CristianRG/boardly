<template>
    <div :id="board.id" class="card" @click="router.push({ name: 'Board', params: { id: board.id } })">
        <div class="card-header">
            <span class="name">
                {{ board.name }}
            </span>
            <div class="options">
                <Edit />
                <Delete />
            </div>
        </div>
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
    width: 18rem;
    height: 12rem;
    display: grid;
    grid-template-rows: 1.5rem 1fr 1rem;
    padding: 10px;
    background: var(--section-color);
    border-radius: 5px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--header-color);
    color: var(--text-color);
    border-radius: 5px 5px 0 0;
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
    width: 12.5rem;
    font-weight: bold;
    font-size: 1.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.description {
    margin-top: .8rem;
    font-size: 20px;
    width: 100%;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.owner {
    font-size: 12px;
    text-align: end;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>