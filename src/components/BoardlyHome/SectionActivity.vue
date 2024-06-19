<template>
    <div id="activity" @click="modalActive = true">
        <h4>{{ activity.title }}</h4>
    </div>
    <Teleport to="body">
        <ActivityModal v-if="modalActive" title="Detalles" :editable="true" :activity="activity"
            :boardSectionId="boardSectionId" @close="modalActive = false" />
    </Teleport>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import ActivityModal from './ActivityModal.vue';
import Activity from '../../models/Activity.js';

const props = defineProps({
    activity: {
        type: Activity,
        required: true
    },
    boardSectionId: String
})

let modalActive = ref(false)

</script>
<style scoped>
#activity {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background: #35333C;
    overflow: hidden;

}

h4 {
    color: white;
    font-size: 18px;
    margin: 0%;
    padding: 0 10px 0 10px;
}

</style>