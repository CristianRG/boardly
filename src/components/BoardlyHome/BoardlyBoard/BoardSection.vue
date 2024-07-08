<template>
    <div id="section" class="scale-in-center">
        <SectionTitle :section="section" />
        <div class="section-activityes">
            <SectionActivity 
            v-for="activity in section.activities"
            :activity="activity" :boardSectionId="section.id"
            />
        </div>
        <ActivityAddNew :boardSectionId="section.id"/>
    </div>
</template>
<script setup>
import SectionTitle from './SectionTitle.vue';
import SectionActivity from './SectionActivity.vue';
import ActivityAddNew from './ActivityAddNew.vue';
import { defineProps } from 'vue';
import BoardSection from '../../../models/BoardSection.js';

const props = defineProps({
    section: {
        type: BoardSection,
        required: true,
        default: 'uknow'
    }
})

</script>
<style>
#section {
    width: 18rem;
    height: fit-content;
    display: grid;
    grid-template-rows: 2rem 1fr 3rem;
    row-gap: 10px;
    padding: 10px;
    background: var(--section-color);
    border-radius: 10px;
}
.section-activityes {
    height: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

/* Media query to resize section to 15rem width when display width is less that 370px */
@media (max-width: 390px) {
    #section {
        width: 15rem;
    }
}

</style>