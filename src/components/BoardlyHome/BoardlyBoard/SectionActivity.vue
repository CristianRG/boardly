<template>
    <div 
    draggable="true" v-on:dragstart="drag($event, {item:activity, sectionId:boardSectionId})"
    :id="activity.id" class="activity" @click="modalActive = true">
        <span>{{ activity.title }}</span>
        <Teleport to="body">
            <ActivityModal v-if="modalActive" title="Detalles" :editable="true" :activity="activity"
                :boardSectionId="boardSectionId" @close="modalActive = false" />
        </Teleport>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import ActivityModal from './ActivityModal.vue';
import Activity from '../../../models/Activity.js';
import { useDragDrop } from '../../../composables/useDragDrop.js';

const props = defineProps({
    activity: {
        type: Activity,
        required: true
    },
    boardSectionId: String
})

const {drag} = useDragDrop()

let modalActive = ref(false)

</script>
<style scoped>
.activity {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    border-radius: 5px;
    border: 1px solid var(--text-color);
    background: var(--section-color);
    overflow: hidden;

}

span {
    width: 100%;
    color: var(--text-color);
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0%;
    padding: 0 10px 0 10px;
}
</style>