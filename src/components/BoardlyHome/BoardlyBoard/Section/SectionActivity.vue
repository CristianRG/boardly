<template>
    <div draggable="true" v-on:dragstart="drag($event, { item: activity, id: section.id })" :id="activity.id"
        class="activity" @click="modalActive = true">
        <span>{{ activity.title }}</span>
        <div class="actions">
            <Ellipsis @click.stop="trackMouse($event, activity)" />
        </div>
        <Teleport :to="teleport">
            <ActionsTemplate :show="actionsActive" :menuItems :coordinates @close="actionsActive = false" />
        </Teleport>
        <Teleport to="body">
            <ModalTemplate :content="ModalDetailsActivity" :show="modalActive" :extra="{ activity, section, editable }"
                @close="modalActive = false, editable = false" />
        </Teleport>
        <Teleport to="body">
            <AlertTemplate v-if="alertActive" :alert />
        </Teleport>
    </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, ref, watch } from 'vue';
import Activity from '../../../../models/Activity.js';
import { useDragDrop } from '../../../../composables/useDragDrop.js';
import Ellipsis from '../../../icons/Ellipsis.vue';
import ActionsTemplate from '../../../Modals/ActionsTemplate.vue';
import store from '../../../../store/store.js';
import ModalTemplate from '../../../Modals/ModalTemplate.vue';
import ModalDetailsActivity from '../Activity/ModalDetailsActivity.vue';
import AlertTemplate from '../../../Alerts/AlertTemplate.vue';
import Alert from '../../../../models/Alert.js';
import BoardSection from '../../../../models/BoardSection.js';
import useActivityFunctions from '../../../../composables/helpers/useActivityFunctions.js';
import { useBoardFunctions } from '../../../../composables/helpers/useBoardFunctions.js';
import { useIsLoggedFuctions } from '../../../../composables/helpers/useIsLoggedFunctions.js';
const props = defineProps({
    activity: {
        type: Activity,
        required: true
    },
    section: {
        type: BoardSection,
        required: true
    }
})

//const show = ref(modalActive.value)

const { drag } = useDragDrop()
const { handleAddActivity, handleRemoveActivity } = useActivityFunctions()
const { handleUpdateBoard } = useBoardFunctions()
const { handleSaveInLocalStorage } = useIsLoggedFuctions()

let modalActive = ref(false)
let actionsActive = ref(false)
let alertActive = ref(false)
let editable = ref(false)
let activitySelected = reactive(new Activity())
let alert = new Alert()

const moveToFunction = (sections) => sections.map((section) => {
    return {
        title: section.title,
        action: () => {
            handleAddActivity(section, activitySelected)
            handleRemoveActivity(props.section, activitySelected)
            handleUpdateBoard(store.board, store.boards)
            handleSaveInLocalStorage(store.boards)
        }
    }
})

let moveTo = ref(null)

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
                handleRemoveActivity(props.section, activitySelected)
                handleUpdateBoard(store.board, store.boards)
                handleSaveInLocalStorage(store.boards)
                alertActive.value = false
            }))
            alertActive.value = true
        },
        isOpen: false,
    },
    {
        label: 'Mover a',
        actions: () => [],
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

onMounted(() => {
    moveTo.value = moveToFunction(store.board.sections)
    menuItems.forEach(menuItem => {
        if (menuItem.label == 'Mover a') {
            menuItem.actions = moveTo.value
        }
    })
    teleport.value = '#board'
})

watch(store.board.sections, (value) => {
    moveTo.value = moveToFunction(value)
    menuItems.forEach(menuItem => {
        if (menuItem.label == 'Mover a') {
            menuItem.actions = moveTo.value
        }
    })
})

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