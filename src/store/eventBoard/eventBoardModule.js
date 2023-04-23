import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/eventBoard/eventBoardStates"
import actions from "@/store/eventBoard/actions"
import mutations from "@/store/eventBoard/mutations"
import getters from "@/store/eventBoard/getters"

Vue.use(Vuex)

const eventBoardModule={
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}
export default eventBoardModule