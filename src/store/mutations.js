import {
   //예약관련

   REQUEST_CAFE_SEAT_TO_SPRING,

   // 카페소개보드관련
   REQUEST_CAFE_LIST_TO_SPRING,
   REQUEST_CAFE_NUM_TO_SPRING,
   REQUEST_CAFE_DETAIL_TO_SPRING,

   // 상품 관련
   REQUEST_PRODUCT_LIST_TO_SPRING,
   REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,
   REQUEST_ALL_PRODUCT_TO_SPRING,

   // 보드 관련
   REQUEST_FREE_BOARD_LIST_TO_SPRING,
   REQUEST_FREE_BOARD_TO_SPRING,

   //질문게시판 관련
   REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
   REQUEST_QUESTION_BOARD_TO_SPRING,

   //리뷰게시판 관련
   REQUEST_REVIEW_BOARD_LIST_TO_SPRING,
   REQUEST_REVIEW_BOARD_TO_SPRING,
   REQUEST_REVIEW_BOARD_IMAGE_LIST_TO_SPRING,

   //댓글 관련
   REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING,

   //주문 관련
   REQUEST_ORDER_INFORMATIONS_TO_SPRING,
   //게시물 검색 관련
   REQUEST_SEARCH_BOARD_TO_SPRING,
   //공지사항 게시판 관련
   REQUEST_NOTICE_BOARD_LIST_TO_SPRING,
   REQUEST_NOTICE_BOARD_TO_SPRING,

   //나의게시판 관련
   REQUEST_MY_FREE_BOARD_LIST_TO_SPRING,

   //마이페이지 관련
   REQUEST_MY_INFO_TO_SPRING,
} from './mutation-types'

export default {
   //예약관련

   [REQUEST_CAFE_SEAT_TO_SPRING](state,passingData){
      state.seatData=passingData.seatResponse
      state.tableData=passingData.tableResponse
   },

   //카페소개보드관련
   [REQUEST_CAFE_LIST_TO_SPRING](state, passingData) {
      state.cafeLists = passingData
   },
   [REQUEST_CAFE_NUM_TO_SPRING](state, passingData) {
      state.cafeCheck = passingData
   },
   [REQUEST_CAFE_DETAIL_TO_SPRING](state, passingData) {
      state.cafe = passingData
   },

   // 상품 관련
   [REQUEST_PRODUCT_LIST_TO_SPRING](state, passingData) {
      state.products = passingData
   },
   [REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING](state, passingData) {
      state.productImages = passingData
   },
   [REQUEST_ALL_PRODUCT_TO_SPRING](state, passingData) {
      state.allOfProducts = passingData
   },

   // 보드 관련
   [REQUEST_FREE_BOARD_LIST_TO_SPRING] (state, passingData) {
      state.freeBoards = passingData
   },
   [REQUEST_FREE_BOARD_TO_SPRING] (state, passingData) {
      state.freeBoard = passingData
  },

   //질문 게시판 관련
   [REQUEST_QUESTION_BOARD_LIST_TO_SPRING] (state, passingData) {
      state.questionBoards = passingData
   },
   [REQUEST_QUESTION_BOARD_TO_SPRING] (state, passingData) {
      state.questionBoard = passingData
   },

   //리뷰 게시판 관련
   [REQUEST_REVIEW_BOARD_LIST_TO_SPRING] (state, passingData) {
      state.reviewBoards = passingData
   },
   [REQUEST_REVIEW_BOARD_TO_SPRING] (state, passingData) {
      state.reviewBoard = passingData
   },
   [REQUEST_REVIEW_BOARD_IMAGE_LIST_TO_SPRING] (state, passingData) {
      state.reviewBoardImages = passingData
   },
   //댓글 관련
   [REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING] (state, passingData) {
      state.comments = passingData
   },

   //주문 관련
   [REQUEST_ORDER_INFORMATIONS_TO_SPRING](state, passingData) {
      state.orderInformations = passingData
   },
   //게시물 검색 관련
   [REQUEST_SEARCH_BOARD_TO_SPRING] (state, passingData) {
      state.searchBoards = passingData
   },

   //공지사항 게시판 관련
   [REQUEST_NOTICE_BOARD_LIST_TO_SPRING] (state, passingData) {
      state.noticeBoards = passingData
   },
   [REQUEST_NOTICE_BOARD_TO_SPRING] (state, passingData) {
      state.noticeBoard = passingData
   },

   //나의 게시판 관련
   [REQUEST_MY_FREE_BOARD_LIST_TO_SPRING] (state, passingData) {
      state.myFreeBoards = passingData
   },

   // 마이페이지 내 정보 관련
   [REQUEST_MY_INFO_TO_SPRING] (state, passingData) {
      state.myInfo = passingData
   },
}