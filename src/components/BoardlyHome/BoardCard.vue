<template>
    <div :id="board.id" class="card">
        <div class="card-header">
            <span class="name"
            @click="router.push({ name: 'Board', params: { id: board.id } })"
            >
                {{ board.name }}
            </span>
            <div class="options">
                <Edit />
                <Delete 
                @click="handleDeleteBoard(board)"
                />
            </div>
        </div>
        <span class="description"
        @click="router.push({ name: 'Board', params: { id: board.id } })"
        >{{ board.description }}</span>
        <span class="owner"
        @click="router.push({ name: 'Board', params: { id: board.id } })"
        >{{ board.owner.name }}</span>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
import router from '../../routes/routes'
import Board from '../../models/Board'
import Edit from '../icons/Edit.vue'
import Delete from '../icons/Delete.vue'
import store from '../../store/store'

const props = defineProps({
    board: {
        type: Board,
        required: true
    }
})

const handleDeleteBoard = (board) => {
    // Add your delete board logic here
    store.boardFunctions.removeBoard(board, store.boards)
    localStorage.setItem('boards', JSON.stringify(store.boards))
}

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
    user-select: none;
    cursor: pointer;
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
    font-size: 15px;
    width: 100%;
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

@media (max-width: 610px) {
    .card {
        width: 10rem;
        height: 10rem;

        & .card-header {
            width: calc(10rem - 20px);

            & .name {
                font-size: 1.1rem;
            }
        }

        & .description {
            font-size: 15px;
        }

        & .owner {
            font-size: 10px;
        }
    }

    .name {
        font-size: 1.2rem;
    }
}
</style>