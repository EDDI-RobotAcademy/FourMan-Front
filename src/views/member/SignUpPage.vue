<template>
  <v-container>
    <!-- 일반회원 회원가입 -->
    <div>
      <sign-up-form :memberType="memberType" @submit="onSubmit" />
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import SignUpForm from "@/components/member/SignUpForm";

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
  },
  mounted() {
    if (!this.memberType) {
      this.$router.push({ name: "SignUpChoicePage" });
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