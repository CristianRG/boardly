<template>
    <div draggable="true" v-on:dragstart="drag($event, { item: activity, sectionId })" :id="activity.id"
        class="activity" @click="modalActive = true">
        <span>{{ activity.title }}</span>
        <div class="actions">
            <Ellipsis @click.stop="trackMouse($event, activity)" />
        </div>
        <Teleport :to="teleport">
            <ActionsTemplate :show="actionsActive" :menuItems :coordinates @close="actionsActive = false" />
        </Teleport>
        <Teleport to="body">
            <ModalTemplate :content="ModalDetailsActivity" :show="modalActive"
                :extra="{ activity, sectionId, editable }" @close="modalActive = false" />
        </Teleport>
        <Teleport to="body">
            <AlertTemplate v-if="alertActive" :alert />
        </Teleport>
    </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, ref } from 'vue';
import Activity from '../../../../models/Activity.js';
import { useDragDrop } from '../../../../composables/useDragDrop.js';
import Ellipsis from '../../../icons/Ellipsis.vue';
import ActionsTemplate from '../../../Modals/ActionsTemplate.vue';
import store from '../../../../store/store.js';
import ModalTemplate from '../../../Modals/ModalTemplate.vue';
import ModalDetailsActivity from '../Activity/ModalDetailsActivity.vue';
import AlertTemplate from '../../../Alerts/AlertTemplate.vue';
import Alert from '../../../../models/Alert.js';

const props = defineProps({
    activity: {
        type: Activity,
        required: true
    },
    sectionId: String
})

//const show = ref(modalActive.value)

const { drag } = useDragDrop()

let modalActive = ref(false)
let actionsActive = ref(false)
let alertActive = ref(false)
let editable = ref(false)
let activitySelected = reactive(new Activity())
let alert = new Alert()
const activitySection = store.board.sections.find((section) => section.id === props.sectionId)

const menuItems = reactive([
    {
        label: 'Ver',
        actions: [],
        quickAction: () => { modalActive.value = true },
        isOpen: false,
    },
    {
        label: 'Editar',
        actions: [],
        quickAction: () => { modalActive.value = true, editable.value = true },
        isOpen: false,
    },
    {
        label: 'Eliminar',
        actions: [],
        quickAction: () => {
            alert.type = alert.types.warning
            alert.message = '¿Deseas eliminar esta nota?'
            alert.actions.push(Alert.action('Cancelar', alert.styles.btnDanger, () => alertActive.value = false))
            alert.actions.push(Alert.action('Confirmar', alert.styles.btnSuccess, () => {
                store.activityFunctions.removeActivity(activitySection, activitySelected)
                store.boardFunctions.updateBoard(store.board, store.boards)
                localStorage.setItem('boards', JSON.stringify(store.boards))
                alertActive.value = false
            }))
            alertActive.value = true
        },
        isOpen: false,
    },
    {
        label: 'Mover a',
        actions: store.board.sections.map((section) => {
            return {
                title: section.title,
                action: () => {
                    store.activityFunctions.removeActivity(activitySection, activitySelected)
                    store.activityFunctions.addActivity(section, activitySelected)
                    store.boardFunctions.updateBoard(store.board, store.boards)
                    localStorage.setItem('boards', JSON.stringify(store.boards))
                }
            }
        }),
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