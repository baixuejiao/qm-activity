import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/Index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/Register.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/success/Success.vue')
    },
    {
      path: '/draw',
      name: 'draw',
      component: () => import('@/views/draw/Draw.vue')
    },
    {
      path: '/complete',
      name: 'complete',
      component: () => import('@/views/complete/Complete.vue')
    },
    {
      path: '/vote',
      name: 'vote',
      component: () => import('@/views/vote/Vote.vue')
    },
    {
      path: '/player',
      name: 'player',
      component: () => import('@/views/player/Player.vue')
    },
    {
      path: '*',
      name: 'error',
      component: () => import('@/views/error/Error.vue')
    }
  ]
})