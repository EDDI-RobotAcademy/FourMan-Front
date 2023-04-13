import {
   // 마이페이지 내 정보 관련
   REQUEST_MY_INFO_TO_SPRING,
 
 } from './mutation-types'
 
 export default {

   // 마이페이지 내 정보 관련
   [REQUEST_MY_INFO_TO_SPRING] (state, passingData) {
      state.myInfo = passingData
   },
 }