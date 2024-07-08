<template>
    <div id="sectionAdd" @click="openAddModal=true">
        <span>New Section</span>
        <AddNew />
    </div>
    <Teleport to="body">
        <ModalAddSection v-if="openAddModal" @close="openAddModal = false" 
        title="Nueva sección"
        />
    </Teleport>
</template>
<script setup>
import { ref } from 'vue'
import AddNew from '../icons/AddNew.vue'
import ModalAddSection from './ModalAddSection.vue';

const openAddModal = ref(false)

</script>
<style scoped>
#sectionAdd {
    width: 15rem;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--primary-color);
    border-radius: 5px;
}

@media (max-width: 1200px) {
    #sectionAdd {
        position: fixed;
        bottom: 50px;
        right: 50px;
    }
}

@media (max-width: 390px) {
    #sectionAdd {
        width: 3rem;
        position: fixed;
        bottom: 10px;
        right: 10px;
    }

    span {
        display: none;
    }
}

span {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin: 0%;
    margin-left: 5px;
}
</style>