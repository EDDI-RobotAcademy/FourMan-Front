import {
   REQUEST_QUESTION_BOARD_LIST_TO_SPRING,
   REQUEST_QUESTION_BOARD_TO_SPRING,

   //게시물 검색 관련
   REQUEST_SEARCH_BOARD_TO_SPRING,

   //댓글 관련
   REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING,

   //조회수
   REQUEST_QUESTION_BOARD_VIEW_CNT_INCREASE_TO_SPRING,
 } from './mutation-types'

 export default {

      //질문게시판 관련
     [REQUEST_QUESTION_BOARD_LIST_TO_SPRING] (state, passingData) {
          state.questionBoards = passingData
     },

     [REQUEST_QUESTION_BOARD_TO_SPRING] (state, passingData) {
          state.questionBoard = passingData
     },

     //게시물 검색 관련
     [REQUEST_SEARCH_BOARD_TO_SPRING] (state, passingData) {
           state.searchBoards = passingData
     },
     //댓글 관련
     [REQUEST_QUESTION_BOARD_COMMENT_LIST_TO_SPRING] (state, passingData) {
           state.comments = passingData
     },
     //조회수
     [REQUEST_QUESTION_BOARD_VIEW_CNT_INCREASE_TO_SPRING] (state, passingData) {
          state.questionBoard.viewCnt = passingData
     }


  }
