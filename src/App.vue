<script setup>
import { RouterView } from 'vue-router'
import { useLocalStorage } from './composables/useLocalStorage'
import { useUser } from './composables/useUser';
import store from './store/store'
import NotificationTemplate from './components/Alerts/NotificationTemplate.vue';
import { useCookies } from './composables/useCookies';
import { onMounted, watch } from 'vue';
import { useFetch } from './composables/useFetch';
import User from './models/User';

const { getItem } = useLocalStorage()
const { setUser, saveUserState } = useUser()
const { getCookie } = useCookies()
const { postData } = useFetch()

const theme = getItem('theme')

if (theme) {
  store.theme = theme
  if (theme != 'light' && !document.querySelector('body').classList.contains('dark')) {
    document.querySelector('body').classList.toggle(theme)
  }
}

const token = getCookie('token')
if (token) {
  store.logged = true
  onMounted(async () => {
    try {
      const response = await postData({ URL: `${store.SERVICE_API}/user/auth`, body: { token: token } })
      if (response.status == 200) {
        const result = await response.json()
        store.user = User.fromJSON(result.publicUser)
      }
    } catch (error) {
      console.log(error)
    }
  })
}
else {
  store.logged = false
  const user = getItem('user')
  if (user) {
    setUser(user, store.logged)
    saveUserState()
  }
}

//let notificationsRef = null

const removeNotification = (notification) => {
  store.notifications.shift()
}

watch(
  () => store.notifications,
  (newValue) => {
    //notificationsRef = document.getElementById('notifications')
  },
  { deep: true }
)
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