import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/Screen',
    name: 'Screen',
    component: () => import('@/pages/screen/Screen.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/index.vue')
  },
  {
    path: '/tailwind',
    name: 'tailwind',
    component: () => import('@/views/tailwind/index.vue')
  },
  {
    path: '/web3',
    name: 'web3',
    component: () => import('@/views/web/test.vue')
  },
  {
    path: '/grid',
    name: 'grid',
    component: () => import('@/views/grid/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
