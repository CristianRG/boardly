<template>
    <div class="content">
        <span v-if="!edit" style="font-size: 30px;">Nuevo</span>
        <span v-else style="font-size: 30px;">Editar</span>
        <div class="form-group" style="margin-top: 1rem;">
            <label for="name">Nombre de la tarea</label>
            <input type="text" id="name" v-model="activityRef.title" />
        </div>
        <div class="form-group">
            <label for="description">Contenido de la tarea (Opcional)</label>
            <textarea style="height: 5rem;" id="description" maxlength="300" v-model="activityRef.content" />
        </div>
        <div class="buttons-group">
            <button @click="$emit('close')" class="btn btn-danger">Cancelar</button>
            <button v-if="!edit" @click="handleAdd" class="btn btn-success">Crear tarea</button>
            <button v-else @click="handleEdit" class="btn btn-success">Actualizar tarea</button>
        </div>
        <span v-if="error" style="display: block; text-align: center; color: var(--color-danger);">{{ error }}</span>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Activity from '../../../../models/Activity';
import { uuid } from 'vue-uuid';
import store from '../../../../store/store';
import BoardSection from '../../../../models/BoardSection';
import useActivityFunctions from '../../../../composables/helpers/useActivityFunctions';
import { useBoardFunctions } from '../../../../composables/helpers/useBoardFunctions';
import { useIsLoggedFuctions } from '../../../../composables/helpers/useIsLoggedFunctions';

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

const handleAdd = () => {
    if (!activityRef.title) {
        error = 'El nombre de la tarea es obligatorio'
    }
    else {
        activityRef.id = uuid.v4()
        activityRef.owner = store.user
        activityRef.comments = []

        handleAddActivity(props.section, activityRef)
        handleUpdateBoard(store.board, store.boards)
        handleSaveInLocalStorage(store.boards)
        emits('close')
    }
}

const handleEdit = () => {
    if (!activityRef.title) {
        error = 'El nombre de la tarea es obligatorio'
    }
    else {
        handleUpdateActivity(props.section, activityRef)
        handleUpdateBoard(store.board, store.boards)
        handleSaveInLocalStorage(store.boards)
        emits('close')
    }
}

</script>
<style scoped>
.content {
    display: block;
}
</style>