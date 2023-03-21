import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductRegisterPage from '@/views/product/ProductRegisterPage.vue'
import ProductListPage from '@/views/product/ProductListPage.vue'

import MainPage from "@/views/MainPage.vue"

//로그인관련
import SignUpPage from "@/views/member/SignUpPage";
import SignInPage from "@/views/member/SignInPage";

//보드관련
import FreeBoardListPage from '@/views/freeBoard/FreeBoardListPage.vue'
import FreeBoardRegisterPage from '@/views/freeBoard/FreeBoardRegisterPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product-register-page',
    name: 'ProductRegisterPage',
    component: ProductRegisterPage
  },
  {
    path: '/product-list-page',
    name: 'ProductListPage',
    component: ProductListPage
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage
  },

//로그인 관련
  {
    path: '/sign-up',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/sign-in',
    name: 'SignInPage',
    component: SignInPage
  },


// borard관련
  {
    path: '/free-board-list-page',
    name: 'FreeBoardListPage',
    component: FreeBoardListPage
  },
  {
    path: '/free-board-register-page',
    name: 'FreeBoardRegisterPage',
    component: FreeBoardRegisterPage
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router