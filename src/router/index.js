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
import EventBoardDetailPage  from '@/views/eventBoard/EventBoardDetailPage.vue'
import EventBoardModifyPage  from '@/views/eventBoard/EventBoardModifyPage.vue'

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

Vue.use(VueRouter)

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
    }

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
    component: EventBoardRegisterPage
  },
  {
    path: '/event-board-detail-page/:eventId',
    name: 'EventBoardDetailPage',
    components: {
      default:  EventBoardDetailPage
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
  component: CafeIntroBoardRegisterPage
},
{
  path: '/cafe-board-detail-page/:cafeId',
  name: 'CafeIntroBoardDetailPage',
  components: {
    default:CafeIntroBoardDetailPage
  },
  props: {
    default: true
  }
},
{
  path: '/cafe-board-modify-page/:cafeId',
  name: 'CafeIntroBoardModifyPage',
  components: {
    default:CafeIntroBoardModifyPage
  },
  props: {
    default: true
  }
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
    components: {
      default: ProductListPage
    },
    props: {
      default: true
    }
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
    }
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
  {
    path: '/question-board-modify-page/:boardId',
    name: 'QuestionBoardModifyPage',
    components: {
      default: QuestionBoardModifyPage
    },
    props: {
      default: true
    }
  },
  //마이페이지 관련
  {
    path: '/member-my-page',
    name: 'MemberMyPage',
    component: MemberMyPage
  },
  {
    path: '/product-manage-page',
    name: 'ProductManagePage',
    components: {
      default: ProductManagePage
    },
    props: {
      default: true
    }
  },
  {
    path: '/product-modify-page',
    name: 'ProductModifyPage',
    components: {
      default: ProductModifyPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/member-order-history-page',
    name: 'MemberOrderHistoryPage',
    component: MemberOrderHistoryPage
  },
  {
    path: '/member-my-info-modify-page',
    name: 'MemberMyInfoModifyPage',
    components: {
      default: MemberMyInfoModifyPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/member-management-page',
    name: 'MemberManagementPage',
    components: {
      default: MemberManagementPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/cafe-management-page',
    name: 'CafeManagementPage',
    components: {
      default: CafeManagementPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/my-cafe-management-page',
    name: 'MyCafeManagementPage',
    components: {
      default: MyCafeManagementPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/my-cafe-modify-page',
    name: 'MyCafeModifyPage',
    components: {
      default: MyCafeModifyPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/my-cafe-order-list-page',
    name: 'MyCafeOrderListPage',
    components: {
      default: MyCafeOrderListPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/point-details-page',
    name: 'PointDetailsPage',
    components: {
      default: PointDetailsPage
    },
    props: {
      default: true
    }
  },
  {
    path: '/member-point-details-page',
    name: ' MemberPointDetailsPage',
    components: {
      default:  MemberPointDetailsPage
    },
    props: {
      default: true
    }
  },
  // 공지사항 관련
  {
    path: '/notice-board-register-page',
    name: 'NoticeBoardRegisterPage',
    component: NoticeBoardRegisterPage
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
    }
  },

  //내가 쓴 게시물 관련
  {
    path: '/my-free-board-page',
    name: 'MyFreeBoardPage',
    component: MyFreeBoardPage
  },
  {
    path: '/my-question-board-page',
    name: 'MyQuestionBoardPage',
    component: MyQuestionBoardPage
  },
  {
    path: '/my-review-board-page',
    name: 'MyReviewBoardPage',
    component: MyReviewBoardPage
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