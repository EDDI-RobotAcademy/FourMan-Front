import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import MainPage from "@/views/MainPage.vue"

//로그인관련
import SignUpPage from "@/views/member/SignUpPage";
import SignInPage from "@/views/member/SignInPage";
import SearchMemberPasswordPage from "@/views/member/SearchMemberPasswordPage";
import SignUpAcceptPage from "@/views/member/SignUpAcceptPage";
import SignUpChoicePage from "@/views/member/SignUpChoicePage";

//프리보드관련
import FreeBoardListPage from '@/views/freeBoard/FreeBoardListPage.vue'
import FreeBoardRegisterPage from '@/views/freeBoard/FreeBoardRegisterPage.vue'
import FreeBoardReadPage from '@/views/freeBoard/FreeBoardReadPage.vue'
import FreeBoardModifyPage from "@/views/freeBoard/FreeBoardModifyPage.vue"

//질문 게시판 관련
import QuestionBoardListPage from '@/views/questionBoard/QuestionBoardListPage.vue'
import QuestionBoardRegisterPage from '@/views/questionBoard/QuestionBoardRegisterPage.vue'
import QuestionBoardReadPage from '@/views/questionBoard/QuestionBoardReadPage.vue'

//상품관련
import ProductRegisterPage from '@/views/product/ProductRegisterPage.vue'
import ProductListPage from '@/views/product/ProductListPage.vue'

Vue.use(VueRouter)

const routes = [
  //공통 페이지 관련
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/main',
    name: 'MainPage',
    component: MainPage
  },

//상품 관련
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


//로그인 관련
  {
    path: '/sign-up',
    name: 'SignUpPage',
    components: {
     default: SignUpPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/sign-in',
    name: 'SignInPage',
    component: SignInPage
  },
  {
    path: '/search-password',
    name: 'SearchMemberPasswordPage',
    component: SearchMemberPasswordPage
  },
  {
    path: '/sign-up-accept',
    name: 'SignUpAcceptPage',
    components: {
      default: SignUpAcceptPage
     },
    props: {
      default: true
    }
  },
  {
    path: '/sign-up-choice',
    name: 'SignUpChoicePage',
    components: {
      default: SignUpChoicePage
     },
    props: {
      default: true
    }
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
  {
    path: '/free-board-read-page/:boardId',
    name: 'FreeBoardReadPage',
    components: {
      default: FreeBoardReadPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/free-board-modify-page/:boardId',
    name: 'FreeBoardModifyPage',
    components: {
      default: FreeBoardModifyPage
    },
    props: {
      default: true
    },
    // 추후 게시글 작성자, 관리자만 수정할 수 있도록 변경 예정
    beforeEnter: (to, from, next) => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo != null) {
        next();
      } else {
        alert('로그인 후 글을 작성할 수 있습니다.')
        next('/sign-in');
      }
    }
  },
  //질문 게시판 관련
  {
    path: '/question-board-list-page',
    name: 'QuestionBoardListPage',
    component: QuestionBoardListPage
  },
  {
    path: '/question-board-register-page',
    name: 'QuestionBoardRegisterPage',
    component: QuestionBoardRegisterPage,
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
  {
    path: '/question-board-read-page/:boardId',
    name: 'QuestionBoardReadPage',
    components: {
      default: QuestionBoardReadPage
    },
    props: {
      default: true
    }
  },




]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router