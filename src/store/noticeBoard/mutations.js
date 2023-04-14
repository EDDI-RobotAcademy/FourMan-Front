import {
   //공지사항 게시판 관련
   REQUEST_NOTICE_BOARD_LIST_TO_SPRING,
   REQUEST_NOTICE_BOARD_TO_SPRING,
 } from './mutation-types'

 export default {


   //공지사항 게시판 관련
     [REQUEST_NOTICE_BOARD_LIST_TO_SPRING] (state, passingData) {
     state.noticeBoards = passingData
     },
     [REQUEST_NOTICE_BOARD_TO_SPRING] (state, passingData) {
          state.noticeBoard = passingData
     },
  }
