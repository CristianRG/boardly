<template>
    <div class="content">
        <span v-if="!edit" style="font-size: 30px;">Nuevo</span>
        <span v-else style="font-size: 30px;">Editar</span>
        <label for="name" style="margin-top: 1rem;">Nombre de la tarea</label>
        <input type="text" id="name" v-model="activityRef.title" />
        <Editor :content="activityRef.content" @update="handleUpdate"/>
        <div class="buttons-group">
            <button @click="$emit('close')" class="btn btn-danger">Cancelar</button>
            <button v-if="!edit" @click="handleAdd" class="btn btn-success">Crear tarea</button>
            <button v-else @click="handleEdit" class="btn btn-success">Actualizar tarea</button>
        </div>
        <span v-if="error" style="display: block; text-align: center; color: var(--color-danger);">{{ error }}</span>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import Activity from '../../../../models/Activity';
import { uuid } from 'vue-uuid';
import store from '../../../../store/store';
import BoardSection from '../../../../models/BoardSection';
import useActivityFunctions from '../../../../composables/helpers/useActivityFunctions';
import { useBoardFunctions } from '../../../../composables/helpers/useBoardFunctions';
import { useIsLoggedFuctions } from '../../../../composables/helpers/useIsLoggedFunctions';
import Editor from '../../../ToastEditor/Editor.vue';

const props = defineProps({
    activity: {
        type: Activity,
        default: () => new Activity()
    },
    edit: Boolean,
    section: {
        type: BoardSection,
        required: true
    }
})

const { handleAddActivity, handleUpdateActivity, handleFindActivity } = useActivityFunctions()
const { handleUpdateBoard } = useBoardFunctions()
const { handleSaveInLocalStorage } = useIsLoggedFuctions()

const emits = defineEmits(['close'])
let error = ref('')
const activityRef = Activity.fromJSON({ ...props.activity })

const handleUpdate = (content) => {
    activityRef.content = content
}

const handleAdd = () => {
    if (!activityRef.title) {
        error.value = 'El nombre de la tarea es obligatorio'
    }
    else {
        activityRef.id = uuid.v4()
        activityRef.owner = store.user
        activityRef.comments = []

        handleAddActivity(props.section, activityRef)
        handleUpdateBoard(store.board, store.boards)
        handleSaveInLocalStorage(store.boards)
        store.notification = { message: 'Actividad agregada por @' + store.user.name }
        emits('close')
    }
}

const handleEdit = () => {
    if (!activityRef.title) {
        error.value = 'El nombre de la tarea es obligatorio'
    }
    else {
        handleUpdateActivity(props.section, activityRef)
        handleUpdateBoard(store.board, store.boards)
        handleSaveInLocalStorage(store.boards)
        store.notification = { message: 'Actividad editada por @' + store.user.name }
        emits('close')
    }
}
onMounted(() => {
    // toastui-editor-dropdown-toolbar
    document.querySelector('.content').addEventListener('click', (ev) => {
        const toolbar = document.querySelector('.toastui-editor-dropdown-toolbar')
        const toolbarButton = document.querySelector('.more')
        if(ev.target != toolbarButton && toolbar.style.display != "none"){
            toolbar.style.display = "none"
        }
        if(ev.target == toolbarButton && toolbar.style.display == "none"){
            toolbar.style.display = "flex"
        }
    })
})
</script>
<style scoped>
.content {
    display: block;
}
</style>