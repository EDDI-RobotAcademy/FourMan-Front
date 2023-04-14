import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/myPage/myPageStates"
import actions from "@/store/myPage/actions"
import mutations from "@/store/myPage/mutations"

Vue.use(Vuex)

const myPageModule={
    namespaced:true,
    state,
    actions,
    mutations,
}
export default myPageModule