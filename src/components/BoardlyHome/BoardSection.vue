<template>
    <div id="section" class="scale-in-center">
        <SectionTitle :section="section" />
        <div class="section-activityes">
            <SectionActivity 
            v-for="activity in section.activities"
            :activity="activity" :boardSectionId="section.id"
            />
        </div>
        <SectionAddNew :boardSectionId="section.id"/>
    </div>
</template>
<script setup>
import SectionTitle from './SectionTitle.vue';
import SectionActivity from './SectionActivity.vue';
import SectionAddNew from './SectionAddNew.vue';
import { defineProps } from 'vue';
import BoardSection from '../../models/BoardSection.js';

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
    margin-top: 10px;
    padding: 10px;
    background: #272433;
    border-radius: 10px;
}
.section-activityes {
    height: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}
</style>