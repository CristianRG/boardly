<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" v-if="!user">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
        </svg>
        <img v-if="user" :src="user.avatar" alt="Profile image">
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
import User from '../../models/User'

const props = defineProps({
    user: {
        type: User
    }
})
</script>
<style scoped>
    div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid var(--text-color);
        padding: 2px;
    }

    img {
        width: 100%;
    }

    svg {
        width: 40px;
        height: 40px;
        fill: var(--text-color);
    }

    /* Media query to hide user img or svg when size is less that 338 */
    @media (max-width: 340px) {
        img, svg, div {
            display: none;
        }
    }

</style>