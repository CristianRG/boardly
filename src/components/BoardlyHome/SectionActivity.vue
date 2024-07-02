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
    border: 1px solid var(--text-color);
    background: var(--section-color);
    overflow: hidden;

}

h4 {
    color: var(--text-color);
    font-size: 18px;
    margin: 0%;
    padding: 0 10px 0 10px;
}

</style>