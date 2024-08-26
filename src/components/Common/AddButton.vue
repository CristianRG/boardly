<template>
    <div class="button-add">
        <span>{{ message }}</span>
        <AddNew />
    </div>
</template>
<script setup>
import AddNew from '../icons/AddNew.vue';
const props = defineProps({
    message: {
        type: String,
        required: true
    }
})
</script>
<style scoped>
.button-add {
    width: 15rem;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--primary-color);
    border-radius: 5px;
    user-select: none;
}

@media (max-width: 1200px) {
    .button-add {
        position: fixed;
        bottom: 10px;
        right: 10px;
    }
}

@media (max-width: 390px) {
    .button-add {
        width: 3rem;
        position: fixed;
    }

    span {
        display: none;
    }
}
span {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin: 0%;
    margin-left: 5px;
}
</style>