<template>
    <div id="title">
        <h4 :contenteditable="editTitle" ref="titleRef" @blur="handleBlur" @keydown.enter="handleEnter">{{ section.title
            }}</h4>
        <div id="options">
            <Edit @click="makeEditable" />
            <Delete @click="handleSection" />
        </div>
        <AlertTemplate v-if="show" :alert />
    </div>
</template>

<script setup>
import { ref, nextTick, toRef, reactive } from 'vue'
import Edit from '../../../icons/Edit.vue'
import Delete from '../../../icons/Delete.vue'
import BoardSection from '../../../../models/BoardSection'
import store from '../../../../store/store'
import Alert from '../../../../models/Alert'
import AlertTemplate from '../../../Alerts/AlertTemplate.vue'
import { useBoardFunctions } from '../../../../composables/helpers/useBoardFunctions'
import { useIsLoggedFuctions } from '../../../../composables/helpers/useIsLoggedFunctions'
import { useSectionFunctions } from '../../../../composables/helpers/useSectionFunctions'
const props = defineProps({
    section: {
        type: BoardSection,
        required: true
    }
})

const editTitle = ref(false)
const titleRef = ref(null)
const show = ref(false)
const originalTitle = toRef(props.section.title) // Referencia reactiva al título original
const alert = reactive(new Alert())
const { handleUpdateBoard } = useBoardFunctions()
const { handleSaveInLocalStorage } = useIsLoggedFuctions()
const { handleRemoveSection } = useSectionFunctions()

const makeEditable = () => {
    editTitle.value = true
    nextTick(() => {
        titleRef.value.focus()
    })
}

const handleBlur = () => {
    editTitle.value = false
    handleTitle()
}

const handleEnter = () => {
    editTitle.value = false
    titleRef.value.blur() // Desenfoca el h4
}

const handleTitle = () => {
    const newTitle = titleRef.value.innerText.trim()
    if (newTitle !== originalTitle.value) {
        props.section.title = newTitle
        handleUpdateBoard(store.board, store.boards)
        handleSaveInLocalStorage(store.boards)
    }
}

const handleSection = () => {
    alert.type = alert.types.warning
    alert.message = '¿Estas seguro de querer eliminar esta sección?'
    alert.actions = [
        Alert.action('Cancelar', alert.styles.btnDanger, () => { show.value = false }),
        Alert.action('Eliminar', alert.styles.btnSuccess, () => {
            handleRemoveSection(store.board, props.section)
            handleUpdateBoard(store.board, store.boards)
            handleSaveInLocalStorage(store.boards)
            show.value = false
        })
    ]
    show.value = true
}

</script>

<style scoped>
#title {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

h4 {
    color: var(--text-color);
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    user-select: none;
}

h4:focus {
    outline: none;
    border-bottom: 1px solid var(--primary-color);
}

#options {
    display: flex;
    align-items: center;
}
</style>