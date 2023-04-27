import {
    //카페소개 보드 관련
    REQUEST_CAFE_LIST_TO_SPRING,
    REQUEST_CAFE_NUM_TO_SPRING,
    REQUEST_CAFE_DETAIL_TO_SPRING,


} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {


    //카페소개보드 관련
    requestCreateCafeToSpring({ }, formData) {
        const token =JSON.parse(localStorage.getItem('userInfo')).token
        console.log(" requestCreateCafeToSpring() 작동")
        return axiosInst.post("/cafe/register", formData, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then((res) => {
                alert("카페가 등록되었습니다cafeId:", res.data);
                // 로컬 스토리지에서 userInfo 가져오기
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                userInfo.cafeId = res.data;
                // 수정된 userInfo를 다시 로컬 스토리지에 저장
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
            })
            .catch((res) => {
                alert(res.message);
            });
    },

    requestCafeListToSpring({ commit }) {
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
    requestCafeNumToSpring({ commit }) {
        console.log("requestCafeNumToSpring() 작동")
        return axiosInst.post(`/cafe/check-code/${JSON.parse(localStorage.getItem('userInfo')).code}`)
            .then((res) => {
                console.log("성공res.data:", res.data)
                commit(REQUEST_CAFE_NUM_TO_SPRING, res.data)
            })
            .catch((res) => {
                console.log("실패res.data:", res.data)
                alert("ERROR")
            })
    },
    requestCafeDetailToSpring({ commit }, cafeId) {
        console.log("requestCafeDetailToSpring() 작동")
        return axiosInst.get(`/cafe/detail/${cafeId}`)
            .then((res) => {
                commit(REQUEST_CAFE_DETAIL_TO_SPRING, res.data)
                console.log("res.data!@~@ : " + res.data)
            })
            .catch((error) => {
                alert(error)
            })
    },

    requestModifyCafeToSpring({}, { formData, cafeId }) {
        const token =JSON.parse(localStorage.getItem('userInfo')).token
        console.log("requestCafeModifyToSpring() 작동")
        return axiosInst.put(`/cafe/modify/${cafeId}`,formData, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then((res) => {
                alert("카페가 변경 되었습니다");
                console.log("cafeId : " + res.data)
            })
            .catch((error) => {
                alert(error)
            })
    },
    requestDeleteCafeToSpring({},cafeId){
        const token =JSON.parse(localStorage.getItem('userInfo')).token
        console.log(" requestDeleteCafeToSpring() 작동")
        return axiosInst.delete(`/cafe/delete/${cafeId}`, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then(() => {
                alert("카페가 삭제 되었습니다");
              
            })
            .catch(() => {
                alert();
            });
    },
    async requestCafeRatingToSpring({ }, cafeName) {
        console.log("requestCafeRatingToSpring() 작동")
        return axiosInst.get(`/review-board/rating/${cafeName}`)
    },
    requestFavoriteCafeListToSpring({ commit },memberId) {
        const token =JSON.parse(localStorage.getItem('userInfo')).token
        console.log("requestFavoriteCafeListToSpring 작동")
        return axiosInst.get(`/cafe/list/${memberId}`,{
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then((res) => {
                commit(REQUEST_CAFE_LIST_TO_SPRING, res.data)
                console.log("res.data : " + res.data)
            })
            .catch((error) => {
                alert(error)
            })
    },



}