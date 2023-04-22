import {
   // 이벤트
   REQUEST_EVENT_LIST_TO_SPRING,
   REQUEST_EVENT_DETAIL_TO_SPRING

} from './mutation-types'

export default {

   //이벤트
   [REQUEST_EVENT_LIST_TO_SPRING](state, passingData) {
      state.eventLists = passingData
   },
   [REQUEST_EVENT_DETAIL_TO_SPRING](state, passingData) {
      state.event = passingData
   },

}