<template>
  <div>
    <login-form @submit="onSubmit"></login-form>
  </div>
</template>

<script>
import LoginForm from "@/components/member/SignInForm.vue";
import Vue from "vue";
import axios from "axios";
import cookies from "vue-cookies";
Vue.use(cookies);
export default {
  name: "SignInPage",
  components: {
    LoginForm,
  },
  data() {
    return {
      isLogin: false,
    };
  },
  mounted() {
    
    if (this.$store.state.isAuthenticated != false) {//로그인상태이면
      this.isLogin = true;//isLogin은 디버깅용으로 작성해놓은거다.
    } else {//로그인상태가 아니면 
      this.isLogin = false;
    }
  },
  methods: {
    onSubmit(payload) {//{ email, password }
      if (!this.isLogin) {//로그인상태가 아니면
        const { email, password } = payload;
        axios
            .post("http://localhost:8888/member/sign-in", { email, password })
            .then((res) => {
              if (res.data) {//토큰이오면
                alert("로그인 성공!");
                console.log("res.data: ", res.data)
                this.$store.state.isAuthenticated = true;
                this.$cookies.set("user", res.data, 3600);//30분
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                this.isLogin = true;
                this.$router.push("/");
              } else {
                alert("아이디 혹은 비밀번호가 존재하지 않거나 틀렸습니다.");
              }
            })
            .catch((res) => {
               alert("아이디 혹은 비밀번호가 존재하지 않거나 틀렸습니다.");
                console.log("로그인실패");
                console.log(res.response.data.message);
            });
      } else { //로그인상태이면
        alert("이미 로그인이 되어 있습니다!");
      }
    },
  },
};
</script>

<style scoped>
</style>