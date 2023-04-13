import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/questionBoard/questionBoardStates"
import actions from "@/store/questionBoard/actions"
import mutations from "@/store/questionBoard/mutations"


Vue.use(Vuex)

const questionBoardModule={
    namespaced:true,
    state,
    actions,
    mutations,
}
export default questionBoardModule