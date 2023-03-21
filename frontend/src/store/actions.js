import {
   REQUEST_PRODUCT_LIST_TO_SPRING,
   
} from './mutation-types'

import axios from 'axios'

export default {
   
   reqProductListToSpring({ commit }) {
      return axios.get('http://localhost:8888/product/list')
         .then((res) => {
            commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data)
         })
   }
}