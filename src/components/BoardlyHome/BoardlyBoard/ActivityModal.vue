<template>
    <div class="modal">
        <div class="modal-content" :class="styleClass">
            <span class="close" @click="close()">&times;</span>
            <h2>{{ title }}</h2>
            <div class="content-activity" v-if="(!openEditModal)">
                <h2>{{ titleActivity }}</h2>
                <p>{{ contentActivity }}</p>
            </div>
            <div class="content-options" v-if="(!openEditModal)">
                <Edit @click="openEditModal = true" />
                <Delete @click="deleteActivity()" />
            </div>
            <ModalEdit :activity="activity" :boardSectionId="boardSectionId" v-if="openEditModal"
                @closeEdit="openEditModal = false" />
        </div>
    </div>
</template>
<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue'
import Activity from '../../../models/Activity.js'
import Edit from '../../icons/Edit.vue'
import Delete from '../../icons/Delete.vue'
import ModalEdit from './ModalEdit.vue'
import store from '../../../store/store.js'
import Board from '../../../models/Board.js'

const props = defineProps({
    title: String,
    activity: {
        type: Activity,
        required: true
    },
    boardSectionId: String
})

let openEditModal = ref(false)

let title = ref(props.title)

let titleActivity = ref(props.activity.title)

let contentActivity = ref(props.activity.content)

let styleClass = ref('slide-in-top')

const emit = defineEmits(['close'])

function close() {
    styleClass.value = 'slide-out-top'
    setTimeout(()=> {
        openEditModal = false
        emit('close')
    }, 500)
}

function deleteActivity() {
    const indexSection = store.board.sections.findIndex(section => section.id == props.boardSectionId)

    store.board.sections[props.boardSectionId] = store.activityFunctions.removeActivity(store.board.sections[indexSection], props.activity)

    const boards = JSON.parse(localStorage.getItem('boards'))
    const board = Board.fromJSON(boards.find(board => board.id == store.board.id))

    board.sections[indexSection] = store.activityFunctions.removeActivity(board.sections[indexSection], props.activity)

    // replace element in boards who has the same id at the board
    const indexBoard = boards.findIndex(board => board.id == store.board.id)
    boards[indexBoard] = board

    localStorage.setItem('boards', JSON.stringify(boards))
    close()
}

watch(() => props.activity, (newValue, oldValue) => {
    titleActivity = newValue.title
    contentActivity = newValue.content
})

</script>
<style scoped>
.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: var(--modal-color);
    margin: 15% auto;
    padding: 20px;
    border: 1px solid var(--text-color);
    border-radius: 5px;
    max-width: 400px;
    color: var(--text-color);
}

.close {
    color: var(--text-color);
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: var(--text-color-danger);
    text-decoration: none;
    cursor: pointer;
}

.content-activity {
    margin-bottom: 5px;
    padding: 5px;
}

.content-options {
    display: flex;
    justify-content: end;
    margin-bottom: 15px;
}

</style>