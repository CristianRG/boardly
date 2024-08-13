<template>
    <div draggable="true" v-on:dragstart="drag($event, { item: activity, sectionId: boardSectionId })" :id="activity.id"
        class="activity" @click="modalActive = true">
        <span>{{ activity.title }}</span>
        <div class="actions">
            <Ellipsis @click.stop="trackMouse($event, activity)" />
        </div>
        <Teleport :to="teleport">
            <ActionsTemplate :show="actionsActive" :menuItems :coordinates @close="actionsActive = false"/>
        </Teleport>
        <Teleport to="body">
            <ActivityModal v-if="modalActive" title="Detalles" :editable="true" :activity="activity"
                :boardSectionId="boardSectionId" @close="modalActive = false" />
        </Teleport>
    </div>
</template>

<script setup>
import { defineProps, markRaw, onMounted, reactive, ref } from 'vue';
import ActivityModal from './ActivityModal.vue';
import Activity from '../../../models/Activity.js';
import { useDragDrop } from '../../../composables/useDragDrop.js';
import Ellipsis from '../../icons/Ellipsis.vue';
import ActionsTemplate from '../../Modals/ActionsTemplate.vue';
import store from '../../../store/store.js';
import Edit from '../../icons/Edit.vue';
const props = defineProps({
    activity: {
        type: Activity,
        required: true
    },
    boardSectionId: String
})

const { drag } = useDragDrop()

let modalActive = ref(false)
let actionsActive = ref(false)
let activitySelected = reactive(new Activity())
const activitySection = store.board.sections.find((section) => section.id === props.boardSectionId)

const menuItems = reactive([
    {
        label: 'Ver',
        actions: [],
        quickAction: () => console.log("See details!"),
        isOpen: false,
    },
    {
        label: 'Editar',
        actions: [],
        quickAction: () => console.log("Yes!"),
        isOpen: false,
    },
    {
        label: 'Eliminar',
        actions: [],
        quickAction: () => console.log("No!"),
        isOpen: false,
    },
    {
        label: 'Mover a',
        actions: store.board.sections.map((section) => { return { title: section.title,  
            action: () => {
                store.activityFunctions.removeActivity(activitySection, activitySelected)
                store.activityFunctions.addActivity(section, activitySelected)

                
                // Update boardSectionId and re-render activities
            }
        } }),
        isOpen: false,
    },
]);

let coordinates = reactive({ x: 0, y: 0 })

const trackMouse = (event, activity) => {
    actionsActive.value = true
    coordinates = { x: event.clientX, y: event.clientY }
    activitySelected = activity
}

let teleport = ref('body')

onMounted(() => teleport.value = '#board')

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