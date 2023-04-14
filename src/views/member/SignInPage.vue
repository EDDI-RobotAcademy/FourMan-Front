<template>
  <div>
    <login-form @submit="onSubmit"></login-form>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
const memberModule= 'memberModule'
import LoginForm from "@/components/member/SignInForm.vue";
import Vue from "vue";
import cookies from "vue-cookies";
Vue.use(cookies);
export default {
  name: "SignInPage",
  components: {
    LoginForm,
  },
  data() {
    return {
      // isLogin: false,
    };
  },
  mounted() {
    
    // if (this.$store.state.isAuthenticated != false) {//로그인상태이면
    //   this.isLogin = true;//isLogin은 디버깅용으로 작성해놓은거다.
    // } else {//로그인상태가 아니면 
    //   this.isLogin = false;
    // }
  },
   computed: {
    ...mapState(memberModule,[
      'isAuthenticated'
    ]),
  },
  methods: {
    ...mapActions(memberModule,['requestMemberSignInToSpring']),

    async onSubmit(payload) {//{ email, password }
      if (!this.isAuthenticated) {//로그인상태가 아니면
        await this.requestMemberSignInToSpring(payload)
        await this.$router.push({name:'MainPage'});

      } else { //로그인상태이면
        alert("이미 로그인이 되어 있습니다!");
      }
    },
  },
};
</script>

<style scoped>
</style>