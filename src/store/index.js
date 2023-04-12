import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/states"
import actions from "@/store/actions"
import mutations from "@/store/mutations"
import getters from "@/store/getters"

import reservationModule from "@/store/reservation/reservationModule.js"
import cafeIntroduceBoardModule from "@/store/cafeIntroduceBoard/cafeIntroduceBoardModule.js"
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    reservationModule : reservationModule,
    cafeIntroduceBoardModule :cafeIntroduceBoardModule,

  },
  state,
  actions,
  mutations,
  getters,
})
