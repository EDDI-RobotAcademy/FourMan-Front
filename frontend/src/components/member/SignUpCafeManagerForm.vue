<template>
  <div class="grey lighten-5" style="font-family: Arial">
    <v-row justify="center">
      <v-col cols="auto" style="padding-bottom: 90px">
        <router-link to="/">
          <v-img :src="require('@/assets/logo.png')" width="60" class="mb-6" />
        </router-link>
        <v-card width="530">
          <v-card-text class="text-center px-12 py-16">
            <v-form @submit.prevent="onSubmit" ref="form">
              <div class="text-h4 font-weight-black mb-10">회원 가입</div>

              <div class="d-flex">
                  <v-text-field class="mt-3" v-model="codeText" label="카페 사업자/관리자 코드 입력해주세요" :disabled="authorityPass"
                                required color="black"/>
                  <v-btn text large outlined style="font-size: 13px; height: 55px"
                                class="mt-3 ml-5 mr-0"
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
                <v-btn text large outlined style="font-size: 13px; height: 55px"
                                class="mt-0 ml-5 mr-0"
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
                <v-text-field v-model="nickName" label="닉네임" :disabled="nickNamePass" required color="black"/>
                <v-btn text large outlined style="font-size: 13px; height: 55px"
                                class="mt-0 ml-5 mr-0"
                                @click="checkDuplicateNickName"
                                :disabled="nickNamePass">
                                닉네임 중복검사
                                
                  </v-btn>
              </div>

                <div class="d-flex">
                  <v-text-field v-model="birthdate" label="생년월일 (8자리)" :disabled="false" :rules="birthdate_rule"
                                required  color="black"/>
                </div>

                <div class="d-flex">
                  <v-text-field v-model="phoneNumber" label="전화번호 ('-'포함 11자리)" :disabled="false"
                                :rules="phoneNumber_rule" requiredcolor="black"/>
                </div>

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
                  class="mt-3 ml-5"
                  color="blue lighten-1"
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
                class="mt-6"
                color="purple lighten-1"
                :disabled="(emailPass && nickNamePass && streetPass &&authorityPass) == false"
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
import axios from "axios";
export default {
  name: "SignUpForm",
   props: {
        memberType: {
            type: String,
             required: true
        }
    },
  data() {
    return {
      codeText:"",
      email: "",
      password: "",
      password_confirm: "",
      nickName:"",
      birthdate: "",
      phoneNumber: "",
      city: "",
      street: "",
      addressDetail: "",
      zipcode: "",
      emailPass: false, //아디중복체크후 사용가능한 이메일인지 여부
      streetPass: false, //주소입력여부
      nickNamePass:false,//닉네임중복체크후 사용가능한 닉네임인지여부
      authorityPass:false, // 관리자또는 카페사업자인 여부 확인
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
        v => !!v || '생년월일 8자리를 입력해주세요.',
        v => {
          const replaceV = v.replace(/(\s*)/g, '')
          const pattern = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
          return pattern.test(replaceV) || '생년월일 형식을 입력하세요.'
        }
      ],
      phoneNumber_rule: [
        v => !!v || '전화번호를 입력 해주세요.',
        v => {
          const replaceV = v.replace(/(\s*)/g, '')
          const pattern = /010-\d{4}-\d{4}/
          return pattern.test(replaceV) || '전화번호 11자리를 입력해주세요. ("-"포함)'
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      if (this.emailPass && this.streetPass && this.nickNamePass && this.authorityPass) {
        const authorityName = "MEMBER"
        const code=null
        const { email, password,nickName, birthdate,phoneNumber, city, street, addressDetail, zipcode } = this;
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
    emailValidation() {
      const emailValid = this.email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
    checkDuplicateEmail() {
      const emailValid = this.email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      this.emailPass = false;

      if (emailValid) {
        const { email } = this;
        axios
          .post(`http://localhost:8888/member/check-email/${email}`)
          .then((res) => {
            if (res.data) {
              alert("사용 가능한 이메일입니다!");
              this.emailPass = true;
            } else {
              alert("중복된 이메일입니다!");
              this.emailPass = false;
            }
          });
      }
    },
    checkDuplicateNickName() {

 
        const { nickName } = this;
        axios
          .post(`http://localhost:8888/member/check-nickName/${nickName}`)
          .then((res) => {
            if (res.data) {
              alert("사용 가능한 닉네임 입니다!");
              this.nickNamePass = true;
            } else {
              alert("중복된 닉네임 입니다!");
              this.nickNamePass = false;
            }
          });
      
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
      checkCode() {
        if(this.memberType==='cafe'){
          console.log("카페사업자코드를 체크합니다")
          const {codeText} = this
          axios.post(`http://localhost:8888/member/check-cafe/${codeText}`)
          .then((res) => {
            if (res.data) {
              alert("카페사업자 코드 확인하였습니다.")
              this.authorityPass = true
            } else {
              alert("일치하는 카페사업자 코드가 없습니다.")
              this.authorityPass = false
            }
          })
      }
       else if(this.memberType==='manager'){
         console.log("매니저 코드를 체크합니다")
          const {codeText} = this
          axios.post(`http://localhost:8888/member/check-manager/${codeText}`)
          .then((res) => {
            if (res.data) {
              alert("관리자 코드 확인하였습니다.")
              this.authorityPass = true
            } else {
              alert("일치하는 관리자 코드가 없습니다.")
              this.authorityPass = false
            }
          })
      }
    }
  },
};
</script>

<style scoped>
</style>