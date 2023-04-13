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
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    //영진
    reservationModule : reservationModule,
    cafeIntroduceBoardModule :cafeIntroduceBoardModule,

    //명진
    freeBoardModule: freeBoardModule,
    reviewBoardModule: reviewBoardModule,
    myPageModule: myPageModule,
  },
  state,
  actions,
  mutations,
  getters,
})
