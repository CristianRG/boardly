<template>
    <div :id="section.id" class="section scale-in-center">
        <SectionTitle :section="section" />
        <div @drop="drop($event)" @dragover.prevent @dragenter.prevent class="section-activities">
            <SectionActivity v-for="activity in section.activities" :key="activity.id" :activity="activity"
                :boardSectionId="section.id" />
        </div>
        <ActivityAddNew :boardSectionId="section.id" />
    </div>
</template>

<script setup>
import SectionTitle from './SectionTitle.vue';
import SectionActivity from './SectionActivity.vue';
import ActivityAddNew from './ActivityAddNew.vue';
import { defineProps, ref, watch } from 'vue';
import BoardSection from '../../../models/BoardSection.js';
import { useDragDrop } from '../../../composables/useDragDrop.js';
import { useLocalStorage } from '../../../composables/useLocalStorage.js'
import store from '../../../store/store.js';
import Activity from '../../../models/Activity.js';

const props = defineProps({
    section: {
        type: BoardSection,
        required: true,
        default: 'unknown'
    }
})

const { data, drop } = useDragDrop()

const {getItem, setItem, removeItem} = useLocalStorage()

watch(data, (newData, oldData) => {
    const newIndexSection = store.board.sections.findIndex(se => se.id === props.section.id)
    const oldIndexSection = store.board.sections.findIndex(se => se.id === newData.sectionId)
    store.activityFunctions.addActivity(store.board.sections[newIndexSection], Activity.fromJSON(newData.item))
    store.activityFunctions.removeActivity(store.board.sections[oldIndexSection], Activity.fromJSON(newData.item))
    
    
})

</script>

<style>
.section {
    width: 18rem;
    height: fit-content;
    display: grid;
    grid-template-rows: 2rem 1fr 3rem;
    row-gap: 10px;
    padding: 10px;
    background: var(--section-color);
    border-radius: 10px;
}

.section-activities {
    height: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

/* Media query to resize section to 15rem width when display width is less that 370px */
@media (max-width: 390px) {
    .section {
        width: 15rem;
    }
}
</style>