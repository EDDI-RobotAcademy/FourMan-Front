import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/states"
import actions from "@/store/actions"
import mutations from "@/store/mutations"
import getters from "@/store/getters"

import reservationModule from "@/store/reservation/reservationModule.js"
import cafeIntroduceBoardModule from "@/store/cafeIntroduceBoard/cafeIntroduceBoardModule.js"

import freeBoardModule from '@/store/freeBoard/freeBoardModule.js'
import reviewBoardModule from '@/store/reviewBoard/reviewBoardModule.js'

import myPageModule from '@/store/myPage/myPageModule.js'
import questionBoardModule from './questionBoard/questionBoardModule'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    reservationModule : reservationModule,
    cafeIntroduceBoardModule :cafeIntroduceBoardModule,

    freeBoardModule: freeBoardModule,
    reviewBoardModule: reviewBoardModule,
    myPageModule: myPageModule,

    //현수
    questionBoardModule : questionBoardModule,
  },
  state,
  actions,
  mutations,
  getters,
})
