import {
   //주문 관련
   REQUEST_ORDER_INFORMATIONS_TO_SPRING,
   UPDATE_IS_ORDER_PACKING,

} from './mutation-types'

export default {

   //주문 관련
   [REQUEST_ORDER_INFORMATIONS_TO_SPRING](state, passingData) {
      state.orderInformations = passingData
   },
   [UPDATE_IS_ORDER_PACKING](state, passingData) {
      state.isOrderPacking = passingData
   },

}