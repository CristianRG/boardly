<template>
    <div id="activityAdd" @click="openAddModal = true">
        <h4>New</h4>
        <AddNew />
    </div>
    <Teleport to="body">
        <!-- <ActivityModalAdd 
        v-if="openAddModal"
        title="Nueva actividad"
        :sectionId
        @close="openAddModal = false"
        /> -->
        <ModalTemplate :content="ModalNewActivity" :show="openAddModal" :extra="{edit: false, sectionId}" @close="openAddModal = false" />
    </Teleport>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import AddNew from '../../icons/AddNew.vue'
import ActivityModalAdd from './ActivityModalAdd.vue'
import ModalTemplate from '../../Modals/ModalTemplate.vue';
import ModalNewActivity from './ModalNewActivity.vue';

const props = defineProps({
    sectionId: String
})
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