<script setup>
import { RouterView } from 'vue-router'
import { useLocalStorage } from './composables/useLocalStorage'
import { useUser } from './composables/useUser';
import store from './store/store'
import { onMounted, ref, watch } from 'vue';
import NotificationTemplate from './components/Alerts/NotificationTemplate.vue';
import Notification from './models/NotificationModel';

const { getItem } = useLocalStorage()
const { setUser, saveUserState } = useUser()

const theme = getItem('theme')

if (theme) {
  store.theme = theme
  if (theme != 'light' && !document.querySelector('body').classList.contains('dark')) {
    document.querySelector('body').classList.toggle(theme)
  }
}

const user = getItem('user')
if (user) {
  setUser(user, store.logged)
  saveUserState()
}

let notificationsRef = null



//onMounted(() => {notificationsRef = document.getElementById('notifications'), console.log(notificationsRef)})

const removeNotification = (notification) => {
  const index = store.notifications.findIndex(n => n.id == notification.id)
  console.log(notificationsRef)
  //document.querySelector('body').firstChild()
  // console.log(index, store.notifications)
  // store.notifications.shift()
}

watch(
  () => store.notifications,
  (newValue) => {
    notificationsRef = document.getElementById('notifications')
  },
  { deep: true }
)
//console.log(store)
</script>

<template>
  <RouterView>
  </RouterView>
  <div v-if="store.notifications.length > 0" class="notifications" style="position: absolute; width: 15rem; height: 7rem; bottom: 60px; right: 10px; display: flex; 
    flex-direction: column; align-items: center; gap: 5px; overflow: hidden;" id="notifications">
    <NotificationTemplate :show="true" v-for="notification in store.notifications" :notification
      @close="removeNotification" />
  </div>
</template>

<style scoped></style>