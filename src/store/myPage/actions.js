import {
   // 마이페이지 내 정보 관련
   REQUEST_MY_INFO_TO_SPRING,

} from './mutation-types'

import axiosInst from '@/utility/axiosObject'
import router from '@/router'
import store from '..'

export default {
   // 마이페이지 내 정보 관련
   requestMyInfoToSpring({ commit }, memberId) {
        console.log('requestMyInfoToSpring 작동')
        return axiosInst.get(`/my-info/${memberId}`)
        .then((res) => {
            commit(REQUEST_MY_INFO_TO_SPRING, res.data)
        })
    },
    requestMemberInfoModifyToSpring ({}, payload) {
        const { memberId, nickName, birthdate, phoneNumber, city, street, addressDetail, zipcode } = payload

        return axiosInst.put(`/my-info/member-info-modify/${memberId}`,
            { nickName, birthdate, phoneNumber, city, street, addressDetail, zipcode })
            .then((res) => {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                alert("수정 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    requestWithdrawalToSpring ({}, payload) {
        const { memberId } = payload
        return axiosInst.delete(`/my-info/withdrawal/${memberId}`)
            .then(() => {
                alert("탈퇴 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    requestPasswordCheckToSpring({}, payload) {
        const { email, password } = payload
        return axiosInst
            .post("/member/sign-in", { email, password })
            .then((res) => {
              if (res.data) {//토큰이오면
               console.log('로그인 성공')
               router.push({ name: 'MemberMyInfoModifyPage'})
              } else {
                alert("비밀번호가 틀렸습니다.");
              }
            })
            .catch((res) => {
               alert("비밀번호가 틀렸습니다.");
                console.log("로그인실패");
            });
    },
    requestApplyNewPasswordToSpring({}, payload) {
        const { email, password } = payload

        return axiosInst
        .post("/member/applyNewPassword/", {
           email, password,
        })
        .then(() => {
           alert("비밀번호가 변경되었습니다 다시 로그인 해주세요.");
        })
    },
    requestLogoutToSpring({}, payload) {
        const { token } = payload

        return axiosInst
        .post("/member/logout", token) //토큰을 보냄
        .then(() => {
           localStorage.removeItem("userInfo"); //로컬스토리지에서 제거
           store.state.isAuthenticated = false;
           router.push({ name: 'SignInPage'})
        });
    }
}