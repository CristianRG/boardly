<template>
    <div class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <div class="alert-content">
                <span>{{ title }}</span>
                <p>{{ message }}</p>
            </div>
            <div class="options" v-if="actions.length > 0">
                <button class="btn" v-for="action in actions" :class="action.style" @click="action.action">{{
                    action.label }}</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import Alert from '../../models/Alert'

const props = defineProps({
    alert: {
        type: Alert,
        required: true
    }
})

const emits = defineEmits(['close'])

const types = {
    info: 'Información',
    success: 'Éxito',
    warning: 'Advertencia',
    error: 'Error',
}

const title = ref(props.alert.title || types[props.alert.type] || 'Alerta')
const message = ref(props.alert.message)
const actions = ref(props.alert.actions)

</script>
<style scoped>
.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: var(--modal-color);
    margin: 15% auto;
    padding: 20px;
    border: 1px solid var(--text-color);
    border-radius: 5px;
    max-width: 400px;
    color: var(--text-color);
}

.alert-content {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.alert-content span {
    font-size: 30px;
    text-transform: uppercase;
}

.alert-content p {
    margin-top: 10px;
    font-size: 16px;
    text-align: center;
}

.options {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.close {
    color: var(--text-color);
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: var(--text-color-danger);
    text-decoration: none;
    cursor: pointer;
}
</style>