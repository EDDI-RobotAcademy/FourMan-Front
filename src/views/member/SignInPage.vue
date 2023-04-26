<template>
  <div>
    <login-form @submit="onSubmit"></login-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberModule = "memberModule";
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
    return {};
  },
  mounted() {},
  computed: {
    ...mapState(memberModule, ["isAuthenticated"]),
  },
  methods: {
    ...mapActions(memberModule, ["requestMemberSignInToSpring"]),

    onSubmit(payload) {
      //{ email, password }

      this.requestMemberSignInToSpring(payload);
    },
  },
};
</script>

<style scoped>
</style>