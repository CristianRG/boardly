<template>
    <div class="content">
        <button class="btn btn-success" @click="turnOnline">Online</button>
        <span v-if="!connected">Share this url with your team:</span>
        <span v-if="connected">Share this url with your team: <router-link :to="`/share/${store.board.id}`">{{ url }}</router-link></span>
        <span v-if="connected">State: Online</span>
        <span v-else>State: Offline</span>
    </div>
</template>
<script setup>
import useOnlineBoard from '../../../../composables/helpers/useOnlineBoad';
import { ref, watch } from 'vue';
import store from '../../../../store/store';
const { turnOnline, connected, shareBoard } = useOnlineBoard()

const url = ref(null)

watch(connected, (value) => {
    if(value == true){
        store.board.online = true
        url.value = `${window.location.origin}/share/${store.board.id}`
        shareBoard()
    }
})
</script>