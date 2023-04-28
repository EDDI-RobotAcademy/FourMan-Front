import {
   // 상품 관련
   REQUEST_ALL_PRODUCT_TO_SPRING,

} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {
   
   // 상품 관련
   requestCreateProductToSpring ({}, payload) {
      const token =JSON.parse(localStorage.getItem('userInfo')).token
      console.log('payload: ' + payload)
      return axiosInst.post('/product/register', payload, 
         {
            headers: {
               'Authorization': `Basic ${token}`
            }
         }
      )
         .then((res) => {
            alert('게시물 등록 성공!')
            return res;
         })
         .catch(() => {
            alert('문제 발생!')
         })
   },
   requestAllOfProductToSpring ({ commit }, cafeId) {
      const token =JSON.parse(localStorage.getItem('userInfo')).token
      return axiosInst.get(`/product/all/${cafeId}`,
         {
            headers: {
               'Authorization': `Basic ${token}`
            }
         }
      )
         .then((res) => {
               commit(REQUEST_ALL_PRODUCT_TO_SPRING, res.data)
               console.log("allProduct: " + JSON.stringify(res.data))
         })
   },
   requestEditProductWithoutImageToSpring({}, payload) {
      const token =JSON.parse(localStorage.getItem('userInfo')).token
      console.log('payload: ' + payload)
      return axiosInst.post('/product/editProductWithoutImage', payload,
         {
            headers: {
               'Authorization': `Basic ${token}`
            }
         }
      )
         .then(() => {
               alert('게시물 수정 성공!')
         })
         .catch(() => {
               alert('문제 발생!')
         })
   },
   requestEditProductWithImageToSpring({}, payload) {
      const token =JSON.parse(localStorage.getItem('userInfo')).token
      console.log('payload: ' + payload)
      return axiosInst.post('/product/editProductWithImage', payload,
         {
            headers: {
               'Authorization': `Basic ${token}`
            }
         }
      )
         .then(() => {
               alert('게시물 수정 성공!')
         })
         .catch(() => {
               alert('문제 발생!')
         })
   },
   requestDeleteProductToSpring({}, productId) {
      const token =JSON.parse(localStorage.getItem('userInfo')).token
      return axiosInst.delete(`/product/${productId}`, 
         {
            headers: {
               'Authorization': `Basic ${token}`
            }
         }
      )
         .then(() => {
            alert("삭제 성공")
         })
         .catch(() => {
            alert("문제 발생!")
         })
      },

}