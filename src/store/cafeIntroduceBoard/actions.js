import {
        //카페소개 보드 관련
        REQUEST_CAFE_LIST_TO_SPRING,
        REQUEST_CAFE_NUM_TO_SPRING,
        REQUEST_CAFE_DETAIL_TO_SPRING,
    

} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {


     //카페소개보드 관련
     requestCreateCafeToSpring({},formData) {
        console.log(" requestCreateCafeToSpring() 작동")
          axiosInst.post("/cafe/register", formData)
          .then((res) => {
            alert(res.data);
          })
          .catch((res) => {
            alert(res.message);
          });
    },

     requestCafeListToSpring({commit}) {
        console.log("requestCafeListToSpring() 작동")
        return axiosInst.get(`/cafe/list`)
            .then((res) => {
                commit(REQUEST_CAFE_LIST_TO_SPRING, res.data)
                console.log("res.data : " + res.data)
            })
            .catch((error) => {
                alert(error)
            })
    },
    requestCafeNumToSpring({commit}) {
        console.log("requestCafeNumToSpring() 작동")
        return axiosInst.post(`/cafe/check-code/${ JSON.parse(localStorage.getItem('userInfo')).code}`)
        .then((res)=>{
            console.log("성공res.data:",res.data)
            commit(REQUEST_CAFE_NUM_TO_SPRING,res.data)
        })
        .catch((res)=>{
          console.log("실패res.data:",res.data)
          alert("ERROR")
        })
    },
    requestCafeDetailToSpring({commit},cafeId) {
        console.log("requestCafeDetailToSpring() 작동")
        return axiosInst.get(`/cafe/detail/${cafeId}`)
            .then((res) => {
                commit(REQUEST_CAFE_DETAIL_TO_SPRING, res.data)
                console.log("res.data : " + res.data)
            })
            .catch((error) => {
                alert(error)
            })
    },



}