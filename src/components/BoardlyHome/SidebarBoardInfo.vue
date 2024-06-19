<template>
    <div>
        {{ name }}
        {{ description }}
    </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
</script>