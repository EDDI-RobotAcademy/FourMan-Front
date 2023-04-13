import {
   REQUEST_REVIEW_BOARD_LIST_TO_SPRING,
   REQUEST_REVIEW_BOARD_TO_SPRING,
   REQUEST_REVIEW_BOARD_IMAGE_LIST_TO_SPRING,
 
 } from './mutation-types'
 
 export default {

   [REQUEST_REVIEW_BOARD_LIST_TO_SPRING] (state, passingData) {
      state.reviewBoards = passingData
   },
   [REQUEST_REVIEW_BOARD_TO_SPRING] (state, passingData) {
      state.reviewBoard = passingData
   },
   [REQUEST_REVIEW_BOARD_IMAGE_LIST_TO_SPRING] (state, passingData) {
      state.reviewBoardImages = passingData
   },
 }