import {
   // 카페소개보드관련
   REQUEST_CAFE_LIST_TO_SPRING,
   REQUEST_CAFE_NUM_TO_SPRING,
   REQUEST_CAFE_DETAIL_TO_SPRING,
 } from './mutation-types'
 
 export default {

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
 }