<template>
    <div class="content">
        <div class="details" v-if="!edit">
            <span style="font-size: 30px; font-weight: bold; color: var(--text-color);">{{ activity.title }}</span>
            <p style="font-size: 18px; color:var(--text-color);">{{ activity.content }}</p>

            <div class="options">
                <Edit @click="edit = true"/>
                <Delete />
            </div>
        </div>
        <ModalNewActivity v-if="edit" :activity="activity" :sectionId :edit @close="edit = false" />
    </div>
</template>
<script setup>
import Activity from '../../../models/Activity';
import Edit from '../../icons/Edit.vue';
import Delete from '../../icons/Delete.vue';
import ModalNewActivity from './ModalNewActivity.vue';
import { ref } from 'vue';
const props = defineProps({
    activity: {
        type: Activity,
        required: true
    },
    editable: Boolean,
    sectionId: String
})

const edit = ref(props.editable)

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