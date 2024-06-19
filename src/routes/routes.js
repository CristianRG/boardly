import { createWebHistory, createRouter } from 'vue-router'

import AppHome from '../views/AppHome.vue'

const routes = [
  { path: '/', component: AppHome },
  {path: '/boardly', component: ()=> import('../views/BoardlyHome.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router