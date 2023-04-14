import {



   // 상품 관련
   REQUEST_PRODUCT_LIST_TO_SPRING,
   REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,
   REQUEST_ALL_PRODUCT_TO_SPRING,

   //주문 관련
   REQUEST_ORDER_INFORMATIONS_TO_SPRING,


} from './mutation-types'

export default {


   // 상품 관련
   [REQUEST_PRODUCT_LIST_TO_SPRING](state, passingData) {
      state.products = passingData
   },
   [REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING](state, passingData) {
      state.productImages = passingData
   },
   [REQUEST_ALL_PRODUCT_TO_SPRING](state, passingData) {
      state.allOfProducts = passingData
   },

   //주문 관련
   [REQUEST_ORDER_INFORMATIONS_TO_SPRING](state, passingData) {
      state.orderInformations = passingData
   },


}