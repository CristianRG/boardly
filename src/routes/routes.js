import { createWebHistory, createRouter } from 'vue-router'
import store from '../store/store'

import AppHome from '../views/AppHome.vue'
import Board from '../models/Board'
import { nextTick } from 'vue'
import { handleLocalStorage } from '../helpers/handleLocalStorage'
import { handleRoutes } from '../helpers/handleRoutes'
import Notification from '../models/NotificationModel'
import { uuid } from 'vue-uuid'

const {handleGetBoards} = handleLocalStorage()
const {beforeEachNotLogged, beforeEachLogged} = handleRoutes()

const routes = [
  { path: '/', name: 'Home', component: AppHome },
  { path: '/login', name: 'Login', component: () => import('../views/BoardlyLogin.vue') },
  { path: '/boardly', name: 'Boards', meta: {requireAuth: true}, component: () => import('../views/BoardlyHome.vue') },
  { path: '/boardly/:id', name: 'Board', meta: {requireAuth: true}, props: true, component: () => import('../views/BoardlyBoard.vue') },
  { path: '/share/:id', name: 'Share', props: true, component: () => import('../views/BoardlyShareBoard.vue')},
  { path: '/:pathMatch(.*)*', name: '404', component: () => import('../views/Error404.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if(!store.logged){
    beforeEachNotLogged(to, from, next)
  }
  else {
    beforeEachLogged(to, from, next)
  }
})

router.afterEach((to, from, failure) => {
  nextTick(() => {
    document.title = to.name || 'Not title'
  })
})


export default router