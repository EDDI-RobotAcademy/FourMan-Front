import {



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



}