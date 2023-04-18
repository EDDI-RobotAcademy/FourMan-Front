import {
    //멤버 관련
    COMMIT_IS_AUTHENTICATED,


} from './mutation-types'

import axiosInst from '@/utility/axiosObject'
import router from '@/router';

export default {
    //멤버 관련
     async requestSignUpCheckEmailToSpring({ }, email) {
        return  axiosInst.post(`/member/check-email/${email}`)
       
    },
    async requestSignUpCheckNickNameToSpring({ }, nickName) {
        return  axiosInst.post(`/member/check-nickName/${nickName}`)
          
    },
    async requestSignUpCheckCafeCodeToSpring({ }, codeText) {
         return axiosInst.post(`/member/check-cafe/${codeText}`)
        
          
    },
    async  requestSignUpCheckManagerCodeToSpring({ }, codeText) {
        return axiosInst.post(`/member/check-manager/${codeText}`)
     
    },
    requestSignOutToSpring({ commit }, token) {
        return axiosInst.post("/member/logout", token)
            .then(() => {
                alert("로그아웃 완료");
                localStorage.removeItem("userInfo");
                commit(COMMIT_IS_AUTHENTICATED, false);
            })
    },



    requestSignUpToSpring({ }, payload) {
        const { email, password, nickName, birthdate, phoneNumber, authorityName, code, city, street, addressDetail, zipcode } = payload;
        return axiosInst.post("/member/sign-up", {
            email, password, city, nickName, birthdate, phoneNumber, authorityName, code, street, addressDetail, zipcode
        })
            .then((res) => {
                alert("회원 가입 완료!" + res)
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






}