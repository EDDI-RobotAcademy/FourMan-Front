import {
   // 상품 관련
   REQUEST_PRODUCT_LIST_TO_SPRING,
   REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,
   // 보드 관련
   REQUEST_FREE_BOARD_LIST_TO_SPRING,
   REQUEST_FREE_BOARD_TO_SPRING,

   //질문게시판 관련
   REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
   REQUEST_QUESTION_BOARD_TO_SPRING
} from './mutation-types'

export default {
   // 상품 관련
   [REQUEST_PRODUCT_LIST_TO_SPRING](state, passingData) {
      state.products = passingData
   },
   [REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING](state, passingData) {
      state.productImages = passingData
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
   }
}