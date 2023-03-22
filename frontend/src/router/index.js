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
    component: FreeBoardRegisterPage,
    beforeEnter: (to, from, next) => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo != null) {
        // 로그인 되어 있을 때는 페이지 이동을 허용
        next();
      } else {
        // 로그인 되어 있지 않을 때는 로그인 페이지로 이동
        alert('로그인 후 글을 작성할 수 있습니다.')
        next('/sign-in');
      }
    }
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router