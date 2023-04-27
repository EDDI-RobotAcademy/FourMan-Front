import {
    //멤버 관련
    COMMIT_IS_AUTHENTICATED,


} from './mutation-types'

import axiosInst from '@/utility/axiosObject'
import router from '@/router';

export default {
    //멤버 관련
    async requestSignUpCheckEmailToSpring({ }, email) {
        return axiosInst.post(`/member/check-email/${email}`)

    },
    async requestSignUpCheckNickNameToSpring({ }, nickName) {
        return axiosInst.post(`/member/check-nickName/${nickName}`)

    },
    async requestSignUpCheckCafeCodeToSpring({ }, codeText) {
        return axiosInst.post(`/member/check-cafe/${codeText}`)


    },
    async requestSignUpCheckManagerCodeToSpring({ }, codeText) {
        return axiosInst.post(`/member/check-manager/${codeText}`)

    },
    requestMemberToSpring({ commit }, token) {
        return axiosInst.post("/member/user-verification", token)
            .then((res) => {
                console.log("res", res);
                console.log("res.data", res.data);
                const member = res.data;
                commit('setMember', member);
                console.log("커밋작동");
                return res;
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    // 로그아웃 처리
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("cartItems");
                    commit(COMMIT_IS_AUTHENTICATED, false);
                    alert("로그인이 1시간이 경과하여 로그아웃처리 됩니다")
                    console.log("로그아웃 처리됩니다.");
                } else {
                    console.log("에러발생@@!!!!")
                    console.error("에러 발생@@:", error);
                }
                throw error;
            });
    },
    requestSignOutToSpring({ commit }, token) {
        return axiosInst.post("/member/logout", token)
            .then(() => {
                alert("로그아웃 완료");
                localStorage.removeItem("userInfo");
                localStorage.removeItem("cartItems");
                commit(COMMIT_IS_AUTHENTICATED, false);
            })
    },



    requestSignUpToSpring({ }, payload) {
        const { email, password, nickName, birthdate, phoneNumber, authorityName, code, city, street, addressDetail, zipcode } = payload;
        return axiosInst.post("/member/sign-up", {
            email, password, city, nickName, birthdate, phoneNumber, authorityName, code, street, addressDetail, zipcode
        })
            .then((res) => {
                if (authorityName == "MEMBER") {
                    alert("회원 가입 완료!" + res + "\n 회원 가입 이벤트로 1,000P 지급되었습니다!")
                } else {
                    alert("회원 가입 완료!" + res)
                }
                router.push("/sign-in")
            })
            .catch((res) => {
                alert(res.response.data.message)
            })

    },
    requestMemberSignInToSpring({ commit }, payload) {
        const { email, password } = payload;
        return axiosInst.post("/member/sign-in", { email, password })
            .then((res) => {
                if (res.data) {//토큰이오면
                    alert("로그인 성공!");
                    console.log("res.data: ", res.data)
                    commit(COMMIT_IS_AUTHENTICATED, true);
                    // this.$store.state.isAuthenticated = true;
                    // this.$cookies.set("user", res.data, 3600);//30분
                    localStorage.setItem("userInfo", JSON.stringify(res.data));
                    // this.isLogin = true;
                    router.push("/")
                } else {
                    alert("아이디 혹은 비밀번호가 존재하지 않거나 틀렸습니다.");
                }
            })
            .catch((res) => {
                alert("아이디 혹은 비밀번호가 존재하지 않거나 틀렸습니다.");
                console.log("로그인실패");
                console.log(res.response.data.message);
            });
    },
    sendFavoriteStatusToSpring({ }, payload) {
        const { cafeId, memberId, isFavorite } = payload
        return axiosInst.post("/member/favorites", { cafeId, memberId, isFavorite })
            .then((res) => {
                if (res.data) {
                    alert(res.data)
                }
            })
            .catch((res) => {
                alert(res.response.data.message)
            })
    },
    checkFavoriteStatus({ }, payload) {
        const { cafeId, memberId } = payload
        return axiosInst.get(`/member/favorites/${memberId}/${cafeId}`)


    }









}