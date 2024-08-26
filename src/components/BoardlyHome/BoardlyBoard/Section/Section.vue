<template>
    <div @drop="drop($event)" @dragover.prevent @dragenter.prevent :key="section.id" class="section scale-in-center">
        <SectionTitle :section="section" />
        <div class="section-activities">
            <SectionActivity v-for="activity in section.activities" :key="activity.id" :activity="activity" :section />
        </div>
        <ActivityAddNew :section />
    </div>
</template>

<script setup>
import SectionTitle from './SectionTitle.vue';
import SectionActivity from './SectionActivity.vue';
import ActivityAddNew from '../Activity/ActivityAddNew.vue';
import { defineProps, watch } from 'vue';
import BoardSection from '../../../../models/BoardSection.js';
import { useDragDrop } from '../../../../composables/useDragDrop.js';
import store from '../../../../store/store.js';
import Activity from '../../../../models/Activity.js';
import useActivityFunctions from '../../../../composables/helpers/useActivityFunctions'
import { useSectionFunctions } from '../../../../composables/helpers/useSectionFunctions';
import { useBoardFunctions } from '../../../../composables/helpers/useBoardFunctions'
import { useIsLoggedFuctions } from '../../../../composables/helpers/useIsLoggedFunctions.js';
const props = defineProps({
    section: {
        type: BoardSection,
        required: true
    }
})

const { data, drop } = useDragDrop()
const { handleAddActivity, handleRemoveActivity } = useActivityFunctions()
const { handleFindSection } = useSectionFunctions()
const { handleUpdateBoard } = useBoardFunctions()
const { handleSaveInLocalStorage } = useIsLoggedFuctions()

watch(data, (newData) => {

    const activity = Activity.fromJSON(newData.item)
    const newSection = handleFindSection(store.board, props.section.id)
    const oldSection = handleFindSection(store.board, newData.id)
    handleAddActivity(newSection, activity)
    handleRemoveActivity(oldSection, activity)
    handleUpdateBoard(store.board, store.boards)
    handleSaveInLocalStorage(store.boards)
    store.notification = {message: 'Actividad movida por @' + store.user.name}
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
    width: calc(18rem - 20px);
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

    .section-activities {
        width: calc(15rem - 20px);
    }
}
</style>