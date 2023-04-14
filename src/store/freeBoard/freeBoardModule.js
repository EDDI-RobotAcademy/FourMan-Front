import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/freeBoard/freeBoardStates"
import actions from "@/store/freeBoard/actions"
import mutations from "@/store/freeBoard/mutations"

Vue.use(Vuex)

const freeBoardModule={
    namespaced:true,
    state,
    actions,
    mutations,
}
export default freeBoardModule