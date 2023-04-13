import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/noticeBoard/noticeBoardStates"
import actions from "@/store/noticeBoard/actions"
import mutations from "@/store/noticeBoard/mutations"


Vue.use(Vuex)

const noticeBoardModule={
    namespaced:true,
    state,
    actions,
    mutations,
}
export default noticeBoardModule