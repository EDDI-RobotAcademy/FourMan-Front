import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPage from "@/views/MainPage.vue";

//예약페이지관련

import HallSeatPage from "@/views/hallSeat/HallSeatPage";

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
import QuestionBoardModifyPage from '@/views/questionBoard/QuestionBoardModifyPage.vue'

//리뷰 게시판 관련
import ReviewBoardRegisterPage from '@/views/reviewBoard/ReviewBoardRegisterPage.vue'
import ReviewBoardListPage from '@/views/reviewBoard/ReviewBoardListPage.vue'
import ReviewBoardReadPage from '@/views/reviewBoard/ReviewBoardReadPage.vue'
import ReviewBoardModifyPage from '@/views/reviewBoard/ReviewBoardModifyPage.vue'

//상품관련
import ProductRegisterPage from '@/views/product/ProductRegisterPage.vue'
import ProductListPage from '@/views/product/ProductListPage.vue'

//주문 관련
import TotalOrderPage from '@/views/order/TotalOrderPage'

//카페소개 게시판 관련
import CafeIntroBoardListPage from '@/views/cafeIntroduceBoard/CafeIntroBoardListPage.vue'
import CafeIntroBoardRegisterPage from '@/views/cafeIntroduceBoard/CafeIntroBoardRegisterPage.vue'
import CafeIntroBoardDetailPage from '@/views/cafeIntroduceBoard/CafeIntroBoardDetailPage.vue'
import CafeIntroBoardModifyPage from '@/views/cafeIntroduceBoard/CafeIntroBoardModifyPage.vue'

//이벤트 게시판 관련
import EventBoardListPage from '@/views/eventBoard/EventBoardListPage.vue'
import EventBoardRegisterPage from '@/views/eventBoard/EventBoardRegisterPage.vue'
import EventBoardDetailPage from '@/views/eventBoard/EventBoardDetailPage.vue'
import EventBoardModifyPage from '@/views/eventBoard/EventBoardModifyPage.vue'

//마이페이지 관련
import MemberMyPage from '@/views/memberMyPage/MemberMyPage.vue'
import ProductManagePage from '@/views/cafeMyPage/ProductManagePage.vue'
import ProductModifyPage from '@/views/cafeMyPage/ProductModifyPage.vue'
import MemberOrderHistoryPage from '@/views/memberMyPage/MemberOrderHistoryPage.vue'
import MemberMyInfoModifyPage from '@/views/memberMyPage/MemberMyInfoModifyPage.vue'
import MemberManagementPage from '@/views/managerMyPage/MemberManagementPage.vue'
import CafeManagementPage from '@/views/managerMyPage/CafeManagementPage.vue'
import MyCafeManagementPage from '@/views/cafeMyPage/MyCafeManagementPage.vue'
import MyCafeModifyPage from '@/views/cafeMyPage/MyCafeModifyPage.vue'
import PointDetailsPage from '@/views/managerMyPage/PointDetailsPage.vue'
import MemberPointDetailsPage from '@/views/memberMyPage/MemberPointDetailsPage.vue'
import MemberFavoriteCafePage from '@/views/memberMyPage/MemberFavoriteCafePage.vue'
import MyCafeEventListPage from '@/views/cafeMyPage/MyCafeEventListPage.vue'
import MyCafeOrderListPage from '@/views/cafeMyPage/MyCafeOrderListPage.vue'


//공지사항관련
import NoticeBoardRegisterPage from '@/views/noticeBoard/NoticeBoardRegisterPage.vue'
import NoticeBoardListPage from '@/views/noticeBoard/NoticeBoardListPage.vue'
import NoticeBoardReadPage from '@/views/noticeBoard/NoticeBoardReadPage.vue'
import NoticeBoardModifyPage from '@/views/noticeBoard/NoticeBoardModifyPage.vue'

//나의 게시판 관련
import MyFreeBoardPage from '@/views/cafeMyPage/MyFreeBoardPage.vue'

//나의 질문게시판 관련
import MyQuestionBoardPage from '@/views/cafeMyPage/MyQuestionBoardPage.vue'

//나의 리뷰게시판 관련
import MyReviewBoardPage from '@/views/cafeMyPage/MyReviewBoardPage.vue'

// 사이트 소개
import SiteIntroducePage from '@/views/siteIntroduce/SiteIntroducePage.vue'

//
import store from "@/store";
Vue.use(VueRouter)


//토큰으로 회원인지여부확인
const isLoggedIn = async () => {
  const userInfo = localStorage.getItem('userInfo');
  const token = userInfo ? JSON.parse(userInfo).token : null;

  console.log("token!!:", token)
  if (token !== null) {
    try {
      const res = await store.dispatch('memberModule/requestMemberToSpring', token);
      console.log("라우터의 res", res)
      console.log("라우터의 res.data", res.data)
      const object = res.data
      console.log("Member?", res.data)
      return object !== null //로그인이되었으면 true
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("401에러발생!!")
        return false;
      }
      console.log("401이 아닌 다른 에러발생!!")
      console.error("에러 발생:", error);
    }
  }
  return false;//로그인이 안되어있으면

};

const memberTypeCheck = async () => {
  const userInfo = localStorage.getItem('userInfo');
  const token = userInfo ? JSON.parse(userInfo).token : null;

  console.log("token!!:", token)
  if (token !== null) {
    try {
      const res = await store.dispatch('memberModule/requestMemberToSpring', token);
      console.log("라우터의 res", res)
      console.log("라우터의 res.data", res.data)
      const object = res.data
      console.log("Member?", res.data)
      return object.authority.authorityName;//로그인이되었으면 true
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("401에러발생!!")
        return false;
      }
      console.log("401이 아닌 다른 에러발생!!")
      console.error("에러 발생:", error);
    }
  }
  return false;
};


const ifNotMember = async (to, from, next) => {//비회원인경우만 접속가능하게ex)로그인페이지
  if (!await isLoggedIn()) {//로그인이안되었다면
    next();//다음 라우트로 이동
    return;
  }
  alert("비회원만 가능합니다.")
  next("/");//로그인이되었다면 루트경로로이동
};

const ifMember = async (to, from, next) => {//회원인경우만 접속가능하게
  if (await isLoggedIn()) {//로그인이되었다면
    next();//진행
    return;
  }
  alert("로그인 페이지로 이동합니다.")
  next("/sign-in");//로그인이 안되었다면 로그인페이지로이동
};



const ifManager = async (to, from, next) => {//매니저인경우
  if (await memberTypeCheck() == 'MANAGER') {
    next();
    return;
  }
  alert("관리자만 가능합니다.")
  next('/');
};

const ifCafe = async (to, from, next) => {//카페사업자인경우
  if (await memberTypeCheck() == 'CAFE') {
    next();
    return;
  }
  alert("카페사업자만 가능합니다.")
  next('/cafe-board-list-page');
};

const routes = [
  //공통 페이지 관련
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },

  //예약 페이지 관련
  {
    path: '/seats',
    name: 'HallSeatPage',
    components: {
      default: HallSeatPage
    },
    props: {
      default: true
    },
    beforeEnter: ifMember
  },
  //이벤트 게시판 관련
  {
    path: '/event-board-list-page',
    name: 'EventBoardListPage',
    component: EventBoardListPage
  },
  {
    path: '/event-board-register-page',
    name: 'EventBoardRegisterPage',
    component: EventBoardRegisterPage,
    beforeEnter: ifCafe
  },
  {
    path: '/event-board-detail-page/:eventId',
    name: 'EventBoardDetailPage',
    components: {
      default: EventBoardDetailPage
    },
    props: {
      default: true
    },
  },
  {
    path: '/event-board-modify-page/:eventId',
    name: 'EventBoardModifyPage',
    components: {
      default: EventBoardModifyPage
    },
    props: {
      default: true
    },
    beforeEnter: ifCafe
  },

  //카페소개 게시판 관련
  {
    path: '/cafe-board-list-page',
    name: 'CafeIntroBoardListPage',
    component: CafeIntroBoardListPage
  },
  {
    path: '/cafe-board-register-page',
    name: 'CafeIntroBoardRegisterPage',
    component: CafeIntroBoardRegisterPage,
    beforeEnter: ifCafe
  },
  {
    path: '/cafe-board-detail-page/:cafeId',
    name: 'CafeIntroBoardDetailPage',
    components: {
      default: CafeIntroBoardDetailPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/cafe-board-modify-page/:cafeId',
    name: 'CafeIntroBoardModifyPage',
    components: {
      default: CafeIntroBoardModifyPage
    },
    props: {
      default: true
    },
    beforeEnter: ifCafe
  },

  //상품 관련
  {
    path: '/product-register-page',
    name: 'ProductRegisterPage',
    component: ProductRegisterPage,
    beforeEnter: ifCafe
  },
  {
    path: '/product-list-page',
    name: 'ProductListPage',
    components: {
      default: ProductListPage
    },
    props: {
      default: true
    },
    beforeEnter: ifMember
  },

  // 주문 관련
  {
    path: '/total-order-page',
    name: 'TotalOrderPage',
    components: {
      default: TotalOrderPage
    },
    props: {
      default: true
    },
    beforeEnter: ifMember
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
    },
    beforeEnter: ifNotMember
  },
  {
    path: '/sign-in',
    name: 'SignInPage',
    component: SignInPage,
    beforeEnter: ifNotMember
  },
  {
    path: '/search-password',
    name: 'SearchMemberPasswordPage',
    component: SearchMemberPasswordPage,
    beforeEnter: ifNotMember
  },
  {
    path: '/sign-up-accept',
    name: 'SignUpAcceptPage',
    components: {
      default: SignUpAcceptPage
    },
    props: {
      default: true
    },
    beforeEnter: ifNotMember
  },
  {
    path: '/sign-up-choice',
    name: 'SignUpChoicePage',
    components: {
      default: SignUpChoicePage
    },
    props: {
      default: true
    },
    beforeEnter: ifNotMember
  },


  // 자유 게시판 관련
  {
    path: '/free-board-list-page',
    name: 'FreeBoardListPage',
    component: FreeBoardListPage
  },
  {
    path: '/free-board-register-page',
    name: 'FreeBoardRegisterPage',
    component: FreeBoardRegisterPage,
    beforeEnter: ifMember
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
    beforeEnter: ifMember
  },
  // 리뷰 게시판 관련
  {
    path: '/review-board-register-page',
    name: 'ReviewBoardRegisterPage',
    components: {
      default: ReviewBoardRegisterPage
    },
    props: {
      default: true
    },
    beforeEnter: ifMember
  },
  {
    path: '/review-board-list-page',
    name: 'ReviewBoardListPage',
    component: ReviewBoardListPage
  },
  {
    path: '/review-board-read-page/:reviewBoardId',
    name: 'ReviewBoardReadPage',
    components: {
      default: ReviewBoardReadPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/review-board-modify-page/:reviewBoardId',
    name: 'ReviewBoardModifyPage',
    components: {
      default: ReviewBoardModifyPage
    },
    props: {
      default: true
    },
    beforeEnter: ifMember
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
    beforeEnter: ifMember
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
  {
    path: '/question-board-modify-page/:boardId',
    name: 'QuestionBoardModifyPage',
    components: {
      default: QuestionBoardModifyPage
    },
    props: {
      default: true
    },
    beforeEnter: ifMember
  },
  //마이페이지 관련
  {
    path: '/member-my-page',
    name: 'MemberMyPage',
    component: MemberMyPage,
    beforeEnter: ifMember
  },
  {
    path: '/product-manage-page',
    name: 'ProductManagePage',
    components: {
      default: ProductManagePage
    },
    props: {
      default: true
    },
    beforeEnter: ifCafe
  },
  {
    path: '/product-modify-page',
    name: 'ProductModifyPage',
    components: {
      default: ProductModifyPage
    },
    props: {
      default: true
    },
    beforeEnter: ifCafe
  },
  {
    path: '/member-order-history-page',
    name: 'MemberOrderHistoryPage',
    component: MemberOrderHistoryPage,
    beforeEnter: ifMember
  },
  {
    path: '/member-my-info-modify-page',
    name: 'MemberMyInfoModifyPage',
    components: {
      default: MemberMyInfoModifyPage
    },
    props: {
      default: true
    },
    beforeEnter: ifMember
  },
  {
    path: '/member-management-page',
    name: 'MemberManagementPage',
    components: {
      default: MemberManagementPage
    },
    props: {
      default: true
    },
    beforeEnter: ifManager
  },
  {
    path: '/cafe-management-page',
    name: 'CafeManagementPage',
    components: {
      default: CafeManagementPage
    },
    props: {
      default: true
    },
    beforeEnter: ifManager
  },
  {
    path: '/my-cafe-management-page',
    name: 'MyCafeManagementPage',
    components: {
      default: MyCafeManagementPage
    },
    props: {
      default: true
    },
    beforeEnter: ifCafe
  },
  {
    path: '/my-cafe-modify-page',
    name: 'MyCafeModifyPage',
    components: {
      default: MyCafeModifyPage
    },
    props: {
      default: true
    },
    beforeEnter: ifCafe
  },
  {
    path: '/my-cafe-order-list-page',
    name: 'MyCafeOrderListPage',
    components: {
      default: MyCafeOrderListPage
    },
    props: {
      default: true
    },
    beforeEnter: ifCafe
  },
  {
    path: '/point-details-page',
    name: 'PointDetailsPage',
    components: {
      default: PointDetailsPage
    },
    props: {
      default: true
    },
    beforeEnter: ifManager
  },
  {
    path: '/member-point-details-page',
    name: ' MemberPointDetailsPage',
    components: {
      default: MemberPointDetailsPage
    },
    props: {
      default: true
    },
    beforeEnter: ifMember
  }, {
    path: '/my-favorite-cafe-page',
    name: 'MemberFavoriteCafePage',
    components: {
      default: MemberFavoriteCafePage
    },
    props: {
      default: true
    },
    beforeEnter: ifMember
  },
  {
    path: '/my-cafe-event-page',
    name: 'MyCafeEventListPage',
    components: {
      default: MyCafeEventListPage
    },
    props: {
      default: true
    },
    beforeEnter: ifCafe
  },


  // 공지사항 관련
  {
    path: '/notice-board-register-page',
    name: 'NoticeBoardRegisterPage',
    component: NoticeBoardRegisterPage,
    beforeEnter: ifMember
  },
  {
    path: '/notice-board-list-page',
    name: 'NoticeBoardListPage',

    component: NoticeBoardListPage
  },
  {
    path: '/notice-board-read-page/:boardId',
    name: 'NoticeBoardReadPage',
    components: {
      default: NoticeBoardReadPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/notice-board-modify-page/:boardId',
    name: 'NoticeBoardModifyPage',
    components: {
      default: NoticeBoardModifyPage
    },
    props: {
      default: true
    },
    beforeEnter: ifMember
  },

  //내가 쓴 게시물 관련
  {
    path: '/my-free-board-page',
    name: 'MyFreeBoardPage',
    component: MyFreeBoardPage,
    beforeEnter: ifMember
  },

  {
    path: '/my-question-board-page',
    name: 'MyQuestionBoardPage',
    component: MyQuestionBoardPage,
    beforeEnter: ifMember
  },
  {
    path: '/my-review-board-page',
    name: 'MyReviewBoardPage',
    component: MyReviewBoardPage,
    beforeEnter: ifMember
  },
  // 사이트 소개 페이지
  {
    path: '/site-introduce-page',
    name: 'SiteIntroducePage',
    component: SiteIntroducePage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router