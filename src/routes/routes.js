import { createWebHistory, createRouter } from 'vue-router'
import store from '../store/store'

import AppHome from '../views/AppHome.vue'
import Board from '../models/Board'
import { nextTick } from 'vue'

const routes = [
  { path: '/', name: 'Home', component: AppHome },
  { path: '/login', name: 'Login', component: () => import('../views/BoardlyLogin.vue') },
  { path: '/boardly', name: 'Boards', component: () => import('../views/BoardlyHome.vue') },
  { path: '/boardly/:id', name: 'Board', props: true, component: () => import('../views/BoardlyBoard.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to, from, failure) => {
  nextTick(() => {
    document.title = to.name || 'Not title'
  })
})


export default router