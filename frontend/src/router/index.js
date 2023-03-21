import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpPage from "@/views/member/SignUpPage";
import SignInPage from "@/views/member/SignInPage";
// import SearchMemberPasswordPage from "@/views/member/SearchMemberPasswordPage";
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
    path: '/sign-in',
    name: 'SignInPage',
    component: SignInPage
  },
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
