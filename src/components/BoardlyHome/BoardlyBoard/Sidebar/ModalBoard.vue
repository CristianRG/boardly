<template>
    <div class="content">
        <span style="font-size: 30px;">Board</span>

        <div class="info">
            <span><strong>ID</strong>: {{ board.id }}</span>
            <span><strong>Title</strong>: {{ board.name }}</span>
            <span><strong>Description</strong>: {{ board.description }}</span>
            <span><strong>Sections</strong>: {{ board.sections.length }}</span>
            <span><strong>Activities</strong>: {{ totalActivities }}</span>
        </div>
    </div>
</template>
<script setup>
import { defineProps, ref } from 'vue';
import Board from '../../../../models/Board';
const props = defineProps({
    board: {
        type: Board,
        required: true
    }
})


let totalActivities = ref(0);
for (let index = 0; index < props.board.sections.length; index++) {
    const section = props.board.sections[index]
    totalActivities.value += section.activities.length
    
}

</script>
<style scoped>
.content {
    display: block;
}

.info {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>