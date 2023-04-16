import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/states"
import actions from "@/store/actions"
import mutations from "@/store/mutations"
import getters from "@/store/getters"

//영진
import reservationModule from "@/store/reservation/reservationModule.js"
import cafeIntroduceBoardModule from "@/store/cafeIntroduceBoard/cafeIntroduceBoardModule.js"
import memberModule from "@/store/member/memberModule.js"

//명진
import freeBoardModule from '@/store/freeBoard/freeBoardModule.js'
import reviewBoardModule from '@/store/reviewBoard/reviewBoardModule.js'

import myPageModule from '@/store/myPage/myPageModule.js'

//현수
import questionBoardModule from './questionBoard/questionBoardModule'
import noticeBoardModule from './noticeBoard/noticeBoardModule'

//현우
import orderModule from './order/orderModule'
import productModule from './product/productModule'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{

    //영진
    reservationModule: reservationModule,
    cafeIntroduceBoardModule: cafeIntroduceBoardModule,
    memberModule: memberModule,

    //명진
    freeBoardModule: freeBoardModule,
    reviewBoardModule: reviewBoardModule,
    myPageModule: myPageModule,

    //현수
    questionBoardModule : questionBoardModule,
    noticeBoardModule : noticeBoardModule,

    //현우
    orderModule: orderModule,
    productModule: productModule,

  },
  state,
  actions,
  mutations,
  getters,
})
