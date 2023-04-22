import {
    REQUEST_EVENT_LIST_TO_SPRING,



} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {


    //이벤트 관련
    requestCreateEventToSpring({ }, formData) {
        console.log(" requestCreateEventToSpring() 작동")
        return axiosInst.post("/event/register", formData)
            .then((res) => {
                alert("이벤트가 등록되었습니다eventId:", res.data);
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



}