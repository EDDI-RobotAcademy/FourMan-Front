<template>
  <v-container>
    <!-- 일반회원 회원가입 -->
    <div v-if="this.memberType === 'customer'">
      <sign-up-form :memberType="memberType" @submit="onSubmit" />
    </div>
    <div v-else>
      <!-- 카페사업자, 관리자 회원가입-->
      <sign-up-cafe-manager-form :memberType="memberType" @submit="onSubmit" />
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import SignUpForm from "@/components/member/SignUpForm";
import SignUpCafeManagerForm from "@/components/member/SignUpCafeManagerForm";

const memberModule = "memberModule";
export default {
  name: "SignUpPage",
  props: {
    memberType: {
      type: String,
      required: true,
    },
  },
  components: {
    SignUpForm,
    SignUpCafeManagerForm,
  },

  mounted: function () {
    console.log("this.memberType: ", this.memberType);
    if (this.memberType === undefined) {
      this.$router.push({
        name: "SignUpChoicePage",
      });
    }
  },
  methods: {
    ...mapActions(memberModule, ["requestSignUpToSpring"]),

    async onSubmit(payload) {
      await this.requestSignUpToSpring(payload);
    },
  },
};
</script>

<style scoped>
</style>