import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/reviewBoard/reviewBoardStates"
import actions from "@/store/reviewBoard/actions"
import mutations from "@/store/reviewBoard/mutations"

Vue.use(Vuex)

const reviewBoardModule={
    namespaced:true,
    state,
    actions,
    mutations,
}
export default reviewBoardModule