<template>
    <div id="activityAdd" @click="openAddModal = true">
        <h4>New</h4>
        <AddNew />
    </div>
    <Teleport to="body">
        <ActivityModalAdd 
        v-if="openAddModal"
        title="Nueva actividad"
        :boardSectionId="boardSectionId"
        @close="openAddModal = false"
        />
    </Teleport>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import AddNew from '../../icons/AddNew.vue'
import ActivityModalAdd from './ActivityModalAdd.vue'

const props = defineProps({
    boardSectionId: String
})

const boardSectionId = props.boardSectionId

let openAddModal = ref(false)

</script>
<style scoped>
    #activityAdd{
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--primary-color);
        border-radius: 5px;
    }

    h4 {
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        margin: 0%;
        margin-left: 5px;
    }
</style>