<template>
  <div class="grey lighten-5" style="font-family: Arial">
    <v-row justify="center">
      <v-col cols="auto" style="padding-bottom: 90px">
        <router-link to="/">
          <v-img
            :src="require('@/assets/logo.png')"
            width="100"
            class="mx-auto mb-6"
          />
        </router-link>
        <v-card width="500">
          <v-card-text class="text-center px-12 py-16">
            <v-form @submit.prevent="onSubmit" ref="form">
              <div class="text-h4 font-weight-black mb-10 brown--text">
                회원 가입
              </div>

              <div
                class="d-flex"
                v-if="memberType === 'cafe' || memberType === 'manager'"
              >
                <v-text-field
                  class="mt-3"
                  v-model="codeText"
                  label="카페 사업자/관리자 코드 입력해주세요"
                  :disabled="authorityPass"
                  required
                  color="black"
                />
                <v-btn
                  text
                  large
                  outlined
                  style="font-size: 13px; height: 55px"
                  class="mt-3 ml-5 mr-0 brown darken-2 white--text"
                  @click="checkCode"
                  :disabled="authorityPass"
                  >코드 확인
                </v-btn>
              </div>

              <div class="d-flex">
                <v-text-field
                  v-model="email"
                  label="이메일"
                  @change="emailValidation"
                  :rules="email_rule"
                  :disabled="emailPass"
                  required
                />
                <v-btn
                  text
                  large
                  outlined
                  style="font-size: 13px; height: 55px"
                  class="mt-0 ml-5 mr-0 brown darken-2 white--text"
                  @click="checkDuplicateEmail"
                  :disabled="emailPass"
                  >이메일 중복 확인
                </v-btn>
              </div>

              <div class="d-flex">
                <v-text-field
                  v-model="password"
                  label="비밀번호"
                  type="password"
                  :rules="password_rule"
                  :disabled="false"
                  required
                />
              </div>

              <div class="d-flex">
                <v-text-field
                  v-model="password_confirm"
                  label="비밀번호 확인"
                  type="password"
                  :rules="password_confirm_rule"
                  :disabled="false"
                  required
                />
                <!-- :diabled: 버튼활성화 비활성화 -->
              </div>

              <div class="d-flex">
                <v-text-field
                  v-model="nickName"
                  label="닉네임"
                  :disabled="nickNamePass"
                  :rules="nickName_rule"
                  required
                  color="black"
                />

                <v-btn
                  text
                  large
                  outlined
                  style="font-size: 13px; height: 55px"
                  class="mt-0 ml-5 mr-0 brown darken-2 white--text"
                  @click="checkDuplicateNickName"
                  :disabled="nickNamePass"
                  >닉네임 중복 확인
                </v-btn>
              </div>

              <div class="d-flex">
                <v-text-field
                  v-model="birthdate"
                  label="생년월일 (8자리)"
                  :disabled="false"
                  :rules="birthdate_rule"
                  required
                  color="black"
                />
              </div>

              <div class="d-flex">
                <v-text-field
                  v-model="phoneNumber"
                  label="전화번호 ('-'포함 11자리)"
                  :disabled="phonePass"
                  :rules="phoneNumber_rule"
                  required
                  color="black"
                />
                <v-btn
                  text
                  large
                  outlined
                  style="font-size: 13px; height: 55px"
                  class="mt-0 ml-5 mr-0 brown darken-2 white--text"
                  @click="sendVerificationPhone"
                  :disabled="phonePass"
                  >휴대폰 인증
                </v-btn>
              </div>
              <v-dialog v-model="codeCheckDialog" max-width="460">
                <v-card>
                  <v-card-text class="text-center px-12 py-16">
                    <v-form @submit.prevent>
                      <div class="text-h4 font-weight-black mb-10">
                        인증번호
                      </div>
                      <div class="d-flex">
                        <v-text-field
                          v-model="verificationCode"
                          label="인증번호"
                          required
                          @keyup.enter="verifyPhone"
                        ></v-text-field>
                      </div>
                      <v-btn
                        block
                        x-large
                        rounded
                        class="mt-6 brown darken-2 white--text"
                        @click="verifyPhone"
                        :disabled="false"
                      >
                        인증 완료
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <div class="d-flex">
                <v-text-field
                  v-model="city"
                  label="도시"
                  :disabled="true"
                  required
                />
              </div>

              <div class="d-flex">
                <v-text-field
                  v-model="street"
                  label="기본 주소"
                  :disabled="true"
                  required
                />
              </div>

              <div class="d-flex">
                <v-text-field
                  v-model="addressDetail"
                  label="상세 주소"
                  :disabled="false"
                  required
                />
              </div>

              <div class="d-flex">
                <v-text-field
                  v-model="zipcode"
                  label="우편번호"
                  :disabled="true"
                  required
                />

                <v-btn
                  text
                  large
                  outlined
                  style="font-size: 13px"
                  class="mt-3 ml-5 brown darken-2 white--text"
                  @click="callDaumAddressApi"
                  :disabled="false"
                >
                  주소 확인
                </v-btn>
              </div>

              <v-btn
                type="submit"
                block
                x-large
                rounded
                class="mt-6 brown darken-2 white--text"
                :disabled="!isFormValid()"
              >
                가입하기
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const memberModule = "memberModule";
export default {
  name: "SignUpForm",
  props: {
    memberType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      codeCheckDialog: false,
      verificationCode: "",
      codeText: "",
      email: "",
      password: "",
      password_confirm: "",
      nickName: "",
      birthdate: "",
      phoneNumber: "010-1234-1234", //@@@@@@항상 true로 폰인증꺼놈
      city: "",
      street: "",
      addressDetail: "",
      zipcode: "",
      phonePass: true, //@@@@@@항상 true로 폰인증꺼놈
      authorityPass: false,
      emailPass: false, //아디중복체크후 사용가능한 이메일인지 여부
      streetPass: false, //주소입력여부
      nickNamePass: false, //닉네임중복체크후 사용가능한 닉네임인지여부
      email_rule: [
        (v) => !!v || "이메일을 입력해주세요.",
        (v) => {
          const replaceV = v.replace(/(\s*)/g, "");
          const pattern =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
          return pattern.test(replaceV) || "이메일 형식을 입력하세요.";
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
          !(v && v.length > 20) || "패스워드는 20자를 초과 입력할 수 없습니다.",
        (v) => v === this.password || "패스워드가 일치하지 않습니다.",
      ],
      birthdate_rule: [
        (v) => !!v || "생년월일 8자리를 입력해주세요.",
        (v) => {
          const replaceV = v.replace(/(\s*)/g, "");
          const pattern =
            /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
          return pattern.test(replaceV) || "생년월일 형식을 입력하세요.";
        },
      ],
      phoneNumber_rule: [
        (v) => !!v || "전화번호를 입력 해주세요.",
        (v) => {
          const replaceV = v.replace(/(\s*)/g, "");
          const pattern = /010-\d{4}-\d{4}/;
          return (
            pattern.test(replaceV) ||
            '전화번호 11자리를 입력해주세요. ("-"포함)'
          );
        },
      ],
      nickName_rule: [(v) => !!v || "닉네임을 입력해주세요."],
    };
  },
  methods: {
    ...mapActions(memberModule, [
      "requestSignUpCheckEmailToSpring",
      "requestSignUpCheckNickNameToSpring",
      "requestSignUpCheckCafeCodeToSpring",
      "requestSignUpCheckManagerCodeToSpring",
      "sendVerificationPhoneToSpring",
      "verifyPhoneToSpring",
    ]),
    async verifyPhone() {
      try {
        const { phoneNumber, verificationCode } = this;
        console.log("인증phoneNumber", phoneNumber);
        console.log("인증verificationCode", verificationCode);
        const response = await this.verifyPhoneToSpring({
          phoneNumber,
          verificationCode,
        });
        console.log("인증response", response);
        console.log("인증response.status", response.status);
        if (response.status === 200) {
          alert("인증에 성공하였습니다.");
          this.phonePass = true;
          this.codeCheckDialog = false;
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
    async sendVerificationPhone() {
      try {
        const { phoneNumber } = this;
        console.log("보냄phoneNumber", phoneNumber);
        const response = await this.sendVerificationPhoneToSpring(phoneNumber);
        console.log("보냄response:", response);
        console.log("보냄response.data:", response.data);
        console.log("보냄response.data.statusCode:", response.data.statusCode);
        console.log("보냄response.status ", response.status);
        if (response.status === 200) {
          alert("인증코드가 문자전송되었습니다.");
          // this.codeCheck = true;
          this.codeCheckDialog = true;
        } else {
          alert("인증코드 전송에 실패하였습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("오류2가 발생했습니다.");
      }
    },

    onSubmit() {
      let authorityName = "";
      let code = null;
      if (this.memberType === "customer") {
        this.authorityPass = true;
        authorityName = "MEMBER";
      }
      if (
        this.phonePass &&
        this.authorityPass &&
        this.emailPass &&
        this.streetPass &&
        this.nickNamePass
      ) {
        if (this.memberType === "cafe") {
          authorityName = "CAFE";
        } else if (this.memberType === "manager") {
          authorityName = "MANAGER";
        }
        if (this.memberType === "manager" || this.memberType === "cafe") {
          code = this.codeText;
        }

        const {
          email,
          password,
          nickName,
          birthdate,
          phoneNumber,
          city,
          street,
          addressDetail,
          zipcode,
        } = this;
        this.$emit("submit", {
          email,
          password,
          nickName,
          birthdate,
          phoneNumber,
          authorityName,
          code,
          city,
          street,
          addressDetail,
          zipcode,
        });
      } else {
        alert("올바른 정보를 입력하세요!");
      }
    },
    isFormValid() {
      return (
        this.emailPass &&
        this.nickNamePass &&
        this.streetPass &&
        this.birthdate_rule[1](this.birthdate) === true &&
        this.phoneNumber_rule[1](this.phoneNumber) === true
      );
    },
    emailValidation() {
      const emailValid = this.email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
    async checkDuplicateEmail() {
      const emailValid = this.email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      this.emailPass = false;

      if (emailValid) {
        const { email } = this;

        const res = await this.requestSignUpCheckEmailToSpring(email);
        const isEmail = res.data;
        if (isEmail) {
          alert("사용 가능한 이메일입니다!");
          this.emailPass = true;
        } else {
          alert("중복된 이메일입니다!");
          this.emailPass = false;
        }
      }
    },
    async checkDuplicateNickName() {
      console.log("this.nickName", this.nickName);
      if (!this.nickName) {
        this.$refs.form.validate();
        return;
      }
      const { nickName } = this;

      const res = await this.requestSignUpCheckNickNameToSpring(nickName);
      const isNickName = res.data;
      if (isNickName) {
        alert("사용 가능한 닉네임입니다!");
        this.nickNamePass = true;
      } else {
        alert("중복된 닉네임입니다!");
        this.nickNamePass = false;
      }
    },
    callDaumAddressApi() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let fullRoadAddr = data.roadAddress;
          let extraRoadAddr = "";
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }
          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }
          if (fullRoadAddr !== "") {
            fullRoadAddr += extraRoadAddr;
          }
          this.city = data.sido;
          this.zipcode = data.zonecode;
          this.street = data.sigungu + " " + fullRoadAddr;
          this.streetPass = true;
        },
      }).open();
    },
    async checkCode() {
      if (this.memberType === "cafe") {
        console.log("카페사업자코드를 체크합니다");
        const { codeText } = this;
        const res = await this.requestSignUpCheckCafeCodeToSpring(codeText);
        const isCafeCode = res.data;
        console.log("isCafeCode", isCafeCode);
        if (isCafeCode) {
          alert("카페사업자 코드 확인하였습니다.");
          this.authorityPass = true;
        } else {
          alert("일치하는 카페사업자 코드가 없습니다.");
          this.authorityPass = false;
        }
      } else if (this.memberType === "manager") {
        console.log("매니저 코드를 체크합니다");
        const { codeText } = this;
        const res = await this.requestSignUpCheckManagerCodeToSpring(codeText);
        const isManagerCode = res.data;
        if (isManagerCode) {
          alert(" 관리자 코드 확인하였습니다.");
          this.authorityPass = true;
        } else {
          alert("일치하는 관리자 코드가 없습니다.");
          this.authorityPass = false;
        }
      }
    },
  },
};
</script>

<style scoped>
</style>