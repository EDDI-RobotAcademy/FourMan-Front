import {
   // 마이페이지 내 정보 관련
   REQUEST_MY_INFO_TO_SPRING,

   //나의 게시판 관련
   REQUEST_MY_FREE_BOARD_LIST_TO_SPRING,

   //나의 질문게시판 관련
   REQUEST_MY_QUESTION_BOARD_LIST_TO_SPRING,

   //나의 리뷰게시판 관련
   REQUEST_MY_REVIEW_BOARD_LIST_TO_SPRING,

   //관리자 마이페이지 회원관리 관련
   REQUEST_MEMBER_INFO_LIST_TO_SPRING,

   //관리자 마이페이지 카페관리 관련
   REQUEST_CAFE_INFO_LIST_TO_SPRING,

   // 카페운영자 카페관리 관련
   REQUEST_MY_CAFE_INFO_TO_SPRING,

   // 사이드바 내 정보 관련
   REQUEST_MY_INFO_FOR_SIDE_BAR_TO_SPRING,

   REQUEST_POINT_DETAILS_LIST_TO_SPRING,
   REQUEST_POINT_DETAILS_TO_SPRING
} from './mutation-types'

import axiosInst from '@/utility/axiosObject'
import router from '@/router'
import store from '..'
import { COMMIT_IS_AUTHENTICATED } from '@/store/member/mutation-types';

export default {
   // 마이페이지 내 정보 관련
   requestMyInfoToSpring({ commit }, memberId) {
        const token =JSON.parse(localStorage.getItem('userInfo')).token
        console.log('requestMyInfoToSpring 작동')
        return axiosInst.get(`/my-page/${memberId}`
        , {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
        .then((res) => {
            commit(REQUEST_MY_INFO_TO_SPRING, res.data)
            console.log(JSON.stringify(res))
        })
    },
    requestMemberInfoModifyToSpring ({}, payload) {
        const { memberId, nickName, birthdate, phoneNumber, city, street, addressDetail, zipcode } = payload
        const token =JSON.parse(localStorage.getItem('userInfo')).token

        return axiosInst.put(`/my-page/member-info-modify/${memberId}`,
            { nickName, birthdate, phoneNumber, city, street, addressDetail, zipcode }
            , {
                headers: {
                    'Authorization': `Basic ${token}`
                }
            })
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
        const token =JSON.parse(localStorage.getItem('userInfo')).token

        return axiosInst.delete(`/my-page/withdrawal/${memberId}`
            , {
                headers: {
                    'Authorization': `Basic ${token}`
                }
            })
            .then(() => {
                alert("탈퇴 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    async requestPasswordCheckToSpring({}, payload) {
        const { email, password } = payload
        return axiosInst
            .post("/member/sign-in", { email, password })
            .then((res) => {
              if (res.data) {//토큰이오면
               console.log('로그인 성공')
               return true
              } else {
                alert("비밀번호가 틀렸습니다.");
                return false
              }
            })
            .catch((res) => {
               alert("비밀번호가 틀렸습니다.");
                console.log("로그인실패");
                return false
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
    requestLogoutToSpring({ commit }, payload) {
        const { token } = payload

        return axiosInst
        .post("/member/logout", token) //토큰을 보냄
        .then(() => {
           localStorage.removeItem("userInfo"); //로컬스토리지에서 제거
           store.commit(`memberModule/${COMMIT_IS_AUTHENTICATED}`, false);
        });
    },
    // 사이드바 관련
    requestMyInfoForSideBarToSpring({ commit }, memberId) {
        console.log('requestMyInfoForSideBarToSpring 작동')
        return axiosInst.get(`/my-page/side-bar/${memberId}`)
        .then((res) => {
            commit(REQUEST_MY_INFO_FOR_SIDE_BAR_TO_SPRING, res.data)
            console.log(JSON.stringify(res))
        })
    },
        //나의 게시판 관련
        requestMyFreeBoardListToSpring({ commit }, memberId) {
            console.log('requestMyFreeBoardListToSpring 작동')
            return axiosInst.get(`/free-board/myPage/${memberId}`)
            .then((res) => {
                commit(REQUEST_MY_FREE_BOARD_LIST_TO_SPRING, res.data)
                console.log('내가 쓴 게시물 res.data' + res.data)
            })
        },

        //나의 질문게시판 관련

        requestMyQuestionBoardListToSpring({ commit }, memberId) {
            console.log('requestMyQuestionBoardListToSpring 작동')
            return axiosInst.get(`/question-board/myPage/${memberId}`)
            .then((res) => {
                commit(REQUEST_MY_QUESTION_BOARD_LIST_TO_SPRING, res.data)
                console.log('내가 쓴 게시물 res.data' + res.data)
            })
        },

        //나의 리뷰게시판 관련
        requestMyReviewBoardListToSpring({ commit }, memberId) {
            console.log('requestMyReviewBoardListToSpring 작동')
            return axiosInst.get(`/review-board/myPage/${memberId}`)
            .then((res) => {
                commit(REQUEST_MY_REVIEW_BOARD_LIST_TO_SPRING, res.data)
                console.log('내가 쓴 게시물 res.data' + res.data)
            })
        },

        //관리자 마이페이지 회원관리 관련
        requestMemberInfoListToSpring ({ commit }) {
            const token =JSON.parse(localStorage.getItem('userInfo')).token
            return axiosInst.get('/my-page/member-list'
                , {
                    headers: {
                        'Authorization': `Basic ${token}`
                    }
                })
                .then((res) => {
                    commit(REQUEST_MEMBER_INFO_LIST_TO_SPRING, res.data)
                })
        },
        //관리자 마이페이지 카페관리 관련
        requestCafeInfoListToSpring ({ commit }) {
            const token =JSON.parse(localStorage.getItem('userInfo')).token
            return axiosInst.get('/my-page/cafe-list', {
                    headers: {
                        'Authorization': `Basic ${token}`
                    }
                })
                .then((res) => {
                    commit(REQUEST_CAFE_INFO_LIST_TO_SPRING, res.data)
                })
        },
        requestMyCafeInfoToSpring ({ commit }, { cafeId }) {
            const token =JSON.parse(localStorage.getItem('userInfo')).token
            return axiosInst.get(`/my-page/my-cafe-info/${ cafeId }`
                , {
                    headers: {
                        'Authorization': `Basic ${token}`
                    }
                })
                .then((res) => {
                    commit(REQUEST_MY_CAFE_INFO_TO_SPRING, res.data)
                })
                .catch(() => {
                    alert('등록된 카페가 없습니다.')
                    router.push({ name: 'MemberMyPage'})
                })
        },
        // requestCafeInfoModifyToSpring({}, payload) {
        //     const { cafeId, cafeAddress, cafeTel, startTime, endTime, subTitle, description } = payload
    
        //     return axiosInst.put(`/my-page/cafe-info-modify/${cafeId}`,
        //         { cafeId, cafeAddress, cafeTel, startTime, endTime, subTitle, description })
        //         .then((res) => {
        //             alert("수정 성공")
        //         })
        //         .catch(() => {
        //             alert("문제 발생!")
        //         })
        // },
        async requestSignUpCheckNickNameToSpring({ }, nickName) {
            return  axiosInst.post(`/member/check-nickName/${nickName}`)
        },
        requestAddPointToSpring({ }, payload) {
            const {memberId, point, history} = payload
            return  axiosInst.put(`/my-page/add-point/${memberId}`,
            { point, history })
            .then((res) => {
                alert(point + "포인트가 지급되었습니다.")
            })
            .catch(() => {
                alert("문제 발생!")
            })
        },
        requestPointDetailsListToSpring({ commit }) {
            return axiosInst.get('/my-page/point-details-list')
                .then((res) => {
                    commit(REQUEST_POINT_DETAILS_LIST_TO_SPRING, res.data)
                })
        },
        requestPointDetailsToSpring({ commit }, memberId) {
            return axiosInst.get(`/my-page/point-details/${memberId}`)
                .then((res) => {
                    commit(REQUEST_POINT_DETAILS_TO_SPRING, res.data)
                })
        },
}