import {
   // 마이페이지 내 정보 관련
   REQUEST_MY_INFO_TO_SPRING,

} from './mutation-types'

import axios from 'axios'

export default {
   // 마이페이지 내 정보 관련
   requestMyInfoToSpring({ commit }, memberId) {
        console.log('requestMyInfoToSpring 작동')
        return axios.get(`http://localhost:8888/my-info/${memberId}`)
        .then((res) => {
            commit(REQUEST_MY_INFO_TO_SPRING, res.data)
        })
    },
    requestMemberInfoModifyToSpring ({}, payload) {
        const { memberId, nickName, birthdate, phoneNumber, city, street, addressDetail, zipcode } = payload

        return axios.put(`http://localhost:8888/my-info/member-info-modify/${memberId}`,
            { nickName, birthdate, phoneNumber, city, street, addressDetail, zipcode })
            .then((res) => {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                alert("수정 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
}