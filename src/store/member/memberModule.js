import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/member/memberStates"
import actions from "@/store/member/actions"
import mutations from "@/store/member/mutations"
// import getters from "@/store/member/getters"

Vue.use(Vuex)

const memberModule={
    namespaced:true,
    state,
    actions,
    mutations,
}
export default memberModule