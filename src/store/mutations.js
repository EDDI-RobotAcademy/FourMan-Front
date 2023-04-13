import {



   // 상품 관련
   REQUEST_PRODUCT_LIST_TO_SPRING,
   REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,
   REQUEST_ALL_PRODUCT_TO_SPRING,

   //댓글 관련
   REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING,

   //주문 관련
   REQUEST_ORDER_INFORMATIONS_TO_SPRING,

   //공지사항 게시판 관련
   REQUEST_NOTICE_BOARD_LIST_TO_SPRING,
   REQUEST_NOTICE_BOARD_TO_SPRING,

   //나의게시판 관련
   REQUEST_MY_FREE_BOARD_LIST_TO_SPRING,

   //나의 질문게시판 관련
   REQUEST_MY_QUESTION_BOARD_LIST_TO_SPRING,

   //나의 리뷰게시판 관련
   REQUEST_MY_REVIEW_BOARD_LIST_TO_SPRING,


} from './mutation-types'

export default {


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
   //댓글 관련
   [REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING] (state, passingData) {
      state.comments = passingData
   },

   //주문 관련
   [REQUEST_ORDER_INFORMATIONS_TO_SPRING](state, passingData) {
      state.orderInformations = passingData
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

   //나의 질문 게시판 관련
   [REQUEST_MY_QUESTION_BOARD_LIST_TO_SPRING] (state, passingData) {
      state.myQuestionBoards = passingData
   },

   //나의 리뷰게시판 관련
   [REQUEST_MY_REVIEW_BOARD_LIST_TO_SPRING] (state, passingData) {
      state.myReviewBoards = passingData
   },


}