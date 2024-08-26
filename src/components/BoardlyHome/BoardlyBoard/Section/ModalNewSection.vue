<template>
    <div class="content">
        <span style="font-size: 30px; color: var(--text-color);">Nuevo</span>
        <div class="form-group" style="margin-top: 15px;">
            <label for="name">Nombre</label>
            <input type="text" id="name" class="form-control" v-model="sectionTitle">
        </div>
        <div class="buttons-group">
            <button type="button" class="btn btn-danger" @click="$emit('close')">Cancelar</button>
            <button type="button" class="btn btn-success" @click="handleButton">Aceptar</button>
        </div>
    </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue'
import store from '../../../../store/store.js';
import BoardSection from '../../../../models/BoardSection.js';
import { uuid } from 'vue-uuid';
import { useSectionFunctions } from '../../../../composables/helpers/useSectionFunctions';
import { useBoardFunctions } from '../../../../composables/helpers/useBoardFunctions';
import { useIsLoggedFuctions } from '../../../../composables/helpers/useIsLoggedFunctions'

const emit = defineEmits(['close',])
const section = new BoardSection()
const sectionTitle = ref(section.title)
const { handleAddSection } = useSectionFunctions()
const { handleUpdateBoard } = useBoardFunctions()
const { handleSaveInLocalStorage } = useIsLoggedFuctions()


function handleButton() {
    section.id = uuid.v4()
    section.title = sectionTitle.value
    section.activities = []
    section.description = ''
    section.owner = store.user

    handleAddSection(store.board, section)
    handleUpdateBoard(store.board, store.boards)
    handleSaveInLocalStorage(store.boards)
    emit('close', { section })
}

</script>
<style scoped>
.content {
    display: block;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
textarea {
    border: none;
    border-bottom: 1px solid var(--text-color);
    outline: none;
    width: 100%;
    padding: 5px 0;
    font-size: 16px;
    background: none;
    transition: border-color 0.3s ease;
    color: var(--text-color);
}

textarea {
    resize: none;
}

input[type="text"]:focus,
textarea:focus {
    border-bottom: 1px solid #623EE6;
}
</style>