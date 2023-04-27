import {
    REQUEST_EVENT_LIST_TO_SPRING,
    REQUEST_EVENT_DETAIL_TO_SPRING,
    REQUEST_CAFE_BY_EVENT_SPRING,



} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {


    //이벤트 관련
    requestCreateEventToSpring({ }, formData) {
        const token =JSON.parse(localStorage.getItem('userInfo')).token
        console.log(" requestCreateEventToSpring() 작동")
        return axiosInst.post("/event/register", formData,{
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then((res) => {
                alert("이벤트가 등록되었습니다");
                console.log("eventId:",res.data)
                // 로컬 스토리지에서 userInfo 가져오기
            })
            .catch((res) => {
                alert(res.message);
            });
    },
    requestEventListToSpring({ commit }) {
        console.log("requestEventListToSpring() 작동")
        return axiosInst.get(`/event/list`)
            .then((res) => {
                commit(REQUEST_EVENT_LIST_TO_SPRING, res.data)
                console.log("res.data : " + res.data)
            })
            .catch((error) => {
                alert(error)
            })
    },

    requestEventDetailToSpring({ commit }, eventId) {
        console.log("requestEventDetailToSpring() 작동")
        return axiosInst.get(`/event/detail/${eventId}`)
            .then((res) => {
                console.log("1res.data : " + res.data)
                commit(REQUEST_EVENT_DETAIL_TO_SPRING, res.data)
                console.log("2res.data : " + res.data)
            })
            .catch((error) => {
                alert(error)
            })
    },
    requestModifyEventToSpring({}, {formData,eventId}) {
        const token =JSON.parse(localStorage.getItem('userInfo')).token
        console.log(" requestModifyEventToSpring() 작동")
        return axiosInst.put(`/event/modify/${eventId}`, formData,{
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then((res) => {
                alert("이벤트가 변경 되었습니다");
                console.log("eventId:",res.data)
            })
            .catch((res) => {
                alert(res.message);
            });
    },
    requestDeleteEventToSpring({},eventId){
        const token =JSON.parse(localStorage.getItem('userInfo')).token
        console.log(" requestDeleteEventToSpring() 작동")
        return axiosInst.delete(`/event/delete/${eventId}`,{
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then(() => {
                alert("이벤트가 삭제 되었습니다");
              
            })
            .catch(() => {
                alert();
            });
    },
    requestImageURLToSpring({},formData){
        return  axiosInst.post(`/event/api/upload/`,formData)
    },
    requestCafeByEventId({commit},eventId){
        console.log("requestCafeByEventId 작동 eventId:",eventId)
        return  axiosInst.get(`/event/getCafe/${eventId}`)
        .then((res) => {
            console.log("커밋전")
            commit(REQUEST_CAFE_BY_EVENT_SPRING, res.data)
            console.log("커밋후")
        })
        .catch((error) => {
            alert(error)
        })
    },
    requestMyCafeEventListToSpring({ commit },cafeId) {
        const token =JSON.parse(localStorage.getItem('userInfo')).token
        console.log("requestMyCafeEventListToSpring 작동")
        return axiosInst.get(`/event/mylist/${cafeId}`,{
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then((res) => {
                commit(REQUEST_EVENT_LIST_TO_SPRING, res.data)
                console.log("res.data : " + res.data)
            })
            .catch((error) => {
                alert(error)
            })
    },
    
    



}