<script setup>
import { RouterView } from 'vue-router'
import { useLocalStorage } from './composables/useLocalStorage'
import { useUser } from './composables/useUser';
import store from './store/store'
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

</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
