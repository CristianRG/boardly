<template>
    <div id="activityAdd" @click="openAddModal = true">
        <h4>New</h4>
        <AddNew />
    </div>
    <Teleport to="body">
        <ModalTemplate :content="ModalNewActivity" :show="openAddModal" :extra="{edit: false, section}" @close="openAddModal = false" />
    </Teleport>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import AddNew from '../../../icons/AddNew.vue'
import ModalTemplate from '../../../Modals/ModalTemplate.vue';
import ModalNewActivity from './ModalNewActivity.vue';
import BoardSection from '../../../../models/BoardSection';

const props = defineProps({
    section: {
        type: BoardSection,
        required: true
    }
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
        user-select: none;
    }
</style>