import {
    REQUEST_EVENT_LIST_TO_SPRING,
    REQUEST_EVENT_DETAIL_TO_SPRING,
    REQUEST_CAFE_BY_EVENT_SPRING,



} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {


    //이벤트 관련
    requestCreateEventToSpring({ }, formData) {
        console.log(" requestCreateEventToSpring() 작동")
        return axiosInst.post("/event/register", formData)
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
        console.log(" requestModifyEventToSpring() 작동")
        return axiosInst.put(`/event/modify/${eventId}`, formData)
            .then((res) => {
                alert("이벤트가 변경 되었습니다");
                console.log("eventId:",res.data)
            })
            .catch((res) => {
                alert(res.message);
            });
    },
    requestDeleteEventToSpring({},eventId){
        console.log(" requestDeleteEventToSpring() 작동")
        return axiosInst.delete(`/event/delete/${eventId}`)
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
        console.log("requestMyCafeEventListToSpring 작동")
        return axiosInst.get(`/event/mylist/${cafeId}`)
            .then((res) => {
                commit(REQUEST_EVENT_LIST_TO_SPRING, res.data)
                console.log("res.data : " + res.data)
            })
            .catch((error) => {
                alert(error)
            })
    },
    
    



}