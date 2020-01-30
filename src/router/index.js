import Vue from 'vue'
import VueRouter from 'vue-router'

const category = () => import('../views/category/category')
const cart = () => import('../views/cart/cart')
const home = () => import('../views/home/home')
const profile = () => import('../views/profile/profile')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/profile',
    component: profile
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
