import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/cafeIntroduceBoard/cafeIntroduceBoardStates"
import actions from "@/store/cafeIntroduceBoard/actions"
import mutations from "@/store/cafeIntroduceBoard/mutations"
// import getters from "@/store/cafeIntroduceBoard/getters"

Vue.use(Vuex)

const cafeIntroduceBoardModule={
    namespaced:true,
    state,
    actions,
    mutations,
}
export default cafeIntroduceBoardModule