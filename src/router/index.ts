import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TheView from '../views/TheView/Component.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'TheView',
    component: TheView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
