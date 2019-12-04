import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import authGuard from './auth/authGuard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: authGuard,
      redirect: { name: 'lists' },
      children: [
        {
          path: '/lists',
          name: 'lists',
          beforeEnter: authGuard,
          component: () => import(/* webpackChunkName: "lists" */ './views/Lists.vue')
        },
        {
          path: '/lists/:listId',
          name: 'list',
          beforeEnter: authGuard,
          component: () => import(/* webpackChunkName: "lists" */ './views/List.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          beforeEnter: authGuard,
          component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue')
        },
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "auth" */ './views/Auth.vue')
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import(/* webpackChunkName: "callback" */ './views/Callback.vue')
    },
    {
      path: '/**',
      name: 'page-not-found',
      component: () => import(/* webpackChunkName: "page-not-found" */ './views/PageNotFound.vue')
    },
  ]
})
