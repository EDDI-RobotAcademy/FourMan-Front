import {
   // 상품 관련
   REQUEST_ALL_PRODUCT_TO_SPRING,

} from './mutation-types'

export default {

   // 상품 관련
   [REQUEST_ALL_PRODUCT_TO_SPRING](state, passingData) {
      state.allOfProducts = passingData
   },

}