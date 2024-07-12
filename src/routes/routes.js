import { createWebHistory, createRouter } from 'vue-router'
import store from '../store/store'

import AppHome from '../views/AppHome.vue'
import Board from '../models/Board'

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

// router.beforeEach((to, from, next)=> {
//   if(to.path === '/boardly/:id'){
//     const JSONboards = JSON.parse(localStorage.getItem('boards'))
//     const board = Board.fromJSON(JSONboards.find(board => board.id === to.params.id))
//     if(board){
//       // pass like prop the board to the next
//       //to.params = board
//       //next()
//       return
//     }
//   }
//   next()
// })

export default router