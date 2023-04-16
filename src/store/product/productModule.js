import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/product/productStates"
import actions from "@/store/product/actions"
import mutations from "@/store/product/mutations"

Vue.use(Vuex)

const productModule = {
    namespaced:true,
    state,
    actions,
    mutations,
}
export default productModule