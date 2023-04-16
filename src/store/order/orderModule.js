import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/order/orderStates"
import actions from "@/store/order/actions"
import mutations from "@/store/order/mutations"


Vue.use(Vuex)

const orderModule = {
    namespaced:true,
    state,
    actions,
    mutations,
}
export default orderModule