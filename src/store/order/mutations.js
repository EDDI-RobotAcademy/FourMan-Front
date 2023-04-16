import {
   //주문 관련
   REQUEST_ORDER_INFORMATIONS_TO_SPRING,

} from './mutation-types'

export default {

   //주문 관련
   [REQUEST_ORDER_INFORMATIONS_TO_SPRING](state, passingData) {
      state.orderInformations = passingData
   },

}