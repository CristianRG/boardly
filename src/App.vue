<script setup>
import { RouterView } from 'vue-router'
import { useLocalStorage } from './composables/useLocalStorage'
import { useUser } from './composables/useUser';
import store from './store/store'
import { ref, watch } from 'vue';
import NotificationTemplate from './components/Alerts/NotificationTemplate.vue';

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

const showNotification = ref(false)
const notification = ref(store.notification)

watch(
  () => store.notification,
  (newValue) => {
    showNotification.value = true
    notification.value = newValue
  },
  { deep: true }
)
//console.log(store)
</script>

<template>
  <RouterView>
  </RouterView>
  <NotificationTemplate :show="showNotification" :notification="notification" @close="showNotification = false" />
</template>

<style scoped></style>