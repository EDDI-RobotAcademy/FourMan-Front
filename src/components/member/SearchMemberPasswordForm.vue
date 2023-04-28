<template>
  <div class="grey lighten-5" style="font-family: 'Noto Sans KR', sans-serif">
    <v-container class="white" style="width: 1240px">
      <v-row justify="center">
        <v-col cols="auto" style="padding-bottom: 90px">
          <router-link to="/">
            <v-img
              :src="require('@/assets/logo.png')"
              width="120"
              class="mx-auto mb-6"
            ></v-img>
          </router-link>
          <!-- 이메일인증이 완료되지 않은 경우 -->
          <v-card width="460" v-if="!isPass">
            <v-card-text class="text-center px-12 py-16">
              <v-form @submit.prevent>
                <div class="text-h4 font-weight-black mb-10">비밀번호 찾기</div>

                <div class="d-flex">
                  <v-text-field
                    v-model="email"
                    label="이메일"
                    :rules="email_rule"
                    clearable
                    prepend-icon="mdi-email"
                    color="brown"
                    @keyup.enter="sendVerificationEmail"
                  />
                </div>

                <v-btn
                  block
                  x-large
                  rounded
                  class="mt-6 brown darken-2 white--text"
                  @click="sendVerificationEmail"
                  :disabled="false"
                  >인증 메일 보내기</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
          <!-- 이메일인증이 완료된경우 -->
          <v-card width="460" v-else-if="isPass">
            <v-card-text class="text-center px-12 py-16">
              <v-form @submit.prevent
                >>
                <div class="text-h4 font-weight-black mb-10">
                  비밀번호 재설정
                </div>

                <div class="d-flex">
                  <v-text-field
                    type="password"
                    v-model="password"
                    label="비밀번호"
                    :rules="password_rule"
                    clearable
                    prepend-icon="mdi-lock-outline"
                    :counter="15"
                    color="brown"
                  />
                </div>

                <div>
                  <v-text-field
                    type="password"
                    v-model="passwordConfirm"
                    label="비밀번호 확인"
                    :rules="password_confirm_rule"
                    clearable
                    prepend-icon="mdi-lock-check-outline"
                    :counter="15"
                    color="brown"
                    @keyup.enter="resetPw"
                  />
                </div>

                <v-btn
                  type="submit"
                  block
                  x-large
                  rounded
                  class="mt-6 brown darken-2 white--text"
                  @click="resetPw"
                  :disabled="false"
                  >비밀번호 변경</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
          <!-- 이메일 인증번호 입력 모달 창 추가 -->
          <v-dialog v-if="!isPass" v-model="codeCheckDialog" max-width="460">
            <v-card>
              <v-card-text class="text-center px-12 py-16">
                <v-form @submit.prevent
                  >
                  <div class="text-h4 font-weight-black mb-10">인증번호</div>
                  <div class="d-flex">
                    <v-text-field
                      v-model="verificationCode"
                      label="인증번호"
                      required
                      @keyup.enter="verifyEmail"
                    ></v-text-field>
                  </div>
                  <v-btn
                    block
                    x-large
                    rounded
                    class="mt-6 brown darken-2 white--text"
                    @click="verifyEmail"
                    :disabled="false"
                  >
                    인증 완료
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- 
          <v-card width="460" v-else-if="!isPass && codeCheck">
            <v-card-text class="text-center px-12 py-16">
              <v-form  @submit.prevent>>
                <div class="text-h4 font-weight-black mb-10">PW 찾기</div>

                <div class="d-flex">
                  <v-text-field
                    v-model="verificationCode"
                    label="인증번호"
                    required
                  ></v-text-field>
                </div>

                <v-btn
                  block
                  x-large
                  rounded
                  class="mt-6 brown darken-2 white--text"
                  @click="verifyEmail"
                  :disabled="false"
                  >인증 완료</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
const memberModule = "memberModule";
export default {
  name: "SearchMemberPasswordForm",
  data() {
    return {
      codeCheckDialog: false,
      verificationCode: "",
      email: "",
      phoneNumber: "",
      // codeCheck: false,
      isPass: false,
      password: "",
      passwordConfirm: "",
      email_rule: [
        (v) => !!v || "이메일을 입력해주세요.",
        (v) => {
          const replaceV = v.replace(/(\s*)/g, "");
          const pattern =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
          return pattern.test(replaceV) || "이메일 형식으로 입력해주세요";
        },
      ],
      password_rule: [
        (v) =>
          this.state === "ins"
            ? !!v || "패스워드는 필수 입력사항입니다."
            : true,
        (v) =>
          !(v && v.length > 20) || "패스워드는 20자를 초과 입력할 수 없습니다.",
      ],
      password_confirm_rule: [
        (v) =>
          this.state === "ins"
            ? !!v || "패스워드는 필수 입력사항입니다."
            : true,
        (v) =>
          !(v && v.length >= 20) ||
          "패스워드는 20자를 초과 입력할 수 없습니다.",
        (v) => v === this.password || "패스워드가 일치하지 않습니다.",
      ],
    };
  },
  methods: {
    ...mapActions(memberModule, [
      "requestEmailMatchToSpring",
      "requestRenewPWToSpring",
      "sendVerificationEmailToSpring",
      "verifyEmailToSpring",
    ]),
    async verifyEmail() {
      try {
        const { email, verificationCode } = this;
        const response = await this.verifyEmailToSpring({
          email,
          verificationCode,
        });
        console.log("response", response);
        console.log("response.status", response.status);
        if (response.status === 200) {
          alert("인증에 성공하였습니다.");
          this.isPass = true;
        } else {
          alert("인증에 실패하였습니다.");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert(error.response.data);
        } else {
          alert("??오류가 발생했습니다.");
        }
        console.error(error);
      }
    },
    async sendVerificationEmail() {
      const existId = await this.findAccountEmail();
      console.log("existId:", existId);
      if (existId) {
        try {
          const { email } = this;
          console.log("email", email);
          const response = await this.sendVerificationEmailToSpring(email);
          console.log("여기까진오나?");
          if (response.status === 200) {
            alert("인증 이메일이 전송되었습니다.");
            // this.codeCheck = true;
            this.codeCheckDialog = true;
          } else {
            alert("이메일 전송에 실패하였습니다.");
          }
        } catch (error) {
          console.error(error);
          alert("오류2가 발생했습니다.");
        }
      }
    },

    async findAccountEmail() {
      //PW찾기 시스템
      const { email } = this;
      const res = await this.requestEmailMatchToSpring({ email });
      console.log("res", res);
      console.log("res,data", res.data);
      if (res.data) {
        //res.data가 true면 //해당아이디가 존재할경우
        console.log("res.data: ", res.data);
        alert(
          "아이디가 존재합니다. 인증 메일을 보내겠습니다 잠시 기다려주세요!"
        );
        return true;
        // this.isPass = true;
      } else {
        alert("입력하신 정보로 가입된 정보가 없습니다.");
        // this.isPass = false;
        return false;
      }
    },
    resetPw() {
      //비밀번호 재설정하기.
      const { email, password } = this;
      const res = this.requestRenewPWToSpring({ email, password });
      if (res) {
        alert("비밀번호가 변경되었습니다.");
        this.$router.push("/sign-in");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap");
</style>