import {
   //주문 관련
   REQUEST_ORDER_INFORMATIONS_TO_SPRING,
   UPDATE_IS_ORDER_PACKING,
   REQUEST_HOLD_POINT_TO_SPRING,
   REQUEST_CAFE_ORDER_LIST_TO_SPRING,

} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {
   
   //주문 관련
   requestCreateOrderInformationsToSpring({}, payload) {
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      console.log('payload: ' + payload)
      return axiosInst.post('/order/register', payload,
         {
            headers: {
               'Authorization': `Basic ${token}`
            }
         }
      )
         .then(() => {
            alert("저장 성공")
         })
         .catch(() => {
            alert("문제 발생!")
         })
   },
   requestOrderInformationsToSpring({ commit }, memberId) {
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      return axiosInst.get(`/order/orderList/${memberId}`,
         {
            headers: {
               'Authorization': `Basic ${token}`
            }
         }
      )
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
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      return axiosInst.get(`/order/point/${memberId}`,
         {
            headers: {
               'Authorization': `Basic ${token}`
            }
         }
      )
      .then((res) => {
         commit(REQUEST_HOLD_POINT_TO_SPRING, res.data)
         console.log('holdPoint: ' + JSON.stringify(res.data))
      })
   },
   requestCancelOrderToSpring({}, cancelReservation) {
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      const{ orderId, reservationTime, seatNoList } = cancelReservation
      return axiosInst.post(`/order/cancel/${orderId}`, { reservationTime, seatNoList },
         {
            headers: {
               'Authorization': `Basic ${token}`
            }
         }
      )
         .then(() => {
            alert("취소 성공")
         })
         .catch(() => {
            alert("문제 발생!")
         })
   },
   requestCafeOrderListToSpring({ commit }, cafeId) {
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      return axiosInst.get(`/order/cafeOrderList/${cafeId}`,
         {
            headers: {
               'Authorization': `Basic ${token}`
            }
         }
      )
      .then((res) => {
         commit(REQUEST_CAFE_ORDER_LIST_TO_SPRING, res.data)
         console.log('cafeOrderInformations: ' + JSON.stringify(res.data))
      })
   },
   requestOrderIsReadySpring({}, orderId) {
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      return axiosInst.post(`/order/ready/${orderId}`, {},
         {
            headers: {
               'Authorization': `Basic ${token}`
            }
         }
      )
         .then(() => {
            alert("완료 처리되었습니다.")
         })
         .catch(() => {
            alert("문제 발생!")
         })
   },
}