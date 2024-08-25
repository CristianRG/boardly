<template>
    <div class="content">
        <button class="btn btn-success" @click="turnOnline">Online</button>
        <span>Share this url with your team: {{ }}</span>
        <span>State: {{ state.connected }}</span>
    </div>
</template>
<script setup>
import { state } from '../../../../socket';
import useOnlineBoard from '../../../../composables/helpers/useOnlineBoad';
import { onDeactivated } from 'vue';
const { turnOnline, connected } = useOnlineBoard()

</script>