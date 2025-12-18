import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('../views/TeamsView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/space',
      name: 'space',
      component: () => import('../views/SpaceView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('../views/ServiceView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: false },
    },
  ],
})

// 路由守衛 - 檢查認證
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 如果需要認證但未登入，重定向到登入頁
    next('/login')
  } else {
    next()
  }
})

export default router
