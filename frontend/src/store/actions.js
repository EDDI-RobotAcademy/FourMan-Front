import {
   REQUEST_PRODUCT_LIST_TO_SPRING,
   
} from './mutation-types'

import axios from 'axios'

export default {
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
   reqProductListToSpring({ commit }) {
      return axios.get('http://localhost:8888/product/list')
         .then((res) => {
            commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data)
         })
   }
}