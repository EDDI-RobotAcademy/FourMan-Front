import {
    //예약관련
    REQUEST_CAFE_SEAT_TO_SPRING,

} from './mutation-types'

// import axios from 'axios'
import axiosInst from '@/utility/axiosObject'
export default {

    //예약 관련

    requestCreateCafeSeatToSpring({},payload) {
        console.log("requestCreateCafeSeatToSpring 작동")
        return axiosInst.post("/reservation/register", payload)
        .then((res) => {
          alert("예약완료되었습니다.");
        })
        .catch((res) => {
          alert(res.message);
        });

    },

    requestCafeSeatToSpring({commit},payload) {
        console.log("requestCafeSeatToSpring 작동")
        const {cafeId,time}=payload
        return axiosInst.get(`/reservation/cafe/${cafeId}/time/${time}`)
            .then((res) => {
                commit(REQUEST_CAFE_SEAT_TO_SPRING, res.data)
                console.log(" res.data.seatResponse: " + res.data.seatResponse)
                console.log(" res.data.tableResponse: " + res.data.tableResponse)
            })
            .catch((error) => {
                alert(error)
            })
    },
    requestDeleteCafeSeatToSpring({}) {
        console.log("requestDeleteCafeSeatToSpring 작동")
        return axiosInst.delete(`/reservation/seats/delete`)
            .then(() => {
                alert("좌석 초기화 성공")
            })
            .catch(() => {
                alert("삭제실패");
            })
    },


}