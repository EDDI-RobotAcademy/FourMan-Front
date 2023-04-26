import {
   COMMIT_IS_AUTHENTICATED,
 } from './mutation-types'
 
 export default {

   //멤버 관련
   [COMMIT_IS_AUTHENTICATED](state, passingData) {
      state.isAuthenticated = passingData;
   },
   setMember(state, member) {
    state.member = member;
  },

 }