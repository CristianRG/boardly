<template>
    <div class="content">
        <div class="details" v-if="!edit">
            <span style="font-size: 30px; font-weight: bold; color: var(--text-color);">{{ activity.title }}</span>
            <p style="font-size: 18px; color:var(--text-color);">{{ activity.content }}</p>

            <div class="options">
                <Edit @click="edit = true" />
                <Delete @click="actions.DELETE(section, activity)" />
                <Forward />
            </div>
        </div>
        <ModalNewActivity v-if="edit" :activity="activity" :section :edit @close="edit = false" />
        <Teleport to="body">
            <AlertTemplate v-if="showAlert" @close="showAlert = false" :alert />
        </Teleport>
    </div>
</template>
<script setup>
import Activity from '../../../../models/Activity';
import Edit from '../../../icons/Edit.vue';
import Delete from '../../../icons/Delete.vue';
import Forward from '../../../icons/Forward.vue';
import ModalNewActivity from './ModalNewActivity.vue';
import { ref } from 'vue';
import useActivityFunctions from '../../../../composables/helpers/useActivityFunctions';
import BoardSection from '../../../../models/BoardSection';
const { handleRemoveActivity } = useActivityFunctions()
import AlertTemplate from '../../../Alerts/AlertTemplate.vue';
import Alert from '../../../../models/Alert';
import store from '../../../../store/store';

const props = defineProps({
    activity: {
        type: Activity,
        required: true
    },
    editable: Boolean,
    section: {
        type: BoardSection,
        required: true
    }
})

let alert = new Alert()
const edit = ref(props.editable)
const showAlert = ref(false)

const actions = {
    DELETE: (section, activity) => {
        showAlert.value = true
        alert = new Alert(alert.types.warning, '', '¿Estas seguro de querer eliminar esta actividad?',
            [Alert.action('Cancelar', alert.styles.btnDanger, () => showAlert.value = false), Alert.action('Eliminar', alert.styles.btnSuccess, () => {
                handleRemoveActivity(section, activity)
                store.notification = { message: 'Actividad eliminada por @' + store.user.name }
            })])
    },
}

</script>
<style scoped>
.content {
    display: block;
}

.options {
    display: flex;
    justify-content: end;
}
</style>