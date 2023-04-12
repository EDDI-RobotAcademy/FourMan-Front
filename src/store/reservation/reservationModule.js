import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/reservation/reservationStates"
import actions from "@/store/reservation/actions"
import mutations from "@/store/reservation/mutations"
// import getters from "@/store/reservation/getters"

Vue.use(Vuex)

const reservationModule={
    namespaced:true,
    state,
    actions,
    mutations,
}
export default reservationModule