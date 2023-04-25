import {
   //주문 관련
   REQUEST_ORDER_INFORMATIONS_TO_SPRING,
   UPDATE_IS_ORDER_PACKING,
   REQUEST_HOLD_POINT_TO_SPRING,

} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {
   
   //주문 관련
   requestCreateOrderInformationsToSpring({}, payload) {
      console.log('payload: ' + payload)
      return axiosInst.post('/order/register', payload)
         .then(() => {
            alert("저장 성공")
         })
         .catch(() => {
            alert("문제 발생!")
         })
   },
   requestOrderInformationsToSpring({ commit }, memberId) {
      return axiosInst.get(`/order/orderList/${memberId}`)
      .then((res) => {
         commit(REQUEST_ORDER_INFORMATIONS_TO_SPRING, res.data)
         console.log('orderInformations: ' + JSON.stringify(res.data))
      })
   },
   updateIsOrderPacking({ commit }, payload) {
      console.log('payload: ' + payload)
      commit(UPDATE_IS_ORDER_PACKING, payload)
   },
   requestHoldPointToSpring({ commit }, memberId) {
      return axiosInst.get(`/order/point/${memberId}`)
      .then((res) => {
         commit(REQUEST_HOLD_POINT_TO_SPRING, res.data)
         console.log('holdPoint: ' + JSON.stringify(res.data))
      })
   },
   requestCancelOrderToSpring({}, orderId) {
      return axiosInst.post(`/order/cancel/${orderId}`)
         .then(() => {
            alert("취소 성공")
         })
         .catch(() => {
            alert("문제 발생!")
         })
   }
}