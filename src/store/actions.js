import {

   // 상품 관련
   REQUEST_PRODUCT_LIST_TO_SPRING,
   REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,
   REQUEST_ALL_PRODUCT_TO_SPRING,

   //주문 관련
   REQUEST_ORDER_INFORMATIONS_TO_SPRING,

} from './mutation-types'

import axios from 'axios'

export default {




   // 상품 관련
   requestCreateProductToSpring ({}, payload) {
      console.log('payload: ' + payload)
      return axios.post('http://localhost:8888/product/register', payload )
          .then((res) => {
              alert('게시물 등록 성공!')
              return res;
          })
          .catch(() => {
              alert('문제 발생!')
          })
   },
   requestProductListToSpring({ commit }) {
      return axios.get('http://localhost:8888/product/list')
      .then((res) => {
         commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data)
         console.log('productList: ' + JSON.stringify(res.data))
      })
   },
   requestProductImageListToSpring({ commit }) {
      return axios.get('http://localhost:8888/product/imageList')
      .then((res) => {
         commit(REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING, res.data)
         console.log('imageList: ' + JSON.stringify(res.data))
         })
   },
   requestAllOfProductToSpring ({ commit }) {
    return axios.get('http://localhost:8888/product/all')
        .then((res) => {
            commit(REQUEST_ALL_PRODUCT_TO_SPRING, res.data)
            console.log("allProduct: " + JSON.stringify(res.data))
        })
   },
   requestEditProductWithoutImageToSpring({}, payload) {
        console.log('payload: ' + payload)
        return axios.post('http://localhost:8888/product/editProductWithoutImage', payload )
            .then(() => {
                alert('게시물 수정 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
   },
   requestEditProductWithImageToSpring({}, payload) {
        console.log('payload: ' + payload)
        return axios.post('http://localhost:8888/product/editProductWithImage', payload )
            .then(() => {
                alert('게시물 수정 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
   },
   requestDeleteProductToSpring({}, productId) {
    return axios.delete(`http://localhost:8888/product/${productId}`)
       .then(() => {
          alert("삭제 성공")
       })
       .catch(() => {
          alert("문제 발생!")
       })
},


    //주문 관련
    requestCreateOrderInformationsToSpring({}, payload) {
        console.log('payload: ' + payload)
        return axios.post('http://localhost:8888/order/register', payload)
            .then(() => {
                alert("저장 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
}