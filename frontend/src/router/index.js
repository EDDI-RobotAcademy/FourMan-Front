import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpPage from "@/views/member/SignUpPage";
// import SignInPage from "@/views/lecture/member/SignInPage";
// import SearchMemberPasswordPage from "@/views/lecture/member/SearchMemberPasswordPage";

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
    path: '/sign-up',
    name: 'SignUpPage',
    component: SignUpPage
  },
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
  // {
  //   path: '/sign-in',
  //   name: 'SignInPage',
  //   component: SignInPage
  // },
  // {
  //   path: '/search-password',
  //   name: 'SearchMemberPasswordPage',
  //   component: SearchMemberPasswordPage
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
