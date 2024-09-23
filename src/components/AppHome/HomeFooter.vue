<template>
    <footer>
        <div class="icon">
            <GitHub />
        </div>
    </footer>
</template>
<script setup>
import GitHub from '../icons/GitHub.vue';
</script>
<style scoped>
footer {
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    padding: 12px;
}

.icon {
    transition: var(--tran-03);
}

.icon:hover {
    transform: scale(1.1);
}
</style>