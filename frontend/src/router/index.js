import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductRegisterPage from '@/views/product/ProductRegisterPage.vue'
import ProductListPage from '@/views/product/ProductListPage.vue'

import SignUpPage from "@/views/member/SignUpPage";
// import SignInPage from "@/views/lecture/member/SignInPage";
// import SearchMemberPasswordPage from "@/views/lecture/member/SearchMemberPasswordPage";
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

    path: '/sign-up',
    name: 'SignUpPage',
    component: SignUpPage
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
