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
            <button v-if="!edit" @click="handleAddActivity" class="btn btn-success">Crear tarea</button>
            <button v-else @click="handleEditActivity" class="btn btn-success">Actualizar tarea</button>
        </div>
        <span v-if="error" style="display: block; text-align: center; color: var(--color-danger);">{{ error }}</span>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Activity from '../../../../models/Activity';
import { uuid } from 'vue-uuid';
import store from '../../../../store/store';

const props = defineProps({
    activity: {
        type: Activity,
        default: () => new Activity()
    },
    edit: Boolean,
    sectionId: String
})

const emits = defineEmits(['close'])
let error = ref('')
let activityRef = ref(props.activity)
const indexSection = store.board.sections.findIndex((section) => section.id == props.sectionId)

const handleAddActivity = () => {
    if (!activityRef.value.title) {
        error.value = 'El nombre de la tarea es obligatorio'
    }
    else{
        activityRef.value.id = uuid.v4()
        activityRef.value.owner = store.user
        activityRef.value.comments = []

        store.activityFunctions.addActivity(store.board.sections[indexSection], activityRef.value)
        store.boardFunctions.updateBoard(store.board, store.boards)
        localStorage.setItem('boards', JSON.stringify(store.boards))
        emits('close')
    }
}

const handleEditActivity = () => {
    if (!activityRef.value.title) {
        error.value = 'El nombre de la tarea es obligatorio'
    }
    else {
        store.activityFunctions.updateActivity(store.board.sections[indexSection], activityRef.value)
        store.boardFunctions.updateBoard(store.board, store.boards)
        localStorage.setItem('boards', JSON.stringify(store.boards))
        emits('close')
    }
}

</script>
<style scoped>
.content {
    display: block;
}
</style>